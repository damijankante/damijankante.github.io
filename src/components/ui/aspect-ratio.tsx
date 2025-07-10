// Import the primitive component from the Radix UI library.
// Radix provides the core, unstyled functionality and accessibility.
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

// Re-export the `Root` component from Radix under the more convenient name `AspectRatio`.
// This is the main component that will wrap the content to give a specific aspect ratio.
const AspectRatio = AspectRatioPrimitive.Root

// Export the component so it can be used throughout the application.
export { AspectRatio }