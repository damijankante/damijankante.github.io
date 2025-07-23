import { useState } from "react";
// Import UI components from the shadcn/ui library.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScrollToTopButton from "@/components/ui/scrollToTopButton";
import ProjectModal from "@/components/ui/projectModal";
import { loadCoverImages } from "@/lib/coverImageLoader";
import { loadGalleryImages } from "@/lib/galleryLoader";
// Import icons from the lucide-react library for visual elements.
import { Code2, Github, ExternalLink, Star, Eye, Lock } from "lucide-react";
// Import the translation hook from react-i18next for internationalization.
import { useTranslation } from "react-i18next";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  // githubStars?: number
  features: string[];
  view: string;
  githubLink: string;
  category: string;
  gallery: { src: string; description: string }[];
  image?: string | null;
}

const coverImages = loadCoverImages();

// Defines the Coding component which showcases software development projects.
const Coding = () => {
  // Initialize the translation function 't' from the useTranslation hook.
  const { t } = useTranslation();

  // State to manage the currently selected project for the modal. Null when closed.
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // An array of project objects with content populated by the translation function.
  const projects: Project [] = [
    {
      id: "coding-portfolio",
      title: t("coding.portfolio.title"),
      description: t("coding.portfolio.description"),
      technologies: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Radix UI", "shadcn/ui", "Node.js", "Vite"],
      features: [
        t("coding.portfolio.features.0"),
        t("coding.portfolio.features.1"),
        t("coding.portfolio.features.2"),
        t("coding.portfolio.features.3"),
        t("coding.portfolio.features.4"),
        t("coding.portfolio.features.5"),
      ],
      // githubStars: 52,
      image: null,
      view: "https://damijankante.github.io/",
      githubLink: "https://github.com/damijankante/damijankante.github.io",
      category: "Frontend",
      gallery: loadGalleryImages("portfolio-page"),
    },
    {
      id: "coding-task-manager",
      title: t("coding.taskManager.title"),
      description: t("coding.taskManager.description"),
      technologies: ["JavaScript", "TypeScript", "React", "Next.js", "Python", "React Native", "Fast API", "Flutter", "Material-UI", "PostgreSQL", "Celery"],
      features: [
        t("coding.taskManager.features.0"),
        t("coding.taskManager.features.1"),
        t("coding.taskManager.features.2"),
        t("coding.taskManager.features.3"),
        t("coding.taskManager.features.4"),
        t("coding.taskManager.features.5"),
      ],
      // githubStars: 28,
      image: null,
      view: "#",
      githubLink: "#",
      category: "Full-Stack",
      gallery: []
    },
    {
      id: "coding-ecommerce",
      title: t("coding.ecommerce.title"),
      description: t("coding.ecommerce.description"),
      technologies: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Stripe API", "Tailwind CSS", "Chakra UI", "Express.js", "Passport.js"],
      features: [
        t("coding.ecommerce.features.0"),
        t("coding.ecommerce.features.1"),
        t("coding.ecommerce.features.2"),
        t("coding.ecommerce.features.3"),
        t("coding.ecommerce.features.4"),
        t("coding.ecommerce.features.5"),
      ],
      // githubStars: 45, // Example data for GitHub stars, currently commented out.
      image: null,
      view: "#",
      githubLink: "#",
      category: "Full-Stack",
      gallery: []
    },
    {
      id: "coding-CV-Builder",
      title: t("coding.cvBuilder.title"),
      description: t("coding.cvBuilder.description"),
      technologies: ["HTML", "CSS","JavaScript", "React", "Next.js", "TypeScript", "Node.js", "Bootstrap", "Python", "Node.js", "MongoDB", "Puppeteer"],
      features: [
        t("coding.cvBuilder.features.0"),
        t("coding.cvBuilder.features.1"),
        t("coding.cvBuilder.features.2"),
        t("coding.cvBuilder.features.3"),
        t("coding.cvBuilder.features.4"),
        t("coding.cvBuilder.features.5"),
      ],
      // githubStars: 32,
      image: null,
      view: "#",
      githubLink: "#",
      category: "Full-Stack",
      gallery: []
    },
    {
      id: "coding-game-stats",
      title: t("coding.gameStats.title"),
      description: t("coding.gameStats.description"),
      technologies: ["Python", "React Native", "Flutter", "FastAPI", "PostgreSQL", "Celery", "Redis", "AWS S3", "BigQuery", "Firebase Analytics", "Sentry", "GCP"],
      features: [
        t("coding.gameStats.features.0"),
        t("coding.gameStats.features.1"),
        t("coding.gameStats.features.2"),
        t("coding.gameStats.features.3"),
        t("coding.gameStats.features.4"),
        t("coding.gameStats.features.5"),
      ],
      // githubStars: 38,
      image: null,
      view: "#",
      githubLink: "#",
      category: "Mobile",
      gallery: []
    },
    {
      id: "coding-chat-App",
      title: t("coding.chatApp.title"),
      description: t("coding.chatApp.description"),
      technologies: ["React","TypeScript", "Next.js", "React Native", "Flutter", "Tailwind CSS", "Python", "PostgreSQL", "Scikit-learn", "PyTorch", "Azure", "Docker"],
      features: [
        t("coding.chatApp.features.0"),
        t("coding.chatApp.features.1"),
        t("coding.chatApp.features.2"),
        t("coding.chatApp.features.3"),
        t("coding.chatApp.features.4"),
        t("coding.chatApp.features.5"),
      ],
      // githubStars: 41,
      image: null,
      view: "#",
      githubLink: "#",
      category: "ML/AI",
      gallery: []
    }
  ];

  // A helper function to determine the background color of a category badge.
  const getCategoryColor = (category: string) => {
    const colors = {
      "Full-Stack": "bg-purple-500",
      "Frontend": "bg-blue-500",
      "Backend": "bg-green-500",
      "Mobile": "bg-orange-500",
      "ML/AI": "bg-red-500"
    };
    // Return the corresponding color or a default gray color if not found.
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  // Component Rendering
  return (
    <>
      <section id="coding" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Code2 className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("coding.software")} <span className="bg-gradient-primary bg-clip-text text-transparent">{t("coding.development")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("coding.description")}
            </p>
          </div>

          {/* A responsive grid to display the project cards. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map over the projects array to render a Card for each project. */}
            {projects.map((project, index) => {
              const imageUrl = coverImages[project.id];
              const completeProject = { ...project, image: imageUrl };

              return (
                <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card flex flex-col">
                  {/* A consistent image container*/} 
                  <div className="aspect-[4/3] bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
                    {completeProject.image ? (
                      <img src={completeProject.image} alt={completeProject.title} className="h-full w-full object-cover"/>
                    ) : (
                      <Code2 className="h-12 w-12 text-muted-foreground" /> // Thematic placeholder icon.
                    )}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(completeProject.category)}`}>
                      {completeProject.category}
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors text-lg">
                        {completeProject.title}
                      </CardTitle>
                      {/* Category Badge */}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 flex-grow">
                    {/* Project Description */}
                    <p className="text-muted-foreground text-sm">{completeProject.description}</p>
                    
                    {/* Technologies Used */}
                    <div className="flex flex-wrap gap-2">
                      {completeProject.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Key Features */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{t("coding.keyFeatures")}</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {completeProject.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="text-xs text-muted-foreground">
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  {/* Action Buttons */}
                  <div className="flex gap-2 p-6 pt-0">
                    {/* This "View" button handles the modal. It's disabled if the gallery is empty. */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedProject(completeProject)}
                      disabled={completeProject.gallery.length === 0}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {t("coding.view")}
                    </Button>

                    {/* Render GitHub or a locked button based on link validity. */}
                    {project.githubLink !== "#" ? (
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          {t("coding.code")}
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled className="flex-1">
                        <Lock className="h-4 w-4 mr-2" />
                        {t("coding.code")}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
          
          <div className="relative mt-16">
            {/* GitHub Call to Action */}
            <div className="text-center mt-12">
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

              <div className="absolute right-0 top-0 h-full flex items-center">
                <ScrollToTopButton />
              </div>
            </div>
          </div>
         </div>
      </section>

      <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject}/>
    </>
  );
};

// Export the component for use in other parts of the application.
export default Coding;