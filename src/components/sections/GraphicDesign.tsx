import { useState } from "react";
import { loadCoverImages} from "@/lib/coverImageLoader";
import { loadGalleryImages } from "@/lib/galleryLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectModal from "@/components/ui/projectModal";
import ScrollToTopButton from "@/components/ui/scrollToTopButton";
import { Palette, Eye, Award, ExternalLink } from "lucide-react";
import { FaBehance } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Define the types for our project data
interface GalleryImage {
  src: string;
  description: string;
}
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tools: string[];
  achievements: string[];
  behanceLink: string;
  category_color: string;
  gallery: GalleryImage[];
  image?: string | null;
}

const coverImages = loadCoverImages();

const GraphicDesign = () => {
  const { t } = useTranslation();
  // State to manage the currently selected project for the modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "graphic-magazine-design",
      title: t("graphicDesign.magazineDesign.title"),
      description: t("graphicDesign.magazineDesign.description"),
      category: t("graphicDesign.magazineDesign.category"),
      tools: ["InDesign", "Illustrator", "Photoshop","InCopy"],
      achievements: [
        t("graphicDesign.magazineDesign.achievements.0"),
        t("graphicDesign.magazineDesign.achievements.1"),
        t("graphicDesign.magazineDesign.achievements.2"),
      ],
      behanceLink: "https://www.behance.net/portfolio/editor?project_id=230721947",
      category_color: "bg-orange-500",
      gallery: loadGalleryImages("magazine-design"),
    },
        {
      id: "graphic-ads",
      title: t("graphicDesign.ads.title"),
      description: t("graphicDesign.ads.description"),
      category: t("graphicDesign.ads.category"),
      tools: ["InDesign", "Photoshop", "Illustrator", "Dreamweaver"],
      achievements: [
        t("graphicDesign.ads.achievements.0"),
        t("graphicDesign.ads.achievements.1"),
        t("graphicDesign.ads.achievements.2"),
      ],
      behanceLink: "https://www.behance.net/portfolio/editor?project_id=230976533",
      category_color: "bg-purple-500",
       gallery: loadGalleryImages("ads"),
    },
    { 
      id: "graphic-business-cards",
      title: t("graphicDesign.businessCards.title"),
      description: t("graphicDesign.businessCards.description"),
      category: t("graphicDesign.businessCards.category"),
      tools: ["InDesign", "Illustrator", "Photoshop"],
      achievements: [
        t("graphicDesign.businessCards.achievements.0"),
        t("graphicDesign.businessCards.achievements.1"),
        t("graphicDesign.businessCards.achievements.2"),
      ],
      behanceLink: "https://www.behance.net/gallery/230677923/Business-Cards",
      category_color: "bg-blue-500",
      gallery: loadGalleryImages("business-cards"),
    },
    {
      id: "graphic-image-retouching",
      title: t("graphicDesign.imageRetouching.title"),
      description: t("graphicDesign.imageRetouching.description"),
      category: t("graphicDesign.imageRetouching.category"),
      tools: ["Photoshop", "Lightroom", "Wacom Tablet"],
      achievements: [
        t("graphicDesign.imageRetouching.achievements.0"),
        t("graphicDesign.imageRetouching.achievements.1"),
        t("graphicDesign.imageRetouching.achievements.2"),
      ],
      behanceLink: "https://www.behance.net/gallery/230889511/Image-Enhancements",
      category_color: "bg-red-500",
       gallery: loadGalleryImages("image-retouching"),
    },
    {
      id: "graphic-illustration-series",
      title: t("graphicDesign.illustration.title"),
      description: t("graphicDesign.illustration.description"),
      category: t("graphicDesign.illustration.category"),
      tools: ["Adobe Illustrator"],
      achievements: [
        t("graphicDesign.illustration.achievements.0"),
        t("graphicDesign.illustration.achievements.1"),
        t("graphicDesign.illustration.achievements.2"),
      ],
      behanceLink: "https://www.behance.net/gallery/230763375/Illustrations",
      category_color: "bg-teal-500",
      gallery: loadGalleryImages("illustrations"),
    },
    {
      id: "graphic-interactive-portfolio",
      title: t("graphicDesign.interactivePortfolio.title"),
      description: t("graphicDesign.interactivePortfolio.description"),
      category: t("graphicDesign.interactivePortfolio.category"),
      tools: ["InDesign", "Photoshop", "Illustrator"],
      achievements: [
        t("graphicDesign.interactivePortfolio.achievements.0"),
        t("graphicDesign.interactivePortfolio.achievements.1"),
        t("graphicDesign.interactivePortfolio.achievements.2"),
      ],
      behanceLink: "https://www.behance.net/gallery/230210571/Interactive-Portfolio",
      category_color: "bg-pink-500",
      gallery: loadGalleryImages("interactive-portfolio"),
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
            {projects.map((project, index) => {
              // Automatically find the cover image URL by matching the project's ID.
              const imageUrl = coverImages[project.id];
              
              //  Create a new, complete project object that includes the image URL.
              const completeProject = { ...project, image: imageUrl }; 
                      
              return (
                <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
                    {/* Use the dynamically found imageUrl. If it's not found, the placeholder will render. */}
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={completeProject.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <Palette className="h-12 w-12 text-muted-foreground" />
                    )}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${completeProject.category_color}`}>
                      {completeProject.category}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors text-lg">
                      {completeProject.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 flex-grow">
                    <p className="text-muted-foreground text-sm">{completeProject.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {completeProject.tools.map((tool, toolIndex) => (
                        <Badge key={toolIndex} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{t("graphicDesign.achievements")}:</h4>
                      {completeProject.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-center text-sm text-muted-foreground">
                          <Award className="h-3 w-3 mr-2 text-accent" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <div className="flex gap-2 p-6 pt-0">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedProject(completeProject)}>
                      <Eye className="h-4 w-4 mr-2" />
                      {t("graphicDesign.view")}
                    </Button>
                    <a href={completeProject.behanceLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">
                        <FaBehance className="h-4 w-4 mr-2" />
                        Behance
                      </Button>
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-4 mt-16 md:relative md:block">
            <div className="md:text-center">
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
            <div className="md:absolute md:right-0 md:top-0 md:h-full md:flex md:items-center">
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