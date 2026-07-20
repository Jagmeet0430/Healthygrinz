import { useQuery } from "@tanstack/react-query";
import {
  BadgeIndianRupee,
  CalendarClock,
  CreditCard,
  Stethoscope,
  UserRoundCheck,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { activities, appointmentStats, appointments, patientGrowthData, revenueData } from "@/data/mock";
import { delay, money } from "@/lib/utils";

export function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () =>
      delay({
        appointmentStats,
        appointments,
        patientGrowthData,
        revenueData,
        activities,
      }),
  });

  if (isLoading || !data) {
    return <LoadingState />;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Clinic command center"
        title="Premium dental operations dashboard"
        description="Monitor patients, doctors, appointments, revenue, payments, and AI-assisted clinic activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard title="Total Patients" value="1,284" change="+12.1%" icon={Users} tone="blue" />
        <StatCard title="Total Doctors" value="12" change="+2 new" icon={Stethoscope} tone="teal" />
        <StatCard title="Today's Appointments" value="38" change="+6 vs avg" icon={CalendarClock} tone="amber" />
        <StatCard title="Upcoming" value="126" change="7 days" icon={UserRoundCheck} tone="blue" />
        <StatCard title="Monthly Revenue" value={money(312000)} change="+8.2%" icon={BadgeIndianRupee} tone="teal" />
        <StatCard title="Pending Payments" value={money(74000)} change="18 invoices" icon={CreditCard} tone="rose" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Statistics</CardTitle>
            <CardDescription>Completed, cancelled, and scheduled volume by weekday.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.appointmentStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="scheduled" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="cancelled" fill="#fb7185" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
            <CardDescription>New and returning patient momentum.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.patientGrowthData}>
                <defs>
                  <linearGradient id="patientGrowth" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area dataKey="patients" fill="url(#patientGrowth)" stroke="#0ea5e9" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Chart</CardTitle>
            <CardDescription>Monthly revenue against collected payments.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => money(Number(value))} />
                <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="payments" stroke="#14b8a6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Latest appointment activity from dummy clinic data.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.appointments.slice(0, 4).map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-bold">{appointment.patient}</TableCell>
                    <TableCell>{appointment.treatment}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Badge variant={appointment.status === "Completed" ? "teal" : "default"}>{appointment.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Operational timeline across front desk, billing, stock, and AI tools.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {data.activities.map((activity) => (
            <div className="rounded-xl border bg-muted/35 p-4 text-sm font-semibold leading-6" key={activity}>
              {activity}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
