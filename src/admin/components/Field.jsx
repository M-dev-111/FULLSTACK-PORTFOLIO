import { useState } from "react";
import { Upload, Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { uploadFile, apiError } from "../adminApi";

const inputCls =
  "w-full rounded-xl card-2 px-3.5 py-2.5 text-sm text-strong placeholder:text-faint focus:border-accent focus:outline-none transition-colors";
const labelCls = "block text-[11px] uppercase tracking-[0.16em] text-faint mb-2";

/** A single controlled admin field. Calls onChange with the new value. */
export default function Field({ field, value, onChange }) {
  const f = field;

  if (f.type === "bool") {
    return (
      <label className="mb-4 flex items-center gap-3 text-sm text-strong">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-[var(--color-accent)]"
        />
        {f.label}
      </label>
    );
  }

  return (
    <label className="mb-4 block">
      <span className={labelCls}>{f.label}</span>
      {renderControl()}
      {f.help && <span className="mt-1.5 block text-xs text-faint">{f.help}</span>}
    </label>
  );

  function renderControl() {
    switch (f.type) {
      case "textarea":
        return (
          <textarea
            rows={4}
            value={value || ""}
            placeholder={f.placeholder || ""}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} resize-y`}
          />
        );
      case "select":
        return (
          <select value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputCls}>
            {(f.options || []).map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        );
      case "tags":
        return <TagsInput value={value} onChange={onChange} placeholder={f.placeholder} />;
      case "skills":
        return <SkillsEditor value={value} onChange={onChange} />;
      case "group":
        return <GroupEditor field={f} value={value} onChange={onChange} />;
      case "image":
      case "file":
        return <UploadInput field={f} value={value} onChange={onChange} />;
      default:
        return (
          <input
            type="text"
            value={value ?? ""}
            placeholder={f.placeholder || ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
          />
        );
    }
  }
}

function TagsInput({ value = [], onChange, placeholder }) {
  const arr = Array.isArray(value) ? value : [];
  const [text, setText] = useState("");
  const add = () => {
    const v = text.trim();
    if (!v) return;
    onChange([...arr, v]);
    setText("");
  };
  return (
    <div>
      <div className="flex gap-2">
        <input
          value={text}
          placeholder={placeholder || "Type and press Enter"}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          className={inputCls}
        />
        <button type="button" onClick={add} className="flex-none rounded-xl card-2 px-3 text-strong hover:border-accent">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {arr.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {arr.map((t, i) => (
            <span key={`${t}-${i}`} className="inline-flex items-center gap-1.5 rounded-full card-2 px-3 py-1 text-xs text-muted">
              {t}
              <button type="button" onClick={() => onChange(arr.filter((_, idx) => idx !== i))} className="text-faint hover:text-accent">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SkillsEditor({ value = [], onChange }) {
  const items = Array.isArray(value) ? value : [];
  const set = (i, patch) => onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={it.name || ""}
            placeholder="Skill name"
            onChange={(e) => set(i, { name: e.target.value })}
            className={inputCls}
          />
          <input
            type="number" min="0" max="100"
            value={it.level ?? 80}
            onChange={(e) => set(i, { level: Number(e.target.value) })}
            className={`${inputCls} w-24 flex-none`}
          />
          <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="flex-none rounded-xl px-3 py-2 text-rose-400 hover:bg-rose-500/10">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { name: "", level: 80 }])}
        className="inline-flex items-center gap-1.5 rounded-full card-2 px-3 py-1.5 text-xs text-strong hover:border-accent">
        <Plus className="h-3.5 w-3.5" /> Add skill
      </button>
    </div>
  );
}

function GroupEditor({ field, value = {}, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
      {field.fields.map((sf) => (
        <Field key={sf.key} field={sf} value={value?.[sf.key]} onChange={(v) => onChange({ ...value, [sf.key]: v })} />
      ))}
    </div>
  );
}

function UploadInput({ field, value, onChange }) {
  const [busy, setBusy] = useState(false);
  const onPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const res = await uploadFile(file);
      onChange(res.url);
      toast.success("Uploaded");
    } catch (err) {
      toast.error(apiError(err));
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };
  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value || ""}
          placeholder={field.type === "image" ? "https://… or upload" : "/resume.pdf or upload"}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
        <label className="flex flex-none cursor-pointer items-center gap-1.5 rounded-xl card-2 px-3 text-sm text-strong hover:border-accent">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <input type="file" accept={field.accept || "image/*"} onChange={onPick} className="hidden" />
        </label>
      </div>
      {field.type === "image" && value && (
        <img src={value} alt="" className="mt-2 max-h-28 rounded-lg border border-subtle" />
      )}
    </div>
  );
}
