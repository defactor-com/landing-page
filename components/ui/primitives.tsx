"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { V, V_LIGHT, G, GOLD, TEAL, T_VIO, T_GRN, T_GLD, HOVER, dm } from "@/lib/tokens";
import { Icon } from "./Icon";

// Audience tokens — Used as MAudience.hub.accent etc. throughout marketing pages.
export const MAudience: Record<
  string,
  { label: string; accent: string; tint: string; soft: string; line: string }
> = {
  hub: { label: "Defactor", accent: V, tint: T_VIO, soft: `${V}10`, line: `${V}30` },
  tokenize: { label: "Mint", accent: G, tint: T_GRN, soft: `${G}10`, line: `${G}30` },
  raise: { label: "Defactor Raise", accent: V, tint: T_VIO, soft: `${V}10`, line: `${V}30` },
  privatecredit: { label: "Raise", accent: V, tint: T_VIO, soft: `${V}10`, line: `${V}30` },
  invest: { label: "Defactor Yield", accent: GOLD, tint: T_GLD, soft: `${GOLD}10`, line: `${GOLD}30` },
  compliance: { label: "Compliance · Protocol", accent: TEAL, tint: "#5fbcd8", soft: `${TEAL}10`, line: `${TEAL}30` },
  capital: { label: "Capital", accent: GOLD, tint: "#f0d291", soft: `${GOLD}10`, line: `${GOLD}30` },
};

export function onAccent(hex: string): string {
  if (typeof hex !== "string" || hex[0] !== "#" || hex.length < 7) return "#fff";
  const lin = (c: number) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return 1.05 / (L + 0.05) >= 4.5 ? "#fff" : "#1A1400";
}

export function useHover(initial = false) {
  const [hov, setHov] = useState(initial);
  return [hov, { onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false) }] as const;
}

export function SectionLabel({ children, accent = V }: { children: ReactNode; accent?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, marginTop: 40 }}>
      <div style={{ width: 3, height: 14, borderRadius: 4, background: accent, flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: dm.muted }}>
        {children}
      </span>
    </div>
  );
}

export function CenterEyebrow({ accent, children }: { accent?: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: -40, marginBottom: 10 }}>
      <SectionLabel accent={accent}>{children}</SectionLabel>
    </div>
  );
}

export function MEyebrow({
  audience = "hub",
  children,
  dotted = true,
  dark = false,
  style,
}: {
  audience?: string;
  children: ReactNode;
  dotted?: boolean;
  dark?: boolean;
  style?: CSSProperties;
}) {
  const a = MAudience[audience] || MAudience.hub;
  const c = dark ? a.tint : a.accent;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, ...style }}>
      {dotted && <div style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0 }} />}
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: c }}>
        {children}
      </span>
    </div>
  );
}

export function MButton({
  audience = "hub",
  variant = "primary",
  size = "md",
  children,
  icon = "→",
  onClick,
  disabled,
  style,
}: {
  audience?: string;
  variant?: "primary" | "ghost" | "ghostDark" | "dark";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  const a = MAudience[audience] || MAudience.hub;
  const [hov, hoverProps] = useHover();
  const sizes = { sm: { h: 34, px: 16, fs: 11 }, md: { h: 40, px: 20, fs: 12 }, lg: { h: 48, px: 24, fs: 13 } };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: { bg: hov ? `${a.accent}cc` : a.accent, color: onAccent(a.accent), border: "none", shadow: hov ? `0 6px 16px ${a.accent}55` : `0 2px 8px ${a.accent}44` },
    ghost: { bg: hov ? `${a.accent}10` : "transparent", color: a.accent, border: `1.5px solid ${hov ? a.accent : `${a.accent}66`}`, shadow: "none" },
    ghostDark: { bg: hov ? "rgba(255,255,255,0.10)" : "transparent", color: "#fff", border: `1.5px solid ${hov ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.22)"}`, shadow: "none" },
    dark: { bg: hov ? "#1f1f1f" : "#0A0A0A", color: "#fff", border: "none", shadow: hov ? "0 8px 20px rgba(0,0,0,0.28)" : "0 4px 12px rgba(0,0,0,0.16)" },
  };
  const v = variants[variant] || variants.primary;
  return (
    <button
      {...hoverProps}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        background: v.bg, color: v.color, border: v.border,
        padding: `0 ${s.px}px`, height: s.h, borderRadius: 100,
        fontSize: s.fs, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: v.shadow, transform: !disabled && hov ? HOVER.liftBtn : "none", transition: HOVER.fast,
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: icon ? 9 : 0,
        whiteSpace: "nowrap", opacity: disabled ? 0.45 : 1, flexShrink: 0, fontFamily: "inherit", ...style,
      }}
    >
      {children}
      {icon ? (icon === "→" ? <Icon name="ArrowRight" size={s.fs + 2} color={v.color} strokeWidth={2.4} /> : icon) : null}
    </button>
  );
}

export function MirrorCard({
  accent = V,
  children,
  padding = 24,
  style,
}: {
  accent?: string;
  children: ReactNode;
  padding?: number | string;
  style?: CSSProperties;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: `linear-gradient(180deg, ${accent}08 0%, transparent 60%), var(--s-surface)`,
        borderRadius: 16, padding, position: "relative",
        border: `1px solid ${hov ? accent : `${accent}28`}`,
        boxShadow: hov ? `0 1px 0 ${accent}14, 0 14px 32px -14px ${accent}66` : `0 1px 0 ${accent}10, 0 8px 24px -16px ${accent}40`,
        transform: hov ? HOVER.liftCard : "none", transition: HOVER.base, ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionSeam({ accent = V }: { accent?: string }) {
  return (
    <div style={{ position: "relative", height: 1, background: "var(--s-border)" }}>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 300, height: 3, background: `radial-gradient(ellipse at center, ${accent}cc 0%, ${accent}40 34%, transparent 78%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 12px 1px ${accent}`, pointerEvents: "none" }} />
    </div>
  );
}

/** Inline gradient-clipped headline text (prototype API: gradient + children). */
export function GradientTextHeadline({
  gradient,
  children,
  style,
}: {
  gradient?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        background: gradient || `linear-gradient(90deg, ${V} 0%, ${V_LIGHT} 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export { V, V_LIGHT, G, GOLD, TEAL, dm };
