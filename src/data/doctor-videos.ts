export type DoctorVideoStatus = "Draft" | "Scheduled" | "Published" | "Private" | "Archived" | "Rejected" | "Deleted";

export type DoctorVideo = {
  id: string;
  slug: string;
  title: string;
  description: string;
  doctorName: string;
  qualification: string;
  specialization: string;
  doctorBio: string;
  doctorPhoto: string;
  clinicLogo: string;
  clinicInfo: string;
  poster: string;
  videoUrl?: string;
  uploadDate: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  category: string;
  treatment: string;
  language: string;
  hashtags: string[];
  status: DoctorVideoStatus;
  publishAt: string;
  aiSummary: string;
  aiCaptions: string[];
  aiTranscript: string;
  aiFaqs: Array<{ question: string; answer: string }>;
  subtitles: Array<{ language: string; status: string }>;
  keywords: string[];
  suggestedHashtags: string[];
  predictedCategory: string;
  detectedTreatment: string;
  thumbnailSuggestions: string[];
  recommendedVideoSlugs: string[];
  moderationStatus: string;
  spamRisk: string;
  seoTitle: string;
  seoDescription: string;
  brochureUrl: string;
  relatedTreatments: string[];
  relatedBlogs: string[];
  patientReviews: Array<{ name: string; text: string; rating: number }>;
  commentsList: Array<{ name: string; text: string; replies: string[]; status: string }>;
  platforms: Array<"Website" | "Instagram" | "Facebook" | "YouTube Shorts" | "LinkedIn" | "X" | "TikTok" | "Google Business">;
};

