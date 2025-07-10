// Import all parts of the Radix UI Collapsible primitive.
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// The Collapsible component acts as the root container for the entire collapsible section.
// It controls the open and closed state of its content.
const Collapsible = CollapsiblePrimitive.Root

// The CollapsibleTrigger is the interactive element (like a button) that users click
// to toggle the visibility of the CollapsibleContent.
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

// The CollapsibleContent is the wrapper for the section of content
// that will be shown or hidden when the trigger is activated.
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

// Export the components to be used throughout the application.
export { Collapsible, CollapsibleTrigger, CollapsibleContent }