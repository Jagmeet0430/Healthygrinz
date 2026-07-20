import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Healthy Grins Dental Clinic | Krishna Nagar, East Delhi",
    template: "%s | Healthy Grins Dental Clinic",
  },
  description:
    "Healthy Grins Dental Clinic in Krishna Nagar, East Delhi offers dental cleaning, root canal treatment, crowns, bridges, fillings, dentures, whitening, and children's dentistry.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
