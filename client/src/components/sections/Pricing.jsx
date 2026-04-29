import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Conference Room',
    monthlyPrice: null,
    dailyPrice: 999,
    description: 'Professional space for meetings and presentations.',
    features: ['Smart TV / Projector', 'High-Speed WiFi', 'Whiteboard', 'Free Coffee & Tea'],
    popular: false,
  },
  {
    name: 'Day Pass',
    monthlyPrice: null,
    dailyPrice: 499,
    description: 'Perfect for drop-ins and occasional visits.',
    features: ['High-Speed WiFi', 'Open Desk Seating', 'Free Coffee & Tea', 'Community Access'],
    popular: true,
  },
  {
    name: 'Private Cabin',
    monthlyPrice: null,
    dailyPrice: 999,
    description: 'Daily access to a private, quiet workspace.',
    features: ['Secured Space', 'High-Speed WiFi', 'Meeting Room Access', 'Free Coffee & Tea'],
    popular: false,
  },
  {
    name: 'Dedicated Desk',
    monthlyPrice: 6999,
    dailyPrice: null,
    description: 'Your own permanent desk in our workspace.',
    features: ['Reserved Desk', '24/7 Access', 'Meeting Room', 'Locker Storage', 'Printing Services', 'Free Coffee & Tea'],
    popular: true,
  },
  {
    name: 'Private Cabin',
    monthlyPrice: 29999,
    dailyPrice: null,
    description: 'Secured private office for startups and teams.',
    features: ['Furnished Cabin for 2-5', 'Company Branding', 'Meeting Rooms', 'Premium Network', 'Free Coffee & Tea', 'Dedicated IP Address'],
    popular: false,
  }
];

export default function Pricing({ onSelectBooking }) {
  const [isMonthly, setIsMonthly] = useState(true);

  const handleGetStarted = (plan) => {
    const duration = isMonthly ? 'Monthly' : 'Daily';
    const price = isMonthly ? plan.monthlyPrice : plan.dailyPrice;
    
    // Format plan name as requested: "Plan Name (Duration) – ₹Price"
    let planLabel = plan.name;
    if (plan.name === 'Private Cabin') {
      planLabel = `Private Cabin (${duration})`;
    } else if (plan.name === 'Day Pass') {
      planLabel = 'Day Pass';
    } else if (plan.name === 'Conference Room') {
      planLabel = 'Conference Room';
    }

    let suffix = duration === 'Monthly' ? '/month' : '/day';
    if (plan.name === 'Conference Room' || (plan.name === 'Private Cabin' && duration === 'Daily')) {
      suffix = '/hr';
    }

    const finalPlanName = `${planLabel} – ₹${price}${suffix}`;
    
    if (onSelectBooking) {
      onSelectBooking({
        planName: finalPlanName,
        price: `₹${price}`,
        basePrice: price,
        duration: duration
      });
    }

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">Pricing</span>
        </motion.h2>
        
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm font-medium transition-colors ${!isMonthly ? 'text-white' : 'text-slate-400'}`}>Daily</span>
          <div 
            className="w-14 h-8 bg-white/10 rounded-full p-1 cursor-pointer border border-white/20 relative"
            onClick={() => setIsMonthly(!isMonthly)}
          >
            <motion.div 
              className="w-6 h-6 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full shadow-lg"
              animate={{ x: isMonthly ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
          <span className={`text-sm font-medium transition-colors ${isMonthly ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {plans.map((plan, index) => {
          if (!isMonthly && plan.monthlyPrice !== null && plan.dailyPrice === null) return null;
          if (isMonthly && plan.dailyPrice !== null && plan.monthlyPrice === null) return null;

          const price = isMonthly ? plan.monthlyPrice : plan.dailyPrice;
          
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative glass-card p-8 rounded-3xl border ${plan.popular ? 'border-neon-purple shadow-[0_0_30px_rgba(176,38,255,0.2)] transform md:-translate-y-4' : 'border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-neon-purple to-neon-pink text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">₹{price}</span>
                <span className="text-slate-400">
                  {isMonthly 
                    ? '/mo' 
                    : (plan.name === 'Conference Room' || plan.name === 'Private Cabin' ? ' per hour' : '/day')}
                </span>
              </div>
              <ul className="space-y-4 mb-8 h-48">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-300">
                    <Check size={18} className="text-neon-blue mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleGetStarted(plan)}
                className="w-full py-4 rounded-xl font-bold transition-all bg-gradient-to-r from-neon-purple to-neon-blue text-white hover:shadow-[0_0_20px_#b026ff]"
              >
                Book Now
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
