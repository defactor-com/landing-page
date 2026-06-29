"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  V,
  V_LIGHT,
  G,
  GOLD,
  NAVY,
  RAIL,
  RAIL_MD,
  CW,
  HOVER,
} from "@/lib/tokens";
import { Icon } from "@/components/ui/Icon";
import {
  MButton,
  CenterEyebrow,
  MEyebrow,
  SectionSeam,
  useHover,
} from "@/components/ui/primitives";
import { RealLockup } from "@/components/ui/Brand";
import { ChordMeshHero } from "@/components/hero/ChordMeshHero";
import { appHref } from "@/components/layout/nav-config";

/* ── Local helper: BuyRealBtn (animations preserved are CSS-light hover only) ── */
function BuyRealBtn({ size = "sm" }: { size?: "sm" | "md" }) {
  const [hov, hoverProps] = useHover();
  const sz =
    {
      sm: { fontSize: 11, height: 34, padding: "0 16px", dot: 6, arrow: 9, gap: 6 },
      md: { fontSize: 13, height: 40, padding: "0 20px", dot: 6, arrow: 10, gap: 8 },
    }[size] || { fontSize: 11, height: 34, padding: "0 16px", dot: 6, arrow: 9, gap: 6 };
  return (
    <button
      {...hoverProps}
      style={{
        ...sz,
        borderRadius: 100,
        fontWeight: 700,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: sz.gap,
        color: "#22c97e",
        border: `1px solid ${hov ? "rgba(40,166,107,0.5)" : "rgba(40,166,107,0.3)"}`,
        background: hov ? "rgba(40,166,107,0.16)" : "rgba(40,166,107,0.08)",
        boxShadow: hov ? "0 2px 12px rgba(34,201,126,0.25)" : "none",
        transform: hov ? "translateY(-1px)" : "none",
        transition: HOVER.base,
      }}
    >
      <span
        style={{
          width: sz.dot,
          height: sz.dot,
          borderRadius: "50%",
          background: "#22c97e",
          boxShadow: "0 0 6px rgba(34,201,126,0.8)",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      <span style={{ letterSpacing: "0.02em" }}>Buy $REAL</span>
      <svg
        width={sz.arrow}
        height={sz.arrow}
        viewBox="0 0 10 10"
        fill="none"
        stroke="#22c97e"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: hov ? 1 : 0.7, transition: HOVER.base }}
      >
        <line x1="2" y1="8" x2="8" y2="2" />
        <polyline points="4,2 8,2 8,6" />
      </svg>
    </button>
  );
}

/* ── Local helper: TrackHead ── */
function TrackHead({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return (
    <div style={{ maxWidth: CW.xl, margin: "0 auto", textAlign: "center" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "5px 14px",
          borderRadius: 100,
          background: `${G}14`,
          border: `1px solid ${G}33`,
          marginBottom: 14,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: G, boxShadow: `0 0 8px ${G}` }} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: G,
            fontFamily: "Sora",
          }}
        >
          {kicker}
        </span>
      </div>
      <h2 className="h-section" style={{ color: "var(--s-ink)", margin: 0, marginBottom: 10, fontFamily: "Sora" }}>
        {title}
      </h2>
      <p style={{ fontSize: 14, color: "var(--s-muted)", lineHeight: 1.65, margin: "0 auto", maxWidth: 620, fontFamily: "Sora" }}>
        {lead}
      </p>
    </div>
  );
}

