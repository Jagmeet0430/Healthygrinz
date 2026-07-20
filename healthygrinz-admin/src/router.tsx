import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { AuthLayout } from "@/components/layout/auth-layout";
import { AiCenterPage } from "@/pages/ai-center";
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from "@/pages/auth";
import { DashboardPage } from "@/pages/dashboard";
import {
  AppointmentsPage,
  BillingPage,
  DoctorsPage,
  InventoryPage,
  PatientProfilePage,
  PatientsPage,
  ReportsPage,
  SettingsPage,
  TreatmentsPage,
} from "@/pages/management";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/login",
  component: LoginPage,
});

const forgotRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});

const resetRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/reset-password",
  component: ResetPasswordPage,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: AppShell,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: DashboardPage,
});

const patientsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/patients",
  component: PatientsPage,
});

const patientProfileRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/patients/$patientId",
  component: PatientProfileRoute,
});

const doctorsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/doctors",
  component: DoctorsPage,
});

const appointmentsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/appointments",
  component: AppointmentsPage,
});

const treatmentsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/treatments",
  component: TreatmentsPage,
});

const billingRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/billing",
  component: BillingPage,
});

const reportsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/reports",
  component: ReportsPage,
});

const inventoryRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/inventory",
  component: InventoryPage,
});

const aiCenterRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/ai-center",
  component: AiCenterPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute, forgotRoute, resetRoute]),
  appRoute.addChildren([
    dashboardRoute,
    patientsRoute,
    patientProfileRoute,
    doctorsRoute,
    appointmentsRoute,
    treatmentsRoute,
    billingRoute,
    reportsRoute,
    inventoryRoute,
    aiCenterRoute,
    settingsRoute,
  ]),
]);

export const router = createRouter({ routeTree });

function PatientProfileRoute() {
  const { patientId } = patientProfileRoute.useParams();
  return <PatientProfilePage patientId={patientId} />;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
