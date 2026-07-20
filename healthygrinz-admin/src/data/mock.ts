import {
  Activity,
  BadgeIndianRupee,
  Bot,
  CalendarClock,
  ClipboardList,
  HeartPulse,
  ShieldAlert,
  Smile,
  Sparkles,
  Stethoscope,
  UserRoundCheck,
  WandSparkles,
} from "lucide-react";

export type Patient = {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  lastVisit: string;
  condition: string;
  status: "Active" | "Follow-up" | "New";
  medicalHistory: string[];
  treatments: string[];
  reports: string[];
};

export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  availability: string;
  status: "Available" | "In Surgery" | "Off Duty";
  rating: number;
};

export type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  treatment: string;
  time: string;
  date: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Waiting";
  amount: number;
};

export type Treatment = {
  id: string;
  name: string;
  category: string;
  cost: number;
  duration: string;
  status: "Active" | "Paused";
};

export const patients: Patient[] = [
  {
    id: "P-1001",
    name: "Aarav Mehta",
    age: 32,
    phone: "+91 98110 23455",
    email: "aarav.mehta@email.com",
    lastVisit: "15 Jul 2026",
    condition: "Root canal review",
    status: "Follow-up",
    medicalHistory: ["Mild sensitivity", "No known allergies", "Previous cavity filling"],
    treatments: ["Root Canal Treatment", "Ceramic Crown"],
    reports: ["X-Ray molar 26.pdf", "Treatment plan.pdf"],
  },
  {
    id: "P-1002",
    name: "Nisha Kapoor",
    age: 27,
    phone: "+91 98712 88901",
    email: "nisha.kapoor@email.com",
    lastVisit: "14 Jul 2026",
    condition: "Teeth whitening",
    status: "Active",
    medicalHistory: ["Coffee staining", "Mild gum bleeding"],
    treatments: ["Scaling", "Whitening"],
    reports: ["Smile shade report.jpg"],
  },
  {
    id: "P-1003",
    name: "Rohan Batra",
    age: 41,
    phone: "+91 99717 22102",
    email: "rohan.batra@email.com",
    lastVisit: "13 Jul 2026",
    condition: "Bridge consultation",
    status: "New",
    medicalHistory: ["Missing lower molar", "Bruxism suspected"],
    treatments: ["Bridge Planning"],
    reports: ["OPG scan.pdf"],
  },
  {
    id: "P-1004",
    name: "Meera Saini",
    age: 9,
    phone: "+91 98189 77821",
    email: "parent.meera@email.com",
    lastVisit: "12 Jul 2026",
    condition: "Child cavity care",
    status: "Active",
    medicalHistory: ["Milk tooth cavity", "Thumb sucking habit"],
    treatments: ["Pediatric Filling", "Fluoride Advice"],
    reports: ["Child checkup notes.pdf"],
  },
  {
    id: "P-1005",
    name: "Kabir Anand",
    age: 36,
    phone: "+91 99582 40019",
    email: "kabir.anand@email.com",
    lastVisit: "11 Jul 2026",
    condition: "Cleaning and polishing",
    status: "Active",
    medicalHistory: ["Tartar buildup", "No medication"],
    treatments: ["Dental Cleaning"],
    reports: ["Before-after polish.jpg"],
  },
];

export const doctors: Doctor[] = [
  {
    id: "D-201",
    name: "Dr. Lisha Sharma",
    specialization: "General & Aesthetic Dentistry",
    phone: "+91 98211 27942",
    availability: "Mon-Sat, 10 AM - 8 PM",
    status: "Available",
    rating: 4.9,
  },
  {
    id: "D-202",
    name: "Dr. Kavya Rao",
    specialization: "Pediatric Dentistry",
    phone: "+91 99990 11023",
    availability: "Tue, Thu, Sat",
    status: "Available",
    rating: 4.8,
  },
  {
    id: "D-203",
    name: "Dr. Arjun Sethi",
    specialization: "Endodontics",
    phone: "+91 98109 54011",
    availability: "Mon, Wed, Fri",
    status: "In Surgery",
    rating: 4.7,
  },
];

