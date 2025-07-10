import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Database, ExternalLink } from "lucide-react";

const DataAnalysis = () => {
  const projects = [
    {
      title: "Sales Performance Dashboard",
      description: "Interactive dashboard analyzing sales trends, customer behavior, and revenue optimization using Python and Tableau.",
      technologies: ["Python", "Pandas", "Tableau", "SQL"],
      metrics: ["25% increase in revenue insights", "40% faster reporting"],
      image: "/api/placeholder/400/250",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Customer Segmentation Analysis",
      description: "Machine learning-based customer segmentation to improve marketing strategies and customer retention.",
      technologies: ["R", "Machine Learning", "ggplot2", "Power BI"],
      metrics: ["30% improved targeting", "15% increase in retention"],
      image: "/api/placeholder/400/250",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Predictive Analytics Model",
      description: "Time series forecasting model for inventory management and demand prediction using advanced statistical methods.",
      technologies: ["Python", "Scikit-learn", "TensorFlow", "Jupyter"],
      metrics: ["85% prediction accuracy", "20% cost reduction"],
      image: "/api/placeholder/400/250",
      demoLink: "#",
      codeLink: "#"
    }
  ];

  return (
    <section id="data-analysis" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Data Analysis & <span className="bg-gradient-primary bg-clip-text text-transparent">Science</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leveraging data to drive business decisions through statistical analysis, machine learning, 
            and compelling visualizations that tell meaningful stories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card overflow-hidden">
              <div className="aspect-video bg-gradient-subtle flex items-center justify-center">
                <Database className="h-12 w-12 text-muted-foreground" />
              </div>
              
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Results:</h4>
                  {project.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center text-sm text-muted-foreground">
                      <TrendingUp className="h-3 w-3 mr-2 text-accent" />
                      {metric}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Code
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

export default DataAnalysis;