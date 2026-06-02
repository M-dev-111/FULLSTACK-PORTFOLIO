import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/theme";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="theme-toggle"
      className={`group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full card-2 text-strong transition-colors hover:border-accent ${className}`}
    >
      <Sun
        className={`absolute h-[18px] w-[18px] text-accent transition-all duration-500 ${
          isDark ? "translate-y-6 rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
          isDark ? "translate-y-0 rotate-0 opacity-100" : "-translate-y-6 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
