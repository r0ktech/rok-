'use client'

export function ExperienceApp() {
  const experiences = [
    {
      year: '2023-2024',
      role: 'Senior Full-Stack Engineer',
      company: 'Tech Innovators Inc.',
      description: 'Led development of AI-powered design system and real-time collaboration tools.',
    },
    {
      year: '2022-2023',
      role: 'Full-Stack Developer',
      company: 'Digital Solutions Co.',
      description: 'Built scalable web applications with React and Next.js, managed PostgreSQL databases.',
    },
    {
      year: '2021-2022',
      role: 'Frontend Developer',
      company: 'Creative Studio',
      description: 'Developed interactive web experiences with focus on animation and user engagement.',
    },
    {
      year: '2020-2021',
      role: 'Junior Developer',
      company: 'StartUp Hub',
      description: 'Started career building web applications, learned modern web development practices.',
    },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border pb-2 mb-4">
        <div className="text-lg font-bold text-primary">Experience</div>
        <div className="text-xs text-muted-foreground">Professional timeline</div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative pl-4">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-6 relative">
              {/* Timeline dot */}
              <div className="absolute -left-2 top-1 w-3 h-3 bg-primary rounded-full border-2 border-background dark:border-slate-900" />

              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute -left-0.5 top-4 w-0.5 h-16 bg-border/50" />
              )}

              {/* Content */}
              <div className="ml-4">
                <div className="text-xs font-bold text-primary mb-1">{exp.year}</div>
                <div className="font-semibold text-foreground">{exp.role}</div>
                <div className="text-sm text-accent font-medium">{exp.company}</div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
