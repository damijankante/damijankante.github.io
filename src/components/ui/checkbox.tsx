import * as React from "react"
// Import the headless checkbox primitive from Radix UI for accessibility and functionality.
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
// Import the check icon from the lucide-react icon library.
import { Check } from "lucide-react"

// Import the 'cn' utility for conditionally joining class names.
import { cn } from "@/lib/utils"

// Define the Checkbox component using React.forwardRef to pass the ref to the underlying Radix component.
const Checkbox = React.forwardRef<
  // Define the type for the ref element, which is the Radix Checkbox Root.
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  // Define the type for the component's props, inheriting from the Radix Checkbox Root props.
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  // The main container for the checkbox, provided by Radix UI.
  <CheckboxPrimitive.Root
    // Forward the ref to the root element for direct DOM access if needed.
    ref={ref}
    // Merge the default styles with any custom class names passed in via props.
    className={cn(
      // Base styles: size, border, and rounding. 'peer' is used for sibling styling (e.g., for a label).
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary",
      // Focus-visible styles for accessibility, showing a ring when focused via keyboard.
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      // Disabled state styles: changes cursor and reduces opacity.
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked state styles: changes background and foreground color when checked.
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      // Append any custom class names from the 'className' prop.
      className
    )}
    // Spread any remaining props onto the root element.
    {...props}
  >
    // The indicator part of the checkbox, which holds the checkmark.
    // Radix UI automatically handles showing/hiding this based on the 'checked' state.
    <CheckboxPrimitive.Indicator
      // Styles for centering the content (the checkmark icon) inside the indicator.
      className={cn("flex items-center justify-center text-current")}
    >
      // The checkmark icon component.
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
// Set a display name for the component, useful for debugging with React DevTools.
Checkbox.displayName = CheckboxPrimitive.Root.displayName

// Export the Checkbox component for use in other parts of the application.
export { Checkbox }