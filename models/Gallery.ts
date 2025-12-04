import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  image: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    category: { 
      type: String, 
      enum: ["event", "meeting", "rally", "other"], 
      default: "event" 
    }
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);