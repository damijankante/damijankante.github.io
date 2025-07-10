import * as React from "react"
// Import the Progress primitive components from Radix UI for accessibility and core functionality.
import * as ProgressPrimitive from "@radix-ui/react-progress"

// Import a utility function cn for conditionally joining class names.
import { cn } from "@/lib/utils"

// Define the Progress component using React.forwardRef to pass refs to the underlying DOM element.
const Progress = React.forwardRef<
  // Define the type for the forwarded ref, which is a reference to the Radix Progress Root element.
  React.ElementRef<typeof ProgressPrimitive.Root>,
  // Define the component's props by extending the props of the Radix Progress Root component.
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  // The main container for the progress bar.
  <ProgressPrimitive.Root
    // Forward the ref to the Root element.
    ref={ref}
    // Apply base styles and merge any additional class names passed via props.
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    // Spread any other props to the Root element.
    {...props}
  >
    {/* The indicator that visually represents the progress. */}
    <ProgressPrimitive.Indicator
      // Apply styles to the indicator bar.
      className="h-full w-full flex-1 bg-primary transition-all"
      // Use an inline style to control the width of the progress indicator.
      // The transform translates the indicator to the left, revealing the progress from 0 to the current value.
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
// Set a display name for the component, which is useful for debugging in React DevTools.
Progress.displayName = ProgressPrimitive.Root.displayName

// Export the Progress component for use in other parts of the application.
export { Progress }