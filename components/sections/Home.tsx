"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import {
  V,
  V_LIGHT,
  G,
  GOLD,
  C,
  TEAL,
  CHORD,
  CW,
  RAIL,
  HOVER,
  LIGHT_BORDER2,
  dm,
} from "@/lib/tokens";
import {
  MButton,
  MirrorCard,
  CenterEyebrow,
  MEyebrow,
  SectionSeam,
  MAudience,
  useHover,
  GradientTextHeadline,
} from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { ChordMeshHero } from "@/components/hero/ChordMeshHero";
import { CHORD_MESH } from "@/lib/chord-mesh";
import { RAISE_LOCKUP, INVEST_LOCKUP } from "@/lib/brand";
import { appHref } from "@/components/layout/nav-config";

// ── Emblem petal system (DS v0.7.3) ────────────────────────────────
const PETAL_BY_KEY: Record<string, number> = { raise: 0, invest: 1, tokenize: 3 };
const EMBLEM_PATHS = [
  "M36.63.03l-15.63,1.35c-1.77.14-2.7,2.21-1.68,3.7l8.94,13.23c1.01,1.49,3.22,1.29,3.94-.34l6.68-14.52c.77-1.63-.48-3.52-2.26-3.37v-.05h.02Z",
  "M.04,2.53l1.29,16.02c.14,1.83,2.16,2.79,3.61,1.73l12.89-9.14c1.44-1.01,1.25-3.27-.34-4.04L3.31.23C1.72-.55-.1.76.04,2.53Z",
  "M2.49,40l15.63-1.35c1.77-.14,2.7-2.21,1.68-3.7l-8.94-13.23c-1.01-1.49-3.22-1.29-3.94.34L.23,36.58c-.77,1.63.48,3.52,2.26,3.37v.05h0Z",
  "M39.08,37.45l-1.29-16.02c-.14-1.83-2.16-2.79-3.61-1.73l-12.89,9.14c-1.44,1.01-1.25,3.27.34,4.04l14.18,6.87c1.59.77,3.42-.53,3.27-2.31h0Z",
];
const PETAL_VB = [
  "17.7 -0.67 22.55 21.07",
  "-0.7 -1.15 20.57 23.09",
  "-1.14 19.63 22.56 21.07",
  "19.25 18.04 20.58 23.08",
];

function EmblemMono({
  color,
  size = 32,
  grad = false,
  petal = null,
  glow,
  style,
}: {
  color: string;
  size?: number;
  grad?: boolean;
  petal?: number | null;
  glow?: string;
  style?: CSSProperties;
}) {
  const single = petal !== null && petal !== undefined;
  const vb = single ? PETAL_VB[petal] : "0 0 39.11 40";
  const p = vb.split(" ").map(Number);
  const w = Math.round(size * (p[2] / p[3]) * 100) / 100;
  const paths = single ? [EMBLEM_PATHS[petal]] : EMBLEM_PATHS;
  const gid = "emgrad-" + String(color).replace(/[^a-zA-Z0-9]/g, "") + (single ? petal : "f");
  const fill = grad ? `url(#${gid})` : color;
  return (
    <svg
      viewBox={vb}
      width={w}
      height={size}
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, filter: glow ? `drop-shadow(0 0 7px ${glow})` : undefined, ...(style || {}) }}
    >
      {grad ? (
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={`${color}99`} />
            <stop offset="1" stopColor={color} />
          </linearGradient>
        </defs>
      ) : null}
      {paths.map((d, i) => (
        <path key={i} fill={fill} d={d} />
      ))}
    </svg>
  );
}

