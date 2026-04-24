import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Khanna",
    location: "Lucknow Partner",
    text: "Startup Cafe has been a game-changer for my real estate portfolio. The brand's focus on community and technology made it very easy to reach 90% occupancy within just 4 months of launch.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=200"
  },
  {
    name: "Sarah Williams",
    location: "Gorakhpur Partner",
    text: "Deciding to take a franchise of Startup Cafe was the best business decision I've made. The support team is incredible, and the design aesthetic really sets us apart from local competitors.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=200"
  },
];

export default function FranchiseTestimonials() {
  return (
    <section id="franchise-testimonials" className="py-20 md:py-24 px-6 md:px-12 bg-dark-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Voice of our <span className="text-neon-pink">Partners</span></h2>
          <p className="text-slate-400 text-sm md:text-base">Hear directly from those who are already growing with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-6 md:p-10 border border-white/5 relative"
            >
              <Quote className="absolute top-4 right-6 text-white/5 w-12 h-12 md:w-16 md:h-16" />
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <img src={t.img} alt={t.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-neon-pink p-0.5 md:p-1 object-cover" />
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl">{t.name}</h4>
                  <p className="text-neon-pink text-xs md:text-sm font-semibold">{t.location}</p>
                </div>
              </div>
              <p className="text-slate-300 text-base md:text-lg italic leading-relaxed relative z-10">
                "{t.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
