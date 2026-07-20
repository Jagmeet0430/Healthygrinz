import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Healthy Grins Dental Clinic website enquiries and appointments.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section page-section">
      <p className="section-kicker">Privacy policy</p>
      <h1>How enquiry information is used.</h1>
      <div className="policy-copy">
        <p>
          Healthy Grins Dental Clinic uses information submitted through appointment and contact forms to respond to enquiries, coordinate visits, and understand patient concerns.
        </p>
        <p>
          Form details may include name, phone number, email address, selected concern, preferred timing, and message text. Please avoid sharing sensitive medical history unless requested during consultation.
        </p>
        <p>
          The clinic does not sell enquiry information. Third-party services such as WhatsApp, email, hosting, analytics, or database providers may process data according to their own policies.
        </p>
        <p>
          To request correction or deletion of submitted enquiry information, contact the clinic at healthygrinsbylisha@gmail.com.
        </p>
      </div>
    </section>
  );
}
