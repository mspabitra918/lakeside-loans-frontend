import React from "react";

export const labelClass = "block text-sm font-medium text-slate-700 mb-2";

export const controlClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200";

export const buttonClass = "rounded-lg px-6 py-3 font-semibold transition";

export function Field<T extends Record<keyof T, string | number | boolean>>({
  name,
  label,
  errors,
  values,
  onChange,
  children,
  className,
}: {
  name: keyof T & string;
  label: string;
  errors: Record<string, string>;
  values: T;
  onChange: (name: string, value: string | boolean) => void;
  children: (props: {
    id: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    className: string;
  }) => React.ReactNode;
  className?: string;
}) {
  const error = errors[name];
  const errorId = `${name}-error`;

  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      {children({
        id: name,
        name,
        value: String(values[name] ?? ""),
        onChange: (e) => {
          const target = e.target;

          if (
            target instanceof HTMLInputElement &&
            target.type === "checkbox"
          ) {
            onChange(name, target.checked);
          } else {
            onChange(name, target.value);
          }
        },
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
        className: controlClass,
      })}

      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}
