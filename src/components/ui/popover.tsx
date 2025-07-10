import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

// Import the cn utility for conditional class name merging.
import { cn } from "@/lib/utils"

// The Popover component serves as the root container for the popover.
const Popover = PopoverPrimitive.Root

// The PopoverTrigger component wraps the element that will open and close the popover.
const PopoverTrigger = PopoverPrimitive.Trigger

// The PopoverContent component displays the content when the popover is open.
// It uses React.forwardRef to pass a ref to the underlying Radix component.
const PopoverContent = React.forwardRef<
  // Define the type for the forwarded ref, pointing to the Radix Content element.
  React.ElementRef<typeof PopoverPrimitive.Content>,
  // Define the type for the component's props, inheriting from Radix Content props.
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  // PopoverPrimitive.Portal renders the popover content outside the main DOM hierarchy.
  // This helps avoid z-index and overflow issues.
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      // Forward the ref to the Content element for direct access if needed.
      ref={ref}
      // Set the alignment of the popover relative to the trigger.
      align={align}
      // Set the distance in pixels between the trigger and the popover content.
      sideOffset={sideOffset}
      // Use the cn utility to combine default styles with any custom class names.
      className={cn(
        // Base styles for the popover content.
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        // Animation styles based on the popover's open/closed state.
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        // Slide-in animations based on the popover's position (side).
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        // Append any custom class names passed via props.
        className
      )}
      // Spread any other props to the underlying Radix 'Content' component.
      {...props}
    />
  </PopoverPrimitive.Portal>
))
// Set a display name for the component for better debugging in React DevTools.
PopoverContent.displayName = PopoverPrimitive.Content.displayName

// Export the components for use in other parts of the application.
export { Popover, PopoverTrigger, PopoverContent }
