import mongoose, { Schema, Document } from "mongoose";

export interface IContactInfo extends Document {
  address: string[];
  phones: string[];
  emails: string[];
  officeHours: string[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  isActive: boolean;
  updatedAt: Date;
}

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    address: [{ type: String }],
    phones: [{ type: String }],
    emails: [{ type: String }],
    officeHours: [{ type: String }],
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      youtube: { type: String },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.ContactInfo || mongoose.model<IContactInfo>("ContactInfo", ContactInfoSchema);
