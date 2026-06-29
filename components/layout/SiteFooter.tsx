import Link from "next/link";
import { NAVY } from "@/lib/tokens";
import { WHITE_DEFACTOR_LOGO_SRC } from "@/lib/brand";

const COLS: { h: string; links: string[] }[] = [
  { h: "Resources", links: ["Case Studies", "Pressroom", "Articles", "Learn", "Brand"] },
  { h: "Connect", links: ["Community", "Events", "Contact", "Ambassadors"] },
  { h: "About", links: ["Team", "Partners"] },
  { h: "$REAL", links: ["Mint", "Yield", "Raise Capital", "Compliance", "$REAL Token", "Toolkit", "Ecosystem"] },
];

const ROUTE_FOR: Record<string, string> = {
  Contact: "/contact",
  Mint: "/mint",
  Yield: "/yield",
  "Raise Capital": "/raise",
  Compliance: "/compliance",
  "$REAL Token": "/real",
  Learn: "/learn",
};

export function SiteFooter() {
  return (
    <div className="dfx-footer" style={{ background: NAVY, padding: "32px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
        <img src={WHITE_DEFACTOR_LOGO_SRC} alt="Defactor" style={{ height: 30, width: "auto", display: "block" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 28 }}>
        {COLS.map((c, i) => (
          <div key={i}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{c.h}</span>
            </div>
            {c.links.map((l, j) => {
              const route = ROUTE_FOR[l];
              const style: React.CSSProperties = { fontSize: 11.5, color: "rgba(255,255,255,0.7)", marginBottom: 7, display: "block" };
              return route ? (
                <Link key={j} href={route} style={style}>{l}</Link>
              ) : (
                <div key={j} style={style}>{l}</div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16, fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>
        © Defactor 2026. All Rights Reserved
      </div>
    </div>
  );
}
