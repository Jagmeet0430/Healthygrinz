import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={`button ${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`button ${variant} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
