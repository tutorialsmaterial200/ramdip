"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save } from "lucide-react";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  impact: string;
  status: "Historic" | "Ongoing" | "Completed";
  year: string;
  isActive: boolean;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    impact: string;
    status: "Historic" | "Ongoing" | "Completed";
    year: string;
  }>({
    title: "",
    description: "",
    impact: "",
    status: "Ongoing",
    year: new Date().getFullYear().toString(),
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch("/api/achievements");
      const data = await res.json();
      setAchievements(data);
    } catch (error) {
      console.error("Failed to fetch achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      title: "",
      description: "",
      impact: "",
      status: "Ongoing",
      year: new Date().getFullYear().toString(),
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const res = await fetch(`/api/achievements/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setMessage("✓ Achievement updated");
        }
      } else {
        const res = await fetch("/api/achievements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setMessage("✓ Achievement created");
        }
      }
      await fetchAchievements();
      setShowForm(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("✗ Error saving achievement");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("✓ Achievement deleted");
        await fetchAchievements();
      }
    } catch (error) {
      setMessage("✗ Error deleting achievement");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus size={20} /> Add Achievement
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
            {editingId ? "Edit Achievement" : "Add New Achievement"}
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
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Impact (e.g., 100,000+ beneficiaries)"
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.status}
                onChange={(e) => {
                  const newStatus = e.target.value as "Historic" | "Ongoing" | "Completed";
                  setFormData({
                    ...formData,
                    status: newStatus,
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Historic">Historic</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="text"
                placeholder="Year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
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

      {/* Achievements List */}
      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <div key={achievement._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
                <div className="flex gap-4 mt-3">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {achievement.year}
                  </span>
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${
                      achievement.status === "Historic"
                        ? "bg-red-100 text-red-700"
                        : achievement.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {achievement.status}
                  </span>
                  <span className="text-xs text-gray-600">Impact: {achievement.impact}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(achievement._id);
                    setFormData({
                      title: achievement.title,
                      description: achievement.description,
                      impact: achievement.impact,
                      status: achievement.status as "Historic" | "Ongoing" | "Completed",
                      year: achievement.year,
                    });
                    setShowForm(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(achievement._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
