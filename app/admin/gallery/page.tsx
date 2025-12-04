"use client"
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Image } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

interface GalleryItem {
  _id: string
  title: string
  image: string
  description: string
  category: string
  createdAt: string
}

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    category: 'event'
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      if (data.success) {
        setItems(data.data || [])
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
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success) {
        fetchItems()
        resetForm()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('के तपाईं यो तस्बिर मेटाउन चाहनुहुन्छ?')) return
    
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchItems()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      description: '',
      category: 'event'
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">ग्यालेरी प्रबंधन</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
        >
          <Plus size={20} />
          नयाँ तस्बिर
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="शीर्षक"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">तस्बिर</label>
              <ImageUpload 
                onUpload={(url) => setFormData({ ...formData, image: url })}
                currentImage={formData.image}
              />
            </div>
          </div>

          <textarea
            placeholder="विवरण"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="event">कार्यक्रम</option>
            <option value="meeting">बैठक</option>
            <option value="rally">र्‍याली</option>
            <option value="other">अन्य</option>
          </select>

          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition">
              {editingId ? 'अपडेट' : 'थप्नुहोस्'}
            </button>
            <button type="button" onClick={resetForm} className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
              रद्द गर्नुहोस्
            </button>
          </div>
        </form>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Image size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">कुनै तस्बिर फेला परेन</p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <Image size={48} className="text-gray-400" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{item.category}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setFormData({
                          title: item.title,
                          image: item.image,
                          description: item.description,
                          category: item.category
                        })
                        setEditingId(item._id)
                        setShowForm(true)
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}