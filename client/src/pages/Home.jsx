import { useState } from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Pricing from '../components/sections/Pricing';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import PressCoverage from '../components/sections/PressCoverage';
import Contact from '../components/sections/Contact';

export default function Home() {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookingSelect = (bookingInfo) => {
    setSelectedBooking(bookingInfo);
  };

  return (
    <div className="pt-0">
      <Hero />
      <About />
      <Services />
      <PressCoverage />
      <Pricing onSelectBooking={handleBookingSelect} />
      <Gallery />
      <Testimonials />
      <Contact selectedBooking={selectedBooking} />
    </div>
  );
}
