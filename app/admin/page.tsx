"use client";

import useSWR from "swr";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Entry = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  town_description: string;
  status: string;
  dresses_too: string;
  locale: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");

  const { data, isLoading, mutate } = useSWR<{ entries: Entry[] }>(
    authed ? "/api/admin/waitlist" : null,
    fetcher
  );

  const login = async () => {
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (res.ok) {
      setAuthed(true);
      mutate();
    } else {
      setError("Invalid password");
    }
  };

  const downloadCsv = async () => {
    const res = await fetch("/api/admin/waitlist/export");
    if (!res.ok) return;
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "waitlist.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-sm space-y-4 rounded-3xl border border-foreground/10 bg-background p-6 shadow-lg">
          <h1 className="text-lg font-semibold text-foreground">Admin login</h1>
          <div className="space-y-2">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <Button onClick={login} disabled={!password}>
            Log in
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-foreground">
            Waitlist entries ({data?.entries.length ?? 0})
          </h1>
          <Button variant="outline" onClick={downloadCsv}>
            Download CSV
          </Button>
        </div>
        {isLoading && <p className="text-sm text-foreground/70">Loading…</p>}
        {data && (
          <div className="overflow-x-auto rounded-2xl border border-foreground/10 bg-background shadow-sm">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-foreground/10 bg-muted/40 text-foreground/80">
                <tr>
                  <th className="px-3 py-2">Created</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">Town</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Dresses too</th>
                  <th className="px-3 py-2">Locale</th>
                </tr>
              </thead>
              <tbody>
                {data.entries.map((entry) => (
                  <tr key={entry.id} className="border-b border-foreground/5">
                    <td className="px-3 py-2">
                      {new Date(entry.created_at).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">
                      {entry.first_name} {entry.last_name}
                    </td>
                    <td className="px-3 py-2">{entry.email}</td>
                    <td className="px-3 py-2">{entry.phone}</td>
                    <td className="px-3 py-2">{entry.town_description}</td>
                    <td className="px-3 py-2">{entry.status}</td>
                    <td className="px-3 py-2">{entry.dresses_too}</td>
                    <td className="px-3 py-2">{entry.locale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

