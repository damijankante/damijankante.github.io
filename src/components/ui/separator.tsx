import * as React from "react"
// Import the Separator primitive components from the Radix UI library.
import * as SeparatorPrimitive from "@radix-ui/react-separator"

// Import the cn utility function for conditionally joining class names.
import { cn } from "@/lib/utils"

// Define the Separator component using React.forwardRef to allow parent components to pass a ref to the underlying DOM element.
const Separator = React.forwardRef<
  // Define the type for the ref, which is an HTML element from the Radix Separator.
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  // Define the type for the component's props, extending the props of the Radix Separator.
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    // Destructure the props, setting default values for orientation and decorative.
    { className, orientation = "horizontal", decorative = true, ...props },
    // The ref is passed as the second argument to the forwardRef function.
    ref
  ) => (
    // Render the Radix Separator Root component.
    <SeparatorPrimitive.Root
      // Forward the ref to the Radix component.
      ref={ref}
      // A decorative separator is not announced by screen readers.
      decorative={decorative}
      // Set the orientation (horizontal or vertical).
      orientation={orientation}
      // Use the 'cn' utility to merge default, conditional, and custom class names.
      className={cn(
        // Base styles: prevent shrinking in flex layouts and set the background color from theme.
        "shrink-0 bg-border",
        // Conditional styles based on orientation.
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        // Apply any additional class names passed via props.
        className
      )}
      // Spread any other props onto the Radix component.
      {...props}
    />
  )
)
// Set the display name for the component, which is useful for debugging with React DevTools.
Separator.displayName = SeparatorPrimitive.Root.displayName

// Export the Separator component for use in other parts of the application.
export { Separator }