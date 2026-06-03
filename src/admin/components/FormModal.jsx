import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import Field from "./Field";

/**
 * Modal with a config-driven form. `fields` is an array of field defs,
 * `initial` the starting values. Calls onSave(values) (may be async).
 */
export default function FormModal({ title, fields, initial, onClose, onSave }) {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const setField = (key, v) => setValues((prev) => ({ ...prev, [key]: v }));

  const save = async () => {
    setSaving(true);
    try {
      await onSave(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] grid place-items-center bg-black/60 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl card-solid">
        <div className="flex items-center justify-between border-b border-subtle px-6 py-4">
          <h3 className="font-display text-lg font-semibold text-strong">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-faint hover:bg-[var(--surface-2)] hover:text-strong">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {fields.map((f) => (
            <Field key={f.key} field={f} value={values[f.key]} onChange={(v) => setField(f.key, v)} />
          ))}
        </div>

        <div className="flex justify-end gap-3 border-t border-subtle px-6 py-4">
          <button onClick={onClose} className="rounded-full card-2 px-5 py-2.5 text-sm text-strong hover:border-accent">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