export const appointments: Appointment[] = [
  {
    id: "A-9001",
    patient: "Aarav Mehta",
    doctor: "Dr. Lisha Sharma",
    treatment: "Root canal review",
    time: "10:30 AM",
    date: "15 Jul 2026",
    status: "Scheduled",
    amount: 4500,
  },
  {
    id: "A-9002",
    patient: "Nisha Kapoor",
    doctor: "Dr. Lisha Sharma",
    treatment: "Whitening consultation",
    time: "12:00 PM",
    date: "15 Jul 2026",
    status: "Waiting",
    amount: 6500,
  },
  {
    id: "A-9003",
    patient: "Meera Saini",
    doctor: "Dr. Kavya Rao",
    treatment: "Pediatric filling",
    time: "5:30 PM",
    date: "15 Jul 2026",
    status: "Scheduled",
    amount: 2200,
  },
  {
    id: "A-9004",
    patient: "Kabir Anand",
    doctor: "Dr. Lisha Sharma",
    treatment: "Dental cleaning",
    time: "7:00 PM",
    date: "14 Jul 2026",
    status: "Completed",
    amount: 1800,
  },
  {
    id: "A-9005",
    patient: "Rohan Batra",
    doctor: "Dr. Arjun Sethi",
    treatment: "Bridge consultation",
    time: "11:45 AM",
    date: "16 Jul 2026",
    status: "Scheduled",
    amount: 1200,
  },
];

export const treatments: Treatment[] = [
  { id: "T-01", name: "Dental Cleaning", category: "Preventive", cost: 1800, duration: "35 min", status: "Active" },
  { id: "T-02", name: "Root Canal Treatment", category: "Endodontics", cost: 6500, duration: "75 min", status: "Active" },
  { id: "T-03", name: "Ceramic Crown", category: "Restorative", cost: 8500, duration: "45 min", status: "Active" },
  { id: "T-04", name: "Teeth Whitening", category: "Cosmetic", cost: 7000, duration: "60 min", status: "Active" },
  { id: "T-05", name: "Pediatric Filling", category: "Children", cost: 2200, duration: "40 min", status: "Active" },
  { id: "T-06", name: "Complete Denture", category: "Prosthodontics", cost: 18000, duration: "90 min", status: "Paused" },
];

export const invoices = [
  { id: "INV-701", patient: "Aarav Mehta", amount: 11000, paid: 6500, status: "Pending", date: "15 Jul 2026" },
  { id: "INV-702", patient: "Nisha Kapoor", amount: 7000, paid: 7000, status: "Paid", date: "14 Jul 2026" },
  { id: "INV-703", patient: "Kabir Anand", amount: 1800, paid: 1800, status: "Paid", date: "14 Jul 2026" },
  { id: "INV-704", patient: "Rohan Batra", amount: 1200, paid: 0, status: "Overdue", date: "13 Jul 2026" },
];

export const inventory = [
  { id: "S-01", item: "Nitrile Gloves", category: "Consumable", stock: 420, threshold: 120, status: "Healthy" },
  { id: "S-02", item: "Composite Resin A2", category: "Material", stock: 18, threshold: 20, status: "Low Stock" },
  { id: "S-03", item: "Local Anesthetic", category: "Medicine", stock: 36, threshold: 24, status: "Healthy" },
  { id: "S-04", item: "Sterilization Pouches", category: "Consumable", stock: 65, threshold: 90, status: "Low Stock" },
  { id: "S-05", item: "Scaler Tips", category: "Equipment", stock: 12, threshold: 8, status: "Healthy" },
];

export const activities = [
  "Aarav Mehta checked in for root canal review",
  "Invoice INV-702 marked as paid",
  "Composite Resin A2 crossed low stock threshold",
  "Dr. Kavya Rao updated Saturday availability",
  "AI Smile Analysis generated a score for Nisha Kapoor",
];

