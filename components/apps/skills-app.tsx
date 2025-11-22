"use client";

export function SkillsApp() {
  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        "Html",
        "CSS",
        "JavaScript",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      name: "Backend",
      skills: [
        "Node.js",
        "Express",
        "MySQL",
        "API Design",
        "WebSockets",
        "Authentication",
      ],
    },
    {
      name: "Tools & DevOps",
      skills: ["Git", "GitHub", "Vercel", "Heroku", "Postman"],
    },
    {
      name: "Design",
      skills: ["Figma", "UI/UX Design"],
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border pb-2 mb-4">
        <div className="text-lg font-bold text-primary">Skills</div>
        <div className="text-xs text-muted-foreground">
          Organized by category
        </div>
      </div>

      {/* Skills grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="border border-border/50 rounded-lg p-3 bg-muted/20"
            >
              <h3 className="font-bold text-primary mb-3">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 bg-gradient-to-r from-primary/30 to-accent/30 border border-primary/20 rounded text-sm text-foreground hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
