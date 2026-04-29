import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, ZoomIn, X, ChevronDown } from 'lucide-react';

// Vite magic: Automatically find all images in this folder at build time
const importedMedia = import.meta.glob('../../assets/press/*.{jpg,jpeg,png,webp}', { eager: true });
const mediaItems = Object.entries(importedMedia).map(([path, module]) => ({
  url: module.default,
  fileName: path.split('/').pop().split('.')[0]
})).sort((a, b) => {
  // Sort N1, N2, N3 to be first
  const priorityOrder = { 'N1': 1, 'N2': 2, 'N3': 3 };
  const aOrder = priorityOrder[a.fileName] || 999;
  const bOrder = priorityOrder[b.fileName] || 999;
  return aOrder - bOrder;
});

const displayItems = mediaItems;

// Yahan par list hai aapki SAARI 36 images ki. 
// Jiska bhi Tile/Description badalna ho, uske aage quotes (" ") me likh dijiye!
const knownImageDescriptions = {
  "N1": { title: "Ministerial Recognition", publisher: "Government Feature", excerpt: "Recognized by Shri Suresh Prabhu for our startup innovation." },
  "N2": { title: "Media Recognition", publisher: "News Coverage", excerpt: "Recognized for providing premium work environments and fostering innovation." },
  "N3": { title: "Community Buzz", publisher: "Media Update", excerpt: "A glimpse of our journey and the growing startup community in the region." },
  "117325628_3043734575735474_4426712789553836837_n": { title: "iNext Coverage", publisher: "Newspaper", excerpt: "Empowering youth with new career opportunities through co-working" },
  "48239714_1845855142190096_7959491405070467072_n": { title: "Hindustan Times Feature", publisher: "Newspaper", excerpt: "Recognized for expanding co-working in smaller cities" },
  "511148711_9828983690543828_1849157987430120083_n": { title: "Featured in iNext", publisher: "Newspaper", excerpt: "Recognized for providing complete workspace solutions" },
  "511154936_9829038743871656_1167919058874365971_n": { title: "StartupMeet Highlight", publisher: "Online Media", excerpt: "Showcased as a launchpad for startups in Eastern UP" },
  "511194923_9829038780538319_1138943843174704645_n": { title: "Community Spotlight", publisher: "Social Media", excerpt: "Gaining attention as Gorakhpur’s first startup cafe" },
  "511196241_9828982580543939_6497561737373136845_n": { title: "Startup Ecosystem Spotlight", publisher: "Online Media", excerpt: "Recognized for providing flexible workspaces" },
  "511269952_9829038590538338_3984337312992608587_n": { title: "Government Recognition", publisher: "Social Media", excerpt: "Highlighted as Gorakhpur’s first co-working space" },
  "511273250_9829038607205003_4707701543895724071_n": { title: "National Recognition", publisher: "Social Media", excerpt: "Appreciated by Union Minister for startup innovation" },
  "511273393_9829038603871670_5555825465193524367_n": { title: "Youth Startup Recognition", publisher: "Social Media", excerpt: "Appreciated for empowering young entrepreneurs" },
  "511276149_9828982633877267_7415711151241731843_n": { title: "Print Media Coverage", publisher: "Newspaper", excerpt: "Recognized for providing affordable co-working solutions" },
  "511316979_9829038367205027_7980695819423604436_n": { title: "Regional Media Spotlight", publisher: "Online Media", excerpt: "Praised by central leadership for co-working innovation" },
  "511319697_9828982587210605_8408103758538641615_n": { title: "Ministerial Recognition", publisher: "Newspaper", excerpt: "Praised by Union Minister for innovative startup concept" },
  "512489809_9834385283337002_6705041643710896110_n": { title: "Entrepreneurial Impact", publisher: "Newspaper", excerpt: "Recognized for helping others grow and succeed" },
  "512867531_9826802614095269_7719344352561593963_n": { title: "Make In India Spotlight", publisher: "Social Media", excerpt: "Featured by Make in India for startup innovation" },
  "513677509_9828982597210604_847588708771159933_n": { title: "Dainik Bhaskar Feature", publisher: "Online Media", excerpt: "Bringing co-working to emerging cities" },
  "513849652_9829038610538336_6971725309319097137_n": { title: "Patrika Highlight", publisher: "Social Media", excerpt: "Praised for empowering young entrepreneurs in Gorakhpur" },
  "513863871_9829038570538340_3927020416893395257_n": { title: "Startup Ecosystem Growth", publisher: "Online Media", excerpt: "Supporting startup ecosystem locally in Gorakhpur" },
  "513869628_9834522413323289_3766929065946811056_n": { title: "Youth Empowerment", publisher: "Newspaper", excerpt: "Highlighted for supporting young entrepreneurs" },
  "513876583_9829038733871657_9055544073417046542_n": { title: "Community Impact", publisher: "Social Media", excerpt: "Creating opportunities for young professionals" },
  "513904826_9828982527210611_4516023911331616550_n": { title: "Startup Spotlight", publisher: "Online Media", excerpt: "Recognized as Eastern UP’s first co-working space" },
  "513933764_9829038337205030_1572199667439423908_n": { title: "Digital News Coverage", publisher: "Online Media", excerpt: "Reaching wider audience through digital media" },
  "514042905_9826827987426065_7400867662913067041_n": { title: "Ministerial Spotlight", publisher: "Social Media", excerpt: "Acknowledged by Union Minister for startup innovation" },
  "514050048_9829038370538360_3106129957928587771_n": { title: "Growth & Innovation", publisher: "Online Media", excerpt: "Highlighted for bringing co-working culture to Gorakhpur" },
  "514059340_9829038373871693_8910340330915591480_n": { title: "Solving Workspace Problems", publisher: "Newspaper", excerpt: "Providing affordable offices for small businesses" },
  "514106810_9828982607210603_8884827876088428322_n": { title: "City Growth Story", publisher: "Newspaper", excerpt: "Highlighted for bringing co-working culture to Gorakhpur" },
  "514323365_9828982520543945_7847505910217033037_n": { title: "Industry Recognition", publisher: "Newspaper", excerpt: "Praised by ministers and business leaders" },
  "514340471_9831097290332468_1208462266478007682_n": { title: "Policy Level Recognition", publisher: "Newspaper", excerpt: "Invited to contribute to industrial policy discussions" },
  "514371032_9828982643877266_2867878972913581948_n": { title: "Ministerial Appreciation", publisher: "Newspaper", excerpt: "Praised by Union Minister for innovative concept" },
  "514414400_9834501546658709_5389555445225039589_n": { title: "Startup Growth Hub", publisher: "Newspaper", excerpt: "Turning Gorakhpur into a business destination" },
  
};

