"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type DoctorChatMessage = {
  id: string;
  sender: "patient" | "doctor" | "system";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "seen";
  type?: "text" | "image" | "pdf" | "voice" | "prescription" | "invoice" | "report";
  attachment?: {
    name: string;
    size: string;
    url?: string;
  };
  replyTo?: string;
  reaction?: string;
};

type PatientThread = {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  emergency: string;
  insurance: string;
  address: string;
  online: boolean;
  pinned: boolean;
  favorite: boolean;
  archived: boolean;
  unread: number;
  time: string;
  lastMessage: string;
  priority: "High" | "Medium" | "Normal";
};

const patients: PatientThread[] = [
  {
    id: "P-1001",
    name: "Manohar Lal",
    initials: "ML",
    age: 42,
    gender: "Male",
    bloodGroup: "B+",
    phone: "+91 98765 43210",
    email: "manohar@example.com",
    emergency: "+91 99887 77665",
    insurance: "Self pay",
    address: "Krishna Nagar, East Delhi",
    online: true,
    pinned: true,
    favorite: true,
    archived: false,
    unread: 3,
    time: "10:42 AM",
    lastMessage: "I uploaded my X-ray and pain details.",
    priority: "Medium",
  },
  {
    id: "P-1002",
    name: "Neha Sharma",
    initials: "NS",
    age: 31,
    gender: "Female",
    bloodGroup: "O+",
    phone: "+91 91234 56789",
    email: "neha@example.com",
    emergency: "+91 90000 11122",
    insurance: "Corporate dental",
    address: "Preet Vihar, Delhi",
    online: false,
    pinned: false,
    favorite: true,
    archived: false,
    unread: 0,
    time: "Yesterday",
    lastMessage: "Can I reschedule the whitening appointment?",
    priority: "Normal",
  },
  {
    id: "P-1003",
    name: "Aarav Mehta",
    initials: "AM",
    age: 12,
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 90000 22233",
    email: "parent@example.com",
    emergency: "+91 90000 33344",
    insurance: "Family plan",
    address: "Laxmi Nagar, Delhi",
    online: true,
    pinned: false,
    favorite: false,
    archived: false,
    unread: 1,
    time: "Mon",
    lastMessage: "Parent shared brushing concern.",
    priority: "High",
  },
];

const baseMessages: DoctorChatMessage[] = [
  { id: "M-1", sender: "system", text: "Patient joined secure consultation.", time: "Today", type: "text" },
  { id: "M-2", sender: "patient", text: "My lower tooth hurts when I drink cold water.", time: "10:31 AM", status: "seen", type: "text" },
  { id: "M-3", sender: "doctor", text: "Thanks for sharing. Please tell me your pain level from 1 to 10 and whether there is swelling.", time: "10:33 AM", status: "seen", type: "text" },
  { id: "M-4", sender: "patient", text: "Pain is around 6. I am uploading the X-ray from last month.", time: "10:35 AM", status: "delivered", type: "image", attachment: { name: "xray-lower-molar.jpg", size: "1.8 MB" } },
  { id: "M-5", sender: "doctor", text: "I can review it. Avoid chewing hard food on that side until we examine it.", time: "10:38 AM", status: "seen", type: "text", reaction: "👍" },
];