export const appointmentStats = [
  { name: "Mon", completed: 18, cancelled: 2, scheduled: 24 },
  { name: "Tue", completed: 22, cancelled: 1, scheduled: 28 },
  { name: "Wed", completed: 16, cancelled: 3, scheduled: 21 },
  { name: "Thu", completed: 25, cancelled: 2, scheduled: 31 },
  { name: "Fri", completed: 29, cancelled: 1, scheduled: 34 },
  { name: "Sat", completed: 20, cancelled: 2, scheduled: 26 },
];

export const revenueData = [
  { month: "Jan", revenue: 182000, payments: 152000 },
  { month: "Feb", revenue: 214000, payments: 189000 },
  { month: "Mar", revenue: 238000, payments: 210000 },
  { month: "Apr", revenue: 221000, payments: 205000 },
  { month: "May", revenue: 268000, payments: 244000 },
  { month: "Jun", revenue: 294000, payments: 271000 },
  { month: "Jul", revenue: 312000, payments: 286000 },
];

export const patientGrowthData = [
  { month: "Jan", patients: 86 },
  { month: "Feb", patients: 101 },
  { month: "Mar", patients: 124 },
  { month: "Apr", patients: 142 },
  { month: "May", patients: 165 },
  { month: "Jun", patients: 181 },
  { month: "Jul", patients: 206 },
];

export const aiModules = [
  {
    title: "AI Dental Assistant",
    icon: Bot,
    result: "Suggested chairside answer for sensitivity after whitening.",
    detail: "Conversation history: 18 patient education threads this week.",
  },
  {
    title: "AI Symptom Checker",
    icon: Stethoscope,
    result: "Likely conditions: pulpitis, cracked tooth, gum recession.",
    detail: "Input: cold sensitivity, night pain, chewing discomfort.",
  },
  {
    title: "AI Treatment Recommendation",
    icon: WandSparkles,
    result: "Recommended treatment: diagnostic X-ray and RCT consultation.",
    detail: "Priority level: High, due to severe spontaneous pain.",
  },
  {
    title: "AI Appointment Scheduler",
    icon: CalendarClock,
    result: "Best slots: 10:30 AM with Dr. Lisha, 5:30 PM with Dr. Arjun.",
    detail: "Doctor availability matched against treatment duration.",
  },
  {
    title: "AI Cost Estimator",
    icon: BadgeIndianRupee,
    result: "Estimated cost: Rs. 6,500 - Rs. 15,000 depending on crown need.",
    detail: "Includes consultation, RCT, optional ceramic crown.",
  },
  {
    title: "AI Smile Analysis",
    icon: Smile,
    result: "Smile score: 82/100.",
    detail: "Analysis: mild staining, good alignment, improve shade symmetry.",
  },
  {
    title: "Oral Health Score",
    icon: HeartPulse,
    result: "Health score: 76/100.",
    detail: "Suggestions: flossing routine, scaling, sensitivity toothpaste.",
  },
  {
    title: "AI FAQ Search",
    icon: ClipboardList,
    result: "Answer found: whitening is safe under dental supervision.",
    detail: "Matched 7 knowledge snippets from clinic FAQ set.",
  },
  {
    title: "AI Voice Assistant",
    icon: Sparkles,
    result: "Voice command ready: schedule cleaning for tomorrow evening.",
    detail: "Voice response prepared for reception workflow.",
  },
  {
    title: "Emergency AI Guidance",
    icon: ShieldAlert,
    result: "Immediate action: cold compress, avoid heat, urgent dental review.",
    detail: "Emergency category: facial swelling with severe pain.",
  },
];

export const reportCards = [
  { title: "Appointment Reports", value: "742", change: "+14.5%", icon: CalendarClock },
  { title: "Revenue Reports", value: "Rs. 3.12L", change: "+8.2%", icon: BadgeIndianRupee },
  { title: "Patient Reports", value: "206", change: "+12.1%", icon: UserRoundCheck },
  { title: "Clinical Efficiency", value: "91%", change: "+4.8%", icon: Activity },
];
