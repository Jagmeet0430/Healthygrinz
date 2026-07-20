"use client";

import { useMemo, useState } from "react";
import { adminNavGroups } from "@/data/dentmind-admin";
import { AdminAnalyticsPanel } from "@/components/dentmind-admin/AdminAnalyticsPanel";
import { AdminCopilot } from "@/components/dentmind-admin/AdminCopilot";
import { AdminKpiGrid } from "@/components/dentmind-admin/AdminKpiGrid";
import { AdminManagementTables } from "@/components/dentmind-admin/AdminManagementTables";
import { AdminSystemHealth } from "@/components/dentmind-admin/AdminSystemHealth";

export function AdminShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const navItems = useMemo(() => adminNavGroups.flatMap((group) => group.items), []);

  return (
    <main className={`dma-shell dma-${theme} ${collapsed ? "is-collapsed" : ""}`}>
      <aside className="dma-sidebar">
        <div className="dma-sidebar-brand">
          <span>D</span>
          <div>
            <strong>DentMind Admin</strong>
            <small>Platform control plane</small>
          </div>
        </div>
        <button className="dma-collapse" type="button" onClick={() => setCollapsed((value) => !value)}>
          {collapsed ? "Expand" : "Collapse"}
        </button>
        <nav aria-label="DentMind admin navigation">
          {adminNavGroups.map((group) => (
            <section key={group.title}>
              <p>{group.title}</p>
              {group.items.map((item) => (
                <a className={item === "Dashboard" ? "is-active" : ""} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>
                  <span>{item.slice(0, 2).toUpperCase()}</span>
                  <strong>{item}</strong>
                </a>
              ))}
            </section>
          ))}
        </nav>
      </aside>

      <section className="dma-main">
        <header className="dma-topbar">
          <div className="dma-workspace-switcher">
            <span>Workspace</span>
            <strong>DentMind Global</strong>
          </div>
          <label className="dma-search">
            <span>Search everywhere</span>
            <input placeholder="Clinics, doctors, invoices, AI logs, tickets..." />
          </label>
          <div className="dma-topbar-actions">
            <button type="button">Ctrl K</button>
            <button type="button">Alerts</button>
            <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <button type="button">Profile</button>
          </div>
        </header>

        <section className="dma-hero">
          <div>
            <p className="dma-kicker">Enterprise admin panel</p>
            <h1>Command every clinic, model, payment, and security event from one premium control plane.</h1>
            <p>
              A Stripe-grade SaaS cockpit for clinic growth, AI operations, subscriptions, support, infrastructure, and
              compliance.
            </p>
          </div>
          <div className="dma-quick-actions">
            {["Create clinic", "Review AI logs", "Open security center", "Export board report"].map((item) => (
              <button type="button" key={item}>
                {item}
              </button>
            ))}
          </div>
        </section>

        <AdminKpiGrid />

        <section className="dma-content-grid">
          <AdminAnalyticsPanel />
          <AdminCopilot />
        </section>

        <AdminManagementTables />
        <AdminSystemHealth />

        <section className="dma-panel dma-command-map">
          <div className="dma-panel-head">
            <div>
              <p className="dma-kicker">Navigation map</p>
              <h2>{navItems.length} admin surfaces ready for routing</h2>
            </div>
          </div>
          <div>
            {navItems.slice(0, 28).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

