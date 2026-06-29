"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { V } from "@/lib/tokens";
import { imageBase, imageSrc, type ImgPage } from "@/lib/images";

export type ImgProps = {
  label?: string;
  accent?: string;
  height?: number;
  ratio?: string; // e.g. "16 / 9"
  num?: number | string;
  page?: ImgPage;
  /** Explicit base filename override (e.g. "Image-21.2"). */
  file?: string;
  alt?: string;
  src?: string; // raw src override (skips the page/num map)
  priority?: boolean;
  sizes?: string;
};

/**
 * Theme-aware illustration slot. Replaces the prototype's <ImgPlaceholder/>.
 * When real artwork is mapped for (page,num) it renders an optimized next/image
 * (Light/Dark variant per theme). Otherwise it shows the styled placeholder.
 */
export function Img({
  label,
  accent = V,
  height = 200,
  ratio,
  num,
  page,
  file,
  alt,
  src,
  priority,
  sizes = "(max-width: 768px) 100vw, 760px",
}: ImgProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme: "light" | "dark" = mounted && resolvedTheme === "light" ? "light" : "dark";

  const base = file ?? imageBase(page, num);
  const resolvedSrc = src ?? (page && base ? imageSrc(page, base, theme) : null);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: ratio ? "auto" : height,
    aspectRatio: ratio || "auto",
    borderRadius: 16,
    overflow: "hidden",
    border: `1px solid ${accent}2e`,
    background: `radial-gradient(ellipse at 26% 16%, ${accent}38 0%, transparent 56%), radial-gradient(ellipse at 84% 88%, ${accent}26 0%, transparent 52%), linear-gradient(135deg, ${accent}12 0%, transparent 62%), var(--s-card-2)`,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.07), 0 22px 50px -30px ${accent}99`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (resolvedSrc) {
    return (
      <div style={containerStyle}>
        <Image
          src={resolvedSrc}
          alt={alt || label || "Defactor illustration"}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  // Styled placeholder (no artwork provided for this slot).
  const n = num != null ? Number(num) : null;
  return (
    <div style={containerStyle}>
      {n != null && (
        <div
          className="dfx-imgnum"
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 8,
            fontSize: 12.5,
            fontWeight: 800,
            letterSpacing: "0.06em",
            padding: "4px 10px",
            borderRadius: 8,
          }}
        >
          <span className="dfx-imgnum-n">IMG {String(n).padStart(2, "0")}</span>
          <span className="dfx-imgnum-d">IMG {String(n + 19).padStart(2, "0")}</span>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${accent}12 1px, transparent 1px), linear-gradient(90deg, ${accent}12 1px, transparent 1px)`,
          backgroundSize: "34px 34px",
          opacity: 0.45,
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse 72% 72% at 50% 50%, #000 28%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 72% at 50% 50%, #000 28%, transparent 82%)",
        }}
      />
      {label && (
        <span
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: accent,
            background: "rgba(8,6,22,0.32)",
            padding: "7px 14px",
            borderRadius: 100,
            border: `1px solid ${accent}3a`,
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
