import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import sanyaImg from '../../assets/sanya.png';
import rohanImg from '../../assets/rohan.png';
import arjunImg from '../../assets/arjun.png';


const testimonials = [
  {
    name: "Rohan Verma",
    image: rohanImg,
    content: "Startup Cafe transformed how my team works. The environment is inspiring, the networking is unmatched, and the 9-7 access helps us hit strict deadlines.",
  },
  {
    name: "Sanya Sharma",
    image: sanyaImg,
    content: "The best co-working space I've ever worked in! The aesthetic is literally what I try to design for my clients. Super productive atmosphere.",
  },
  {
    name: "Arjun Desai",
    image: arjunImg,
    content: "We moved our whole startup to a private cabin here. The VC facilities and the community support feel like we are in a top-tier tech hub.",
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  const prev = () => setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-16"
        >
          What Co-Works <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">Say</span>
        </motion.h2>

        <div className="relative h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full"
            >
              <Quote className="mx-auto text-neon-blue/40 w-16 h-16 mb-6" />
              <p className="text-xl md:text-2xl text-slate-200 font-light italic max-w-2xl mx-auto leading-relaxed mb-8">
                "{testimonials[index].content}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img 
                  src={testimonials[index].image} 
                  alt={testimonials[index].name} 
                  className="w-14 h-14 rounded-full border-2 border-neon-purple object-cover"
                />
                <div className="text-left">
                  <h4 className="text-white font-semibold">{testimonials[index].name}</h4>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button onClick={prev} className="absolute left-0 md:-left-12 p-3 rounded-full glass-card border border-white/10 hover:bg-white/10 transition text-white z-10 hidden sm:block">
            <ChevronLeft />
          </button>
          <button onClick={next} className="absolute right-0 md:-right-12 p-3 rounded-full glass-card border border-white/10 hover:bg-white/10 transition text-white z-10 hidden sm:block">
            <ChevronRight />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-12 sm:mt-8">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-neon-blue w-8' : 'bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
