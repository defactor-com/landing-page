// CHORD_MESH background variants — extracted verbatim from the prototype.
import { V, G, GOLD, TEAL, T_VIO, T_GRN, T_GLD } from "./tokens";

export const CHORD_MESH: Record<string, { label: string; accent: string; accentTint: string; bg: string }> = {
    hub: {
        label: "Defactor",
        accent: V,
        accentTint: T_VIO,
        bg: `
      radial-gradient(ellipse at 72% 18%, rgba(190,200,255,0.16) 0%, transparent 38%),
      radial-gradient(ellipse at 15% 25%, rgba(90,91,235,0.62) 0%, transparent 56%),
      radial-gradient(ellipse at 85% 75%, rgba(60,50,180,0.50) 0%, transparent 52%),
      radial-gradient(ellipse at 75% 10%, rgba(40,20,140,0.40) 0%, transparent 46%),
      radial-gradient(ellipse at 25% 90%, rgba(80,60,200,0.34) 0%, transparent 46%),
      radial-gradient(ellipse at 50% 50%, rgba(30,25,110,0.26) 0%, transparent 72%),
      #05041a
    `,
    },
    tokenize: {
        label: "Mint",
        accent: G,
        accentTint: T_GRN,
        bg: `
      radial-gradient(ellipse at 72% 18%, rgba(210,255,235,0.15) 0%, transparent 38%),
      radial-gradient(ellipse at 15% 20%, rgba(40,166,107,0.58) 0%, transparent 56%),
      radial-gradient(ellipse at 85% 80%, rgba(20,120,75,0.48) 0%, transparent 52%),
      radial-gradient(ellipse at 80% 15%, rgba(10,80,50,0.40) 0%, transparent 46%),
      radial-gradient(ellipse at 20% 85%, rgba(55,180,118,0.34) 0%, transparent 46%),
      radial-gradient(ellipse at 50% 50%, rgba(10,66,42,0.26) 0%, transparent 72%),
      #07061f
    `,
    },
    raise: {
        label: "Defactor Raise",
        accent: V,
        accentTint: T_VIO,
        bg: `
      radial-gradient(ellipse at 70% 16%, rgba(200,205,255,0.16) 0%, transparent 38%),
      radial-gradient(ellipse at 18% 22%, rgba(129,130,239,0.60) 0%, transparent 56%),
      radial-gradient(ellipse at 82% 78%, rgba(50,40,170,0.48) 0%, transparent 52%),
      radial-gradient(ellipse at 78% 12%, rgba(30,15,120,0.38) 0%, transparent 46%),
      radial-gradient(ellipse at 22% 88%, rgba(110,100,235,0.34) 0%, transparent 46%),
      radial-gradient(ellipse at 50% 50%, rgba(22,16,88,0.26) 0%, transparent 72%),
      #050614
    `,
    },
    privatecredit: {
        label: "Raise",
        accent: V,
        accentTint: T_VIO,
        bg: `
      radial-gradient(ellipse at 70% 16%, rgba(200,205,255,0.16) 0%, transparent 38%),
      radial-gradient(ellipse at 18% 22%, rgba(129,130,239,0.60) 0%, transparent 56%),
      radial-gradient(ellipse at 82% 78%, rgba(50,40,170,0.48) 0%, transparent 52%),
      radial-gradient(ellipse at 78% 12%, rgba(30,15,120,0.38) 0%, transparent 46%),
      radial-gradient(ellipse at 22% 88%, rgba(110,100,235,0.34) 0%, transparent 46%),
      radial-gradient(ellipse at 50% 50%, rgba(22,16,88,0.26) 0%, transparent 72%),
      #03120d
    `,
    },
    invest: {
        label: "Defactor Yield",
        accent: GOLD,
        accentTint: T_GLD,
        // Green shade derivatives synthesised on the same darker-towards-shadow
        // logic as the deck's Crimson, Violet and Cyan variants.
        bg: `
      radial-gradient(ellipse at 72% 18%, rgba(255,240,205,0.15) 0%, transparent 38%),
      radial-gradient(ellipse at 15% 20%, rgba(225,163,37,0.55) 0%, transparent 56%),
      radial-gradient(ellipse at 85% 80%, rgba(160,110,20,0.46) 0%, transparent 52%),
      radial-gradient(ellipse at 80% 15%, rgba(120,80,12,0.40) 0%, transparent 46%),
      radial-gradient(ellipse at 20% 85%, rgba(240,190,80,0.30) 0%, transparent 46%),
      radial-gradient(ellipse at 50% 50%, rgba(90,60,10,0.26) 0%, transparent 72%),
      #171005
    `,
    },
    compliance: {
        label: "Compliance · Protocol",
        accent: TEAL,
        accentTint: "#5fbcd8",
        bg: `
      radial-gradient(ellipse at 72% 18%, rgba(205,240,255,0.16) 0%, transparent 38%),
      radial-gradient(ellipse at 20% 20%, rgba(94,228,205,0.60) 0%, transparent 56%),
      radial-gradient(ellipse at 80% 80%, rgba(5,90,130,0.48) 0%, transparent 52%),
      radial-gradient(ellipse at 75% 10%, rgba(0,60,100,0.40) 0%, transparent 46%),
      radial-gradient(ellipse at 20% 85%, rgba(8,100,140,0.36) 0%, transparent 46%),
      radial-gradient(ellipse at 50% 50%, rgba(4,46,76,0.26) 0%, transparent 72%),
      #010d15
    `,
    },
};
