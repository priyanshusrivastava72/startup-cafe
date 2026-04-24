import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, MessageCircle, MapPin, Globe, CreditCard } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    budget: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [citySuggestions, setCitySuggestions] = useState([]);
  const [citySync, setCitySync] = useState('');
  const [showCities, setShowCities] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Real-time city search using OpenStreetMap Nominatim API
  useEffect(() => {
    const fetchCities = async () => {
      if (citySync.length < 3) {
        setCitySuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(citySync)}&format=json&addressdetails=1&countrycodes=in&limit=10`);
        const data = await response.json();
        
        const formatted = data.map(item => {
          const addr = item.address;
          const main = addr.city || addr.town || addr.village || addr.suburb || addr.municipality || addr.county || addr.city_district || addr.state_district || '';
          const state = addr.state || '';
          return {
            main: main,
            sub: `${state}, India`
          };
        })
        .filter(item => item.main && item.main.toLowerCase().includes(citySync.toLowerCase())) 
        .filter((v, i, a) => a.findIndex(t => t.main === v.main && t.sub === v.sub) === i) 
        .slice(0, 5);

        setCitySuggestions(formatted);
      } catch (error) {
        console.error("City search error:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(fetchCities, 500);
    return () => clearTimeout(timeoutId);
  }, [citySync]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
      return;
    }

    if (name === 'city') {
      setCitySync(value);
      setShowCities(true);
      setFormData(prev => ({ ...prev, [name]: value }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectCity = (cityObj) => {
    const displayValue = `${cityObj.main}, ${cityObj.sub}`;
    setFormData(prev => ({ ...prev, city: displayValue }));
    setCitySync(displayValue);
    setShowCities(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.phone.length !== 10) {
      alert("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/franchise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setFormData({
          fullName: '', email: '', phone: '', city: '', budget: '', message: ''
        });
        setCitySync('');
      } else {
        alert(`❌ ${data.message || "Submission failed. Please try again."}`);
      }
    } catch (error) {
      console.error("❌ Inquiry Error:", error);
      alert("❌ Connection failed. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl mx-auto p-12 glass-card border border-neon-blue/20 text-center rounded-[2.5rem] shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 pointer-events-none"></div>
          
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
            >
              <CheckCircle2 className="text-green-500 w-12 h-12" />
            </motion.div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Application Received!</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Thank you for your interest in partnering with us. Our franchise development team will review your details and contact you within 48 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/916393428001" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold shadow-lg transition-all group"
            >
              <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" />
              WhatsApp Support
            </a>
            <button 
              onClick={() => setSubmitted(false)}
              className="px-8 py-4 text-slate-300 border border-white/10 hover:bg-white/5 rounded-2xl font-bold transition-all"
            >
              Submit New Inquiry
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="inquiry-form" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-blue/10 blur-[150px] rounded-full -z-10"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">Partner Journey</span>
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Take the first step towards owning a premium co-working franchise. Let's discuss your vision.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-3">
              <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Full Name</label>
              <input
                required
                type="text"
                name="fullName"
                placeholder="Alexander Pierce"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-neon-blue focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Email Address</label>
              <input
                required
                type="email"
                name="email"
                placeholder="alexander@luxury.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-neon-purple focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-3">
              <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-neon-blue focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Interested City</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="e.g. Gorakhpur, Lucknow"
                  autoComplete="off"
                  value={formData.city}
                  onChange={handleChange}
                  onFocus={() => setShowCities(true)}
                  onBlur={() => setTimeout(() => setShowCities(false), 200)}
                  className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-neon-purple focus:bg-white/[0.05] transition-all"
                />
                <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                
                {/* City Suggestions Dropdown */}
                {showCities && citySync && (citySuggestions.length > 0 || isSearching) && (
                  <div className="absolute z-50 left-0 right-0 mt-2 glass-card border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {isSearching ? (
                      <div className="px-5 py-4 flex items-center justify-center gap-3 text-slate-500 text-sm italic">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-neon-blue rounded-full animate-spin"></span>
                        Searching locations...
                      </div>
                    ) : (
                      citySuggestions.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectCity(item)}
                          className={`w-full text-left px-5 py-4 hover:bg-white/10 transition-all border-b border-white/5 last:border-none group`}
                        >
                          <div className="flex items-center gap-3">
                            <Globe size={16} className="text-neon-blue group-hover:scale-110 transition-transform" />
                            <div>
                              <p className="text-white font-bold text-sm">{item.main}</p>
                              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{item.sub}</p>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Investment Budget</label>
            <div className="relative">
              <select
                required
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-neon-pink focus:bg-white/[0.05] transition-all appearance-none [&>option]:bg-[#1a1a1a]"
              >
                <option value="">Select an investment range</option>
                <option value="₹20L - ₹35L">Premium Range (₹20L - ₹35L)</option>
                <option value="₹35L - ₹50L">Elite Range (₹35L - ₹50L)</option>
                <option value="₹50L+">Grand Range (₹50L+)</option>
              </select>
              <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            </div>
          </div>

          <div className="space-y-3 mb-10">
            <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Vision & Requirements</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Tell us about your interest in Startup Cafe..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-neon-blue focus:bg-white/[0.05] transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-[1.25rem] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.5)] transition-all disabled:opacity-70 group relative overflow-hidden"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]"></div>
                Submit Premium Application
                <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
