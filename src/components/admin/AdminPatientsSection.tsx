"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiClipboard,
  FiCreditCard,
  FiDownload,
  FiEdit3,
  FiEye,
  FiFileText,
  FiFilter,
  FiGrid,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiPlusCircle,
  FiPrinter,
  FiSearch,
  FiShield,
  FiTrash2,
  FiUploadCloud,
  FiUsers,
  FiXCircle,
  FiZap,
} from "react-icons/fi";
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

type PatientStatus = "Active" | "Inactive" | "VIP" | "Recall" | "Treatment";
type PaymentStatus = "Paid" | "Pending" | "Partial" | "Insurance";
type AppointmentStatus = "Scheduled" | "Completed" | "Missed" | "None";
type PatientView = "table" | "cards";

type PatientRecord = {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: "Female" | "Male" | "Other";
  phone: string;
  whatsapp: string;
  email: string;
  aadhaar: string;
  bloodGroup: string;
  doctor: string;
  treatment: string;
  nextAppointment: string;
  lastVisit: string;
  balance: number;
  status: PatientStatus;
  paymentStatus: PaymentStatus;
  appointmentStatus: AppointmentStatus;
  city: string;
  address: string;
  insurance: string;
  allergies: string;
  medications: string;
  medicalHistory: string;
  emergencyContact: string;
  notes: string;
  visits: number;
  lifetimeRevenue: number;
  noShowRisk: "Low" | "Medium" | "High";
  registeredAt: string;
};

type PatientFormState = {
  firstName: string;
  lastName: string;
  gender: PatientRecord["gender"];
  dob: string;
  age: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  bloodGroup: string;
  occupation: string;
  emergencyContact: string;
  insurance: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  smoking: boolean;
  alcohol: boolean;
  pregnancy: boolean;
  consent: boolean;
  notes: string;
};

type FilterState = {
  gender: string;
  age: string;
  bloodGroup: string;
  doctor: string;
  treatment: string;
  payment: string;
  appointment: string;
  status: string;
  insurance: string;
  sort: string;
};