export const doctorVideos: DoctorVideo[] = [
  {
    id: "VID-1001",
    slug: "root-canal-pain-explained",
    title: "Root canal pain explained in simple words",
    description: "Dr. Lisha explains why root canal treatment can feel calmer and more predictable than patients expect.",
    doctorName: "Dr. Lisha",
    qualification: "BDS, Dental Surgeon",
    specialization: "Endodontics and family dentistry",
    doctorBio: "Gentle dental surgeon focused on clear treatment planning, patient comfort, and family dentistry.",
    doctorPhoto: "/images/healthy-grins-doctor.png",
    clinicLogo: "/images/healthy-grins-logo.svg.jpeg",
    clinicInfo: "Healthy Grins Dental Clinic, Krishna Nagar",
    poster: "/images/healthy-grins-doctor.png",
    uploadDate: "24 Jul 2026",
    duration: "0:42",
    views: 18420,
    likes: 1260,
    comments: 84,
    shares: 232,
    saves: 318,
    category: "Patient Education",
    treatment: "Root Canal",
    language: "English",
    hashtags: ["#RootCanal", "#PainFreeDentistry", "#HealthyGrinz"],
    status: "Published",
    publishAt: "Today, 08:30 PM",
    aiSummary: "Explains common root canal fears, expected comfort, and when patients should book a dentist review.",
    aiCaptions: ["Root canal does not have to feel scary.", "Modern anesthesia keeps treatment comfortable.", "Book early if pain or swelling continues."],
    aiTranscript: "Root canal treatment is done to save a damaged tooth. With proper anesthesia, most patients feel pressure rather than pain.",
    aiFaqs: [
      { question: "Is root canal painful?", answer: "Modern anesthesia makes the procedure comfortable for most patients." },
      { question: "When should I visit?", answer: "Book a visit if tooth pain, swelling, or cold sensitivity persists." },
    ],
    subtitles: [{ language: "English", status: "Ready" }, { language: "Hindi", status: "Ready" }],
    keywords: ["root canal", "tooth pain", "endodontics", "dental anxiety"],
    suggestedHashtags: ["#RootCanalTreatment", "#ToothPain", "#KrishnaNagarDentist"],
    predictedCategory: "Patient Education",
    detectedTreatment: "Root Canal",
    thumbnailSuggestions: ["Doctor close-up", "Treatment explainer card", "Clinic branded cover"],
    recommendedVideoSlugs: ["teeth-whitening-aftercare", "child-first-dental-visit"],
    moderationStatus: "Approved by AI and doctor",
    spamRisk: "Low",
    seoTitle: "Root Canal Pain Explained by HealthyGrinz Dental Clinic",
    seoDescription: "Learn what root canal treatment feels like and when to visit a dentist in Krishna Nagar.",
    brochureUrl: "/booking",
    relatedTreatments: ["Root Canal", "Dental Crown", "Emergency Dental Care"],
    relatedBlogs: ["How to handle tooth pain", "Root canal myths explained"],
    patientReviews: [{ name: "Manohar Lal", text: "The explanation made the treatment feel less stressful.", rating: 5 }],
    commentsList: [{ name: "Rahul", text: "Can I book if pain is only at night?", replies: ["Yes, night pain should be reviewed clinically."], status: "Approved" }],
    platforms: ["Website", "Instagram", "YouTube Shorts", "Facebook"],
  },
  {
    id: "VID-1002",
    slug: "teeth-whitening-aftercare",
    title: "Teeth whitening aftercare tips",
    description: "A quick guide to reducing sensitivity and keeping whitening results bright after treatment.",
    doctorName: "Dr. Lisha",
    qualification: "BDS, Dental Surgeon",
    specialization: "Cosmetic dentistry",
    doctorBio: "Cosmetic dental care focused on natural-looking smiles, sensitivity management, and long-term maintenance.",
    doctorPhoto: "/images/healthy-grins-doctor.png",
    clinicLogo: "/images/healthy-grins-logo.svg.jpeg",
    clinicInfo: "Healthy Grins Dental Clinic, Krishna Nagar",
    poster: "/images/healthy-grins-hero-hd.png",
    uploadDate: "22 Jul 2026",
    duration: "0:35",
    views: 22180,
    likes: 1880,
    comments: 112,
    shares: 374,
    saves: 506,
    category: "Cosmetic Dentistry",
    treatment: "Teeth Whitening",
    language: "English",
    hashtags: ["#TeethWhitening", "#SmileCare", "#CosmeticDentistry"],
    status: "Scheduled",
    publishAt: "Tomorrow, 07:00 PM",
    aiSummary: "Covers food choices, sensitivity care, and follow-up timing after whitening.",
    aiCaptions: ["Avoid strong colors after whitening.", "Mild sensitivity can be normal.", "Follow dentist-approved care instructions."],
    aiTranscript: "After whitening, avoid strong colors for the first day and follow your dentist's sensitivity guidance.",
    aiFaqs: [
      { question: "Can I drink tea after whitening?", answer: "It is better to avoid strongly colored drinks for the first 24 hours." },
      { question: "Is sensitivity normal?", answer: "Mild temporary sensitivity can happen and usually settles." },
    ],
    subtitles: [{ language: "English", status: "Ready" }, { language: "Hindi", status: "Queued" }],
    keywords: ["teeth whitening", "sensitivity", "cosmetic dentistry", "aftercare"],
    suggestedHashtags: ["#TeethWhiteningTips", "#SmileMakeover", "#HealthyGrinz"],
    predictedCategory: "Cosmetic Dentistry",
    detectedTreatment: "Teeth Whitening",
    thumbnailSuggestions: ["Smile close-up", "Before-after cover", "Doctor tip frame"],
    recommendedVideoSlugs: ["root-canal-pain-explained", "child-first-dental-visit"],
    moderationStatus: "Approved by AI",
    spamRisk: "Low",
    seoTitle: "Teeth Whitening Aftercare Tips",
    seoDescription: "HealthyGrinz explains whitening aftercare, sensitivity, and smile maintenance.",
    brochureUrl: "/booking",
    relatedTreatments: ["Teeth Whitening", "Smile Makeover", "Dental Cleaning"],
    relatedBlogs: ["Whitening aftercare guide", "How to reduce tooth sensitivity"],
    patientReviews: [{ name: "Isha Kapoor", text: "Helpful aftercare advice and very clear explanation.", rating: 5 }],
    commentsList: [{ name: "Neha", text: "Can I drink coffee the next morning?", replies: ["Ask your dentist, but avoiding strong colors early is safer."], status: "Pending" }],
    platforms: ["Website", "Instagram", "LinkedIn"],
  },
  {
    id: "VID-1003",
    slug: "child-first-dental-visit",
    title: "Preparing your child for the first dental visit",
    description: "Simple ways parents can make a child's first dental appointment calm and positive.",
    doctorName: "Dr. HealthyGrinz",
    qualification: "Pediatric Dental Care Team",
    specialization: "Family and pediatric dentistry",
    doctorBio: "Family dental team helping children and parents feel prepared before preventive visits.",
    doctorPhoto: "/images/healthy-grins-logo.svg.jpeg",
    clinicLogo: "/images/healthy-grins-logo.svg.jpeg",
    clinicInfo: "Healthy Grins Dental Clinic, Krishna Nagar",
    poster: "/images/healthy-grins-hero-hd.png",
    uploadDate: "20 Jul 2026",
    duration: "0:48",
    views: 14620,
    likes: 940,
    comments: 67,
    shares: 190,
    saves: 271,
    category: "Family Dental Care",
    treatment: "Pediatric Dentistry",
    language: "Hindi",
    hashtags: ["#ChildDentalCare", "#FamilyDentist", "#HealthySmile"],
    status: "Draft",
    publishAt: "Draft",
    aiSummary: "Guides parents on language, timing, and positive preparation before a child's first visit.",
    aiCaptions: ["Use positive words before the visit.", "A first checkup can be simple and gentle.", "Parents can make dental care feel normal."],
    aiTranscript: "A calm first dental visit starts at home. Tell your child the dentist will count and clean teeth gently.",
    aiFaqs: [
      { question: "When should children visit?", answer: "Children benefit from early dental visits and regular checkups." },
      { question: "How can parents prepare?", answer: "Use positive words and avoid describing dental care as scary." },
    ],
    subtitles: [{ language: "Hindi", status: "Ready" }, { language: "English", status: "Queued" }],
    keywords: ["child dentist", "pediatric dentistry", "first dental visit", "family dental care"],
    suggestedHashtags: ["#ChildDentalCare", "#KidsDentist", "#FamilyDentist"],
    predictedCategory: "Family Dental Care",
    detectedTreatment: "Pediatric Dentistry",
    thumbnailSuggestions: ["Parent-child cover", "Clinic logo cover", "Doctor tip frame"],
    recommendedVideoSlugs: ["root-canal-pain-explained", "teeth-whitening-aftercare"],
    moderationStatus: "Draft review required",
    spamRisk: "Low",
    seoTitle: "Child First Dental Visit Tips",
    seoDescription: "HealthyGrinz shares parent-friendly guidance for a child's first dental visit.",
    brochureUrl: "/booking",
    relatedTreatments: ["Pediatric Dentistry", "Dental Cleaning", "Preventive Care"],
    relatedBlogs: ["How to prepare your child for the dentist", "Brushing tips for children"],
    patientReviews: [{ name: "Family Dental Visit", text: "The child visit felt calm and well explained.", rating: 5 }],
    commentsList: [{ name: "Parent", text: "What age should we start checkups?", replies: ["Early visits help children get comfortable with dental care."], status: "Approved" }],
    platforms: ["Website", "Facebook", "Google Business"],
  },
];

export const videoCategories = [
  "All",
  "Patient Education",
  "Cosmetic Dentistry",
  "Family Dental Care",
  "Root Canal",
  "Teeth Whitening",
  "Pediatric Dentistry",
  "Emergency Dental Care",
  "Implant",
  "Braces",
  "Oral Surgery",
  "Gum Treatment",
  "Invisalign",
];

export const socialPlatforms = ["Website", "Instagram", "Facebook", "YouTube Shorts", "LinkedIn", "X", "TikTok", "Google Business"] as const;
