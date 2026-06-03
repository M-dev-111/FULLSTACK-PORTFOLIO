import axios from "axios";

// Falls back to same-origin "/api" if no env var is set (e.g. in production
// behind a single domain). In dev this points at the Express backend.
export const API_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 12000,
});

/** Fetch the full site content payload. Throws on failure (caller handles fallback). */
export async function fetchContent() {
  const { data } = await api.get("/content");
  if (!data?.success) throw new Error("Bad content response");
  return data.data;
}

/** Submit the contact form to the backend. */
export async function sendContactMessage(payload) {
  const { data } = await api.post("/contact", payload);
  return data;
}
