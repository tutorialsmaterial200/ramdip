import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const posts = await BlogPost.find({})
      .sort({ createdAt: -1 })
      .select('title slug excerpt author category published createdAt tags image');

    return NextResponse.json({
      success: true,
      posts
    });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { title, slug, excerpt, content, author, category, featured, image, tags, published } = await request.json();

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    const post = await BlogPost.create({
      title,
      slug: slug.toLowerCase(),
      excerpt,
      content,
      author: author || "CPN (Maoist Center)",
      category: category || "article",
      featured: featured || false,
      image,
      tags: tags || [],
      published: published || false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully",
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const { title, slug, excerpt, content, author, category, featured, image, tags, published } = await request.json();

    const post = await BlogPost.findByIdAndUpdate(
      id,
      {
        title,
        slug: slug.toLowerCase(),
        excerpt,
        content,
        author,
        category,
        featured,
        image,
        tags,
        published
      },
      { new: true }
    );

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      post
    });
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully"
    });
  } catch (error) {
    console.error("Blog delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
