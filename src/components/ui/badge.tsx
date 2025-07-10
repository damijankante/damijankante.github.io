import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Defines the styles for the Badge component using `class-variance-authority`.
// This allows for a set of base styles and multiple visual variants that can be applied via props.
const badgeVariants = cva(
  // Base classes applied to all badge variants.
  // Sets up layout, shape, padding, font, and focus styles.
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    // The `variants` object defines the different visual styles the badge can have.
    variants: {
      variant: {
        // Default style: solid background with primary theme color.
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        // Secondary style: solid background with secondary theme color.
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Destructive style: for errors or warnings, uses the destructive theme color.
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Outline style: transparent background with a border.
        outline: "text-foreground",
      },
    },
    // The default variant to use if none is specified when using the component.
    defaultVariants: {
      variant: "default",
    },
  }
)

// Defines the props for the Badge component.
// It extends standard HTML div attributes and includes the `variant` prop from `badgeVariants`.
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// A reusable Badge component that renders a `div` with styles determined by the `variant` prop.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    // The `cn` utility merges the classes from `badgeVariants` with any additional classes passed in.
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Export the Badge component and its variants for use throughout the application.
export { Badge, badgeVariants }