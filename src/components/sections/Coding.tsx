// Import UI components from the shadcn/ui library.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Import icons from the lucide-react library for visual elements.
import { Code2, Github, ExternalLink, Star } from "lucide-react";
// Import the translation hook from react-i18next for internationalization.
import { useTranslation } from "react-i18next";

// Defines the Coding component which showcases software development projects.
const Coding = () => {
  // Initialize the translation function 't' from the useTranslation hook.
  const { t } = useTranslation();
  
  // An array of project objects, with content populated by the translation function.
  const projects = [
    {
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
      view: "https://damijankante.github.io/",
      githubLink: "https://github.com/damijankante/damijankante.github.io",
      category: "Frontend"
    },
    {
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
      view: "#",
      githubLink: "#",
      category: "Full-Stack"
    },
    {
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
      view: "#",
      githubLink: "#",
      category: "Full-Stack"
    },
    {
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
      view: "#",
      githubLink: "#",
      category: "Full-Stack"
    },
    {
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
      view: "#",
      githubLink: "#",
      category: "Mobile"
    },
    {
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
      view: "#",
      githubLink: "#",
      category: "ML/AI"
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
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="group-hover:text-primary transition-colors text-lg">
                    {project.title}
                  </CardTitle>
                  {/* Category Badge */}
                  <div className={`px-2 py-1 rounded text-white text-xs font-medium ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Project Description */}
                <p className="text-muted-foreground text-sm">{project.description}</p>
                
                {/* Technologies Used */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Key Features */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">{t("coding.keyFeatures")}</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-xs text-muted-foreground">
                        • {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4">
                  {/* Uncomment the following block to display GitHub stars for each project */}
                  {/* 
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {project.githubStars}
                    </div>
                  */}
                  
                  {/* Project Links */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {t("coding.view")}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Github className="h-4 w-4 mr-1" />
                      {t("coding.code")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
        </div>
      </div>
    </section>
  );
};

// Export the component for use in other parts of the application.
export default Coding;