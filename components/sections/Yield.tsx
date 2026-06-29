"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { GOLD, G, TEAL, V_LIGHT, RAIL, CW } from "@/lib/tokens";
import { Icon } from "@/components/ui/Icon";
import { MButton, MirrorCard, CenterEyebrow, MEyebrow, SectionSeam, onAccent } from "@/components/ui/primitives";
import { Img } from "@/components/ui/Img";
import { CosmicHero } from "@/components/hero/CosmicHero";
import { ChordMeshHero } from "@/components/hero/ChordMeshHero";
import { appHref } from "@/components/layout/nav-config";

// ── Sparkline (static SVG) ──
function Sparkline({ data, accent, height = 34 }: { data: number[]; accent: string; height?: number }) {
  const W = 200,
    H = height,
    pad = 3;
  const mx = Math.max.apply(null, data),
    mn = Math.min.apply(null, data),
    rng = mx - mn || 1;
  const pts = data.map((v, i) => [pad + (i / (data.length - 1)) * (W - pad * 2), H - pad - ((v - mn) / rng) * (H - pad * 2)]);
  const line = pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const area = pad + "," + (H - pad) + " " + line + " " + (W - pad) + "," + (H - pad);
  const gid = "spk" + accent.replace("#", "");
  return (
    <svg width="100%" height={H} viewBox={"0 0 " + W + " " + H} preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.26" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={"url(#" + gid + ")"} />
      <polyline points={line} fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// ── DealFlowTicker (lightweight setInterval rotation) ──
function DealFlowTicker() {
  const GOLD2 = "#E0A225";
  const events = ["Verdant Holdings · $25,000 committed", "RealGold Reserve · $4,200 allocated", "New allocator verified · KYB cleared", "Infrastructure Bond · $50,000 committed", "Verdant Holdings · funding 85% → 86%"];
  const [secs, setSecs] = useState(2);
  const [ev, setEv] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s >= 59 ? 1 : s + 1)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => {
      setEv((e) => (e + 1) % events.length);
      setSecs(1);
    }, 4200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "8px 16px", borderRadius: 100, border: `1px solid ${GOLD2}33`, background: `${GOLD2}0c`, maxWidth: "100%" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD2, boxShadow: `0 0 6px ${GOLD2}`, animation: "pulseDot 1.8s ease-out infinite" }} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD2, fontFamily: "Sora" }}>Live</span>
      </span>
      <span style={{ width: 1, height: 14, background: `${GOLD2}33`, flexShrink: 0 }} />
      <span key={ev} style={{ fontSize: 11.5, color: "var(--s-muted)", fontFamily: "Sora", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {events[ev]} <span style={{ opacity: 0.6 }}>· {secs}s ago</span>
      </span>
    </div>
  );
}

type Deal = {
  name: string;
  accent: string;
  spark: number[];
  tag: string;
  icon: string;
  body: string;
  apy: string;
  term: string;
  min: string;
  raised: string;
  target: string;
  funded: number;
};

