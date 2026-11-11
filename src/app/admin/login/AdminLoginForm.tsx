"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { TextField } from "@/components/forms/FormFields";

export default function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(params.get("expired") ? "Your session expired. Please sign in again." : "");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Enter both your username and password.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Sign-in failed. Please try again.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg === "Failed to fetch" ? "Cannot reach the server. Check your connection and try again." : msg);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      {error && (
        <div role="alert" className="flex items-start gap-2.5 rounded-lg bg-starehe-maroon-50 border border-starehe-maroon-200 px-3.5 py-3 text-sm text-starehe-maroon-900">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <TextField id="username" label="Username or email" value={username} onValue={setUsername} autoComplete="username" autoFocus />
      <TextField id="password" label="Password" type="password" value={password} onValue={setPassword} autoComplete="current-password" />
      <button
        type="submit"
        disabled={busy}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-starehe-blue-900 hover:bg-starehe-blue-800 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-starehe-blue-700 transition-colors"
      >
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

