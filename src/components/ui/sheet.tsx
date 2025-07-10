// Import the dialog primitive from Radix UI, which provides the core accessibility and functionality.
import * as SheetPrimitive from "@radix-ui/react-dialog"
// Import cva for creating class variance authority, allowing for dynamic and reusable class strings.
import { cva, type VariantProps } from "class-variance-authority"
// Import the X icon from lucide-react.
import { X } from "lucide-react"
// Import React for component creation.
import * as React from "react"

// Import a utility function to merge Tailwind CSS classes.
import { cn } from "@/lib/utils"

// The root component for the sheet, re-exported from Radix UI Dialog.
const Sheet = SheetPrimitive.Root

// A component to trigger the opening of the sheet.
const SheetTrigger = SheetPrimitive.Trigger

// A component to trigger the closing of the sheet.
const SheetClose = SheetPrimitive.Close

// A component that portals its children to the body of the document.
const SheetPortal = SheetPrimitive.Portal

// A styled overlay component that dims the background when the sheet is open.
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      // Base styles for the overlay.
      "fixed inset-0 z-50 bg-black/80",
      // Animation styles for opening and closing states.
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

// Defines the visual variants for the sheet content area using cva.
const sheetVariants = cva(
  // Base classes applied to all variants.
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      // Defines styles based on the 'side' prop.
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    // Sets the default side to 'right' if no side prop is provided.
    defaultVariants: {
      side: "right",
    },
  }
)

// Defines the props for the SheetContent component.
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> { }

// The main content container for the sheet.
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      // Applies the correct variant classes based on the 'side' prop.
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      {/* A default close button with an 'X' icon. */}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

// A layout component for the header section of the sheet.
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // Defines styles for the header layout.
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

// A layout component for the footer section of the sheet.
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // Defines styles for the footer layout, handling different flex directions on mobile and desktop.
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

// A styled title component for the sheet, using the Radix primitive for accessibility.
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

// A styled description component for the sheet, using the Radix primitive for accessibility.
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

// Export all the sheet components for use throughout the application.
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger
}