export default function Yield() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const night = mounted ? resolvedTheme !== "light" : true;

  const openApp = () => router.push(appHref("invest"));

  const deals: Deal[] = [
    { name: "Verdant Holdings · Revenue Facility", accent: GOLD, spark: [20, 27, 33, 41, 50, 62, 73, 85], tag: "Private Credit", icon: "Wallet", body: "Asset-backed revenue loan. Senior position, publicly tracked.", apy: "14.0%", term: "18 mo", min: "$5,000", raised: "$3.4M", target: "$4.0M", funded: 85 },
    { name: "RealGold Reserve Pool", accent: GOLD, spark: [28, 35, 44, 52, 58, 68, 79, 85], tag: "Tokenized Commodity", icon: "Coins", body: "Tokenized gold, backed 1:1 by audited bullion.", apy: "Spot +2.1%", term: "Open", min: "$100", raised: "$12.8M", target: "$15.0M", funded: 85 },
    { name: "Infrastructure Bond Series A", accent: GOLD, spark: [8, 15, 22, 28, 35, 45, 53, 61], tag: "Tokenized Bond", icon: "Landmark", body: "Tokenized infra bond. Quarterly income, fully reported.", apy: "9.2%", term: "36 mo", min: "$10,000", raised: "$6.1M", target: "$10.0M", funded: 61 },
  ];

  const capSteps = [
    { n: "1", t: "Get Verified", d: "Verify once, access every deal." },
    { n: "2", t: "Browse Curated Deals", d: "Review each deal: structure, returns, term, paperwork." },
    { n: "3", t: "Allocate Capital", d: "Commit on agreed terms, recorded publicly." },
    { n: "4", t: "Track & Report", d: "Track returns and repayments. Export anytime." },
  ];

  const TrackHead = ({ kicker, title, lead }: { kicker: string; title: string; lead: string }) => (
    <div style={{ maxWidth: CW.xl, margin: "0 auto", textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, background: `${G}14`, border: `1px solid ${G}33`, marginBottom: 14 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: G, boxShadow: `0 0 8px ${G}` }} />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: G, fontFamily: "Sora" }}>{kicker}</span>
      </div>
      <h2 className="h-section" style={{ color: "var(--s-ink)", margin: 0, marginBottom: 10, fontFamily: "Sora" }}>{title}</h2>
      <p style={{ fontSize: 14, color: "var(--s-muted)", lineHeight: 1.65, margin: "0 auto", maxWidth: 620, fontFamily: "Sora" }}>{lead}</p>
    </div>
  );

  const complianceItems = [
    { icon: "Shield", t: "KYB & Onboarding", d: "Everyone’s verified before they can join a deal." },
    { icon: "Wallet", t: "Whitelisting", d: "Only approved holders can hold or transfer. Checked automatically." },
    { icon: "Landmark", t: "Rules Built Into the Token", d: "The rules live in the token. Every transfer checks them automatically." },
    { icon: "Clock", t: "One-Click Reporting", d: "Audit-ready reports on demand, reconciled automatically." },
  ];

  const partnerCards = [
    {
      t: "Distribute What You Sell",
      d: "Same products, faster settlement, auto reporting.",
      g: (
        <svg viewBox="0 0 48 48" fill="none" stroke="#E0A225" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="24" r="4" />
          <line x1="24" y1="24" x2="11" y2="13" />
          <circle cx="11" cy="13" r="2.6" />
          <line x1="24" y1="24" x2="37" y2="13" />
          <circle cx="37" cy="13" r="2.6" />
          <line x1="24" y1="24" x2="24" y2="40" />
          <circle cx="24" cy="40" r="2.6" />
        </svg>
      ),
    },
    {
      t: "Compliance Travels With It",
      d: "Eligibility lives in the token, enforced on every trade.",
      g: (
        <svg viewBox="0 0 48 48" fill="none" stroke="#E0A225" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 6 L38 12 V25 C38 33 31 39 24 42 C17 39 10 33 10 25 V12 Z" />
          <path d="M18 24 l4 4 l8 -9" />
        </svg>
      ),
    },
    {
      t: "One Place for Admin",
      d: "Subscriptions, payouts, and admin in one place.",
      g: (
        <svg viewBox="0 0 48 48" fill="none" stroke="#E0A225" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="13" width="24" height="6" rx="2" />
          <rect x="12" y="21" width="24" height="6" rx="2" />
          <rect x="12" y="29" width="24" height="6" rx="2" />
        </svg>
      ),
    },
  ];

  const proofKpis = [
    { v: "$8.4M", l: "Financed to date" },
    { v: "9.2%", l: "Avg. net return" },
    { v: "100%", l: "Distributions on time" },
  ];

  return (
    <div className={night ? "dfx-site dfx-night" : "dfx-site"} style={{ minHeight: "100vh", background: "var(--s-bg)" }}>
      <CosmicHero
        audience="invest"
        accent={GOLD}
        glow="rgba(225,163,37,0.82)"
        name="Yield"
        eyebrow="For allocators, funds & desks"
        h1a="Returns With Receipts."
        h1b="Every One Backed by a Real Asset."
        phLabel="Allocator dashboard — deals, allocations, positions"
        sub="Institutional access to real-world returns — every figure verifiable."
        kpis={[
          { v: "$120M+", l: "Assets financed" },
          { v: "14", l: "Live deals" },
          { v: "8.2%", l: "Avg. Target Return" },
          { v: "0", l: "Defaults to date" },
        ]}
        ctaPrimary="Start Investing"
        ctaGhost="Talk to Our Team"
        onPrimary={openApp}
        onGhost={() => router.push("/contact")}
      />

      <SectionSeam accent={GOLD} />

      {/* Before & after */}
      <div style={{ padding: "40px 32px", background: "var(--s-surface)" }}>
        <CenterEyebrow accent={GOLD}>Before &amp; after</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>Real Returns Shouldn’t Need Blind Trust.</h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.6, fontFamily: "Sora" }}>Real-world investing used to mean quarterly PDFs and blind trust.</p>
        <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 18, maxWidth: RAIL, margin: "0 auto" }}>
          <div style={{ borderRadius: 18, border: "1px solid var(--s-line)", background: "var(--s-bg)", padding: "24px 22px", opacity: 0.78 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-lo)", marginBottom: 14, fontFamily: "Sora" }}>The old way</div>
            {["A quarterly statement, if you’re lucky", "Take their word on the numbers", "Capital locked, no clear exit"].map((x, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 0", borderTop: i ? "1px solid var(--s-line)" : "none" }}>
                <span style={{ flexShrink: 0, marginTop: 1, width: 18, height: 18, borderRadius: "50%", border: "1px solid var(--s-line)", color: "var(--s-lo)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, lineHeight: 1, fontFamily: "Sora" }}>–</span>
                <span style={{ fontSize: 13, color: "var(--s-muted)", lineHeight: 1.5, fontFamily: "Sora" }}>{x}</span>
              </div>
            ))}
          </div>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${GOLD}1a`, border: `1px solid ${GOLD}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 20px -4px ${GOLD}88` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </div>
          <div style={{ position: "relative", borderRadius: 18, border: `1px solid ${GOLD}55`, background: `linear-gradient(180deg, ${GOLD}14, transparent 60%), var(--s-card)`, padding: "24px 22px", boxShadow: `0 22px 56px -28px ${GOLD}aa`, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${GOLD}, ${GOLD}99, transparent)` }} />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: night ? GOLD : "#8A5E00", marginBottom: 14, marginTop: 6, fontFamily: "Sora" }}>With Yield</div>
            {["Live performance, updated continuously", "Every figure backed by an audit trail", "Positions you can see and track"].map((x, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 0", borderTop: i ? `1px solid ${GOLD}1f` : "none" }}>
                <span style={{ flexShrink: 0, marginTop: 1, width: 18, height: 18, borderRadius: "50%", background: GOLD, color: "#241803", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, lineHeight: 1, fontFamily: "Sora" }}>✓</span>
                <span style={{ fontSize: 13, color: "var(--s-ink)", lineHeight: 1.5, fontFamily: "Sora" }}>{x}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionSeam accent={GOLD} />

      {/* How Investing Works */}
      <div style={{ padding: "48px 32px", background: "var(--s-bg)" }}>
        <CenterEyebrow accent={GOLD}>How it works</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: "0 0 40px", fontFamily: "Sora" }}>How Investing Works.</h2>
        <style>{`
            .yrail{position:relative;max-width:920px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr)}
            .yrail::before{content:"";position:absolute;top:21px;left:12%;right:12%;height:2px;background:linear-gradient(90deg,${GOLD}30,${GOLD}66 50%,${GOLD}30)}
            .ystep{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 12px}
            .ystep-n{position:relative;z-index:2;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:15px;font-weight:800;color:#2a1d05;background:linear-gradient(135deg,#E8B23C,#c98a14);box-shadow:0 8px 20px -8px rgba(225,163,37,0.7);font-family:Sora;margin-bottom:16px}
            .ystep-t{font-size:14px;font-weight:700;color:var(--s-ink);font-family:Sora;letter-spacing:-0.2px;margin-bottom:6px}
            .ystep-d{font-size:11.5px;color:var(--s-muted);font-family:Sora;line-height:1.55;max-width:170px}
            @media(max-width:720px){.yrail{grid-template-columns:1fr;gap:24px}.yrail::before{top:0;bottom:0;left:21px;right:auto;width:2px;height:auto}.ystep{flex-direction:row;text-align:left;gap:16px;align-items:flex-start}.ystep-n{margin-bottom:0}.ystep-d{max-width:none}}
          `}</style>
        <div className="yrail">
          {capSteps.map((st, k) => (
            <div key={k} className="ystep">
              <div className="ystep-n">{st.n}</div>
              <div className="ystep-t">{st.t}</div>
              <div className="ystep-d">{st.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Curated deals — track head */}
      <div id="track-capital" style={{ padding: "32px 32px", background: "var(--s-surface-alt)" }}>
        <TrackHead kicker="Capital · Allocators · Broker-Dealers · Family Offices" title="Curated Real-World Asset Deals for Allocators" lead="Vetted deals to invest in or offer clients. Compliance once, then go." />
      </div>

      {/* Allocator terminal screenshot */}
      <div style={{ padding: "32px 32px", background: "var(--s-surface-alt)" }}>
        <div style={{ maxWidth: RAIL, margin: "0 auto" }}>
          <Img num={15} page="yield" label="Allocator terminal" accent={GOLD} ratio="16 / 9" />
        </div>
      </div>

      {/* Live & Upcoming Opportunities */}
      <div
        style={{
          padding: "54px 32px",
          background: night
            ? "radial-gradient(ellipse 80% 60% at 28% 0%, rgba(225,163,37,0.13) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 82% 100%, rgba(225,163,37,0.08) 0%, transparent 50%), linear-gradient(180deg, #0b0a1c 0%, #08071a 100%)"
            : "radial-gradient(ellipse 80% 60% at 28% 0%, rgba(225,163,37,0.12) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 82% 100%, rgba(225,163,37,0.07) 0%, transparent 50%), linear-gradient(180deg, var(--s-surface-alt) 0%, var(--s-surface) 100%)",
        }}
      >
        <h2 className="h-section" style={{ textAlign: "center", color: night ? "#fff" : "var(--s-ink)", margin: "0 0 6px", fontFamily: "Sora" }}>Live &amp; Upcoming Opportunities</h2>
        <p style={{ textAlign: "center", fontSize: 12.5, color: night ? "rgba(255,255,255,0.66)" : "var(--s-muted)", margin: "0 auto 14px", maxWidth: CW.md, lineHeight: 1.6, fontFamily: "Sora" }}>Vetted real-world asset deals, structured for serious investors.</p>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <DealFlowTicker />
        </div>
        <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {deals.map((d, k) => (
            <div key={k} onClick={openApp} style={{ cursor: "pointer" }} title="Open this deal in the app">
              <MirrorCard accent={d.accent}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <Icon name={d.icon} size={20} color={d.accent} strokeWidth={1.9} />
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 8.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: d.accent, padding: "4px 9px", borderRadius: 100, background: `${d.accent}14`, border: `1px solid ${d.accent}2e`, fontFamily: "Sora" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: d.accent, flexShrink: 0, animation: "pulseDot 1.8s ease-out infinite" }} />
                    Live
                  </span>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: d.accent, flexShrink: 0 }} />
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: d.accent, fontFamily: "Sora" }}>{d.tag}</span>
                </div>
                <div className="h-feat" style={{ marginBottom: 8 }}>{d.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--s-muted)", lineHeight: 1.6, marginBottom: 18, fontFamily: "Sora" }}>{d.body}</div>
                <div style={{ borderRadius: 12, background: `${d.accent}0c`, border: `1px solid ${d.accent}1f`, padding: "14px 16px", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 5, fontFamily: "Sora" }}>Target Return</div>
                      <div style={{ fontSize: 27, fontWeight: 300, letterSpacing: "-1px", lineHeight: 1, whiteSpace: "nowrap", fontFamily: "Sora", background: `linear-gradient(120deg, ${d.accent} 0%, ${d.accent}99 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: d.accent }}>{d.apy}</div>
                    </div>
                    <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
                      {([["Term", d.term], ["Min", d.min]] as [string, string][]).map((m, mi) => (
                        <div key={mi} style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--s-muted)", marginBottom: 5, fontFamily: "Sora" }}>{m[0]}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--s-ink)", whiteSpace: "nowrap", fontFamily: "Sora" }}>{m[1]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ marginBottom: 8, opacity: 0.9 }}>
                    <Sparkline data={d.spark} accent={d.accent} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
                    <span style={{ fontSize: 11.5, color: "var(--s-ink)", fontWeight: 600, fontFamily: "Sora" }}>
                      {d.raised} <span style={{ color: "var(--s-muted)", fontWeight: 400, opacity: 0.8 }}>/ {d.target}</span>
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: d.accent, fontFamily: "Sora" }}>{d.funded}% funded</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 100, background: `${d.accent}1a`, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${d.funded}%`, borderRadius: 100, background: `linear-gradient(90deg, ${d.accent}, ${d.accent}bb)`, boxShadow: `0 0 10px ${d.accent}88` }} />
                  </div>
                </div>
                <button style={{ width: "100%", height: 38, borderRadius: 100, border: "none", background: `linear-gradient(135deg, ${d.accent} 0%, ${d.accent}cc 100%)`, fontSize: 12, fontWeight: 600, letterSpacing: "0.01em", fontFamily: "Sora", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, color: onAccent(d.accent), boxShadow: `0 8px 20px -10px ${d.accent}` }}>
                  View in app <Icon name="ArrowRight" size={13} color={onAccent(d.accent)} strokeWidth={2.2} />
                </button>
              </MirrorCard>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <MButton audience="capital" variant="ghost" size="md" onClick={openApp}>View All Deals</MButton>
        </div>
      </div>

      <SectionSeam accent={GOLD} />

      {/* Distribution Partners */}
      <div style={{ padding: "32px 32px", background: "var(--s-bg)" }}>
        <div style={{ maxWidth: RAIL, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <TrackHead kicker="Distribution Partners" title="Already Selling Private Markets? Tokenize It." lead="For advisors already selling private credit, DSTs, and REITs — a cleaner way to deliver it." />
          </div>
          <style>{`
              .ygl{margin-bottom:14px}
              .ygl svg{width:42px;height:42px;filter:drop-shadow(0 0 5px rgba(225,163,37,0.35))}
            `}</style>
          <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {partnerCards.map((c, k) => (
              <MirrorCard key={k} accent={GOLD} padding={22}>
                <div className="ygl">{c.g}</div>
                <div className="h-feat" style={{ marginBottom: 10 }}>{c.t}</div>
                <div style={{ fontSize: 13, color: "var(--s-muted)", lineHeight: 1.65, fontFamily: "Sora" }}>{c.d}</div>
              </MirrorCard>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <MButton audience="capital" variant="primary" size="md" onClick={() => router.push("/contact")}>Talk to Partnerships</MButton>
          </div>
        </div>
      </div>

      <SectionSeam accent={GOLD} />

      {/* Proof */}
      <div style={{ padding: "44px 32px", background: "radial-gradient(ellipse 70% 60% at 25% 0%, rgba(225,163,37,0.10) 0%, transparent 55%), radial-gradient(ellipse 55% 60% at 85% 100%, rgba(225,163,37,0.06) 0%, transparent 50%), var(--s-surface)" }}>
        <CenterEyebrow accent={GOLD}>Proof</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>Real Money In. Real Returns Out.</h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.6, fontFamily: "Sora" }}>One live facility on Defactor, by the numbers — every figure on record.</p>
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", borderRadius: 20, border: `1px solid ${GOLD}44`, background: `linear-gradient(180deg, ${GOLD}10, transparent 55%), var(--s-card)`, padding: "28px 28px 0", boxShadow: `0 26px 70px -40px ${GOLD}aa`, overflow: "hidden" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 13px", borderRadius: 999, border: `1px solid ${GOLD}55`, background: `${GOLD}14`, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD, animation: "pulseDot 2s ease-out infinite" }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: night ? GOLD : "#8A5E00", fontFamily: "Sora" }}>Live facility</span>
          </div>
          <p style={{ fontSize: 16.5, color: "var(--s-ink)", lineHeight: 1.6, margin: "0 0 26px", fontFamily: "Sora", fontWeight: 500 }}>“Real receivables, funded by allocators, repaid on schedule — every distribution verifiable, to the cent.”</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: `1px solid ${GOLD}26`, borderRadius: 14, overflow: "hidden", background: "var(--s-surface)" }}>
            {proofKpis.map((x, i) => (
              <div key={i} style={{ textAlign: "center", padding: "20px 12px", borderLeft: i ? `1px solid ${GOLD}26` : "none" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: night ? GOLD : "#8A5E00", fontFamily: "Sora", lineHeight: 1 }}>{x.v}</div>
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

      {/* Compliance cross-cut (IsolinePatternField neutralized to static backdrop) */}
      <div style={{ padding: "32px 32px", background: "radial-gradient(ellipse at 20% 6%, rgba(11,127,171,0.10) 0%, transparent 50%), radial-gradient(ellipse at 22% 12%, rgba(94,228,205,0.20) 0%, transparent 55%), radial-gradient(ellipse at 82% 90%, rgba(11,127,171,0.12) 0%, transparent 52%), radial-gradient(ellipse at 60% 50%, rgba(94,228,205,0.08) 0%, transparent 64%), var(--s-surface-alt)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 30% 20%, rgba(11,127,171,0.14) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <CenterEyebrow accent={TEAL}>Compliance · Cross-cutting</CenterEyebrow>
          <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>Compliant by Design, Across Everything</h2>
          <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.6, fontFamily: "Sora" }}>Compliance isn’t a product beside Raise, Yield and Mint — it’s the layer that runs underneath all three. The same KYB, whitelisting and permissioning, everywhere capital moves.</p>
          <div className="dfx-comp-grid stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, maxWidth: RAIL, margin: "0 auto" }}>
            {complianceItems.map((it, i) => (
              <MirrorCard key={i} accent={TEAL} padding={20}>
                <div style={{ marginBottom: 14 }}>
                  <Icon name={it.icon} size={26} color={TEAL} strokeWidth={1.9} />
                </div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6, fontFamily: "Sora", letterSpacing: "-0.3px" }}>{it.t}</div>
                <div style={{ fontSize: 12.5, color: "var(--s-muted)", lineHeight: 1.6, fontFamily: "Sora" }}>{it.d}</div>
              </MirrorCard>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 24, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--s-lo)", fontFamily: "Sora" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: G }} />Raise
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD }} />Yield
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: V_LIGHT }} />Mint
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA — ChordMeshHero (FlowField dropped, static backdrop) */}
      <ChordMeshHero variant="invest" height={264} withGrain withChordStripe sink={false}>
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 120% at 50% 50%, #E0A22526 0%, transparent 64%)" }} />
        <div style={{ minHeight: 264, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "52px 40px" }}>
          <MEyebrow audience="invest" dark style={{ justifyContent: "center", marginBottom: 10 }}>Defactor Yield</MEyebrow>
          <h2 className="h-section" style={{ color: "#fff", margin: 0, marginBottom: 10, fontFamily: "Sora" }}>Returns With Receipts.</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", margin: 0, marginBottom: 20, maxWidth: CW.md, fontFamily: "Sora" }}>Every position is backed by a vetted real asset, with public proof behind the return.</p>
          <MButton audience="invest" variant="primary" size="md" onClick={openApp}>Start Investing</MButton>
        </div>
      </ChordMeshHero>
    </div>
  );
}
