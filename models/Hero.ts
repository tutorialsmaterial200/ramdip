import mongoose, { Schema, Document } from "mongoose";

export interface IHero extends Document {
  badge: string;
  titleNepali: string;
  titleEnglish: string;
  description: string;
  stats: {
    yearsOfService: number;
    peopleUnited: string;
    projectsDone: number;
  };
  image: string;
  isActive: boolean;
  updatedAt: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    badge: { type: String, default: "Communist Party of Nepal (Maoist Center)" },
    titleNepali: { type: String, default: "जनताको सेवामा" },
    titleEnglish: { type: String, default: "Serving the People" },
    description: {
      type: String,
      default: "Dedicated to social justice, equality, and the transformation of Nepal. Together we build a prosperous nation where every citizen thrives with dignity.",
    },
    stats: {
      yearsOfService: { type: Number, default: 15 },
      peopleUnited: { type: String, default: "100K+" },
      projectsDone: { type: Number, default: 50 },
    },
    image: { type: String, default: "/images/profiles.jpg" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Hero || mongoose.model<IHero>("Hero", HeroSchema);
