"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { normalizeFrenchPhone } from "@/lib/validation-helpers";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

/**
 * Phone input with +33 prefix. User enters digits only; we store full E.164 (+33751321131).
 */
export const PhoneInput = React.forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, error, className, ...props }, ref) => {
    const fullNumber = value.startsWith("+33") ? value : "";
    const displayValue = fullNumber ? fullNumber.slice(3).replace(/(\d{3})(?=\d)/g, "$1 ") : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "");
      const normalized = normalizeFrenchPhone(raw);
      onChange(normalized);
    };

    return (
      <div
        className={cn(
          "flex h-12 w-full items-center rounded-xl border bg-background px-4 shadow-sm ring-offset-background transition-all duration-200",
          "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
          error ? "border-red-500" : "border-border",
          props.disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        <span className="select-none text-muted-foreground font-medium">+33</span>
        <input
          ref={ref}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="612 345 678"
          value={displayValue}
          onChange={handleChange}
          className={cn(
            "ml-2 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? "phone-error" : undefined}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
