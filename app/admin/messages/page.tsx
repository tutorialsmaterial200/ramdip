"use client"
import { useState, useEffect } from 'react'
import { Mail, Eye, Trash2, User, Phone, MessageSquare } from 'lucide-react'

interface Message {
  _id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'unread' | 'read'
  createdAt: string
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages')
      const data = await res.json()
      if (data.success) {
        setMessages(data.data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' })
      })

      if (res.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('के तपाईं यो सन्देश मेटाउन चाहनुहुन्छ?')) return
    
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchMessages()
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">सन्देश प्रबंधन</h1>
        <div className="text-sm text-gray-600">
          कुल सन्देश: {messages.length} | नपढिएको: {messages.filter(m => m.status === 'unread').length}
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">सन्देशहरू</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message._id}
                onClick={() => {
                  setSelectedMessage(message)
                  if (message.status === 'unread') {
                    markAsRead(message._id)
                  }
                }}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  message.status === 'unread' ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User size={16} className="text-gray-500" />
                      <span className="font-medium text-gray-900">{message.name}</span>
                      {message.status === 'unread' && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">नयाँ</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{message.subject}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString('ne-NP')}
                    </p>
                  </div>
                  <Mail size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">सन्देश विवरण</h2>
          </div>
          <div className="p-4">
            {selectedMessage ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-gray-500" />
                    <span className="font-medium">{selectedMessage.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{selectedMessage.email}</span>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2 mb-2">
                      <Phone size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedMessage.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">विषय:</h3>
                  <p className="text-gray-700">{selectedMessage.subject}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">सन्देश:</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 size={16} />
                    मेटाउनुहोस्
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <p>सन्देश हेर्न बायाँबाट छान्नुहोस्</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {!loading && messages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Mail size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">कुनै सन्देश फेला परेन</p>
        </div>
      )}
    </div>
  )
}