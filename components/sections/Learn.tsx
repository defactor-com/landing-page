import type { CSSProperties } from "react";
import { V, V_LIGHT, G, GOLD, TEAL, RAIL, RAIL_MD, CW } from "@/lib/tokens";
import { Icon } from "@/components/ui/Icon";
import { ChordMeshHero } from "@/components/hero/ChordMeshHero";
import { CenterEyebrow, MButton } from "@/components/ui/primitives";
import { Img } from "@/components/ui/Img";

type Goal = {
  accent: string;
  icon: string;
  title: string;
  lit: string;
  d: string;
  items: string[];
};

const GOALS: Goal[] = [
  {
    accent: G,
    icon: "Landmark",
    title: "I want to raise capital",
    lit: "No crypto needed",
    d: "Run a lending facility or borrow against invoices and assets — explained in plain finance terms.",
    items: ["How a digital facility works", "Open and run a facility", "Pay lenders automatically"],
  },
  {
    accent: V_LIGHT,
    icon: "Coins",
    title: "I want to tokenize an asset",
    lit: "New to this? We explain as we go",
    d: "Turn property, goods, or credit into compliant tokens — we explain the on-chain parts step by step.",
    items: ["What tokenizing actually means", "Issue a compliant token", "Manage, report, and redeem"],
  },
  {
    accent: GOLD,
    icon: "TrendingUp",
    title: "I want to invest for income",
    lit: "No crypto needed",
    d: "Earn income from vetted, asset-backed deals — like private markets, just faster and clearer.",
    items: ["How asset-backed returns work", "Browse and commit to deals", "Track income and reporting"],
  },
  {
    accent: TEAL,
    icon: "Activity",
    title: "I want to earn yield",
    lit: "For crypto-native users",
    d: "Stake $REAL, provide liquidity, and earn yield. Assumes you are already comfortable with DeFi.",
    items: ["Stake $REAL for rewards", "Provide liquidity to pools", "Yield, buybacks, and governance"],
  },
  {
    accent: V,
    icon: "Database",
    title: "I want to build on Defactor",
    lit: "For developers",
    d: "APIs, token standards, and architecture for engineers integrating Defactor.",
    items: ["Token standards (ERC-3643)", "API and SDK reference", "Smart-contract documentation"],
  },
];

type Resource = { t: string; d: string; a: string; file: string };

const RESOURCES: Resource[] = [
  { t: "Guides", d: "Step-by-step walkthroughs for issuers, operators, and investors.", a: V, file: "Image-21" },
  { t: "Documentation", d: "Technical references, token standards, and integration docs.", a: V_LIGHT, file: "Image-21.1" },
  { t: "Case Studies", d: "How real estate, commodity, and trade-finance issuers tokenize their assets.", a: G, file: "Image-21.2" },
  { t: "Glossary", d: "Real-world asset, tokenization, and crypto terms in plain language.", a: GOLD, file: "Image-21.3" },
];

export default function Learn() {
  return (
    <div className="dfx-site" style={{ background: "var(--s-bg)" }}>
      {/* ── HERO ── */}
      <ChordMeshHero variant="hub" height={580} withGrain withChordStripe>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "radial-gradient(ellipse at 15% 25%, rgba(90,91,235,0.16) 0%, transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(11,127,171,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 10%, rgba(90,91,235,0.10) 0%, transparent 46%), radial-gradient(ellipse at 25% 90%, rgba(224,162,37,0.09) 0%, transparent 46%), radial-gradient(ellipse at 50% 50%, rgba(129,130,239,0.07) 0%, transparent 70%), var(--s-bg)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: 580,
            display: "flex",
            alignItems: "center",
            padding: "52px 40px",
            maxWidth: RAIL,
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            className="dfx-learn-hero stack-sm"
            style={{ display: "grid", gridTemplateColumns: "0.84fr 1.16fr", gap: 48, alignItems: "center", width: "100%" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                <Icon name="Layers" size={56} color={V} strokeWidth={2} />
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--s-muted)", flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--s-muted)",
                    fontFamily: "Sora",
                  }}
                >
                  Learn
                </span>
              </div>
              <h1 className="h-hero" style={{ color: "var(--s-ink)", margin: 0, marginBottom: 18 }}>
                The Real-World Asset Knowledge Base
              </h1>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--s-muted)",
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: 400,
                  fontFamily: "Sora",
                }}
              >
                Understand real-world assets in digital markets — first principles to production.
              </p>
            </div>
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid var(--s-border)",
                boxShadow: "0 24px 60px -24px rgba(20,20,50,0.16)",
              }}
            >
              <Img
                page="learn"
                num={18}
                label="The Defactor knowledge base — guides, docs & case studies"
                accent={V_LIGHT}
                ratio="16 / 10"
              />
            </div>
          </div>
        </div>
      </ChordMeshHero>

      {/* ── WHAT BROUGHT YOU HERE? ── */}
      <div style={{ padding: "44px 32px 16px", background: "var(--s-bg)" }}>
        <CenterEyebrow accent={G}>Start with what you want to do</CenterEyebrow>
        <h2
          className="h-section"
          style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}
        >
          What Brought You Here?
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: 13.5,
            color: "var(--s-muted)",
            maxWidth: 610,
            margin: "0 auto 34px",
            lineHeight: 1.6,
            fontFamily: "Sora",
          }}
        >
          Pick your goal. Some paths assume no crypto knowledge at all; others are built for people already on-chain — we
          meet you where you are.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: RAIL_MD, margin: "0 auto" }}>
          {GOALS.map((it, i) => (
            <div
              key={i}
              className="dfxps-card"
              style={
                {
                  "--ac": it.accent,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "20px 22px",
                  background: "var(--s-card)",
                  border: "1px solid var(--s-border)",
                  borderLeft: "3px solid " + it.accent,
                  borderRadius: 16,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                } as CSSProperties
              }
            >
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: it.accent }} />
              <div
                style={{
                  flexShrink: 0,
                  width: 44,
                  height: 44,
                  borderRadius: 100,
                  background: `${it.accent}1f`,
                  border: `1px solid ${it.accent}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={it.icon} size={20} color={it.accent} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                  <span className="h-feat">{it.title}</span>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: it.accent,
                      background: `${it.accent}1a`,
                      border: `1px solid ${it.accent}3a`,
                      borderRadius: 100,
                      padding: "3px 9px",
                      fontFamily: "Sora",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {it.lit}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "var(--s-muted)", lineHeight: 1.55, marginBottom: 12, fontFamily: "Sora" }}>
                  {it.d}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {it.items.map((t, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: 11.5,
                        color: "var(--s-ink)",
                        background: "var(--s-surface)",
                        border: "1px solid var(--s-border)",
                        borderRadius: 8,
                        padding: "5px 10px",
                        fontFamily: "Sora",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span style={{ flexShrink: 0, alignSelf: "center", color: it.accent, display: "flex" }}>
                <Icon name="ArrowRight" size={18} color={it.accent} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RESOURCE LIBRARY ── */}
      <div style={{ padding: "32px 32px", background: "var(--s-bg)" }}>
        <div
          className="dfx-learn-grid stack-sm"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: RAIL_MD, margin: "0 auto" }}
        >
          {RESOURCES.map((r, i) => (
            <div
              key={i}
              className="dfxps-card"
              style={
                {
                  "--ac": r.a,
                  background: "var(--s-card)",
                  border: "1px solid var(--s-border)",
                  borderLeft: "3px solid " + r.a,
                  borderRadius: 16,
                  overflow: "hidden",
                  position: "relative",
                } as CSSProperties
              }
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${r.a} 0%, ${r.a}cc 50%, transparent 100%)`,
                  zIndex: 1,
                }}
              />
              <Img page="learn" file={r.file} label={r.t} accent={r.a} height={120} />
              <div style={{ padding: "22px 26px 26px" }}>
                <div className="h-feat" style={{ marginBottom: 8 }}>
                  {r.t}
                </div>
                <div style={{ fontSize: 13, color: "var(--s-muted)", lineHeight: 1.6, marginBottom: 16, fontFamily: "Sora" }}>
                  {r.d}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: r.a, cursor: "pointer", fontFamily: "Sora" }}>
                  Browse →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── (RipplePatternField / PatternSection dropped: static backdrop) */}
      <div style={{ padding: "32px 32px", background: "var(--s-surface)" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: 300,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            background: "linear-gradient(135deg, #1a1240 0%, #06051a 100%)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(ellipse at 30% 20%, ${V}22 0%, transparent 60%)`,
            }}
          />
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: CW.lg }}>
            <h2 className="h-section" style={{ color: "#fff", margin: 0, marginBottom: 12, fontFamily: "Sora" }}>
              New to Real-World Assets?
            </h2>
            <p
              style={{
                fontSize: 13.5,
                color: "rgba(255,255,255,0.74)",
                lineHeight: 1.6,
                margin: "0 auto 20px",
                maxWidth: CW.sm,
                fontFamily: "Sora",
              }}
            >
              Start with the fundamentals — what real-world assets are, why they’re moving into digital markets, and how
              Defactor fits in.
            </p>
            <MButton audience="hub" variant="primary" size="md">
              Read the Intro Guide
            </MButton>
          </div>
        </div>
      </div>
    </div>
  );
}
