import * as React from "react"
// Import all slider parts from the Radix UI slider primitive library.
import * as SliderPrimitive from "@radix-ui/react-slider"

// Import the cn utility for merging Tailwind CSS classes.
import { cn } from "@/lib/utils"

// Define the Slider component using React.forwardRef to pass down a ref to the underlying element.
const Slider = React.forwardRef<
  // Define the type for the forwarded ref, which is an HTML element from the Radix Root component.
  React.ElementRef<typeof SliderPrimitive.Root>,
  // Define the type for the component's props, inheriting from the Radix Root component's props.
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  // The main container for the slider, handling its state and interactions.
  <SliderPrimitive.Root
    // Forward the ref to the underlying Radix component.
    ref={ref}
    // Apply base styles and merge with any additional classes passed via props.
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    // Spread the rest of the props to the underlying Radix component.
    {...props}
  >
    {/* The visual track or bar of the slider. */}
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      {/* The highlighted part of the track, representing the selected value range. */}
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {/* The draggable handle or thumb of the slider. */}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
// Set the display name for easier debugging in React DevTools.
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }