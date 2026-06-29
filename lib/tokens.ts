// ── Design tokens — single source of truth, ported verbatim from the prototype ──

// Brand chord
export const V = "#5A5BEB"; // Defactor Blue — brand primary
export const V_LIGHT = "#8182EF"; // Violet 400
export const G = "#26A66B"; // Defactor Green — Mint (tokenization)
export const GOLD = "#E0A225"; // Defactor Yellow — Yield / Community / Warning
export const A = GOLD; // alias
export const C = "#D21A4D"; // Crimson — Direct Lending / Error
export const C_LIGHT = "#E84C77"; // Crimson-300
export const NAVY = "#070118";

// Marketing-only tokens
export const TEAL = "#0B7FAB"; // Cyan — Compliance / KYB / Audit
export const T_VIO = "#9192F3";
export const T_GRN = "#82E2B6";
export const T_GLD = "#F5D084";
export const T_INV = "#EFC36C";
export const T_RED = "#F07597";
export const T_TEAL = "#5fbcd8";
export const SUCCESS = "#22C55E";
export const MINT = G; // alias — Mint accent
export const INV = GOLD; // alias — Yield accent
export const CHORD = [C, V, G, GOLD]; // crimson · violet · green · gold

// Light surface borders (fixed marketing cards)
export const LIGHT_BORDER = "#E6E9F0";
export const LIGHT_BORDER2 = "#F0F2F5";

// RWA.io partner accents
export const RWA_BLUE = "#224BEE";
export const RWA_GREEN = "#5EE4C0";
export const RWA_NAVY = "#0A1628";

// Layout tokens
export const RAIL = 1080; // primary content rail
export const RAIL_MD = 880; // medium band
export const RAIL_TEXT = 640; // text-measure column
export const CW = { sm: 480, md: 560, lg: 600, xl: 760 } as const;

// Hover/transition tokens
export const HOVER = {
  fast: "all 0.12s",
  base: "all 0.15s",
  slow: "all 0.3s",
  liftBtn: "translateY(-1px)",
  liftCard: "translateY(-2px)",
  liftHero: "translateY(-4px)",
  scale: "scale(1.02)",
} as const;

// Theme-surface CSS vars (defined in globals.css). Components reference these.
export const dm = {
  bg: "var(--dm-bg)",
  surface: "var(--dm-surface)",
  surface2: "var(--dm-surface2)",
  border: "var(--dm-border)",
  ink: "var(--dm-ink)",
  muted: "var(--dm-muted)",
  lo: "var(--dm-lo)",
} as const;
