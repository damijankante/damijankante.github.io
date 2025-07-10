// This file defines the reusable Tooltip component.
// It is built using the Radix UI Tooltip primitive for accessibility and functionality.
// Styling is handled by Tailwind CSS and the cn utility for merging classes.

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

// The TooltipProvider component provides context for all tooltips within an application.
const TooltipProvider = TooltipPrimitive.Provider

// The Tooltip component is the root container for a tooltip instance.
const Tooltip = TooltipPrimitive.Root

// The TooltipTrigger is the element that the user will hover over or focus on to activate the tooltip.
const TooltipTrigger = TooltipPrimitive.Trigger

// The TooltipContent component contains the content that is displayed when the tooltip is active.
// It uses React.forwardRef to pass a ref to the underlying Radix component.
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    // sideOffset controls the space between the trigger and the content.
    sideOffset={sideOffset}
    // The cn utility merges default styles with any custom classes provided via props.
    // It includes styles for appearance, positioning, and animations.
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
// Sets the display name for easier debugging in React DevTools.
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }