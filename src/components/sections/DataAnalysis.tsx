import { useState } from "react";
import { loadCoverImages } from "@/lib/coverImageLoader";
import { loadGalleryImages } from "@/lib/galleryLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectModal from "@/components/ui/projectModal";
import ScrollToTopButton from "@/components/ui/scrollToTopButton";
import { BarChart3, TrendingUp, Database, Github, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

// Define the Project interface.
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  metrics: string[];
  view: string;
  githubLink: string;
  gallery: { src: string; description: string }[];
  image?: string | null;
  embedUrl?: string | null;
}

const coverImages = loadCoverImages();

const DataAnalysis = () => {
  // Hook for handling internationalization (i18n)
  const { t } = useTranslation();

  // State to manage the currently selected project for the modal. Null when closed.
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // An array of project objects
  const projects: Project[] = [
    {
      id: "coffee-sales-dashboard",
      title: t("dataAnalysis.coffeeSalesDashboard.title"),
      description: t("dataAnalysis.coffeeSalesDashboard.description"),
      technologies: ["Excel", "Power Query", "Pivot Charts", "Slicers", "Timelines", "Python"],
      metrics: t("dataAnalysis.coffeeSalesDashboard.metrics", { returnObjects: true }) as string[],
      image: null,
      view: "#",
      githubLink: "https://github.com/damijankante/excel-coffee-sales-analysis",
      gallery: [],
      embedUrl: "https://1drv.ms/x/c/fa3f0ea2daf0e4f7/IQSXBSt59_yhRoHdXJ5iln-JAb2GpgrH9ORmTRODmR9X3zs"
    },
    {
      id: "data-sales-dashboard",
      title: t("dataAnalysis.salesDashboard.title"),
      description: t("dataAnalysis.salesDashboard.description"),
      technologies: ["Python", "Pandas", "Tableau", "SQL"],
      metrics: t("dataAnalysis.salesDashboard.metrics", { returnObjects: true }) as string[],
      image: null,
      view: "#",
      githubLink: "#",
      gallery: []
    },
    {
      id: "data-customer-segmentation",
      title: t("dataAnalysis.customerSegmentation.title"),
      description: t("dataAnalysis.customerSegmentation.description"),
      technologies: ["R", "Machine Learning", "ggplot2", "Power BI"],
      metrics: t("dataAnalysis.customerSegmentation.metrics", { returnObjects: true }) as string[],
      image: null,
      view: "#",
      githubLink: "#",
      gallery: []
    },
    {
      id: "data-predictive-analytics",
      title: t("dataAnalysis.predictiveAnalytics.title"),
      description: t("dataAnalysis.predictiveAnalytics.description"),
      technologies: ["Python", "Scikit-learn", "TensorFlow", "Jupyter"],
      metrics: t("dataAnalysis.predictiveAnalytics.metrics", { returnObjects: true }) as string[],
      image: null,
      view: "#",
      githubLink: "#",
      gallery: []
    }
  ];

  return (
    <>
      <section id="data-analysis" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("dataAnalysis.title")} <span className="bg-gradient-primary bg-clip-text text-transparent">{t("dataAnalysis.science")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("dataAnalysis.description")}
            </p>
          </div>

          {/* Grid container for project cards. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {

              const imageUrl = coverImages[project.id];
              const completeProject = { ...project, image: imageUrl };
              
              return (
                <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card overflow-hidden flex flex-col">
                  {/* Image container for the project. */}
                  <div className="aspect-[4/3] bg-gradient-subtle flex items-center justify-center">
                    {/* Conditionally render the image or a fallback icon if the image is null. */}
                    {completeProject.image ? (
                      <img src={completeProject.image} alt={project.title} className="h-full w-full object-cover"/>
                    ) : (
                      <Database className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Card header containing the project title. */}
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {completeProject.title}
                    </CardTitle>
                  </CardHeader>
                  
                  {/* Main content area. `flex-grow` makes it expand, pushing buttons to the bottom. */}
                  <CardContent className="space-y-4 flex-grow">
                    <p className="text-muted-foreground">{completeProject.description}</p>
                    
                    {/* A wrapper for technology badges. */}
                    <div className="flex flex-wrap gap-2">
                      {completeProject.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* A wrapper for key metrics/results. */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{t("dataAnalysis.keyResults")}</h4>
                      {completeProject.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center text-sm text-muted-foreground">
                          <TrendingUp className="h-3 w-3 mr-2 text-accent" />
                          {metric}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Button container */}
                  <div className="flex gap-2 p-6 pt-0">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1" 
                      onClick={() => setSelectedProject(completeProject)}
                      disabled={completeProject.gallery.length === 0 && !completeProject.embedUrl}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {t("dataAnalysis.view")}
                    </Button>

                    {/* Conditionally render the GitHub button if a valid link exists. */}
                    {completeProject.githubLink !== "#" ? (
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <a href={completeProject.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          {t("dataAnalysis.githubLink")}
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled className="flex-1">
                        <Github className="h-4 w-4 mr-2" />
                        {t("dataAnalysis.githubLink")}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-4 mt-16 md:relative md:block">
            <div className="md:text-center">
              <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/damijankante?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 mr-2" />
                {t("coding.visitGitHub")}
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

export default DataAnalysis;
