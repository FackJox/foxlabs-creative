import React, { forwardRef } from "react";
import { Input } from "@/components/ui/inputs";
import { Label } from "@/components/ui/inputs";
import { cn } from "@/lib/utils";
import { useCursor } from "@/hooks/use-cursor";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  cursorText?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ 
    id, 
    label, 
    error, 
    helperText, 
    className, 
    required, 
    cursorText,
    onMouseEnter,
    onMouseLeave,
    ...props 
  }, ref) => {
    const { setCursorText } = useCursor();
    const errorId = error ? `${id}-error` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
      if (cursorText) {
        setCursorText(cursorText);
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
      if (cursorText) {
        setCursorText("");
      }
      onMouseLeave?.(e);
    };

    return (
      <div className="space-y-2">
        <Label 
          htmlFor={id}
          className="block text-base font-medium text-foreground"
        >
          {label}{required && <span className="ml-1 text-destructive">*</span>}
        </Label>
        <Input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={required}
          required={required}
          className={cn(
            error && "border-error focus-visible:ring-error",
            "w-full",
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-destructive">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput"; 