import Link from 'next/link'
import { ExternalLink, Github, Code, Palette, BarChart, Globe, Cloud, Smartphone } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with payment processing, inventory management, and admin dashboard. Built with modern technologies for scalability and performance.',
      icon: Code,
      gradient: 'from-blue-500 to-purple-600',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration features, and mobile responsiveness.',
      icon: Smartphone,
      gradient: 'from-green-500 to-blue-600',
      technologies: ['React Native', 'Firebase', 'Node.js', 'Socket.io'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: true
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization dashboard with interactive charts, custom reports, and data export functionality.',
      icon: BarChart,
      gradient: 'from-purple-500 to-pink-600',
      technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Chart.js'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: true
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing projects and blog posts with modern design and smooth animations.',
      icon: Globe,
      gradient: 'from-indigo-500 to-cyan-600',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'MDX'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: false
    },
    {
      title: 'Weather App',
      description: 'A beautiful weather application with location-based forecasts, interactive maps, and weather alerts.',
      icon: Cloud,
      gradient: 'from-sky-500 to-blue-600',
      technologies: ['React', 'OpenWeather API', 'Mapbox', 'PWA'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: false
    },
    {
      title: 'Social Media Dashboard',
      description: 'A comprehensive social media management tool with scheduling, analytics, and multi-platform support.',
      icon: Palette,
      gradient: 'from-rose-500 to-orange-600',
      technologies: ['Vue.js', 'Express', 'Redis', 'Social APIs'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: false
    }
  ]

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A collection of my recent work showcasing various technologies and solutions. 
            Each project represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="space-y-12">
            {featuredProjects.map((project, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`relative h-80 rounded-xl overflow-hidden group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <project.icon size={64} className="text-white opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <Github size={20} />
                      View Code
                    </Link>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-indigo-400 transition-colors duration-200"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <h2 className="text-3xl font-bold mb-12">Other Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <div key={index} className="glass-effect rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48">
                  <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <project.icon size={48} className="text-white opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-3">
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors duration-200"
                      >
                        <Github size={16} />
                      </Link>
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
