"use client";

import { useState, useEffect } from "react";
import { Save, AlertCircle } from "lucide-react";

interface HeroData {
  _id?: string;
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
}

export default function HeroPage() {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch("/api/hero");
        const heroData = await res.json();
        setData(heroData || getDefaultHero());
      } catch (error) {
        console.error("Failed to fetch hero:", error);
        setData(getDefaultHero());
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  const getDefaultHero = (): HeroData => ({
    badge: "Communist Party of Nepal (Maoist Center)",
    titleNepali: "जनताको सेवामा",
    titleEnglish: "Serving the People",
    description: "Dedicated to social justice, equality, and the transformation of Nepal.",
    stats: {
      yearsOfService: 15,
      peopleUnited: "100K+",
      projectsDone: 50,
    },
    image: "/images/profiles.jpg",
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

  const handleStatChange = (stat: string, value: any) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            stats: {
              ...prev.stats,
              [stat]: value,
            },
          }
        : null
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage("✓ Hero section updated successfully!");
      } else {
        setMessage("✗ Failed to update hero section");
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Hero Section</h1>

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
        {/* Badge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
          <input
            type="text"
            value={data?.badge || ""}
            onChange={(e) => handleChange("badge", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Title Nepali */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title (Nepali)</label>
          <input
            type="text"
            value={data?.titleNepali || ""}
            onChange={(e) => handleChange("titleNepali", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Title English */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title (English)</label>
          <input
            type="text"
            value={data?.titleEnglish || ""}
            onChange={(e) => handleChange("titleEnglish", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={data?.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Stats */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Service</label>
              <input
                type="number"
                value={data?.stats.yearsOfService || ""}
                onChange={(e) => handleStatChange("yearsOfService", parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">People United</label>
              <input
                type="text"
                value={data?.stats.peopleUnited || ""}
                onChange={(e) => handleStatChange("peopleUnited", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Projects Done</label>
              <input
                type="number"
                value={data?.stats.projectsDone || ""}
                onChange={(e) => handleStatChange("projectsDone", parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
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