const initialPatients: PatientRecord[] = [
  {
    id: "PAT-2201",
    mrn: "MRN-HG-1048",
    name: "Manohar Lal",
    age: 42,
    gender: "Male",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "manohar.lal@example.com",
    aadhaar: "XXXX-XXXX-4210",
    bloodGroup: "B+",
    doctor: "Dr. Lisha",
    treatment: "Root Canal",
    nextAppointment: "Today, 04:30 PM",
    lastVisit: "14 Jul 2026",
    balance: 4500,
    status: "Treatment",
    paymentStatus: "Partial",
    appointmentStatus: "Scheduled",
    city: "Delhi",
    address: "Krishna Nagar, Delhi",
    insurance: "No insurance",
    allergies: "Penicillin sensitivity",
    medications: "Pain management after RCT",
    medicalHistory: "Controlled blood pressure. Dental anxiety noted.",
    emergencyContact: "+91 99887 77665",
    notes: "Prefers evening follow-ups and clear written care instructions.",
    visits: 6,
    lifetimeRevenue: 38500,
    noShowRisk: "Low",
    registeredAt: "2026-02-12",
  },
  {
    id: "PAT-2202",
    mrn: "MRN-HG-1052",
    name: "Isha Kapoor",
    age: 29,
    gender: "Female",
    phone: "+91 99881 22445",
    whatsapp: "+91 99881 22445",
    email: "isha.kapoor@example.com",
    aadhaar: "XXXX-XXXX-2445",
    bloodGroup: "O+",
    doctor: "Dr. Lisha",
    treatment: "Whitening Plan",
    nextAppointment: "Tomorrow, 12:15 PM",
    lastVisit: "16 Jul 2026",
    balance: 0,
    status: "VIP",
    paymentStatus: "Paid",
    appointmentStatus: "Scheduled",
    city: "Delhi",
    address: "Preet Vihar, Delhi",
    insurance: "Corporate dental cover",
    allergies: "None reported",
    medications: "None",
    medicalHistory: "Mild sensitivity after whitening trial.",
    emergencyContact: "+91 98711 45210",
    notes: "Interested in cosmetic smile planning and retainers.",
    visits: 4,
    lifetimeRevenue: 26000,
    noShowRisk: "Low",
    registeredAt: "2026-03-04",
  },
  {
    id: "PAT-2203",
    mrn: "MRN-HG-1059",
    name: "Rahul Sharma",
    age: 35,
    gender: "Male",
    phone: "+91 91234 56789",
    whatsapp: "+91 91234 56789",
    email: "rahul.sharma@example.com",
    aadhaar: "XXXX-XXXX-6789",
    bloodGroup: "A+",
    doctor: "Dr. HealthyGrinz",
    treatment: "Dental Cleaning",
    nextAppointment: "No appointment",
    lastVisit: "08 Jul 2026",
    balance: 1800,
    status: "Recall",
    paymentStatus: "Pending",
    appointmentStatus: "None",
    city: "Delhi",
    address: "Laxmi Nagar, Delhi",
    insurance: "No insurance",
    allergies: "None reported",
    medications: "None",
    medicalHistory: "Gum bleeding complaint. Scaling recommended every six months.",
    emergencyContact: "+91 98100 55012",
    notes: "Needs recall reminder next month.",
    visits: 3,
    lifetimeRevenue: 9400,
    noShowRisk: "Medium",
    registeredAt: "2026-01-19",
  },
  {
    id: "PAT-2204",
    mrn: "MRN-HG-1067",
    name: "Neha Sharma",
    age: 31,
    gender: "Female",
    phone: "+91 90011 22334",
    whatsapp: "+91 90011 22334",
    email: "neha.sharma@example.com",
    aadhaar: "XXXX-XXXX-2334",
    bloodGroup: "AB+",
    doctor: "Dr. Lisha",
    treatment: "Crown Consultation",
    nextAppointment: "26 Jul 2026, 05:00 PM",
    lastVisit: "18 Jul 2026",
    balance: 12000,
    status: "Active",
    paymentStatus: "Insurance",
    appointmentStatus: "Scheduled",
    city: "Delhi",
    address: "Mayur Vihar, Delhi",
    insurance: "Care Plus Dental",
    allergies: "Latex",
    medications: "Vitamin D",
    medicalHistory: "Previous crown on upper molar.",
    emergencyContact: "+91 97777 33221",
    notes: "Insurance pre-authorization pending.",
    visits: 7,
    lifetimeRevenue: 61500,
    noShowRisk: "Low",
    registeredAt: "2025-11-23",
  },
  {
    id: "PAT-2205",
    mrn: "MRN-HG-1074",
    name: "Aarav Mehta",
    age: 12,
    gender: "Male",
    phone: "+91 95555 66443",
    whatsapp: "+91 95555 66443",
    email: "parent.aarav@example.com",
    aadhaar: "Optional",
    bloodGroup: "O-",
    doctor: "Dr. HealthyGrinz",
    treatment: "Pediatric Cleaning",
    nextAppointment: "30 Jul 2026, 11:00 AM",
    lastVisit: "10 Jul 2026",
    balance: 0,
    status: "Active",
    paymentStatus: "Paid",
    appointmentStatus: "Scheduled",
    city: "Delhi",
    address: "Geeta Colony, Delhi",
    insurance: "Family plan",
    allergies: "None reported",
    medications: "None",
    medicalHistory: "Child dental visit. Parent prefers gentle explanations.",
    emergencyContact: "+91 95555 66443",
    notes: "Send brushing care sheet after visit.",
    visits: 2,
    lifetimeRevenue: 5600,
    noShowRisk: "Low",
    registeredAt: "2026-05-02",
  },
];

const emptyForm: PatientFormState = {
  firstName: "",
  lastName: "",
  gender: "Female",
  dob: "",
  age: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  city: "",
  state: "Delhi",
  country: "India",
  pinCode: "",
  bloodGroup: "",
  occupation: "",
  emergencyContact: "",
  insurance: "",
  medicalHistory: "",
  allergies: "",
  medications: "",
  smoking: false,
  alcohol: false,
  pregnancy: false,
  consent: false,
  notes: "",
};

const emptyFilters: FilterState = {
  gender: "All",
  age: "All",
  bloodGroup: "All",
  doctor: "All",
  treatment: "All",
  payment: "All",
  appointment: "All",
  status: "All",
  insurance: "All",
  sort: "Newest",
};

const patientGrowth = [
  { month: "Jan", patients: 92, returning: 64 },
  { month: "Feb", patients: 118, returning: 78 },
  { month: "Mar", patients: 132, returning: 88 },
  { month: "Apr", patients: 149, returning: 101 },
  { month: "May", patients: 172, returning: 116 },
  { month: "Jun", patients: 194, returning: 129 },
];

const revenueTrend = [
  { month: "Jan", revenue: 21000 },
  { month: "Feb", revenue: 24500 },
  { month: "Mar", revenue: 29600 },
  { month: "Apr", revenue: 33400 },
  { month: "May", revenue: 37200 },
  { month: "Jun", revenue: 41800 },
];

