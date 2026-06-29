import type { ReactNode } from "react";
import { CHORD, V, G, GOLD } from "@/lib/tokens";
import { CHORD_MESH } from "@/lib/chord-mesh";

/**
 * Layered radial-gradient hero backdrop (Compliance, Learn, Contact, $REAL).
 * The slow `dfxMeshGlass` drift animation is dropped for performance; the
 * gradient mesh is rendered statically.
 */
export function ChordMeshHero({
  variant = "hub",
  height = 520,
  children,
  withGrain = true,
  withChordStripe = true,
  depth = true,
  sink = true,
  daySurface = false,
}: {
  variant?: string;
  height?: number;
  children?: ReactNode;
  withGrain?: boolean;
  withChordStripe?: boolean;
  depth?: boolean;
  sink?: boolean;
  daySurface?: boolean;
}) {
  const mesh = CHORD_MESH[variant] || CHORD_MESH.hub;
  return (
    <div
      className="dfx-hero"
      style={{ position: "relative", minHeight: height, overflow: "hidden", background: daySurface ? "var(--s-bg)" : mesh.bg, isolation: "isolate" }}
    >
      {withGrain && (
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6,
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            mixBlendMode: "overlay",
          }}
        />
      )}
      {depth && (
        <>
          <div aria-hidden style={{ position: "absolute", inset: "-10%", zIndex: 0, pointerEvents: "none", mixBlendMode: "screen", background: "radial-gradient(ellipse 50% 60% at 68% 30%, rgba(190,205,255,0.10) 0%, transparent 60%)" }} />
          {!daySurface && (
            <>
              <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 58% 88% at 20% 50%, rgba(4,3,16,0.72) 0%, rgba(4,3,16,0.30) 46%, transparent 72%)" }} />
              <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", boxShadow: "inset 0 0 120px 28px rgba(4,3,16,0.5)" }} />
            </>
          )}
        </>
      )}
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</div>
      {sink && (
        <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 88, zIndex: 1, pointerEvents: "none", background: daySurface ? "linear-gradient(180deg, transparent 0%, rgba(245,246,248,0.6) 100%)" : "linear-gradient(180deg, transparent 0%, rgba(6,5,26,0.55) 100%)" }} />
      )}
      {withChordStripe && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, zIndex: 2, display: "flex" }}>
          {CHORD.map((c, ci) => (
            <div key={ci} style={{ flex: 1, background: c }} />
          ))}
        </div>
      )}
    </div>
  );
}

// barAccent helper retained for callers that referenced it.
export function chordBarAccent(variant: string) {
  return variant === "invest" ? GOLD : variant === "raise" ? V : variant === "compliance" ? "#0B7FAB" : variant === "tokenize" ? G : variant === "community" ? GOLD : V;
}
