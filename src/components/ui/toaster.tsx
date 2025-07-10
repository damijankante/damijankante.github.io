import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  // Rename the provider from the primitives to avoid a name conflict.
  ToastProvider as ToastPrimitivesProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import React from "react"

// Define the duration for the toast's exit animation.
// This ensures we wait for the animation to finish before removing the toast from the DOM.
const TOAST_ANIMATION_DURATION = 300; 

// The Toaster component is responsible for rendering all active toasts.
export function Toaster() {
  // Retrieve the list of toasts and the remove function from our custom hook.
  const { toasts, remove } = useToast()

  // This effect manages the lifecycle of toasts that have been closed.
  React.useEffect(() => {
    // Use a Map to keep track of timers for each toast that is closing.
    const timers = new Map<string, NodeJS.Timeout>();

    // Iterate over all toasts to find ones that are marked as closed.
    toasts.forEach((toast) => {
      // Check if a toast is closed (open is false) and doesn't already have a removal timer.
      if (!toast.open && !timers.has(toast.id)) {
        // Schedule the removal of the toast from the state after the animation duration.
        const timer = setTimeout(() => {
          remove(toast.id);
          // Clean up the timer from the map once it has fired.
          timers.delete(toast.id);
        }, TOAST_ANIMATION_DURATION);

        // Store the timer in the map to prevent creating multiple timers for the same toast.
        timers.set(toast.id, timer);
      }
    });

    // The cleanup function for the effect.
    return () => {
      // Clear all scheduled timers when the component unmounts or dependencies change.
      // This prevents memory leaks and state updates on unmounted components.
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, remove]); // Rerun the effect if the toasts array or the remove function changes.

  return (
    // The provider component that contains all toast elements.
    <ToastPrimitivesProvider>
      {/* Map over the toasts array to render each individual Toast component. */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // The base Toast component, receiving Radix props.
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {/* Conditionally render the title if it exists. */}
              {title && <ToastTitle>{title}</ToastTitle>}
              {/* Conditionally render the description if it exists. */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {/* Render any action component, like a button, passed to the toast. */}
            {action}
            {/* The default close button for the toast. */}
            <ToastClose />
          </Toast>
        )
      })}
      {/* The viewport where all toasts will be rendered in the UI. */}
      <ToastViewport />
    </ToastPrimitivesProvider>
  )
}