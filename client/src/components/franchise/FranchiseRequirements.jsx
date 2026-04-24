import { motion } from 'framer-motion';
import { Square, Map, Building } from 'lucide-react';

export default function FranchiseRequirements() {
  return (
    <section id="requirements" className="py-20 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Space & <span className="text-neon-blue">Requirements</span></h2>
          <p className="text-slate-400 text-sm md:text-base">Do you have what it takes to build a Startup Cafe?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 glass-card border border-white/5 flex flex-col items-center text-center group hover:border-white/20 transition-all"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neon-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Square className="text-neon-blue w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-white mb-4">Area Required</h4>
            <p className="text-slate-400 text-sm md:text-base">Ideally 1000 – 3000 sq ft of premium carpet area in a commercial building.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 md:p-10 glass-card border border-white/5 flex flex-col items-center text-center group hover:border-white/20 transition-all"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Map className="text-neon-purple w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-white mb-4">Prime Location</h4>
            <p className="text-slate-400 text-sm md:text-base">Proximity to business hubs, transport hubs, or educational institutes.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 md:p-10 glass-card border border-white/5 flex flex-col items-center text-center group hover:border-white/20 transition-all"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neon-pink/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building className="text-neon-pink w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-white mb-4">Building Standards</h4>
            <p className="text-slate-400 text-sm md:text-base">Full power backup, lift connectivity, and professional security presence.</p>
          </motion.div>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-12 md:mt-16 p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="lg:max-w-2xl text-center lg:text-left">
            <h4 className="text-white font-bold text-lg md:text-xl mb-2 italic">Note on Investment capability:</h4>
            <p className="text-slate-400 text-sm md:text-base">Apart from the physical requirements, we look for partners who are passionate about building startup communities and have the financial capability to sustain operations for the first 6-12 months.</p>
          </div>
          <button 
            onClick={() => document.getElementById('inquiry-form').scrollIntoView({ behavior: 'smooth' })}
            className="w-full lg:w-auto px-10 py-4 rounded-xl bg-neon-blue font-bold text-black hover:shadow-[0_0_20px_#00f0ff] transition-all text-sm md:text-base"
          >
            Apply Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
