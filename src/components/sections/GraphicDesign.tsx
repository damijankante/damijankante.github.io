import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Eye, Award, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import imgIntPortfolio from "../../assets/images/interactive-portfolio.png";

const GraphicDesign = () => {
  const { t } = useTranslation();

  const projects = [
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
      category_color: "bg-green-500"
    },
    {
      title: "Brand Identity System",
      description: "Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.",
      category: "Branding",
      tools: ["Adobe Illustrator", "Figma", "Photoshop"],
      achievements: ["50+ logo concepts", "Complete style guide", "Business card designs"],
      image: "/api/placeholder/400/300",
      behanceLink: "#",
      category_color: "bg-purple-500"
    },
    {
      title: "Marketing Campaign Design",
      description: "Multi-channel marketing materials including print ads, social media graphics, and web banners for product launch.",
      category: "Marketing",
      tools: ["Adobe Creative Suite", "InDesign", "After Effects"],
      achievements: ["15% increase in engagement", "Award-winning campaign", "Multi-platform design"],
      image: "/api/placeholder/400/300",
      behanceLink: "#",
      category_color: "bg-blue-500"
    },
    {
      title: "Print Design Collection",
      description: "Print materials including brochures, posters, and packaging design with attention to typography and layout.",
      category: "Print",
      tools: ["InDesign", "Illustrator", "Photoshop"],
      achievements: ["Award recognition", "Client satisfaction 95%", "Sustainable design focus"],
      image: "/api/placeholder/400/300",
      behanceLink: "#",
      category_color: "bg-orange-500"
    },
    {
      title: "Social Media Graphics",
      description: "Engaging social media content design for various platforms including Instagram, Facebook, and LinkedIn campaigns.",
      category: "Digital",
      tools: ["Canva Pro", "Adobe Creative Suite", "Figma"],
      achievements: ["200% engagement increase", "Viral content created", "Brand consistency"],
      image: "/api/placeholder/400/300",
      behanceLink: "#",
      category_color: "bg-pink-500"
    },
    {
      title: "Illustration Series",
      description: "Custom illustrations for editorial content, websites, and marketing materials with unique artistic style.",
      category: "Illustration",
      tools: ["Procreate", "Adobe Illustrator", "Photoshop"],
      achievements: ["Featured in design blogs", "Licensed artwork", "Client testimonials"],
      image: "/api/placeholder/400/300",
      behanceLink: "#",
      category_color: "bg-teal-500"
    }
  ];

  return (
    <section id="graphic-design" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <Palette className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Graphic <span className="bg-gradient-primary bg-clip-text text-transparent">Design</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Creating visually compelling designs that communicate effectively and leave lasting impressions. 
            From brand identity to digital marketing materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card overflow-hidden">
              <div className="aspect-[4/2.25] bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
                <Palette className="h-12 w-12 text-muted-foreground" />
                {/* Conditionally render image or placeholder icon */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <Badge key={toolIndex} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Achievements:</h4>
                  {project.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center text-sm text-muted-foreground">
                      <Award className="h-3 w-3 mr-2 text-accent" />
                      {achievement}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Behance
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GraphicDesign;