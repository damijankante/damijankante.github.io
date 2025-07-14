import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

// A reusable button component that, when clicked, smoothly scrolls the user to the top of the page.
const ScrollToTopButton = () => {
  // Hook for getting the translated text.
  const { t } = useTranslation();

  // The function that handles the smooth scroll behavior.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      variant="link"
      size="sm"
      onClick={scrollToTop}
      className="p-2 text-muted-foreground hover:text-primary hover:no-underline"
    >
      <ArrowUp className="h-4 w-4 mr-2" />
      {t("footer.backToTop")}
    </Button>
  );
};

export default ScrollToTopButton;