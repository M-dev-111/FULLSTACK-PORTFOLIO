import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "dark"; // dark by default for the cinematic look
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to <html> synchronously on change
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    // enable cross-fade only during the switch so scrolling stays jank-free
    root.classList.add("theme-transition");
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    window.setTimeout(() => root.classList.remove("theme-transition"), 450);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
