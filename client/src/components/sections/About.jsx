import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue blur-3xl opacity-20 transform -rotate-6 rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" 
            alt="Collab" 
            className="rounded-3xl border border-white/10 relative z-10"
          />
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            More than just <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">desks.</span>
          </h2>
          <p className="text-slate-300 text-lg mb-6 leading-relaxed">
            Startup Cafe was born from a vision to bring Silicon Valley's collaborative ecosystem to our community. We provide founders, freelancers, and growing teams with a premium, focused space that drives innovation forward.
          </p>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Here, you don't just rent an office. You join a community of driven individuals reshaping the tech landscape.
          </p>
          <div className="flex gap-8">
            <div>
              <h4 className="text-3xl font-bold text-white mb-1">500+</h4>
              <p className="text-neon-blue text-sm">Trusted Members</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white mb-1">9-7</h4>
              <p className="text-neon-pink text-sm">Access</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white mb-1">100+</h4>
              <p className="text-neon-purple text-sm">Dedicated Desk</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
