import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Defines the visual styles for the Alert component using `class-variance-authority`. 
 * This allows for different variants (e.g., default, destructive) and manages all the CSS classes in a single, organized location. */
const alertVariants = cva(
  // Base classes applied to all alert variants
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  // Complex selectors explained:
  // - `[&>svg~*]:pl-7`: Any direct child element that is a sibling of an <svg> gets left padding. This creates space for the text next to the icon.
  // - `[&>svg+div]:translate-y-[-3px]`: A <div> that immediately follows an <svg> is shifted up slightly for better vertical alignment.
  // - `[&>svg]:absolute [...]`: A direct child <svg> is positioned absolutely in the top-left corner of the alert.
  {
    variants: {
      /** `variant` defines the different visual styles of the alert. */
      variant: {
        // Default style for informational alerts.
        default: "bg-background text-foreground",
        // Destructive style for errors or warnings.
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/** The main Alert container component. It wraps all other alert elements. It applies the base styles and the selected variant's styles.
The `role="alert"` is crucial for accessibility, ensuring screen readers announce the message to users. */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    // Accessibility role to make screen readers announce the content as an alert.
    role="alert"
    // Merges the variant classes with any additional classes passed via props.
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

/** A component for rendering the title of the Alert. It is semantically an `<h5>` element and is styled to be prominent. **/
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    // Applies styles for font weight, line height, and letter spacing.
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/** A component for rendering the description or body text of the Alert. It provides default text styling.*/
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Applies base text size and ensures any <p> tags inside have relaxed line-height for readability.
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

// Export the components for use throughout the application.
export { Alert, AlertTitle, AlertDescription }