function createChatId(prefix: string) {
  const randomPart =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  return `${prefix}-${randomPart}`;
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileType(file: File): DoctorChatMessage["type"] {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf") return "pdf";
  if (file.type.startsWith("audio/")) return "voice";
  return "report";
}

export function DoctorChatWorkspace() {
  const [activeId, setActiveId] = useState(patients[0].id);
  const [filter, setFilter] = useState("Today");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(baseMessages);
  const [typing, setTyping] = useState(false);
  const [replyTo, setReplyTo] = useState<DoctorChatMessage | null>(null);
  const [pendingFiles, setPendingFiles] = useState<DoctorChatMessage[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const activePatient = patients.find((patient) => patient.id === activeId) || patients[0];

  useEffect(() => {
    const escalation = window.localStorage.getItem("healthygrinz_ai_escalation");
    if (!escalation) return;
    setMessages((current) => [
      ...current,
      {
        id: createChatId("ai"),
        sender: "system",
        text: `AI escalation received. Symptoms: ${escalation}`,
        time: "Now",
        type: "text",
      },
    ]);
    window.localStorage.removeItem("healthygrinz_ai_escalation");
  }, []);

  const filteredPatients = useMemo(() => {
    const normalized = query.toLowerCase();
    return patients.filter((patient) => {
      const matchesQuery = [patient.name, patient.phone, patient.lastMessage, patient.priority].join(" ").toLowerCase().includes(normalized);
      if (!matchesQuery) return false;
      if (filter === "Pinned") return patient.pinned;
      if (filter === "Favorites") return patient.favorite;
      if (filter === "Archived") return patient.archived;
      return true;
    });
  }, [filter, query]);

  function addFiles(files: FileList | null) {
    if (!files?.length) return;
    const nextFiles = Array.from(files).map((file) => ({
      id: createChatId("upload"),
      sender: "patient" as const,
      text: `${file.name} ready to send.`,
      time: "Now",
      status: "sent" as const,
      type: getFileType(file),
      attachment: {
        name: file.name,
        size: formatFileSize(file.size),
        url: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      },
    }));
    setPendingFiles((current) => [...current, ...nextFiles]);
  }

  function sendMessage() {
    const clean = message.trim();
    if (!clean && pendingFiles.length === 0) return;

    const nextMessages: DoctorChatMessage[] = [
      ...(clean
        ? [
            {
              id: createChatId("msg"),
              sender: "patient" as const,
              text: clean,
              time: "Now",
              status: "delivered" as const,
              type: "text" as const,
              replyTo: replyTo?.text,
            },
          ]
        : []),
      ...pendingFiles.map((file) => ({ ...file, replyTo: replyTo?.text })),
    ];

    setMessages((current) => [...current, ...nextMessages]);
    setMessage("");
    setPendingFiles([]);
    setReplyTo(null);
    setTyping(true);

    window.setTimeout(() => {
      setTyping(false);
      setMessages((current) => [
        ...current,
        {
          id: createChatId("msg"),
          sender: "doctor",
          text: "I received this. I recommend a clinical examination and may ask for a fresh X-ray if the pain is increasing.",
          time: "Now",
          status: "seen",
          type: "text",
        },
      ]);
    }, 1400);
  }

  function handleInputKey(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="doctor-chat-page">
      <header className="doctor-chat-topbar">
        <Link className="doctor-chat-logo" href="/">
          <span>HG</span>
          <div>
            <strong>HealthyGrinz</strong>
            <small>Digital Consultation Workspace</small>
          </div>
        </Link>
        <nav aria-label="Doctor chat actions">
          <button type="button">Notifications</button>
          <button type="button">AI Summary</button>
          <Link href="/booking">Book Appointment</Link>
        </nav>
      </header>

      <section className="doctor-chat-os">
        <aside className="doctor-chat-list">
          <div className="doctor-chat-brand">
            <strong>Patient Inbox</strong>
            <span>Recent chats, unread cases, pinned patients</span>
          </div>
          <label className="doctor-chat-search">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patients, phone, concern..." />
          </label>
          <div className="doctor-chat-filters">
            {["Today", "Yesterday", "This Week", "Older", "Pinned", "Favorites", "Archived"].map((item) => (
              <button className={filter === item ? "is-active" : ""} key={item} type="button" onClick={() => setFilter(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="doctor-chat-thread-list">
            {filteredPatients.map((patient) => (
              <button className={patient.id === activeId ? "is-active" : ""} key={patient.id} type="button" onClick={() => setActiveId(patient.id)}>
                <span className={patient.online ? "is-online" : ""}>{patient.initials}</span>
                <div>
                  <strong>{patient.name}</strong>
                  <small>{patient.lastMessage}</small>
                </div>
                <time>{patient.time}</time>
                {patient.unread ? <b>{patient.unread}</b> : null}
              </button>
            ))}
          </div>
        </aside>

        <main className="doctor-consultation">
          <div className="doctor-consultation-header">
            <div className="doctor-chat-profile">
              <span>DL</span>
              <div>
                <strong>Dr. Lisha</strong>
                <small>Cosmetic Dentist · {typing ? "typing..." : "online now"} · last seen just now</small>
              </div>
            </div>
            <div className="doctor-chat-tools">
              {["Call", "Video", "Appointment", "Prescription", "Invoice", "Share Report", "Print", "AI Summary"].map((item) => (
                <button key={item} type="button" onClick={() => item === "AI Summary" && setDetailsOpen(true)}>
                  {item}
                </button>
              ))}
              <button className="doctor-mobile-details" type="button" onClick={() => setDetailsOpen((value) => !value)}>
                Patient
              </button>
            </div>
          </div>

          <div className="doctor-pinned">
            <strong>Pinned</strong>
            AI flagged medium urgency: possible cavity, confidence 92%, suggested dental filling, estimated cost Rs. 2,500.
          </div>

          <div className="doctor-messages doctor-consultation-body">
            <span className="doctor-date-separator">Today</span>
            <span className="doctor-unread-marker">3 unread messages</span>
            {messages.map((item) => (
              <article className={`doctor-message ${item.sender}`} key={item.id}>
                {item.replyTo ? <small>Replying to: {item.replyTo}</small> : null}
                <p>{item.text}</p>
                {item.attachment ? (
                  <div className="doctor-attachments">
                    <figure>
                      {item.attachment.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.attachment.url} alt="" />
                      ) : (
                        <span>{item.type?.toUpperCase()}</span>
                      )}
                      <figcaption>{item.attachment.name}<small>{item.attachment.size}</small></figcaption>
                    </figure>
                  </div>
                ) : null}
                <div className="doctor-message-meta">
                  <span>{item.time}</span>
                  {item.status ? <span>{item.status}</span> : null}
                  {item.reaction ? <span>{item.reaction}</span> : null}
                  {item.sender !== "system" ? (
                    <>
                      <button type="button" onClick={() => setReplyTo(item)}>Reply</button>
                      <button type="button">Forward</button>
                      <button type="button">Edit</button>
                      <button type="button">Delete</button>
                      <button type="button">😊</button>
                    </>
                  ) : null}
                </div>
              </article>
            ))}
            {typing ? <div className="doctor-typing"><span /><span /><span /> Doctor typing</div> : null}
          </div>

          {replyTo ? (
            <div className="doctor-reply-preview">
              Replying to {replyTo.sender}: {replyTo.text}
              <button type="button" onClick={() => setReplyTo(null)}>x</button>
            </div>
          ) : null}

          {pendingFiles.length ? (
            <div className="doctor-upload-preview">
              {pendingFiles.map((file) => (
                <span key={file.id}>
                  {file.attachment?.name}
                  <i>Uploading 100%</i>
                  <button type="button" onClick={() => setPendingFiles((current) => current.filter((item) => item.id !== file.id))}>x</button>
                </span>
              ))}
            </div>
          ) : null}

          <form
            className="doctor-input-row doctor-clean-input"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Attach files">+</button>
            <button type="button" onClick={() => setMessage((current) => `${current} 😊`)} aria-label="Add emoji">😊</button>
            <input ref={fileInputRef} hidden multiple type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,audio/*,video/*" onChange={(event) => addFiles(event.target.files)} />
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={handleInputKey} placeholder="Type your message..." aria-label="Type your message" rows={1} />
            <button type="button" aria-label="Record voice note">Voice</button>
            <button type="submit">Send</button>
          </form>
        </main>

        <aside className={`doctor-details-panel ${detailsOpen ? "is-open" : ""}`}>
          <div className="doctor-patient-hero">
            <span>{activePatient.initials}</span>
            <div>
              <strong>{activePatient.name}</strong>
              <small>{activePatient.age} yrs · {activePatient.gender} · {activePatient.bloodGroup}</small>
            </div>
          </div>
          <PatientInfoCard title="Profile" rows={[
            ["Phone", activePatient.phone],
            ["Email", activePatient.email],
            ["Emergency", activePatient.emergency],
            ["Insurance", activePatient.insurance],
            ["Address", activePatient.address],
          ]} />
          <PatientInfoCard title="Medical History" rows={[
            ["Allergies", "No known allergy"],
            ["Diabetes", "No"],
            ["Blood Pressure", "Borderline"],
            ["Smoking", "No"],
            ["Previous Treatments", "Scaling, filling"],
            ["Current Medication", "Pain medicine if prescribed"],
          ]} />
          <section className="doctor-ai-summary-card">
            <p>AI Analysis</p>
            <strong>Possible cavity near lower molar</strong>
            <div>
              <span>Confidence<em>92%</em></span>
              <span>Risk<em>Medium</em></span>
              <span>Treatment<em>Dental Filling</em></span>
              <span>Cost<em>Rs. 2,500</em></span>
              <span>Duration<em>35-45 min</em></span>
              <span>Doctor<em>Dr. Lisha</em></span>
              <span>Tests<em>Fresh X-ray</em></span>
              <span>Urgency<em>48 hrs</em></span>
            </div>
            <div className="doctor-ai-actions">
              {["Connect with Doctor", "Book Appointment", "Upload Report", "Generate Treatment Plan"].map((item) => <button key={item} type="button">{item}</button>)}
            </div>
          </section>
          <section className="doctor-treatment-timeline">
            <p>Treatment Timeline</p>
            {["Consultation", "Diagnosis", "X-ray", "Treatment", "Medicine", "Follow-up", "Completed"].map((step, index) => (
              <div className={index < 2 ? "is-done" : ""} key={step}><span>{index + 1}</span><strong>{step}</strong></div>
            ))}
          </section>
          <section className="doctor-appointment-card">
            <p>Upcoming Appointment</p>
            <strong>Dr. Lisha · Tomorrow · 10:30 AM</strong>
            <span>HealthyGrinz Dental Clinic · Room 2 · Awaiting confirmation</span>
            <div>{["Confirm", "Reschedule", "Cancel"].map((item) => <button key={item} type="button">{item}</button>)}</div>
          </section>
          <PatientInfoCard title="Previous Visits" rows={[
            ["12 Jul 2026", "Cleaning · Dr. Lisha · INV-2041"],
            ["02 May 2026", "Consultation · Prescription shared"],
          ]} />
          <PatientInfoCard title="Payments" rows={[
            ["Paid", "Rs. 1,500"],
            ["Pending", "Rs. 2,500 estimate"],
            ["Invoices", "Download available"],
          ]} />
        </aside>
      </section>
    </div>
  );
}

function PatientInfoCard({ title, rows }: { title: string; rows: Array<[string, string]> }) {
  return (
    <section className="doctor-info-card">
      <p>{title}</p>
      {rows.map(([label, value]) => (
        <div key={`${title}-${label}`}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </section>
  );
}
