"use client"
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Calendar, Users, FileText, Settings, LogOut, Menu, X } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthenticated(true)
      setLoading(false)
      return
    }
    
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    
    setIsAuthenticated(true)
    setLoading(false)
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  if (loading || !isAuthenticated) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
    </div>
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const menuItems = [
    { href: '/admin/dashboard', label: 'ड्यासबोर्ड', icon: Settings },
    { href: '/admin/appointments', label: 'अपोइन्टमेन्ट', icon: Calendar },
    { href: '/admin/blog', label: 'ब्लग', icon: FileText },
    { href: '/admin/gallery', label: 'ग्यालेरी', icon: Users },
    { href: '/admin/messages', label: 'सन्देश', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-red-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-red-900">
          <h1 className="text-white font-bold text-lg">CPN Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center px-6 py-3 text-white hover:bg-red-700 transition-colors"
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-white bg-red-900 rounded hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            लगआउट
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              नेपाली कम्युनिष्ट पार्टी (माओवादी केन्द्र) - प्रशासन
            </h2>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}