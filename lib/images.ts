// Maps an ImgPlaceholder (page + num) to the optimized illustration base filename.
// Files live at /public/images/<page>/<base>-{Light,Dark}-Mode.jpg.
// Slots with no provided artwork are absent here → they keep the styled placeholder.

export type ImgPage = "home" | "raise" | "mint" | "yield" | "learn";

const MAP: Record<ImgPage, Record<string, string>> = {
  // Home hero/product surfaces (#1–4). Event photos #5–9 have no artwork.
  home: {
    "1": "Image-01",
    "2": "Image-02",
    "3": "Image-03",
    "4": "Image-04",
  },
  // Raise hero (#10) + product surface (#11), plus extra raise surfaces.
  raise: {
    "10": "Image-10",
    "11": "Image-11",
    "11.0": "Image-11.0",
    "11.1": "Image-11.1",
  },
  // Mint hero (#12) + tokenization console (#13).
  mint: {
    "12": "Image-12",
    "13": "Image-13",
  },
  // Yield hero (#14) + allocator terminal (#15); #16 reuses 15.
  yield: {
    "14": "Image-14",
    "15": "Image-15",
    "16": "Image-15",
  },
  // Learn knowledge-base hero (#18 → 20) + resource cards (#19 → 21.x).
  learn: {
    "18": "Image-20",
    "20": "Image-20",
    "21": "Image-21",
    "21.1": "Image-21.1",
    "21.2": "Image-21.2",
    "21.3": "Image-21.3",
  },
};

export function imageBase(page: ImgPage | undefined, num: number | string | undefined): string | null {
  if (!page || num == null) return null;
  return MAP[page]?.[String(num)] ?? null;
}

export function imageSrc(page: ImgPage, base: string, theme: "light" | "dark"): string {
  const variant = theme === "dark" ? "Dark" : "Light";
  return `/images/${page}/${base}-${variant}-Mode.jpg`;
}
