import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

// Create a React context to share variants and sizes from the parent to the children.
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

// The main wrapper component for a group of toggle buttons.
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  // Use the Radix UI Toggle Group Root as the base.
  <ToggleGroupPrimitive.Root
    ref={ref}
    // Apply base styles and allow for custom classes.
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    {/* Provide the variant and size to all child components via context. */}
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

// Set a display name for easier debugging.
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

// An individual toggle button item within the group.
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  // Consume the variant and size from the parent ToggleGroup context.
  const context = React.useContext(ToggleGroupContext)

  return (
    // Use the Radix UI Toggle Group Item as the base.
    <ToggleGroupPrimitive.Item
      ref={ref}
      // Combine styles from toggleVariants with custom classes.
      // Prioritize the context's variant and size, but allow overriding them with props.
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

// Set a display name for easier debugging.
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }