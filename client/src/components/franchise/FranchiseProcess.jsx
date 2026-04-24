import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Application",
    desc: "Fill the inquiry form and our franchise experts will get in touch with you for initial screening."
  },
  {
    number: "02",
    title: "Site Selection",
    desc: "We help you identify or validate the perfect location based on data-driven footfall & demand analysis."
  },
  {
    number: "03",
    title: "Setup & Design",
    desc: "Our interior design team provides standard layouts to maintain our premium 'Startup Cafe' aesthetic."
  },
  {
    number: "04",
    title: "Hiring & Training",
    desc: "Recruitment assistance and intensive training for your staff on our hospitality standards and software."
  },
  {
    number: "05",
    title: "Grand Launch",
    desc: "A massive marketing push and launch event to ensure high occupancy from day one."
  }
];

export default function FranchiseProcess() {
  return (
    <section id="process" className="py-20 md:py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Path to <span className="text-neon-pink">Ownership</span></h2>
          <p className="text-slate-400 text-sm md:text-base">Five simple steps to launching your own Startup Cafe.</p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white/10 hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                  <div className="bg-gradient-to-r from-neon-purple to-neon-pink p-[1px] rounded-2xl mb-6">
                    <div className="bg-dark-bg px-4 md:px-5 py-2 rounded-2xl">
                      <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-400 text-sm md:text-base max-w-sm md:max-w-md">{step.desc}</p>
                </motion.div>
                
                {/* Center Circle */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-pink shadow-[0_0_15px_#ff2975] z-10 items-center justify-center"></div>
                
                <div className="lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
