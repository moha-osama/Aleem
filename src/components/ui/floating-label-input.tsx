import * as React from "react";

import { cn } from "./utils";

interface FloatingLabelInputProps extends React.ComponentProps<"input"> {
  label: string;
}

function FloatingLabelInput({
  className,
  label,
  id,
  type,
  ...props
}: FloatingLabelInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className="relative">
      <input
        id={inputId}
        type={type}
        placeholder=" "
        data-slot="input"
        className={cn(
          "peer file:text-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-10 w-full min-w-0 rounded-md border px-3 py-2 text-base bg-gray-100 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
      <label
        htmlFor={inputId}
        data-slot="label"
        className={cn(
          // Shared: transition + absolute positioning + non-interactive
          "pointer-events-none absolute select-none font-medium transition-all duration-200",
          // LTR: anchor to left; RTL: anchor to right
          "ltr:left-3 rtl:right-3",
          // Default = floated (has value): small label sitting on the top border
          "top-0 -translate-y-1/2 text-xs bg-gray-100 px-1 text-foreground",
          // Placeholder visible (empty + not focused): label looks like a placeholder at center
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-muted-foreground",
          // Focused: float back up regardless of value
          "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:bg-gray-100 peer-focus:px-1 peer-focus:text-primary",
        )}
      >
        {label}
      </label>
    </div>
  );
}

export { FloatingLabelInput };
export type { FloatingLabelInputProps };