// ── Sparkline glyph for KPI cards ──────────────────────────────────
const SPARK_PATHS = [
  "M2,14 C6,10 10,18 14,12 C18,6 22,14 26,10 C30,6 34,12 38,8",
  "M2,8  C6,12 10,6  14,14 C18,18 22,10 26,14 C30,18 34,12 38,10",
  "M2,12 C6,8  10,14 14,10 C18,6  22,12 26,8  C30,4  34,10 38,6",
  "M2,10 C6,14 10,8  14,12 C18,16 22,8  26,12 C30,8  34,14 38,10",
];
function toFill(d: string) {
  const pts = d.trim();
  const start = pts.match(/M(\S+),(\S+)/);
  const sx = start ? start[1] : "2";
  return `${pts} L38,22 L${sx},22 Z`;
}
function Spark({ idx = 0, color = V, up = null }: { idx?: number; color?: string; up?: boolean | null }) {
  const d = SPARK_PATHS[idx % SPARK_PATHS.length];
  const stroke = up === false ? C : color;
  const gid = `sg${idx}`;
  const fid = `sf${idx}`;
  const endY = d.match(/38,(\d+)/)?.[1] ?? "8";
  return (
    <svg width="56" height="26" viewBox="0 0 40 24" fill="none" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
        <filter id={fid} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor={stroke} floodOpacity="0.4" />
        </filter>
      </defs>
      <path d={toFill(d)} fill={`url(#${gid})`} />
      <path d={d} stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${fid})`} />
      <circle cx="38" cy={endY} r="3.5" fill={stroke} opacity="0.15" />
      <circle cx="38" cy={endY} r="2" fill={stroke} />
    </svg>
  );
}

// ── FancyKpiLight ──────────────────────────────────────────────────
function FancyKpiLight({
  label,
  value,
  delta,
  up,
  accent,
  idx,
  info,
  dark = false,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean | null;
  accent: string;
  idx: number;
  info?: string;
  dark?: boolean;
}) {
  const [hov, hoverProps] = useHover();
  const [open, setOpen] = useState(false);
  const d =
    up === true
      ? { bg: `${accent}1a`, color: accent, arrow: "▲" }
      : up === false
      ? { bg: "rgba(211,25,78,0.12)", color: C, arrow: "▼" }
      : { bg: "rgba(107,114,128,0.08)", color: dm.muted, arrow: null };
  const surface = dark ? "rgba(255,255,255,0.04)" : "var(--s-card)";
  const mutedC = dark ? "rgba(255,255,255,0.55)" : "var(--s-muted)";
  const clickable = !!info;
  return (
    <div
      {...hoverProps}
      onClick={clickable ? () => setOpen((o) => !o) : undefined}
      style={{
        background: `radial-gradient(ellipse at 20% 0%,${accent}${dark ? "22" : "10"} 0%,transparent 55%),${surface}`,
        borderRadius: 20,
        border: hov ? `1px solid ${accent}88` : `1px solid ${accent}${dark ? "3a" : "28"}`,
        padding: 0,
        overflow: "hidden",
        transform: hov ? HOVER.liftCard : "translateY(0)",
        boxShadow: hov
          ? dark
            ? `0 0 0 1px ${accent}3a, 0 18px 40px -12px ${accent}55, 0 10px 26px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)`
            : `0 0 0 1px ${accent}22, 0 18px 40px -12px ${accent}33, 0 8px 22px rgba(7,1,24,0.10), inset 0 1px 0 rgba(255,255,255,0.5)`
          : dark
          ? `0 2px 12px rgba(0,0,0,0.3)`
          : "0 1px 6px rgba(7,1,24,0.06)",
        backdropFilter: dark ? "blur(8px)" : "none",
        WebkitBackdropFilter: dark ? "blur(8px)" : "none",
        transition: HOVER.base,
        cursor: clickable ? "pointer" : "default",
      }}
    >
      <div style={{ height: 4, background: `linear-gradient(90deg,${accent} 0%,${accent}cc 50%,transparent 100%)` }} />
      <div style={{ position: "relative", padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <span style={{ fontSize: 9.5, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: accent }}>{label}</span>
          <Spark idx={idx} color={accent} up={up} />
        </div>
        <div style={{ fontSize: 32, fontWeight: 500, color: accent, letterSpacing: "-1.5px", lineHeight: 1, marginBottom: 16 }}>{value}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          {delta && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "4px 8px",
                borderRadius: 100,
                background: d.bg,
                color: d.color,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {d.arrow && <span style={{ fontSize: 8 }}>{d.arrow}</span>}
              {delta}
            </span>
          )}
          {clickable && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: accent,
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                opacity: hov || open ? 1 : 0.5,
                transition: "opacity 0.2s ease",
              }}
            >
              {open ? "Less" : "Details"}{" "}
              <span style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s ease", fontSize: 8 }}>▾</span>
            </span>
          )}
        </div>
        {clickable && (
          <div
            style={{
              maxHeight: open ? 120 : 0,
              opacity: open ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease",
              marginTop: open ? 14 : 0,
            }}
          >
            <div style={{ paddingTop: 14, borderTop: `1px solid ${accent}22`, fontSize: 11.5, color: mutedC, lineHeight: 1.6 }}>{info}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Live activity stream ───────────────────────────────────────────
type StreamEv = { audience: string; label: string; addr?: string; verb: string; amount: string; time?: string; _sec?: number };

function StreamEvent({ ev, dark = false }: { ev: StreamEv; dark?: boolean }) {
  const a = MAudience[ev.audience] || MAudience.hub;
  const cInk = dark ? "rgba(255,255,255,0.88)" : dm.ink;
  const cMuted = dark ? "rgba(255,255,255,0.55)" : dm.muted;
  const cLo = dark ? "rgba(255,255,255,0.4)" : dm.lo;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "0 28px 0 0", fontSize: 11.5, color: cMuted, lineHeight: 1, whiteSpace: "nowrap" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.accent, boxShadow: `0 0 6px ${a.accent}`, flexShrink: 0 }} />
      <span style={{ fontFamily: "Sora", color: cInk, fontWeight: 600, fontSize: 11.5 }}>{ev.label}</span>
      <span style={{ color: a.accent, fontWeight: 600 }}>{ev.verb}</span>
      <span style={{ fontFamily: "monospace", color: cInk, fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{ev.amount}</span>
      <span style={{ color: cLo, fontSize: 10.5 }}>· {ev.time}</span>
    </div>
  );
}

function LiveDataStream({ events, dark = false }: { events: StreamEv[]; dark?: boolean }) {
  const surfaceLight = `
    radial-gradient(ellipse at 15% 50%, rgba(196,24,72,0.05) 0%, transparent 55%),
    radial-gradient(ellipse at 50% 50%, rgba(90,91,235,0.06) 0%, transparent 60%),
    radial-gradient(ellipse at 85% 50%, rgba(40,166,107,0.05) 0%, transparent 55%),
    #FAFAFB
  `;
  const surfaceDark = `
    radial-gradient(ellipse at 15% 50%, rgba(196,24,72,0.07) 0%, transparent 55%),
    radial-gradient(ellipse at 50% 50%, rgba(90,91,235,0.09) 0%, transparent 60%),
    radial-gradient(ellipse at 85% 50%, rgba(40,166,107,0.07) 0%, transparent 55%),
    #0c0726
  `;
  return (
    <div
      className="lds-container"
      style={{
        position: "relative",
        height: 56,
        borderRadius: 10,
        overflow: "hidden",
        background: dark ? surfaceDark : surfaceLight,
        border: dark ? "1px solid rgba(255,255,255,0.06)" : `1px solid ${LIGHT_BORDER2}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          background: dark
            ? `linear-gradient(90deg, #0c0726 0%, transparent 8%, transparent 92%, #0c0726 100%)`
            : `linear-gradient(90deg, #FAFAFB 0%, transparent 8%, transparent 92%, #FAFAFB 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: dark ? 0.4 : 0.3,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div
        className="lds-track"
        style={{ position: "absolute", top: 0, left: 0, height: "100%", display: "flex", alignItems: "center", whiteSpace: "nowrap", paddingLeft: 20 }}
      >
        {[...events, ...events].map((ev, i) => (
          <StreamEvent key={i} ev={ev} dark={dark} />
        ))}
      </div>
    </div>
  );
}

function LiveDataStreamLive({ initial, dark = false }: { initial: StreamEv[]; dark?: boolean }) {
  const POOL = [
    { audience: "tokenize", verb: "tokenized", unit: "$" },
    { audience: "tokenize", verb: "issued", unit: "$" },
    { audience: "privatecredit", verb: "drew funds", unit: "$" },
    { audience: "privatecredit", verb: "repaid", unit: "$" },
    { audience: "privatecredit", verb: "opened facility", unit: "$" },
    { audience: "invest", verb: "deposited", unit: "$" },
    { audience: "invest", verb: "committed", unit: "$" },
    { audience: "compliance", verb: "verified", unit: "holders" },
  ];
  const LABELS: Record<string, string[]> = {
    tokenize: ["Property fund", "Commodities token", "Private-credit note", "Invoice portfolio", "Renewables project"],
    privatecredit: ["Trade-finance facility", "Working-capital facility", "Small-business loan", "Invoice loan"],
    invest: ["Verified lender", "Investment fund", "Treasury desk", "Pool participant"],
    compliance: ["Onboarding desk", "Eligibility review", "Investor onboarding"],
  };
  const hex = () => "0123456789abcdef"[Math.floor(Math.random() * 16)];
  const mkAddr = () => "0x" + Array.from({ length: 4 }, hex).join("") + "…" + Array.from({ length: 4 }, () => hex().toUpperCase()).join("");
  const mkAmount = (unit: string) =>
    unit === "holders"
      ? `${1 + Math.floor(Math.random() * 8)} holders`
      : Math.random() < 0.5
      ? `$${(0.1 + Math.random() * 9).toFixed(1)}M`
      : `$${50 + Math.floor(Math.random() * 950)}K`;
  const mkEvent = (): StreamEv => {
    const t = POOL[Math.floor(Math.random() * POOL.length)];
    const L = LABELS[t.audience] || LABELS.invest;
    return { audience: t.audience, label: L[Math.floor(Math.random() * L.length)], addr: mkAddr(), verb: t.verb, amount: mkAmount(t.unit), _sec: 0 };
  };
  const seed = (initial && initial.length ? initial : [mkEvent(), mkEvent(), mkEvent(), mkEvent(), mkEvent(), mkEvent()]).map((e, i) => ({
    ...e,
    _sec: e._sec != null ? e._sec : (i + 1) * 60,
  }));
  const [events, setEvents] = useState<StreamEv[]>(seed);
  useEffect(() => {
    const age = setInterval(() => {
      setEvents((prev) => prev.map((e) => ({ ...e, _sec: (e._sec || 0) + 1 })));
    }, 1000);
    let to: ReturnType<typeof setTimeout>;
    const tick = () => {
      setEvents((prev) => [{ ...mkEvent() }, ...prev].slice(0, 8));
      to = setTimeout(tick, 4000 + Math.random() * 5000);
    };
    to = setTimeout(tick, 3500);
    return () => {
      clearInterval(age);
      clearTimeout(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fmt = (s: number) => (s < 60 ? `${s}s ago` : `${Math.floor(s / 60)}m ago`);
  const display = events.map((e) => ({ ...e, time: fmt(e._sec || 0) }));
  return <LiveDataStream events={display} dark={dark} />;
}

// ── HeroAppExplainer ───────────────────────────────────────────────
function HeroAppExplainer({ onNav, siteTheme }: { onNav?: (tab: string) => void; siteTheme: string }) {
  const items = [
    { tab: "raise", name: "Raise", accent: V, icon: "Landmark", line: "Borrow against your assets — open a facility, draw from lenders." },
    { tab: "tokenize", name: "Mint", accent: G, icon: "Coins", line: "Turn real-world assets into compliant tokens the right investors can hold." },
    { tab: "invest", name: "Yield", accent: GOLD, icon: "TrendingUp", line: "Earn income from vetted, asset-backed opportunities." },
  ];
  const [hov, setHov] = useState(-1);
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        position: "relative",
        background:
          siteTheme === "night"
            ? "linear-gradient(165deg, rgba(28,26,62,0.50) 0%, rgba(11,9,32,0.64) 100%), radial-gradient(ellipse at 18% -8%, rgba(129,130,239,0.24) 0%, transparent 56%), radial-gradient(ellipse at 88% 114%, rgba(94,228,205,0.12) 0%, transparent 52%)"
            : "linear-gradient(180deg, #FFFFFF 0%, #F6F7FB 100%), radial-gradient(ellipse at 18% -8%, rgba(129,130,239,0.10) 0%, transparent 56%)",
        backdropFilter: "blur(16px) saturate(1.4)",
        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
        border: siteTheme === "night" ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(7,1,24,0.10)",
        boxShadow: "0 46px 100px -42px rgba(0,0,0,0.9), 0 0 34px -8px rgba(129,130,239,0.26), inset 0 1px 0 rgba(255,255,255,0.16)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          borderBottom: siteTheme === "night" ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(7,1,24,0.08)",
          background: siteTheme === "night" ? "rgba(14,12,32,0.38)" : "rgba(7,1,24,0.03)",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: G, boxShadow: `0 0 8px ${G}` }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: siteTheme === "night" ? "rgba(255,255,255,0.86)" : "rgba(7,1,24,0.86)", fontFamily: "Sora" }}>Defactor App</span>
      </div>
      <div style={{ padding: "4px 0 6px" }}>
        {items.map((it, i) => (
          <div
            key={it.tab}
            onClick={() => onNav && onNav(it.tab)}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 18px",
              cursor: "pointer",
              position: "relative",
              background: hov === i ? `linear-gradient(90deg, ${it.accent}52 0%, ${it.accent}1c 60%, transparent 100%)` : "transparent",
              borderTop: `1px solid ${hov === i ? it.accent + "55" : "rgba(255,255,255,0.05)"}`,
              boxShadow: hov === i ? `inset 3px 0 0 ${it.accent}, 0 0 26px -6px ${it.accent}77` : "none",
              transition: "all .18s ease",
            }}
          >
            <div style={{ flexShrink: 0, width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <EmblemMono color={it.accent} petal={PETAL_BY_KEY[it.tab]} size={30} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="h-feat" style={{ color: siteTheme === "night" ? "#fff" : "#1a1532", marginBottom: 3 }}>
                {it.name}
              </div>
              <div style={{ fontSize: 12.5, color: siteTheme === "night" ? "rgba(255,255,255,0.62)" : "rgba(7,1,24,0.62)", fontFamily: "Sora", lineHeight: 1.45 }}>{it.line}</div>
            </div>
            <span style={{ flexShrink: 0, color: hov === i ? it.accent : "rgba(255,255,255,0.3)", transition: "all .18s ease", transform: hov === i ? "translateX(2px)" : "none", display: "flex" }}>
              <Icon name="ArrowRight" size={18} color="currentColor" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ComplianceCrossCut (ported helper; static backdrop) ────────────
function ComplianceCrossCut() {
  const items = [
    { icon: "Shield", t: "KYB & Onboarding", d: "Everyone’s verified before they can join a deal." },
    { icon: "Wallet", t: "Whitelisting", d: "Only approved holders can hold or transfer. Checked automatically." },
    { icon: "Landmark", t: "Rules Built Into the Token", d: "The rules live in the token. Every transfer checks them automatically." },
    { icon: "Clock", t: "One-Click Reporting", d: "Audit-ready reports on demand, reconciled automatically." },
  ];
  return (
    <div
      style={{
        padding: "32px 32px",
        background:
          "radial-gradient(ellipse at 20% 6%, rgba(11,127,171,0.10) 0%, transparent 50%), radial-gradient(ellipse at 22% 12%, rgba(94,228,205,0.20) 0%, transparent 55%), radial-gradient(ellipse at 82% 90%, rgba(11,127,171,0.12) 0%, transparent 52%), radial-gradient(ellipse at 60% 50%, rgba(94,228,205,0.08) 0%, transparent 64%), var(--s-surface-alt)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <CenterEyebrow accent={TEAL}>Compliance · Cross-cutting</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>
          Compliant by Design, Across Everything
        </h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.6, fontFamily: "Sora" }}>
          Compliance isn’t a product beside Raise, Yield and Mint — it’s the layer that runs underneath all three. The same KYB, whitelisting and permissioning, everywhere capital moves.
        </p>
        <div className="dfx-comp-grid stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, maxWidth: RAIL, margin: "0 auto" }}>
          {items.map((it, i) => (
            <MirrorCard key={i} accent={TEAL} padding="22px 20px">
              <div style={{ marginBottom: 14 }}>
                <Icon name={it.icon} size={26} color={TEAL} strokeWidth={1.9} />
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6, fontFamily: "Sora", letterSpacing: "-0.3px" }}>{it.t}</div>
              <div style={{ fontSize: 12.5, color: "var(--s-muted)", lineHeight: 1.6, fontFamily: "Sora" }}>{it.d}</div>
            </MirrorCard>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            marginTop: 24,
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--s-lo)",
            fontFamily: "Sora",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: G }} />
            Raise
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD }} />
            Yield
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: V_LIGHT }} />
            Mint
          </span>
        </div>
      </div>
    </div>
  );
}

// ── HOME ───────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const [clock, setClock] = useState("00:00:00");
  useEffect(() => {
    const f = () => setClock(new Date().toISOString().slice(11, 19));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);

  // Static theme stance: site CSS vars adapt automatically. Default to dark
  // until mounted to avoid hydration mismatch; most styling uses var(--s-*).
  const night = true;
  const siteTheme = night ? "night" : "day";

  const openApp = () => router.push(appHref("raise"));
  const setTab = (t: string) => {
    const map: Record<string, string> = {
      raise: "/raise",
      tokenize: "/mint",
      invest: "/yield",
      token: "/real",
      learn: "/learn",
      contact: "/contact",
      compliance: "/compliance",
      home: "/",
    };
    router.push(map[t] || "/");
  };

  const press = ["Cointelegraph", "Yahoo Finance", "The Irish Times", "BitCourier"];
  const heroEvents: StreamEv[] = [
    { audience: "tokenize", label: "Property fund", addr: "0x742d…E9F3", verb: "tokenized", amount: "$14.8M", time: "3m ago" },
    { audience: "privatecredit", label: "Trade-finance facility", addr: "0xab12…0c4d", verb: "drew funds", amount: "$2.3M", time: "7m ago" },
    { audience: "invest", label: "Verified lender", addr: "0x91fa…A28b", verb: "deposited", amount: "$420K", time: "12m ago" },
    { audience: "compliance", label: "Onboarding desk", addr: "0x4e7c…91d2", verb: "verified", amount: "3 holders", time: "14m ago" },
    { audience: "tokenize", label: "Commodities token", addr: "0x88a3…F7e1", verb: "issued", amount: "$9.2M", time: "18m ago" },
    { audience: "privatecredit", label: "Working-capital facility", addr: "0x2bc4…D903", verb: "repaid", amount: "$1.1M", time: "22m ago" },
    { audience: "invest", label: "Investment fund", addr: "0x6f12…84ab", verb: "received income", amount: "$18.4K", time: "26m ago" },
  ];
  const assets = [
    { t: "Real Estate", c: V_LIGHT },
    { t: "Private Credit", c: G },
    { t: "Trade Finance", c: GOLD },
    { t: "Gold", c: GOLD },
    { t: "Farmland", c: G },
    { t: "Carbon Credits", c: G },
    { t: "Invoices", c: V },
    { t: "Renewables", c: G },
  ];
  const companies = [
    { q: "With Defactor, we’re opening up real estate investment, one tokenized property at a time.", who: "Real Estate Tokenization Platform" },
    { q: "Defactor powers our gold-backed community token — connecting real assets to real people in emerging economies.", who: "Commodity-Backed Token Issuer" },
    { q: "Defactor gives us direct access to digital credit lines, opening new funding channels for our trade finance clients.", who: "Trade Finance Provider" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--s-bg)" }}>
      {/* ── HERO ── */}
      <div
        className="dfx-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          background: siteTheme !== "night" ? "var(--s-bg)" : CHORD_MESH.hub.bg,
          borderBottom: "1px solid var(--s-border)",
          display: "flex",
          alignItems: "flex-start",
          minHeight: 580,
        }}
      >
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, zIndex: 3, display: "flex" }}>
          {CHORD.map((c, ci) => (
            <div key={ci} style={{ flex: 1, background: c }} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.5,
            mixBlendMode: "overlay",
            pointerEvents: "none",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        {/* AndromedaGlobe dropped → static gradient backdrop */}
        <div aria-hidden className="dfx-globe-bg" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 72% 30%, " + V + "33 0%, transparent 60%)" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              siteTheme !== "night"
                ? "radial-gradient(ellipse 85% 70% at 32% 50%, rgba(245,246,248,0.30) 0%, rgba(245,246,248,0.06) 50%, rgba(245,246,248,0) 78%)"
                : "radial-gradient(ellipse 85% 70% at 32% 50%, rgba(6,5,26,0.42) 0%, rgba(6,5,26,0.08) 50%, rgba(6,5,26,0) 78%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, maxWidth: RAIL, margin: "0 auto", padding: "64px 40px", width: "100%", boxSizing: "border-box" }}>
          <div className="dfx-home-hero stack-sm" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "start" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: siteTheme !== "night" ? V : V_LIGHT, flexShrink: 0 }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: siteTheme !== "night" ? V : V_LIGHT, fontFamily: "Sora" }}>
                  The Real-World Asset Operating System
                </span>
              </div>
              <h1 className="h-hero" style={{ color: siteTheme !== "night" ? "var(--s-ink)" : "#fff", margin: "0 0 20px" }}>
                Real Assets. Real Access.{" "}
                <GradientTextHeadline
                  gradient={
                    siteTheme !== "night"
                      ? `linear-gradient(115deg, ${V} 0%, ${V} 40%, var(--s-ink) 92%)`
                      : `linear-gradient(115deg, ${V} 0%, ${V}E6 52%, rgba(255,255,255,0.92) 100%)`
                  }
                >
                  Real Capital.
                </GradientTextHeadline>
              </h1>
              <p style={{ fontSize: 15, color: siteTheme !== "night" ? "var(--s-muted)" : "rgba(255,255,255,0.74)", lineHeight: 1.65, margin: "0 0 30px", maxWidth: 540, fontFamily: "Sora" }}>
                Three products in one app — borrow against real assets, tokenize them, or earn the income. Start with Raise, live now.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <MButton audience="hub" variant="primary" size="md" onClick={() => openApp()}>
                  Open Defactor App
                </MButton>
                <MButton audience="hub" variant="ghostDark" size="md" onClick={() => setTab("contact")}>
                  Arrange a Demo
                </MButton>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-7% -5%", background: "radial-gradient(ellipse at 50% 44%, rgba(90,91,235,0.26) 0%, transparent 66%)", filter: "blur(26px)", pointerEvents: "none", zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <HeroAppExplainer onNav={setTab} siteTheme={siteTheme} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIVE DASHBOARD ── */}
      <div style={{ background: "var(--s-surface)", padding: "40px 28px 52px", position: "relative", isolation: "isolate" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none", background: `radial-gradient(ellipse 82% 62% at 50% -8%, ${V}12 0%, transparent 66%)` }} />
        <div
          style={{
            maxWidth: RAIL,
            margin: "0 auto",
            position: "relative",
            borderRadius: 16,
            border: "1px solid rgba(129,130,239,0.22)",
            background: siteTheme === "night" ? "linear-gradient(180deg, rgba(14,12,34,0.5) 0%, rgba(8,6,22,0.62) 100%)" : "linear-gradient(180deg, #FFFFFF 0%, #F6F7FB 100%)",
            boxShadow: "0 50px 120px -60px rgba(90,91,235,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              padding: "12px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.015)",
              flexWrap: "wrap",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: G, boxShadow: `0 0 10px ${G}`, animation: "pulseDot 1.8s ease-out infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: siteTheme === "night" ? "#fff" : "#1a1532", fontFamily: "Sora" }}>
                Live on Defactor
              </span>
              <span
                style={{
                  marginLeft: 6,
                  fontSize: 10,
                  fontWeight: 600,
                  color: siteTheme === "night" ? "rgba(255,255,255,0.5)" : "rgba(7,1,24,0.55)",
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  letterSpacing: "0.04em",
                }}
                suppressHydrationWarning
              >
                Sync {clock} UTC
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="h-feat" style={{ color: V_LIGHT }}>
                $200M+
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: siteTheme === "night" ? "rgba(255,255,255,0.5)" : "rgba(7,1,24,0.55)", fontFamily: "Sora" }}>
                in real-world assets
              </span>
            </div>
          </div>
          <div style={{ padding: "22px 22px 24px", position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 13, color: siteTheme === "night" ? "rgba(255,255,255,0.62)" : "rgba(7,1,24,0.62)", lineHeight: 1.6, marginBottom: 22, maxWidth: CW.md, fontFamily: "Sora" }}>
              Real loans, tokens, and payouts happening right now — every number updates live.
            </div>
            <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24, alignItems: "start" }}>
              <FancyKpiLight
                idx={0}
                accent={G}
                label="Capital Put to Work"
                value="$84M"
                delta="+9% QoQ"
                up
                dark={siteTheme === "night"}
                info="Total capital committed into live deals and pools through Raise and Yield, deployed against real-world assets."
              />
              <FancyKpiLight
                idx={1}
                accent={G}
                label="Active Facilities"
                value="24"
                delta="+5 QoQ"
                up
                dark={siteTheme === "night"}
                info="Live private-credit facilities currently open or drawing down on Defactor — each a real-world asset financed digitally, funded by lenders, with compliance built in."
              />
              <FancyKpiLight
                idx={2}
                accent={V}
                label="Assets Tokenized"
                value="$250M+"
                delta="+18% QoQ"
                up
                dark={siteTheme === "night"}
                info="Cumulative value of real-world assets issued as compliant tokens across Mint — property, commodities, private credit, and more."
              />
              <FancyKpiLight
                idx={3}
                accent={GOLD}
                label="Token Holders"
                value="3,400+"
                delta="+212 MoM"
                up
                dark={siteTheme === "night"}
                info="Unique verified holders of Defactor-issued assets or participants in investment pools — each identity-checked before they can hold or invest."
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: siteTheme === "night" ? "rgba(255,255,255,0.5)" : "rgba(7,1,24,0.55)", fontFamily: "Sora" }}>
                Live activity
              </span>
            </div>
            <LiveDataStreamLive initial={heroEvents} dark={siteTheme === "night"} />
          </div>
        </div>
      </div>

      <SectionSeam accent={V} />

      {/* ── RAISE CTA BAND (ChordMeshHero) ── */}
      <div className="dfx-band" style={{ position: "relative" }}>
        <ChordMeshHero variant="raise" height={560} withGrain withChordStripe={false} sink={false} daySurface={siteTheme !== "night"}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
              background:
                siteTheme !== "night"
                  ? "linear-gradient(90deg, rgba(245,246,248,0.42) 0%, rgba(245,246,248,0.18) 56%, rgba(245,246,248,0.02) 100%)"
                  : "linear-gradient(90deg, rgba(5,6,20,0.62) 0%, rgba(5,6,20,0.3) 56%, rgba(5,6,20,0.04) 100%)",
            }}
          />
          <div
            className="stack-sm"
            style={{
              position: "relative",
              zIndex: 1,
              minHeight: 560,
              paddingTop: 56,
              paddingBottom: 56,
              display: "grid",
              gridTemplateColumns: "1.06fr 0.94fr",
              alignItems: "center",
              gap: 40,
              maxWidth: RAIL,
              margin: "0 auto",
              padding: "0 40px",
            }}
          >
            <div>
              <div
                style={{
                  pointerEvents: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "5px 13px 5px 6px",
                  borderRadius: 100,
                  background: `${V}24`,
                  border: `1px solid ${V}55`,
                  marginBottom: 16,
                  animation: "liveChipGlow 2.6s ease-in-out infinite",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: V, boxShadow: `0 0 8px ${V}`, animation: "pulseDot 1.5s ease-out infinite" }} />
                <span className="dfx-keep-white" style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", color: "#fff", background: V, borderRadius: 100, padding: "3px 8px" }}>
                  NEW
                </span>
                <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em", color: siteTheme !== "night" ? "var(--s-muted)" : "rgba(255,255,255,0.92)", fontFamily: "Sora" }}>
                  Our newest module · live now
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={RAISE_LOCKUP} alt="Raise" style={{ height: 28, width: "auto", display: "block", objectFit: "contain", filter: `drop-shadow(0 0 14px ${V}66)` }} />
              </div>
              <h2 className="h-section" style={{ color: siteTheme !== "night" ? "var(--s-ink)" : "#fff", margin: 0, marginBottom: 14, fontFamily: "Sora" }}>
                The Operating System{" "}
                <GradientTextHeadline
                  gradient={
                    siteTheme !== "night"
                      ? `linear-gradient(115deg, ${V} 0%, ${V} 40%, var(--s-ink) 92%)`
                      : `linear-gradient(115deg, ${V} 0%, ${V}E6 52%, rgba(255,255,255,0.92) 100%)`
                  }
                >
                  for Private Credit.
                </GradientTextHeadline>
              </h2>
              <p style={{ fontSize: 14, color: siteTheme !== "night" ? "var(--s-muted)" : "rgba(255,255,255,0.76)", lineHeight: 1.65, margin: 0, marginBottom: 24, maxWidth: CW.sm, fontFamily: "Sora" }}>
                Already running a facility? Track every commitment, pay interest to all your lenders at once, and report from one dashboard.
              </p>
              <div style={{ pointerEvents: "auto", display: "flex", gap: 12, flexWrap: "wrap" }}>
                <MButton audience="raise" variant="primary" size="md" onClick={() => setTab("raise")}>
                  Explore Raise
                </MButton>
                <MButton
                  audience="raise"
                  variant="ghostDark"
                  size="md"
                  icon={null}
                  onClick={() => {
                    setTab("raise");
                    let tries = 0;
                    const go = () => {
                      const el = document.getElementById("payment-lifecycle");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      } else if (tries++ < 24) {
                        setTimeout(go, 110);
                      }
                    };
                    setTimeout(go, 240);
                  }}
                >
                  How payments work
                </MButton>
              </div>
            </div>
            <div style={{ pointerEvents: "auto" }}>
              <Img num={1} page="home" label="Raise · facility dashboard" accent={V} ratio="4 / 3" />
            </div>
          </div>
        </ChordMeshHero>
      </div>

      <SectionSeam accent={V} />

      {/* ── TWO PRODUCTS ── */}
      <div style={{ padding: "32px 32px", background: "var(--s-surface)", position: "relative", isolation: "isolate" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none", background: `radial-gradient(ellipse 82% 62% at 50% -8%, ${V}12 0%, transparent 66%)` }} />
        <div style={{ maxWidth: RAIL, margin: "0 auto" }}>
          <CenterEyebrow accent={V}>The Defactor App</CenterEyebrow>
          <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 12, fontFamily: "Sora" }}>
            Two Sides of Finance. One Platform.
          </h2>
          <p style={{ textAlign: "center", fontSize: 14, color: "var(--s-muted)", margin: "0 auto 40px", maxWidth: CW.lg, lineHeight: 1.6, fontFamily: "Sora" }}>
            Raise borrows against your assets. Mint sells a share of them. Yield earns the income.
          </p>
          <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
            <MirrorCard accent={V} padding="0" style={{ overflow: "hidden" }}>
              <Img num={2} page="home" label="Operator dashboard" accent={V} height={150} />
              <div style={{ padding: "26px 30px 30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={RAISE_LOCKUP} alt="Raise" style={{ height: 25, width: "auto", display: "block", objectFit: "contain", filter: `drop-shadow(0 0 14px ${V}66)` }} />
                </div>
                <div className="h-section" style={{ color: "var(--s-ink)", marginBottom: 14, fontFamily: "Sora" }}>
                  Run Your Whole Lending Facility.
                </div>
                <div style={{ fontSize: 13.5, color: "var(--s-muted)", lineHeight: 1.7, marginBottom: 22, fontFamily: "Sora" }}>
                  Already lending against invoices or assets? Open it to lenders, draw funds, pay interest, and report — no token, no dilution.
                </div>
                <MButton audience="raise" variant="primary" size="md" onClick={() => setTab("raise")}>
                  Open a Credit Facility
                </MButton>
              </div>
            </MirrorCard>
            <MirrorCard accent={GOLD} padding="0" style={{ overflow: "hidden" }}>
              <Img num={3} page="home" label="Investor dashboard" accent={GOLD} height={150} />
              <div style={{ padding: "26px 30px 30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={INVEST_LOCKUP} alt="Yield" style={{ height: 27, width: "auto", display: "block", objectFit: "contain", filter: `drop-shadow(0 0 14px ${GOLD}66)` }} />
                </div>
                <div className="h-section" style={{ color: "var(--s-ink)", marginBottom: 14, fontFamily: "Sora" }}>
                  Earn Income From Real-World Assets.
                </div>
                <div style={{ fontSize: 13.5, color: "var(--s-muted)", lineHeight: 1.7, marginBottom: 22, fontFamily: "Sora" }}>
                  Asset-backed returns, every position fully visible — built for institutional allocators and funds.
                </div>
                <MButton audience="invest" variant="primary" size="md" onClick={() => setTab("invest")}>
                  Explore Invest
                </MButton>
              </div>
            </MirrorCard>
          </div>
        </div>
      </div>

      {/* ── ASSET MARQUEE ── */}
      <div className="dfx-marq" style={{ background: siteTheme === "night" ? "#0a0520" : "#EEF1F6", padding: "18px 0", overflow: "hidden", position: "relative" }}>
        <style>{"@keyframes dfx-marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}.dfx-marq-track{animation:dfx-marq 32s linear infinite;will-change:transform}.dfx-marq:hover .dfx-marq-track{animation-play-state:paused}"}</style>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background: siteTheme === "night" ? "linear-gradient(90deg,#0a0520 0%,transparent 8%,transparent 92%,#0a0520 100%)" : "linear-gradient(90deg,#EEF1F6 0%,transparent 8%,transparent 92%,#EEF1F6 100%)",
          }}
        />
        <div className="dfx-marq-track" style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", width: "max-content" }}>
          {[...assets, ...assets].map((a, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "0 28px", fontSize: 14, fontWeight: 600, color: siteTheme === "night" ? "rgba(255,255,255,0.82)" : "var(--s-ink)", fontFamily: "Sora", letterSpacing: "-0.2px" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: a.c, boxShadow: `0 0 6px ${a.c}`, flexShrink: 0 }} />
              {a.t}
            </span>
          ))}
        </div>
      </div>

      {/* ── SOCIAL PROOF ── */}
      <div style={{ padding: "32px 32px", background: "var(--s-surface-alt)", position: "relative", isolation: "isolate" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none", background: `radial-gradient(ellipse 82% 62% at 50% -8%, ${V}12 0%, transparent 66%)` }} />
        <div style={{ maxWidth: RAIL, margin: "0 auto" }}>
          <CenterEyebrow accent={V}>Trusted &amp; Proven</CenterEyebrow>
          <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: "0 auto 8px", maxWidth: 620, fontFamily: "Sora" }}>
            Real Assets, Real Builders, On Defactor.
          </h2>
          <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.6, fontFamily: "Sora" }}>
            Real estate, commodities, and trade finance teams already building here.
          </p>
          <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
            {companies.map((c, i) => {
              const aud = ["tokenize", "tokenize", "raise"][i];
              const persona = ["Mint · Issuer", "Mint · Issuer", "Raise · Borrower"][i];
              const a = MAudience[aud];
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    background: `radial-gradient(ellipse 105% 82% at 16% -10%, ${a.accent}33 0%, ${a.accent}14 36%, transparent 72%), var(--s-surface)`,
                    border: `1px solid ${a.line}`,
                    borderRadius: 14,
                    padding: "26px 26px",
                    boxShadow: `0 1px 0 ${a.accent}10, 0 12px 32px -16px ${a.accent}40`,
                  }}
                >
                  <MEyebrow audience={aud} dotted>
                    {persona}
                  </MEyebrow>
                  <div style={{ fontSize: 14.5, fontWeight: 400, color: "var(--s-ink)", lineHeight: 1.6, letterSpacing: "-0.2px", marginTop: 14, marginBottom: 14, fontFamily: "Sora" }}>
                    {"“" + c.q + "”"}
                  </div>
                  <div style={{ marginTop: "auto", fontSize: 11.5, color: "var(--s-muted)", fontFamily: "Sora" }}>
                    <span style={{ fontWeight: 600, color: "var(--s-ink)" }}>{c.who}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: `1px solid var(--s-border)`, paddingTop: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", fontFamily: "Sora" }}>Featured In</span>
            <div style={{ display: "flex", justifyContent: "center", gap: 44, flexWrap: "wrap", alignItems: "center" }}>
              {press.map((p, i) => (
                <span key={i} style={{ fontSize: 15, fontWeight: 500, color: "var(--s-muted)", letterSpacing: "-0.2px", opacity: 0.75, fontFamily: "Sora" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionSeam accent={V} />

      {/* ── THE TOKEN ── */}
      <div style={{ padding: "32px 32px", background: "var(--s-surface-alt)", position: "relative", isolation: "isolate" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none", background: `radial-gradient(ellipse 82% 62% at 50% -8%, ${V}12 0%, transparent 66%)` }} />
        <CenterEyebrow accent={V}>The Token</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>
          One Token, Every Product.
        </h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: CW.md, margin: "0 auto 28px", lineHeight: 1.6, fontFamily: "Sora" }}>
          The token at the heart of Defactor — earn rewards, vote on direction, and share in revenue.
        </p>
        <div style={{ maxWidth: 680, margin: "0 auto 28px" }}>
          <Img num={4} page="home" label="$REAL · staking & governance" accent={V} ratio="16 / 9" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }} onClick={() => setTab("token")}>
          <MButton audience="hub" variant="primary" size="md">
            Explore $REAL
          </MButton>
        </div>
      </div>

      <SectionSeam accent={V} />

      {/* ── COMMUNITY (event photos = placeholders) ── */}
      <div style={{ padding: "32px 32px", background: "var(--s-surface)", position: "relative", isolation: "isolate" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none", background: `radial-gradient(ellipse 82% 62% at 50% -8%, ${G}12 0%, transparent 66%)` }} />
        <CenterEyebrow accent={G}>Community</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>
          Where the $REAL Community Meets
        </h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: CW.md, margin: "0 auto 32px", lineHeight: 1.6, fontFamily: "Sora" }}>
          Conference stages to local meetups — people tokenizing real-world assets.
        </p>
        <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "repeat(2, 140px)", gap: 12, maxWidth: RAIL, margin: "0 auto 36px" }}>
          <div style={{ gridRow: "span 2" }}>
            <Img num={5} label="Token2049 — Defactor on stage" accent={G} height={292} />
          </div>
          <Img num={6} label="Community meetup" accent={V} height={140} />
          <Img num={7} label="Builder workshop" accent={V_LIGHT} height={140} />
          <Img num={8} label="Panel — tokenized assets" accent={GOLD} height={140} />
          <Img num={9} label="AMA night" accent={TEAL} height={140} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <p style={{ textAlign: "center", fontSize: 13, color: "var(--s-muted)", maxWidth: 460, margin: 0, lineHeight: 1.6, fontFamily: "Sora" }}>
            Our Discord — meet founders, get support, find opportunities.
          </p>
          <MButton audience="invest" variant="primary" size="md">
            Join Our Discord
          </MButton>
        </div>
      </div>

      {/* ── FOOTER CTA BAND (ChordMeshHero) ── */}
      <ChordMeshHero variant="hub" height={264} withGrain withChordStripe sink={false}>
        {/* AndromedaGlobe dropped → static gradient backdrop */}
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: `radial-gradient(ellipse at 78% 25%, ${V}33 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: `radial-gradient(ellipse 70% 120% at 50% 50%, ${V}26 0%, transparent 64%)` }} />
        <div style={{ position: "relative", zIndex: 1, minHeight: 264, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "52px 40px" }}>
          <MEyebrow audience="hub" dark style={{ justifyContent: "center", marginBottom: 14 }}>
            Start building
          </MEyebrow>
          <h2 className="h-section" style={{ color: "#fff", margin: 0, marginBottom: 12, fontFamily: "Sora" }}>
            Put Real-World Assets to Work.
          </h2>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.78)", margin: 0, marginBottom: 24, maxWidth: CW.md, lineHeight: 1.6, fontFamily: "Sora" }}>
            Raise, tokenize, or invest — one platform for the full life of a real-world asset.
          </p>
          <MButton audience="hub" variant="primary" size="md" onClick={() => openApp()}>
            Get Started
          </MButton>
        </div>
      </ChordMeshHero>
    </div>
  );
}