/* ── Local helper: PillarStructures (animations dropped — static glyphs) ── */
type PillarItem = {
  kicker: string;
  title: string;
  glyph: string;
  featured?: boolean;
  badge?: string;
  cta?: string;
  body: string;
};
function PillarStructures({
  accent,
  eyebrow,
  title,
  titleAccent,
  sub,
  items,
  bg = "var(--s-surface)",
  onCta,
}: {
  accent: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  sub: string;
  items: PillarItem[];
  bg?: string;
  onCta?: (it: PillarItem) => void;
}) {
  const Glyph = ({ kind }: { kind: string }) => {
    if (kind === "tranches") {
      const bands = [0.18, 0.34, 0.5, 0.66, 0.82];
      return (
        <svg viewBox="0 0 96 96" width="60" height="60">
          {bands.map((op, i) => (
            <rect key={i} x="14" y={20 + i * 11} width="68" height="8" rx="1.5" fill={accent} opacity={op} />
          ))}
        </svg>
      );
    }
    if (kind === "isolines") {
      const lines = [
        { d: "M 6 28 Q 28 20 48 28 T 90 28", b: 0.35 },
        { d: "M 6 48 Q 28 40 48 48 T 90 48", b: 0.53 },
        { d: "M 6 68 Q 28 60 48 68 T 90 68", b: 0.71 },
      ];
      return (
        <svg viewBox="0 0 96 96" width="60" height="60">
          {lines.map((p, i) => (
            <path key={i} d={p.d} fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" opacity={p.b} />
          ))}
        </svg>
      );
    }
    if (kind === "bars") {
      const hs = [30, 50, 38, 56, 34];
      return (
        <svg viewBox="0 0 96 96" width="60" height="60">
          {hs.map((h, i) => (
            <rect key={i} x={15 + i * 14} y={78 - h} width="8" height={h} rx="2" fill={accent} opacity={0.5 + i * 0.09} />
          ))}
        </svg>
      );
    }
    if (kind === "nodes") {
      const xs = [18, 40, 62, 84];
      return (
        <svg viewBox="0 0 96 96" width="60" height="60">
          <line x1="18" y1="48" x2="84" y2="48" stroke={accent} strokeWidth="1" opacity="0.32" />
          {xs.map((x, i) => (
            <circle key={i} cx={x} cy="48" r="5" fill={accent} opacity={0.6 + i * 0.08} />
          ))}
        </svg>
      );
    }
    if (kind === "wave") {
      return (
        <svg viewBox="0 0 96 96" width="60" height="60">
          <path d="M 6 46 Q 24 24 42 46 T 90 46" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.72" />
          <path d="M 6 60 Q 24 40 42 60 T 90 60" fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
        </svg>
      );
    }
    const sats: [number, number][] = [
      [48, 20],
      [72.25, 34],
      [72.25, 62],
      [48, 76],
      [23.75, 62],
      [23.75, 34],
    ];
    return (
      <svg viewBox="0 0 96 96" width="60" height="60">
        <g>
          {sats.map((p, i) => (
            <line key={"l" + i} x1="48" y1="48" x2={p[0]} y2={p[1]} stroke={accent} strokeWidth="0.9" opacity="0.4" />
          ))}
          {sats.map((p, i) => (
            <circle key={"s" + i} cx={p[0]} cy={p[1]} r="3" fill={accent} opacity="0.75" />
          ))}
        </g>
        <circle cx="48" cy="48" r="6" fill={accent} />
      </svg>
    );
  };
  return (
    <div style={{ padding: "32px 32px", background: bg, position: "relative" }}>
      <style>{`
        .dfxps-card{transition:transform 0.3s ease, box-shadow 0.3s ease}
        .dfxps-card:hover{transform:translateY(-2px);box-shadow:0 0 0 1px var(--ac), 0 24px 48px -16px var(--ac)}
        @media (max-width:760px){.dfxps-grid{grid-template-columns:1fr !important}}
      `}</style>
      <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px", position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 14px",
            borderRadius: 100,
            background: `${accent}14`,
            border: `1px solid ${accent}33`,
            marginBottom: 14,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: accent,
              fontFamily: "Sora",
            }}
          >
            {eyebrow}
          </span>
        </div>
        <h2 className="h-section" style={{ color: "var(--s-ink)", margin: 0, marginBottom: 10, fontFamily: "Sora" }}>
          {title}{" "}
          <span
            style={{
              background: `linear-gradient(115deg, ${accent} 0%, #82E2B6 55%, ${V_LIGHT} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {titleAccent}
          </span>
        </h2>
        <p style={{ fontSize: 14, color: "var(--s-muted)", lineHeight: 1.65, margin: "0 auto", maxWidth: CW.lg, fontFamily: "Sora" }}>
          {sub}
        </p>
      </div>
      <div
        className="dfxps-grid stack-sm"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr 1fr",
          gap: 20,
          alignItems: "stretch",
          maxWidth: RAIL,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            className="dfxps-card"
            style={
              {
                "--ac": accent,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "32px 32px",
                borderRadius: 20,
                border: 0,
                background: `radial-gradient(ellipse at 20% 0%, ${accent}${it.featured ? "16" : "0e"} 0%, transparent 55%), radial-gradient(ellipse at 80% 110%, ${accent}0a 0%, transparent 50%), var(--s-card)`,
                boxShadow: it.featured ? `0 0 0 2px ${accent}, 0 20px 50px -22px ${accent}99` : undefined,
              } as React.CSSProperties
            }
          >
            {it.featured && (
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "4px 12px",
                  borderRadius: 100,
                  background: accent,
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  fontFamily: "Sora",
                  whiteSpace: "nowrap",
                }}
              >
                {it.badge || "Recommended"}
              </div>
            )}
            <div style={{ margin: "8px 0 24px", height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Glyph kind={it.glyph} />
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0 }} />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: accent,
                  fontFamily: "Sora",
                }}
              >
                {it.kicker}
              </span>
            </div>
            <h3 className="h-card" style={{ color: "var(--s-ink)", margin: "0 0 10px", fontFamily: "Sora" }}>
              {it.title}
            </h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--s-muted)", margin: 0, fontFamily: "Sora" }}>{it.body}</p>
            {it.cta && (
              <div style={{ marginTop: "auto", paddingTop: 22 }}>
                <button
                  onClick={() => onCta && onCta(it)}
                  style={{
                    height: 40,
                    padding: "0 20px",
                    borderRadius: 100,
                    border: `1px solid ${accent}59`,
                    background: `${accent}14`,
                    color: accent,
                    fontSize: 12.5,
                    fontWeight: 600,
                    fontFamily: "Sora",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  {it.cta}
                  <span style={{ fontSize: 14, lineHeight: 1 }}>→</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Real() {
  const router = useRouter();
  const openApp = () => router.push(appHref("real"));

  const defiSteps = [
    { n: "1", t: "Discover Opportunities", d: "Browse hand-picked, asset-backed deals with clear structure." },
    { n: "2", t: "Invest On Chain", d: "Connect your wallet and invest in real assets that earn income." },
    { n: "3", t: "Earn Income", d: "Income comes from the assets, paid out in real time." },
    { n: "4", t: "Manage Your Position", d: "Track and manage income from your dashboard. Claim anytime." },
  ];
  const utilities = [
    { icon: "Database", t: "Protocol Yield", d: "Stake $REAL to earn a share of revenue from every product." },
    { icon: "Shield", t: "Governance", d: "Token holders steer the platform: settings, listings, and treasury." },
    { icon: "Activity", t: "Buybacks", d: "Platform revenue funds automatic buy-backs for holders." },
    { icon: "Globe", t: "Network Access", d: "$REAL powers the network and opens access across Defactor." },
  ];
  const stats = [
    { label: "Token", value: "$REAL" },
    { label: "Network", value: "Base · Multi-chain" },
    { label: "Utility", value: "Stake · Govern · Earn" },
    { label: "Supply", value: "Fixed" },
  ];
  const steps = [
    { n: "1", t: "Acquire $REAL", d: "Buy $REAL on supported exchanges, or earn it on Defactor." },
    { n: "2", t: "Stake to Earn", d: "Lock $REAL to earn a share of revenue from Raise, Mint, and Yield." },
    { n: "3", t: "Govern & Compound", d: "Stake to vote on where the platform goes. Buy-backs compound value." },
  ];

  return (
    <div className="dfx-site dfx-night" style={{ minHeight: "100vh", background: "var(--s-bg)" }}>
      <ChordMeshHero variant="hub" height={580} withGrain withChordStripe>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "radial-gradient(ellipse at 50% 40%, rgba(8,3,24,0.45) 0%, rgba(5,1,16,0.85) 100%)",
          }}
        />
        {/* OrbitField animation dropped — static gradient backdrop */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "radial-gradient(ellipse at 30% 20%, " + V + "22 0%, transparent 60%)",
            opacity: 0.7,
          }}
        />
        <div
          className="dfx-real-hero stack-sm"
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: 580,
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            alignItems: "start",
            gap: 44,
            maxWidth: RAIL,
            margin: "0 auto",
            padding: "64px 40px",
          }}
        >
          <div style={{ pointerEvents: "none" }}>
            <div style={{ display: "flex", alignItems: "center", height: 46, gap: 11, marginBottom: 14 }}>
              <RealLockup h={40} />
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: V_LIGHT, flexShrink: 0 }} />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: V_LIGHT,
                  fontFamily: "Sora",
                }}
              >
                The $REAL App · stake · govern · earn · yield
              </span>
            </div>
            <h1 className="h-hero" style={{ color: "#fff", margin: 0, marginBottom: 18 }}>
              Stake <span style={{ fontWeight: 700, color: V }}>$REAL</span> for Protocol Rewards
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.74)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: CW.md,
                fontFamily: "Sora",
              }}
            >
              A separate app for crypto users — stake, pool, vote, and share in revenue.
            </p>
            <div style={{ pointerEvents: "auto", display: "inline-block", marginTop: 26 }}>
              <button
                onClick={openApp}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  height: 46,
                  padding: "0 24px",
                  borderRadius: 100,
                  cursor: "pointer",
                  background: "linear-gradient(180deg, #211147 0%, #110828 100%)",
                  border: `1px solid ${V}66`,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "Sora",
                  boxShadow: `0 0 0 1px ${V}22, 0 8px 28px ${V}44, inset 0 1px 0 rgba(255,255,255,0.06)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${V}55, 0 10px 34px ${V}66, inset 0 1px 0 rgba(255,255,255,0.08)`;
                  e.currentTarget.style.borderColor = V;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${V}22, 0 8px 28px ${V}44, inset 0 1px 0 rgba(255,255,255,0.06)`;
                  e.currentTarget.style.borderColor = `${V}66`;
                }}
              >
                <Icon name="Wallet" size={16} color={V} strokeWidth={2} /> Open $REAL App
              </button>
            </div>
          </div>
          <div style={{ pointerEvents: "none" }}>
            {/* Interactive $REAL orbit diagram — animation dropped, rendered as STATIC SVG */}
            <div
              className="dfx-real-diagram"
              style={{
                position: "relative",
                borderRadius: 16,
                border: "1px solid #5A5BEB33",
                background: "radial-gradient(ellipse at 32% 18%, #5A5BEB26, transparent 64%), #0A0420",
                overflow: "hidden",
                aspectRatio: "4 / 3",
              }}
            >
              <svg
                viewBox="0 0 440 330"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: "block" }}
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="rdGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#5A5BEB" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#5A5BEB" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="rdToken" cx="0.4" cy="0.33" r="0.8">
                    <stop offset="0" stopColor="#8586F2" />
                    <stop offset="0.55" stopColor="#5A5BEB" />
                    <stop offset="1" stopColor="#3D3EC4" />
                  </radialGradient>
                  <radialGradient id="rdNode" cx="0.5" cy="0.38" r="0.62">
                    <stop offset="0" stopColor="#A3A4F6" />
                    <stop offset="1" stopColor="#5A5BEB" />
                  </radialGradient>
                  <linearGradient id="rdFlow" x1="0.5" y1="0" x2="1" y2="0.5">
                    <stop offset="0" stopColor="#5A5BEB" stopOpacity="0" />
                    <stop offset="0.45" stopColor="#8182EF" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#B9BAF8" />
                  </linearGradient>
                </defs>
                <circle cx="220" cy="158" r="88" fill="url(#rdGlow)" opacity="0.20" />
                <circle cx="220" cy="158" r="120" fill="none" stroke="#8182EF" strokeOpacity="0.28" strokeWidth="1.3" />
                <path d="M220 38 A120 120 0 0 1 340 158" fill="none" stroke="url(#rdFlow)" strokeWidth="3" strokeLinecap="round" />
                <path d="M340 158 l-5.5 -8.5 l11.5 1.5 z" fill="#B9BAF8" />
                {/* Stake node */}
                <circle cx="220" cy="38" r="13" fill="url(#rdGlow)" />
                <circle cx="220" cy="38" r="6.5" fill="url(#rdNode)" stroke="#EFEFFF" strokeOpacity="0.85" strokeWidth="1.4" />
                <text x="220" y="14" textAnchor="middle" fontFamily="Sora,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="var(--s-ink)" letterSpacing="-0.2">
                  Stake
                </text>
                <text x="220" y="25" textAnchor="middle" fontFamily="Sora,system-ui,sans-serif" fontSize="9.5" fontWeight="500" fill="var(--s-muted)">
                  revenue share
                </text>
                {/* Govern node */}
                <circle cx="340" cy="158" r="13" fill="url(#rdGlow)" />
                <circle cx="340" cy="158" r="6.5" fill="url(#rdNode)" stroke="#EFEFFF" strokeOpacity="0.85" strokeWidth="1.4" />
                <text x="356" y="155" textAnchor="start" fontFamily="Sora,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="var(--s-ink)" letterSpacing="-0.2">
                  Govern
                </text>
                <text x="356" y="168" textAnchor="start" fontFamily="Sora,system-ui,sans-serif" fontSize="9.5" fontWeight="500" fill="var(--s-muted)">
                  vote &amp; delegate
                </text>
                {/* Buy-backs node */}
                <circle cx="220" cy="278" r="13" fill="url(#rdGlow)" />
                <circle cx="220" cy="278" r="6.5" fill="url(#rdNode)" stroke="#EFEFFF" strokeOpacity="0.85" strokeWidth="1.4" />
                <text x="220" y="298" textAnchor="middle" fontFamily="Sora,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="var(--s-ink)" letterSpacing="-0.2">
                  Buy-backs
                </text>
                <text x="220" y="310" textAnchor="middle" fontFamily="Sora,system-ui,sans-serif" fontSize="9.5" fontWeight="500" fill="var(--s-muted)">
                  value compounds
                </text>
                {/* Access node */}
                <circle cx="100" cy="158" r="13" fill="url(#rdGlow)" />
                <circle cx="100" cy="158" r="6.5" fill="url(#rdNode)" stroke="#EFEFFF" strokeOpacity="0.85" strokeWidth="1.4" />
                <text x="84" y="155" textAnchor="end" fontFamily="Sora,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="var(--s-ink)" letterSpacing="-0.2">
                  Access
                </text>
                <text x="84" y="168" textAnchor="end" fontFamily="Sora,system-ui,sans-serif" fontSize="9.5" fontWeight="500" fill="var(--s-muted)">
                  across Defactor
                </text>
                {/* Center token */}
                <circle cx="220" cy="158" r="60" fill="url(#rdGlow)" opacity="0.85" />
                <circle cx="220" cy="158" r="46" fill="url(#rdToken)" stroke="#B9BAF8" strokeOpacity="0.55" strokeWidth="1.5" />
                <text x="220" y="156" textAnchor="middle" fontFamily="Sora,system-ui,sans-serif" fontSize="21" fontWeight="700" fill="#ffffff" letterSpacing="-0.5">
                  $REAL
                </text>
                <text x="220" y="173" textAnchor="middle" fontFamily="Sora,system-ui,sans-serif" fontSize="8" fontWeight="600" fill="#D9DAFB" letterSpacing="1.5">
                  PROTOCOL TOKEN
                </text>
              </svg>
            </div>
          </div>
        </div>
      </ChordMeshHero>

      {/* ── Put Stablecoins to Work ── */}
      <div style={{ borderTop: "1px solid var(--s-border)" }}>
        <>
          <div id="track-defi" style={{ padding: "32px 32px", background: "var(--s-surface-alt)" }}>
            <TrackHead
              kicker="$REAL App · DeFi"
              title="Put Stablecoins to Work in Real-World Assets"
              lead="Transparent access to real-world-asset pools — your funds, your control, from $1."
            />
          </div>
          <div style={{ position: "relative", overflow: "hidden", background: "var(--s-surface-alt)", isolation: "isolate" }}>
            {/* ConstellationPatternField animation dropped — static gradient backdrop */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "radial-gradient(ellipse at 30% 20%, " + GOLD + "18 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 1,
                background:
                  "linear-gradient(180deg, var(--s-surface-alt) 0%, transparent 24%, transparent 76%, var(--s-surface-alt) 100%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <PillarStructures
                accent={GOLD}
                bg="transparent"
                onCta={openApp}
                eyebrow="Types of Investment"
                title="Three Ways to"
                titleAccent="Earn Transparent Income."
                sub="Pools, income-earning assets, or reward-boosted entry — pick your path."
                items={[
                  {
                    kicker: "Liquidity",
                    title: "Earn From Pools",
                    glyph: "lattice",
                    cta: "Explore Pools",
                    body: "Add to shared pools for tokenized assets like RealGold — earn from trading and rewards.",
                  },
                  {
                    kicker: "Yield",
                    title: "Income-Earning Assets",
                    glyph: "isolines",
                    featured: true,
                    badge: "Most Popular",
                    cta: "Explore Real Assets",
                    body: "Invest in tokenized real-world assets earning income from real activity — visible in real time.",
                  },
                  {
                    kicker: "Incentives",
                    title: "Reward-Boosted Entry",
                    glyph: "tranches",
                    cta: "Explore Rewards",
                    body: "Enter selected pools with extra rewards that lower entry cost.",
                  },
                ]}
              />
            </div>
          </div>

          {/* ── How It Works (DeFi 4-step) ── */}
          <div style={{ padding: "32px 32px", background: "var(--s-surface-alt)" }}>
            <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: "0 0 6px", fontFamily: "Sora" }}>
              How It Works
            </h2>
            <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--s-muted)", margin: "0 auto 26px", maxWidth: 540, fontFamily: "Sora" }}>
              Explore real-world-backed opportunities and manage everything from one place.
            </p>
            <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {defiSteps.map((st, k) => (
                <div
                  key={k}
                  style={{
                    background: `radial-gradient(ellipse at 25% 0%, ${GOLD}08 0%, transparent 60%), var(--s-surface)`,
                    border: `1px solid ${GOLD}28`,
                    borderRadius: 20,
                    padding: "22px 20px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD}cc 50%, transparent 100%)`,
                    }}
                  />
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: `${GOLD}14`,
                      border: `1px solid ${GOLD}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: GOLD,
                      marginBottom: 14,
                      marginTop: 8,
                      fontFamily: "Sora",
                    }}
                  >
                    {st.n}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--s-ink)", marginBottom: 8, fontFamily: "Sora" }}>{st.t}</div>
                  <div style={{ fontSize: 11.5, color: "var(--s-muted)", lineHeight: 1.6, fontFamily: "Sora" }}>{st.d}</div>
                </div>
              ))}
            </div>
          </div>

          <SectionSeam accent={GOLD} />

          {/* ── RealGold pool spotlight (RWAioSpotlight diagram — animation dropped, STATIC) ── */}
          <div style={{ padding: "32px 32px", background: "var(--s-surface)" }}>
            <div
              className="stack-sm"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", maxWidth: RAIL, margin: "0 auto" }}
            >
              <div>
                <MEyebrow audience="invest" style={{ marginBottom: 12 }}>
                  Jump In with RealGold
                </MEyebrow>
                <h2 className="h-section" style={{ color: "var(--s-ink)", margin: 0, marginBottom: 12, fontFamily: "Sora" }}>
                  Real-World Assets, Starting From $1
                </h2>
                <p style={{ fontSize: 13.5, color: "var(--s-muted)", lineHeight: 1.65, margin: 0, marginBottom: 20, fontFamily: "Sora" }}>
                  Own a fraction of real-world assets for as little as $1. RealGold swaps directly on Aerodrome — transparent pricing, verified
                  issuance, no minimums.
                </p>
                <BuyRealBtn size="md" />
              </div>
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  border: "1px solid rgba(225,163,37,0.22)",
                  background: "radial-gradient(ellipse at 28% 24%, rgba(225,163,37,0.12), transparent 62%), var(--s-card-2)",
                  overflow: "hidden",
                  aspectRatio: "16 / 10",
                }}
              >
                <svg viewBox="0 0 480 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ display: "block" }}>
                  <defs>
                    <linearGradient id="rgBar" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#FBE7B8" />
                      <stop offset="0.5" stopColor="#E0A225" />
                      <stop offset="1" stopColor="#9A6E14" />
                    </linearGradient>
                    <radialGradient id="rgGlow" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0" stopColor="#E0A225" stopOpacity="0.62" />
                      <stop offset="1" stopColor="#E0A225" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="98" cy="150" r="92" fill="url(#rgGlow)" />
                  <rect x="46" y="118" width="104" height="64" rx="9" fill="url(#rgBar)" stroke="#FBE7B8" strokeOpacity="0.55" />
                  <line x1="58" y1="134" x2="138" y2="134" stroke="#7a560f" strokeOpacity="0.5" strokeWidth="1.5" />
                  <line x1="58" y1="150" x2="138" y2="150" stroke="#7a560f" strokeOpacity="0.5" strokeWidth="1.5" />
                  <line x1="58" y1="166" x2="138" y2="166" stroke="#7a560f" strokeOpacity="0.5" strokeWidth="1.5" />
                  <text x="98" y="205" textAnchor="middle" fill="#F0C46A" fontSize="12" fontFamily="Sora" fontWeight="700">
                    RealGold
                  </text>
                  <text x="98" y="220" textAnchor="middle" fill="#8C8AA6" fontSize="9" fontFamily="Sora">
                    1 vaulted asset
                  </text>
                  <path d="M150 134 C 208 120 250 108 296 108" fill="none" stroke="#E0A225" strokeOpacity="0.28" strokeWidth="1.2" />
                  <path d="M150 150 C 212 150 250 150 296 150" fill="none" stroke="#E0A225" strokeOpacity="0.28" strokeWidth="1.2" />
                  <path d="M150 166 C 208 180 250 192 296 192" fill="none" stroke="#E0A225" strokeOpacity="0.28" strokeWidth="1.2" />
                  {/* Animated flow dots + fraction grid dropped — static representation */}
                  <circle cx="296" cy="108" r="5" fill="#F5D084" stroke="#fff" strokeOpacity="0.65" />
                  <circle cx="296" cy="150" r="5" fill="#F5D084" stroke="#fff" strokeOpacity="0.65" />
                  <circle cx="296" cy="192" r="5" fill="#F5D084" stroke="#fff" strokeOpacity="0.65" />
                  <g>
                    {Array.from({ length: 20 }).map((_, i) => {
                      const col = i % 5;
                      const row = Math.floor(i / 5);
                      return (
                        <rect
                          key={i}
                          x={300 + col * 30}
                          y={66 + row * 30}
                          width="22"
                          height="22"
                          rx="5"
                          fill="#E0A225"
                          fillOpacity="0.3"
                          stroke="#E0A225"
                          strokeOpacity="0.45"
                          strokeWidth="1"
                        />
                      );
                    })}
                  </g>
                  <text x="378" y="252" textAnchor="middle" fill="#E0A225" fontSize="27" fontFamily="Sora" fontWeight="800">
                    $1
                  </text>
                  <text x="378" y="268" textAnchor="middle" fill="#8C8AA6" fontSize="9.5" fontFamily="Sora">
                    per fraction · no minimum
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </>
      </div>

      {/* ── Protocol Yield + Governance diagrams (animations dropped — STATIC) ── */}
      <div style={{ padding: "32px 32px", background: NAVY }}>
        <div className="dfx-two-up stack-sm" style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              border: "1px solid #5A5BEB33",
              background: "radial-gradient(ellipse at 32% 18%, #5A5BEB26, transparent 64%), var(--s-card-2)",
              overflow: "hidden",
              aspectRatio: "16 / 11",
            }}
          >
            <svg viewBox="0 0 480 330" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ display: "block", fontFamily: "Sora" }}>
              <defs>
                <radialGradient id="gV1" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#5A5BEB" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#5A5BEB" stopOpacity="0" />
                </radialGradient>
              </defs>
              <text x="60" y="46" fill="#9192F3" fontSize="11" fontWeight="700">
                Protocol Yield
              </text>
              <line x1="60" y1="262" x2="430" y2="262" stroke="#fff" strokeOpacity="0.12" />
              <line x1="60" y1="262" x2="60" y2="70" stroke="#fff" strokeOpacity="0.12" />
              <path d="M60 250 C 130 240 175 215 220 185 C 270 150 320 120 420 78 L 420 262 L 60 262 Z" fill="#5A5BEB" fillOpacity="0.12" />
              <path d="M60 250 C 130 240 175 215 220 185 C 270 150 320 120 420 78" fill="none" stroke="#9192F3" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="420" cy="78" r="5.5" fill="#fff" />
              <ellipse cx="92" cy="300" rx="26" ry="8" fill="#5A5BEB" fillOpacity="0.3" stroke="#8182EF" strokeOpacity="0.5" />
              <ellipse cx="92" cy="289" rx="26" ry="8" fill="#5A5BEB" fillOpacity="0.42" stroke="#8182EF" strokeOpacity="0.5" />
              <ellipse cx="92" cy="278" rx="26" ry="8" fill="#5A5BEB" fillOpacity="0.54" stroke="#8182EF" strokeOpacity="0.5" />
              <ellipse cx="92" cy="267" rx="26" ry="8" fill="#5A5BEB" fillOpacity="0.66" stroke="#8182EF" strokeOpacity="0.5" />
              <text x="92" y="318" textAnchor="middle" fill="#8C8AA6" fontSize="9">
                staked $REAL
              </text>
              <rect x="430" y="196" width="40" height="30" rx="7" fill="#150b32" stroke="#8182EF" strokeOpacity="0.6" />
              <text x="450" y="215" textAnchor="middle" fill="#9192F3" fontSize="9" fontWeight="700">
                earn
              </text>
              <text x="244" y="62" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800">
                APY
              </text>
            </svg>
          </div>
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              border: "1px solid #5A5BEB33",
              background: "radial-gradient(ellipse at 32% 18%, #5A5BEB26, transparent 64%), var(--s-card-2)",
              overflow: "hidden",
              aspectRatio: "16 / 11",
            }}
          >
            <svg viewBox="0 0 480 330" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ display: "block", fontFamily: "Sora" }}>
              <rect x="250" y="110" width="180" height="120" rx="14" fill="#150b32" stroke="#8182EF" strokeOpacity="0.6" />
              <text x="340" y="138" textAnchor="middle" fill="#9192F3" fontSize="11" fontWeight="700">
                Proposal #42
              </text>
              <rect x="272" y="158" width="136" height="12" rx="6" fill="#5A5BEB" fillOpacity="0.18" />
              <rect x="272" y="158" width="130" height="12" rx="6" fill="#9192F3" />
              <text x="272" y="190" fill="#8C8AA6" fontSize="8.5">
                quorum
              </text>
              <text x="408" y="190" textAnchor="end" fill="#9192F3" fontSize="8.5" fontWeight="700">
                vote &amp; delegate
              </text>
              <text x="340" y="216" textAnchor="middle" fill="#3FD08B" fontSize="12" fontWeight="800">
                PASSED
              </text>
              <circle cx="70" cy="90" r="13" fill="#150b32" stroke="#8182EF" strokeOpacity="0.6" />
              <circle cx="70" cy="90" r="4" fill="#9192F3" />
              <circle cx="70" cy="170" r="13" fill="#150b32" stroke="#8182EF" strokeOpacity="0.6" />
              <circle cx="70" cy="170" r="4" fill="#9192F3" />
              <circle cx="70" cy="250" r="13" fill="#150b32" stroke="#8182EF" strokeOpacity="0.6" />
              <circle cx="70" cy="250" r="4" fill="#9192F3" />
              <circle cx="150" cy="60" r="13" fill="#150b32" stroke="#8182EF" strokeOpacity="0.6" />
              <circle cx="150" cy="60" r="4" fill="#9192F3" />
              <circle cx="150" cy="280" r="13" fill="#150b32" stroke="#8182EF" strokeOpacity="0.6" />
              <circle cx="150" cy="280" r="4" fill="#9192F3" />
              <path d="M70 90 C 160 90 200 168 250 168" fill="none" stroke="#5A5BEB" strokeOpacity="0.28" strokeWidth="1" />
              <path d="M70 170 C 160 170 200 168 250 168" fill="none" stroke="#5A5BEB" strokeOpacity="0.28" strokeWidth="1" />
              <path d="M70 250 C 160 250 200 168 250 168" fill="none" stroke="#5A5BEB" strokeOpacity="0.28" strokeWidth="1" />
              <path d="M150 60 C 240 60 200 168 250 168" fill="none" stroke="#5A5BEB" strokeOpacity="0.28" strokeWidth="1" />
              <path d="M150 280 C 240 280 200 168 250 168" fill="none" stroke="#5A5BEB" strokeOpacity="0.28" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div style={{ padding: "32px 32px", background: "#0D0523", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: RAIL_MD, margin: "0 auto" }}>
          {stats.map((st, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "Sora",
                  }}
                >
                  {st.label}
                </span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: V, letterSpacing: "-0.5px", fontFamily: "Sora" }}>{st.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Token Utility: 4 cards ── */}
      <div style={{ padding: "32px 32px", background: NAVY }}>
        <CenterEyebrow accent={V}>Token Utility</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "#fff", margin: 0, marginBottom: 24, fontFamily: "Sora" }}>
          One Token, Four Ways to Earn
        </h2>
        <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: CW.xl, margin: "0 auto" }}>
          {utilities.map((u, i) => (
            <div
              key={i}
              style={{
                background: `radial-gradient(ellipse at 20% 0%, ${V}1f 0%, transparent 55%), #0D0523`,
                border: `1px solid ${V}33`,
                borderRadius: 16,
                padding: "24px 24px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${V} 0%, ${V}cc 50%, transparent 100%)`,
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 10 }}>
                <Icon name={u.icon} size={22} color={V} strokeWidth={1.75} />
                <div className="h-feat" style={{ color: "#fff" }}>
                  {u.t}
                </div>
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.66)", lineHeight: 1.6, fontFamily: "Sora" }}>{u.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How Staking Works: 3-step ── */}
      <div style={{ padding: "32px 32px", background: "#0A0420" }}>
        <h2 className="h-section" style={{ textAlign: "center", color: "#fff", margin: "24px 0 28px", fontFamily: "Sora" }}>
          How Staking Works
        </h2>
        <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: RAIL_MD, margin: "0 auto" }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                background: `radial-gradient(ellipse at 25% 0%, ${V}1a 0%, transparent 60%), #0D0523`,
                border: `1px solid ${V}33`,
                borderRadius: 20,
                padding: "22px 20px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${V} 0%, ${V}cc 50%, transparent 100%)`,
                }}
              />
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: `${V}22`,
                  border: `1px solid ${V}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: V,
                  marginBottom: 14,
                  marginTop: 8,
                  fontFamily: "Sora",
                }}
              >
                {s.n}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 8, fontFamily: "Sora" }}>{s.t}</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.6, fontFamily: "Sora" }}>{s.d}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <div style={{ display: "inline-block" }}>
            <button
              onClick={openApp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                height: 46,
                padding: "0 24px",
                borderRadius: 100,
                cursor: "pointer",
                background: "linear-gradient(180deg, #211147 0%, #110828 100%)",
                border: `1px solid ${V}66`,
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Sora",
                boxShadow: `0 0 0 1px ${V}22, 0 8px 28px ${V}44, inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = V;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${V}66`;
              }}
            >
              <Icon name="Wallet" size={16} color={V} strokeWidth={2} /> Stake $REAL in the app
            </button>
          </div>
        </div>
      </div>

      {/* ── Proof: A Token Tied to Real Volume ── */}
      <div style={{ padding: "56px 32px", background: "var(--s-bg)" }}>
        <CenterEyebrow accent={GOLD}>Proof</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>
          A Token Tied to Real Volume.
        </h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.6, fontFamily: "Sora" }}>
          $REAL isn’t speculation — it tracks the assets, facilities, and fees moving through Defactor.
        </p>
        <div
          style={{
            position: "relative",
            maxWidth: 760,
            margin: "0 auto",
            borderRadius: 20,
            border: `1px solid ${GOLD}44`,
            background: `linear-gradient(180deg, ${GOLD}10, transparent 55%), var(--s-card)`,
            padding: "28px 28px 0",
            boxShadow: `0 26px 70px -40px ${GOLD}aa`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 13px",
              borderRadius: 999,
              border: `1px solid ${GOLD}55`,
              background: `${GOLD}14`,
              marginBottom: 20,
            }}
          >
            <span className="mlivedot" style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, fontFamily: "Sora" }}>
              Protocol activity
            </span>
          </div>
          <p style={{ fontSize: 16.5, color: "var(--s-ink)", lineHeight: 1.6, margin: "0 0 26px", fontFamily: "Sora", fontWeight: 500 }}>
            “Raise, Mint and Yield all run on $REAL — every facility funded, every asset issued, and every fee earned flows back through the token.”
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: `1px solid ${GOLD}26`,
              borderRadius: 14,
              overflow: "hidden",
              background: "var(--s-surface)",
            }}
          >
            {[
              { v: "$48M", l: "Assets tokenized" },
              { v: "1,200+", l: "$REAL holders" },
              { v: "3", l: "Products powered" },
            ].map((x, i) => (
              <div key={i} style={{ textAlign: "center", padding: "20px 12px", borderLeft: i ? `1px solid ${GOLD}26` : "none" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: GOLD, fontFamily: "Sora", lineHeight: 1 }}>{x.v}</div>
                <div style={{ fontSize: 11.5, color: "var(--s-muted)", marginTop: 8, fontFamily: "Sora" }}>{x.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", height: 5, marginTop: 22, marginLeft: -28, marginRight: -28 }}>
            <span style={{ flex: 1, background: "#5A5BEB" }} />
            <span style={{ flex: 1, background: "#26A66B" }} />
            <span style={{ flex: 1, background: "#E0A225" }} />
            <span style={{ flex: 1, background: "#0B7FAB" }} />
          </div>
        </div>
      </div>

      {/* ── Closing CTA hero ── */}
      <ChordMeshHero variant="hub" height={264} withGrain withChordStripe sink={false}>
        {/* ConstellationPatternField animation dropped — static gradient backdrop */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.4,
            background: "radial-gradient(ellipse at 30% 20%, #8182EF22 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 120% at 50% 50%, #5A5BEB26 0%, transparent 64%)",
          }}
        />
        <div
          style={{
            minHeight: 264,
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "52px 40px",
          }}
        >
          <MEyebrow audience="hub" dark style={{ justifyContent: "center", marginBottom: 10 }}>
            Get $REAL
          </MEyebrow>
          <h2 className="h-section" style={{ color: "#fff", margin: 0, marginBottom: 10, fontFamily: "Sora" }}>
            Put $REAL to Work.
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", margin: 0, marginBottom: 20, maxWidth: CW.md, fontFamily: "Sora" }}>
            Stake to back real-world assets, share in the upside, and help govern the protocol.
          </p>
          <MButton audience="hub" variant="primary" size="md" onClick={openApp}>
            Stake $REAL
          </MButton>
        </div>
      </ChordMeshHero>
    </div>
  );
}
