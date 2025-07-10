// input-otp.tsx:
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

// The main component wrapper for the OTP input functionality.
// It integrates the base `OTPInput` from the `input-otp` library and applies default styling.
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    // Styles for the container div that holds all the slots.
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    // Styles for the hidden input element.
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

// A container component for grouping `InputOTPSlot`s.
// It's a simple `div` with flexbox properties to align the slots.
const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

// A component that renders an individual character slot in the OTP input.
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  // Extends div props and requires an `index` prop.
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  // Accesses the state of the OTP input from the context provided by `OTPInput`.
  const inputOTPContext = React.useContext(OTPInputContext)
  // Destructures the state for the specific slot based on its index.
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        // Applies a ring effect when the slot is active (focused).
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {/* Renders the character in the slot. */}
      {char}
      {/* Renders a fake caret for better UX when the slot is active. */}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

// A component for rendering a separator, typically between `InputOTPGroup`s.
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  // Uses a `div` with a "separator" role for accessibility.
  <div ref={ref} role="separator" {...props}>
    {/* Renders a dot icon as the default separator. */}
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

// Exports the composed components for use in other parts of the application.
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }