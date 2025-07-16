import { useState } from "react";
import { loadGalleryImages } from "@/lib/galleryLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectModal from "@/components/ui/projectModal";
import ScrollToTopButton from "@/components/ui/scrollToTopButton";
import imgIntPortfolio from "@/assets/images/interactive-portfolio.png";
import { Palette, Eye, Award, ExternalLink } from "lucide-react";
import { FaBehance } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Define the types for our project data
interface GalleryImage {
  src: string;
  description: string;
}
interface Project {
  title: string;
  description: string;
  category: string;
  tools: string[];
  achievements: string[];
  image: string | null;
  behanceLink: string;
  category_color: string;
  gallery: GalleryImage[];
}

const GraphicDesign = () => {
  const { t } = useTranslation();
  // State to manage the currently selected project for the modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: t("graphicDesign.interactivePortfolio.title"),
      description: t("graphicDesign.interactivePortfolio.description"),
      category: t("graphicDesign.interactivePortfolio.category"),
      tools: ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator","Acrobat Reader"],
      achievements: [
        t("graphicDesign.interactivePortfolio.achievements.0"),
        t("graphicDesign.interactivePortfolio.achievements.1"),
        t("graphicDesign.interactivePortfolio.achievements.2"),
      ],
      image: imgIntPortfolio,
      behanceLink: "https://www.behance.net/gallery/230210571/Interactive-Portfolio",
      category_color: "bg-green-500",
      gallery: loadGalleryImages("interactive-portfolio"),
    },
    {
      title: "Brand Identity System",
      description: "Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.",
      category: "Branding",
      tools: ["Adobe Illustrator", "Figma", "Photoshop"],
      achievements: ["50+ logo concepts", "Complete style guide", "Business card designs"],
      image: null,
      behanceLink: "#",
      category_color: "bg-purple-500",
      gallery: [
        { src: "/api/placeholder/800/600?text=Logo+Concepts", description: "Initial sketches and final vector logo designs." },
        { src: "/api/placeholder/800/600?text=Color+Palette", description: "The primary and secondary color palettes defined for the brand." },
        { src: "/api/placeholder/800/600?text=Typography+System", description: "Chosen typefaces for headings, subheadings, and body text." },
        { src: "/api/placeholder/800/600?text=Business+Cards", description: "Mockup of the final business card design." },
        { src: "/api/placeholder/800/600?text=Brand+Guidelines", description: "A page from the comprehensive brand style guide." },
        { src: "/api/placeholder/800/600?text=Social+Media+Templates", description: "Templates for consistent branding on social platforms." },
      ]
    },
    {
      title: "Marketing Campaign Design",
      description: "Multi-channel marketing materials including print ads, social media graphics, and web banners for product launch.",
      category: "Marketing",
      tools: ["Adobe Creative Suite", "InDesign", "After Effects"],
      achievements: ["15% increase in engagement", "Award-winning campaign", "Multi-platform design"],
      image: null,
      behanceLink: "#",
      category_color: "bg-blue-500",
      gallery: [
        { src: "/api/placeholder/800/600?text=Print+Ad", description: "Magazine advertisement designed for the campaign." },
        { src: "/api/placeholder/800/600?text=Social+Media+Post", description: "Example of an engaging Instagram post." },
        { src: "/api/placeholder/800/600?text=Web+Banner", description: "Animated web banner created with After Effects." },
        { src: "/api/placeholder/800/600?text=Print+Ad", description: "Magazine advertisement designed for the campaign." },
        { src: "/api/placeholder/800/600?text=Social+Media+Post", description: "Example of an engaging Instagram post." },
        { src: "/api/placeholder/800/600?text=Web+Banner", description: "Animated web banner created with After Effects." },
      ]
    },
    {
      title: "Print Design Collection",
      description: "Print materials including brochures, posters, and packaging design with attention to typography and layout.",
      category: "Print",
      tools: ["InDesign", "Illustrator", "Photoshop"],
      achievements: ["Award recognition", "Client satisfaction 95%", "Sustainable design focus"],
      image: null,
      behanceLink: "#",
      category_color: "bg-orange-500",
       gallery: [
        { src: "/api/placeholder/800/600?text=Brochure", description: "A tri-fold brochure with compelling layout and imagery." },
        { src: "/api/placeholder/800/600?text=Poster+Design", description: "Event poster focusing on bold typography." },
        { src: "/api/placeholder/800/600?text=Packaging", description: "Product packaging design with a focus on sustainability." },
        { src: "/api/placeholder/800/600?text=Print+Ad", description: "Magazine advertisement designed for the campaign." },
        { src: "/api/placeholder/800/600?text=Social+Media+Post", description: "Example of an engaging Instagram post." },
        { src: "/api/placeholder/800/600?text=Web+Banner", description: "Animated web banner created with After Effects." },
      ]
    },
    {
      title: "Social Media Graphics",
      description: "Engaging social media content design for various platforms including Instagram, Facebook, and LinkedIn campaigns.",
      category: "Digital",
      tools: ["Canva Pro", "Adobe Creative Suite", "Figma"],
      achievements: ["200% engagement increase", "Viral content created", "Brand consistency"],
      image: null,
      behanceLink: "#",
      category_color: "bg-pink-500",
       gallery: [
        { src: "/api/placeholder/800/600?text=Instagram+Carousel", description: "A multi-slide carousel post for Instagram." },
        { src: "/api/placeholder/800/600?text=Facebook+Ad", description: "An effective ad design for Facebook campaigns." },
        { src: "/api/placeholder/800/600?text=LinkedIn+Graphic", description: "Professional graphic for a LinkedIn article." },
        { src: "/api/placeholder/800/600?text=Print+Ad", description: "Magazine advertisement designed for the campaign." },
        { src: "/api/placeholder/800/600?text=Social+Media+Post", description: "Example of an engaging Instagram post." },
        { src: "/api/placeholder/800/600?text=Web+Banner", description: "Animated web banner created with After Effects." },
      ]
    },
    {
      title: "Illustration Series",
      description: "Custom illustrations for editorial content, websites, and marketing materials with unique artistic style.",
      category: "Illustration",
      tools: ["Procreate", "Adobe Illustrator", "Photoshop"],
      achievements: ["Featured in design blogs", "Licensed artwork", "Client testimonials"],
      image: null,
      behanceLink: "#",
      category_color: "bg-teal-500",
      gallery: [
        { src: "/api/placeholder/800/600?text=Editorial+Illustration", description: "Illustration for a magazine article." },
        { src: "/api/placeholder/800/600?text=Website+Hero", description: "Hero illustration for a website landing page." },
        { src: "/api/placeholder/800/600?text=Character+Design", description: "A unique character designed for a brand mascot." },
        { src: "/api/placeholder/800/600?text=Print+Ad", description: "Magazine advertisement designed for the campaign." },
        { src: "/api/placeholder/800/600?text=Social+Media+Post", description: "Example of an engaging Instagram post." },
        { src: "/api/placeholder/800/600?text=Web+Banner", description: "Animated web banner created with After Effects." },
      ]
    }
  ];

  return (
    <>
      <section id="graphic-design" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Palette className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("graphicDesign.graphic")} <span className="bg-gradient-primary bg-clip-text text-transparent">{t("graphicDesign.design")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("graphicDesign.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card overflow-hidden flex flex-col">
                <div className="aspect-[4/3] bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
                  {/* Conditionally render image or placeholder icon */}
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <Palette className="h-12 w-12 text-muted-foreground" />
                  )}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${project.category_color}`}>
                    {project.category}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-lg">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 flex-grow">
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, toolIndex) => (
                      <Badge key={toolIndex} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{t("graphicDesign.achievements")}:</h4>
                    {project.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-center text-sm text-muted-foreground">
                        <Award className="h-3 w-3 mr-2 text-accent" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="flex gap-2 p-6 pt-0">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedProject(project)}>
                    <Eye className="h-4 w-4 mr-2" />
                    {t("graphicDesign.view")}
                  </Button>
                  <a href={project.behanceLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      <FaBehance className="h-4 w-4 mr-2" />
                      Behance
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
          <div className="relative mt-16">
            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                {/* 3. Adapt the link, icon, and text for Behance */}
                <a
                  href="https://www.behance.net/damijankante"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaBehance className="h-5 w-5 mr-2" />
                  {t("graphicDesign.visitBehance")}
                </a>
              </Button>
            </div>
            <div className="absolute right-0 top-0 h-full flex items-center">
              <ScrollToTopButton />
            </div>
          </div>
        </div>
      </section>

      <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject}/>
    </>
  );
};

export default GraphicDesign;