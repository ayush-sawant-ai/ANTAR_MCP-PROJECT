import Link from 'next/link'
import { Calendar, Clock, BookOpen, Code, Database, Palette, Zap, Globe, Smartphone } from 'lucide-react'

export default function Blog() {
  const posts = [
    {
      title: 'Building Scalable React Applications with Next.js 14',
      excerpt: 'Explore the latest features in Next.js 14 and learn how to build performant, scalable React applications with server-side rendering and app router.',
      icon: Code,
      gradient: 'from-blue-500 to-purple-600',
      date: '2024-03-15',
      readTime: '8 min read',
      category: 'React',
      slug: 'building-scalable-react-applications-nextjs-14',
      featured: true
    },
    {
      title: 'Mastering TypeScript for Better Code Quality',
      excerpt: 'Discover advanced TypeScript patterns and best practices that will help you write more maintainable and error-free code.',
      icon: Database,
      gradient: 'from-purple-500 to-pink-600',
      date: '2024-03-10',
      readTime: '12 min read',
      category: 'TypeScript',
      slug: 'mastering-typescript-better-code-quality',
      featured: true
    },
    {
      title: 'The Complete Guide to Tailwind CSS',
      excerpt: 'Learn how to leverage Tailwind CSS utility classes to build beautiful, responsive designs faster than ever before.',
      icon: Palette,
      gradient: 'from-green-500 to-blue-600',
      date: '2024-03-05',
      readTime: '6 min read',
      category: 'CSS',
      slug: 'complete-guide-tailwind-css',
      featured: false
    },
    {
      title: 'Optimizing Web Performance: A Developer\'s Guide',
      excerpt: 'Essential techniques for improving your web application\'s performance, from code splitting to image optimization.',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-600',
      date: '2024-02-28',
      readTime: '10 min read',
      category: 'Performance',
      slug: 'optimizing-web-performance-guide',
      featured: false
    },
    {
      title: 'Understanding JavaScript Async/Await',
      excerpt: 'A comprehensive look at asynchronous JavaScript, promises, and how to handle async operations effectively.',
      icon: Globe,
      gradient: 'from-indigo-500 to-cyan-600',
      date: '2024-02-22',
      readTime: '7 min read',
      category: 'JavaScript',
      slug: 'understanding-javascript-async-await',
      featured: false
    },
    {
      title: 'Building APIs with Node.js and Express',
      excerpt: 'Step-by-step guide to creating robust RESTful APIs using Node.js, Express, and modern development practices.',
      icon: Smartphone,
      gradient: 'from-emerald-500 to-teal-600',
      date: '2024-02-15',
      readTime: '9 min read',
      category: 'Backend',
      slug: 'building-apis-nodejs-express',
      featured: false
    }
  ]

  const featuredPosts = posts.filter(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)
  const categories = [...new Set(posts.map(post => post.category))]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            My <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology trends, 
            and everything I learn along my coding journey.
          </p>
        </div>

        {/* Featured Posts */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12">Featured Posts</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <article className="glass-effect rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 h-full">
                  <div className="relative h-64">
                    <div className={`w-full h-full bg-gradient-to-br ${post.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <post.icon size={60} className="text-white opacity-40" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary px-3 py-1 rounded-full text-white text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
              All Posts
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Regular Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-12">All Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <article className="glass-effect rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 h-full">
                  <div className="relative h-48">
                    <div className={`w-full h-full bg-gradient-to-br ${post.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <post.icon size={40} className="text-white opacity-40" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary px-2 py-1 rounded text-white text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 text-center">
          <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-8">
              Subscribe to my newsletter to get the latest posts and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
