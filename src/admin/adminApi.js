import axios from "axios";
import { API_URL } from "../lib/api";

export const TOKEN_KEY = "portfolio_admin_token";

export const adminApi = axios.create({ baseURL: API_URL, timeout: 15000 });

// Attach the bearer token (if present) to every admin request.
adminApi.interceptors.request.use((cfg) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/** Turn an axios error into a readable message (includes Zod field details). */
export function apiError(err) {
  const data = err?.response?.data;
  const details = data?.error?.details?.map((d) => `${d.field}: ${d.message}`).join(", ");
  return details || data?.error?.message || err?.message || "Request failed";
}

/* ------------------------------- endpoints ------------------------------- */
export const authApi = {
  login: (email, password) => adminApi.post("/auth/login", { email, password }).then((r) => r.data.data),
  me: () => adminApi.get("/auth/me").then((r) => r.data.data),
  changePassword: (currentPassword, newPassword) =>
    adminApi.post("/auth/change-password", { currentPassword, newPassword }).then((r) => r.data.data),
};

export const resourceApi = {
  list: (res) => adminApi.get(`/admin/${res}`).then((r) => r.data.data),
  create: (res, body) => adminApi.post(`/admin/${res}`, body).then((r) => r.data.data),
  update: (res, id, body) => adminApi.put(`/admin/${res}/${id}`, body).then((r) => r.data.data),
  remove: (res, id) => adminApi.delete(`/admin/${res}/${id}`).then((r) => r.data.data),
  reorder: (res, ids) => adminApi.patch(`/admin/${res}/reorder`, { ids }).then((r) => r.data.data),
};

export const personalApi = {
  get: () => adminApi.get("/admin/personal").then((r) => r.data.data),
  update: (body) => adminApi.put("/admin/personal", body).then((r) => r.data.data),
};

export const messagesApi = {
  list: (status = "all") => adminApi.get(`/admin/messages?status=${status}`).then((r) => r.data),
  update: (id, patch) => adminApi.patch(`/admin/messages/${id}`, patch).then((r) => r.data.data),
  remove: (id) => adminApi.delete(`/admin/messages/${id}`).then((r) => r.data.data),
};

export async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await adminApi.post("/admin/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data; // { url, filename, ... }
}
