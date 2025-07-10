// Import React and Radix UI's HoverCard primitive components.
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

// Import the 'cn' utility for combining and managing class names.
import { cn } from "@/lib/utils"

// The main container for the hover card, based on the Radix Root.
const HoverCard = HoverCardPrimitive.Root

// The trigger element that the user hovers over to show the card.
const HoverCardTrigger = HoverCardPrimitive.Trigger

// The content of the hover card, which appears on hover.
// This component uses React.forwardRef to pass the ref to the underlying Radix component.
const HoverCardContent = React.forwardRef<
  // Defines the type of the ref being forwarded.
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  // Defines the props for this component, inheriting from the Radix Content component.
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    // Forward the ref to the DOM element.
    ref={ref}
    // Set the alignment of the card relative to the trigger.
    align={align}
    // Set the distance between the card and the trigger.
    sideOffset={sideOffset}
    // Combine default styles with any custom class names provided.
    className={cn(
      // Base styles for the hover card content.
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
      // Animation classes for when the card is opening or closing.
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      // Slide-in animations based on the card's position relative to the trigger.
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    // Spread any other props to the Radix Content component.
    {...props}
  />
))
// Set a display name for easier debugging in React DevTools.
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

// Export the components for use in other parts of the application.
export { HoverCard, HoverCardTrigger, HoverCardContent }
