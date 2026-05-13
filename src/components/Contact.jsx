import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { toast, Toaster } from "sonner";
import ScrollReveal from "./ScrollReveal";
import { PERSONAL } from "../lib/data";

// const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const API = "";

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
      const { data } = await axios.post(`${API}/contact`, form);
      toast.success(data.message || "Message sent.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32" data-testid="contact-section">
      <Toaster theme="dark" position="bottom-right" richColors />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(255,107,0,0.16),transparent_55%)]" />

      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">Get in touch</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Let's build something{" "}
              <span className="text-gradient-flame">great together.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-zinc-400">
              Have a role, a project, or just a curious question? Drop a note — I usually reply
              within a day.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ScrollReveal delay={0.05} className="lg:col-span-5">
            <div className="h-full rounded-[28px] glass p-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 animate-pulse-glow rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                <span className="text-sm text-zinc-300">Available for internships</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                Reach out directly
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Prefer email? You can also message me on any social platform.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-flame">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Email
                    </div>
                    <a
                      href={`mailto:${PERSONAL.email}`}
                      className="text-sm text-white hover:text-flame"
                      data-testid="contact-email-link"
                    >
                      {PERSONAL.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-flame">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Location
                    </div>
                    <div className="text-sm text-white">{PERSONAL.location}</div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 rounded-2xl border border-flame/20 bg-flame/[0.04] p-4 text-xs text-zinc-300">
                <span className="text-flame">Tip</span> · Mention the role / project type and a
                rough timeline so I can tailor my response.
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-7">
            <form
              onSubmit={submit}
              className="relative overflow-hidden rounded-[28px] glass p-8"
              data-testid="contact-form"
            >
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-[28px] bg-gradient-to-br from-flame/20 via-transparent to-transparent opacity-40 blur-3xl" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="John Doe"
                  testid="contact-input-name"
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="john@company.com"
                  testid="contact-input-email"
                  required
                />
              </div>
              <div className="mt-5">
                <Field
                  label="Subject"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="Internship opportunity"
                  testid="contact-input-subject"
                />
              </div>
              <div className="mt-5">
                <TextArea
                  label="Message"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell me a bit about the role, project, or idea…"
                  testid="contact-input-message"
                  required
                />
              </div>

              <div className="mt-7 flex items-center justify-between">
                <p className="text-xs text-zinc-500">
                  By submitting you agree to be contacted about your inquiry.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-flame to-flame-light px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(255,107,0,0.35)] disabled:opacity-70"
                  data-testid="contact-submit-button"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                  {loading ? "Sending…" : "Send Message"}
                </motion.button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, testid, ...rest }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      <input
        {...rest}
        data-testid={testid}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-flame/60 focus:outline-none focus:ring-1 focus:ring-flame/40 transition-colors"
      />
    </label>
  );
}

function TextArea({ label, testid, ...rest }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      <textarea
        {...rest}
        rows={5}
        data-testid={testid}
        className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-flame/60 focus:outline-none focus:ring-1 focus:ring-flame/40 transition-colors"
      />
    </label>
  );
}