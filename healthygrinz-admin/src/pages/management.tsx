import { Link } from "@tanstack/react-router";
import {
  BadgeIndianRupee,
  CalendarClock,
  CheckCircle2,
  Clock,
  Edit,
  Eye,
  Filter,
  Trash2,
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, type Column } from "@/components/shared/data-table";
import { EntityFormDialog } from "@/components/shared/entity-form-dialog";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import {
  appointments,
  doctors,
  inventory,
  invoices,
  patientGrowthData,
  patients,
  reportCards,
  revenueData,
  treatments,
  type Appointment,
  type Doctor,
  type Patient,
  type Treatment,
} from "@/data/mock";
import { money } from "@/lib/utils";

function StatusBadge({ status }: { status: string }) {
  const variant = status.includes("Low") || status === "Overdue" || status === "Cancelled" ? "rose" : status === "Pending" || status === "Waiting" ? "amber" : status === "Paid" || status === "Completed" || status === "Available" || status === "Healthy" ? "teal" : "default";
  return <Badge variant={variant}>{status}</Badge>;
}

export function PatientsPage() {
  const columns: Column<Patient>[] = [
    {
      key: "patient",
      header: "Patient",
      searchable: (item) => `${item.name} ${item.phone} ${item.email}`,
      render: (item) => (
        <div>
          <p className="font-black">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.id} • {item.phone}</p>
        </div>
      ),
    },
    { key: "age", header: "Age", render: (item) => item.age },
    { key: "condition", header: "Concern", searchable: (item) => item.condition, render: (item) => item.condition },
    { key: "last", header: "Last Visit", render: (item) => item.lastVisit },
    { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
    {
      key: "actions",
      header: "Actions",
      render: (item) => (
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/patients/$patientId" params={{ patientId: item.id }}>
              <Eye className="h-4 w-4" /> Profile
            </Link>
          </Button>
          <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Patient management"
        title="Patients"
        description="Manage patient list, profiles, medical history, treatment history, and uploaded reports."
        action={<EntityFormDialog title="Add Patient" description="Create a dummy patient record for the interface." triggerLabel="Add Patient" />}
      />
      <DataTable
        data={patients}
        columns={columns}
        filters={<Button variant="outline"><Filter className="h-4 w-4" /> Filters</Button>}
      />
    </>
  );
}

export function PatientProfilePage({ patientId }: { patientId: string }) {
  const patient = patients.find((item) => item.id === patientId) || patients[0];

  return (
    <>
      <PageHeader
        eyebrow="Patient profile"
        title={patient.name}
        description={`${patient.condition} • ${patient.phone} • ${patient.email}`}
        action={<Button>Edit Patient</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
            <CardDescription>Core demographics and latest status.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <p><strong>Patient ID:</strong> {patient.id}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
            <p><strong>Status:</strong> <StatusBadge status={patient.status} /></p>
          </CardContent>
        </Card>
        <Tabs defaultValue="medical">
          <TabsList>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="treatments">Treatment History</TabsTrigger>
            <TabsTrigger value="reports">Uploaded Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="medical" className="mt-4">
            <InfoList items={patient.medicalHistory} />
          </TabsContent>
          <TabsContent value="treatments" className="mt-4">
            <InfoList items={patient.treatments} />
          </TabsContent>
          <TabsContent value="reports" className="mt-4">
            <InfoList items={patient.reports} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export function DoctorsPage() {
  const columns: Column<Doctor>[] = [
    { key: "name", header: "Doctor", searchable: (item) => item.name, render: (item) => <strong>{item.name}</strong> },
    { key: "specialization", header: "Specialization", searchable: (item) => item.specialization, render: (item) => item.specialization },
    { key: "availability", header: "Availability", render: (item) => item.availability },
    { key: "rating", header: "Rating", render: (item) => item.rating.toFixed(1) },
    { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
    { key: "actions", header: "Actions", render: () => <RowActions /> },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Doctor management"
        title="Doctors"
        description="Manage doctors, availability, specialization, edit details, and scheduling state."
        action={<EntityFormDialog title="Add Doctor" description="Add a dummy doctor profile." triggerLabel="Add Doctor" />}
      />
      <DataTable data={doctors} columns={columns} filters={<Button variant="outline"><Clock className="h-4 w-4" /> Availability</Button>} />
    </>
  );
}

export function AppointmentsPage() {
  const columns: Column<Appointment>[] = [
    { key: "patient", header: "Patient", searchable: (item) => item.patient, render: (item) => <strong>{item.patient}</strong> },
    { key: "doctor", header: "Doctor", searchable: (item) => item.doctor, render: (item) => item.doctor },
    { key: "treatment", header: "Treatment", searchable: (item) => item.treatment, render: (item) => item.treatment },
    { key: "date", header: "Date / Time", render: (item) => `${item.date}, ${item.time}` },
    { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
    { key: "actions", header: "Actions", render: () => <RowActions labels={["Reschedule", "Cancel"]} /> },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Appointment operations"
        title="Appointments"
        description="List, calendar view, schedule, reschedule, cancel, and track appointment status."
        action={<EntityFormDialog title="Schedule Appointment" description="Create a dummy appointment." triggerLabel="Schedule Appointment" />}
      />
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Appointment List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-4">
          <DataTable data={appointments} columns={columns} filters={<Button variant="outline"><Filter className="h-4 w-4" /> Status</Button>} />
        </TabsContent>
        <TabsContent value="calendar" className="mt-4">
          <CalendarBoard />
        </TabsContent>
      </Tabs>
    </>
  );
}

export function TreatmentsPage() {
  const columns: Column<Treatment>[] = [
    { key: "name", header: "Treatment", searchable: (item) => item.name, render: (item) => <strong>{item.name}</strong> },
    { key: "category", header: "Category", searchable: (item) => item.category, render: (item) => item.category },
    { key: "cost", header: "Cost", render: (item) => money(item.cost) },
    { key: "duration", header: "Duration", render: (item) => item.duration },
    { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
    { key: "actions", header: "Actions", render: () => <RowActions /> },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Care catalog"
        title="Treatments"
        description="Treatment list, categories, cost, duration, and active availability."
        action={<EntityFormDialog title="Add Treatment" description="Add treatment category and price." triggerLabel="Add Treatment" />}
      />
      <DataTable data={treatments} columns={columns} filters={<Button variant="outline"><Filter className="h-4 w-4" /> Category</Button>} />
    </>
  );
}

export function BillingPage() {
  const columns = [
    { key: "id", header: "Invoice", searchable: (item: (typeof invoices)[number]) => item.id, render: (item: (typeof invoices)[number]) => <strong>{item.id}</strong> },
    { key: "patient", header: "Patient", searchable: (item: (typeof invoices)[number]) => item.patient, render: (item: (typeof invoices)[number]) => item.patient },
    { key: "amount", header: "Amount", render: (item: (typeof invoices)[number]) => money(item.amount) },
    { key: "paid", header: "Paid", render: (item: (typeof invoices)[number]) => money(item.paid) },
    { key: "status", header: "Payment Status", render: (item: (typeof invoices)[number]) => <StatusBadge status={item.status} /> },
    { key: "actions", header: "Actions", render: () => <RowActions labels={["Invoice", "Payment"]} /> },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Revenue management"
        title="Billing"
        description="Invoices, payments, billing history, and payment status tracking."
        action={<Button><BadgeIndianRupee className="h-4 w-4" /> New Invoice</Button>}
      />
      <DataTable data={invoices} columns={columns} filters={<Button variant="outline"><Filter className="h-4 w-4" /> Payment Status</Button>} />
    </>
  );
}

export function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clinic analytics"
        title="Reports"
        description="Appointment reports, revenue reports, patient reports, and clinical efficiency insights."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reportCards.map((item, index) => (
          <StatCard key={item.title} title={item.title} value={item.value} change={item.change} icon={item.icon} tone={index % 2 ? "teal" : "blue"} />
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <ReportChart title="Revenue Reports" />
        <PatientReportChart />
      </div>
    </>
  );
}

export function InventoryPage() {
  const columns = [
    { key: "item", header: "Item", searchable: (item: (typeof inventory)[number]) => item.item, render: (item: (typeof inventory)[number]) => <strong>{item.item}</strong> },
    { key: "category", header: "Category", searchable: (item: (typeof inventory)[number]) => item.category, render: (item: (typeof inventory)[number]) => item.category },
    { key: "stock", header: "Stock", render: (item: (typeof inventory)[number]) => item.stock },
    { key: "threshold", header: "Threshold", render: (item: (typeof inventory)[number]) => item.threshold },
    { key: "status", header: "Alert", render: (item: (typeof inventory)[number]) => <StatusBadge status={item.status} /> },
    { key: "actions", header: "Actions", render: () => <RowActions labels={["Edit", "Reorder"]} /> },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Stock management"
        title="Inventory"
        description="Equipment, medicines, stock management, and low stock alerts."
        action={<EntityFormDialog title="Add Stock Item" description="Add equipment, medicine, or consumable." triggerLabel="Add Item" />}
      />
      <DataTable data={inventory} columns={columns} filters={<Button variant="outline"><Filter className="h-4 w-4" /> Low Stock</Button>} />
    </>
  );
}

export function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="Settings"
        description="Clinic profile, working hours, admin profile, security settings, and operational preferences."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {["Clinic Profile", "Working Hours", "Admin Profile", "Security Settings"].map((section) => (
          <Card key={section}>
            <CardHeader>
              <CardTitle>{section}</CardTitle>
              <CardDescription>Dummy settings controls for the admin panel UI.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Input placeholder={`${section} name`} defaultValue={section === "Clinic Profile" ? "Healthy Grins Dental Clinic" : ""} />
              <Input placeholder="Primary value" />
              <Textarea placeholder="Notes and configuration" />
              <Button>Save {section}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function RowActions({ labels = ["Edit", "Delete"] }: { labels?: string[] }) {
  return (
    <div className="flex gap-2">
      {labels.map((label, index) => (
        <Button key={label} variant={index === 0 ? "outline" : "ghost"} size="sm">
          {label}
        </Button>
      ))}
    </div>
  );
}

function InfoList({ items }: { items: string[] }) {
  return (
    <Card>
      <CardContent className="grid gap-3 p-5">
        {items.map((item) => (
          <div className="flex gap-3 rounded-lg border bg-muted/35 p-3" key={item}>
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-teal-500" />
            <span className="text-sm font-semibold">{item}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function CalendarBoard() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {days.map((day, index) => (
        <Card key={day}>
          <CardHeader>
            <CardTitle>{day}</CardTitle>
            <CardDescription>{index + 4} appointments scheduled</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {appointments.slice(0, 3).map((appointment) => (
              <div className="rounded-lg border bg-muted/35 p-3" key={`${day}-${appointment.id}`}>
                <p className="font-bold">{appointment.time} • {appointment.patient}</p>
                <p className="text-sm text-muted-foreground">{appointment.treatment}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ReportChart({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Revenue and payment trend.</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => money(Number(value))} />
            <Line dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} />
            <Line dataKey="payments" stroke="#14b8a6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function PatientReportChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Reports</CardTitle>
        <CardDescription>Growth and retention overview.</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={patientGrowthData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area dataKey="patients" fill="#0ea5e9" fillOpacity={0.18} stroke="#0ea5e9" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function AppointmentReportChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={appointments}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="patient" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#14b8a6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
