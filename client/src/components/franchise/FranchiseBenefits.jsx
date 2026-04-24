import { motion } from 'framer-motion';
import { Award, ShieldCheck, Zap, Handshake, Globe } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: "Strong Brand Identity",
    desc: "Leverage our established presence and premium positioning to attract high-value clients instantly.",
    color: "text-neon-blue",
    bg: "bg-neon-blue/10"
  },
  {
    icon: ShieldCheck,
    title: "Proven Business Model",
    desc: "Skip the trial and error with our standardized SOPs and optimized revenue structures.",
    color: "text-neon-purple",
    bg: "bg-neon-purple/10"
  },
  {
    icon: Zap,
    title: "Marketing Support",
    desc: "National marketing campaigns and localized lead generation strategies to keep your space full.",
    color: "text-neon-pink",
    bg: "bg-neon-pink/10"
  },
  {
    icon: Handshake,
    title: "Operational Guidance",
    desc: "End-to-end support for day-to-day operations, from hospitality management to billing.",
    color: "text-orange-400",
    bg: "bg-orange-400/10"
  },
  {
    icon: Globe,
    title: "ROI & Growth",
    desc: "Average payback period of 24-30 months with multiple high-margin revenue streams.",
    color: "text-green-400",
    bg: "bg-green-400/10"
  }
];

export default function FranchiseBenefits() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Why Partner with <span className="text-neon-blue">Us?</span>
          </motion.h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            We provide the foundation, tools, and brand power you need to build a successful coworking business from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-6 md:p-8 border border-white/5 hover:border-white/20 transition-all group"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${benefit.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <benefit.icon className={`${benefit.color} w-6 h-6 md:w-8 md:h-8`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
          
          {/* Join Community Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border border-white/10 flex flex-col justify-center items-center text-center group"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Start Your Journey</h3>
            <p className="text-slate-300 mb-8 italic">"Building the workspace of tomorrow, together."</p>
            <button 
              onClick={() => document.getElementById('inquiry-form').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-full bg-white text-black font-bold hover:shadow-[0_0_20px_white] transition-all"
            >
              Inquire Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
