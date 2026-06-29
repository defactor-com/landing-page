"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { V, G, GOLD } from "@/lib/tokens";
import { WHITE_DEFACTOR_LOGO_SRC, DEFACTOR_LOGO_SRC } from "@/lib/brand";
import { Icon } from "@/components/ui/Icon";
import { MButton } from "@/components/ui/primitives";
import { PRIMARY_NAV, FLAT_NAV, appHref } from "./nav-config";

export function SiteNav({ forceNight = false }: { forceNight?: boolean }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenu, setMobileMenu] = useState(false);
  const night = forceNight || resolvedTheme !== "light";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkColor = (active: boolean, accent: string) =>
    active ? accent : night ? "rgba(244,242,250,0.82)" : "#374151";

  const all = [...PRIMARY_NAV, ...FLAT_NAV];

  return (
    <div
      style={{
        position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "24px 32px",
        borderBottom: "1px solid var(--s-border)",
        background: night ? "rgba(7,1,24,0.82)" : "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src={night ? WHITE_DEFACTOR_LOGO_SRC : DEFACTOR_LOGO_SRC}
          height={22}
          style={{ width: "auto", objectFit: "contain", display: "block", flexShrink: 0 }}
          alt="Defactor"
        />
      </Link>

      <div className="dfx-nav-links" style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {PRIMARY_NAV.map((it) => {
          const active = isActive(it.href);
          return (
            <Link
              key={it.id}
              href={it.href}
              style={{
                position: "relative", display: "flex", alignItems: "center",
                fontSize: 13, fontWeight: active ? 600 : 500, color: linkColor(active, it.accent),
                paddingBottom: 3, transition: "color 0.18s ease",
              }}
            >
              {it.label}
              {it.badge && (
                <span style={{ marginLeft: 6, fontSize: 8, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "#fff", background: it.accent, borderRadius: 6, padding: "2px 5px", lineHeight: 1, boxShadow: `0 0 10px ${it.accent}66` }}>
                  {it.badge}
                </span>
              )}
              <span style={{ position: "absolute", left: 0, right: 0, bottom: -2, height: 2, borderRadius: 2, background: it.accent, transform: active ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.22s ease" }} />
            </Link>
          );
        })}
        <span style={{ width: 1, height: 14, background: "var(--s-border)" }} />
        {FLAT_NAV.map((it) => {
          const active = isActive(it.href);
          return (
            <Link key={it.id} href={it.href} style={{ position: "relative", fontSize: 13, fontWeight: active ? 600 : 500, color: linkColor(active, it.accent), paddingBottom: 3, transition: "color 0.18s ease" }}>
              {it.label}
              <span style={{ position: "absolute", left: 0, right: 0, bottom: -2, height: 2, borderRadius: 2, background: it.accent, transform: active ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.22s ease" }} />
            </Link>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div className="dfx-nav-links" style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 100, border: "1px solid var(--s-border)", background: night ? "rgba(255,255,255,0.04)" : "var(--s-surface)" }}>
          <Icon name="Search" size={15} color="var(--s-muted)" />
          <input type="text" placeholder="Search" aria-label="Search" style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "var(--s-ink)", width: 104 }} />
        </div>
        <span
          onClick={() => setTheme(night ? "light" : "dark")}
          title={night ? "Switch to day" : "Switch to night"}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 4, cursor: "pointer", color: "var(--s-ink)" }}
        >
          <Icon name={night ? "Sun" : "Moon"} size={17} color={night ? GOLD : V} />
        </span>
        <span className="dfx-nav-links">
          <Link href={appHref()}>
            <MButton audience="hub" variant="primary" size="sm">Open Defactor App</MButton>
          </Link>
        </span>
        <span
          className="dfx-nav-mobile"
          onClick={() => setMobileMenu((m) => !m)}
          style={{ display: "none", alignItems: "center", justifyContent: "center", width: 36, height: 36, cursor: "pointer", color: "var(--s-ink)" }}
        >
          <Icon name={mobileMenu ? "X" : "Menu"} size={18} color="var(--s-ink)" />
        </span>
      </div>

      {mobileMenu && (
        <div className="dfx-nav-mobile" style={{ position: "absolute", top: "100%", left: 0, right: 0, flexDirection: "column", padding: "12px 20px 20px", gap: 4, background: night ? "rgba(7,1,24,0.98)" : "rgba(255,255,255,0.98)", borderBottom: "1px solid var(--s-border)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          {all.map((it) => {
            const active = isActive(it.href);
            return (
              <Link key={it.id} href={it.href} onClick={() => setMobileMenu(false)} style={{ display: "block", padding: "11px 4px", fontSize: 15, fontWeight: active ? 600 : 500, color: active ? it.accent : "var(--s-ink)", borderBottom: "1px solid var(--s-border)" }}>
                {it.label}
              </Link>
            );
          })}
          <div style={{ marginTop: 12 }}>
            <Link href={appHref()}>
              <MButton audience="hub" variant="primary" size="md">Open Defactor App</MButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
