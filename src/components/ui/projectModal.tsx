// A reusable modal component for displaying a project's image gallery which uses shadcn/ui's Dialog.
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Palette } from "lucide-react";

// Type definition for a single image within the gallery.
interface GalleryImage {
  src: string;
  description: string;
}

// Type definition for the core project data needed by this modal.
interface Project {
  title: string;
  gallery: GalleryImage[];
}

// Defines the props accepted by the ProjectModal component.
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

// Defines the props accepted by the GalleryImageItem component.
interface GalleryImageItemProps {
  image: GalleryImage;
  projectTitle: string;
  index: number;
}

const GalleryImageItem = ({ image, projectTitle, index }: GalleryImageItemProps) => {
  // State to track if the image has failed to load.
  const [hasError, setHasError] = useState(false);

  // If the image fails to load (e.g., broken link), render a placeholder.
  if (hasError) {
    return (
      <div className="aspect-[4/3] flex items-center justify-center rounded-lg bg-gradient-subtle text-muted-foreground">
        <Palette className="h-12 w-12" />
      </div>
    );
  }

  // Otherwise, render the image with the description overlay.
  return (
    // The group class enables hover effects on children (group-hover:).
    <div className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm">
      {/* The project image itself. */}
      {/* The onError event triggers if the image src is invalid, setting hasError to true. */}
      <img
        src={image.src}
        alt={`${projectTitle} - image ${index + 1}`}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => setHasError(true)}
      />
      {/* This is the description overlay, positioned to cover the entire image. */}
      <div className="absolute inset-0 flex items-end bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
        <p className="p-4 text-sm text-primary-foreground">
          {image.description}
        </p>
      </div>
    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
    // Handles the case where no project is selected, preventing render errors.
    if (!project) {
        return null;
    }

    return (
        // The Dialog component manages state, accessibility (focus-trapping), and the overlay.
        // onOpenChange calls our onClose function when the user tries to close the dialog.
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl w-[95%] bg-card p-0 border-border">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-2xl text-foreground">{project.title}</DialogTitle>
                </DialogHeader>
                
                {/* This container makes the gallery scrollable if content exceeds 80% of the viewport height. */}
                <div className="p-6 pt-0 max-h-[80vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* A responsive grid that adapts from 1 to 3 columns based on screen size. */}
                        {project.gallery.map((image, index) => (
                            <GalleryImageItem
                                key={index}
                                image={image}
                                projectTitle={project.title}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectModal;