import * as React from "react"
// Imports types from a custom Toast component
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

// Default duration for the toast to be visible before auto-closing.
const TOAST_DURATION = 5000;
// Duration to wait for the exit animation before removing the toast from the DOM.
// Note: This constant is defined but not used in the provided code, but is kept for potential future use.
const TOAST_ANIMATION_DURATION = 300; 
// Maximum number of toasts that can be visible at once.
const TOAST_LIMIT = 3;

// Extends the base ToastProps with properties needed for the toaster state management.
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Defines the action types for the toast reducer to ensure type safety.
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// A simple counter to generate unique IDs for each toast.
let count = 0

// Generates a unique, incrementing ID for each new toast.
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// A union type representing all possible actions that can be dispatched to the reducer.
type ActionType = typeof actionTypes

// Defines the shape of each action object.
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// Defines the shape of the state managed by the reducer.
interface State {
  toasts: ToasterToast[]
}

// A global dispatch function, allowing toasts to be created from outside React components.
// It is initialized to a no-op function and later updated by the ToastProvider.
let dispatch: React.Dispatch<Action> = () => {}

// The reducer function handles state updates based on dispatched actions.
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // Adds a new toast to the beginning of the array and respects the TOAST_LIMIT.
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    // Updates an existing toast's properties.
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    // Sets the `open` state of a specific toast (or all toasts) to false to trigger exit animations.
    case "DISMISS_TOAST": {
      const { toastId } = action
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          // If a toastId is provided, dismiss that one. Otherwise, dismiss all.
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    
    // Removes a toast (or all toasts) from the state entirely.
    case "REMOVE_TOAST":
      // If no toastId is provided, clear all toasts.
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      // Otherwise, filter out the toast with the matching ID.
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
      
    default:
      return state
  }
}

// Creates a React context to provide toast state and dispatch function to child components.
const ToastContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// The provider component that wraps the application to enable the toast functionality.
export function ToastProvider({ children }: { children: React.ReactNode }) {
  // Initializes the reducer for managing toast state.
  const [state, dispatchAction] = React.useReducer(reducer, {
    toasts: [],
  });
  
  // On mount, this effect updates the global `dispatch` function.
  // This allows the imperative `toast()` function to work from anywhere in the app.
  React.useEffect(() => {
    dispatch = dispatchAction;
  }, []);

  return (
    <ToastContext.Provider value={{ state, dispatch: dispatchAction }}>
      {children}
    </ToastContext.Provider>
  )
}

// Custom hook for components to access the toast state and dispatch actions.
export const useToast = () => {
  const context = React.useContext(ToastContext);

  // Ensures the hook is used within a ToastProvider.
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { state, dispatch } = context;

  // This effect handles the auto-dismissal of toasts after their duration expires.
  React.useEffect(() => {
    // A map to keep track of active timers for each toast.
    const timers = new Map<string, NodeJS.Timeout>();

    state.toasts.forEach((toast) => {
      // If a toast is open and doesn't already have a timer, create one.
      if (toast.open && !timers.has(toast.id)) {
        const duration = toast.duration ?? TOAST_DURATION;
        const timer = setTimeout(() => {
          // When the timer fires, dispatch the dismiss action.
          dispatch({ type: "DISMISS_TOAST", toastId: toast.id });
        }, duration);
        timers.set(toast.id, timer);
      }
    });

    // Cleanup function to clear all timers when the component unmounts or state changes.
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [state, dispatch]);

  return {
    ...state,
    // Exposes a `dismiss` function to manually dismiss a toast.
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    // Exposes a `remove` function to manually remove a toast.
    remove: (toastId?: string) => dispatch({ type: "REMOVE_TOAST", toastId }),
  }
}

// Defines the properties for creating a new toast, omitting the auto-generated `id`.
type Toast = Omit<ToasterToast, "id">

// Imperative API to create and show a toast from anywhere in the application.
export function toast({ ...props }: Toast) {
  // Generate a unique ID for the new toast.
  const id = genId()

  // Use the global dispatch function to add the new toast to the state.
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      // The onOpenChange callback syncs the toast's open state from the UI component
      // back to our central state, e.g., when a user clicks the 'x' button.
      onOpenChange: (open) => {
        if (!open) {
          dispatch({ type: "DISMISS_TOAST", toastId: id })
        }
      },
    },
  })

  // Returns controls for the newly created toast.
  return {
    id: id,
    dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
    update: (props: ToasterToast) =>
      dispatch({
        type: "UPDATE_TOAST",
        toast: { ...props, id },
      }),
  }
}

