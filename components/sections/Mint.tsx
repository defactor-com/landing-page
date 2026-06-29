"use client";

import { useRouter } from "next/navigation";
import { G, GOLD, V_LIGHT, TEAL, CW, RAIL } from "@/lib/tokens";
import { Icon } from "@/components/ui/Icon";
import {
  MButton,
  MirrorCard,
  CenterEyebrow,
  MEyebrow,
  SectionSeam,
} from "@/components/ui/primitives";
import { Img } from "@/components/ui/Img";
import { CosmicHero } from "@/components/hero/CosmicHero";
import { ChordMeshHero } from "@/components/hero/ChordMeshHero";
import { appHref } from "@/components/layout/nav-config";
import { EMBLEM_SRC } from "@/lib/brand";

// ── Token Types grid (ported from PillarStructures, animations dropped) ──
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
  items: Array<{
    kicker: string;
    title: string;
    glyph: string;
    body: string;
    cta?: string;
    featured?: boolean;
    badge?: string;
  }>;
  bg?: string;
  onCta?: (it: { cta?: string }) => void;
}) {
  const Glyph = ({ kind }: { kind: string }) => {
    if (kind === "bars") {
      const hs = [30, 50, 38, 56, 34];
      return (
        <svg viewBox="0 0 96 96" width="60" height="60">
          {hs.map((h, i) => (
            <rect
              key={i}
              x={15 + i * 14}
              y={78 - h}
              width="8"
              height={h}
              rx="2"
              fill={accent}
              opacity={0.5 + i * 0.09}
            />
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
          <path
            d="M 6 46 Q 24 24 42 46 T 90 46"
            fill="none"
            stroke={accent}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.72"
          />
          <path
            d="M 6 60 Q 24 40 42 60 T 90 60"
            fill="none"
            stroke={accent}
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.4"
          />
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
      <style>{`.dfxps-card{transition:transform 0.3s ease, box-shadow 0.3s ease}.dfxps-card:hover{transform:translateY(-2px);box-shadow:0 0 0 1px var(--ac), 0 24px 48px -16px var(--ac)}@media (max-width:760px){.dfxps-grid{grid-template-columns:1fr !important}}`}</style>
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
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: accent, fontFamily: "Sora" }}>
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
              WebkitTextFillColor: "transparent",
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
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: accent, fontFamily: "Sora" }}>
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

// ── Compliance cross-cut band (animated isolines field dropped → static backdrop) ──
function ComplianceCrossCut() {
  const items = [
    { icon: "Shield", t: "KYB & Onboarding", d: "Everyone's verified before they can join a deal." },
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
        <p
          style={{
            textAlign: "center",
            fontSize: 13.5,
            color: "var(--s-muted)",
            maxWidth: 580,
            margin: "0 auto 32px",
            lineHeight: 1.6,
            fontFamily: "Sora",
          }}
        >
          Compliance isn't a product beside Raise, Yield and Mint — it's the layer that runs underneath all three. The same KYB, whitelisting and permissioning, everywhere capital moves.
        </p>
        <div
          className="dfx-comp-grid stack-sm"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, maxWidth: RAIL, margin: "0 auto" }}
        >
          {items.map((it, i) => (
            <MirrorCard key={i} accent={TEAL} style={{ padding: "22px 20px" }}>
              <div style={{ marginBottom: 14 }}>
                <Icon name={it.icon} size={26} color={TEAL} strokeWidth={1.9} />
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6, fontFamily: "Sora", letterSpacing: "-0.3px" }}>
                {it.t}
              </div>
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

export default function Mint() {
  const router = useRouter();
  const steps = [
    { n: "1", t: "Design Your Asset", d: "Set how your asset works — ownership, money flow, and who can hold it." },
    { n: "2", t: "Tokenize Your Asset", d: "Issue the token — ownership and transfer rules built in." },
    { n: "3", t: "Launch & Distribute", d: "Take it to market. Buyers and trading already wired in." },
    { n: "4", t: "Manage & Scale", d: "Run it for life: reporting, redemptions, and compliance in one place." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--s-bg)" }}>
      <CosmicHero
        audience="tokenize"
        accent={G}
        glow="rgba(40,166,107,0.82)"
        name="Mint"
        eyebrow="For asset issuers · the sell side"
        h1a="Any Real Asset,"
        h1b="Now a Compliant Token."
        phLabel="Tokenization console — design, mint, manage"
        sub="Asset, utility, or idea — issue it as a token investors can hold, rules built in from the start."
        kpis={[
          { v: "$250M+", l: "Assets tokenized" },
          { v: "6", l: "Chains supported" },
          { v: "100%", l: "Compliance-ready" },
          { v: "2 wks", l: "Avg. to issue" },
        ]}
        ctaPrimary="Start Tokenizing"
        ctaGhost="Talk to Our Team"
        onPrimary={() => router.push(appHref("tokenize"))}
        onGhost={() => router.push("/contact")}
      />

      <SectionSeam accent={G} />

      {/* ── Before & after ── */}
      <div style={{ padding: "40px 32px", background: "var(--s-surface)" }}>
        <CenterEyebrow accent={G}>Before & after</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>
          Tokenizing an Asset, Minus the Lawyers.
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: 13.5,
            color: "var(--s-muted)",
            maxWidth: 600,
            margin: "0 auto 32px",
            lineHeight: 1.6,
            fontFamily: "Sora",
          }}
        >
          Turning a real asset into a compliant token used to take months and a legal team. Here&rsquo;s the same job in Mint.
        </p>
        <div
          className="stack-sm"
          style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 18, maxWidth: RAIL, margin: "0 auto" }}
        >
          <div style={{ borderRadius: 18, border: "1px solid var(--s-line)", background: "var(--s-bg)", padding: "24px 22px", opacity: 0.78 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--s-lo)",
                marginBottom: 14,
                fontFamily: "Sora",
              }}
            >
              The old way
            </div>
            {["Months of legal back-and-forth", "A custom build for every asset", "Compliance bolted on at the end"].map((x, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 0", borderTop: i ? "1px solid var(--s-line)" : "none" }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 1,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: "1px solid var(--s-line)",
                    color: "var(--s-lo)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    lineHeight: 1,
                    fontFamily: "Sora",
                  }}
                >
                  –
                </span>
                <span style={{ fontSize: 13, color: "var(--s-muted)", lineHeight: 1.5, fontFamily: "Sora" }}>{x}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: `${G}1a`,
              border: `1px solid ${G}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 0 20px -4px ${G}88`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </div>
          <div
            style={{
              position: "relative",
              borderRadius: 18,
              border: `1px solid ${G}55`,
              background: `linear-gradient(180deg, ${G}14, transparent 60%), var(--s-card)`,
              padding: "24px 22px",
              boxShadow: `0 22px 56px -28px ${G}aa`,
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${G}, ${G}99, transparent)` }} />
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: G,
                marginBottom: 14,
                marginTop: 6,
                fontFamily: "Sora",
              }}
            >
              With Mint
            </div>
            {["Issue in weeks, not quarters", "Rules built into the token itself", "Bridged across every major chain"].map((x, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 0", borderTop: i ? `1px solid ${G}1f` : "none" }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 1,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: G,
                    color: "#08130d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    lineHeight: 1,
                    fontFamily: "Sora",
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 13, color: "var(--s-ink)", lineHeight: 1.5, fontFamily: "Sora" }}>{x}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionSeam accent={G} />

      {/* ── How it works: asset → token flow (animated flow dots dropped, static) ── */}
      <div style={{ padding: "44px 32px 52px", background: "var(--s-surface)" }}>
        <CenterEyebrow accent={G}>How it works</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: "0 0 6px", fontFamily: "Sora" }}>
          One Asset In. One Compliant Token Out.
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: 13.5,
            color: "var(--s-muted)",
            maxWidth: 560,
            margin: "0 auto 40px",
            lineHeight: 1.6,
            fontFamily: "Sora",
          }}
        >
          Defactor wraps your asset in rules, then mints it as a token the right investors can hold.
        </p>
        <style>{`
          .mmod{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;max-width:860px;margin:0 auto}
          .mmod-card{position:relative;border-radius:16px;border:1px solid rgba(38,166,107,0.28);background:var(--s-card);padding:24px 20px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 18px 44px -26px rgba(38,166,107,0.5)}
          .mmod-ico{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;background:rgba(38,166,107,0.10);border:1px solid rgba(38,166,107,0.22);margin-bottom:2px}
          .mmod-k{font-size:9.5px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#1d7a4f;font-family:Sora}
          .mmod-t{font-size:15px;font-weight:700;color:var(--s-ink);font-family:Sora;letter-spacing:-0.2px}
          .mmod-sub{font-size:11px;color:var(--s-muted);font-family:Sora;line-height:1.5}
          .mmod-seam{position:relative;width:150px;height:130px;display:flex;align-items:center;justify-content:center}
          .mmod-line{position:absolute;top:50%;left:5%;right:5%;height:2px;transform:translateY(-50%);background:linear-gradient(90deg,transparent,rgba(38,166,107,0.45) 28%,rgba(130,226,182,0.7) 50%,rgba(38,166,107,0.45) 72%,transparent)}
          .mmod-hub{position:relative;z-index:2;width:60px;height:60px;border-radius:50%;display:grid;place-items:center;background:var(--s-surface);border:1px solid rgba(38,166,107,0.34);box-shadow:0 0 0 7px var(--s-surface),0 8px 24px -8px rgba(38,166,107,0.6)}
          .mmod-hub img{width:30px;height:30px}
          .mmod-hubl{position:absolute;bottom:-24px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#1d7a4f;font-family:Sora;white-space:nowrap}
          .dfx-night .mmod-k,.dfx-night .mmod-hubl{color:#82E2B6}
          @media(max-width:720px){.mmod{grid-template-columns:1fr;gap:18px}.mmod-seam{width:auto;height:60px}.mmod-line{left:40%;right:40%}.mmod-hubl{bottom:-22px}}
        `}</style>
        <div className="mmod">
          <div className="mmod-card">
            <span className="mmod-ico">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#26A66B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <line x1="8" y1="8" x2="16" y2="8" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="16" x2="13" y2="16" />
              </svg>
            </span>
            <span className="mmod-k">Goes in</span>
            <span className="mmod-t">Your real asset</span>
            <span className="mmod-sub">Invoice · property · fund · idea</span>
          </div>
          <div className="mmod-seam">
            <div className="mmod-line" />
            <div className="mmod-hub">
              <img src={EMBLEM_SRC} alt="" />
              <span className="mmod-hubl">Mint wraps rules</span>
            </div>
          </div>
          <div className="mmod-card">
            <span className="mmod-ico">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#26A66B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" />
                <circle cx="12" cy="12" r="3.1" />
              </svg>
            </span>
            <span className="mmod-k">Comes out</span>
            <span className="mmod-t">A compliant token</span>
            <span className="mmod-sub">KYC-gated · multi-chain</span>
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 12.5,
            color: "var(--s-muted)",
            maxWidth: 520,
            margin: "44px auto 0",
            lineHeight: 1.6,
            fontFamily: "Sora",
          }}
        >
          The rules ride inside the token — so it only ever moves to the right hands.
        </p>
      </div>

      {/* ── Design / Mint / Manage / Scale 4-step rail (animated progress line dropped) ── */}
      <div style={{ padding: "32px 32px", background: "var(--s-surface-alt)", position: "relative", isolation: "isolate" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            background: `radial-gradient(ellipse 82% 62% at 50% -8%, ${G}12 0%, transparent 66%)`,
          }}
        />
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>
          Design. Mint. Manage.
        </h2>
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--s-muted)", margin: "0 auto 32px", fontFamily: "Sora" }}>
          Structure the asset, issue the token, open it to investors, and run servicing — start to finish.
        </p>
        <style>{`.mrail{position:relative;max-width:${RAIL}px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}.mrail-track{position:absolute;top:22px;left:8%;right:8%;height:2px;background:linear-gradient(90deg,${G}33,${G}66,${G}33);z-index:0}.mrail-node{position:relative;z-index:2;text-align:center}.mrail-num{width:44px;height:44px;margin:0 auto 14px;border-radius:50%;background:var(--s-card);border:2px solid ${G};color:${G};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;font-family:Sora;box-shadow:0 6px 18px -8px ${G}cc}.mrail-t{font-size:14px;font-weight:700;color:var(--s-ink);font-family:Sora;margin-bottom:6px}.mrail-d{font-size:12.5px;color:var(--s-muted);line-height:1.5;font-family:Sora}@media(max-width:720px){.mrail{grid-template-columns:1fr;gap:0}.mrail-track{top:0;bottom:0;left:21px;right:auto;width:2px;height:auto}.mrail-node{display:grid;grid-template-columns:44px 1fr;gap:14px;text-align:left;padding:12px 0;align-items:start}.mrail-num{margin:0}.mrail-t{grid-column:2}.mrail-d{grid-column:2}}`}</style>
        <div className="mrail">
          <div className="mrail-track" />
          {steps.map((s, i) => (
            <div className="mrail-node" key={i}>
              <div className="mrail-num">{s.n}</div>
              <div className="mrail-t">{s.t}</div>
              <div className="mrail-d">{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Token Types grid ── */}
      <PillarStructures
        accent={G}
        onCta={() => router.push(appHref("tokenize"))}
        eyebrow="Token Types"
        title="Three Token Types."
        titleAccent="One Rulebook."
        sub="Asset, utility, and idea tokens, each managed with the same rules built in."
        items={[
          {
            kicker: "Utility",
            title: "Utility Tokens",
            glyph: "bars",
            cta: "Create Utility Token",
            body: "Access to the Defactor platform from day one — earn, vote, and share in buybacks.",
          },
          {
            kicker: "Asset",
            title: "Asset Tokens",
            glyph: "nodes",
            featured: true,
            badge: "Featured",
            cta: "Create Asset Token",
            body: "Property, goods, and financial instruments — issued as tokens, managed in one dashboard across every chain.",
          },
          {
            kicker: "Idea",
            title: "Idea Tokens",
            glyph: "wave",
            cta: "Create Idea Token",
            body: "For early-stage ideas — build a community, then go public.",
          },
        ]}
      />

      <SectionSeam accent={G} />

      {/* ── Tokenization console image (num 13) ── */}
      <div style={{ padding: "32px 32px", background: "var(--s-surface)", position: "relative", isolation: "isolate" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            background: `radial-gradient(ellipse 82% 62% at 50% -8%, ${G}12 0%, transparent 66%)`,
          }}
        />
        <div style={{ maxWidth: RAIL, margin: "0 auto" }}>
          <Img num={13} page="mint" label="Tokenization console" accent={G} ratio="16 / 9" />
        </div>
      </div>

      <SectionSeam accent={G} />

      {/* ── Proof ── */}
      <style>{`@keyframes mProofPulse{0%{box-shadow:0 0 0 0 ${G}99}70%{box-shadow:0 0 0 7px ${G}00}100%{box-shadow:0 0 0 0 ${G}00}}.mlivedot{animation:mProofPulse 2s ease-out infinite}@media(prefers-reduced-motion:reduce){.mlivedot{animation:none}}`}</style>
      <div
        style={{
          padding: "44px 32px",
          background:
            "radial-gradient(ellipse 70% 60% at 25% 0%, rgba(38,166,107,0.10) 0%, transparent 55%), radial-gradient(ellipse 55% 60% at 85% 100%, rgba(38,166,107,0.06) 0%, transparent 50%), var(--s-surface)",
        }}
      >
        <CenterEyebrow accent={G}>Proof</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>
          From Real Asset to Live Token.
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: 13.5,
            color: "var(--s-muted)",
            maxWidth: 600,
            margin: "0 auto 32px",
            lineHeight: 1.6,
            fontFamily: "Sora",
          }}
        >
          One issuance on Defactor, by the numbers — start to live market.
        </p>
        <div
          style={{
            position: "relative",
            maxWidth: 760,
            margin: "0 auto",
            borderRadius: 20,
            border: `1px solid ${G}44`,
            background: `linear-gradient(180deg, ${G}10, transparent 55%), var(--s-card)`,
            padding: "28px 28px 0",
            boxShadow: `0 26px 70px -40px ${G}aa`,
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
              border: `1px solid ${G}55`,
              background: `${G}14`,
              marginBottom: 20,
            }}
          >
            <span className="mlivedot" style={{ width: 7, height: 7, borderRadius: "50%", background: G }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: G, fontFamily: "Sora" }}>
              Live issuance
            </span>
          </div>
          <p style={{ fontSize: 16.5, color: "var(--s-ink)", lineHeight: 1.6, margin: "0 0 26px", fontFamily: "Sora", fontWeight: 500 }}>
            &ldquo;An asset issuer turned a real-world fund into a compliant token — KYC-gated from day one, live across multiple chains, with eligibility enforced on every transfer.&rdquo;
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: `1px solid ${G}26`,
              borderRadius: 14,
              overflow: "hidden",
              background: "var(--s-surface)",
            }}
          >
            {[
              { v: "$12M", l: "Assets tokenized" },
              { v: "3 wks", l: "Kickoff to live" },
              { v: "6", l: "Chains bridged" },
            ].map((x, i) => (
              <div key={i} style={{ textAlign: "center", padding: "20px 12px", borderLeft: i ? `1px solid ${G}26` : "none" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: G, fontFamily: "Sora", lineHeight: 1 }}>{x.v}</div>
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

      <ComplianceCrossCut />

      {/* ── Footer CTA (HexPatternField dropped → static backdrop) ── */}
      <ChordMeshHero variant="tokenize" height={264} withGrain withChordStripe sink={false}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 120% at 50% 50%, #26A66B26 0%, transparent 64%)",
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
          <MEyebrow audience="tokenize" dark style={{ justifyContent: "center", marginBottom: 10 }}>
            Defactor Mint
          </MEyebrow>
          <h2 className="h-section" style={{ color: "#fff", margin: 0, marginBottom: 10, fontFamily: "Sora" }}>
            Any Real Asset, Now a Compliant Token.
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", margin: 0, marginBottom: 20, maxWidth: CW.md, fontFamily: "Sora" }}>
            Asset, utility, or idea — wrap it in the rules and mint a token the right investors can hold.
          </p>
          <MButton audience="tokenize" variant="primary" size="md" onClick={() => router.push(appHref("tokenize"))}>
            Start Tokenizing
          </MButton>
        </div>
      </ChordMeshHero>
    </div>
  );
}
