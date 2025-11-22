"use client";

export function ExperienceApp() {
  const experiences = [
    {
      year: "Sept 2025 - Nov 2025",
      role: "Backend Developer Intern",
      company: "Apex Technology Hub & Services.",
      description:
        "Worked as a Back-End Developer Intern where I helped develop and maintain server-side logic, build APIs, and support database operations. I collaborated with the engineering team to improve performance, ensure data reliability, and contribute to backend features that supported real user workloads.",
    },
    {
      year: "2022-2023",
      role: "Front-End Developer",
      company: "Elegant Computers",
      description:
        "Worked as a Front-End Developer where I built responsive user interfaces, improved website performance, and collaborated with design and backend teams to deliver smooth, high-quality user experiences. I focused on clean code, modern frameworks, and creating interfaces that are visually appealing and easy to use..",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border pb-2 mb-4">
        <div className="text-lg font-bold text-primary">Experience</div>
        <div className="text-xs text-muted-foreground">
          Professional timeline
        </div>
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
                <div className="text-xs font-bold text-primary mb-1">
                  {exp.year}
                </div>
                <div className="font-semibold text-foreground">{exp.role}</div>
                <div className="text-sm text-accent font-medium">
                  {exp.company}
                </div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
