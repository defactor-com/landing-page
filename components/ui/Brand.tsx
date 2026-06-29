import {
  DEFACTOR_LOGO_SRC,
  WHITE_DEFACTOR_LOGO_SRC,
  EMBLEM_SRC,
  REAL_LOCKUP,
  RAISE_LOCKUP,
  TOKENIZE_LOCKUP,
  INVEST_LOCKUP,
} from "@/lib/brand";

type MarkProps = { h?: number; glow?: string; style?: React.CSSProperties };

/** Defactor triangular emblem mark. */
export function DefactorMark({ h = 40, glow, style }: MarkProps) {
  return (
    <img
      src={EMBLEM_SRC}
      alt="Defactor"
      style={{
        height: h,
        width: "auto",
        display: "block",
        objectFit: "contain",
        filter: glow ? `drop-shadow(0 0 16px ${glow})` : "none",
        ...style,
      }}
    />
  );
}

export const Emblem = DefactorMark;

/** Full Defactor wordmark logo — theme-aware (white on dark, blue on light). */
export function DefactorLogo({ h = 30, style }: MarkProps) {
  return (
    <>
      <img
        src={DEFACTOR_LOGO_SRC}
        alt="Defactor"
        className="block dark:hidden"
        style={{ height: h, width: "auto", objectFit: "contain", ...style }}
      />
      <img
        src={WHITE_DEFACTOR_LOGO_SRC}
        alt="Defactor"
        className="hidden dark:block"
        style={{ height: h, width: "auto", objectFit: "contain", ...style }}
      />
    </>
  );
}

const LOCKUPS = {
  raise: RAISE_LOCKUP,
  tokenize: TOKENIZE_LOCKUP,
  invest: INVEST_LOCKUP,
  real: REAL_LOCKUP,
} as const;

export type LockupKind = keyof typeof LOCKUPS;

/** Iridescent product lockup (Raise / Mint / Yield / $REAL). */
export function ProductLockup({
  kind,
  h = 34,
  style,
}: {
  kind: LockupKind;
  h?: number;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={LOCKUPS[kind]}
      alt={`${kind} lockup`}
      style={{ height: h, width: "auto", objectFit: "contain", display: "block", ...style }}
    />
  );
}

export function RealLockup({ h = 40, style }: MarkProps) {
  return <ProductLockup kind="real" h={h} style={style} />;
}
