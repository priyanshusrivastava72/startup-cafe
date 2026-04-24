import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import Franchise from './pages/Franchise';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative selection:bg-neon-pink selection:text-white">
        {/* Global Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-dark-bg">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-neon-blue/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
        </div>

        <Navbar />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/franchise" element={<Franchise />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
