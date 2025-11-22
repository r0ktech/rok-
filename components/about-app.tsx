"use client";

export function AboutApp() {
  return (
    <div className="h-full flex flex-col font-mono">
      {/* Notepad style header */}
      <div className="border-b border-border pb-2 mb-4">
        <div className="text-lg font-bold text-primary">About Me</div>
        <div className="text-xs text-muted-foreground italic">Notepad</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto text-sm leading-relaxed">
        <p className="mb-4">
          Hi👋, I'm Raphael Okeke, I'm a full-stack developer and creative
          technologist passionate about building beautiful, interactive digital
          experiences.
        </p>
        <p className="mb-4">
          With a background in design and development, I bridge the gap between
          aesthetics and functionality. I love exploring new technologies and
          bringing innovative ideas to life.
        </p>
        <p className="mb-4">My expertise spans:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Modern web development with React, Next.js, and TypeScript</li>
          <li>Full-stack architecture and database design</li>
          <li>Interactive UI/UX design and implementation</li>
          <li>Performance optimization and accessibility</li>
          <li>Creative experiments and unique digital concepts</li>
        </ul>
        <p className="mb-4">
          When I'm not coding, you can find me exploring design trends,
          experimenting with new tools, or working on passion projects. I
          believe in continuous learning and pushing the boundaries of what's
          possible on the web.
        </p>
        <p>
          Let's build something amazing together! Feel free to explore this
          portfolio and reach out if you'd like to collaborate.
        </p>
      </div>
    </div>
  );
}
