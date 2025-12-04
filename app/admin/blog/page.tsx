"use client"
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  published: boolean
  createdAt: string
  image?: string
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'CPN (Maoist Center)',
    category: 'article',
    published: false,
    image: ''
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      if (data.success) {
        setPosts(data.posts)
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
      const url = editingId ? `/api/blog?id=${editingId}` : '/api/blog'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success) {
        fetchPosts()
        resetForm()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content || '',
      author: post.author,
      category: post.category,
      published: post.published,
      image: post.image || ''
    })
    setEditingId(post._id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('के तपाईं यो पोस्ट मेटाउन चाहनुहुन्छ?')) return
    
    try {
      const res = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE'
      })
      
      const data = await res.json()
      if (data.success) {
        fetchPosts()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'CPN (Maoist Center)',
      category: 'article',
      published: false,
      image: ''
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">ब्लग प्रबंधन</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
        >
          <Plus size={20} />
          नयाँ पोस्ट
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
            <input
              type="text"
              placeholder="Slug (URL)"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <textarea
            placeholder="संक्षिप्त विवरण"
            required
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">पोस्ट सामग्री</label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link', 'image'],
                  ['clean']
                ]
              }}
              style={{ height: '200px', marginBottom: '50px' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">छवि अपलोड गर्नुहोस्</label>
            <ImageUpload
              onUpload={(url) => setFormData({ ...formData, image: url })}
              currentImage={formData.image}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="article">लेख</option>
              <option value="news">समाचार</option>
              <option value="press-release">प्रेस विज्ञप्ति</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              प्रकाशित गर्नुहोस्
            </label>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition">
              {editingId ? 'अपडेट' : 'बनाउनुहोस्'}
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

      {!loading && posts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">कुनै ब्लग पोस्ट फेला परेन</p>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">शीर्षक</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">श्रेणी</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">स्थिति</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">क्रियाएं</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={post._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-3">
                    <div>
                      <p className="font-semibold text-gray-900">{post.title}</p>
                      <p className="text-sm text-gray-600">{post.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{post.category}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'प्रकाशित' : 'मस्यौदा'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                        title="हेर्नुहोस्"
                      >
                        <Eye size={16} />
                      </a>
                      <button 
                        onClick={() => handleEdit(post)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="सम्पादन गर्नुहोस्"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        title="मेटाउनुहोस्"
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
    </div>
  )
}