// Helper to extract a nice title from the image file name
const extractInfoFromFileName = (fileName) => {
  try {
    
    // If we have a custom description for this file, use it!
    if (knownImageDescriptions[fileName]) {
      return knownImageDescriptions[fileName];
    }

    const cleanTitle = fileName
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
      
    const isAutoGenerated = /\d{5,}/.test(fileName);
      
    // Return formatted data fallback
    return {
      title: isAutoGenerated ? "Media Highlight" : (cleanTitle || "Media Highlight"),
      publisher: "Startup Cafe Feature",
      excerpt: "A glimpse of our journey, community buzz, and media coverage across various platforms.",
    };
  } catch {
    return { title: "Media Highlight", publisher: "Feature", excerpt: "Special feature in our highlight reel." };
  }
};

export default function PressCoverage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Determine how many images to show
  const visibleImages = showAll ? displayItems : displayItems.slice(0, 8);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setSelectedImage(null);
  };

  return (
    <section id="press" className="py-24 px-6 md:px-12 relative z-10 overflow-hidden bg-dark-bg/50" onKeyDown={handleKeyDown}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Newspaper className="text-neon-pink w-6 h-6" />
            <span className="text-neon-pink font-semibold tracking-wider uppercase text-sm">Media & Highlights</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            In The <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Spotlight</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg"
          >
            See what leading newspapers, media outlets, and the community are saying about our revolutionary co-working space.
          </motion.p>
        </div>

        {/* Card Layout matching the original design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {visibleImages.map((item, index) => {
              const meta = extractInfoFromFileName(item.fileName);
              
              return (
                <motion.div
                  key={item.url + index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImage(item.url)}
                  className={`glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all group cursor-pointer flex-col ${!showAll && index >= 4 ? 'hidden md:flex' : 'flex'}`}
                >
                  <div className="h-44 overflow-hidden relative bg-white/5">
                    <div className="absolute inset-0 bg-dark-bg/20 z-10 group-hover:bg-transparent transition-colors duration-300"></div>
                    <img 
                      src={item.url} 
                      alt={meta.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 relative z-0 opacity-90 group-hover:opacity-100"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    
                    {/* Overlay Zoom Icon */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-bg/40 backdrop-blur-sm">
                      <ZoomIn className="text-white w-10 h-10 drop-shadow-md" />
                    </div>
                    
                    <div className="absolute bottom-3 left-3 z-30">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10">
                        {meta.publisher}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col bg-white/[0.02]">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                      {meta.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mt-auto">
                      {meta.excerpt}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Show More Button */}
        {displayItems.length > 8 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-pink text-white transition-all font-medium group"
            >
              {showAll ? 'Show Less' : `View All (${displayItems.length} Highlights)`}
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-neon-pink group-hover:translate-y-1 ${showAll ? 'rotate-180 group-hover:-translate-y-1' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12 backdrop-blur-md cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={selectedImage}
              alt="Full Page Highlight"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl relative z-40"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
