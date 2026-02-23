import React from "react";

const categories = [
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git/GitHub", "VS Code", "Figma", "Vite", "npm"],
  },
  {
    title: "Soft Skills",
    items: ["Problem Solving", "Communication", "Team Work", "Time Management"],
  },
];

const allSkills = [
   { name: "Ai-Automation", icon: "🤖" },
  { name: "JavaScript", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "T" },
  { name: "Tailwind CSS", icon: "▦" },
  { name: "HTML/CSS", icon: "<>" },
  { name: "Node.js", icon: "⬢" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "🔧" },
  { name: "Figma", icon: "🎨" },
  { name: "Vite", icon: "⚡" },
  { name: "Testing", icon: "✅" },
 
  { name: "Accessibility", icon: "♿" },
  { name: "Performance", icon: "🚀" },
  { name: "Next.js", icon: "⏭️" },
  { name: "GraphQL", icon: "🔗" },
  { name: "REST APIs", icon: "🌐" },
  { name: "CI/CD", icon: "🔄" },
  { name: "Webpack", icon: "📦" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "PHP", icon: "🐘" },
  { name: "wordpress", icon: "W" },
  { name: "SEO", icon: "🔍" },
  { name: "laravel", icon: "L" },
  


];

export default function Skills() {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {categories.map((c) => (
          <div
            key={c.title}
            className="p-6 bg-gray-800 rounded-lg text-gray-200"
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              {c.title}
            </h3>
            <ul className="space-y-2 text-gray-300">
              {c.items.map((it) => (
                <li key={it} className="flex items-center gap-3">
                  <span className="text-yellow-400">•</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-yellow-400 font-semibold mb-2">All Skills</h4>
        <div className="skill-marquee">
          <div className="skill-track">
            {allSkills.concat(allSkills).map((s, idx) => (
              <div
                key={s.name + idx}
                className="inline-flex items-center gap-3 px-4 py-2 bg-gray-700 text-gray-100 rounded-full shadow"
              >
                <span className="text-yellow-400 text-lg">{s.icon}</span>
                <span className="whitespace-nowrap">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
