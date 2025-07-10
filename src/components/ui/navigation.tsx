import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSelector } from "@/components/ui/language-selector";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  // State to manage the mobile menu's open/closed status.
  const [isOpen, setIsOpen] = useState(false);
  // State to track the currently active navigation section based on scroll position.
  const [activeSection, setActiveSection] = useState("home");
  // Hook from react-i18next to get the translation function.
  const { t } = useTranslation();

  // Effect to handle scroll events for active section highlighting.
  useEffect(() => {
    // Defines the logic to determine the active section.
    const handleScroll = () => {
      // Array of all section IDs to track.
      const sections = ["home", "about", "data-analysis", "graphic-design", "coding", "cv", "contact"];
      // Add a 100px offset to trigger the highlight slightly before the section top.
      const scrollPosition = window.scrollY + 100;

      // Iterate over sections to find the one currently in view.
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          // Check if the scroll position is within the bounds of the current section.
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            // Break the loop once the active section is found.
            break;
          }
        }
      }
    };

    // Add the scroll event listener when the component mounts.
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener when the component unmounts.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  // Function to smoothly scroll to a specific section.
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close the mobile menu after a navigation item is clicked.
    setIsOpen(false);
  };

  // Defines the navigation items using translated labels.
  const navItems = [
    { id: "home", label: t("navigation.home") },
    { id: "about", label: t("navigation.about") },
    { id: "data-analysis", label: t("navigation.dataAnalysis") },
    { id: "graphic-design", label: t("navigation.graphicDesign") },
    { id: "coding", label: t("navigation.coding") },
    { id: "cv", label: t("navigation.cv") },
    { id: "contact", label: t("navigation.contact") },
  ];

  return (
    // Main navigation bar, fixed at the top with a blurred background.
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Portfolio title with a gradient text effect. */}
          <div className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
            {t("navigation.portfolio")}
          </div>

          {/* Desktop Navigation */}
          {/* This block is hidden on small screens and visible on medium screens and up. */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  // Uses cn utility for conditional class names.
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    // Applies active styles if the section matches the activeSection state.
                    activeSection === item.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <LanguageSelector />
            <ThemeToggle />
          </div>

          {/* Mobile menu button and controls */}
          {/* This block is visible only on small screens. */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {/* Toggles between Menu and X icons based on the mobile menu state. */}
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {/* This dropdown menu is conditionally rendered based on the isOpen state. */}
        {isOpen && (
          <div className="md:hidden py-4 bg-background border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "px-3 py-2 text-left text-sm font-medium transition-colors hover:text-primary",
                    // Applies different active styles for the mobile menu.
                    activeSection === item.id
                      ? "text-primary bg-primary/10 rounded-md"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;