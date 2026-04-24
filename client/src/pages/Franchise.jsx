import { useEffect } from 'react';
import FranchiseHero from '../components/franchise/FranchiseHero';
import FranchiseAbout from '../components/franchise/FranchiseAbout';
import FranchiseBenefits from '../components/franchise/FranchiseBenefits';
import RevenueModel from '../components/franchise/RevenueModel';
import FranchiseProcess from '../components/franchise/FranchiseProcess';
import FranchiseSupport from '../components/franchise/FranchiseSupport';
import FranchiseRequirements from '../components/franchise/FranchiseRequirements';
import InquiryForm from '../components/franchise/InquiryForm';
import FranchiseTestimonials from '../components/franchise/FranchiseTestimonials';
import Contact from '../components/sections/Contact';

export default function Franchise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-bg min-h-screen">
      <FranchiseHero />
      <FranchiseAbout />
      <FranchiseBenefits />
      <RevenueModel />
      <FranchiseProcess />
      <FranchiseSupport />
      <FranchiseRequirements />
      <FranchiseTestimonials />
      <InquiryForm />
    </div>
  );
}
