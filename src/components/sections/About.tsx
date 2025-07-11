import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Palette, Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const skills = [
    "Excel", "VBA", "SQL", "Tableau", "Power BI", "PowerPoint", "Python", "Adobe Creative Suite", "Figma", "Canva", "Photoshop", "InDesign", "Illustrator",
    "HTML", "CSS", "JavaScript", "React", "TypeScript", "Node.js", "Git", "GitHub"
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("about.title")} <span className="bg-gradient-primary bg-clip-text text-transparent">{t("about.me")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("about.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-elegant transition-all duration-300 border-0 bg-gradient-subtle">
            <CardContent className="text-center space-y-4 p-0">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{t("about.dataAnalysisTitle")}</h3>
              <p className="text-muted-foreground">
                {t("about.dataAnalysisDescription")}
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-elegant transition-all duration-300 border-0 bg-gradient-subtle">
            <CardContent className="text-center space-y-4 p-0">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Palette className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{t("about.graphicDesignTitle")}</h3>
              <p className="text-muted-foreground">
                {t("about.graphicDesignDescription")}
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-elegant transition-all duration-300 border-0 bg-gradient-subtle">
            <CardContent className="text-center space-y-4 p-0">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Code2 className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{t("about.softwareDevelopmentTitle")}</h3>
              <p className="text-muted-foreground">
                {t("about.softwareDevelopmentDescription")}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">{t("about.technicalSkills")}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;