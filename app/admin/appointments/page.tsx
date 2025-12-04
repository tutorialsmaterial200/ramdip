"use client"
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Calendar, User, Phone, Mail } from 'lucide-react'

interface Appointment {
  _id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  purpose: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<{
    name: string
    email: string
    phone: string
    date: string
    time: string
    purpose: string
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  }>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    purpose: '',
    status: 'pending'
  })

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments')
      const data = await res.json()
      if (data.success) {
        setAppointments(data.data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/appointments/${editingId}` : '/api/appointments'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success) {
        fetchAppointments()
        resetForm()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEdit = (appointment: Appointment) => {
    setFormData({
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      date: appointment.date,
      time: appointment.time,
      purpose: appointment.purpose,
      status: appointment.status
    })
    setEditingId(appointment._id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('के तपाईं यो अपोइन्टमेन्ट मेटाउन चाहनुहुन्छ?')) return
    
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchAppointments()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      const data = await res.json()
      if (data.success) {
        fetchAppointments()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      purpose: '',
      status: 'pending'
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">अपोइन्टमेन्ट प्रबंधन</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
        >
          <Plus size={20} />
          नयाँ अपोइन्टमेन्ट
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="नाम"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              placeholder="इमेल"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="tel"
              placeholder="फोन नम्बर"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <textarea
            placeholder="उद्देश्य"
            required
            rows={3}
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />

          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'confirmed' | 'completed' | 'cancelled' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="pending">पेन्डिङ</option>
            <option value="confirmed">पुष्टि भएको</option>
            <option value="completed">सम्पन्न</option>
            <option value="cancelled">रद्द</option>
          </select>

          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition">
              {editingId ? 'अपडेट करें' : 'बनाएं'}
            </button>
            <button type="button" onClick={resetForm} className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
              रद्द करें
            </button>
          </div>
        </form>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
        </div>
      )}

      {!loading && appointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">व्यक्ति</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">मिति/समय</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">उद्देश्य</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">स्थिति</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">क्रियाएं</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, idx) => (
                <tr key={appointment._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-3">
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center gap-2">
                        <User size={16} />
                        {appointment.name}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail size={14} />
                        {appointment.email}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone size={14} />
                        {appointment.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <div>
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-sm text-gray-600">{appointment.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-600 text-sm">{appointment.purpose}</td>
                  <td className="px-6 py-3">
                    <select
                      value={appointment.status}
                      onChange={(e) => updateStatus(appointment._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">पेन्डिङ</option>
                      <option value="confirmed">पुष्टि</option>
                      <option value="completed">सम्पन्न</option>
                      <option value="cancelled">रद्द</option>
                    </select>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && appointments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">कुनै अपोइन्टमेन्ट फेला परेन</p>
        </div>
      )}
    </div>
  )
}