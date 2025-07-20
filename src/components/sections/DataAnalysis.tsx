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
      id: "data-sales-dashboard",
      title: t("dataAnalysis.salesDashboard.title"),
      description: t("dataAnalysis.salesDashboard.description"),
      technologies: ["Python", "Pandas", "Tableau", "SQL"],
      metrics: t("dataAnalysis.salesDashboard.metrics", { returnObjects: true }) as string[],
      image: null,
      view: "#",
      githubLink: "#",
      gallery: [
        { src: "/api/placeholder/800/600?text=Dashboard+Overview", description: "Main dashboard view showing key KPIs like total revenue, units sold, and profit margin." },
        { src: "/api/placeholder/800/600?text=Sales+Trend+Chart", description: "A time-series analysis of sales performance, allowing drill-down by month, quarter, or year." },
        { src: "/api/placeholder/800/600?text=Geographic+Data", description: "An interactive map visualization (heatmap) showing sales distribution by region or state." },
        { src: "/api/placeholder/800/600?text=Product+Performance", description: "A detailed table breaking down the performance of individual products or categories." },
        { src: "/api/placeholder/800/600?text=Sales+Rep+Leaderboard", description: "Leaderboard ranking top sales representatives by revenue generated and deals closed." },
        { src: "/api/placeholder/800/600?text=Interactive+Filters", description: "Close-up on the interactive filters for date ranges, regions, and product categories." },
      ]
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
      gallery: [
        { src: "/api/placeholder/800/600?text=Customer+Clusters", description: "Visualization of distinct customer segments using a K-Means clustering scatter plot." },
        { src: "/api/placeholder/800/600?text=Segment+Profiles", description: "Detailed profiles for each segment, including demographics and purchasing behavior." },
        { src: "/api/placeholder/800/600?text=Data+Preprocessing", description: "A snippet from the R script showing data cleaning and feature scaling before modeling." },
        { src: "/api/placeholder/800/600?text=Elbow+Method", description: "The elbow method plot used to determine the optimal number of clusters (K) for the model." },
        { src: "/api/placeholder/800/600?text=Segment+Spending", description: "Bar chart comparing the average spending habits across the identified customer segments." },
        { src: "/api/placeholder/800/600?text=Marketing+Strategies", description: "A summary slide of actionable marketing strategies tailored to each specific segment." },
      ]
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
      gallery: [
        { src: "/api/placeholder/800/600?text=Model+Accuracy", description: "A confusion matrix and key accuracy metrics (Precision, Recall, F1-Score) for the model." },
        { src: "/api/placeholder/800/600?text=Feature+Importance", description: "A bar chart showing the most influential features used by the model for its predictions." },
        { src: "/api/placeholder/800/600?text=ROC+Curve", description: "The Receiver Operating Characteristic (ROC) curve, visualizing the model's diagnostic ability." },
        { src: "/api/placeholder/800/600?text=Time-Series+Forecast", description: "A plot showing historical data alongside the model's future value predictions." },
        { src: "/api/placeholder/800/600?text=Jupyter+Notebook", description: "A screenshot of the Jupyter Notebook environment where the model was developed and tested." },
        { src: "/api/placeholder/800/600?text=Model+Comparison", description: "A table comparing the performance of different algorithms (e.g., Logistic Regression vs. Random Forest)." },
      ]
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
                    {/* Conditionally render the View button if a valid link exists. */}
                    {completeProject.view !== "#" && (
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedProject(completeProject)}>
                        <Eye className="h-4 w-4 mr-2" />
                        {t("dataAnalysis.view")}
                      </Button>
                    )}

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

          <div className="relative mt-16">
            <div className="text-center">
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

export default DataAnalysis;
