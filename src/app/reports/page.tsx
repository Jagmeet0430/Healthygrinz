"use client";

import { FileText, Download, Calendar } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Dental Cleaning Report",
      date: "28 July 2026",
      doctor: "Dr. HealthyGrinz",
      file: "#",
    },
    {
      id: 2,
      title: "Root Canal Treatment",
      date: "15 July 2026",
      doctor: "Dr. HealthyGrinz",
      file: "#",
    },
    {
      id: 3,
      title: "Teeth Whitening Report",
      date: "05 July 2026",
      doctor: "Dr. HealthyGrinz",
      file: "#",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#5E4D96]">
            Dental Reports
          </h1>

          <p className="mt-2 text-gray-500">
            View and download all your dental reports.
          </p>
        </div>

        <div className="space-y-6">

          {reports.map((report) => (

            <div
              key={report.id}
              className="rounded-2xl bg-white p-6 shadow-lg transition hover:shadow-xl"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-purple-100 p-3">
                      <FileText className="text-[#5E4D96]" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        {report.title}
                      </h2>

                      <p className="text-gray-500">
                        {report.doctor}
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 flex items-center gap-2 text-gray-600">

                    <Calendar size={18} />

                    {report.date}

                  </div>

                </div>

                <button
                  className="mt-6 rounded-xl bg-gradient-to-r from-[#5E4D96] to-[#7B61FF] px-6 py-3 font-semibold text-white transition hover:opacity-90 md:mt-0"
                >
                  <Download className="mr-2 inline" size={18} />

                  Download PDF
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}