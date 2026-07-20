export type Treatment = {
  slug: string;
  title: string;
  description: string;
  goodFor: string;
  details: string;
};

export const treatments: Treatment[] = [
  {
    slug: "dental-cleaning-polishing",
    title: "Dental Cleaning & Polishing",
    description: "Removes plaque, tartar, and surface stains to support gum health and fresher breath.",
    goodFor: "Routine checkups, stains, bleeding gums",
    details:
      "The doctor checks your gums and teeth, removes buildup with dental instruments, and polishes the tooth surfaces. Regular cleaning can reduce gum irritation and make daily brushing more effective.",
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    description: "Cleans and seals an infected tooth so the natural tooth can often be saved.",
    goodFor: "Deep decay, severe pain, infected pulp",
    details:
      "After examination and X-ray guidance when needed, the infected inner portion of the tooth is cleaned, shaped, disinfected, and sealed. A crown may be recommended afterward for long-term strength.",
  },
  {
    slug: "dental-fillings",
    title: "Dental Fillings",
    description: "Repairs a decayed or damaged area with a suitable restorative material.",
    goodFor: "Small cavities, chipped areas, early decay",
    details:
      "The affected area is cleaned and restored with tooth-colored or suitable filling material. Early fillings can help prevent decay from becoming deeper and more painful.",
  },
  {
    slug: "crowns-bridges",
    title: "Crowns & Bridges",
    description: "Protects weak teeth and replaces missing teeth to restore bite strength and smile balance.",
    goodFor: "Post-root-canal teeth, damaged teeth, missing teeth",
    details:
      "A crown covers and protects a weak tooth. A bridge uses neighboring support to replace a missing tooth. The doctor explains material choices, appointments, and care instructions.",
  },
  {
    slug: "tooth-extraction",
    title: "Tooth Extraction",
    description: "Removes teeth that cannot be restored or may affect surrounding oral health.",
    goodFor: "Badly damaged teeth, non-restorable teeth",
    details:
      "Extraction is recommended only after assessing whether the tooth can be saved. The visit includes local anesthesia, careful removal, and after-care guidance for healing.",
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    description: "Brightens teeth by reducing stains and discoloration under dental supervision.",
    goodFor: "Dull smile, stains, special occasions",
    details:
      "The doctor first checks for cavities, gum concerns, and sensitivity risk. Whitening options and expectations are explained so the result looks natural and comfortable.",
  },
  {
    slug: "childrens-dentistry",
    title: "Children's Dentistry",
    description: "Supports child hygiene, cavity care, brushing habits, fluoride guidance, and milk-tooth concerns.",
    goodFor: "Kids, first visits, cavities, habit guidance",
    details:
      "Children are guided gently through checkups and preventive care. Parents receive practical advice on brushing, diet, habits, and when a tooth needs treatment.",
  },
  {
    slug: "dentures",
    title: "Dentures",
    description: "Replaces missing teeth with removable or fixed options for better chewing, speech, and appearance.",
    goodFor: "Partial or complete tooth loss",
    details:
      "The clinic reviews your gums, remaining teeth, bite, and comfort needs before suggesting partial or complete denture options and follow-up adjustments.",
  },
];
