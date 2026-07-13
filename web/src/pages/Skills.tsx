import React from "react";

const categories = [
  {
    title: "Frontend Development",
    items: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript (ES6+)", "HTML5 / CSS3", "SCSS/SASS", "Tailwind CSS"],
  },
  {
    title: "Backend & Databases",
    items: ["Node.js", "Express.js", "PHP", "REST API development", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Tools, DevOps & Automation",
    items: ["Git/GitHub", "Docker", "CI/CD fundamentals", "n8n", "Zapier", "Make.com", "Airtable", "Figma", "ElevenLabs"],
  },
];

const allSkills = [
  { name: "JavaScript", icon: "⚡" },
  { name: "TypeScript", icon: "T" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "⏭️" },
  { name: "Vue.js", icon: "V" },
  { name: "HTML5/CSS3", icon: "<>" },
  { name: "Tailwind CSS", icon: "▦" },
  { name: "Node.js", icon: "⬢" },
  { name: "Express.js", icon: "E" },
  { name: "PHP", icon: "🐘" },
  { name: "REST APIs", icon: "🌐" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Git/GitHub", icon: "🔧" },
  { name: "Docker", icon: "🐳" },
  { name: "CI/CD", icon: "🔄" },
  { name: "n8n", icon: "🤖" },
  { name: "Zapier", icon: "⚡" },
  { name: "Make.com", icon: "🔗" },
  { name: "Airtable", icon: "📋" },
  { name: "Figma", icon: "🎨" },
  { name: "ElevenLabs", icon: "🎙️" },
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
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              {c.title}
            </h3>
            <ul className="space-y-2 text-gray-300">
              {c.items.map((it) => (
                <li key={it} className="flex items-center gap-3">
                  <span className="text-blue-400">•</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-blue-400 font-semibold mb-2">All Skills</h4>
        <div className="skill-marquee">
          <div className="skill-track">
            {allSkills.concat(allSkills).map((s, idx) => (
              <div
                key={s.name + idx}
                className="inline-flex items-center gap-3 px-4 py-2 bg-gray-700 text-gray-100 rounded-full shadow"
              >
                <span className="text-blue-400 text-lg">{s.icon}</span>
                <span className="whitespace-nowrap">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
