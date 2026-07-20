import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  BadgeIndianRupee,
  Bot,
  Boxes,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  Home,
  Menu,
  Moon,
  Search,
  Settings,
  Stethoscope,
  Sun,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navigation = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/treatments", label: "Treatments", icon: ClipboardList },
  { to: "/billing", label: "Billing", icon: BadgeIndianRupee },
  { to: "/reports", label: "Reports", icon: ChartNoAxesCombined },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/ai-center", label: "AI Center", icon: Bot },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const title = useMemo(() => {
    const item = navigation.find((nav) => nav.to === pathname);
    return item?.label || "HealthyGrinz Admin";
  }, [pathname]);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setDark(document.documentElement.classList.contains("dark"));
  }

  return (
    <div className="min-h-screen soft-gradient">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-border/80 bg-card/95 shadow-premium backdrop-blur transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-5">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 text-white shadow-lg">
              HG
            </span>
            <span>
              <strong className="block text-base leading-none">HealthyGrinz</strong>
              <small className="text-muted-foreground">Admin</small>
            </span>
          </Link>
          <Button className="lg:hidden" variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="grid gap-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  pathname === item.to && "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 rounded-xl border bg-gradient-to-br from-sky-500/10 to-teal-500/10 p-4">
          <p className="text-sm font-bold">Clinic intelligence</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            AI summaries, revenue trends, and care operations in one premium workspace.
          </p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
            <Button className="lg:hidden" variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">HealthyGrinz Admin</p>
              <h1 className="text-lg font-black">{title}</h1>
            </div>
            <div className="ml-auto hidden w-full max-w-sm items-center gap-2 rounded-xl border bg-card px-3 md:flex">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input className="border-0 bg-transparent shadow-none focus-visible:ring-0" placeholder="Search patients, invoices, reports..." />
            </div>
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="hidden items-center gap-3 rounded-xl border bg-card px-3 py-2 sm:flex">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-500 to-teal-500" />
              <div>
                <p className="text-sm font-bold leading-none">Clinic Admin</p>
                <p className="mt-1 text-xs text-muted-foreground">Operations Lead</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
