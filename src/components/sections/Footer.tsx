import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-muted-foreground text-sm">
              Multi-disciplinary professional specializing in data analysis, graphic design, 
              and software development.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="p-2 hover:text-primary">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:text-primary">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <button className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About
              </button>
              <button className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Data Analysis
              </button>
              <button className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Graphic Design
              </button>
              <button className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Coding Projects
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Data Visualization</p>
              <p className="text-muted-foreground text-sm">Statistical Analysis</p>
              <p className="text-muted-foreground text-sm">Brand Design</p>
              <p className="text-muted-foreground text-sm">Web Development</p>
              <p className="text-muted-foreground text-sm">UI/UX Design</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">damijan.kante@gmail.com</p>
              <p className="text-muted-foreground text-sm">+386 (40) 525 827</p>
              <p className="text-muted-foreground text-sm">Ptuj, Slovenia</p>
              <Button variant="outline" size="sm" className="mt-2">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-2 hover:text-primary"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;