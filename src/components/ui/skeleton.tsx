// A utility function for conditionally combining class names.
import { cn } from "@/lib/utils"

// Displays a placeholder preview of content before the data gets loaded.
function Skeleton({
  // Optional additional class names for styling.
  className,
  // Accepts all other standard HTML div attributes.
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // Combines base styles with any custom classes passed in.
      // The base includes a pulsing animation, rounded corners, and a muted background color.
      className={cn("animate-pulse rounded-md bg-muted", className)}
      // Spreads any other passed props onto the div element.
      {...props}
    />
  )
}

// Exports the Skeleton component for use in other parts of the application.
export { Skeleton }
