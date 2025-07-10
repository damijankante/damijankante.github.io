import * as React from "react"
import * as RechartsPrimitive from "recharts"

// Import a utility function for conditionally applying CSS classes.
import { cn } from "@/lib/utils"

// Define the supported themes and their corresponding CSS selectors.
// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

// Define the shape of the chart configuration object.
export type ChartConfig = {
  // Each key is a data key from the chart's data source.
  [k in string]: {
    // The display name for the data series.
    label?: React.ReactNode
    // An optional icon component for the data series.
    icon?: React.ComponentType
    // The color can be defined in one of two ways:
  } & (
    // 1. A single color string for all themes.
    | { color?: string; theme?: never }
    // 2. A theme-specific object mapping theme names to color strings.
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

// Define the props for the ChartContext.
type ChartContextProps = {
  config: ChartConfig
}

// Create a React context to share chart configuration with child components.
const ChartContext = React.createContext<ChartContextProps | null>(null)

// Custom hook to access the chart configuration from the context.
function useChart() {
  const context = React.useContext(ChartContext)

  // Throw an error if the hook is used outside of a ChartContainer.
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

// The main container component for a chart.
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    // The chart's configuration object.
    config: ChartConfig
    // The children must be valid Recharts components.
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  // Generate a unique ID for the chart if one isn't provided.
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    // Provide the chart configuration to all descendants.
    <ChartContext.Provider value={{ config }}>
      <div
        // Use a data attribute to scope the CSS variables.
        data-chart={chartId}
        ref={ref}
        className={cn(
          // Base styles for the chart container and its Recharts-generated elements.
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        {/* Component to inject dynamic CSS styles for the chart. */}
        <ChartStyle id={chartId} config={config} />
        {/* A Recharts container that makes the chart responsive to its parent's size. */}
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

// A component that generates and injects a <style> tag for dynamic, theme-aware chart colors.
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  // Filter the config to only include items that have a color or theme defined.
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  // If no colors are defined, don't render anything.
  if (!colorConfig.length) {
    return null
  }

  return (
    // Use dangerouslySetInnerHTML to create the style tag content.
    <style
      dangerouslySetInnerHTML={{
        // Generate CSS rules for both light and dark themes.
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    // Determine the color for the current theme.
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    // Create a CSS custom property for the color.
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

// Re-export the primitive Tooltip component from Recharts.
const ChartTooltip = RechartsPrimitive.Tooltip

// A custom content component for the chart tooltip.
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      // If true, the label at the top of the tooltip is hidden.
      hideLabel?: boolean
      // If true, the color indicator next to each item is hidden.
      hideIndicator?: boolean
      // The style of the color indicator.
      indicator?: "line" | "dot" | "dashed"
      // The key in the payload to use for the name of the data series.
      nameKey?: string
      // The key in the payload to use for the label of the tooltip.
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    // Access the chart config via the custom hook.
    const { config } = useChart()

    // Memoize the calculation for the tooltip's main label.
    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      // Use the custom label formatter if provided.
      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      // Render the label with default styling.
      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    // Don't render anything if the tooltip is not active or has no data.
    if (!active || !payload?.length) {
      return null
    }

    // Determine if the label should be nested inside the item row.
    // This happens for single-item tooltips with a line or dashed indicator.
    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {/* Render the main label at the top, unless it's nested. */}
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {/* Map over the data points in the payload to render each item row. */}
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {/* Use a custom formatter for the entire item row if provided. */}
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  // Default rendering for a tooltip item.
                  <>
                    {/* Render a custom icon from config, or the color indicator. */}
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          // Set the indicator color using CSS custom properties.
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {/* Render the nested label if applicable. */}
                        {nestLabel ? tooltipLabel : null}
                        {/* Display the item's name or its configured label. */}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {/* Display the formatted value of the data point. */}
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

// Re-export the primitive Legend component from Recharts.
const ChartLegend = RechartsPrimitive.Legend

// A custom content component for the chart legend.
const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    // Pick specific props from Recharts' LegendProps.
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      // If true, hides the icon/color swatch.
      hideIcon?: boolean
      // The key in the payload to use for the name of the data series.
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    // Access the chart config via the custom hook.
    const { config } = useChart()

    // Don't render if there's no legend data.
    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {/* Map over the legend items to render each one. */}
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {/* Render a custom icon from config if available and not hidden. */}
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                // Otherwise, render a colored square.
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {/* Render the label from the config. */}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper function to extract an item's configuration from the chart config.
// It looks up the config using a provided key and the payload data.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  // Return undefined if the payload is not a valid object.
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  // Check for a nested payload property, common in Recharts data structures.
  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  // Try to find a more specific key for the config from the payload itself.
  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
    // Or, try to find it in the nested payload.
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  // Return the configuration for the determined key, or fall back to the original key.
  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

// Export all the public chart components.
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}