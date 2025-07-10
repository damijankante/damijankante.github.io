import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

// The root component for the accordion. It's a direct export from Radix UI
// and acts as the main container for all accordion items.
const Accordion = AccordionPrimitive.Root

// A component that wraps a single accordion item, including its trigger and content.
// It adds a bottom border to visually separate items.
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    // Adds a bottom border for separation between items.
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

// A clickable header component that toggles the visibility of the accordion content.
// It includes a chevron icon that rotates to indicate the open/closed state.
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  // Radix UI's Header component provides the appropriate heading level (e.g., <h3>).
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // Base styles for the trigger button.
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {/* The chevron icon that rotates on state change. */}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// The collapsible content panel of an accordion item.
// It uses custom animations for a smooth open and close transition.
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    // Applies animations based on the open/closed state.
    // These animations (`accordion-up`, `accordion-down`) are defined in `tailwind.config.js`.
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    {/* An inner div provides padding to the content. */}
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Export all the components to be used together to build an accordion.
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }