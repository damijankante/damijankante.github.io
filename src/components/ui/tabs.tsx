// This file defines a reusable Tabs component built on top of Radix UI's Tabs primitive.
// It provides a set of styled components to create a tabbed interface.

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

// The main container for the entire tabs component group.
const Tabs = TabsPrimitive.Root

// The container for the list of tab triggers.
// It forwards its ref to the underlying Radix List component.
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    // Applies base styling for the trigger list container.
    // It's a flex container with a muted background, padding, and rounded corners.
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
// Assigns a display name for better debugging and developer tools experience.
TabsList.displayName = TabsPrimitive.List.displayName

// A clickable button element that activates its associated content panel.
// It forwards its ref to the underlying Radix Trigger component.
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    // Applies base styling and interaction states for the trigger button.
    // Includes styles for focus-visible and disabled states.
    // The data-state=active selector provides distinct styling for the currently active tab.
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
// Assigns a display name for better debugging.
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// The container for the content associated with a specific tab.
// It forwards its ref to the underlying Radix Content component.
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    // Applies base styling for the content panel.
    // Includes a top margin and styles for focus visibility.
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
// Assigns a display name for better debugging.
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }