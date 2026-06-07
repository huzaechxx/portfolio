"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polygon points="10,2 18,18 2,18" fill="#ff5500" />
            </svg>
            <span className="font-sans font-bold text-xl text-white">
              AutoNord.ai
            </span>
          </div>
          <p className="text-[#444444] font-mono text-sm">
            Admin — sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#888888] font-mono text-xs uppercase tracking-widest mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-[#141414] border border-[#1f1f1f] focus:border-[#ff5500] text-white font-mono text-sm px-4 py-3 rounded-sm outline-none transition-colors"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-[#888888] font-mono text-xs uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#141414] border border-[#1f1f1f] focus:border-[#ff5500] text-white font-mono text-sm px-4 py-3 rounded-sm outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 font-mono text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff5500] text-white py-3 font-mono text-sm hover:bg-[#ff5500]/90 transition-all rounded-sm disabled:opacity-60 mt-2"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}
