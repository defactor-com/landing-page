import { TEAL, CW, RAIL } from "@/lib/tokens";
import { Icon } from "@/components/ui/Icon";
import { MButton, MirrorCard, CenterEyebrow } from "@/components/ui/primitives";
import { Img } from "@/components/ui/Img";
import { ChordMeshHero } from "@/components/hero/ChordMeshHero";

const feats = [
  { icon: "Shield", t: "Automated KYB", d: "Investors verify once, then take part across every eligible asset." },
  { icon: "Globe", t: "Region Rules, Built In", d: "Investor rules are built in. Transfers that break them can’t go through." },
  { icon: "Activity", t: "One-Click Reporting", d: "Audit trails, holder registers, and reports on demand. Every action is recorded and verifiable." },
];

export default function Compliance() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--s-bg)" }}>
      <ChordMeshHero variant="compliance" height={580} withGrain withChordStripe>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 88% 78% at 15% 26%, rgba(94,228,205,0.17) 0%, transparent 56%), radial-gradient(ellipse 74% 92% at 88% 84%, rgba(11,127,171,0.20) 0%, transparent 54%)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, rgba(3,22,28,0.62) 0%, rgba(3,22,28,0.22) 56%, rgba(3,22,28,0) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            pointerEvents: "none",
            minHeight: 580,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 40px",
            maxWidth: CW.xl,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <Icon name="Shield" size={56} color={TEAL} strokeWidth={2} />
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
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
              Compliance
            </span>
          </div>
          <h1 className="h-hero" style={{ color: "#fff", margin: 0, marginBottom: 18 }}>
            Clear Compliance Once. Reuse It Everywhere.
          </h1>
          <p
            style={{
              fontSize: 14.5,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.6,
              margin: 0,
              marginBottom: 24,
              maxWidth: CW.md,
              fontFamily: "Sora",
            }}
          >
            Compliance built into the platform — business checks, eligibility, and reporting, by default.
          </p>
          <div style={{ pointerEvents: "auto", display: "inline-block" }}>
            <MButton audience="compliance" variant="primary" size="md">
              Talk to Compliance
            </MButton>
          </div>
        </div>
      </ChordMeshHero>

      <div style={{ padding: "32px 32px", background: "var(--s-surface)" }}>
        <div style={{ maxWidth: RAIL, margin: "0 auto" }}>
          <Img num={17} label="Compliance console" accent={TEAL} ratio="16 / 9" />
        </div>
      </div>

      <div style={{ padding: "32px 32px", background: "var(--s-surface)" }}>
        <CenterEyebrow accent={TEAL}>Compliance, built in</CenterEyebrow>
        <h2
          className="h-section"
          style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 28, fontFamily: "Sora" }}
        >
          KYB, Whitelist, Audit. All Automated.
        </h2>
        <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {feats.map((f, i) => (
            <MirrorCard key={i} accent={TEAL}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Icon name={f.icon} size={20} color={TEAL} strokeWidth={1.75} />
                <div className="h-feat">{f.t}</div>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--s-muted)", lineHeight: 1.6, fontFamily: "Sora" }}>{f.d}</div>
            </MirrorCard>
          ))}
        </div>
      </div>

      <ChordMeshHero variant="compliance" height={264} withGrain withChordStripe sink={false}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 120% at 50% 50%, #0B7FAB26 0%, transparent 64%)",
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
          <h2 className="h-section" style={{ color: "#fff", margin: 0, marginBottom: 10, fontFamily: "Sora" }}>
            Compliance That Keeps Up.
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              marginBottom: 20,
              maxWidth: 520,
              fontFamily: "Sora",
            }}
          >
            From first issuance to global distribution — the rules travel with the asset.
          </p>
          <MButton audience="compliance" variant="primary" size="md">
            Book a Compliance Review
          </MButton>
        </div>
      </ChordMeshHero>
    </div>
  );
}
