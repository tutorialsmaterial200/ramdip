"use client"
import { Calendar, MessageSquare, FileText, Users } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">CPN Admin Dashboard</h1>
        <div className="text-sm text-gray-600">
          नेपाली कम्युनिष्ट पार्टी (माओवादी केन्द्र)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <a href="/admin/appointments" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">अपोइन्टमेन्ट</h3>
              <p className="text-gray-600">Manage appointments</p>
            </div>
          </div>
        </a>

        <a href="/admin/messages" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">सन्देश</h3>
              <p className="text-gray-600">View messages</p>
            </div>
          </div>
        </a>

        <a href="/admin/blog" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">ब्लग</h3>
              <p className="text-gray-600">Manage blog posts</p>
            </div>
          </div>
        </a>

        <a href="/admin/gallery" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">ग्यालेरी</h3>
              <p className="text-gray-600">Photo gallery</p>
            </div>
          </div>
        </a>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome to Admin Panel</h2>
        <p className="text-gray-600">
          Use the navigation above or sidebar to manage different sections of the CPN (Maoist Center) website.
        </p>
      </div>
    </div>
  )
}

