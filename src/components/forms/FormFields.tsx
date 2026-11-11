"use client";

import React from "react";

const base =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none focus:ring-2 focus:ring-starehe-blue-700/30 focus:border-starehe-blue-700 disabled:bg-stone-100";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FieldShell({ id, label, hint, error, required, className, children }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[13px] font-semibold text-starehe-blue-900 mb-1.5">
        {label}
        {required && <span className="text-starehe-maroon-700 ml-0.5" aria-hidden>*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-starehe-maroon-700 leading-snug">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-stone-500 leading-snug">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  id: string;
  label: string;
  value: string;
  onValue: (v: string) => void;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export function TextField({ id, label, value, onValue, hint, error, required, wrapperClassName, ...rest }: InputProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={wrapperClassName}>
      <input
        id={id}
        name={id}
        value={value}
        onChange={(e) => onValue(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${base} ${error ? "border-starehe-maroon-500" : "border-stone-300"}`}
        {...rest}
      />
    </FieldShell>
  );
}

type AreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> & {
  id: string;
  label: string;
  value: string;
  onValue: (v: string) => void;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export function TextArea({ id, label, value, onValue, hint, error, required, wrapperClassName, maxLength, ...rest }: AreaProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={wrapperClassName}>
      <textarea
        id={id}
        name={id}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onValue(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${base} leading-relaxed ${error ? "border-starehe-maroon-500" : "border-stone-300"}`}
        {...rest}
      />
      {maxLength ? (
        <div className="mt-1 text-right text-[11px] text-stone-400">
          {value.length}/{maxLength}
        </div>
      ) : null}
    </FieldShell>
  );
}

type SelectProps = {
  id: string;
  label: string;
  value: string;
  onValue: (v: string) => void;
  options: ReadonlyArray<string | { value: string; label: string }>;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  wrapperClassName?: string;
};

export function SelectField({ id, label, value, onValue, options, placeholder, hint, error, required, wrapperClassName }: SelectProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={wrapperClassName}>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onValue(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${base} ${error ? "border-starehe-maroon-500" : "border-stone-300"}`}
      >
        <option value="">{placeholder || "Select…"}</option>
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value;
          const l = typeof o === "string" ? o : o.label;
          return (
            <option key={v} value={v}>
              {l}
            </option>
          );
        })}
      </select>
    </FieldShell>
  );
}

