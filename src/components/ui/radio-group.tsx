import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

// Defines a container for a set of radio buttons.
// It wraps the Radix UI RadioGroup Root component, providing default styling.
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    // The base component from Radix UI.
    <RadioGroupPrimitive.Root
      // Combines default styles with any custom classes provided.
      className={cn("grid gap-2", className)}
      {...props}
      // Forwards the ref to the underlying DOM element.
      ref={ref}
    />
  )
})
// Sets the display name for better debugging experience.
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

// Defines a single radio button item.
// It wraps the Radix UI RadioGroup Item component.
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    // The clickable radio button item from Radix UI.
    <RadioGroupPrimitive.Item
      ref={ref}
      // Applies base styling for the radio item, including shape, border, and states.
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* The visual indicator that shows when the item is checked. */}
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* Renders a filled circle icon as the check mark. */}
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
// Sets the display name for better debugging experience.
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Exports the components for use in other parts of the application.
export { RadioGroup, RadioGroupItem }
