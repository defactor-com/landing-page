"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { V, GOLD, RAIL } from "@/lib/tokens";
import { RAISE_LOCKUP, TOKENIZE_LOCKUP, INVEST_LOCKUP, WHITE_DEFACTOR_LOGO_SRC } from "@/lib/brand";
import { MButton } from "@/components/ui/primitives";
import { Img } from "@/components/ui/Img";
import type { ImgPage } from "@/lib/images";

type Kpi = { l: string; v: ReactNode };

export type CosmicHeroProps = {
  audience: "raise" | "tokenize" | "invest" | "hub";
  accent: string;
  glow?: string;
  name?: string;
  eyebrow: ReactNode;
  h1a: ReactNode;
  h1b: ReactNode;
  sub: ReactNode;
  kpis: Kpi[];
  ctaPrimary: ReactNode;
  ctaGhost: ReactNode;
  onPrimary?: () => void;
  onGhost?: () => void;
  phLabel?: string;
};

const AUD = {
  raise: { lk: RAISE_LOCKUP, lkH: 41.5, page: "raise" as ImgPage, num: 10 },
  tokenize: { lk: TOKENIZE_LOCKUP, lkH: 39.8, page: "mint" as ImgPage, num: 12 },
  invest: { lk: INVEST_LOCKUP, lkH: 45, page: "yield" as ImgPage, num: 14 },
  hub: { lk: WHITE_DEFACTOR_LOGO_SRC, lkH: 44, page: undefined, num: undefined },
};

export function CosmicHero(props: CosmicHeroProps) {
  const { audience, accent, glow, name, eyebrow, h1a, h1b, sub, kpis, ctaPrimary, ctaGhost, onPrimary, onGhost, phLabel } = props;
  const [clock, setClock] = useState("00:00:00");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
    const f = () => setClock(new Date().toISOString().slice(11, 19));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  const isDay = mounted && resolvedTheme === "light";
  const a = AUD[audience] || AUD.hub;
  const accDay = accent === GOLD ? "#8A5E00" : accent;

  return (
    <div
      className="dfx-hero"
      style={{ position: "relative", overflow: "hidden", background: isDay ? "var(--s-bg)" : "#06051a", borderBottom: "1px solid var(--s-border)", display: "flex", alignItems: "flex-start", minHeight: 580 }}
    >
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, zIndex: 3, background: `linear-gradient(90deg, ${accent} 0%, ${accent}cc 50%, transparent 100%)` }} />
      {/* static decorative field (heavy animated field dropped for performance) */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: `radial-gradient(ellipse at 78% 12%, ${accent}26 0%, transparent 55%), radial-gradient(ellipse at 92% 80%, ${accent}1c 0%, transparent 50%)` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: isDay ? "linear-gradient(90deg, rgba(245,246,248,0.72) 0%, rgba(245,246,248,0.28) 42%, rgba(245,246,248,0) 72%)" : "linear-gradient(90deg, rgba(6,5,26,0.7) 0%, rgba(6,5,26,0.32) 42%, rgba(6,5,26,0) 72%)" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: RAIL, margin: "0 auto", padding: "64px 40px", width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.08fr 0.92fr", gap: 48, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", height: 46, gap: 11, marginBottom: 18 }}>
              <img src={a.lk} alt={name || "Defactor"} style={{ height: a.lkH, width: "auto", display: "block" }} />
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0 }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: isDay ? accDay : accent }}>{eyebrow}</span>
            </div>
            <h1 className="h-hero" style={{ color: isDay ? "var(--s-ink)" : "#fff", margin: "0 0 18px" }}>
              {h1a}
              <br />
              <span
                style={{
                  background: isDay ? `linear-gradient(115deg, ${accDay} 0%, ${accDay} 40%, var(--s-ink) 92%)` : `linear-gradient(115deg, ${accent} 0%, ${accent}E6 52%, rgba(255,255,255,0.92) 100%)`,
                  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                }}
              >
                {h1b}
              </span>
            </h1>
            <p style={{ fontSize: 15.5, color: isDay ? "var(--s-muted)" : "rgba(255,255,255,0.74)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 520 }}>{sub}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <MButton audience={audience} variant="primary" size="lg" onClick={onPrimary}>{ctaPrimary}</MButton>
              <MButton audience={audience} variant="ghostDark" size="lg" icon={null} onClick={onGhost}>{ctaGhost}</MButton>
            </div>
          </div>
          <div>
            <Img num={a.num} page={a.page} label={phLabel} accent={accent} ratio="16 / 9" priority />
            <div style={{ marginTop: 20, width: "100%", boxSizing: "border-box", borderRadius: 20, border: `1px solid ${accent}33`, background: isDay ? `radial-gradient(ellipse at 22% 0%, ${accent}16 0%, transparent 58%), #FFFFFF` : `radial-gradient(ellipse at 22% 0%, ${accent}16 0%, transparent 58%), rgba(8,6,22,0.62)`, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", boxShadow: `0 22px 60px -32px ${glow}, inset 0 1px 0 rgba(255,255,255,0.07)`, overflow: "hidden", position: "relative" }}>
              <div style={{ height: 4, background: `linear-gradient(90deg, ${accent} 0%, ${accent}cc 50%, transparent 100%)` }} />
              <div style={{ position: "absolute", top: -30, left: -24, width: 240, height: 240, borderRadius: "50%", background: accent, opacity: 0.1, filter: "blur(55px)", pointerEvents: "none" }} />
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", borderBottom: isDay ? "1px solid rgba(7,1,24,0.07)" : "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: isDay ? accDay : accent }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${glow}`, animation: "pulseDot 1.8s ease-out infinite" }} />
                  Live · Platform Snapshot
                </span>
                <span style={{ fontSize: 10, color: isDay ? "rgba(7,1,24,0.45)" : "rgba(255,255,255,0.42)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: "0.03em" }}>Sync {clock} UTC</span>
              </div>
              <div style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${kpis.length}, 1fr)` }}>
                {kpis.map((k, i) => (
                  <div key={i} style={{ padding: "18px 20px 20px", borderLeft: i ? (isDay ? "1px solid rgba(7,1,24,0.06)" : "1px solid rgba(255,255,255,0.05)") : "none" }}>
                    <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: isDay ? "var(--s-muted)" : "rgba(255,255,255,0.52)", marginBottom: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{k.l}</span>
                    <span style={{ display: "block", fontSize: 30, fontWeight: 500, color: isDay ? "var(--s-ink)" : "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>{k.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
