import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: "news" | "article" | "press-release" | "update";
  featured: boolean;
  image?: string;
  tags: string[];
  views: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "CPN (Maoist Center)" },
    category: {
      type: String,
      enum: ["news", "article", "press-release", "update"],
      default: "article",
    },
    featured: { type: Boolean, default: false },
    image: { type: String },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
