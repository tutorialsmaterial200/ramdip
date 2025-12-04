import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'

export default function AppointmentSection() {
  return (
    <section className="bg-red-50 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          अपोइन्टमेन्ट बुक गर्नुहोस्
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          व्यक्तिगत भेटघाट वा छलफलको लागि अपोइन्टमेन्ट बुक गर्नुहोस्
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center p-4">
            <Calendar className="w-12 h-12 text-red-600 mb-3" />
            <h3 className="font-semibold text-gray-900">सजिलो बुकिङ</h3>
            <p className="text-sm text-gray-600">अनलाइन फारम भरेर सजिलै बुक गर्नुहोस्</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Clock className="w-12 h-12 text-red-600 mb-3" />
            <h3 className="font-semibold text-gray-900">छिटो प्रतिक्रिया</h3>
            <p className="text-sm text-gray-600">२४ घण्टा भित्र पुष्टि गरिन्छ</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <User className="w-12 h-12 text-red-600 mb-3" />
            <h3 className="font-semibold text-gray-900">व्यक्तिगत भेटघाट</h3>
            <p className="text-sm text-gray-600">प्रत्यक्ष छलफल र समाधान</p>
          </div>
        </div>
        
        <Link 
          href="/appointments"
          className="inline-flex items-center gap-2 bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition"
        >
          <Calendar size={20} />
          अहिले बुक गर्नुहोस्
        </Link>
      </div>
    </section>
  )
}