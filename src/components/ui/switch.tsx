// Import React for creating components and Radix UI for the switch primitive.
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

// Import the cn utility for conditional class name merging.
import { cn } from "@/lib/utils"

// Define the Switch component using React.forwardRef to pass refs to the underlying element.
const Switch = React.forwardRef<
  // The type of the element that the ref will be attached to, which is the Radix Switch Root.
  React.ElementRef<typeof SwitchPrimitives.Root>,
  // The props type, inheriting all props from the Radix Switch Root component.
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  // The main container for the switch, based on the Radix primitive.
  <SwitchPrimitives.Root
    // Combines base styles with any custom class names passed via the className prop.
    className={cn(
      // Base styles for the switch track.
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      // Focus-visible styles for accessibility.
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      // Disabled state styles.
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Styles for the checked state, using data attributes.
      "data-[state=checked]:bg-primary",
      // Styles for the unchecked state, using data attributes.
      "data-[state=unchecked]:bg-input",
      className
    )}
    // Spread any additional props onto the root element.
    {...props}
    // Forward the ref to the root element.
    ref={ref}
  >
    {/* The movable thumb part of the switch. */}
    <SwitchPrimitives.Thumb
      className={cn(
        // Base styles for the switch thumb.
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
        // Moves the thumb to the right when the switch is checked.
        "data-[state=checked]:translate-x-5",
        // Keeps the thumb to the left when the switch is unchecked.
        "data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
// Set a display name for the component, useful for debugging with React DevTools.
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }