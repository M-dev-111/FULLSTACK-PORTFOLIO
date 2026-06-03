import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authApi, apiError } from "../adminApi";
import { useAdminAuth } from "../auth";
import PageHeader from "../components/PageHeader";

const inputCls =
  "w-full rounded-xl card-2 px-3.5 py-2.5 text-sm text-strong placeholder:text-faint focus:border-accent focus:outline-none";

export default function SettingsPage() {
  const { admin } = useAdminAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await authApi.changePassword(current, next);
      toast.success("Password updated");
      setCurrent("");
      setNext("");
    } catch (err) {
      toast.error(apiError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader title="Settings" desc={`Signed in as ${admin?.email || ""}.`} />
      <form onSubmit={submit} className="max-w-md rounded-2xl card p-6 md:p-8">
        <h3 className="font-display text-lg font-semibold text-strong">Change password</h3>
        <label className="mt-5 block">
          <span className="block text-[11px] uppercase tracking-[0.16em] text-faint mb-2">Current password</span>
          <input type="password" required value={current} onChange={(e) => setCurrent(e.target.value)} className={inputCls} />
        </label>
        <label className="mt-4 block">
          <span className="block text-[11px] uppercase tracking-[0.16em] text-faint mb-2">New password (min 8 chars)</span>
          <input type="password" required minLength={8} value={next} onChange={(e) => setNext(e.target.value)} className={inputCls} />
        </label>
        <button type="submit" disabled={busy}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Update password
        </button>
      </form>
    </div>
  );
}
