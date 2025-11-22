"use client";

import { useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  year: number;
}

export function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      name: "AI Design System",
      description:
        "An intelligent design system that uses AI to generate component variations and optimize layouts based on content.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      year: 2024,
    },
    {
      id: "2",
      name: "Real-time Collaboration Tool",
      description:
        "Multi-user workspace for collaborative design and development with live updates and conflict resolution.",
      tech: ["Next.js", "WebSockets", "React"],
      year: 2023,
    },
    {
      id: "3",
      name: "Animated Component Library",
      description:
        "Comprehensive library of highly animated, accessible React components with smooth transitions.",
      tech: ["React", "Framer Motion", "TypeScript"],
      year: 2023,
    },
    {
      id: "4",
      name: "Data Visualization Dashboard",
      description:
        "Interactive dashboard for real-time data analysis with custom charts and performance metrics.",
      tech: ["React", "Next.js", "PostgreSQL"],
      year: 2023,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border pb-2 mb-4">
        <div className="text-lg font-bold text-primary">Projects</div>
        <div className="text-xs text-muted-foreground">
          {projects.length} items
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex gap-4">
        {/* Project list */}
        <div className="flex-1 overflow-y-auto border-r border-border pr-4">
          <div className="space-y-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedProject?.id === project.id
                    ? "bg-primary/20 border border-primary"
                    : "hover:bg-muted border border-border/50"
                }`}
              >
                <div className="font-semibold text-sm">{project.name}</div>
                <div className="text-xs text-muted-foreground">
                  {project.year}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Project details */}
        <div className="flex-1 overflow-y-auto pl-4">
          {selectedProject ? (
            <div className="space-y-3">
              <div>
                <div className="text-lg font-bold text-primary mb-1">
                  {selectedProject.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedProject.year}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground mb-2">
                  Description
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground mb-2">
                  Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <div className="text-lg font-semibold text-muted-foreground mb-2">
                  Select a project
                </div>
                <p className="text-sm text-muted-foreground">
                  Click on a project to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
