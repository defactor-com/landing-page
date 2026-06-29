import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

/**
 * Standard marketing page chrome: sticky nav + page body + footer.
 * `forceNight` wraps the subtree in `.dark` (used by the $REAL page, which is
 * always dark regardless of the global toggle).
 */
export function SiteShell({
  children,
  forceNight = false,
}: {
  children: ReactNode;
  forceNight?: boolean;
}) {
  const content = (
    <div style={{ minHeight: "100vh", background: "var(--s-bg)", position: "relative" }}>
      <SiteNav forceNight={forceNight} />
      {children}
      <SiteFooter />
    </div>
  );
  return forceNight ? <div className="dark">{content}</div> : content;
}