const timelineSteps = [
  "Patient Registered",
  "First Appointment",
  "Diagnosis",
  "Treatment Started",
  "Treatment Completed",
  "Invoice Generated",
  "Payment Received",
  "Review Submitted",
];

const documentTypes = ["Prescription", "Invoice", "Consent Form", "X-Ray", "Medical Report", "Insurance"];
const filters = ["All", "VIP", "Treatment", "Recall", "Active", "Inactive"];
const pageSize = 4;

export function AdminPatientsSection({ globalSearch = "", openCreateSignal = 0 }: { globalSearch?: string; openCreateSignal?: number }) {
  const [patients, setPatients] = useState(initialPatients);
  const [query, setQuery] = useState(globalSearch);
  const [view, setView] = useState<PatientView>("table");
  const [filtersState, setFiltersState] = useState<FilterState>(emptyFilters);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activePatientId, setActivePatientId] = useState(initialPatients[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<PatientFormState>(emptyForm);
  const [toast, setToast] = useState("Patient Management is ready.");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setQuery(globalSearch);
  }, [globalSearch]);

  useEffect(() => {
    if (openCreateSignal > 0) setFormOpen(true);
  }, [openCreateSignal]);

  const activePatient = patients.find((patient) => patient.id === activePatientId) || patients[0];

  const filteredPatients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = patients.filter((patient) => {
      const searchable = [
        patient.name,
        patient.phone,
        patient.email,
        patient.id,
        patient.mrn,
        patient.aadhaar,
        patient.treatment,
        patient.doctor,
        patient.nextAppointment,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalized || searchable.includes(normalized);
      const matchesGender = filtersState.gender === "All" || patient.gender === filtersState.gender;
      const matchesBlood = filtersState.bloodGroup === "All" || patient.bloodGroup === filtersState.bloodGroup;
      const matchesDoctor = filtersState.doctor === "All" || patient.doctor === filtersState.doctor;
      const matchesTreatment = filtersState.treatment === "All" || patient.treatment === filtersState.treatment;
      const matchesPayment = filtersState.payment === "All" || patient.paymentStatus === filtersState.payment;
      const matchesAppointment = filtersState.appointment === "All" || patient.appointmentStatus === filtersState.appointment;
      const matchesStatus = filtersState.status === "All" || patient.status === filtersState.status;
      const matchesInsurance =
        filtersState.insurance === "All" ||
        (filtersState.insurance === "Insurance" ? patient.insurance !== "No insurance" : patient.insurance === "No insurance");
      const matchesAge =
        filtersState.age === "All" ||
        (filtersState.age === "Child" && patient.age < 18) ||
        (filtersState.age === "Adult" && patient.age >= 18 && patient.age < 60) ||
        (filtersState.age === "Senior" && patient.age >= 60);

      return matchesQuery && matchesGender && matchesBlood && matchesDoctor && matchesTreatment && matchesPayment && matchesAppointment && matchesStatus && matchesInsurance && matchesAge;
    });

    return [...result].sort((first, second) => {
      if (filtersState.sort === "Oldest") return first.registeredAt.localeCompare(second.registeredAt);
      if (filtersState.sort === "Balance") return second.balance - first.balance;
      if (filtersState.sort === "Revenue") return second.lifetimeRevenue - first.lifetimeRevenue;
      return second.registeredAt.localeCompare(first.registeredAt);
    });
  }, [filtersState, patients, query]);

  const pageCount = Math.max(1, Math.ceil(filteredPatients.length / pageSize));
  const pagedPatients = filteredPatients.slice((page - 1) * pageSize, page * pageSize);

  const stats = useMemo(() => {
    const active = patients.filter((patient) => patient.status !== "Inactive").length;
    return [
      { label: "Total Patients", value: patients.length, delta: "+12%", icon: FiUsers, data: [10, 18, 22, 27, 33, 41] },
      { label: "Today's New Patients", value: 3, delta: "+4%", icon: FiPlusCircle, data: [3, 4, 3, 6, 5, 7] },
      { label: "Returning Patients", value: patients.filter((patient) => patient.visits > 2).length, delta: "+9%", icon: FiActivity, data: [7, 8, 12, 11, 13, 16] },
      { label: "Active Patients", value: active, delta: "+6%", icon: FiCheckCircle, data: [11, 12, 14, 18, 21, 24] },
      { label: "Inactive Patients", value: patients.length - active, delta: "-2%", icon: FiXCircle, data: [5, 4, 4, 3, 2, 1] },
      { label: "Pending Appointments", value: patients.filter((patient) => patient.appointmentStatus === "Scheduled").length, delta: "+8%", icon: FiCalendar, data: [4, 7, 5, 9, 8, 10] },
      { label: "Completed Treatments", value: 18, delta: "+11%", icon: FiClipboard, data: [6, 9, 10, 12, 15, 18] },
      { label: "Outstanding Balance", value: `Rs ${patients.reduce((sum, patient) => sum + patient.balance, 0).toLocaleString("en-IN")}`, delta: "-5%", icon: FiCreditCard, data: [22, 19, 18, 15, 13, 11] },
    ];
  }, [patients]);

  function updateFilter(key: keyof FilterState, value: string) {
    setFiltersState((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  function openPatient(patient: PatientRecord) {
    setActivePatientId(patient.id);
    setDrawerOpen(true);
  }

  function toggleSelected(id: string) {
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function submitPatient() {
    if (!form.firstName.trim() || !form.phone.trim()) {
      setToast("First name and phone are required.");
      return;
    }

    const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    const patient: PatientRecord = {
      id: `PAT-${Date.now().toString().slice(-4)}`,
      mrn: `MRN-HG-${Date.now().toString().slice(-4)}`,
      name,
      age: Number(form.age) || 0,
      gender: form.gender,
      phone: form.phone,
      whatsapp: form.whatsapp || form.phone,
      email: form.email || `${name.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@healthygrinz.local`,
      aadhaar: "Optional",
      bloodGroup: form.bloodGroup || "Not added",
      doctor: "Dr. Lisha",
      treatment: "New Consultation",
      nextAppointment: "Needs scheduling",
      lastVisit: "New patient",
      balance: 0,
      status: "Active",
      paymentStatus: "Pending",
      appointmentStatus: "None",
      city: form.city || "Delhi",
      address: [form.address, form.city, form.state, form.pinCode].filter(Boolean).join(", "),
      insurance: form.insurance || "No insurance",
      allergies: form.allergies || "None reported",
      medications: form.medications || "None",
      medicalHistory: form.medicalHistory || "No medical conditions recorded.",
      emergencyContact: form.emergencyContact || "Not added",
      notes: form.notes || "New patient registered from admin.",
      visits: 0,
      lifetimeRevenue: 0,
      noShowRisk: "Low",
      registeredAt: new Date().toISOString().slice(0, 10),
    };

    setPatients((current) => [patient, ...current]);
    setActivePatientId(patient.id);
    setDrawerOpen(true);
    setForm(emptyForm);
    setFormOpen(false);
    setToast(`${patient.name} added successfully.`);
  }

  function deletePatient(id: string) {
    setPatients((current) => current.filter((patient) => patient.id !== id));
    setSelectedIds((current) => current.filter((item) => item !== id));
    setActivePatientId((current) => (current === id ? patients[0]?.id || "" : current));
    setToast("Patient moved to soft-delete queue.");
  }

  function runAction(label: string, patient?: PatientRecord) {
    setToast(`${label}${patient ? ` for ${patient.name}` : ""} is ready.`);
  }

  return (
    <section className="adm-patient-shell">
      <div className="adm-patient-stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article className="adm-patient-stat" key={stat.label}>
              <div>
                <span><Icon aria-hidden="true" /></span>
                <mark>{stat.delta}</mark>
              </div>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
              <PatientSparkline points={stat.data} />
            </article>
          );
        })}
      </div>

      <section className="adm-card adm-patient-command">
        <div className="adm-patient-search-row">
          <label className="adm-patient-search">
            <FiSearch aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search name, phone, email, patient ID, MRN, appointment, treatment, doctor..."
            />
            <kbd>Ctrl K</kbd>
          </label>
          <div className="adm-patient-view-toggle" aria-label="Patient view">
            <button className={view === "table" ? "is-active" : ""} type="button" onClick={() => setView("table")}>
              <FiClipboard aria-hidden="true" /> Table
            </button>
            <button className={view === "cards" ? "is-active" : ""} type="button" onClick={() => setView("cards")}>
              <FiGrid aria-hidden="true" /> Cards
            </button>
          </div>
        </div>
        <div className="adm-patient-suggestions">
          {["Recent: Manohar", "VIP patients", "Pending balance", "Root Canal", "Dr. Lisha"].map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => setQuery(suggestion.replace("Recent: ", ""))}>
              {suggestion}
            </button>
          ))}
        </div>
        <div className="adm-patient-filter-grid">
          <PatientSelect label="Gender" value={filtersState.gender} options={["All", "Female", "Male", "Other"]} onChange={(value) => updateFilter("gender", value)} />
          <PatientSelect label="Age" value={filtersState.age} options={["All", "Child", "Adult", "Senior"]} onChange={(value) => updateFilter("age", value)} />
          <PatientSelect label="Blood Group" value={filtersState.bloodGroup} options={["All", "A+", "B+", "O+", "O-", "AB+"]} onChange={(value) => updateFilter("bloodGroup", value)} />
          <PatientSelect label="Doctor" value={filtersState.doctor} options={["All", "Dr. Lisha", "Dr. HealthyGrinz"]} onChange={(value) => updateFilter("doctor", value)} />
          <PatientSelect label="Treatment" value={filtersState.treatment} options={["All", "Root Canal", "Whitening Plan", "Dental Cleaning", "Crown Consultation", "Pediatric Cleaning"]} onChange={(value) => updateFilter("treatment", value)} />
          <PatientSelect label="Payment" value={filtersState.payment} options={["All", "Paid", "Pending", "Partial", "Insurance"]} onChange={(value) => updateFilter("payment", value)} />
          <PatientSelect label="Appointment" value={filtersState.appointment} options={["All", "Scheduled", "Completed", "Missed", "None"]} onChange={(value) => updateFilter("appointment", value)} />
          <PatientSelect label="Insurance" value={filtersState.insurance} options={["All", "Insurance", "No insurance"]} onChange={(value) => updateFilter("insurance", value)} />
        </div>
        <div className="adm-patient-toolbar">
          <div>
            {filters.map((item) => (
              <button className={filtersState.status === item ? "is-active" : ""} key={item} type="button" onClick={() => updateFilter("status", item)}>
                {item}
              </button>
            ))}
          </div>
          <div>
            <PatientSelect label="Sort" value={filtersState.sort} options={["Newest", "Oldest", "Balance", "Revenue"]} onChange={(value) => updateFilter("sort", value)} compact />
            <button type="button" onClick={() => setFiltersState(emptyFilters)}><FiFilter aria-hidden="true" /> Reset</button>
            <button type="button" onClick={() => runAction("CSV export")}><FiDownload aria-hidden="true" /> CSV</button>
            <button type="button" onClick={() => runAction("Print")}><FiPrinter aria-hidden="true" /> Print</button>
          </div>
        </div>
      </section>

      <div className="adm-patient-layout">
        <main className="adm-patient-main">
          <section className="adm-card">
            <div className="adm-card-head">
              <div>
                <p className="adm-eyebrow">Patient registry</p>
                <h2>{filteredPatients.length} matching patients</h2>
              </div>
              <span className="adm-pill">{selectedIds.length} selected</span>
            </div>

            {filteredPatients.length ? (
              view === "table" ? (
                <div className="adm-patient-table-wrap">
                  <table className="adm-patient-table">
                    <thead>
                      <tr>
                        <th><input aria-label="Select all patients" checked={selectedIds.length === pagedPatients.length && pagedPatients.length > 0} onChange={() => setSelectedIds(selectedIds.length === pagedPatients.length ? [] : pagedPatients.map((patient) => patient.id))} type="checkbox" /></th>
                        <th>Patient</th>
                        <th>Contact</th>
                        <th>Doctor</th>
                        <th>Appointment</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedPatients.map((patient) => (
                        <tr key={patient.id}>
                          <td><input aria-label={`Select ${patient.name}`} checked={selectedIds.includes(patient.id)} onChange={() => toggleSelected(patient.id)} type="checkbox" /></td>
                          <td>
                            <button className="adm-patient-person" type="button" onClick={() => openPatient(patient)}>
                              <span>{getInitials(patient.name)}</span>
                              <div><strong>{patient.name}</strong><small>{patient.id} · {patient.age} yrs · {patient.gender}</small></div>
                            </button>
                          </td>
                          <td><strong>{patient.phone}</strong><small>{patient.email}</small></td>
                          <td><strong>{patient.doctor}</strong><small>{patient.treatment}</small></td>
                          <td><strong>{patient.nextAppointment}</strong><small>Last: {patient.lastVisit}</small></td>
                          <td><strong>Rs {patient.balance.toLocaleString("en-IN")}</strong><small>{patient.paymentStatus}</small></td>
                          <td><PatientBadge label={patient.status} /></td>
                          <td><PatientActions patient={patient} onOpen={openPatient} onAction={runAction} onDelete={deletePatient} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="adm-patient-card-grid">
                  {pagedPatients.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} onOpen={openPatient} onAction={runAction} onDelete={deletePatient} />
                  ))}
                </div>
              )
            ) : (
              <div className="adm-patient-empty">
                <FiUsers aria-hidden="true" />
                <strong>No patients found</strong>
                <span>Try resetting filters or add a new patient from the floating action button.</span>
              </div>
            )}

            <div className="adm-patient-pagination">
              <span>Page {page} of {pageCount}</span>
              <div>
                <button disabled={page === 1} type="button" onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button>
                <button disabled={page === pageCount} type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next</button>
              </div>
            </div>
          </section>

          <section className="adm-patient-analytics-grid">
            <article className="adm-card">
              <div className="adm-card-head">
                <div>
                  <p className="adm-eyebrow">Patient analytics</p>
                  <h2>Growth and retention</h2>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={patientGrowth}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--adm-line)" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area dataKey="patients" type="monotone" stroke="#6D5DF6" fill="#6D5DF633" strokeWidth={3} />
                  <Line dataKey="returning" type="monotone" stroke="#22C55E" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </article>
            <article className="adm-card">
              <div className="adm-card-head">
                <div>
                  <p className="adm-eyebrow">Revenue intelligence</p>
                  <h2>Lifetime value trend</h2>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--adm-line)" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#6D5DF6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </article>
          </section>
        </main>

        <aside className="adm-patient-side">
          <section className="adm-card adm-patient-ai-card">
            <div className="adm-card-head">
              <div>
                <p className="adm-eyebrow">HealthyGrinz AI</p>
                <h2>Patient summary</h2>
              </div>
              <FiZap aria-hidden="true" />
            </div>
            <strong>{activePatient.name}</strong>
            <p>{activePatient.treatment} patient with {activePatient.noShowRisk.toLowerCase()} no-show risk, {activePatient.visits} visits, and Rs {activePatient.balance.toLocaleString("en-IN")} outstanding balance.</p>
            <div className="adm-patient-risk-grid">
              {["Medical risk alerts", "Treatment recommendation", "Follow-up prediction", "Smart appointment"].map((item) => (
                <span key={item}><FiShield aria-hidden="true" /> {item}</span>
              ))}
            </div>
          </section>
          <section className="adm-card adm-patient-docs">
            <div className="adm-card-head">
              <div>
                <p className="adm-eyebrow">Documents</p>
                <h2>Secure file vault</h2>
              </div>
              <button type="button" onClick={() => runAction("Document upload")}><FiUploadCloud aria-hidden="true" /> Upload</button>
            </div>
            {documentTypes.map((item, index) => (
              <article key={item}>
                <FiFileText aria-hidden="true" />
                <div><strong>{item}</strong><span>v{index + 1}.0 · Preview, download, version history</span></div>
                <button type="button" onClick={() => runAction(`${item} preview`)}>Open</button>
              </article>
            ))}
          </section>
          <section className="adm-card adm-patient-activity">
            <div className="adm-card-head">
              <div>
                <p className="adm-eyebrow">Activity feed</p>
                <h2>Latest events</h2>
              </div>
            </div>
            {["Patient profile updated", "Appointment reminder sent", "Invoice generated", "Prescription approved"].map((item, index) => (
              <span key={item}><i /> <strong>{item}</strong><small>{index + 1}h ago</small></span>
            ))}
          </section>
        </aside>
      </div>

      <button className="adm-patient-fab" type="button" onClick={() => setFormOpen(true)} aria-label="Add patient">
        <FiPlusCircle aria-hidden="true" />
      </button>

      <PatientDrawer open={drawerOpen} patient={activePatient} onClose={() => setDrawerOpen(false)} onAction={runAction} />
      <PatientFormDrawer form={form} open={formOpen} toast={toast} onClose={() => setFormOpen(false)} onFormChange={setForm} onSubmit={submitPatient} />
    </section>
  );
}

