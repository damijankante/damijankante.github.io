import * as React from "react"

const MOBILE_BREAKPOINT = 768

/* A custom React hook that returns `true` if the current viewport width is considered mobile-sized. */
export function useIsMobile() {
  // State to hold the mobile status. Initialized to `undefined` to handle
  // server-side rendering (SSR) where the `window` object is not available.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // This effect runs only once on the client-side after the component mounts.
  React.useEffect(() => {
    // Create a media query list object that watches for changes in the viewport width.
    // This is more performant than listening to the 'resize' event.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // The event handler that updates the state when the media query's result changes.
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    // Add the event listener to the media query list.
    mql.addEventListener("change", onChange)

    // Perform an initial check to set the correct state when the hook first runs.
    setIsMobile(mql.matches)

    // Cleanup function: remove the event listener when the component unmounts to prevent memory leaks.
    return () => mql.removeEventListener("change", onChange)
  }, []) // The empty dependency array ensures this effect runs only once.

  // Return the state. The `!!` (double negation) operator ensures the output is
  // always a strict boolean (`true` or `false`), converting the initial `undefined`
  // state to `false` on the server or during the initial client render.
  return !!isMobile
}