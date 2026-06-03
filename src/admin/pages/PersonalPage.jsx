import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PERSONAL_FIELDS } from "../config";
import { personalApi, apiError } from "../adminApi";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";

export default function PersonalPage() {
  const [values, setValues] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    personalApi
      .get()
      .then((d) => setValues({ ...d, socials: d.socials || {} }))
      .catch((e) => toast.error(apiError(e)));
  }, []);

  const setField = (key, v) => setValues((prev) => ({ ...prev, [key]: v }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = PERSONAL_FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: values[f.key] }), {});
      const updated = await personalApi.update(payload);
      setValues({ ...updated, socials: updated.socials || {} });
      toast.success("Saved");
    } catch (e) {
      toast.error(apiError(e));
    } finally {
      setSaving(false);
    }
  };

  if (!values) {
    return (
      <div className="grid place-items-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Personal" desc="Hero, contact details and social links — shown across the whole site." />
      <div className="rounded-2xl card p-6 md:p-8">
        {PERSONAL_FIELDS.map((f) => (
          <Field key={f.key} field={f} value={values[f.key]} onChange={(v) => setField(f.key, v)} />
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save changes
        </button>
      </div>
    </div>
  );
}
