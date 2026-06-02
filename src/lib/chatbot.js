import { PERSONAL, SKILLS, PROJECTS, JOURNEY, SERVICES } from "./data";

/**
 * Lightweight, fully client-side assistant.
 * Matches the visitor's message against intents and answers from portfolio data.
 * No API key, no backend, no cost — instant and private.
 */

const allSkills = SKILLS.flatMap((g) => g.items.map((i) => i.name));

export const GREETING = {
  text: `Hi! 👋 I'm Dibyendu's assistant. Ask me about his skills, projects, experience, or how to get in touch.`,
  chips: ["What can he build?", "Show projects", "Tech skills", "Hire / availability", "Contact"],
};

const INTENTS = [
  {
    keys: ["hi", "hello", "hey", "yo", "greetings", "good morning", "good evening"],
    answer: () => ({
      text: `Hey there! 😊 I can tell you about ${PERSONAL.name} — his skills, projects, experience, or how to reach him. What would you like to know?`,
      chips: ["Tech skills", "Show projects", "Experience", "Contact"],
    }),
  },
  {
    keys: ["who", "about", "yourself", "introduce", "bio", "tell me about"],
    answer: () => ({
      text: `${PERSONAL.name} is a ${PERSONAL.role} based in ${PERSONAL.location}, building fast, production-grade web apps with React and the MERN stack. ${PERSONAL.availability}.`,
      chips: ["Tech skills", "Show projects", "Hire him"],
    }),
  },
  {
    keys: ["skill", "tech", "stack", "language", "framework", "tools", "know", "expertise", "technolog"],
    answer: () => ({
      text:
        `Here's his toolkit:\n\n` +
        SKILLS.map((g) => `• ${g.group}: ${g.items.map((i) => i.name).join(", ")}`).join("\n") +
        `\n\nStrongest in React, Tailwind & the MERN stack.`,
      chips: ["Show projects", "Services", "Hire him"],
    }),
  },
  {
    keys: ["project", "work", "portfolio", "built", "build", "made", "app", "showcase"],
    answer: () => ({
      text:
        `He's shipped these recently:\n\n` +
        PROJECTS.map((p) => `🔹 ${p.title} — ${p.summary}\n   Stack: ${p.tags.join(", ")}`).join("\n\n"),
      chips: ["Tech skills", "Services", "Contact"],
    }),
  },
  {
    keys: ["experience", "journey", "career", "background", "education", "study", "job", "company", "worked"],
    answer: () => ({
      text:
        `His journey so far:\n\n` +
        JOURNEY.map((j) => `📅 ${j.year} — ${j.title}\n   ${j.body}`).join("\n\n"),
      chips: ["Tech skills", "Show projects", "Hire him"],
    }),
  },
  {
    keys: ["service", "offer", "help", "do for", "provide", "can he", "what can"],
    answer: () => ({
      text:
        `He can help with:\n\n` +
        SERVICES.map((s) => `✨ ${s.title} — ${s.desc}`).join("\n"),
      chips: ["Show projects", "Hire him", "Contact"],
    }),
  },
  {
    keys: ["hire", "available", "availability", "freelance", "open to", "looking", "join", "recruit", "opportunit", "remote"],
    answer: () => ({
      text: `Yes — he's open to roles and freelance work! ${PERSONAL.availability}, collaborating with teams in the US 🇺🇸 and India 🇮🇳. The fastest way to reach him is email: ${PERSONAL.email}.`,
      chips: ["Contact", "Download resume", "Show projects"],
    }),
  },
  {
    keys: ["contact", "email", "reach", "message", "get in touch", "linkedin", "github", "instagram", "social"],
    answer: () => ({
      text: `You can reach ${PERSONAL.name} here:\n\n📧 Email: ${PERSONAL.email}\n💼 LinkedIn: ${PERSONAL.socials.linkedin}\n💻 GitHub: ${PERSONAL.socials.github}\n\nOr use the contact form at the bottom of the page.`,
      chips: ["Open contact form", "Download resume", "Hire him"],
      action: "scroll-contact",
    }),
  },
  {
    keys: ["resume", "cv", "download"],
    answer: () => ({
      text: `Sure — you can download his resume right now. 📄`,
      chips: ["Contact", "Show projects"],
      action: "download-resume",
    }),
  },
  {
    keys: ["location", "where", "based", "country", "timezone", "time zone", "india", "usa", "us "],
    answer: () => ({
      text: `He's based in ${PERSONAL.location} and works across US 🇺🇸 and India 🇮🇳 time zones — flexible for remote collaboration.`,
      chips: ["Hire him", "Contact"],
    }),
  },
  {
    keys: ["react", "frontend", "front end"],
    answer: () => ({
      text: `React is his core strength — he builds component-driven UIs with React 19, Tailwind CSS v4, and tools like TanStack Query. He also works with React Native for mobile.`,
      chips: ["Show projects", "Full skill list", "Hire him"],
    }),
  },
  {
    keys: ["backend", "node", "mongo", "express", "api", "database", "server"],
    answer: () => ({
      text: `On the backend he works with Node.js, Express, REST APIs, JWT auth, and MongoDB — the full MERN stack, end to end.`,
      chips: ["Show projects", "Full skill list", "Hire him"],
    }),
  },
  {
    keys: ["thanks", "thank", "thx", "cool", "awesome", "great", "nice"],
    answer: () => ({
      text: `You're welcome! 🙌 Anything else you'd like to know about ${PERSONAL.name}?`,
      chips: ["Show projects", "Hire him", "Contact"],
    }),
  },
];

const FALLBACK = {
  text: `I'm not totally sure about that one 🤔 — but I can tell you about ${PERSONAL.name}'s skills, projects, experience, or how to get in touch.`,
  chips: ["Tech skills", "Show projects", "Experience", "Contact"],
};

export function getBotResponse(input) {
  const text = (input || "").toLowerCase().trim();
  if (!text) return FALLBACK;

  let best = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const k of intent.keys) {
      if (text.includes(k)) score += k.length; // longer match = stronger signal
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return best ? best.answer() : FALLBACK;
}

export { allSkills };
