import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  description: string;
  category: "Events" | "Development" | "Social" | "Political";
  image: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      enum: ["Events", "Development", "Social", "Political"], 
      default: "Events" 
    },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);
