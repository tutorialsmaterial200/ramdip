"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  category: "Events" | "Development" | "Social" | "Political";
  image: string;
  order: number;
  isActive: boolean;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: "Events" | "Development" | "Social" | "Political";
    image: string;
    order: number;
  }>({
    title: "",
    description: "",
    category: "Events",
    image: "",
    order: 0,
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      title: "",
      description: "",
      category: "Events",
      image: "",
      order: items.length,
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const res = await fetch(`/api/gallery/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) setMessage("✓ Gallery item updated");
      } else {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) setMessage("✓ Gallery item created");
      }
      await fetchGallery();
      setShowForm(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("✗ Error saving gallery item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("✓ Gallery item deleted");
        await fetchGallery();
      }
    } catch (error) {
      setMessage("✗ Error deleting item");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus size={20} /> Add Photo
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.startsWith("✓")
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Photo" : "Add New Photo"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={formData.category}
              onChange={(e) => {
                const newCategory = e.target.value as "Events" | "Development" | "Social" | "Political";
                setFormData({
                  ...formData,
                  category: newCategory,
                });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Events">Events</option>
              <option value="Development">Development</option>
              <option value="Social">Social</option>
              <option value="Political">Political</option>
            </select>
            <div className="flex gap-4 justify-end pt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Save size={18} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">🖼️</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                {item.category}
              </span>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingId(item._id);
                    setFormData({
                      title: item.title,
                      description: item.description,
                      category: item.category as "Events" | "Development" | "Social" | "Political",
                      image: item.image,
                      order: item.order,
                    });
                    setShowForm(true);
                  }}
                  className="flex-1 px-2 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm"
                >
                  <Edit2 size={16} className="inline mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  <Trash2 size={16} className="inline mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
