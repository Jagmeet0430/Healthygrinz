"use client";

import { Calendar, Clock, MapPin } from "lucide-react";

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      treatment: "Dental Cleaning",
      doctor: "Dr. HealthyGrinz",
      date: "28 July 2026",
      time: "11:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      treatment: "Root Canal Treatment",
      doctor: "Dr. HealthyGrinz",
      date: "12 July 2026",
      time: "02:30 PM",
      status: "Completed",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold text-[#5E4D96] mb-8">
          My Appointments
        </h1>

        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="flex flex-col gap-6 md:flex-row md:justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {appointment.treatment}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {appointment.doctor}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-6 text-gray-600">

                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      {appointment.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      {appointment.time}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      Krishna Nagar, Delhi
                    </div>

                  </div>

                </div>

                <div className="flex flex-col items-end gap-4">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      appointment.status === "Upcoming"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {appointment.status}
                  </span>

                  {appointment.status === "Upcoming" && (
                    <button className="rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600">
                      Cancel Appointment
                    </button>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}