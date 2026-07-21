import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import WhyChoose from "@/components/about/WhyChoose";
import Technology from "@/components/about/Technology";
import Timeline from "@/components/about/Timeline";
// import Statistics from "@/components/about/Statistics";
// import Testimonials from "@/components/about/Testimonials";
// import FAQ from "@/components/about/FAQ";
import BookCTA from "@/components/about/BookCTA";
// import ClinicGallery from "@/components/about/ClinicGallery";
// import { DoctorSection } from "@/components/home/DoctorSection";
import DoctorProfile from "@/components/home/DoctorSection";
import { getSiteContent } from "@/lib/content";
// import "../../../styles/about.css";
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <>
      <DoctorProfile />
      <AboutHero />
      <OurStory />
      <MissionVision />
      
      
      <WhyChoose />
      <Technology />
       {/* <ClinicGallery /> */}
      <Timeline />
      {/* <Statistics /> */}
      {/* <Testimonials /> */}
      {/* <FAQ /> */}
      <BookCTA />
    </>
  );
}