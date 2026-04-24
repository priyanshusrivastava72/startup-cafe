import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Monitor, Users, Briefcase, Zap, Coffee, Globe } from 'lucide-react';

const services = [
  {
    title: 'Dedicated Desks',
    description: 'Your personal workspace in a shared environment, guaranteed yours every day.',
    icon: <Monitor size={32} className="text-neon-blue" />,
    gradient: 'from-neon-blue/20 to-transparent'
  },
  {
    title: 'Private Cabins',
    description: 'Enclosed, customized spaces for teams focusing on high-growth and privacy.',
    icon: <Briefcase size={32} className="text-neon-purple" />,
    gradient: 'from-neon-purple/20 to-transparent'
  },
  {
    title: 'Meeting Rooms',
    description: 'High-tech conference rooms equipped with smart screens and VC facilities.',
    icon: <Users size={32} className="text-neon-pink" />,
    gradient: 'from-neon-pink/20 to-transparent'
  },
  {
    title: 'Virtual Office',
    description: 'Professional business address and mail handling without the physical space.',
    icon: <Globe size={32} className="text-neon-blue" />,
    gradient: 'from-neon-blue/20 to-neon-purple/20'
  },
  {
    title: 'Startup Networking',
    description: 'Join a thriving ecosystem of founders, mentors, and investors.',
    icon: <Zap size={32} className="text-[#facc15]" />,
    gradient: 'from-[#facc15]/20 to-transparent'
  },
  {
    title: 'Lounge & Cafe',
    description: 'Relax, recharge, and collaborate over premium brewed coffee.',
    icon: <Coffee size={32} className="text-neon-pink" />,
    gradient: 'from-neon-pink/20 to-neon-purple/20'
  }
];

function TiltCard({ service }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    // Values range from -1 to 1 for hover intensity
    mouseX.set((x / width) * 2 - 1);
    mouseY.set((y / height) * 2 - 1);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: useMotionTemplate`${mouseY.get() * -15}deg`,
        rotateY: useMotionTemplate`${mouseX.get() * 15}deg`,
      }}
      className="perspective-1000 transform-gpu relative group p-1 w-full rounded-2xl"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple to-neon-blue rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
      
      {/* Card Content */}
      <div className={`relative h-full bg-[#0a0a0c] rounded-2xl p-8 border border-white/5 overflow-hidden flex flex-col items-start gap-4 z-10 bg-gradient-to-br ${service.gradient}`}>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
          {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-white mt-4">{service.title}</h3>
        <p className="text-slate-400 font-light leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Premium Work <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
            Environments
          </span>
        </motion.h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          From focused private spaces to collaborative open desks, we provide everything your startup needs to thrive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <TiltCard service={service} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
