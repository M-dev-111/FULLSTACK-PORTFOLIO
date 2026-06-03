/* Field configuration that drives the generic admin CRUD pages. */

export const RESOURCES = {
  stats: {
    label: "Stats", singular: "Stat", icon: "BarChart3",
    desc: "The headline numbers in the About section.",
    primary: "value", secondary: "label",
    fields: [
      { key: "value", label: "Value", type: "text", placeholder: "1+" },
      { key: "label", label: "Label", type: "text", placeholder: "Years building" },
    ],
  },
  skills: {
    label: "Skills", singular: "Skill group", icon: "Wrench",
    desc: "Skill groups, each with a list of skills and proficiency levels.",
    primary: "group", secondary: (d) => `${d.items?.length || 0} skills`,
    fields: [
      { key: "group", label: "Group name", type: "text", placeholder: "Frontend" },
      { key: "items", label: "Skills", type: "skills" },
    ],
  },
  projects: {
    label: "Projects", singular: "Project", icon: "Rocket",
    desc: "Featured work shown in the Projects section.",
    primary: "title", secondary: "summary", thumb: "cover",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "cover", label: "Cover image", type: "image" },
      { key: "tags", label: "Tech tags", type: "tags" },
      { key: "live", label: "Live URL", type: "url", placeholder: "#" },
      { key: "repo", label: "Repo URL", type: "url", placeholder: "#" },
      { key: "accent", label: "Accent gradient (Tailwind)", type: "text",
        placeholder: "from-indigo-500/45 via-violet-500/15 to-transparent" },
      { key: "featured", label: "Featured", type: "bool", default: true },
    ],
  },
  journey: {
    label: "Journey", singular: "Journey entry", icon: "Compass",
    desc: "Timeline entries in the Journey section.",
    primary: "title", secondary: "year",
    fields: [
      { key: "year", label: "Year / period", type: "text", placeholder: "2025 - Present" },
      { key: "title", label: "Title", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  services: {
    label: "Services", singular: "Service", icon: "Sparkles",
    desc: "What you offer. Icon is a Lucide icon name rendered on the site.",
    primary: "title", secondary: "desc",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "icon", label: "Lucide icon name", type: "select",
        options: ["Code2", "Palette", "Layers", "Smartphone", "Plug", "Server", "Wrench"] },
    ],
  },
  navlinks: {
    label: "Nav Links", singular: "Nav link", icon: "Link",
    desc: "Navbar and footer navigation links.",
    primary: "label", secondary: "href",
    fields: [
      { key: "label", label: "Label", type: "text", placeholder: "Home" },
      { key: "href", label: "Anchor / href", type: "text", placeholder: "#home" },
    ],
  },
};

export const PERSONAL_FIELDS = [
  { key: "name", label: "Full name", type: "text" },
  { key: "role", label: "Role / title", type: "text" },
  { key: "tagline", label: "Tagline", type: "textarea" },
  { key: "email", label: "Email", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "availability", label: "Availability", type: "text" },
  { key: "regions", label: "Regions", type: "tags", help: "e.g. United States 🇺🇸" },
  { key: "resumeUrl", label: "Resume (PDF)", type: "file", accept: "application/pdf" },
  { key: "heroImage", label: "Hero image (optional)", type: "image" },
  { key: "access_key", label: "Web3Forms key (optional fallback)", type: "text" },
  { key: "socials", label: "Socials", type: "group", fields: [
    { key: "github", label: "GitHub", type: "url" },
    { key: "linkedin", label: "LinkedIn", type: "url" },
    { key: "instagram", label: "Instagram", type: "url" },
  ] },
];

/** Build an empty value object for a "new" record. */
export function blankRecord(fields) {
  const obj = {};
  for (const f of fields) {
    if (f.type === "tags" || f.type === "skills") obj[f.key] = [];
    else if (f.type === "bool") obj[f.key] = f.default ?? false;
    else if (f.type === "group") obj[f.key] = {};
    else obj[f.key] = "";
  }
  return obj;
}
