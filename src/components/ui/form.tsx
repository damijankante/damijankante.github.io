import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

// The main Form component is a re-export of React Hook Form's FormProvider.
// This allows to use all of react-hook-form's hooks in child components.
const Form = FormProvider

// Defines the shape of the context value for a form field.
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

// React context to pass the field name down to child components.
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

// The FormField component connects a form input to the form's state.
// It uses the Controller from react-hook-form to manage the field's value, validation, etc.
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    // Provides the field name to nested components via context.
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

// Custom hook to access form field state and metadata.
const useFormField = () => {
  // Get the field name from the FormFieldContext.
  const fieldContext = React.useContext(FormFieldContext)
  // Get the unique ID for the form item from the FormItemContext.
  const itemContext = React.useContext(FormItemContext)
  // Access the form's state and methods from react-hook-form.
  const { getFieldState, formState } = useFormContext()

  // Retrieve the state of the specific field (e.g., error, dirty, touched).
  const fieldState = getFieldState(fieldContext.name, formState)

  // Ensure this hook is used within a FormField component.
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  // Return all the necessary props for building form components.
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

// Defines the shape of the context value for a form item.
type FormItemContextValue = {
  id: string
}

// React context to share a unique ID for a form item and its parts.
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

// A wrapper component that groups a label, control, description, and message.
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Generate a unique ID for this form item instance.
  const id = React.useId()

  return (
    // Provides the unique ID to nested components via context.
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

// Renders a label, automatically connecting it to the form control.
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Get the error state and the ID for the form item.
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      // Apply a destructive color style if there's an error.
      className={cn(error && "text-destructive", className)}
      // Connect the label to the input field for accessibility.
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

// A wrapper that passes accessibility props to the underlying input component.
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  // Get the necessary props for ARIA attributes.
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    // The Slot component merges its props onto its immediate child.
    <Slot
      ref={ref}
      id={formItemId}
      // Link the input to its description and error message for screen readers.
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      // Indicate that the field is invalid if there is an error.
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

// Renders a description or helper text for a form field.
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  // Get the unique ID for the description element.
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

// Renders a validation message for a form field.
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  // Get the error object and the unique ID for the message element.
  const { error, formMessageId } = useFormField()
  // The content of the message is the error message, or the children if no error.
  const body = error ? String(error?.message) : children

  // Do not render anything if there is no message to display.
  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
