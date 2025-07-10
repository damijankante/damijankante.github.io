import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Github, ExternalLink, Star } from "lucide-react";

const Coding = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with user authentication, payment processing, and admin dashboard built with modern web technologies.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe API", "TypeScript"],
      features: ["User authentication", "Payment integration", "Admin dashboard", "Responsive design"],
      githubStars: 45,
      liveDemo: "#",
      githubLink: "#",
      category: "Full-Stack"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for business analytics with real-time data updates and customizable charts using D3.js and React.",
      technologies: ["React", "D3.js", "Express", "MongoDB", "WebSocket"],
      features: ["Real-time updates", "Interactive charts", "Custom filters", "Export functionality"],
      githubStars: 32,
      liveDemo: "#",
      githubLink: "#",
      category: "Frontend"
    },
    {
      title: "Task Management API",
      description: "RESTful API for task management with team collaboration features, built with Node.js and comprehensive testing suite.",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Jest"],
      features: ["RESTful design", "Team collaboration", "Authentication", "Comprehensive testing"],
      githubStars: 28,
      liveDemo: "#",
      githubLink: "#",
      category: "Backend"
    },
    {
      title: "Mobile Weather App",
      description: "Cross-platform mobile application for weather forecasting with location services and offline capabilities.",
      technologies: ["React Native", "Redux", "APIs", "SQLite", "Expo"],
      features: ["Cross-platform", "Offline support", "Location services", "Push notifications"],
      githubStars: 38,
      liveDemo: "#",
      githubLink: "#",
      category: "Mobile"
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio website built with React and TypeScript featuring smooth animations and responsive design.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      features: ["Smooth animations", "Responsive design", "SEO optimized", "Performance focused"],
      githubStars: 52,
      liveDemo: "#",
      githubLink: "#",
      category: "Frontend"
    },
    {
      title: "Machine Learning Pipeline",
      description: "Automated ML pipeline for data preprocessing, model training, and deployment with monitoring capabilities.",
      technologies: ["Python", "Scikit-learn", "Docker", "FastAPI", "MLflow"],
      features: ["Automated pipeline", "Model monitoring", "API deployment", "Version control"],
      githubStars: 41,
      liveDemo: "#",
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
            Software <span className="bg-gradient-primary bg-clip-text text-transparent">Development</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building robust, scalable applications using modern technologies and best practices. 
            From web applications to mobile apps and data science tools.
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
                  <h4 className="font-medium text-sm">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-xs text-muted-foreground">
                        • {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {project.githubStars}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </Button>
                    <Button size="sm" variant="outline">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <Github className="h-5 w-5 mr-2" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Coding;