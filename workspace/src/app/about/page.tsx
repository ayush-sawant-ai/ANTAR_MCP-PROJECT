import Image from 'next/image'
import { Download, MapPin } from 'lucide-react'

export default function About() {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools & Others', items: ['Git', 'Docker', 'AWS', 'Figma', 'Jest'] },
  ]

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      period: '2022 - Present',
      description: 'Leading development of enterprise-level web applications using React, Node.js, and cloud technologies.'
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      period: '2020 - 2022',
      description: 'Built responsive web applications and improved user experience across multiple products.'
    },
    {
      title: 'Junior Developer',
      company: 'WebSolutions LLC',
      period: '2019 - 2020',
      description: 'Developed and maintained client websites using modern JavaScript frameworks and CMS platforms.'
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              I'm a passionate full-stack developer with over 5 years of experience creating 
              digital solutions that make a real impact.
            </p>
            <p className="text-gray-400 mb-8">
              My journey in web development started with a curiosity about how things work on the internet. 
              Today, I specialize in building scalable web applications using modern technologies like 
              React, Next.js, and Node.js. I believe in writing clean, maintainable code and creating 
              user experiences that are both beautiful and functional.
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <MapPin size={20} className="text-primary" />
              <span className="text-gray-300">San Francisco, CA</span>
            </div>

            <button className="bg-primary hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200">
              <Download size={20} />
              Download Resume
            </button>
          </div>

          <div className="relative">
            <div className="glass-effect rounded-2xl p-8">
              <div className="relative w-full h-96 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-6xl font-bold opacity-20">JD</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <h2 className="text-3xl font-bold mb-12 text-center">Work Experience</h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="glass-effect rounded-xl p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-300 font-medium">{job.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm mt-2 md:mt-0">
                    {job.period}
                  </span>
                </div>
                <p className="text-gray-400">{job.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
