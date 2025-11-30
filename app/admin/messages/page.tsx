"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await fetchMessages();
        setMessage("✓ Status updated");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage("✗ Error updating status");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchMessages();
        setMessage("✓ Message deleted");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage("✗ Error deleting message");
    }
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  const selected = messages.find((m) => m._id === selectedId);

  return (
    <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Messages List */}
      <div className="lg:col-span-1">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Messages ({messages.length})</h2>
        {message && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm">
            {message}
          </div>
        )}
        <div className="space-y-2">
          {messages.map((msg) => (
            <button
              key={msg._id}
              onClick={() => setSelectedId(msg._id)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedId === msg._id
                  ? "bg-red-100 border-l-4 border-red-600"
                  : msg.status === "unread"
                  ? "bg-blue-50 hover:bg-blue-100"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="font-medium text-gray-900 truncate">{msg.name}</div>
              <div className="text-sm text-gray-600 truncate">{msg.subject}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        {selected ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selected.name}</h3>
                  <p className="text-gray-600">{selected.email}</p>
                  {selected.phone && <p className="text-gray-600">{selected.phone}</p>}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selected.status === "unread"
                      ? "bg-blue-100 text-blue-700"
                      : selected.status === "replied"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {selected.status}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{selected.subject}</h4>
              <p className="text-gray-600 text-sm">
                {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-900 whitespace-pre-wrap">{selected.message}</p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <select
                value={selected.status}
                onChange={(e) => updateStatus(selected._id, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
              <button
                onClick={() => deleteMessage(selected._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            <p>Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
