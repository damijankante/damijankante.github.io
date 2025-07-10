import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Type alias for the Embla Carousel API.
type CarouselApi = UseEmblaCarouselType[1]
// Type alias for the parameters of the useEmblaCarousel hook.
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
// Type alias for the options object of the carousel.
type CarouselOptions = UseCarouselParameters[0]
// Type alias for the plugins array of the carousel.
type CarouselPlugin = UseCarouselParameters[1]

// Props for the main Carousel component.
type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

// Props for the context that will be shared among carousel components.
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

// Create a React context to share carousel state and functions.
const CarouselContext = React.createContext<CarouselContextProps | null>(null)

// Custom hook to access the carousel context.
function useCarousel() {
  const context = React.useContext(CarouselContext)

  // Throw an error if the hook is used outside of a Carousel component.
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

// The main Carousel component that acts as a provider.
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Initialize the Embla Carousel instance with options and plugins.
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    // State to track if the previous/next buttons should be enabled.
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    // Callback to update the scroll button states when the carousel settles.
    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    // Callback to scroll to the previous slide.
    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    // Callback to scroll to the next slide.
    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    // Callback to handle keyboard navigation with arrow keys.
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    // Effect to pass the Embla API instance to the parent component if `setApi` is provided.
    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    // Effect to subscribe to Embla events and update state.
    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      // Cleanup function to unsubscribe from the event.
      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      // Provide the carousel context to all child components.
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          // The main wrapper with accessibility roles and keyboard event handling.
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

// The container for the scrollable content of the carousel.
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Get the ref and orientation from the context.
  const { carouselRef, orientation } = useCarousel()

  return (
    // This div is the viewport that hides the overflowing content.
    <div ref={carouselRef} className="overflow-hidden">
      // This div is the scrollable container for all items.
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

// A single item or slide within the carousel.
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Get the orientation from the context to apply correct padding.
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      // Accessibility role for a slide.
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

// The button to navigate to the previous slide.
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  // Get the necessary state and functions from the context.
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      // The button is disabled if scrolling previous is not possible.
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

// The button to navigate to the next slide.
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  // Get the necessary state and functions from the context.
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      // The button is disabled if scrolling next is not possible.
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

// Export all the components and the API type.
export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}