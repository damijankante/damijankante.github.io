import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send form data via email using EmailJS
    emailjs.send(
      "service_d0m8czq",
      "template_xa5rycc",
      {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "damijan.kante@gmail.com"
      },
      "pDS6aagQ-HeBRBCP9"
    ).then(
      () => {
        toast({
          title: t("toast.title"),
          description: t("toast.description"),
          variant: "success",
        });
      },
      (error) => {
        toast({
          title: t("toast.errorTitle"),
          description: t("toast.errorMessage"),
          variant: "error",
        });
      }
    );
    toast({
      
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title")} <span className="bg-gradient-primary bg-clip-text text-transparent">{t("contact.touch")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-0 bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  {t("contact.email.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">damijan.kante@gmail.com</p>
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-primary hover:text-primary-hover">
                  {t("contact.email.sendEmail")}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  {t("contact.phone.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">+386 (40) 525 827</p>
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-primary hover:text-primary-hover">
                  {t("contact.phone.callMe")}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-subtle">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  {t("contact.location.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Ptuj, Slovenia</p>
                <p className="text-sm text-muted-foreground mt-1">{t("contact.location.remoteWork")}</p>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button variant="outline" size="lg" className="flex-1" asChild>
                <a
                  href="https://www.linkedin.com/in/damijankante/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="lg" className="flex-1" asChild>
                <a
                  href="https://github.com/damijankante"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-gradient-subtle">
              <CardHeader>
                <CardTitle>{t("contact.form.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.form.name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("contact.form.namePlaceholder")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.form.email")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("contact.form.emailPlaceholder")}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("contact.form.subject")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("contact.form.subjectPlaceholder")}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={7}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-gradient-primary hover:opacity-90">
                    <Send className="h-5 w-5 mr-2" />
                    {t("contact.form.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;