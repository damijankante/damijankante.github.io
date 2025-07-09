import Navigation from "@/components/ui/Navigation";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import DataAnalysis from "@/components/sections/DataAnalysis";
import GraphicDesign from "@/components/sections/GraphicDesign";
import Coding from "@/components/sections/Coding";
import CV from "@/components/sections/CV";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Intro />
      <About />
      <DataAnalysis />
      <GraphicDesign />
      <Coding />
      <CV />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;