import { createContext, useContext, useEffect, useState } from "react";
import { fetchContent } from "./api";
import {
  PERSONAL,
  STATS,
  SKILLS,
  PROJECTS,
  JOURNEY,
  SERVICES,
  NAV_LINKS,
} from "./data";

// Bundled defaults — used instantly on first paint and as a fallback if the
// backend is unavailable, so the site is never blank.
export const FALLBACK_CONTENT = {
  PERSONAL,
  STATS,
  SKILLS,
  PROJECTS,
  JOURNEY,
  SERVICES,
  NAV_LINKS,
};

const ContentContext = createContext({ content: FALLBACK_CONTENT, loading: true, source: "fallback" });

export function ContentProvider({ children }) {
  const [content, setContent] = useState(FALLBACK_CONTENT);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("fallback");

  useEffect(() => {
    let alive = true;
    fetchContent()
      .then((data) => {
        if (!alive || !data) return;
        // Merge so any field the API omits keeps its bundled default.
        setContent({
          PERSONAL: { ...FALLBACK_CONTENT.PERSONAL, ...data.PERSONAL,
            socials: { ...FALLBACK_CONTENT.PERSONAL.socials, ...(data.PERSONAL?.socials || {}) } },
          STATS: data.STATS?.length ? data.STATS : FALLBACK_CONTENT.STATS,
          SKILLS: data.SKILLS?.length ? data.SKILLS : FALLBACK_CONTENT.SKILLS,
          PROJECTS: data.PROJECTS?.length ? data.PROJECTS : FALLBACK_CONTENT.PROJECTS,
          JOURNEY: data.JOURNEY?.length ? data.JOURNEY : FALLBACK_CONTENT.JOURNEY,
          SERVICES: data.SERVICES?.length ? data.SERVICES : FALLBACK_CONTENT.SERVICES,
          NAV_LINKS: data.NAV_LINKS?.length ? data.NAV_LINKS : FALLBACK_CONTENT.NAV_LINKS,
        });
        setSource("api");
      })
      .catch(() => {
        // Stay on fallback content silently.
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, source }}>
      {children}
    </ContentContext.Provider>
  );
}

/** Access the full content payload. */
export function useContent() {
  return useContext(ContentContext).content;
}

/** Access provider meta (loading / source). */
export function useContentMeta() {
  const { loading, source } = useContext(ContentContext);
  return { loading, source };
}
