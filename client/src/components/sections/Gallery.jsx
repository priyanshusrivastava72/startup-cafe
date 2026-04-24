import { motion } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
  "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=800&q=80",
  "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800&q=80",
  "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80"
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink">Startup Cafe</span>
        </motion.h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
            className="relative group overflow-hidden rounded-2xl break-inside-avoid"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <img 
              src={img} 
              alt="Workspace" 
              className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/20">
                Workspace View
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
