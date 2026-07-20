import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  tone?: "blue" | "teal" | "amber" | "rose";
};

const tones = {
  blue: "from-sky-500 to-blue-600",
  teal: "from-teal-500 to-emerald-500",
  amber: "from-amber-400 to-orange-500",
  rose: "from-rose-500 to-pink-500",
};

export function StatCard({ title, value, change, icon: Icon, tone = "blue" }: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{title}</p>
          <strong className="mt-2 block text-2xl font-black tracking-tight">{value}</strong>
          <span className="mt-2 inline-flex rounded-full bg-teal-500/10 px-2 py-1 text-xs font-bold text-teal-600 dark:text-teal-300">
            {change}
          </span>
        </div>
        <div className={cn("grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg", tones[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
