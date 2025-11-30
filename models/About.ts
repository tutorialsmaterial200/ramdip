import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  sectionTitle: string;
  subtitle: string;
  description: string;
  mainTitle: string;
  content1: string;
  content2: string;
  image: string;
  yearsOfStruggle: number;
  highlights: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  timeline: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  isActive: boolean;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    sectionTitle: { type: String, default: "हाम्रो बारेमा" },
    subtitle: { type: String, default: "A Party Born from the People" },
    description: {
      type: String,
      default: "नेपाली कम्युनिष्ट पार्टी(माओवादी केन्द्र)has been at the forefront of Nepal's transformation, fighting for social justice, equality, and the rights of all citizens.",
    },
    mainTitle: { type: String, default: "जनताको पार्टी, जनताको सेवामा" },
    content1: {
      type: String,
      default: "The नेपाली कम्युनिष्ट पार्टी(माओवादी केन्द्र)emerged from the struggle for social justice and equality. Our journey has been defined by an unwavering commitment to the people of Nepal, especially the marginalized and oppressed.",
    },
    content2: {
      type: String,
      default: "From leading the historic transformation that ended centuries of monarchy to establishing Nepal as a federal democratic republic, we have been at the forefront of progressive change. Our vision continues to guide us toward building a prosperous, just, and equitable Nepal.",
    },
    image: { type: String, default: "/images/profiles.jpg" },
    yearsOfStruggle: { type: Number, default: 30 },
    highlights: [
      {
        icon: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
    timeline: [
      {
        year: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);
