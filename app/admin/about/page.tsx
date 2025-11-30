"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

interface AboutData {
  _id?: string;
  sectionTitle: string;
  subtitle: string;
  description: string;
  mainTitle: string;
  content1: string;
  content2: string;
  image: string;
  yearsOfStruggle: number;
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/about");
        const aboutData = await res.json();
        setData(aboutData || getDefaultAbout());
      } catch (error) {
        console.error("Failed to fetch about:", error);
        setData(getDefaultAbout());
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const getDefaultAbout = (): AboutData => ({
    sectionTitle: "हाम्रो बारेमा",
    subtitle: "A Party Born from the People",
    description: "नेपाली कम्युनिष्ट पार्टी(माओवादी केन्द्र)has been at the forefront of Nepal's transformation",
    mainTitle: "जनताको पार्टी, जनताको सेवामा",
    content1: "The Communist Party of Nepal emerged from the struggle for social justice...",
    content2: "From leading the historic transformation that ended centuries of monarchy...",
    image: "/images/profiles.jpg",
    yearsOfStruggle: 30,
  });

  const handleChange = (field: string, value: any) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : null
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage("✓ About section updated successfully!");
      } else {
        setMessage("✗ Failed to update about section");
      }
    } catch (error) {
      setMessage("✗ Error saving changes");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Section</h1>

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

      <div className="bg-white rounded-lg shadow p-8 space-y-6">
        {/* Section Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Title (Nepali)</label>
          <input
            type="text"
            value={data?.sectionTitle || ""}
            onChange={(e) => handleChange("sectionTitle", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={data?.subtitle || ""}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={data?.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Main Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Title (Nepali)</label>
          <input
            type="text"
            value={data?.mainTitle || ""}
            onChange={(e) => handleChange("mainTitle", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Content 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content 1</label>
          <textarea
            value={data?.content1 || ""}
            onChange={(e) => handleChange("content1", e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Content 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content 2</label>
          <textarea
            value={data?.content2 || ""}
            onChange={(e) => handleChange("content2", e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image Path</label>
          <input
            type="text"
            value={data?.image || ""}
            onChange={(e) => handleChange("image", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="/images/profile.jpg"
          />
        </div>

        {/* Years */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Struggle</label>
          <input
            type="number"
            value={data?.yearsOfStruggle || ""}
            onChange={(e) => handleChange("yearsOfStruggle", parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={20} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
