import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "../auth";
import { apiError } from "../adminApi";

export default function Login() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const a = await login(email.trim(), password);
      toast.success(`Welcome back, ${a.name.split(" ")[0]}!`);
    } catch (err) {
      toast.error(apiError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-app px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--accent-soft),transparent_60%)]" />
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl card p-9">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          DN
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold text-strong">Portfolio Admin</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage your portfolio content.</p>

        <label className="mt-7 block">
          <span className="block text-[11px] uppercase tracking-[0.16em] text-faint mb-2">Email</span>
          <input
            type="email" required autoComplete="username"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@portfolio.local"
            className="w-full rounded-xl card-2 px-3.5 py-2.5 text-sm text-strong placeholder:text-faint focus:border-accent focus:outline-none"
          />
        </label>
        <label className="mt-4 block">
          <span className="block text-[11px] uppercase tracking-[0.16em] text-faint mb-2">Password</span>
          <input
            type="password" required autoComplete="current-password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl card-2 px-3.5 py-2.5 text-sm text-strong placeholder:text-faint focus:border-accent focus:outline-none"
          />
        </label>

        <button
          type="submit" disabled={busy}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign in
        </button>
      </form>
    </div>
  );
}
