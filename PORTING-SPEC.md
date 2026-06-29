# Defactor Prototype → Next.js Porting Spec (for page agents)

You are porting ONE page from the single-file React prototype
`/Users/tiimie/Downloads/Defactor_Website_v2.5.html` (raw `React.createElement`, all
components in one `<script>`) into a Next.js (App Router) + TypeScript project at
`/Users/tiimie/Projects/Work/defactor/landing-page`.

## Golden rules
1. **Preserve ALL content** — every headline, paragraph, list item, KPI, card,
   label, link text. Do not summarize or drop sections.
2. **Convert `React.createElement(tag, props, ...children)` → JSX.** Keep the inline
   `style={{...}}` objects VERBATIM (same numbers, colors, gradients, shadows).
   - `className` stays `className`. `dangerouslySetInnerHTML` → drop it (see #4).
   - Unicode escapes like `·` may be written as the literal character (·).
3. **Use shared modules — do NOT redefine these.** Import from:
   - `@/lib/tokens` → `V, V_LIGHT, G, GOLD, A, C, C_LIGHT, NAVY, TEAL, T_VIO, T_GRN, T_GLD, T_INV, T_RED, T_TEAL, SUCCESS, MINT, INV, CHORD, LIGHT_BORDER, LIGHT_BORDER2, RWA_BLUE, RWA_GREEN, RWA_NAVY, RAIL, RAIL_MD, RAIL_TEXT, CW, HOVER, dm`
   - `@/components/ui/Icon` → `Icon` (and alias `LucideIcon`). Usage: `<Icon name="Shield" size={26} color={TEAL} strokeWidth={1.9} />`. Replace EVERY `LucideIcon`/`React.createElement(LucideIcon,...)` with `<Icon .../>`.
   - `@/components/ui/primitives` → `MButton, MirrorCard, SectionLabel, CenterEyebrow, MEyebrow, SectionSeam, GradientTextHeadline, MAudience, useHover, onAccent`
   - `@/components/ui/Img` → `Img` (replaces `ImgPlaceholder`). Props: `{ num?, page?, label?, accent?, height?, ratio?, file?, alt?, priority?, src? }`. For real artwork pass `page` + `num` (or `file`). See image map below. If no real image exists for a slot, just pass `num`+`label`+`accent` (renders a styled placeholder).
   - `@/components/ui/Brand` → `DefactorMark, Emblem, RealLockup, ProductLockup` (`<ProductLockup kind="raise|tokenize|invest|real" h={40}/>`), `DefactorLogo`
   - `@/components/hero/CosmicHero` → `CosmicHero` (product hero; see its props in the file — audience, accent, glow, eyebrow, h1a, h1b, sub, kpis:[{l,v}], ctaPrimary, ctaGhost, onPrimary, onGhost, phLabel). It already renders the hero image + live KPI snapshot. Drop the original `field`/`bgNode`.
   - `@/components/hero/ChordMeshHero` → `ChordMeshHero` (variant, height, children, daySurface, withChordStripe…). Used by compliance/learn/contact/$REAL heroes.
   - `@/lib/brand` → data-URI consts `RAISE_LOCKUP, TOKENIZE_LOCKUP, INVEST_LOCKUP, REAL_LOCKUP, EMBLEM_SRC, DEFACTOR_LOGO_SRC, WHITE_DEFACTOR_LOGO_SRC`.
   - `@/lib/chord-mesh` → `CHORD_MESH`.
4. **DROP heavy animations (performance).** These decorative "field" components must
   NOT be ported as animated canvas/rAF/SVG. Replace each usage with a simple static
   backdrop: `<div aria-hidden style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(ellipse at 30% 20%, '+accent+'22 0%, transparent 60%)'}} />` (pick a sensible accent) or just omit if purely background.
   Components to neutralize: `FlowField, OrbitField, GlobeWireframe, AndromedaGlobe, DeffoGlobe, ConstellationPatternField, HexPatternField, IsolinePatternField, RipplePatternField, TranchePatternField, LivingField, BlindsField, ChordArcs, CosmicHero's field, PatternSection's interactive pattern, RWAioSpotlight/CapitalMirror orbit visuals`. Any `dangerouslySetInnerHTML={{__html: field}}` → drop.
   - Remove all `requestAnimationFrame` loops and `performance.now()` tickers.
   - KEEP lightweight, content-bearing dynamics: live UTC clocks (`setInterval` 1s in a `useEffect`), the `DealFlowTicker` rotation, CSS marquee tickers (`animation: 'ticker ...'` / `'dfx-marq ...'` / `'lds-scroll ...'` — these keyframes exist in globals.css). `pulseDot`, `liveChipGlow`, `dfxLivePulse`, `loginFade` keyframes also exist; other keyframe names are GONE, so don't reference them.
5. **Navigation/state.** The prototype uses `tab`/`setTab`, `siteTheme`/`setSiteTheme`,
   `mobileMenu`, `openApp`, `loginProduct`. In this project:
   - This page renders INSIDE `<SiteShell>` already (nav + footer provided by the route). Do NOT render SiteNav/SiteFooter yourself.
   - Replace `setTab("raise")` etc. with Next navigation. Routes: home `/`, raise `/raise`, tokenize→`/mint`, invest→`/yield`, token→`/real`, learn `/learn`, contact `/contact`, compliance `/compliance`, login `/login`. Use `import Link from "next/link"` for clickable nav, or `useRouter().push()` inside handlers. Import `{ appHref }` from `@/components/layout/nav-config` for "Open App" buttons → `router.push(appHref("raise"))`.
   - For `siteTheme === "night"` branches: import `{ useTheme } from "next-themes"`, and compute `const { resolvedTheme } = useTheme(); const night = mounted ? resolvedTheme !== "light" : true;` (guard with a `mounted` state set in `useEffect` to avoid hydration mismatch). Most styling already uses `var(--s-*)` CSS vars and adapts automatically — prefer leaving those alone.
6. **Client vs server.** If the component uses `useState/useEffect/useRouter/useTheme/
   onClick`, put `"use client";` at the top of the file. Page bodies with interactivity
   should be client components.
7. **Port helper components used by this page** (e.g. `HeroAppExplainer`,
   `ComplianceCrossCut`, `RaiseAudienceCards`, `PillarStructures`, `DealFlowTicker`,
   `LiveDataStreamLive`, `StreamEvent`, `Sparkline`, `FancyKpiLight`, `BuyRealBtn`,
   `RWAioSpotlight`, etc.) as **local functions inside your section file** (self-contained).
   Find them by grepping the source. Apply the same drop-animation rules.

## Image map (page → ImgPlaceholder num → real file)
Pass `page` + `num` to `<Img>`; it picks the Light/Dark variant by theme.
- home: 1→Image-01, 2→Image-02, 3→Image-03, 4→Image-04. (nums 5–9 = event photos, NO file → placeholder)
- raise: 10, 11, 11.0, 11.1
- mint: 12, 13
- yield: 14, 15 (16 reuses 15)
- learn: 18→Image-20, and resource cards → pass `file="Image-21"`, `"Image-21.1"`, `"Image-21.2"`, `"Image-21.3"`
- compliance (#17), $REAL, contact, login: NO files → placeholder / brand lockups only.

## Output
- Write `components/sections/<PageName>.tsx` exporting a default component.
- Write/overwrite `app/<route>/page.tsx`:
  ```tsx
  import { SiteShell } from "@/components/layout/SiteShell";
  import PageBody from "@/components/sections/<PageName>";
  export default function Page() { return <SiteShell><PageBody/></SiteShell>; }
  ```
  ($REAL uses `<SiteShell forceNight>`; login renders WITHOUT SiteShell — see its task.)
- Keep it TypeScript-clean: type component props minimally (use `any`/inline types where the prototype was loose; avoid `@ts-ignore`). Prefer `React.CSSProperties` for style helpers.
- Do NOT edit shared files in `@/lib` or `@/components/{ui,hero,layout}` — only your section + route file.
