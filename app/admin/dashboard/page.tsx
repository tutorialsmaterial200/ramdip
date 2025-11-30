"use client";

import { useState, useEffect } from "react";
import { Users, FileText, ImageIcon, Mail } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    achievements: 0,
    gallery: 0,
    messages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [achievements, gallery, messages] = await Promise.all([
          fetch("/api/achievements").then((r) => r.json()),
          fetch("/api/gallery").then((r) => r.json()),
          fetch("/api/messages").then((r) => r.json()),
        ]);

        const unread = messages.filter((m: any) => m.status === "unread").length;

        setStats({
          achievements: achievements.length || 0,
          gallery: gallery.length || 0,
          messages: messages.length || 0,
          unreadMessages: unread,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Achievements",
      value: stats.achievements,
      icon: "🏆",
      color: "bg-blue-100 text-blue-600",
      href: "/admin/achievements",
    },
    {
      title: "Gallery Items",
      value: stats.gallery,
      icon: "🖼️",
      color: "bg-green-100 text-green-600",
      href: "/admin/gallery",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: "💬",
      color: "bg-yellow-100 text-yellow-600",
      href: "/admin/messages",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: "📬",
      color: "bg-red-100 text-red-600",
      href: "/admin/messages",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className={`${card.color} p-4 rounded-lg text-2xl`}>
                {card.icon}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-center py-12 text-gray-500">
          <p>Welcome to CPN (Maoist Center) Admin Panel</p>
          <p className="text-sm mt-2">Use the sidebar to manage portfolio content</p>
        </div>
      </div>
    </div>
  );
}
