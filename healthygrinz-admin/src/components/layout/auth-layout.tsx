import { Outlet } from "@tanstack/react-router";

export function AuthLayout() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden soft-gradient p-10 lg:grid">
        <div className="flex max-w-xl flex-col justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 text-lg font-black text-white">
              HG
            </span>
            <div>
              <strong className="block text-xl">HealthyGrinz Admin</strong>
              <span className="text-muted-foreground">Premium dental clinic management</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Healthcare SaaS</p>
            <h1 className="mt-4 text-5xl font-black leading-none tracking-tight">
              Run appointments, care, billing, inventory, and AI workflows in one calm dashboard.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Designed for modern dental clinics that need speed, clarity, and polished patient operations.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["Secure", "Responsive", "AI Ready"].map((item) => (
              <div className="premium-panel p-4 text-sm font-bold" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid place-items-center p-5">
        <Outlet />
      </section>
    </main>
  );
}
