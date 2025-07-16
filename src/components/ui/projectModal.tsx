// A reusable modal component for displaying a project's image gallery which uses shadcn/ui's Dialog.
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Palette, ArrowLeft } from "lucide-react";

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
  onImageClick: () => void;
}

const GalleryImageItem = ({ image, projectTitle, index, onImageClick }: GalleryImageItemProps) => {
  // State to track if the image has failed to load.
  const [hasError, setHasError] = useState(false);

  // If the image fails to load (e.g., broken link), renders a placeholder.
  if (hasError) {
    return (
      <div className="aspect-[4/3] flex items-center justify-center rounded-lg bg-gradient-subtle text-muted-foreground">
        <Palette className="h-12 w-12" />
      </div>
    );
  }

  // Otherwise, render the image with the description overlay.
  return (
    // The main container now has a background, is a cursor pointer, and handles the click.
    <div
      onClick={onImageClick}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm cursor-pointer bg-muted"
    >
      {/* The image fades to zero opacity on hover. */}
      <img
        src={image.src}
        alt={`${projectTitle} - image ${index + 1}`}
        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        onError={() => setHasError(true)}
      />
      {/* The description container is revealed on hover. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm text-foreground">
          {image.description}
        </p>
      </div>
    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  // FIX: State to track the currently selected fullscreen image. `null` means grid view.
  const [fullscreenImage, setFullscreenImage] = useState<GalleryImage | null>(null);

  if (!project) {
    return null;
  }

  // When the modal is closed from the outside, we must also reset the fullscreen view.
  const handleClose = () => {
    setFullscreenImage(null);
    onClose();
  };

    return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl w-[95%] bg-card p-0 border-border">
        <DialogHeader className="p-6 pb-4">
          {/* Conditionally render the title or a Back button */}
          {fullscreenImage ? (
            <Button variant="ghost" size="sm" onClick={() => setFullscreenImage(null)} className="mr-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Button>
          ) : (
            <DialogTitle className="text-2xl text-foreground">{project.title}</DialogTitle>
          )}
        </DialogHeader>
        
        <div className="p-6 pt-0 max-h-[80vh] overflow-y-auto">
          {/* Conditionally render the fullscreen image or the grid view */}
          {fullscreenImage ? (
            <div className="flex items-center justify-center h-[70vh]">
              <img
                src={fullscreenImage.src}
                alt={fullscreenImage.description}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <GalleryImageItem
                  key={index}
                  image={image}
                  projectTitle={project.title}
                  index={index}
                  onImageClick={() => setFullscreenImage(image)} // Set the image to fullscreen on click
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;