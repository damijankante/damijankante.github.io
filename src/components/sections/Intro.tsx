import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { FaBehance } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Intro = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {t("intro.title")}
            </span>
            <br />
            {t("intro.subtitle")}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t("intro.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 shadow-glow transition-all duration-300"
              onClick={() => scrollToSection("about")}
            >
              {t("intro.exploreWork")}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection("contact")}
            >
              {t("intro.getInTouch")}
            </Button>
          </div>

          {/* Social media links */}
          <div className="flex justify-center space-x-6 mb-12">
            <Button variant="ghost" size="sm" className="p-3 hover:text-primary">
              <a
                href="https://github.com/damijankante"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="p-3 hover:text-primary">
              <a
                href="https://www.linkedin.com/in/damijankante/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="p-3 hover:text-primary">
              <a
                href="https://www.behance.net/damijankante"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
              >
                <FaBehance className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="p-3 hover:text-primary">
              <a
                href="mailto:damijan.kante@gmail.com"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection("about")}
          className="p-2 hover:text-primary"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default Intro;