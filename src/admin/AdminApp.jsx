import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Toaster } from "sonner";
import { AdminAuthProvider, useAdminAuth } from "./auth";
import { useTheme } from "../lib/theme";
import Login from "./pages/Login";
import AdminLayout from "./AdminLayout";
import PersonalPage from "./pages/PersonalPage";
import CollectionPage from "./pages/CollectionPage";
import MessagesPage from "./pages/MessagesPage";
import SettingsPage from "./pages/SettingsPage";

function AdminRoutes() {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-app">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!admin) return <Login />;

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/personal" replace />} />
        <Route path="personal" element={<PersonalPage />} />
        <Route path="stats" element={<CollectionPage resource="stats" />} />
        <Route path="skills" element={<CollectionPage resource="skills" />} />
        <Route path="projects" element={<CollectionPage resource="projects" />} />
        <Route path="journey" element={<CollectionPage resource="journey" />} />
        <Route path="services" element={<CollectionPage resource="services" />} />
        <Route path="navlinks" element={<CollectionPage resource="navlinks" />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/admin/personal" replace />} />
      </Route>
    </Routes>
  );
}

export default function AdminApp() {
  const { theme } = useTheme();
  // Admin always renders inside the app's theme; ensure a sane title.
  useEffect(() => {
    const prev = document.title;
    document.title = "Portfolio Admin";
    return () => { document.title = prev; };
  }, []);

  return (
    <AdminAuthProvider>
      <Toaster theme={theme} position="top-center" richColors />
      <AdminRoutes />
    </AdminAuthProvider>
  );
}
