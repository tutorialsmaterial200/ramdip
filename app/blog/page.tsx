export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ब्लग पोस्टहरू</h1>
          <p className="text-lg text-gray-600">
            नेपाली कम्युनिष्ट पार्टी (माओवादी केन्द्र) का समाचार र लेखहरू
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/blog/cpn-maoist-center-policy" className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-3">
                नीति
              </span>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                नेपाली कम्युनिष्ट पार्टी (माओवादी केन्द्र) को नीति
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                यो एक नमूना ब्लग पोस्ट हो। यहाँ पार्टीको नीति र कार्यक्रमहरूको बारेमा...
              </p>
              <div className="text-xs text-gray-500">
                CPN (Maoist Center) • आज
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}