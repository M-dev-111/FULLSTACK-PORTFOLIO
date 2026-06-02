import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { toast, Toaster } from "sonner";
import Reveal from "./Reveal";
import { PERSONAL } from "../lib/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://api.web3forms.com/submit", {
        ...form,
        access_key: PERSONAL.access_key,
        from_name: "Portfolio Contact Form",
      });

      if (response.data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(response.data.message || "Submission failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="cv-auto relative py-24 md:py-32" data-testid="contact-section">
      <Toaster theme="dark" position="top-center" richColors />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,var(--accent-soft),transparent_55%)]" />

      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal>
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Get in touch</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-strong sm:text-5xl lg:text-6xl">
              Let's build something <span className="text-gradient-accent">great together.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted">
              Have a role, a project, or just a curious question? Drop a note — I usually reply
              within a day, US or India time.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal delay={60} className="lg:col-span-5">
            <div className="h-full rounded-[28px] card p-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 animate-pulse-soft rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                <span className="text-sm text-strong">{PERSONAL.availability}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-strong">
                Reach out directly
              </h3>
              <p className="mt-2 text-sm text-muted">
                Prefer email? You can also message me on any social platform.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 rounded-2xl card-2 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-accent">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-faint">Email</div>
                    <a
                      href={`mailto:${PERSONAL.email}`}
                      className="text-sm text-strong hover:text-accent"
                      data-testid="contact-email-link"
                    >
                      {PERSONAL.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3 rounded-2xl card-2 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-accent">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-faint">Location</div>
                    <div className="text-sm text-strong">{PERSONAL.location}</div>
                  </div>
                </li>
              </ul>

              <div
                className="mt-8 rounded-2xl p-4 text-xs text-muted"
                style={{ border: "1px solid var(--accent-glow)", background: "var(--accent-soft)" }}
              >
                <span className="text-accent font-medium">Tip</span> · Mention the role / project type
                and a rough timeline so I can tailor my response.
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <form
              onSubmit={submit}
              className="relative overflow-hidden rounded-[28px] card p-8"
              data-testid="contact-form"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" value={form.name} onChange={update("name")} placeholder="John Doe" testid="contact-input-name" required />
                <Field label="Email" type="email" value={form.email} onChange={update("email")} placeholder="john@company.com" testid="contact-input-email" required />
              </div>
              <div className="mt-5">
                <Field label="Subject" value={form.subject} onChange={update("subject")} placeholder="Full Stack Developer role" testid="contact-input-subject" />
              </div>
              <div className="mt-5">
                <TextArea label="Message" value={form.message} onChange={update("message")} placeholder="Tell me a bit about the role, project, or idea…" testid="contact-input-message" required />
              </div>

              <div className="mt-7 flex items-center justify-between gap-4">
                <p className="text-xs text-faint">
                  By submitting you agree to be contacted about your inquiry.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="group inline-flex flex-none items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 10px 30px -10px rgba(99,102,241,0.7)" }}
                  data-testid="contact-submit-button"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                  {loading ? "Sending…" : "Send Message"}
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, testid, ...rest }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.18em] text-faint">{label}</span>
      <input
        {...rest}
        data-testid={testid}
        className="mt-2 w-full rounded-2xl card-2 px-4 py-3 text-sm text-strong placeholder:text-faint focus:border-accent focus:outline-none transition-colors"
      />
    </label>
  );
}

function TextArea({ label, testid, ...rest }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.18em] text-faint">{label}</span>
      <textarea
        {...rest}
        rows={5}
        data-testid={testid}
        className="mt-2 w-full resize-none rounded-2xl card-2 px-4 py-3 text-sm text-strong placeholder:text-faint focus:border-accent focus:outline-none transition-colors"
      />
    </label>
  );
}
