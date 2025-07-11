import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Github, ExternalLink, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const Coding = () => {
  const { t } = useTranslation();
  
  const projects = [
    {
      title: t("coding.ecommerce.title"),
      description: t("coding.ecommerce.description"),
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe API", "TypeScript"],
      features: [
        t("coding.ecommerce.features.0"),
        t("coding.ecommerce.features.1"),
        t("coding.ecommerce.features.2"),
        t("coding.ecommerce.features.3"),
      ],
      // githubStars: 45,
      view: "#",
      githubLink: "#",
      category: "Full-Stack"
    },
    {
      title: t("coding.dataViz.title"),
      description: t("coding.dataViz.description"),
      technologies: ["React", "D3.js", "Express", "MongoDB", "WebSocket"],
      features: [
        t("coding.dataViz.features.0"),
        t("coding.dataViz.features.1"),
        t("coding.dataViz.features.2"),
        t("coding.dataViz.features.3"),
      ],
      // githubStars: 32,
      view: "#",
      githubLink: "#",
      category: "Frontend"
    },
    {
      title: t("coding.taskManager.title"),
      description: t("coding.taskManager.description"),
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Jest"],
      features: [
        t("coding.taskManager.features.0"),
        t("coding.taskManager.features.1"),
        t("coding.taskManager.features.2"),
        t("coding.taskManager.features.3"),
      ],
      // githubStars: 28,
      view: "#",
      githubLink: "#",
      category: "Backend"
    },
    {
      title: t("coding.weatherApp.title"),
      description: t("coding.weatherApp.description"),
      technologies: ["React Native", "Redux", "APIs", "SQLite", "Expo"],
      features: [
        t("coding.weatherApp.features.0"),
        t("coding.weatherApp.features.1"),
        t("coding.weatherApp.features.2"),
        t("coding.weatherApp.features.3"),
      ],
      // githubStars: 38,
      view: "#",
      githubLink: "#",
      category: "Mobile"
    },
    {
      title: t("coding.portfolio.title"),
      description: t("coding.portfolio.description"),
      technologies: ["React", "Next.js", "TypoScript", "Tailwind CSS", "Vite", "Radix UI", "Zod", "i18next"],
      features: [
        t("coding.portfolio.features.0"),
        t("coding.portfolio.features.1"),
        t("coding.portfolio.features.2"),
        t("coding.portfolio.features.3"),
      ],
      // githubStars: 52,
      view: "https://damijankante.github.io/",
      githubLink: "https://github.com/damijankante/damijankante.github.io",
      category: "Frontend"
    },
    {
      title: t("coding.chatApp.title"),
      description: t("coding.chatApp.description"),
      technologies: ["Python", "Scikit-learn", "Docker", "FastAPI", "MLflow"],
      features: [
        t("coding.chatApp.features.0"),
        t("coding.chatApp.features.1"),
        t("coding.chatApp.features.2"),
        t("coding.chatApp.features.3"),
      ],
      // githubStars: 41,
      view: "#",
      githubLink: "#",
      category: "ML/AI"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Full-Stack": "bg-purple-500",
      "Frontend": "bg-blue-500",
      "Backend": "bg-green-500",
      "Mobile": "bg-orange-500",
      "ML/AI": "bg-red-500"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <section id="coding" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="group-hover:text-primary transition-colors text-lg">
                    {project.title}
                  </CardTitle>
                  <div className={`px-2 py-1 rounded text-white text-xs font-medium ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

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

                <div className="flex items-center justify-between pt-4">
                  {/* Uncomment the following block to display GitHub stars for each project
                    <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {project.githubStars}
                  </div>
                  */}

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

export default Coding;