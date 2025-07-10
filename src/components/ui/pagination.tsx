import * as React from "react"
// Imports icons for previous, next, and ellipsis from the lucide-react library.
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
// Imports a utility function to conditionally join class names, common in Tailwind CSS projects.
import { cn } from "@/lib/utils"
// Imports types from a reusable Button component, ensuring style consistency.
import { ButtonProps, buttonVariants } from "@/components/ui/button"

// The main container for the pagination component.
// It sets up the navigation role and ARIA label for accessibility.
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

// A flex container for the pagination items, typically a <ul> element.
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

// A list item wrapper for a pagination link or ellipsis, typically an <li> element.
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

// Defines the props for the PaginationLink component.
type PaginationLinkProps = {
  // A boolean to indicate if the link represents the current active page.
  isActive?: boolean
} & Pick<ButtonProps, "size"> & // Inherits the 'size' prop from ButtonProps.
  React.ComponentProps<"a"> // Inherits all standard 'a' element props.

// A styled link component for individual page numbers.
// Behaves like a button but is rendered as an 'a' tag.
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    // Sets aria-current to "page" for the active link, improving accessibility.
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        // Uses the "outline" variant for the active page, and "ghost" for others.
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

// A specialized link for navigating to the previous page.
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

// A specialized link for navigating to the next page.
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

// A component to indicate a gap in page numbers (e.g., 1, 2, ..., 10).
// It is not interactive and is hidden from screen readers.
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

// Exports all the pagination components for use throughout the application.
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
