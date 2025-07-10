import * as React from "react"
// Import all scroll area components from the Radix UI primitive library
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

// Import the cn utility for merging Tailwind CSS classes
import { cn } from "@/lib/utils"

// Define the main ScrollArea component, which wraps the Radix primitive.
// It uses React.forwardRef to pass down a ref to the underlying DOM element.
const ScrollArea = React.forwardRef<
  // Define the type for the ref element, pointing to the Radix Root component.
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  // Define the type for the component's props, extending the Radix Root props.
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  // The main container for the scrollable area.
  <ScrollAreaPrimitive.Root
    ref={ref}
    // Apply base styles and merge with any custom classes provided via props.
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    {/* The viewport component that holds the scrollable content. */}
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    {/* Include the custom ScrollBar component. */}
    <ScrollBar />
    {/* Renders the corner piece between vertical and horizontal scrollbars. */}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
// Set a display name for easier debugging in React DevTools.
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

// Define the ScrollBar component, which styles the scrollbar track and thumb.
// It also uses React.forwardRef to pass down a ref.
const ScrollBar = React.forwardRef<
  // Define the type for the ref element, pointing to the Radix Scrollbar component.
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  // Define the type for the component's props, extending the Radix Scrollbar props.
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  // The scrollbar element itself.
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    // Set the orientation of the scrollbar (defaults to "vertical").
    orientation={orientation}
    // Apply conditional styles based on the orientation.
    className={cn(
      "flex touch-none select-none transition-colors",
      // Styles for a vertical scrollbar.
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      // Styles for a horizontal scrollbar.
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    {/* The draggable part of the scrollbar, often called the "thumb". */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
// Set a display name for easier debugging in React DevTools.
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

// Export the created components for use throughout the application.
export { ScrollArea, ScrollBar }
