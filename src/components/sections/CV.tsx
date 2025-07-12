import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileUser, GraduationCap, Briefcase, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Timeline, TimelineItem, TimelineTime, TimelineTitle, TimelineSubtitle, TimelineDescription } from "@/components/ui/timeline";

const CV = () => {
  const { t } = useTranslation();

  // This array defines the structure of the cards to be displayed.
  // We'll map over this to generate the UI dynamically.
  const sections = [
    {
      title: t("cv.education"),
      type: "education",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      title: t("cv.experience"),
      type: "experience",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: t("cv.skills"),
      type: "skills",
      icon: <Wrench className="h-6 w-6" />,
    },
  ];
  
  // Data for the Education timeline.
  const educations = [
    {
      degree: t("cv.bachelor.degree"),
      institution: t("cv.bachelor.institution"),
      years: t("cv.bachelor.years"),
      subjects: t("cv.bachelor.subjects", { returnObjects: true }),
    },
    {
      degree: t("cv.associate.degree"),
      institution: t("cv.associate.institution"),
      years: t("cv.associate.years"),
      subjects: t("cv.associate.subjects", { returnObjects: true }),
    }
  ];

  // Data for the Experience timeline.
  const experiences = [
    {
      position: t("cv.teamLead.position"),
      company: t("cv.teamLead.company"),
      years: t("cv.teamLead.years"),
      // description: t("cv.teamLead.description"),
    },
    {
      position: t("cv.dataEntryLead.position"),
      company: t("cv.dataEntryLead.company"),
      years: t("cv.dataEntryLead.years"),
      // description: t("cv.dataEntryLead.description"),
    },
    {
      position: t("cv.dataEntrySpecialist.position"),
      company: t("cv.dataEntrySpecialist.company"),
      years: t("cv.dataEntrySpecialist.years"),
      // description: t("cv.dataEntrySpecialist.description"),
    },
    {
      position: t("cv.graphicsStudioHead.position"),
      company: t("cv.graphicsStudioHead.company"),
      years: t("cv.graphicsStudioHead.years"),
      // description: t("cv.graphicsStudioHead.description"),
    },
    {
      position: t("cv.graphicDesigner.position"),
      company: t("cv.graphicDesigner.company"),
      years: t("cv.graphicDesigner.years"),
      // description: t("cv.graphicDesigner.description"),
    },
        {
      position: t("cv.receptionist.position"),
      company: t("cv.receptionist.company"),
      years: t("cv.receptionist.years"),
      // description: t("cv.receptionist.description"),
    },
  ];

  // Data for the Skills section.
  const skills = [
    {
      category: t("cv.programmingLanguages"),
      items: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "TypeScript", "Vite", "C#", "C++", "Java", "PHP"]
    },
    {
      category: t("cv.dataAnalysis"),
      items: ["Excel", "VBA", "Power Query","SQL", "Python", "R", "PowerPoint", "Power BI", "Tableau"]
    },
    {
      category: t("cv.webDevelopment"),
      items: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "TypeScript", "Tailwind", "Vite", "Git", "GitHub"]
    },
    {
      category: t("cv.designTools"),
      items: ["InDesign", "Photoshop", "Illustrator", "Premiere", "Dreamweaver", "XD", "Figma", "Canva"]
    },
    {
      category: t("cv.googleWorkspace"),
      items: ["Docs", "Sheets", "Apps Script", "Slides", "Forms", "Drive", "Gmail", "Meet", "Calendar", "Analytics"]
    }
  ];

  return (
    <section id="cv" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The main header for the entire CV section. */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <FileUser className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("cv.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("cv.description")}
          </p>
        </div>

        {/* A responsive grid to display the dynamically generated cards. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map over the sections array to render a Card for each section. */}
          {sections.map((section, index) => (
            <Card key={index} className="flex flex-col group hover:shadow-elegant transition-all duration-300 border-0 bg-card">
              {/* This is the corrected CardHeader section. */}
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span className="text-primary">{section.icon}</span>
                  <CardTitle className="group-hover:text-primary transition-colors text-xl">
                    {section.title}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 flex-grow">
                {/* Conditionally render the content based on the section type. */}
                
                {section.type === 'education' && (
                  <Timeline>
                    {educations.map((edu, eduIndex) => (
                      <TimelineItem key={eduIndex}>
                        <TimelineTime>{edu.years}</TimelineTime>
                        <TimelineTitle>{edu.degree}</TimelineTitle>
                        <TimelineSubtitle>{edu.institution}</TimelineSubtitle>
                        {/* Displays a list of subjects */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(edu.subjects).map((subject, subjectIndex) => (
                            <Badge key={subjectIndex} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TimelineItem>
                    ))}
                  </Timeline>
                )}

                {section.type === 'experience' && (
                  <Timeline>
                    {experiences.map((exp, expIndex) => (
                      <TimelineItem key={expIndex}>
                        <TimelineTime>{exp.years}</TimelineTime>
                        <TimelineTitle>{exp.position}</TimelineTitle>
                        <TimelineSubtitle>{exp.company}</TimelineSubtitle>
                        <TimelineDescription>{exp.description}</TimelineDescription>
                      </TimelineItem>
                    ))}
                  </Timeline>
                )}
                
                {section.type === 'skills' && (
                  <div className="space-y-6">
                    {skills.map((skillGroup, groupIndex) => (
                      <div key={groupIndex}>
                        <h3 className="font-semibold text-lg mb-2">{skillGroup.category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((item, itemIndex) => (
                            <Badge key={itemIndex} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
             </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CV;