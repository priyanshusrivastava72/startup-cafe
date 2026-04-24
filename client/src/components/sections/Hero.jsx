import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

const CoffeeCup = ({ position }) => (
  <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={position}>
    <group rotation={[0.4, 0.4, 0]}>
      {/* Cup Body */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.45, 1.2, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.08, 16, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Coffee inside */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.05, 32]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.8} />
      </mesh>
    </group>
  </Float>
);

const HyperRealisticLaptop = ({ position }) => {
  const keys = [];
  const rows = 5;
  const cols = 10;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      keys.push([c * 0.18 - 0.82, 0.055, r * 0.18 - 0.4]);
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={position}>
      <group rotation={[0.1, -0.4, 0]}>
        {/* Lower Body (Base) - Made larger and deeper */}
        <mesh>
          <boxGeometry args={[2.5, 0.1, 1.8]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Glowing Backlit Area - Increased Y to avoid flickering */}
        <mesh position={[0, 0.06, -0.1]}>
          <boxGeometry args={[2.1, 0.01, 1.2]} />
          <meshStandardMaterial color="#000000" emissive="#00f0ff" emissiveIntensity={0.8} />
        </mesh>

        {/* Individual Keys - Increased Y */}
        {keys.map((pos, i) => (
          <mesh key={i} position={[pos[0], 0.065, pos[2]]}>
            <boxGeometry args={[0.14, 0.02, 0.14]} />
            <meshStandardMaterial color="#111111" metalness={0.8} />
          </mesh>
        ))}
        
        {/* Trackpad - Increased Y */}
        <mesh position={[0, 0.06, 0.65]}>
          <boxGeometry args={[0.7, 0.01, 0.4]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        {/* Upper Body (Screen) - Fixed Proportions */}
        <group position={[0, 0.05, -0.9]} rotation={[-1.3, 0, 0]}>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[2.5, 1.6, 0.05]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.8, 0.03]}>
            <planeGeometry args={[2.35, 1.45]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

const FloatingElements = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, 5, 2]} intensity={3} color="#b026ff" />
      <pointLight position={[5, -5, 2]} intensity={3} color="#00f0ff" />
      
      <CoffeeCup position={[-3.5, 1.2, -2]} />
      <HyperRealisticLaptop position={[3, -1, -3]} />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </>
  );
};

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <FloatingElements />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center pointer-events-none">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: 'easeOut' }}
           className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 glass whitespace-nowrap"
        >
          <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Premium Workspace Experience
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          Your Premium Office<br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue">
            @ Startup Cafe
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light"
        >
          Elevate your work in a dynamic, futuristic ecosystem designed for creators, entrepreneurs, and visionaries in Gorakhpur.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
        >
          <button className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-[0_0_30px_#b026ff] transition-shadow duration-300">
            Book a Seat
          </button>
          <button className="px-8 py-4 rounded-xl font-bold text-white glass-card hover:bg-white/10 transition-colors duration-300">
            Schedule a Visit
          </button>
        </motion.div>
      </div>

      {/* Gradient Overlay for bottom blending */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-0"></div>
    </section>
  );
}
