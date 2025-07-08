import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import TemplatesSection from "../../components/TemplatesSection";
import ServicesSection from "../../components/ServicesSection";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";

const Home = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TemplatesSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
