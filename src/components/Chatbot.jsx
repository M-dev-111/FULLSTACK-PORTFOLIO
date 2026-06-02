import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { GREETING, getBotResponse } from "../lib/chatbot";
import { PERSONAL } from "../lib/data";

function runAction(action) {
  if (action === "scroll-contact" || action === "open contact form") {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  } else if (action === "download-resume") {
    const link = document.createElement("a");
    link.href = PERSONAL.resumeUrl;
    link.download = "Dibyendu_Nayak_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: GREETING.text, chips: GREETING.chips },
  ]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    const reply = getBotResponse(text);
    // also let chip labels that map to actions trigger them
    const lowered = text.toLowerCase();
    if (lowered.includes("download") && lowered.includes("resume")) reply.action = "download-resume";

    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: reply.text, chips: reply.chips }]);
      if (reply.action) setTimeout(() => runAction(reply.action), 400);
    }, 650);
  };

  const onChip = (label) => {
    // chip labels can also be direct actions
    const l = label.toLowerCase();
    if (l.includes("contact form")) {
      send(label);
      runAction("scroll-contact");
      return;
    }
    send(label);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        data-testid="chatbot-launcher"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-[80] inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_12px_40px_-8px_rgba(99,102,241,0.8)] md:bottom-7 md:right-7"
        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
      >
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[80] flex h-[min(560px,72vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[26px] card-solid md:bottom-28 md:right-7"
            data-testid="chatbot-panel"
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-display text-sm font-bold">
                DN
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Dibyendu's Assistant</p>
                <p className="text-[11px] text-white/80">Usually replies instantly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scrollbar-none">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col gap-2 ${m.from === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-md text-white"
                        : "rounded-bl-md card-2 text-strong"
                    }`}
                    style={m.from === "user" ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)" } : undefined}
                  >
                    {m.text}
                  </div>
                  {m.from === "bot" && m.chips?.length > 0 && i === messages.length - 1 && !typing && (
                    <div className="flex flex-wrap gap-2">
                      {m.chips.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => onChip(c)}
                          className="rounded-full border border-accent px-3 py-1.5 text-xs text-accent transition-colors hover:bg-[var(--accent-soft)]"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md card-2 px-3.5 py-3 w-fit">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-[var(--text-faint)]"
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-subtle px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                data-testid="chatbot-input"
                className="min-w-0 flex-1 rounded-full card-2 px-4 py-2.5 text-sm text-strong placeholder:text-faint focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full text-white transition-opacity disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