function PatientSelect({ label, value, options, compact = false, onChange }: { label: string; value: string; options: string[]; compact?: boolean; onChange: (value: string) => void }) {
  return (
    <label className={compact ? "adm-patient-select is-compact" : "adm-patient-select"}>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function PatientSparkline({ points }: { points: number[] }) {
  const data = points.map((value, index) => ({ name: index, value }));
  return (
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={data}>
        <Line dataKey="value" type="monotone" stroke="#6D5DF6" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function PatientBadge({ label }: { label: string }) {
  return <mark className={`adm-patient-badge ${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{label}</mark>;
}

function PatientActions({ patient, onOpen, onAction, onDelete }: { patient: PatientRecord; onOpen: (patient: PatientRecord) => void; onAction: (label: string, patient?: PatientRecord) => void; onDelete: (id: string) => void }) {
  const actions = [
    ["View", FiEye, () => onOpen(patient)],
    ["Edit", FiEdit3, () => onAction("Edit profile", patient)],
    ["Appointments", FiCalendar, () => onAction("Appointment history", patient)],
    ["Invoice", FiCreditCard, () => onAction("Invoice", patient)],
    ["Prescription", FiClipboard, () => onAction("Prescription", patient)],
    ["WhatsApp", FiMessageCircle, () => onAction("WhatsApp", patient)],
    ["Call", FiPhone, () => onAction("Call", patient)],
    ["Email", FiMail, () => onAction("Email", patient)],
    ["Delete", FiTrash2, () => onDelete(patient.id)],
  ] as const;

  return (
    <div className="adm-patient-actions">
      {actions.map(([label, Icon, onClick]) => (
        <button aria-label={`${label} ${patient.name}`} key={label} title={label} type="button" onClick={onClick}>
          <Icon aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

function PatientCard({ patient, onOpen, onAction, onDelete }: { patient: PatientRecord; onOpen: (patient: PatientRecord) => void; onAction: (label: string, patient?: PatientRecord) => void; onDelete: (id: string) => void }) {
  return (
    <article className="adm-patient-card">
      <div className="adm-patient-card-head">
        <span>{getInitials(patient.name)}</span>
        <div>
          <strong>{patient.name}</strong>
          <small>{patient.id} · {patient.age} yrs · {patient.gender}</small>
        </div>
        <PatientBadge label={patient.status} />
      </div>
      <div className="adm-patient-card-gridline">
        <span>Phone <strong>{patient.phone}</strong></span>
        <span>Treatment <strong>{patient.treatment}</strong></span>
        <span>Doctor <strong>{patient.doctor}</strong></span>
        <span>Next <strong>{patient.nextAppointment}</strong></span>
        <span>Outstanding <strong>Rs {patient.balance.toLocaleString("en-IN")}</strong></span>
      </div>
      <PatientActions patient={patient} onOpen={onOpen} onAction={onAction} onDelete={onDelete} />
    </article>
  );
}

function PatientDrawer({ open, patient, onClose, onAction }: { open: boolean; patient: PatientRecord; onClose: () => void; onAction: (label: string, patient?: PatientRecord) => void }) {
  return (
    <div className={`adm-patient-drawer-shell ${open ? "is-open" : ""}`}>
      <button className="adm-patient-drawer-backdrop" type="button" aria-label="Close patient profile" onClick={onClose} />
      <aside className="adm-patient-drawer" aria-label="Patient profile drawer">
        <div className="adm-patient-drawer-title">
          <span>{getInitials(patient.name)}</span>
          <div>
            <p className="adm-eyebrow">Patient profile</p>
            <h2>{patient.name}</h2>
            <small>{patient.id} · {patient.mrn} · {patient.age} yrs · {patient.gender}</small>
          </div>
          <button type="button" onClick={onClose} aria-label="Close drawer"><FiXCircle aria-hidden="true" /></button>
        </div>

        <div className="adm-patient-drawer-actions">
          {["Call", "SMS", "WhatsApp", "Email", "Reminder"].map((item) => (
            <button key={item} type="button" onClick={() => onAction(item, patient)}>{item}</button>
          ))}
        </div>

        <div className="adm-patient-profile-grid">
          <PatientInfo title="Patient Information" rows={[["Phone", patient.phone], ["Email", patient.email], ["Address", patient.address], ["Blood Group", patient.bloodGroup], ["Emergency", patient.emergencyContact], ["Insurance", patient.insurance]]} />
          <PatientInfo title="Medical History" rows={[["Medical", patient.medicalHistory], ["Dental", patient.treatment], ["Medication", patient.medications], ["Allergies", patient.allergies], ["Notes", patient.notes]]} />
          <section className="adm-patient-timeline">
            <p className="adm-eyebrow">Medical timeline</p>
            {timelineSteps.map((step, index) => (
              <div className={index < 5 ? "is-done" : ""} key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
                <small>{index < 5 ? "Completed" : "Upcoming workflow"}</small>
              </div>
            ))}
          </section>
          <PatientInfo title="Appointment History" rows={[["Last Visit", patient.lastVisit], ["Upcoming", patient.nextAppointment], ["Doctor", patient.doctor], ["Treatment", patient.treatment], ["Prescription", "Available"], ["Invoice", patient.paymentStatus]]} />
        </div>
      </aside>
    </div>
  );
}

function PatientInfo({ title, rows }: { title: string; rows: Array<[string, string]> }) {
  return (
    <section className="adm-patient-info-card">
      <p className="adm-eyebrow">{title}</p>
      {rows.map(([label, value]) => (
        <div key={label}><span>{label}</span><strong>{value}</strong></div>
      ))}
    </section>
  );
}

function PatientFormDrawer({ form, open, toast, onClose, onFormChange, onSubmit }: { form: PatientFormState; open: boolean; toast: string; onClose: () => void; onFormChange: (form: PatientFormState) => void; onSubmit: () => void }) {
  function update(next: Partial<PatientFormState>) {
    onFormChange({ ...form, ...next });
  }

  return (
    <div className={`adm-patient-form-shell ${open ? "is-open" : ""}`}>
      <button className="adm-patient-drawer-backdrop" type="button" aria-label="Close patient form" onClick={onClose} />
      <aside className="adm-patient-form" aria-label="Patient registration form">
        <div className="adm-card-head">
          <div>
            <p className="adm-eyebrow">Patient registration</p>
            <h2>Add patient</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close form"><FiXCircle aria-hidden="true" /></button>
        </div>
        <p className="adm-inline-status">{toast} Autosave ready.</p>
        <div className="adm-patient-form-grid">
          <PatientInput label="First Name" value={form.firstName} onChange={(firstName) => update({ firstName })} />
          <PatientInput label="Last Name" value={form.lastName} onChange={(lastName) => update({ lastName })} />
          <PatientSelect label="Gender" value={form.gender} options={["Female", "Male", "Other"]} onChange={(gender) => update({ gender: gender as PatientRecord["gender"] })} />
          <PatientInput label="DOB" type="date" value={form.dob} onChange={(dob) => update({ dob })} />
          <PatientInput label="Age" value={form.age} onChange={(age) => update({ age })} />
          <PatientInput label="Phone" value={form.phone} onChange={(phone) => update({ phone })} />
          <PatientInput label="WhatsApp" value={form.whatsapp} onChange={(whatsapp) => update({ whatsapp })} />
          <PatientInput label="Email" value={form.email} onChange={(email) => update({ email })} />
          <PatientInput label="Address" value={form.address} onChange={(address) => update({ address })} wide />
          <PatientInput label="City" value={form.city} onChange={(city) => update({ city })} />
          <PatientInput label="State" value={form.state} onChange={(state) => update({ state })} />
          <PatientInput label="Country" value={form.country} onChange={(country) => update({ country })} />
          <PatientInput label="PIN Code" value={form.pinCode} onChange={(pinCode) => update({ pinCode })} />
          <PatientInput label="Blood Group" value={form.bloodGroup} onChange={(bloodGroup) => update({ bloodGroup })} />
          <PatientInput label="Occupation" value={form.occupation} onChange={(occupation) => update({ occupation })} />
          <PatientInput label="Emergency Contact" value={form.emergencyContact} onChange={(emergencyContact) => update({ emergencyContact })} />
          <PatientInput label="Insurance Details" value={form.insurance} onChange={(insurance) => update({ insurance })} />
          <PatientTextarea label="Medical Conditions" value={form.medicalHistory} onChange={(medicalHistory) => update({ medicalHistory })} />
          <PatientTextarea label="Allergies" value={form.allergies} onChange={(allergies) => update({ allergies })} />
          <PatientTextarea label="Current Medication" value={form.medications} onChange={(medications) => update({ medications })} />
          <PatientTextarea label="Profile Notes" value={form.notes} onChange={(notes) => update({ notes })} />
        </div>
        <div className="adm-patient-consent-grid">
          {[
            ["Smoking", "smoking"],
            ["Alcohol", "alcohol"],
            ["Pregnancy", "pregnancy"],
            ["Consent Form", "consent"],
          ].map(([label, key]) => (
            <label key={key}><input checked={Boolean(form[key as keyof PatientFormState])} onChange={(event) => update({ [key]: event.target.checked } as Partial<PatientFormState>)} type="checkbox" /> {label}</label>
          ))}
        </div>
        <button className="adm-primary-button" type="button" onClick={onSubmit}><FiPlusCircle aria-hidden="true" /> Save patient</button>
      </aside>
    </div>
  );
}

function PatientInput({ label, value, type = "text", wide = false, onChange }: { label: string; value: string; type?: string; wide?: boolean; onChange: (value: string) => void }) {
  return (
    <label className={wide ? "adm-patient-field is-wide" : "adm-patient-field"}>
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function PatientTextarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="adm-patient-field is-wide">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} />
    </label>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
