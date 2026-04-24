import { motion } from 'framer-motion';
import { TrendingUp, Users, Target } from 'lucide-react';

export default function FranchiseAbout() {
  return (
    <section id="model" className="py-20 md:py-24 px-6 md:px-12 bg-dark-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue blur-3xl opacity-20 transform -rotate-12 rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200" 
              alt="Community Collaboration" 
              className="w-full rounded-2xl md:rounded-3xl border border-white/10 relative z-10 shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-neon-pink w-5 h-5 md:w-6 md:h-6" />
            <span className="text-neon-pink font-semibold tracking-wider uppercase text-xs md:text-sm">Vision & Concept</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">
            Why India is Betting Big on <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Coworking</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
            With the rise of the digital economy and hybrid work culture, demand for high-quality, professional workspaces is exploding across India, particularly in Tier 2 and Tier 3 cities.
          </p>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
            Startup Cafe is more than just a place to plug in. It’s an ecosystem where founders find mentors, freelancers find clients, and companies find culture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="p-3 bg-neon-blue/10 rounded-xl h-fit">
                <TrendingUp className="text-neon-blue w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Growth Engine</h4>
                <p className="text-slate-400 text-sm">India's coworking market is projected to reach $1.5B by 2027.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="p-3 bg-neon-purple/10 rounded-xl h-fit">
                <Users className="text-neon-purple w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Community Focus</h4>
                <p className="text-slate-400 text-sm">High retention through events and meaningful networking.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
