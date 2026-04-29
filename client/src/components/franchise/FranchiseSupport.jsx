import { motion } from 'framer-motion';
import { MapPin, Palette, Megaphone, Cpu, GraduationCap } from 'lucide-react';

const supportItems = [
  { icon: MapPin, title: "Location Selection", desc: "Expert guidance in finding the perfect building with high visibility and accessibility." },
  { icon: Palette, title: "Interior Design", desc: "Standardized high-end architectural plans and interior themes that scream 'Startups'." },
  { icon: Megaphone, title: "Digital Marketing", desc: "Listing optimizations, social media handling, and lead generation ad campaigns." },
  { icon: Cpu, title: "Tech Stack", desc: "Custom booking software, automated billing, and high-speed network management apps." },
  { icon: GraduationCap, title: "Staff Training", desc: "Comprehensive training on hospitality, sales, and community management for your team." },
];

export default function FranchiseSupport() {
  return (
    <section id="support" className="py-20 md:py-24 px-6 md:px-12 bg-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Unmatched <span className="text-neon-purple">Support</span></h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            You are never alone on your journey. Our expert teams are with you from day one to ensure your cafe is a massive success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 md:p-8 rounded-3xl bg-dark-bg/60 border border-white/5 hover:border-neon-purple/50 transition-all group"
            >
              <div className="mb-6 p-3 md:p-4 bg-neon-purple/10 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-neon-purple group-hover:text-black transition-all">
                <item.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-neon-blue to-neon-purple flex flex-col justify-center items-center text-center shadow-xl min-h-[250px]"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Ready to Lead?</h3>
            <p className="text-white/80 mb-6 text-xs md:text-sm">Download our complete franchise brochure to see the full list of support services.</p>
            <a 
              href="/startcafe.co.in.pdf" 
              download 
              className="inline-block px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform text-sm md:text-base"
            >
              Download Brochure
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
