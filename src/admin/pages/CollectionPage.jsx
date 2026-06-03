import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, GripVertical, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { RESOURCES, blankRecord } from "../config";
import { resourceApi, apiError } from "../adminApi";
import FormModal from "../components/FormModal";
import PageHeader from "../components/PageHeader";

export default function CollectionPage({ resource }) {
  const cfg = RESOURCES[resource];
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null); // record | "new" | null
  const dragIndex = useRef(null);

  const load = useCallback(
    () => resourceApi.list(resource).then(setItems).catch((e) => { toast.error(apiError(e)); setItems([]); }),
    [resource]
  );

  useEffect(() => { load(); }, [load]);

  const save = async (values) => {
    try {
      if (editing === "new") await resourceApi.create(resource, values);
      else await resourceApi.update(resource, editing.id, values);
      toast.success(editing === "new" ? "Created" : "Saved");
      setEditing(null);
      load();
    } catch (e) {
      toast.error(apiError(e));
    }
  };

  const remove = async (item) => {
    const name = prim(cfg, item) || "this item";
    if (!confirm(`Delete “${name}”? This cannot be undone.`)) return;
    try { await resourceApi.remove(resource, item.id); toast.success("Deleted"); load(); }
    catch (e) { toast.error(apiError(e)); }
  };

  /* drag reorder */
  const onDrop = async (i) => {
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from == null || from === i) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(i, 0, moved);
    setItems(next);
    try { await resourceApi.reorder(resource, next.map((x) => x.id)); }
    catch (e) { toast.error(apiError(e)); load(); }
  };

  return (
    <div>
      <PageHeader
        title={cfg.label}
        desc={cfg.desc}
        action={
          <button onClick={() => setEditing("new")}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <Plus className="h-4 w-4" /> New
          </button>
        }
      />

      {items === null ? (
        <Center><Loader2 className="h-5 w-5 animate-spin text-accent" /></Center>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-subtle py-16 text-center text-faint">
          No {cfg.label.toLowerCase()} yet. Click “New” to add one.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li
              key={item.id}
              draggable
              onDragStart={() => (dragIndex.current = i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className="flex items-center gap-4 rounded-2xl card p-4"
            >
              <GripVertical className="h-5 w-5 flex-none cursor-grab text-faint" />
              {cfg.thumb && item[cfg.thumb] && (
                <img src={item[cfg.thumb]} alt="" className="h-11 w-16 flex-none rounded-lg object-cover card-2" />
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-strong">{prim(cfg, item) || "(untitled)"}</div>
                {sec(cfg, item) && <div className="mt-0.5 line-clamp-2 text-sm text-muted">{sec(cfg, item)}</div>}
                {Array.isArray(item.tags) && item.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 6).map((t) => (
                      <span key={t} className="rounded-full card-2 px-2.5 py-0.5 text-xs text-muted">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-none gap-1.5">
                <button onClick={() => setEditing(item)} className="rounded-lg p-2 text-muted hover:card-2 hover:text-strong" title="Edit">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => remove(item)} className="rounded-lg p-2 text-rose-400 hover:bg-rose-500/10" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <FormModal
          title={`${editing === "new" ? "New" : "Edit"} ${cfg.singular}`}
          fields={cfg.fields}
          initial={editing === "new" ? blankRecord(cfg.fields) : pick(cfg.fields, editing)}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

const prim = (cfg, item) => (typeof cfg.primary === "function" ? cfg.primary(item) : item[cfg.primary]);
const sec = (cfg, item) => (typeof cfg.secondary === "function" ? cfg.secondary(item) : item[cfg.secondary]);
const pick = (fields, obj) => Object.fromEntries(fields.map((f) => [f.key, obj[f.key] ?? blankVal(f)]));
const blankVal = (f) => (f.type === "tags" || f.type === "skills" ? [] : f.type === "bool" ? false : f.type === "group" ? {} : "");

function Center({ children }) {
  return <div className="grid place-items-center py-20">{children}</div>;
}
