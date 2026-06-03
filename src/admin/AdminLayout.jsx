import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  User, BarChart3, Wrench, Rocket, Compass, Sparkles, Link as LinkIcon,
  Mail, Settings, Globe, LogOut, Menu, X,
} from "lucide-react";
import { useAdminAuth } from "./auth";
import { messagesApi } from "./adminApi";
import ThemeToggle from "../components/ThemeToggle";

const NAV = [
  { to: "/admin/personal", label: "Personal", Icon: User },
  { to: "/admin/stats", label: "Stats", Icon: BarChart3 },
  { to: "/admin/skills", label: "Skills", Icon: Wrench },
  { to: "/admin/projects", label: "Projects", Icon: Rocket },
  { to: "/admin/journey", label: "Journey", Icon: Compass },
  { to: "/admin/services", label: "Services", Icon: Sparkles },
  { to: "/admin/navlinks", label: "Nav Links", Icon: LinkIcon },
  { to: "/admin/messages", label: "Messages", Icon: Mail, badge: true },
];

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    const poll = () =>
      messagesApi.list("unread").then((r) => alive && setUnread(r.meta?.unread || 0)).catch(() => {});
    poll();
    const id = setInterval(poll, 30000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const doLogout = () => { logout(); navigate("/admin"); };

  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
      isActive ? "card-2 text-strong border-accent" : "text-muted hover:text-strong hover:card-2"
    }`;

  const NavList = (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, Icon, badge }) => (
        <NavLink key={to} to={to} onClick={() => setOpen(false)} className={linkCls}>
          <Icon className="h-[18px] w-[18px]" />
          {label}
          {badge && unread > 0 && (
            <span className="ml-auto rounded-full px-2 py-0.5 text-[11px] text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              {unread}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );

  const Sidebar = (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center gap-2.5 px-2 pb-5 pt-1">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>DN</span>
        <span className="font-display font-semibold text-strong">Admin</span>
      </div>
      {NavList}
      <div className="mt-auto flex flex-col gap-1 pt-4">
        <NavLink to="/admin/settings" onClick={() => setOpen(false)} className={linkCls}>
          <Settings className="h-[18px] w-[18px]" /> Settings
        </NavLink>
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted hover:text-strong hover:card-2">
          <Globe className="h-[18px] w-[18px]" /> View site
        </a>
        <button onClick={doLogout} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-muted hover:text-strong hover:card-2">
          <LogOut className="h-[18px] w-[18px]" /> Sign out
        </button>
        <div className="mt-2 flex items-center justify-between gap-2 px-2">
          <span className="truncate text-xs text-faint">{admin?.email}</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-app text-strong">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-subtle bg-app-2 px-4 py-3 lg:hidden">
        <span className="font-display font-semibold text-strong">Admin</span>
        <button onClick={() => setOpen(true)} className="rounded-lg card-2 p-2 text-strong"><Menu className="h-5 w-5" /></button>
      </div>

      <div className="lg:grid lg:grid-cols-[256px_1fr]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen overflow-y-auto border-r border-subtle bg-app-2 lg:block">
          {Sidebar}
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-app-2 border-r border-subtle">
              <button onClick={() => setOpen(false)} className="absolute right-3 top-3 rounded-lg p-1.5 text-faint hover:text-strong"><X className="h-5 w-5" /></button>
              {Sidebar}
            </aside>
          </div>
        )}

        <main className="mx-auto w-full max-w-5xl px-5 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
