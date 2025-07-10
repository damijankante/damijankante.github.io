import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Defines the props for the Calendar component. It extends all the props
// from the underlying `react-day-picker` library's `DayPicker` component.
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// A highly-styled and reusable Calendar component built on top of `react-day-picker`.
// It uses Tailwind CSS for styling and is fully theme-aware.
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      // The `classNames` prop allows for granular styling of each part of the calendar.
      classNames={{
        // Container for all the months.
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        // Container for a single month.
        month: "space-y-4",
        // The header of a month (e.g., "June 2024").
        caption: "flex justify-center pt-1 relative items-center",
        // The text label within the caption.
        caption_label: "text-sm font-medium",
        // Container for the previous/next month navigation buttons.
        nav: "space-x-1 flex items-center",
        // The navigation buttons themselves.
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        // The "previous month" button, positioned on the left.
        nav_button_previous: "absolute left-1",
        // The "next month" button, positioned on the right.
        nav_button_next: "absolute right-1",
        // The table element holding the grid of days.
        table: "w-full border-collapse space-y-1",
        // The row containing the weekday names (e.g., S, M, T, W, T, F, S).
        head_row: "flex",
        // A single weekday name cell.
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        // A row representing a week.
        row: "flex w-full mt-2",
        // A single cell containing a day.
        // The `[&:has(...)]` selectors apply styles to the cell based on the state of the day inside it.
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        // The interactive button for each day.
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        // A marker class for the last day in a selected range.
        day_range_end: "day-range-end",
        // Styles for a selected day.
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        // Styles for the current day.
        day_today: "bg-accent text-accent-foreground",
        // Styles for days that are not in the current month but are visible.
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        // Styles for disabled (unselectable) days.
        day_disabled: "text-muted-foreground opacity-50",
        // Styles for days that are within a selected range but are not the start or end.
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        // Styles for hidden days.
        day_hidden: "invisible",
        // Allows for merging custom classNames passed via props.
        ...classNames,
      }}
      // The `components` prop allows replacing default elements, like icons.
      components={{
        // Replaces the default left arrow with a custom icon from lucide-react.
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        // Replaces the default right arrow with a custom icon from lucide-react.
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
