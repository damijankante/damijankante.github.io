import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Database, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const DataAnalysis = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("dataAnalysis.salesDashboard.title"),
      description: t("dataAnalysis.salesDashboard.description"),
      technologies: ["Python", "Pandas", "Tableau", "SQL"],
      metrics: t("dataAnalysis.salesDashboard.metrics", { returnObjects: true }) as string[],
      image: "/api/placeholder/400/250",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: t("dataAnalysis.customerSegmentation.title"),
      description: t("dataAnalysis.customerSegmentation.description"),
      technologies: ["R", "Machine Learning", "ggplot2", "Power BI"],
      metrics: t("dataAnalysis.customerSegmentation.metrics", { returnObjects: true }) as string[],
      image: "/api/placeholder/400/250",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: t("dataAnalysis.predictiveAnalytics.title"),
      description: t("dataAnalysis.predictiveAnalytics.description"),
      technologies: ["Python", "Scikit-learn", "TensorFlow", "Jupyter"],
      metrics: t("dataAnalysis.predictiveAnalytics.metrics", { returnObjects: true }) as string[],
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
            {t("dataAnalysis.title")} <span className="bg-gradient-primary bg-clip-text text-transparent">{t("dataAnalysis.science")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("dataAnalysis.description")}
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
                  <h4 className="font-medium text-sm">{t("dataAnalysis.keyResults")}</h4>
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
                    {t("dataAnalysis.demo")}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    {t("dataAnalysis.code")}
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