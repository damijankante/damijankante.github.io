import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

// A wrapper component for the main panel group container.
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    // Combines default styles with any custom classes.
    className={cn(
      // Sets the group to be a flex container, filling its parent's height and width.
      "flex h-full w-full",
      // When the group's direction is vertical, it switches to a flex-column layout.
      "data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

// A component that defines an individual resizable panel.
// This is a direct re-export from the underlying library.
const ResizablePanel = ResizablePrimitive.Panel

// A component for the handle that the user drags to resize panels.
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  // An optional prop to display a visual grip icon on the handle.
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      // Basic styles for the handle: a thin, centered line.
      "relative flex w-px items-center justify-center bg-border",
      // Creates a larger, invisible hit area around the handle for easier grabbing.
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      // Adds accessibility focus rings.
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
      // Styles applied when the panel group has a vertical orientation.
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      // Adjusts the invisible hit area for vertical orientation.
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      // Rotates the visual grip icon (if present) for vertical orientation.
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {/* Conditionally renders the visual grip icon container. */}
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }