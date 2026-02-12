import React, { useEffect, useState } from "react";

export default function CVPage() {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/cv")
      .then((r) => r.json())
      .then((d) => setContent(d.content || ""));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setSaving(false);
    alert("CV saved");
  }

  function downloadTxt() {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CV.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">My CV</h2>
        <form onSubmit={save} className="space-y-3 bg-white p-4 rounded card">
          <label className="block text-sm text-gray-600">CV Content</label>
          <textarea
            className="w-full p-3 border rounded h-64"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {saving ? "Saving..." : "Save CV"}
            </button>
            <button
              type="button"
              onClick={downloadTxt}
              className="px-4 py-2 border rounded"
            >
              Download .txt
            </button>
          </div>
        </form>
      </div>

      <aside className="bg-white p-4 rounded card">
        <h3 className="text-lg font-semibold mb-2">Preview</h3>
        <div className="prose text-sm text-gray-800 whitespace-pre-wrap">
          {content || "No CV content yet. Use the editor to add your CV."}
        </div>
      </aside>
    </div>
  );
}
