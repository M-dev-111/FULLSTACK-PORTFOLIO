import { useCallback, useEffect, useState } from "react";
import { Loader2, Trash2, MailOpen, Mail, Reply } from "lucide-react";
import { toast } from "sonner";
import { messagesApi, apiError } from "../adminApi";
import PageHeader from "../components/PageHeader";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "read", label: "Read" },
];

export default function MessagesPage() {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState("all");

  const load = useCallback(
    () => messagesApi.list(filter).then((r) => setItems(r.data)).catch((e) => { toast.error(apiError(e)); setItems([]); }),
    [filter]
  );

  useEffect(() => { load(); }, [load]);

  const toggleRead = async (m) => {
    try { await messagesApi.update(m.id, { read: !m.read }); load(); }
    catch (e) { toast.error(apiError(e)); }
  };

  const remove = async (m) => {
    if (!confirm("Delete this message?")) return;
    try { await messagesApi.remove(m.id); toast.success("Deleted"); load(); }
    catch (e) { toast.error(apiError(e)); }
  };

  return (
    <div>
      <PageHeader title="Messages" desc="Contact-form submissions from your site." />

      <div className="mb-5 flex gap-2">
        {FILTERS.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              filter === f.key ? "text-white" : "card-2 text-muted hover:text-strong"
            }`}
            style={filter === f.key ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)" } : undefined}>
            {f.label}
          </button>
        ))}
      </div>

      {items === null ? (
        <div className="grid place-items-center py-20"><Loader2 className="h-5 w-5 animate-spin text-accent" /></div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-subtle py-16 text-center text-faint">No messages.</div>
      ) : (
        <ul className="space-y-3">
          {items.map((m) => (
            <li key={m.id} className={`rounded-2xl card p-5 ${!m.read ? "border-accent" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-medium text-strong">
                    {m.name}
                    {!m.read && <span className="rounded-full px-2 py-0.5 text-[11px] text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>new</span>}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-sm text-accent hover:underline">{m.email}</a>
                </div>
                <div className="flex flex-none gap-1.5">
                  <button onClick={() => toggleRead(m)} className="rounded-lg p-2 text-muted hover:card-2 hover:text-strong" title={m.read ? "Mark unread" : "Mark read"}>
                    {m.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  </button>
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.subject || "Your message"))}`}
                    className="rounded-lg p-2 text-muted hover:card-2 hover:text-strong" title="Reply">
                    <Reply className="h-4 w-4" />
                  </a>
                  <button onClick={() => remove(m)} className="rounded-lg p-2 text-rose-400 hover:bg-rose-500/10" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {m.subject && <div className="mt-3 text-sm font-medium text-strong">{m.subject}</div>}
              <p className="mt-1 whitespace-pre-line text-sm text-muted">{m.message}</p>
              <div className="mt-3 text-xs text-faint">{new Date(m.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
