"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, User, Tag } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  image?: string;
  tags: string[];
  views: number;
  createdAt: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "सबै (All)" },
    { id: "news", label: "समाचार (News)" },
    { id: "article", label: "लेख (Article)" },
    { id: "press-release", label: "प्रेस विज्ञप्ति (Press Release)" },
    { id: "update", label: "अपडेट (Update)" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query =
          selectedCategory === "all"
            ? ""
            : `?category=${selectedCategory}`;
        const res = await fetch(`/api/blog${query}`);
        const data = await res.json();
        if (data.success) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ne-NP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      news: "bg-blue-100 text-blue-800",
      article: "bg-purple-100 text-purple-800",
      "press-release": "bg-red-100 text-red-800",
      update: "bg-green-100 text-green-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="py-16 bg-white" id="blog">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-700 mb-4">
            ब्लग (Blog)
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            CPN (Maoist Center)का नवीनतम समाचार, लेख र अपडेटहरू
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-red-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
            <p className="mt-4 text-gray-600">लोड हो रहा छ...</p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                {post.image && (
                  <div className="h-48 bg-gray-300 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 bg-white">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                        post.category
                      )}`}
                    >
                      {categories.find((c) => c.id === post.category)?.label}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post._id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      {post.author}
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Button */}
                  <Link
                    href={`/blog/${post._id}`}
                    className="inline-block text-red-700 font-semibold hover:text-red-900 transition-colors"
                  >
                    अधिक पढ्नुहोस् →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              कोई ब्लग पोस्ट उपलब्ध नहीं है।
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
