import { icons } from "lucide-react";
import type { CSSProperties } from "react";

export type IconProps = {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

/** Drop-in replacement for the prototype's <LucideIcon name="..." />. */
export function Icon({
  name,
  size = 18,
  color = "currentColor",
  strokeWidth = 2,
  className,
  style,
}: IconProps) {
  const Cmp = (icons as Record<string, React.ComponentType<Record<string, unknown>>>)[name];
  if (!Cmp) return null;
  return (
    <Cmp
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
      aria-hidden
    />
  );
}

// Convenience alias matching the original component name.
export const LucideIcon = Icon;
