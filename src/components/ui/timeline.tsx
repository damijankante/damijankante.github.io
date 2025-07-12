import React from "react";
import { cn } from "@/lib/utils"; // Assumes you have a utility for merging Tailwind classes

// The main container for the timeline. It renders an ordered list (<ol>).
// It's responsible for drawing the vertical line on the left side.
interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ children, className, ...props }, ref) => {
    return (
      // The 'relative' class is crucial for positioning the timeline dots.
      // The 'border-l' class creates the vertical timeline line itself.
      <ol
        ref={ref}
        className={cn("relative border-l border-border/70 ml-3", className)}
        {...props}
      >
        {children}
      </ol>
    );
  }
);
Timeline.displayName = "Timeline";

// Represents a single item or "event" on the timeline. Renders a list item (<li>).
interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      // The 'mb-4' provides spacing between timeline items.
      // The 'ml-8' provides space for the dot and the line.
      <li ref={ref} className={cn("mb-4 ml-7", className)} {...props}>
        {/* This span creates the circular dot on the timeline line. */}
        <span className="absolute flex items-center justify-center w-3 h-3 bg-primary rounded-full -left-1.5 ring-4 ring-card mt-2" />
        {children}
      </li>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

// A styled component for displaying the time or date of a timeline event.
export const TimelineTime = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn(
      "mb-1 text-sm font-normal leading-none text-muted-foreground",
      className
    )}
    {...props}
  />
));
TimelineTime.displayName = "TimelineTime";

// A styled component for the main title of a timeline event.
export const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
TimelineTitle.displayName = "TimelineTitle";

// A styled component for the subtitle or institution name.
export const TimelineSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium text-foreground/90", className)}
    {...props}
  />
));
TimelineSubtitle.displayName = "TimelineSubtitle";

// A styled component for the detailed description of a timeline event.
export const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-2 text-sm font-normal text-muted-foreground", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";