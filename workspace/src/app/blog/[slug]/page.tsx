import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag, Share2, Code } from 'lucide-react'

export default function BlogPost() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-primary hover:text-indigo-400 transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="bg-primary px-3 py-1 rounded-full text-white text-sm font-medium">
              React
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Building Scalable React Applications with Next.js 14
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>March 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>8 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={18} />
              <span>React, Next.js, Web Development</span>
            </div>
          </div>

          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Code size={80} className="text-white opacity-30" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none">
          <div className="text-xl text-gray-300 mb-8 leading-relaxed">
            Next.js 14 introduces groundbreaking features that revolutionize how we build React applications. 
            In this comprehensive guide, we'll explore the latest improvements and learn how to leverage them 
            for building scalable, performant web applications.
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">What's New in Next.js 14</h2>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            Next.js 14 brings significant improvements to developer experience and application performance. 
            The most notable additions include the stable App Router, enhanced Server Components, and 
            improved bundling with Turbopack.
          </p>

          <div className="glass-effect rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">Key Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Stable App Router with improved file-based routing</li>
              <li>• Enhanced Server Components for better performance</li>
              <li>• Turbopack for faster builds and hot reloading</li>
              <li>• Improved TypeScript support</li>
              <li>• Better SEO optimization tools</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Setting Up Your Project</h2>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            Getting started with Next.js 14 is straightforward. Let's walk through the process of setting up 
            a new project and configuring it for optimal performance.
          </p>

          <div className="bg-gray-900 rounded-lg p-6 my-8 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{`npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm run dev`}</code>
            </pre>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">App Router vs Pages Router</h2>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            One of the most significant changes in Next.js 14 is the stable App Router. This new routing system 
            provides better developer experience, improved performance, and more flexible layouts.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="glass-effect rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3 text-green-400">App Router Benefits</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Better file organization</li>
                <li>• Improved SEO capabilities</li>
                <li>• Server Components support</li>
                <li>• Flexible layout system</li>
              </ul>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3 text-blue-400">Migration Considerations</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Gradual migration possible</li>
                <li>• Breaking changes to consider</li>
                <li>• New patterns to learn</li>
                <li>• Performance improvements</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Server Components Deep Dive</h2>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            Server Components are one of the most powerful features in Next.js 14. They allow you to render 
            components on the server, reducing bundle size and improving performance.
          </p>

          <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 bg-primary/10 rounded-r-lg">
            <p className="text-gray-200 italic">
              "Server Components represent a fundamental shift in how we think about React applications. 
              They enable us to build faster, more efficient web applications while maintaining the 
              developer experience we love."
            </p>
          </blockquote>

          <h2 className="text-3xl font-bold mt-12 mb-6">Performance Optimization Strategies</h2>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            Next.js 14 provides numerous optimization features out of the box. Here are some key strategies 
            to ensure your application performs at its best:
          </p>

          <ol className="text-gray-300 space-y-4 mb-8">
            <li className="flex gap-3">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</span>
              <div>
                <strong>Image Optimization:</strong> Use the built-in Image component for automatic optimization and lazy loading.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</span>
              <div>
                <strong>Code Splitting:</strong> Leverage automatic code splitting and dynamic imports for better performance.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</span>
              <div>
                <strong>Caching Strategies:</strong> Implement effective caching strategies using Next.js built-in features.
              </div>
            </li>
          </ol>

          <div className="glass-effect rounded-lg p-6 my-8 bg-gradient-to-r from-primary/10 to-secondary/10">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code size={24} className="text-primary" />
              Pro Tip
            </h3>
            <p className="text-gray-300">
              Always test your application's performance with tools like Lighthouse and Web Vitals 
              to ensure optimal user experience across all devices and network conditions.
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            Next.js 14 represents a significant step forward in React application development. With its improved 
            App Router, enhanced Server Components, and better performance optimizations, it's easier than ever 
            to build scalable, performant web applications.
          </p>

          <p className="text-gray-300 leading-relaxed">
            As you embark on your Next.js 14 journey, remember that the framework is designed to grow with your 
            needs. Start simple, and gradually adopt advanced features as your application scales.
          </p>
        </article>

        {/* Share & Navigation */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Share this article</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/blog" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                More Articles
              </Link>
              <Link 
                href="/contact" 
                className="bg-primary hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
