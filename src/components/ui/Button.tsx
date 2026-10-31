import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const styles = variant === "primary"
    ? "bg-teal-700 text-white hover:bg-teal-800 focus-visible:outline-teal-700"
    : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 focus-visible:outline-slate-700";

  return (
    <button
      type={type}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 ${styles} ${className}`}
      {...props}
    />
  );
}
