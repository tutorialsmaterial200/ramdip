"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit, Plus, Eye, Check, X } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  featured: boolean;
  image?: string;
  tags: string[];
  views: number;
  published: boolean;
  createdAt: string;
}

export default function BlogManagement() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "CPN (Maoist Center)",
    category: "article",
    featured: false,
    image: "",
    tags: "",
    published: false,
  });

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (!res.ok) {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, [filterCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const query =
        filterCategory === "all"
          ? ""
          : `?category=${filterCategory}`;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/blog/${editingId}` : "/api/blog";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          editingId
            ? "ब्लग पोस्ट अपडेट किया गया"
            : "ब्लग पोस्ट बनाया गया"
        );
        resetForm();
        fetchPosts();
      } else {
        alert(data.error || "त्रुटि हुई");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("त्रुटि हुई");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      featured: post.featured,
      image: post.image || "",
      tags: post.tags.join(", "),
      published: post.published,
    });
    setEditingId(post._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("क्या आप निश्चित हैं?")) return;

    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("ब्लग पोस्ट हटाया गया");
        fetchPosts();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("त्रुटि हुई");
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });

      const data = await res.json();
      if (data.success) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "CPN (Maoist Center)",
      category: "article",
      featured: false,
      image: "",
      tags: "",
      published: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          ब्लग प्रबंधन
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
        >
          <Plus size={20} />
          नया पोस्ट
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="शीर्षक"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Slug (URL के लिए)"
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <textarea
            placeholder="संक्षिप्त विवरण"
            required
            rows={2}
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />

          <textarea
            placeholder="पोस्ट सामग्री (HTML समर्थित)"
            required
            rows={8}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm"
          />

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="लेखक"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="article">लेख</option>
              <option value="news">समाचार</option>
              <option value="press-release">प्रेस विज्ञप्ति</option>
              <option value="update">अपडेट</option>
            </select>
            <input
              type="text"
              placeholder="इमेज URL"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <input
            type="text"
            placeholder="टैग (अल्पविराम से अलग)"
            value={formData.tags}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4"
              />
              <span className="text-gray-700">फीचर्ड</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-4 h-4"
              />
              <span className="text-gray-700">प्रकाशित</span>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition font-semibold"
            >
              {editingId ? "अपडेट करें" : "बनाएं"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              रद्द करें
            </button>
          </div>
        </form>
      )}

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["all", "article", "news", "press-release", "update"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterCategory === cat
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat === "all"
              ? "सभी"
              : cat === "article"
              ? "लेख"
              : cat === "news"
              ? "समाचार"
              : cat === "press-release"
              ? "प्रेस विज्ञप्ति"
              : "अपडेट"}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
        </div>
      )}

      {/* Posts Table */}
      {!loading && posts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">
                  शीर्षक
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">
                  श्रेणी
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">
                  दृश्य
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">
                  स्थिति
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">
                  क्रियाएं
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr
                  key={post._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-3 text-gray-900">
                    <div>
                      <p className="font-semibold">{post.title}</p>
                      <p className="text-sm text-gray-600">{post.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-600 text-sm">
                    {post.category}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Eye size={16} />
                      {post.views}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleTogglePublish(post)}
                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                        post.published
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {post.published ? "प्रकाशित" : "ड्राफ्ट"}
                    </button>
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-600">
          कोई ब्लग पोस्ट नहीं मिली
        </div>
      )}
    </div>
  );
}
