import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Code, Palette, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-80"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="gradient-text">John Doe</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Full Stack Developer & Creative Problem Solver
          </p>
          <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
            I craft digital experiences that combine beautiful design with robust functionality. 
            Passionate about modern web technologies and creating solutions that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/projects"
              className="bg-primary hover:bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200"
            >
              View My Work
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              I specialize in creating modern, scalable web applications using cutting-edge technologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 glass-effect rounded-xl">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Code className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Full Stack Development</h3>
              <p className="text-gray-400">
                Building robust web applications with React, Next.js, Node.js, and modern databases
              </p>
            </div>

            <div className="text-center p-8 glass-effect rounded-xl">
              <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Palette className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">UI/UX Design</h3>
              <p className="text-gray-400">
                Creating intuitive and visually appealing user interfaces with modern design principles
              </p>
            </div>

            <div className="text-center p-8 glass-effect rounded-xl">
              <div className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
              <p className="text-gray-400">
                Optimizing applications for speed, accessibility, and search engine visibility
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A selection of my recent work that showcases my skills and passion for development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="glass-effect rounded-xl overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code size={48} className="text-white opacity-50" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">E-commerce Platform</h3>
                <p className="text-gray-400 mb-4">
                  A modern e-commerce solution built with Next.js and Stripe
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-primary px-2 py-1 rounded">Next.js</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">TypeScript</span>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-green-500 to-blue-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Palette size={48} className="text-white opacity-50" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Task Management App</h3>
                <p className="text-gray-400 mb-4">
                  A React Native app for team collaboration and productivity
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-primary px-2 py-1 rounded">React Native</span>
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded">Firebase</span>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={48} className="text-white opacity-50" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-gray-400 mb-4">
                  Real-time data visualization with interactive charts
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-secondary px-2 py-1 rounded">D3.js</span>
                  <span className="text-xs bg-green-500 px-2 py-1 rounded">Node.js</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="bg-primary hover:bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors duration-200"
            >
              View All Projects
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
