import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function Contact({ selectedBooking }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    planType: '',
    duration: 'Monthly',
    date: '',
    people: '1',
    message: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const planPrices = {
    'Day Pass – ₹499': 499,
    'Conference Room – ₹999': 999,
    'Private Cabin (Daily) – ₹999': 999,
    'Dedicated Desk – ₹6999': 6999,
    'Private Cabin (Monthly) – ₹29999': 29999
  };

  useEffect(() => {
    if (selectedBooking) {
      setFormData(prev => ({
        ...prev,
        planType: selectedBooking.planName,
        duration: selectedBooking.duration
      }));
    }
  }, [selectedBooking]);

  useEffect(() => {
    if (formData.planType.includes('Day Pass') || formData.planType.includes('Daily') || formData.planType.includes('Conference Room')) {
      setFormData(prev => ({ ...prev, duration: 'Daily' }));
    } else if (formData.planType.includes('Monthly') || formData.planType.includes('Dedicated Desk')) {
      setFormData(prev => ({ ...prev, duration: 'Monthly' }));
    }
  }, [formData.planType]);

  useEffect(() => {
    const base = planPrices[formData.planType] || 0;
    const people = formData.planType.includes('Private Cabin') ? 1 : parseInt(formData.people) || 1;
    setTotalPrice(base * people);
  }, [formData.planType, formData.people]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Only allow numbers and max 10 digits
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    if (inputDate.includes('-') && inputDate.split('-')[0].length === 4) return inputDate;
    
    const parts = inputDate.split("-");
    if (parts.length !== 3) return inputDate;
    
    // Check if it's DD-MM-YYYY or YYYY-MM-DD
    const [p1, p2, p3] = parts;
    if (p1.length === 4) return inputDate; // already YYYY-MM-DD
    return `${p3}-${p2}-${p1}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formData.phone.length !== 10) {
        alert("❌ Please enter a valid 10-digit phone number.");
        return;
      }

      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        plan: formData.planType,
        duration: formData.duration,
        date: formatDate(formData.date),
        people: Number(formData.people),
        message: formData.message
      };

      console.log("🚀 Sending booking:", bookingData);

      const response = await fetch(`${API_BASE_URL}/api/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setFormData({
          name: '', email: '', phone: '', planType: '', duration: 'Monthly', date: '', people: '1', message: ''
        });
      } else {
        alert(`❌ ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("❌ Frontend error:", error);
      alert("❌ Booking failed. Please check backend connection.");
    }
  };

  return (
    <section id="booking-form" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/5 scroll-mt-28">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Workspace</span>
        </motion.h2>
        <p className="text-slate-400">Ready to level up your workspace? Reserve your spot today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Contact Info & Map */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div className="glass-card p-1 overflow-hidden h-[400px] rounded-2xl relative">
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.08277259169!2d83.303977598466!3d26.7634863378516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991446a0c332489%3A0x1ff3f97fdcc6b711!2sGorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1714080123512!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="p-3 bg-white/5 rounded-full border border-white/10"><MapPin className="text-neon-pink" size={20}/></div>
              <p>2nd Floor, Opposite Vijay Cinema, Vijay Chowk, Gorakhpur, India, 273001</p>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="p-3 bg-white/5 rounded-full border border-white/10"><Phone className="text-neon-blue" size={20}/></div>
              <p>+91 96701 11167</p>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="p-3 bg-white/5 rounded-full border border-white/10"><Mail className="text-neon-purple" size={20}/></div>
              <p>startupcafegkp@gmail.com</p>
            </div>
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden"
        >
          {submitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-10"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                >
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Request Received!</h3>
              <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Our team will review your booking and contact you shortly to confirm. <br />
                <span className="text-slate-400 text-sm mt-4 block italic">For immediate assistance, feel free to reach out via WhatsApp.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <a 
                  href="https://wa.me/919670111167" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white transition-all shadow-[0_10px_20px_-10px_rgba(22,163,74,0.5)]"
                >
                  <MessageCircle size={20} />
                  WhatsApp Now
                </a>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="flex-1 py-4 rounded-xl font-bold text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
                >
                  New Booking
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              {selectedBooking && (
                <div className="mb-8 p-4 rounded-xl bg-neon-blue/10 border border-neon-blue/30 text-neon-blue animate-in fade-in slide-in-from-top-4 duration-500">
                  <p className="text-sm font-bold uppercase tracking-wider mb-1">You selected:</p>
                  <p className="text-xl font-bold text-white">{selectedBooking.planName} — {selectedBooking.price}/{selectedBooking.duration.toLowerCase() === 'daily' ? 'day' : 'month'}</p>
                </div>
              )}
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  <div className="space-y-2">
                    <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider ml-1">Full Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-all" placeholder="John Doe"/>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider ml-1">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-all" placeholder="john@example.com"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider ml-1">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-all" 
                      placeholder="98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider ml-1">Plan Type</label>
                    <div className="relative">
                      <select name="planType" value={formData.planType} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-all appearance-none [&>option]:bg-[#1a1a1a] cursor-pointer">
                        <option value="">Select a Plan</option>
                        <option value="Day Pass – ₹499">Day Pass – ₹499</option>
                        <option value="Conference Room – ₹999">Conference Room – ₹999</option>
                        <option value="Private Cabin (Daily) – ₹999">Private Cabin (Daily) – ₹999</option>
                        <option value="Dedicated Desk – ₹6999">Dedicated Desk – ₹6999</option>
                        <option value="Private Cabin (Monthly) – ₹29999">Private Cabin (Monthly) – ₹29999</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider ml-1">Duration</label>
                    <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 relative min-h-[50px]">
                      <button 
                        type="button" 
                        disabled={formData.planType.includes('Dedicated Desk') || formData.planType.includes('Monthly')}
                        onClick={() => setFormData(p => ({ ...p, duration: 'Daily' }))} 
                        className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all relative z-10 ${formData.duration === 'Daily' ? 'text-white' : 'text-slate-500 disabled:opacity-30'}`}
                      >
                        Daily
                      </button>
                      <button 
                        type="button" 
                        disabled={formData.planType.includes('Day Pass') || formData.planType.includes('Daily') || formData.planType.includes('Conference Room')}
                        onClick={() => setFormData(p => ({ ...p, duration: 'Monthly' }))} 
                        className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all relative z-10 ${formData.duration === 'Monthly' ? 'text-white' : 'text-slate-600 disabled:opacity-30'}`}
                      >
                        Monthly
                      </button>
                      <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg transition-transform duration-300 ${formData.duration === 'Monthly' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider ml-1">Start Date</label>
                    <input 
                      required 
                      type="date" 
                      name="date" 
                      min={today}
                      value={formData.date} 
                      onChange={handleChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-all [color-scheme:dark]"
                    />
                  </div>
                  {!formData.planType.includes('Private Cabin') && (
                    <div className="space-y-2">
                      <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider ml-1">People</label>
                      <input type="number" min="1" name="people" value={formData.people} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-all"/>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider mb-2 ml-1">Message (Optional)</label>
                  <textarea rows={2} name="message" value={formData.message} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue border-neon-blue transition-all resize-none" placeholder="Special requirements or questions?"></textarea>
                </div>

                {totalPrice > 0 && (
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Total Amount</p>
                      <p className="text-3xl font-bold text-white">₹{totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Breakdown</p>
                      <p className="text-xs text-slate-400">
                        {formData.planType} x {formData.planType === 'Private Cabin' ? 1 : formData.people}
                      </p>
                    </div>
                  </div>
                )}
                
                <button type="submit" className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                  Confirm Booking
                </button>
                
                <a 
                  href="https://wa.me/916393428001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/10 text-slate-400 hover:bg-white/5 transition-colors"
                >
                  <MessageCircle size={18} />
                  Quick Inquiry via WhatsApp
                </a>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
