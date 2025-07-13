// A reusable modal component for displaying a project's image gallery which uses shadcn/ui's Dialog.
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
                    {/* The DialogClose component provides a styled and accessible close button. */}
                    <DialogClose asChild>
                        <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background 
                            transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring 
                            focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent 
                            data-[state=open]:text-muted-foreground"
                        >
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close</span>
                        </button>
                    </DialogClose>
                </DialogHeader>
                
                {/* This container makes the gallery scrollable if content exceeds 80% of the viewport height. */}
                <div className="p-6 pt-0 max-h-[80vh] overflow-y-auto">
                    {/* A responsive grid that adapts from 1 to 3 columns based on screen size. */}
                    {project.gallery.map((image, index) => (
                        // The group class enables hover effects on children (group-hover:).
                        <div key={index} className="group relative aspect-[4-3] overflow-hidden rounded-lg shadow-sm">
                            {/* The project image itself. */}
                            <img 
                                src={image.src} 
                                alt={`${project.title} - image ${index + 1}`} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* This is the description overlay, positioned to cover the entire image. */}
                            {/* It's initially hidden (`opacity-0`) and appears on parent hover (`group-hover:opacity-100`) */}
                            <div className="absolute inset-0 flex items-end bg-black/50 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 backdrop-blur-sm"
                            >
                                <p className="p-4 text-sm text-primary-foreground"> 
                                    {image.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectModal;