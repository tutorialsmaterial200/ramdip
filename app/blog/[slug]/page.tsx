import { notFound } from 'next/navigation'
import dbConnect from '@/lib/mongoose'
import BlogPost from '@/models/BlogPost'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function BlogSlugPage({ params }: { params: { slug: string } }) {
  try {
    await dbConnect()
    const post = await BlogPost.findOne({ slug: params.slug, published: true })
    
    if (!post) {
      notFound()
    }

    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.image && (
              <div className="h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-8">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <span>लेखक: {post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString('ne-NP')}</span>
                </div>
                <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
              </div>
              
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </article>
          
          <div className="mt-8 text-center">
            <a 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
            >
              सबै ब्लग पोस्ट हेर्नुहोस्
            </a>
          </div>
        </div>
        </div>
        <Footer />
      </>
    )
  } catch (error) {
    console.error('Error:', error)
    notFound()
  }
}