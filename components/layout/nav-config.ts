import { V, G, GOLD } from "@/lib/tokens";

// Maps the prototype's `tab` ids to real routes.
export const ROUTES: Record<string, string> = {
  home: "/",
  raise: "/raise",
  tokenize: "/mint",
  invest: "/yield",
  token: "/real",
  learn: "/learn",
  contact: "/contact",
  compliance: "/compliance",
  login: "/login",
};

export const PRIMARY_NAV = [
  { label: "Raise", id: "raise", href: "/raise", accent: V, badge: "New" },
  { label: "Mint", id: "tokenize", href: "/mint", accent: G },
  { label: "Yield", id: "invest", href: "/yield", accent: GOLD },
];

export const FLAT_NAV = [
  { label: "$REAL", id: "token", href: "/real", accent: V },
  { label: "Learn", id: "learn", href: "/learn", accent: V },
  { label: "Contact", id: "contact", href: "/contact", accent: V },
];

// "Open Defactor App" → login, optionally carrying product context.
export function appHref(product?: string) {
  return product ? `/login?product=${product}` : "/login";
}
