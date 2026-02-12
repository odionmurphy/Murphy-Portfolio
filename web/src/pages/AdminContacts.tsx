import React, { useEffect, useState } from "react";

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    try {
      return Boolean(sessionStorage.getItem("admin_token_v1"));
    } catch (e) {
      return false;
    }
  });
  const [tokenInput, setTokenInput] = useState("");

  const apiBase =
    typeof window !== "undefined" && window.location.port === "5173"
      ? "http://localhost:4000"
      : "";

  async function loadContacts() {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("admin_token_v1");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(`${apiBase}/api/contact`, { headers });
      if (res.status === 401) {
        // token invalid
        sessionStorage.removeItem("admin_token_v1");
        setAuthenticated(false);
        setContacts([]);
        return;
      }
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (e) {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authenticated) loadContacts();
  }, [authenticated]);

  function tryAuth() {
    // Save token to sessionStorage and attempt to load contacts.
    try {
      sessionStorage.setItem("admin_token_v1", tokenInput);
    } catch (e) {}
    setAuthenticated(true);
    loadContacts();
  }

  async function deleteContact(id: number) {
    if (!confirm("Delete contact #" + id + "?")) return;
    try {
      const token = sessionStorage.getItem("admin_token_v1");
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(`${apiBase}/api/contact/${id}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        setContacts((c) => c.filter((x) => x.id !== id));
      } else if (res.status === 401) {
        alert("Unauthorized — token invalid. Please re-enter token.");
        sessionStorage.removeItem("admin_token_v1");
        setAuthenticated(false);
      } else {
        alert("Failed to delete");
      }
    } catch (e) {
      alert("Network error");
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6">Admin — Contacts</h2>

      {!authenticated ? (
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg">
          <p className="text-gray-300 mb-3">Admin token required</p>
          <div className="flex gap-2">
            <input
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="flex-1 p-2 bg-gray-700 rounded"
              placeholder="paste admin token"
              type="password"
            />
            <button
              onClick={tryAuth}
              className="px-3 py-2 bg-yellow-400 rounded"
            >
              Unlock
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Token is stored in session only.
          </p>
        </div>
      ) : loading ? (
        <div className="text-gray-300">Loading…</div>
      ) : contacts.length === 0 ? (
        <div className="text-gray-400">No contacts yet.</div>
      ) : (
        <div className="overflow-auto bg-gray-800 rounded-lg p-4">
          <table className="w-full text-left text-gray-200">
            <thead>
              <tr className="text-sm text-gray-400">
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Message</th>
                <th className="px-3 py-2">Created</th>
                <th className="px-3 py-2"> </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="align-top border-t border-gray-700">
                  <td className="px-3 py-3 text-sm">{c.id}</td>
                  <td className="px-3 py-3 text-sm">{c.name}</td>
                  <td className="px-3 py-3 text-sm">{c.email}</td>
                  <td className="px-3 py-3 text-sm">{c.message}</td>
                  <td className="px-3 py-3 text-sm text-gray-400">
                    {c.created_at || "-"}
                  </td>
                  <td className="px-3 py-3 text-sm">
                    <button
                      onClick={() => deleteContact(c.id)}
                      className="px-3 py-1 bg-red-600 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
