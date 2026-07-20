import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", {
  variants: {
    variant: {
      default: "bg-primary/10 text-primary",
      teal: "bg-teal-500/10 text-teal-600 dark:text-teal-300",
      amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      rose: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
      slate: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
