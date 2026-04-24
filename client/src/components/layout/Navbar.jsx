import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo2 from '../../assets/logo2.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    } else {
      window.location.href = '/#booking-form';
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass-card shadow-lg mx-[2%] mt-2 w-[96%] border border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
        {/* Logo */}
        <a href="/#hero" className="flex items-center gap-2 group">
          <img src={logo2} alt="Startup Cafe" className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Pricing', 'Gallery', 'Contact'].map((item) => (
            <a key={item} href={`/#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#b026ff] to-[#00f0ff] transition-all group-hover:w-full"></span>
            </a>
          ))}
          <Link to="/franchise" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
            Franchise
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#b026ff] to-[#00f0ff] transition-all group-hover:w-full"></span>
          </Link>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={scrollToBooking}
            className="px-6 py-2 rounded-full bg-white text-black font-semibold text-sm hover:shadow-[0_0_20px_#00f0ff] transition-shadow duration-300"
          >
            Book a Seat
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300 hover:text-white">
             {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 w-full glass-card p-6 flex flex-col gap-4 border border-white/5 md:hidden"
            >
              {['About', 'Services', 'Pricing', 'Gallery', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`/#${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-200 hover:text-neon-blue transition-colors border-b border-white/5 pb-2"
                >
                  {item}
                </a>
              ))}
              <Link 
                to="/franchise" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-neon-blue transition-colors border-b border-white/5 pb-2"
              >
                Franchise
              </Link>
              <button 
                onClick={scrollToBooking}
                className="mt-2 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-[0_0_20px_#b026ff] transition-shadow duration-300"
              >
                Book a Seat
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
