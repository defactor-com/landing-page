"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { V, V_LIGHT, G, GOLD, TEAL, RAIL, CW } from "@/lib/tokens";
import { Icon } from "@/components/ui/Icon";
import { MButton, MirrorCard, CenterEyebrow, MEyebrow, SectionSeam } from "@/components/ui/primitives";
import { Img } from "@/components/ui/Img";
import { CosmicHero } from "@/components/hero/CosmicHero";
import { ChordMeshHero } from "@/components/hero/ChordMeshHero";
import { appHref } from "@/components/layout/nav-config";
import { EMBLEM_SRC } from "@/lib/brand";

// Static, animation-free port of the prototype's MS_CSS base + violet brand overrides.
// All @keyframes / animation declarations were stripped (per porting spec) and .fade-up
// is forced visible. Rules are filtered to the classes this page uses.
const MS_CSS = `.dfx-ms{display:contents;color:var(--s-ink);--c-violet: #5A5BEB; --c-violet-l:#8182EF; --c-green: #26A66B; --c-gold: #E0A225; --c-crimson: #D21A4D; --c-teal: #0B7FAB; --c-navy: #070118; --t-red: #f87171; --t-grn: #82E2B6; --t-vio: #8182EF; --t-gld: #E0A225; --t-teal: #5fbcd8; --brand: var(--c-green); --brand-tint: var(--t-grn); --brand-deep: #178052; --brand-deeper: #0E5F3C; --s-bg-night: #05040f; --s-surface-night: #08081e; --s-card-night: #111033; --s-card2-night: #0b0a26; --s-border-night: rgba(255,255,255,0.10); --s-ink-night: #f5f6ff; --s-muted-night: rgba(245,246,255,0.60); --s-lo-night: rgba(245,246,255,0.40); --s-bg-day: #F5F6F8; --s-surface-day: #FFFFFF; --s-card-day: #FFFFFF; --s-card2-day: #FAFAFB; --s-border-day: #E6E9F0; --s-ink-day: #111827; --s-muted-day: #6B7280; --s-lo-day: #9CA3AF; --s-bg: var(--s-bg-night); --s-surface: var(--s-surface-night); --s-card: var(--s-card-night); --s-card-2: var(--s-card2-night); --s-border: var(--s-border-night); --s-ink: var(--s-ink-night); --s-muted: var(--s-muted-night); --s-lo: var(--s-lo-night); --brand-08: rgba(40,166,107,0.08); --brand-14: rgba(40,166,107,0.14); --brand-22: rgba(40,166,107,0.22); --brand-30: rgba(40,166,107,0.30); --brand-55: rgba(40,166,107,0.55); --crim-08: var(--brand-08); --crim-14: var(--brand-14); --crim-22: var(--brand-22); --crim-30: var(--brand-30); --crim-55: var(--brand-55); --night-mesh-base: #050614; --night-mesh-a: rgba(110,231,183,0.16); --night-mesh-b: rgba(40,166,107,0.18); --night-mesh-c: rgba(94,228,205,0.10); --night-stream-base: #06051a; --night-app-base: #07061f; --night-on-dark: #ffffff; --night-on-dark-mut: rgba(255,255,255,0.62); --night-on-dark-lo: rgba(255,255,255,0.45); --night-rule: rgba(255,255,255,0.10); --mesh-base: var(--night-mesh-base); --mesh-a: var(--night-mesh-a); --mesh-b: var(--night-mesh-b); --mesh-c: var(--night-mesh-c); --stream-base: var(--night-stream-base); --app-base: var(--night-app-base); --on-dark: var(--night-on-dark); --on-dark-mut: var(--night-on-dark-mut); --on-dark-lo: var(--night-on-dark-lo); --rule: var(--night-rule);}.dfx-ms .section-light, .dfx-ms .section-grey{ position: relative; }.dfx-ms .section-light + .section-grey::before, .dfx-ms .section-grey + .section-light::before{ content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(40,166,107,0.16) 30%, rgba(40,166,107,0.20) 50%, rgba(40,166,107,0.16) 70%, transparent 100%); pointer-events: none; }.dfx-ms .section-light, .dfx-ms .section-grey{ background-image: linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(40,166,107,0.012) 50%, rgba(90,91,235,0.012) 100%); }.dfx-ms .eyebrow{ display: inline-flex; align-items: center; gap: 8px; font-size: 9px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--brand); font-feature-settings: "ss01"; }.dfx-ms .eyebrow::before{ content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--brand); box-shadow: 0 0 8px var(--brand); }.dfx-ms .eyebrow.on-dark{ color: var(--t-grn); }.dfx-ms .eyebrow.on-dark::before{ background: var(--t-grn); box-shadow: 0 0 8px var(--t-grn); }.dfx-ms .h-section{ font-size: clamp(28px, 5.5vw, 42px); font-weight: 700; letter-spacing: -1.5px; line-height: 1.1; text-wrap: balance; }.dfx-ms .h-card{ font-size: clamp(18px, 2vw, 22px); font-weight: 600; letter-spacing: -0.3px; line-height: 1.2; text-wrap: balance; }.h-feat{ font-size: 16.5px; font-weight: 700; letter-spacing: -0.2px; line-height: 1.3; color: var(--s-ink); text-wrap: balance; }.h-card{ font-size: clamp(18px, 2vw, 22px); font-weight: 600; letter-spacing: -0.3px; line-height: 1.3; color: var(--s-ink); text-wrap: balance; }.dfx-ms .sub{ font-size: 14px; line-height: 1.7; color: var(--s-muted); font-weight: 400; }.dfx-ms .grad-crim{ background: linear-gradient(135deg, var(--brand) 0%, #82E2B6 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }.dfx-ms .grad-irid{ background-image: linear-gradient(95deg, #26A66B 0%, #82E2B6 28%, #5eead4 48%, #72b0e3 68%, #82E2B6 84%, #26A66B 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; filter: drop-shadow(0 0 7px rgba(40,166,107,0.26)) drop-shadow(0 0 3px rgba(110,231,183,0.20)); }@media (prefers-reduced-motion: reduce){.dfx-ms .grad-irid{ background-position: 0 0; }}.dfx-ms .section-pad{ padding: 32px 0; }.dfx-ms .section-pad-sm{ padding: 32px 0; }.dfx-ms .section-light{ background: var(--s-surface); }.dfx-ms .section-grey{ background: var(--s-bg); }.dfx-ms .section-dark{ background: #06051a; color: #fff; }.dfx-ms .intro-head{ max-width: 720px; margin: 0 auto 64px; text-align: center; }.dfx-ms .intro-head h2{ margin: 16px 0 20px; }.dfx-ms .intro-head .sub{ font-size: 17px; }.dfx-ms .img-ph{ --ph-accent: var(--brand); --ph-accent-rgb: 40, 166, 107; position: relative; width: 100%; border-radius: 16px; overflow: hidden; background: repeating-linear-gradient( 135deg, rgba(var(--ph-accent-rgb), 0.08) 0px, rgba(var(--ph-accent-rgb), 0.08) 10px, transparent 10px, transparent 20px ), rgba(var(--ph-accent-rgb), 0.06); border: 1px dashed rgba(var(--ph-accent-rgb), 0.40); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 20px; min-height: 200px; }.dfx-ms .img-ph .ph-glyph{ width: 26px; height: 26px; color: var(--ph-accent); opacity: 0.7; }.dfx-ms .img-ph .ph-label{ font-family: 'Sora', sans-serif; font-size: 10.5px; font-weight: 600; color: var(--ph-accent); letter-spacing: 0.04em; text-align: center; line-height: 1.4; max-width: 80%; opacity: 0.85; }.dfx-ms .img-ph .ph-caption{ font-family: 'Sora', sans-serif; font-size: 8.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ph-accent); opacity: 0.45; }.dfx-ms .img-ph.on-dark{ background: repeating-linear-gradient( 135deg, rgba(255, 255, 255, 0.06) 0px, rgba(255, 255, 255, 0.06) 10px, transparent 10px, transparent 20px ), rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.18); }.dfx-ms .img-ph.on-dark .ph-glyph, .dfx-ms .img-ph.on-dark .ph-label, .dfx-ms .img-ph.on-dark .ph-caption{ color: rgba(255, 255, 255, 0.7); }.dfx-ms .img-ph.on-dark .ph-caption{ color: rgba(255, 255, 255, 0.42); }.dfx-ms .img-ph.ratio-16x9{ aspect-ratio: 16 / 9; min-height: 0; }.dfx-ms .steps-grid{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px; }.dfx-ms .step{ background: transparent; border: 0; padding: 0; box-shadow: none; position: relative; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); }.dfx-ms .step::before{ display: none; }.dfx-ms .step:hover{ transform: none; box-shadow: none; border-color: transparent; }.dfx-ms .step-head{ display: flex; flex-direction: column; align-items: flex-start; gap: 0; margin-bottom: 16px; }.dfx-ms .step-index{ font-size: clamp(32px, 5.5vw, 44px); font-weight: 300; letter-spacing: -2.4px; color: var(--brand); line-height: 1; font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; display: block; position: relative; margin-bottom: 28px; background: transparent; }.dfx-ms .step-index::after{ content: ""; position: absolute; bottom: -14px; left: 0; width: 36px; height: 2px; background: var(--brand); }.dfx-ms .step-head::after{ display: none; }.dfx-ms .step-head h3{ margin-bottom: 0; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--s-ink); }.dfx-ms .step .body{ font-size: 13.5px; line-height: 1.65; color: var(--s-muted); }@media (max-width: 900px){.dfx-ms .steps-grid{ grid-template-columns: repeat(2, 1fr); gap: 28px; }}@media (max-width: 540px){.dfx-ms .steps-grid{ grid-template-columns: 1fr; gap: 24px; }}.dfx-ms .flagship-band{ position: relative; background: radial-gradient(ellipse 90vw 70vh at 50% 0%, rgba(129,130,239,0.18) 0%, transparent 55%), radial-gradient(ellipse 100vw 80vh at 50% 100%, rgba(40,166,107,0.07) 0%, transparent 55%), linear-gradient(180deg, #0c0a28 0%, #130b34 48%, #0a0722 100%); color: #fff; overflow: hidden; }.dfx-ms .flagship-card{ position: relative; overflow: hidden; padding: 44px 48px 36px; background: radial-gradient(ellipse at 80% 0%, rgba(129,130,239,0.13) 0%, transparent 55%), radial-gradient(ellipse at 20% 100%, rgba(40,166,107,0.06) 0%, transparent 50%), rgba(13, 10, 40, 0.82); border: 1px solid rgba(129,130,239,0.28); border-radius: 18px; box-shadow: 0 0 0 1px rgba(129,130,239,0.14) inset, 0 1px 0 rgba(196,181,253,0.22) inset, 0 32px 72px -28px rgba(90,91,235,0.48), 0 14px 36px -16px rgba(0, 0, 0, 0.70); }.dfx-ms .flagship-card > *{ position: relative; z-index: 1; }.dfx-ms .flagship-card-head{ display: flex; align-items: center; justify-content: center; margin-bottom: 36px; gap: 20px; }.dfx-ms .flagship-tag{ display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #82E2B6; background: rgba(40,166,107,0.10); border: 1px solid rgba(40,166,107,0.30); border-radius: 100px; }.dfx-ms .flagship-tag-dot{ width: 6px; height: 6px; border-radius: 50%; background: #82E2B6; box-shadow: 0 0 8px #82E2B6; }.dfx-ms .flagship-client-lockup{ display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; }.dfx-ms .flagship-client-logo{ height: 96px; width: auto; display: block; filter: drop-shadow(0 4px 22px rgba(94,228,205,0.5)); }.dfx-ms .flagship-h{ font-size: clamp(28px, 3.4vw, 40px); font-weight: 700; letter-spacing: -1.0px; line-height: 1.1; color: #fff; margin: 0 auto 20px; max-width: 800px; text-align: center; }.dfx-ms .flagship-sub{ font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.78); max-width: 720px; margin: 0 auto 28px; text-align: center; }.dfx-ms .flagship-product{ margin: 4px 0 32px; background: repeating-linear-gradient(135deg, rgba(225,163,37,0.06) 0px, rgba(225,163,37,0.06) 12px, transparent 12px, transparent 24px), rgba(225,163,37,0.05); border: 1px solid rgba(225,163,37,0.24); box-shadow: 0 1px 0 rgba(225,163,37,0.10) inset, 0 28px 56px -22px rgba(225,163,37,0.32), 0 8px 24px -10px rgba(0,0,0,0.40); }.dfx-ms .flagship-product .ph-glyph, .dfx-ms .flagship-product .ph-label{ color: rgba(225,163,37,0.85); }.dfx-ms .flagship-product .ph-caption{ color: rgba(225,163,37,0.50); }@media (max-width: 760px){.dfx-ms .flagship-product{ margin: 4px 0 24px; }}.dfx-ms .flagship-stats{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-bottom: 36px; padding: 28px 0; border-top: 1px solid rgba(225,163,37,0.18); border-bottom: 1px solid rgba(225,163,37,0.18); position: relative; }.dfx-ms .flagship-stats::before{ content: ""; position: absolute; top: -1px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(225,163,37,0.55) 18%, rgba(225,163,37,0.18) 36%, transparent 50%, rgba(225,163,37,0.55) 65%, rgba(225,163,37,0.18) 82%, transparent 100%); }.dfx-ms .fs-stat{ display: flex; flex-direction: column; gap: 8px; padding: 0 24px; border-left: 1px solid rgba(225,163,37,0.12); }.dfx-ms .fs-stat:first-child{ border-left: 0; padding-left: 0; }.dfx-ms .fs-stat-eyebrow{ display: inline-flex; align-items: center; gap: 6px; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(225,163,37,0.85); }.dfx-ms .fs-stat-dot{ width: 4px; height: 4px; border-radius: 50%; background: #82E2B6; }.dfx-ms .fs-stat-v{ font-size: clamp(28px, 3.4vw, 38px); font-weight: 300; letter-spacing: -1.4px; color: #fff; font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; line-height: 1; }.dfx-ms .fs-stat:nth-child(3) .fs-stat-v{ color: #82E2B6; }.dfx-ms .flagship-quote{ position: relative; margin: 0 0 32px; padding: 4px 0 4px 64px; max-width: 880px; }.dfx-ms .flagship-quote-glyph{ position: absolute; top: 0; left: 0; opacity: 0.85; }.dfx-ms .flagship-quote p{ font-size: 17px; line-height: 1.6; font-weight: 400; font-style: italic; color: rgba(255,255,255,0.88); margin: 0 0 16px; }.dfx-ms .flagship-cite{ display: flex; flex-direction: column; gap: 2px; font-style: normal; }.dfx-ms .flagship-cite-name{ font-size: 13px; font-weight: 700; color: #82E2B6; letter-spacing: -0.1px; }.dfx-ms .flagship-cite-meta{ font-size: 11.5px; color: rgba(255,255,255,0.55); letter-spacing: 0.02em; }.dfx-ms .flagship-rail{ display: flex; align-items: center; justify-content: space-between; padding-top: 24px; border-top: 1px solid rgba(225,163,37,0.10); gap: 20px; }.dfx-ms .flagship-rail-status{ display: inline-flex; align-items: center; gap: 8px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(110,231,183,0.85); }.dfx-ms .flagship-rail-dot{ width: 6px; height: 6px; border-radius: 50%; background: #82E2B6; box-shadow: 0 0 8px #82E2B6; }.dfx-ms .flagship-rail-chord{ display: flex; gap: 4px; height: 3px; width: 140px; }.dfx-ms .flagship-rail-chord span{ flex: 1; border-radius: 1px; }.dfx-ms .flagship-rail-chord span:nth-child(1){ background: var(--c-violet); }.dfx-ms .flagship-rail-chord span:nth-child(2){ background: var(--c-green); }.dfx-ms .flagship-rail-chord span:nth-child(3){ background: var(--c-gold); }.dfx-ms .flagship-rail-chord span:nth-child(4){ background: var(--brand); }@media (max-width: 760px){.dfx-ms .flagship-card{ padding: 28px 24px 24px; }.dfx-ms .flagship-card-head{ flex-direction: column; align-items: flex-start; gap: 16px; }.dfx-ms .flagship-stats{ grid-template-columns: repeat(2, 1fr); gap: 24px 0; padding: 20px 0; }.dfx-ms .fs-stat{ padding: 0 16px; }.dfx-ms .fs-stat:nth-child(3){ border-left: 0; padding-left: 0; }.dfx-ms .fs-stat-v{ font-size: 24px; }.dfx-ms .flagship-h{ font-size: 24px; }.dfx-ms .flagship-sub{ font-size: 14px; }.dfx-ms .flagship-quote{ padding-left: 0; padding-top: 40px; }.dfx-ms .flagship-quote p{ font-size: 15px; }.dfx-ms .flagship-quote-glyph{ transform: scale(0.85); transform-origin: top left; }}.dfx-ms #positioning{ position: relative; overflow: hidden; }.dfx-ms #audience{ position: relative; overflow: hidden; }.dfx-ms .mirror-synthesis{ max-width: 760px; margin: 40px auto 0; text-align: center; font-size: 15px; line-height: 1.7; color: var(--s-muted); }.dfx-ms .mirror-synthesis strong{ color: var(--s-ink); font-weight: 700; }.dfx-ms #capabilities{ position: relative; overflow: hidden; }.dfx-ms .positioning-axis{ margin: 0 auto 80px; max-width: 1080px; padding: 36px 24px 100px; background: linear-gradient(180deg, var(--s-card-2) 0%, var(--s-card) 100%); border: 1px solid var(--s-border); border-radius: 18px; position: relative; }.dfx-ms .axis-labels{ display: flex; justify-content: space-between; margin-bottom: 48px; }.dfx-ms .axis-label-l, .dfx-ms .axis-label-r{ font-family: 'Sora', sans-serif; max-width: 220px; }.dfx-ms .axis-label-l{ text-align: left; }.dfx-ms .axis-label-r{ text-align: right; }.dfx-ms .axis-label-strong{ font-size: 16px; font-weight: 700; letter-spacing: -0.3px; color: var(--s-ink); margin-bottom: 4px; }.dfx-ms .axis-label-weak{ font-size: 12px; color: var(--s-muted); letter-spacing: 0; }.dfx-ms .axis-track{ position: relative; height: 4px; margin: 0 16px; }.dfx-ms .axis-line{ position: absolute; left: 0; right: 0; top: 0; height: 4px; background: linear-gradient(90deg, rgba(90,91,235,0.55) 0%, rgba(90,91,235,0.40) 25%, rgba(40,166,107,0.55) 60%, rgba(225,163,37,0.55) 100%); border-radius: 2px; }.dfx-ms .axis-marker{ position: absolute; top: -8px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 12px; white-space: nowrap; }.dfx-ms .axis-marker-dot{ width: 18px; height: 18px; border-radius: 50%; background: var(--s-card); border: 3px solid var(--s-muted); position: relative; z-index: 2; }.dfx-ms .axis-marker-us .axis-marker-dot{ width: 26px; height: 26px; background: var(--brand); border-color: #ffffff; box-shadow: 0 0 0 3px var(--brand), 0 0 0 6px rgba(40,166,107,0.20), 0 6px 16px rgba(40,166,107,0.40); margin-top: -4px; }.axis-marker-us .axis-marker-dot{ display: none; }.axis-marker-us .axis-marker-nebula{ display: none; }.axis-marker-us .axis-marker-emblem{ width: 30px; height: 30px; filter: none; }.axis-marker-us .axis-marker-glyph{ width: 30px; height: 30px; margin-top: -5px; }.axis-marker-us .axis-marker-hot{ top: -44px; }.axis-marker-us .axis-marker-dot{ display: none !important; }.axis-marker-us .axis-marker-nebula{ display: none !important; }.axis-marker-us .axis-marker-emblem{ }.axis-marker-us .axis-marker-glyph{ margin-top: -5px !important; }.axis-marker-us .axis-marker-hot{ top: -44px !important; }.axis-marker-us .axis-marker-glyph::before{ display: none !important; }.dfx-ms .axis-marker-label{ font-family: 'Sora', sans-serif; font-size: 11.5px; font-weight: 600; text-align: center; color: var(--s-muted); line-height: 1.35; max-width: 100px; }.dfx-ms .axis-marker-us .axis-marker-label{ font-weight: 700; font-size: 13px; max-width: 160px; white-space: nowrap; margin-top: 6px; letter-spacing: -0.3px; }.dfx-ms .axis-marker-wordmark{ font-family: 'Sora', sans-serif; font-weight: 800; }.dfx-ms .axis-marker-wordmark .axw-defactor{ color: var(--s-ink); }.dfx-ms .axis-marker-wordmark .axw-raise{ color: var(--brand-deep); }.dfx-ms .axis-marker-glyph{ position: relative; z-index: 3; width: 40px; height: 40px; display: grid; place-items: center; margin-top: -8px; }.dfx-ms .axis-marker-glyph::before{ content: ""; position: absolute; left: 50%; top: 50%; width: 92px; height: 92px; transform: translate(-50%, -50%); border-radius: 50%; z-index: 0; pointer-events: none; background: radial-gradient(circle, var(--s-card) 0%, var(--s-card) 46%, transparent 72%); }.dfx-ms .axis-marker-emblem{ position: relative; z-index: 2; width: 40px; height: 40px; object-fit: contain; display: block; transform-box: fill-box; transform-origin: 50% 50%; will-change: transform; backface-visibility: hidden; }.dfx-ms .axis-marker-nebula{ position: absolute; left: 50%; top: 50%; width: 60px; height: 60px; transform: translate(-50%, -50%); border-radius: 50%; z-index: 1; pointer-events: none; background: radial-gradient(circle, rgba(110,231,183,0.35) 0%, transparent 70%); }@media (prefers-reduced-motion: reduce){.dfx-ms .axis-marker-emblem, .dfx-ms .axis-marker-nebula{ }}.dfx-ms .axis-marker-ghost .axis-marker-dot{ width: 12px; height: 12px; background: transparent; border: 1.5px dashed rgba(7,1,24,0.30); }.dfx-ms .axis-marker-ghost .axis-marker-label{ font-size: 10.5px; font-weight: 500; font-style: italic; color: var(--s-muted); letter-spacing: 0.01em; }.dfx-ms .axis-marker-hot{ position: absolute; top: -28px; left: 50%; transform: translateX(-50%); font-size: 10px; font-weight: 700; padding: 4px 8px; background: rgba(225,163,37,0.16); color: var(--c-gold); border: 1px solid rgba(225,163,37,0.40); border-radius: 100px; white-space: nowrap; }.dfx-ms .positioning-conclusions{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 120px;}.dfx-ms .pc-card{ position: relative; padding: 28px 28px; background: var(--s-card); border: 1px solid var(--s-border); border-radius: 14px; overflow: hidden; }.dfx-ms .pc-card::before{ content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--pc-accent, var(--brand)) 0%, transparent 100%); }.dfx-ms .pc-card.d1{ --pc-accent: var(--c-violet); }.dfx-ms .pc-card.d2{ --pc-accent: var(--brand); }.dfx-ms .pc-card.d3{ --pc-accent: var(--c-gold); }.dfx-ms .pc-card:hover{ border-color: rgba(40,166,107,0.30); }.dfx-ms .pc-icon{ display: inline-flex; align-items: center; justify-content: center; color: var(--pc-accent, var(--brand)); margin-bottom: 16px; transition: transform 0.45s cubic-bezier(0.22,1,0.36,1); }.dfx-ms .pc-icon svg{ width: 28px; height: 28px; }.dfx-ms .pc-card:hover .pc-icon{ transform: translateY(-2px) scale(1.08); }.dfx-ms .pc-card h4{ font-size: 17px; font-weight: 700; letter-spacing: -0.3px; color: var(--s-ink); margin-bottom: 12px; line-height: 1.25; }.dfx-ms .pc-card p{ font-size: 13.5px; line-height: 1.65; color: var(--s-muted); }@media (max-width: 900px){.dfx-ms .positioning-axis{ padding: 32px 16px 80px; }.dfx-ms .axis-labels{ margin-bottom: 36px; }.dfx-ms .axis-label-strong{ font-size: 14px; }.dfx-ms .axis-label-weak{ font-size: 11px; }.dfx-ms .axis-marker-label{ font-size: 10px; max-width: 70px; }.dfx-ms .positioning-conclusions{ grid-template-columns: 1fr; gap: 16px; }}@media (max-width: 720px){.dfx-ms .axis-marker-ghost .axis-marker-label{ display: none; }.dfx-ms .axis-marker-glyph{ width: 30px; height: 30px; margin-top: -6px; }.dfx-ms .axis-marker-emblem{ width: 30px; height: 30px; }.dfx-ms .axis-marker-us .axis-marker-label{ font-size: 11px; max-width: 130px; white-space: normal; margin-top: 4px; }.dfx-ms .axis-marker-hot{ font-size: 9px; padding: 3px 7px; top: -24px; }.dfx-ms .positioning-conclusions{ margin-top: 84px; }}@media (max-width: 480px){.dfx-ms .positioning-axis{ padding: 28px 12px 64px; }.dfx-ms .axis-track{ margin: 0 6px; }.dfx-ms .axis-label-strong{ font-size: 13px; }.dfx-ms .axis-label-weak{ font-size: 10px; }.dfx-ms .axis-marker-us .axis-marker-label{ max-width: 104px; font-size: 10.5px; }.dfx-ms .axis-marker-glyph, .dfx-ms .axis-marker-emblem{ width: 26px; height: 26px; }.dfx-ms .positioning-conclusions{ margin-top: 70px; }}.dfx-ms .bento{ display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: auto auto; gap: 12px; margin-top: 16px; align-items: stretch; }.dfx-ms .bento-card{ position: relative; border-radius: 16px; overflow: hidden; background: radial-gradient(ellipse 70% 60% at 100% 0%, rgba(40,166,107,0.07) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(40,166,107,0.04) 0%, transparent 50%), var(--s-card); box-shadow: 0 0 0 1px rgba(40,166,107,0.16); transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease; }.dfx-ms .bento-card:hover{ box-shadow: 0 0 0 1px rgba(40,166,107,0.34), 0 22px 44px -16px rgba(40,166,107,0.35); transform: translateY(-3px); }.dfx-ms .bento-card .accent-bar{ height: 4px; background: linear-gradient(90deg, var(--brand), rgba(40,166,107,0.4), transparent); }.dfx-ms .bento-card .inner{ padding: 24px 28px 28px; position: relative; z-index: 1; }.dfx-ms .bento-card .e{ font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--brand); margin-bottom: 12px; }.dfx-ms .bento-card h4{ font-size: 17px; font-weight: 700; letter-spacing: -0.4px; color: var(--s-ink); margin-bottom: 8px; line-height: 1.22; }.dfx-ms .bento-card p{ font-size: 13px; line-height: 1.65; color: var(--s-muted); }.dfx-ms .bento-card{ --cap-color: var(--c-green); --cap-glow: rgba(40,166,107,0.55); }.dfx-ms .bento-card.tile-teal{ --cap-color: var(--c-teal); --cap-glow: rgba(94,228,205,0.55); }.dfx-ms .bento-card.tile-gold{ --cap-color: var(--c-gold); --cap-glow: rgba(225,163,37,0.55); }.dfx-ms .bento-card.wide{ --cap-color: var(--t-vio); --cap-glow: rgba(90,91,235,0.60); }.dfx-ms .cap-icon{ position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; color: var(--cap-color); transition: transform 0.45s cubic-bezier(0.22,1,0.36,1); }.dfx-ms .cap-icon svg{ width: 30px; height: 30px; filter: drop-shadow(0 0 4px var(--cap-glow)); transition: filter 0.45s ease; }.dfx-ms .bento-card:hover .cap-icon{ transform: translateY(-2px) scale(1.08); }.dfx-ms .bento-card:hover .cap-icon svg{ filter: drop-shadow(0 0 10px var(--cap-glow)) drop-shadow(0 0 3px var(--cap-glow)); }@media (prefers-reduced-motion: reduce){.dfx-ms .cap-icon svg{ }}.dfx-ms .bento-card.hero-tile{ grid-row: span 2; }.dfx-ms .bento-card.hero-tile .inner{ padding: 28px 32px 32px; min-height: 280px; display: flex; flex-direction: column; height: 100%; }.dfx-ms .bento-card.hero-tile h4{ font-size: 24px; letter-spacing: -0.8px; line-height: 1.1; }.dfx-ms .bento-card.hero-tile p{ font-size: 14px; margin-bottom: 20px; }.dfx-ms .bento-card.hero-tile .lead-tile-img{ margin-bottom: 20px; flex: 1; min-height: 130px; }.dfx-ms .bento-card.tile-teal{ background: radial-gradient(ellipse 70% 60% at 100% 0%, rgba(94,228,205,0.09) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(94,228,205,0.05) 0%, transparent 50%), var(--s-card); box-shadow: 0 0 0 1px rgba(94,228,205,0.18); }.dfx-ms .bento-card.tile-teal:hover{ box-shadow: 0 0 0 1px rgba(94,228,205,0.36), 0 22px 44px -16px rgba(94,228,205,0.35); }.dfx-ms .bento-card.tile-teal .accent-bar{ background: linear-gradient(90deg, var(--c-teal), rgba(94,228,205,0.4), transparent); }.dfx-ms .bento-card.tile-teal .e{ color: var(--c-teal); }.dfx-ms .bento-card.tile-gold{ background: radial-gradient(ellipse 70% 60% at 100% 0%, rgba(225,163,37,0.10) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(225,163,37,0.05) 0%, transparent 50%), var(--s-card); box-shadow: 0 0 0 1px rgba(225,163,37,0.18); }.dfx-ms .bento-card.tile-gold:hover{ box-shadow: 0 0 0 1px rgba(225,163,37,0.36), 0 22px 44px -16px rgba(225,163,37,0.35); }.dfx-ms .bento-card.tile-gold .accent-bar{ background: linear-gradient(90deg, var(--c-gold), rgba(225,163,37,0.4), transparent); }.dfx-ms .bento-card.tile-gold .e{ color: var(--c-gold); }.dfx-ms .bento-card.wide h4{ color: #fff; }.dfx-ms .bento-card.wide p{ color: rgba(255,255,255,0.65); }.dfx-ms .bento-card.wide{ grid-column: span 2; background: linear-gradient(140deg, #0a0728 0%, #14093a 100%); color: #fff; box-shadow: 0 0 0 1px rgba(129,130,239,0.32), 0 24px 48px -16px rgba(90,91,235,0.40); }.dfx-ms .bento-card.wide:hover{ box-shadow: 0 0 0 1px rgba(129,130,239,0.55), 0 28px 56px -16px rgba(90,91,235,0.55); }.dfx-ms .bento-card.wide .accent-bar{ background: linear-gradient(90deg, var(--c-violet), rgba(90,91,235,0.4), transparent); }.dfx-ms .bento-card.wide .e{ color: var(--t-vio); }.dfx-ms .bento-card.wide h4{ color: #fff; }.dfx-ms .bento-card.wide p{ color: rgba(255,255,255,0.74); }.dfx-ms .bento-card .stat-row{ display: flex; gap: 24px; margin-top: auto; padding-top: 20px; border-top: 1px solid var(--s-border); }.dfx-ms .bento-card .stat-row .stat .k{ font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--s-muted); margin-bottom: 6px; }.dfx-ms .bento-card .stat-row .stat .v{ font-size: 28px; font-weight: 300; letter-spacing: -1.2px; color: var(--brand); line-height: 1; font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }.dfx-ms .mirror{ display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; gap: 0; max-width: 1080px; margin: 0 auto; }.dfx-ms .mirror-side{ display: flex; flex-direction: column; gap: 20px; min-width: 0; }.dfx-ms .mirror-borrower{ padding-right: 32px; }.dfx-ms .mirror-lender{ padding-left: 32px; }.dfx-ms .mirror-head{ display: flex; align-items: center; justify-content: space-between; gap: 12px; }.dfx-ms .mirror-lender .mirror-head{ flex-direction: row-reverse; }.dfx-ms .mirror-tag{ font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; padding: 6px 12px; border-radius: 100px; }.dfx-ms .mirror-tag.tag-green{ color: var(--brand); background: rgba(40,166,107,0.14); }.dfx-ms .mirror-tag.tag-violet{ color: #b07d15; background: rgba(225,163,37,0.18); }.dfx-ms .mirror-role{ font-size: 11px; font-weight: 600; color: var(--s-muted); }.dfx-ms .msurface{ background: var(--s-card); border: 1px solid var(--s-border); border-radius: 14px; overflow: hidden; transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease; }.dfx-ms .mirror-borrower .msurface{ border-color: rgba(40,166,107,0.24); box-shadow: 0 20px 44px -24px rgba(40,166,107,0.45); }.dfx-ms .mirror-lender .msurface{ border-color: rgba(225,163,37,0.28); box-shadow: 0 20px 44px -24px rgba(225,163,37,0.45); }.dfx-ms .mirror-borrower:hover .msurface{ transform: translateY(-3px); box-shadow: 0 26px 52px -22px rgba(40,166,107,0.55); }.dfx-ms .mirror-lender:hover .msurface{ transform: translateY(-3px); box-shadow: 0 26px 52px -22px rgba(225,163,37,0.55); }.dfx-ms .mirror-borrower .msurface{ }.dfx-ms .mirror-lender .msurface{ }.dfx-ms .mirror-borrower:hover .msurface, .dfx-ms .mirror-lender:hover .msurface{ }.dfx-ms .msurface-bar{ display: flex; align-items: center; gap: 6px; padding: 8px 12px; border-bottom: 1px solid var(--s-border); background: rgba(127,127,140,0.06); }.dfx-ms .msd{ width: 7px; height: 7px; border-radius: 50%; background: rgba(127,127,140,0.30); }.dfx-ms .mcrumb{ margin-left: 8px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--s-muted); }.dfx-ms .msurface-body{ padding: 16px 16px 20px; display: flex; flex-direction: column; gap: 12px; }.dfx-ms .mrow{ display: flex; align-items: center; justify-content: space-between; gap: 12px; }.dfx-ms .mrow-head{ padding-bottom: 12px; border-bottom: 1px solid var(--s-border); }.dfx-ms .mname{ font-size: 14px; font-weight: 700; color: var(--s-ink); letter-spacing: -0.2px; }.dfx-ms .mk{ font-size: 12px; color: var(--s-muted); }.dfx-ms .mv{ font-size: 13px; font-weight: 700; color: var(--s-ink); font-variant-numeric: tabular-nums; }.dfx-ms .mrow-sub .mk{ font-size: 10.5px; }.dfx-ms .mrow-sub .mv-muted{ font-size: 10px; color: var(--s-muted); font-weight: 600; }.dfx-ms .mpill{ font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 8px; border-radius: 100px; }.dfx-ms .mpill.pill-green{ background: rgba(40,166,107,0.16); color: var(--brand); }.dfx-ms .mpill.pill-violet{ background: rgba(225,163,37,0.18); color: #b07d15; }.dfx-ms .mbtn{ margin-top: 6px; align-self: flex-start; border: 0; border-radius: 9px; padding: 12px 16px; font-size: 12.5px; font-weight: 700; font-family: inherit; color: #fff; }.dfx-ms .mbtn.mbtn-green{ background: var(--brand); box-shadow: 0 8px 18px -8px rgba(40,166,107,0.7); }.dfx-ms .mirror-blurb{ font-size: 13.5px; line-height: 1.6; color: var(--s-muted); margin: 0; }.dfx-ms .mirror-lender .mirror-blurb{ text-align: left; }.dfx-ms .mirror-seam{ position: relative; display: flex; align-items: center; justify-content: center; width: 132px; }.dfx-ms .seam-line{ position: absolute; top: 50%; left: 4%; right: 4%; height: 2px; transform: translateY(-50%); background: linear-gradient(90deg, transparent, rgba(40,166,107,0.5) 24%, rgba(225,163,37,0.5) 76%, transparent); overflow: visible; }.dfx-ms .seam-line::before{ content: ""; position: absolute; top: 50%; left: 0; right: 0; height: 2px; transform: translateY(-50%); background: linear-gradient(90deg, transparent 0%, rgba(110,231,183,0) 30%, #d4f7e4 48%, #fff 50%, #fde9c0 52%, rgba(253,233,192,0) 70%, transparent 100%); background-size: 220% 100%; filter: drop-shadow(0 0 6px rgba(255,255,255,0.8)) drop-shadow(0 0 12px rgba(110,231,183,0.6)); }.dfx-ms .seam-flow{ position: absolute; inset: 0; pointer-events: none; }.dfx-ms .flow-token{ position: absolute; top: 50%; width: 9px; height: 9px; margin-top: -4.6px; border-radius: 50%; background: radial-gradient(circle at 40% 40%, #ffffff, #d4f7e4 55%, var(--brand) 100%); box-shadow: 0 0 8px 2px rgba(255,255,255,0.9), 0 0 16px 4px rgba(40,166,107,0.7); }.dfx-ms .flow-token.ft1{ }.dfx-ms .flow-token.ft2{ }.dfx-ms .flow-token.ft3{ background: radial-gradient(circle at 40% 40%, #ffffff, #fde9c0 55%, var(--c-gold) 100%); box-shadow: 0 0 8px 2px rgba(255,255,255,0.9), 0 0 16px 4px rgba(225,163,37,0.7); }.dfx-ms .seam-hub{ position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 6px; background: transparent; padding: 16px 6px; }.dfx-ms .hub-ring{ position: absolute; top: 4px; width: 56px; height: 56px; border-radius: 50%; background: radial-gradient(circle, rgba(110,231,183,0.35) 0%, transparent 70%); }.dfx-ms .hub-core{ position: relative; width: 56px; height: 56px; display: grid; place-items: center; margin-bottom: 12px; }.dfx-ms .hub-core::before{ content: ""; position: absolute; left: 50%; top: 50%; width: 76px; height: 76px; transform: translate(-50%, -50%); border-radius: 50%; z-index: -1; background: radial-gradient(circle, var(--s-bg) 0%, var(--s-bg) 46%, transparent 72%); }.dfx-ms .hub-emblem{ display: block; object-fit: contain; transform-origin: center; }.dfx-ms .hub-label{ font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: -0.1px; color: var(--s-ink); }.dfx-ms .hub-sub{ font-family: 'Sora', sans-serif; font-size: 8.5px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--s-muted); }.dfx-ms .hub-amt{ font-size: 11px; font-weight: 800; color: var(--brand); font-variant-numeric: tabular-nums; letter-spacing: -0.2px; }.dfx-ms #audience:hover .flow-token, .dfx-ms #audience:hover .seam-line::before, .dfx-ms #audience:hover .hub-ring, .dfx-ms #audience:hover .hub-emblem{ }@media (prefers-reduced-motion: reduce){.dfx-ms .flow-token, .dfx-ms .seam-line::before{ opacity: 0; }.dfx-ms .hub-ring, .dfx-ms .hub-emblem{ }.dfx-ms .mirror-borrower .msurface, .dfx-ms .mirror-lender .msurface{ }}@media (max-width: 860px){.dfx-ms .mirror{ grid-template-columns: 1fr; gap: 16px; }.dfx-ms .mirror-borrower, .dfx-ms .mirror-lender{ padding: 0; }.dfx-ms .mirror-lender .mirror-head{ flex-direction: row; }.dfx-ms .mirror-lender .mirror-blurb{ text-align: left; }.dfx-ms .mirror-seam{ width: auto; height: 96px; }.dfx-ms .seam-line{ top: 50%; bottom: auto; left: 8%; right: 8%; width: auto; height: 2px; transform: translateY(-50%); background: linear-gradient(90deg, transparent, rgba(40,166,107,0.5) 22%, rgba(225,163,37,0.5) 78%, transparent); }}.dfx-ms .app-band{ background: radial-gradient(ellipse 80vw 60vh at 25% 15%, rgba(40,166,107,0.10) 0%, transparent 55%), radial-gradient(ellipse 70vw 50vh at 80% 80%, rgba(90,91,235,0.08) 0%, transparent 55%), radial-gradient(ellipse 60vw 40vh at 50% 100%, rgba(94,228,205,0.06) 0%, transparent 50%), linear-gradient(180deg, #050614 0%, #06051a 100%); color: #fff; position: relative; overflow: hidden; }.dfx-ms .app-band::before{ content: ""; position: absolute; inset: -20% -10%; pointer-events: none; background: linear-gradient(108deg, transparent 35%, rgba(110,231,183,0.05) 50%, rgba(110,231,183,0.08) 52%, rgba(110,231,183,0.05) 54%, transparent 65%), radial-gradient(ellipse at 15% 18%, rgba(40,166,107,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 82%, rgba(90,91,235,0.10) 0%, transparent 52%); mix-blend-mode: screen; will-change: transform, opacity; }.dfx-ms .app-spot{ position: absolute; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(circle 38vw at 50% 42%, rgba(110,231,183,0.10) 0%, rgba(90,91,235,0.06) 40%, transparent 70%); mix-blend-mode: screen; will-change: transform; }@media (prefers-reduced-motion: reduce){.dfx-ms .app-band::before{ }.dfx-ms .app-spot{ }}.dfx-ms .app-band::after{ content: ""; position: absolute; inset: 0; pointer-events: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='nse'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23nse)'/></svg>"); opacity: 0.5; mix-blend-mode: overlay; }.dfx-ms .app-band .intro-head h2{ color: #fff; }.dfx-ms .app-band .intro-head .sub{ color: rgba(244,242,250,0.86); }.dfx-ms .app-band .eyebrow.on-dark{ color: var(--t-grn); }.dfx-ms .app-canvas{ border-radius: 20px; background: rgba(17, 9, 38, 0.72); border: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); overflow: hidden; box-shadow: inset 0 1px 0 rgba(255,255,255,0.11), 0 30px 70px -20px rgba(0,0,0,0.65), 0 0 130px -22px rgba(40,166,107,0.45), 0 0 70px -34px rgba(90,91,235,0.32); }.dfx-ms .app-chrome-bar{ display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(7,1,24,0.5); }.dfx-ms .app-chrome-bar .dots{ display: flex; gap: 6px; }.dfx-ms .app-chrome-bar .dots span{ width: 9px; height: 9px; border-radius: 50%; background: rgba(255,255,255,0.16); }.dfx-ms .app-chrome-bar .crumb{ font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; color: rgba(255,255,255,0.55); display: flex; align-items: center; gap: 8px; }.dfx-ms .app-chrome-bar .crumb b{ color: #fff; font-weight: 700; }.dfx-ms .app-chrome-stamp{ margin-left: auto; font-family: 'Sora', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.06em; color: rgba(255,255,255,0.4); font-variant-numeric: tabular-nums; }.dfx-ms .app-chrome-bar .crumb .live{ margin-left: 6px; display: inline-flex; align-items: center; gap: 6px; font-size: 10px; letter-spacing: 0.10em; color: #82E2B6; text-transform: uppercase; }.dfx-ms .app-chrome-bar .crumb .live::before{ content: ""; width: 6px; height: 6px; border-radius: 50%; background: #26A66B; box-shadow: 0 0 8px #26A66B; }.dfx-ms .app-body{ padding: 24px 24px 28px; display: flex; flex-direction: column; gap: 24px; }.dfx-ms .app-kpis{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }.dfx-ms .app-kpi{ background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 16px 20px; position: relative; transition: border-color 0.25s ease, background 0.25s ease; }.dfx-ms .app-kpi::before{ content: ""; position: absolute; top: 0; left: 16px; right: 16px; height: 2px; background: var(--brand); border-radius: 0 0 2px 2px; opacity: 0.95; box-shadow: 0 0 10px rgba(40,166,107,0.7); }.dfx-ms .app-kpi:nth-child(2)::before{ background: var(--c-violet); box-shadow: 0 0 10px rgba(90,91,235,0.7); }.dfx-ms .app-kpi:nth-child(3)::before{ background: var(--c-gold); box-shadow: 0 0 10px rgba(225,163,37,0.7); }.dfx-ms .app-kpi:hover{ border-color: rgba(40,166,107,0.32); background: rgba(255,255,255,0.045); }.dfx-ms .app-kpi .label{ font-size: 10px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 12px; }.dfx-ms .app-kpi .value{ font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 400; letter-spacing: -0.8px; color: #fff; font-variant-numeric: tabular-nums; display: flex; align-items: baseline; gap: 12px; }.dfx-ms .app-kpi:first-child .value{ text-shadow: 0 0 20px rgba(40,166,107,0.5); }.dfx-ms .app-kpi .delta{ font-size: 11px; font-weight: 600; padding: 4px 8px; border-radius: 100px; background: rgba(110,231,183,0.12); color: #82E2B6; }.dfx-ms .app-kpi:first-child .delta{ background: rgba(110,231,183,0.2); color: #8af0c4; box-shadow: 0 0 16px -3px rgba(40,166,107,0.6); }.dfx-ms .app-kpi .delta.neutral{ background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.62); }.dfx-ms .app-kpi .sub{ font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 6px; }.dfx-ms .app-section-label{ display: flex; align-items: center; gap: 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: rgba(255,255,255,0.55); }.dfx-ms .app-section-label::before{ content: ""; width: 3px; height: 14px; border-radius: 4px; background: var(--brand); }.dfx-ms .app-drawdown{ background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 20px 20px; }.dfx-ms .app-drawdown .row{ display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }.dfx-ms .app-drawdown .lhs .lbl{ font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.55); display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }.dfx-ms .app-drawdown .lhs .lbl::before{ content: ""; width: 3px; height: 14px; border-radius: 4px; background: var(--brand); }.dfx-ms .app-drawdown .lhs .big{ font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }.dfx-ms .app-drawdown .rhs{ text-align: right; }.dfx-ms .app-drawdown .rhs .sm{ font-size: 10px; color: rgba(255,255,255,0.55); margin-bottom: 4px; }.dfx-ms .app-drawdown .rhs .pct{ font-size: 12px; font-weight: 700; color: var(--brand); }.dfx-ms .app-drawdown .bar{ height: 8px; background: rgba(40,166,107,0.14); border-radius: 100px; overflow: hidden; box-shadow: inset 0 0 8px rgba(0,0,0,0.35); }.dfx-ms .app-drawdown .bar .fill{ height: 100%; width: 71%; background: linear-gradient(90deg, var(--brand), #82E2B6); border-radius: 100px; box-shadow: 0 0 16px -2px rgba(40,166,107,0.7); position: relative; overflow: hidden; }.dfx-ms .app-drawdown .bar .fill::after{ content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); transform: translateX(-100%); }.dfx-ms .app-drawdown .foot{ display: flex; justify-content: space-between; margin-top: 6px; font-size: 10px; color: rgba(255,255,255,0.5); font-variant-numeric: tabular-nums; }.dfx-ms .app-facilities{ display: flex; flex-direction: column; gap: 8px; }.dfx-ms .app-fac{ display: grid; grid-template-columns: 1fr 90px 56px 104px; gap: 20px; align-items: center; padding: 16px 16px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; transition: border-color 0.2s, background 0.2s; }.dfx-ms .app-fac:hover{ border-color: rgba(40,166,107,0.32); background: rgba(255,255,255,0.04); }.dfx-ms .app-fac .name{ font-size: 13px; font-weight: 700; color: #fff; }.dfx-ms .app-fac .meta{ font-size: 11px; color: rgba(255,255,255,0.55); font-variant-numeric: tabular-nums; display: flex; gap: 12px; }.dfx-ms .app-fac .meta span:not(:last-child)::after{ content: "·"; margin-left: 12px; color: rgba(255,255,255,0.25); }.dfx-ms .app-fac .fill-mini{ width: 90px; }.dfx-ms .app-fac .fill-mini .bar{ height: 4px; background: rgba(255,255,255,0.08); border-radius: 100px; overflow: hidden; }.dfx-ms .app-fac .fill-mini .bar .v{ height: 100%; background: var(--brand); border-radius: 100px; }.dfx-ms .app-fac .fill-mini .lbl{ font-size: 10px; color: rgba(255,255,255,0.55); margin-top: 4px; font-variant-numeric: tabular-nums; }.dfx-ms .app-fac .apy{ font-size: 13px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }.app-fac .apy{ text-align: right; }.app-fac .status{ justify-self: start; white-space: nowrap; }.app-fac .fill-mini{ width: 100%; }.dfx-ms .app-fac .status{ font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 6px 12px; border-radius: 100px; }.dfx-ms .app-fac .status.active{ background: rgba(40,166,107,0.18); color: #8af0c4; box-shadow: 0 0 12px -3px rgba(40,166,107,0.6); }.dfx-ms .app-fac .status.funded{ background: rgba(90,91,235,0.16); color: #8182EF; }.dfx-ms .app-fac .status.pending{ background: rgba(225,163,37,0.16); color: #E0A225; }.dfx-ms .app-fac .status.draft{ background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); }.dfx-ms .app-actions{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }.dfx-ms .app-action{ position: relative; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 16px 16px 16px; display: flex; flex-direction: column; gap: 12px; cursor: pointer; transition: transform 0.22s cubic-bezier(0.22,1,0.36,1), border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease; }.dfx-ms .app-action::after{ content: ""; position: absolute; top: 14px; right: 14px; width: 14px; height: 14px; background: currentColor; color: rgba(255,255,255,0.28); -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><line x1='7' y1='17' x2='17' y2='7'/><polyline points='7 7 17 7 17 17'/></svg>") center/contain no-repeat; mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><line x1='7' y1='17' x2='17' y2='7'/><polyline points='7 7 17 7 17 17'/></svg>") center/contain no-repeat; opacity: 0; transform: translate(-3px, 3px); transition: opacity 0.22s ease, transform 0.22s ease, color 0.22s ease; }.dfx-ms .app-action:hover{ transform: translateY(-3px); border-color: rgba(40,166,107,0.45); background: rgba(40,166,107,0.07); box-shadow: 0 16px 34px -16px rgba(40,166,107,0.55), inset 0 1px 0 rgba(255,255,255,0.06); }.dfx-ms .app-action:hover::after{ opacity: 1; transform: translate(0, 0); color: var(--brand); }.dfx-ms .app-action:active{ transform: translateY(-1px); }.dfx-ms .app-action.is-primary{ background: rgba(40,166,107,0.10); border-color: rgba(40,166,107,0.40); box-shadow: 0 0 26px -10px rgba(40,166,107,0.55); }.dfx-ms .app-action.is-primary::after{ opacity: 0.6; color: var(--brand); }.dfx-ms .app-action.is-primary:hover{ box-shadow: 0 18px 38px -16px rgba(40,166,107,0.7); }.dfx-ms .app-action svg{ width: 22px; height: 22px; stroke: rgba(255,255,255,0.55); stroke-width: 1.75; fill: none; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.22s ease, transform 0.22s ease, filter 0.22s ease; }.dfx-ms .app-action:hover svg{ stroke: var(--brand); transform: scale(1.08); filter: drop-shadow(0 0 6px rgba(40,166,107,0.55)); }.dfx-ms .app-action.is-primary svg{ stroke: var(--brand); filter: drop-shadow(0 0 5px rgba(40,166,107,0.6)); }.dfx-ms .app-action .label{ font-size: 12.5px; font-weight: 600; color: #fff; letter-spacing: -0.2px; }.dfx-ms .app-action .desc{ font-size: 10.5px; color: rgba(255,255,255,0.55); line-height: 1.5; }.dfx-ms .action-nudge{ display: flex; align-items: center; gap: 12px; margin-top: 16px; padding: 12px 16px; background: linear-gradient(135deg, rgba(90,91,235,0.14), rgba(40,166,107,0.10)); border: 1px solid rgba(129,130,239,0.34); border-radius: 12px; box-shadow: 0 10px 30px -14px rgba(90,91,235,0.6); }.dfx-ms .action-nudge-globe{ position: relative; width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; overflow: hidden; background: radial-gradient(circle at 50% 50%, #1a0d4d 0%, #0a0226 70%); box-shadow: 0 0 12px rgba(90,91,235,0.6); }.dfx-ms .action-nudge-globe .atm{ position: absolute; left: -20%; top: -20%; width: 140%; height: 140%; filter: blur(1px); }.dfx-ms .action-nudge-globe .atm-v{ background: radial-gradient(circle at 32% 36%, rgba(90,91,235,1) 0%, transparent 42%); }.dfx-ms .action-nudge-globe .atm-g{ background: radial-gradient(circle at 70% 68%, rgba(40,166,107,1) 0%, transparent 40%); }.dfx-ms .action-nudge-text{ flex: 1; font-family: 'Sora', sans-serif; font-size: 12.5px; font-weight: 500; color: #fff; line-height: 1.45; }.dfx-ms .action-nudge-btn{ flex-shrink: 0; padding: 8px 16px; border-radius: 100px; background: linear-gradient(135deg, #26A66B, #178052); color: #fff; font-family: 'Sora', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 6px 18px -6px rgba(40,166,107,0.7); white-space: nowrap; transition: transform 0.18s ease, box-shadow 0.18s ease; }.dfx-ms .action-nudge-btn:hover{ transform: translateY(-1px); box-shadow: 0 10px 24px -6px rgba(40,166,107,0.85); }@media (max-width: 560px){.dfx-ms .action-nudge{ flex-direction: column; align-items: flex-start; text-align: left; }}@media (prefers-reduced-motion: reduce){.dfx-ms .action-nudge{ }}@media (max-width: 880px){.dfx-ms .app-kpis{ grid-template-columns: 1fr; }.dfx-ms .app-actions{ grid-template-columns: repeat(2, 1fr); }.dfx-ms .app-fac{ grid-template-columns: 1fr auto auto; gap: 14px; }.dfx-ms .app-fac .apy{ display: block; text-align: right; }.dfx-ms .app-fac .fill-mini{ display: none; }.dfx-ms .app-body{ padding: 20px 16px 24px; }}@media (prefers-reduced-motion: reduce){.dfx-ms .app-drawdown .bar .fill::after{ display: none; }}@media (max-width: 960px){.dfx-ms .bento{ grid-template-columns: repeat(2, 1fr); }.dfx-ms .bento-card.hero-tile{ grid-row: span 1; }.dfx-ms .bento-card.wide{ grid-column: span 2; }.dfx-ms .steps-grid{ grid-template-columns: 1fr; }}@media (max-width: 560px){.dfx-ms .bento{ grid-template-columns: 1fr; }.dfx-ms .bento-card.wide{ grid-column: span 1; }}.dfx-site:not(.dfx-night) .dfx-ms{ --mesh-base: #F8F9FB; --mesh-a: rgba(40,166,107,0.18); --mesh-b: rgba(90,91,235,0.10); --mesh-c: rgba(40,166,107,0.07); --stream-base: #F4F6F8; --app-base: #ffffff; --on-dark: #1a1532; --on-dark-mut: rgba(26,21,50,0.65); --on-dark-lo: rgba(26,21,50,0.42); --rule: rgba(26,21,50,0.10); --s-bg: var(--s-bg-day); --s-surface: var(--s-surface-day); --s-card: var(--s-card-day); --s-card-2: var(--s-card2-day); --s-border: var(--s-border-day); --s-ink: var(--s-ink-day); --s-muted: var(--s-muted-day); --s-lo: var(--s-lo-day); }.dfx-site:not(.dfx-night) .dfx-ms .grad-irid{ background-image: linear-gradient(95deg, #137a4a 0%, #1f9d63 26%, #0B7FAB 50%, #4078b0 72%, #1f9d63 86%, #137a4a 100%); filter: drop-shadow(0 1px 1px rgba(7,1,24,0.18)); }.dfx-site:not(.dfx-night) .dfx-ms .action-nudge{ background: linear-gradient(135deg, rgba(90,91,235,0.10), rgba(40,166,107,0.07)), #FFFFFF; border-color: rgba(129,130,239,0.30); box-shadow: 0 10px 26px -16px rgba(90,91,235,0.4); }.dfx-site:not(.dfx-night) .dfx-ms .action-nudge-text{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .eyebrow{ color: rgba(7,1,24,0.62); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-band{ background: radial-gradient(ellipse 90vw 70vh at 50% 0%, rgba(90,91,235,0.10) 0%, transparent 55%), radial-gradient(ellipse 100vw 80vh at 50% 100%, rgba(40,166,107,0.06) 0%, transparent 55%), #F8F9FB; color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .flagship-card{ background: radial-gradient(ellipse at 80% 0%, rgba(90,91,235,0.08) 0%, transparent 55%), #ffffff; border: 1px solid rgba(90,91,235,0.22); box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 32px 72px -30px rgba(90,91,235,0.28), 0 14px 36px -18px rgba(7,1,24,0.12); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-tag{ color: var(--brand-deep); background: rgba(40,166,107,0.10); border-color: rgba(40,166,107,0.28); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-tag-dot, .dfx-site:not(.dfx-night) .dfx-ms .flagship-rail-dot{ background: var(--brand); box-shadow: 0 0 8px rgba(40,166,107,0.5); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-h{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .flagship-sub{ color: rgba(7,1,24,0.70); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-product .ph-glyph, .dfx-site:not(.dfx-night) .dfx-ms .flagship-product .ph-label{ color: #9a6a12; }.dfx-site:not(.dfx-night) .dfx-ms .flagship-product .ph-caption{ color: rgba(154,106,18,0.70); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-stats{ border-top-color: rgba(225,163,37,0.32); border-bottom-color: rgba(225,163,37,0.32); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-stats::before{ opacity: 0.5; }.dfx-site:not(.dfx-night) .dfx-ms .fs-stat{ border-left-color: rgba(225,163,37,0.20); }.dfx-site:not(.dfx-night) .dfx-ms .fs-stat-eyebrow{ color: #9a6a12; }.dfx-site:not(.dfx-night) .dfx-ms .fs-stat-v{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .fs-stat:nth-child(3) .fs-stat-v{ color: var(--brand-deep); }.dfx-site:not(.dfx-night) .dfx-ms .fs-stat-dot{ background: var(--brand-deep); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-quote p{ color: rgba(7,1,24,0.82); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-cite-name{ color: var(--brand-deep); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-cite-meta{ color: rgba(7,1,24,0.55); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-rail{ border-top-color: rgba(225,163,37,0.22); }.dfx-site:not(.dfx-night) .dfx-ms .flagship-rail-status{ color: var(--brand-deep); }.dfx-site:not(.dfx-night) .dfx-ms .app-band{ background: #ffffff; color: #1a1532; border-top: 1px solid rgba(7,1,24,0.06); border-bottom: 1px solid rgba(7,1,24,0.06); }.dfx-site:not(.dfx-night) .dfx-ms .app-band::before{ background: radial-gradient(ellipse at 15% 18%, rgba(40,166,107,0.08) 0%, transparent 50%), radial-gradient(ellipse at 85% 82%, rgba(90,91,235,0.06) 0%, transparent 52%); }.dfx-site:not(.dfx-night) .dfx-ms .app-band .intro-head h2{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .app-band .intro-head .sub{ color: rgba(7,1,24,0.62); }.dfx-site:not(.dfx-night) .dfx-ms .app-band .eyebrow.on-dark{ color: var(--brand-deep); }.dfx-site:not(.dfx-night) .dfx-ms .app-canvas{ background: #fafaf6; border-color: rgba(7,1,24,0.10); box-shadow: 0 20px 50px -16px rgba(7,1,24,0.18), 0 0 60px -20px rgba(40,166,107,0.20); }.dfx-site:not(.dfx-night) .dfx-ms .app-chrome-bar{ background: rgba(255,255,255,0.7); border-bottom-color: rgba(7,1,24,0.08); }.dfx-site:not(.dfx-night) .dfx-ms .app-chrome-bar .crumb{ color: rgba(7,1,24,0.62); }.dfx-site:not(.dfx-night) .dfx-ms .app-chrome-bar .crumb b{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .app-chrome-bar .dots span{ background: rgba(7,1,24,0.20); }.dfx-site:not(.dfx-night) .dfx-ms .app-kpi{ background: rgba(255,255,255,0.7); border-color: rgba(7,1,24,0.08); }.dfx-site:not(.dfx-night) .dfx-ms .app-kpi:hover{ background: rgba(255,255,255,1); border-color: rgba(40,166,107,0.30); }.dfx-site:not(.dfx-night) .dfx-ms .app-kpi .label{ color: rgba(7,1,24,0.60); }.dfx-site:not(.dfx-night) .dfx-ms .app-kpi .value{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .app-kpi .sub{ color: rgba(7,1,24,0.55); }.dfx-site:not(.dfx-night) .dfx-ms .app-section-label{ color: rgba(7,1,24,0.65); }.dfx-site:not(.dfx-night) .dfx-ms .app-drawdown{ background: rgba(255,255,255,0.7); border-color: rgba(7,1,24,0.08); }.dfx-site:not(.dfx-night) .dfx-ms .app-drawdown .lhs .lbl, .dfx-site:not(.dfx-night) .dfx-ms .app-drawdown .rhs .sm{ color: rgba(7,1,24,0.65); }.dfx-site:not(.dfx-night) .dfx-ms .app-drawdown .lhs .big{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .app-drawdown .foot{ color: rgba(7,1,24,0.55); }.dfx-site:not(.dfx-night) .dfx-ms .app-fac{ background: rgba(255,255,255,0.7); border-color: rgba(7,1,24,0.08); }.dfx-site:not(.dfx-night) .dfx-ms .app-fac:hover{ background: rgba(255,255,255,1); border-color: rgba(40,166,107,0.30); }.dfx-site:not(.dfx-night) .dfx-ms .app-fac .name{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .app-fac .meta{ color: rgba(7,1,24,0.60); }.dfx-site:not(.dfx-night) .dfx-ms .app-fac .apy{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .app-fac .fill-mini .bar{ background: rgba(7,1,24,0.08); }.dfx-site:not(.dfx-night) .dfx-ms .app-fac .fill-mini .lbl{ color: rgba(7,1,24,0.55); }.dfx-site:not(.dfx-night) .dfx-ms .app-action{ background: rgba(255,255,255,0.7); border-color: rgba(7,1,24,0.08); }.dfx-site:not(.dfx-night) .dfx-ms .app-action:hover{ background: rgba(40,166,107,0.06); border-color: rgba(40,166,107,0.30); }.dfx-site:not(.dfx-night) .dfx-ms .app-action.is-primary{ background: rgba(40,166,107,0.06); border-color: rgba(40,166,107,0.30); }.dfx-site:not(.dfx-night) .dfx-ms .app-action svg{ stroke: rgba(7,1,24,0.62); }.dfx-site:not(.dfx-night) .dfx-ms .app-action.is-primary svg{ stroke: var(--brand); }.dfx-site:not(.dfx-night) .dfx-ms .app-action .label{ color: #1a1532; }.dfx-site:not(.dfx-night) .dfx-ms .app-action .desc{ color: rgba(7,1,24,0.55); }.dfx-ms .grad-crim{background:linear-gradient(90deg,#26A66B,#82E2B6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}.dfx-brand-violet .dfx-ms{display:contents;color:var(--s-ink);--c-violet: #5A5BEB; --c-violet-l:#8182EF; --c-green: #5A5BEB; --c-gold: #E0A225; --c-crimson: #D21A4D; --c-teal: #0B7FAB; --c-navy: #070118; --t-red: #f87171; --t-grn: #8182EF; --t-vio: #8182EF; --t-gld: #E0A225; --t-teal: #5fbcd8; --brand: var(--c-green); --brand-tint: var(--t-grn); --brand-deep: #3B3CCF; --brand-deeper: #2c2da0; --s-bg-night: #05040f; --s-surface-night: #08081e; --s-card-night: #111033; --s-card2-night: #0b0a26; --s-border-night: rgba(255,255,255,0.10); --s-ink-night: #f5f6ff; --s-muted-night: rgba(245,246,255,0.60); --s-lo-night: rgba(245,246,255,0.40); --s-bg-day: #F5F6F8; --s-surface-day: #FFFFFF; --s-card-day: #FFFFFF; --s-card2-day: #FAFAFB; --s-border-day: #E6E9F0; --s-ink-day: #111827; --s-muted-day: #6B7280; --s-lo-day: #9CA3AF; --s-bg: var(--s-bg-night); --s-surface: var(--s-surface-night); --s-card: var(--s-card-night); --s-card-2: var(--s-card2-night); --s-border: var(--s-border-night); --s-ink: var(--s-ink-night); --s-muted: var(--s-muted-night); --s-lo: var(--s-lo-night); --brand-08: rgba(90,91,235,0.08); --brand-14: rgba(90,91,235,0.14); --brand-22: rgba(90,91,235,0.22); --brand-30: rgba(90,91,235,0.30); --brand-55: rgba(90,91,235,0.55); --crim-08: var(--brand-08); --crim-14: var(--brand-14); --crim-22: var(--brand-22); --crim-30: var(--brand-30); --crim-55: var(--brand-55); --night-mesh-base: #050614; --night-mesh-a: rgba(129,130,239,0.16); --night-mesh-b: rgba(90,91,235,0.18); --night-mesh-c: rgba(94,228,205,0.10); --night-stream-base: #06051a; --night-app-base: #07061f; --night-on-dark: #ffffff; --night-on-dark-mut: rgba(255,255,255,0.62); --night-on-dark-lo: rgba(255,255,255,0.45); --night-rule: rgba(255,255,255,0.10); --mesh-base: var(--night-mesh-base); --mesh-a: var(--night-mesh-a); --mesh-b: var(--night-mesh-b); --mesh-c: var(--night-mesh-c); --stream-base: var(--night-stream-base); --app-base: var(--night-app-base); --on-dark: var(--night-on-dark); --on-dark-mut: var(--night-on-dark-mut); --on-dark-lo: var(--night-on-dark-lo); --rule: var(--night-rule);}.dfx-brand-violet .dfx-ms .section-light + .section-grey::before, .dfx-brand-violet .dfx-ms .section-grey + .section-light::before{ content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(90,91,235,0.16) 30%, rgba(90,91,235,0.20) 50%, rgba(90,91,235,0.16) 70%, transparent 100%); pointer-events: none; }.dfx-brand-violet .dfx-ms .section-light, .dfx-brand-violet .dfx-ms .section-grey{ background-image: linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(90,91,235,0.012) 50%, rgba(90,91,235,0.012) 100%); }.dfx-brand-violet .dfx-ms .grad-crim{ background: linear-gradient(135deg, var(--brand) 0%, #8182EF 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }.dfx-brand-violet .dfx-ms .grad-irid{ background-image: linear-gradient(95deg, #5A5BEB 0%, #8182EF 28%, #a5b4fc 48%, #9596f3 68%, #8182EF 84%, #5A5BEB 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; filter: drop-shadow(0 0 7px rgba(90,91,235,0.26)) drop-shadow(0 0 3px rgba(129,130,239,0.20)); }.dfx-brand-violet .dfx-ms .chord-stripe{ position: absolute; bottom: 0; left: 0; right: 0; height: 2px; z-index: 4; background: linear-gradient(90deg, var(--c-violet) 0%, var(--c-green) 38%, var(--c-gold) 68%, var(--brand) 100%); box-shadow: 0 0 14px -1px rgba(129,130,239,0.40); }.dfx-brand-violet .dfx-ms .and-core{ position: absolute; top: -15%; right: -12%; width: 720px; height: 720px; border-radius: 50%; background: radial-gradient(circle at center, rgba(255, 255, 255, 0.28) 0%, rgba(224,225,251, 0.20) 14%, rgba(129,130,239, 0.12) 32%, rgba(90,91,235, 0.05) 52%, rgba(90,91,235, 0.00) 72%, transparent 84% ); filter: blur(6px); will-change: transform, opacity; }.dfx-brand-violet .dfx-ms .and-neb-1{ width: 700px; height: 540px; top: -8%; left: 45%; background: radial-gradient(circle, rgba(129,130,239,0.22) 0%, rgba(90,91,235,0.06) 40%, transparent 75%); }.dfx-brand-violet .dfx-ms .and-neb-3{ width: 260px; height: 220px; top: 18%; left: 64%; background: radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(224,225,251,0.06) 40%, transparent 75%); }.dfx-brand-violet .dfx-ms .deffo-globe .atm-g{ background: radial-gradient(circle at 50% 50%, rgba(90,91,235,1) 0%, rgba(90,91,235,0.3) 16%, transparent 36%); }.dfx-brand-violet .dfx-ms .deffo-globe .dot-2{ left: 72%; top: 25%; background: #5A5BEB; box-shadow: 0 0 0.25em #5A5BEB, 0 0 0.56em #5A5BEB; }.dfx-brand-violet .dfx-ms .btn-primary{ background: linear-gradient(135deg, #5A5BEB 0%, #3B3CCF 100%); color: #fff; box-shadow: 0 8px 24px -8px rgba(90,91,235,0.55), inset 0 1px 0 rgba(255,255,255,0.18); border: none; }.dfx-brand-violet .dfx-ms .btn-primary:hover{ transform: translateY(-1px); box-shadow: 0 12px 30px -8px rgba(90,91,235,0.7), inset 0 1px 0 rgba(255,255,255,0.22); }.dfx-brand-violet .dfx-ms .hero-lockup-name .brand-raise{ color: var(--t-grn); text-shadow: 0 0 8px rgba(129,130,239,0.55), 0 0 0.56em rgba(90,91,235,0.4); }.dfx-brand-violet .dfx-ms .hero-meta{ position: relative; display: flex; flex-direction: column; gap: 0; margin-top: 64px; padding: 20px 28px 24px; background: radial-gradient(ellipse at 20% 0%, rgba(90,91,235,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(90,91,235,0.04) 0%, transparent 55%), rgba(7, 4, 26, 0.55); border-radius: 14px; box-shadow: 0 0 0 1px rgba(129,130,239,0.16), 0 24px 56px -24px rgba(90,91,235,0.30), 0 8px 24px -12px rgba(0,0,0,0.50); overflow: hidden; }.dfx-brand-violet .dfx-ms .hero-meta-head{ display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid rgba(129,130,239,0.12); margin-bottom: 20px; position: relative; }.dfx-brand-violet .dfx-ms .hero-meta-head::after{ content: ""; position: absolute; bottom: -1px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(129,130,239,0.50) 16%, rgba(129,130,239,0.12) 32%, transparent 45%, rgba(129,130,239,0.50) 62%, rgba(129,130,239,0.18) 80%, transparent 100%); }.dfx-brand-violet .dfx-ms .hero-meta-live{ display: inline-flex; align-items: center; gap: 8px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(129,130,239,0.95); }.dfx-brand-violet .dfx-ms .hero-meta-live::before{ content: ""; width: 6px; height: 6px; border-radius: 50%; background: #8182EF; box-shadow: 0 0 10px #8182EF, 0 0 18px rgba(129,130,239,0.45); }.dfx-brand-violet .dfx-ms .hero-meta-stamp::before{ content: "◇"; font-size: 8px; color: rgba(129,130,239,0.50); }.dfx-brand-violet .dfx-ms .hero-meta .item{ display: flex; flex-direction: column; gap: 12px; padding: 4px 24px; position: relative; border-left: 1px solid rgba(129,130,239,0.12); }.dfx-brand-violet .dfx-ms .hero-meta .item .v{ font-size: clamp(28px, 4vw, 40px); font-weight: 300; letter-spacing: -1.6px; color: #F0EEF8; line-height: 1; font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; text-shadow: 0 0 24px rgba(129,130,239,0.18); }.dfx-brand-violet .dfx-ms .hero-meta .item.item-green .v{ color: #8182EF; }.dfx-brand-violet .dfx-ms .hero-meta .item.item-green .k{ color: #8182EF; }.dfx-brand-violet .dfx-ms .hero-meta .item.item-green .k-dot{ background: #8182EF; }.dfx-brand-violet .dfx-ms .stream-band{ background: radial-gradient(ellipse 70% 46% at 50% -12%, rgba(129,130,239,0.12) 0%, transparent 62%), radial-gradient(ellipse 60% 60% at 100% 100%, rgba(90,91,235,0.07) 0%, transparent 52%), radial-gradient(ellipse 60% 55% at 0% 90%, rgba(94,228,205,0.06) 0%, transparent 55%), #03030d; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 64px 0 72px; position: relative; overflow: hidden; }.dfx-brand-violet .dfx-ms .board-frame{ background: linear-gradient(180deg, #0c0b28 0%, #050414 100%); border: 1px solid rgba(129,130,239, 0.22); border-radius: 16px; overflow: hidden; box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 0 0 1px rgba(0,0,0,0.5) inset, 0 32px 80px -20px rgba(0,0,0,0.85), 0 0 70px -12px rgba(90,91,235,0.22); font-family: 'Sora', sans-serif; position: relative; }.dfx-brand-violet .dfx-ms .board-top{ display: grid; grid-template-columns: auto 1fr; gap: 24px; align-items: center; padding: 16px 24px; border-bottom: 1px solid rgba(129,130,239,0.16); background: linear-gradient(180deg, rgba(90,91,235,0.08) 0%, transparent 100%); position: relative; z-index: 2; }.dfx-brand-violet .dfx-ms .board-title-tag{ font-size: 10px; font-weight: 600; letter-spacing: 0.18em; color: rgba(129,130,239,0.78); padding: 4px 8px; border: 1px solid rgba(129,130,239,0.30); border-radius: 3px; background: rgba(90,91,235,0.06); }.dfx-brand-violet .dfx-ms .board-ticker{ position: relative; z-index: 2; background: linear-gradient(180deg, transparent 0%, rgba(90,91,235,0.06) 100%); border-top: 1px solid rgba(129,130,239,0.16); overflow: hidden; padding: 12px 0; }.dfx-brand-violet .dfx-ms .board-ticker-track{ display: inline-flex; gap: 20px; white-space: nowrap; font-size: 11px; font-weight: 600; letter-spacing: 0.10em; color: rgba(129,130,239,0.85); }.dfx-brand-violet .dfx-ms .board-ticker-sep{ color: rgba(129,130,239,0.40); }.dfx-brand-violet .dfx-ms .board-cta{ position: relative; isolation: isolate; overflow: hidden; margin-top: 28px; padding: 32px 36px; background: radial-gradient(ellipse 70% 130% at 8% 20%, rgba(90,91,235,0.30) 0%, transparent 55%), radial-gradient(ellipse 60% 120% at 95% 90%, rgba(90,91,235,0.26) 0%, transparent 55%), radial-gradient(ellipse 50% 100% at 60% 10%, rgba(94,228,205,0.16) 0%, transparent 50%), linear-gradient(135deg, #0c1a14 0%, #0a0a1f 60%, #100a22 100%); border: 1px solid rgba(129,130,239,0.30); border-radius: 16px; box-shadow: 0 24px 60px -28px rgba(90,91,235,0.5), inset 0 1px 0 rgba(255,255,255,0.06); display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; }.dfx-brand-violet .dfx-ms .board-cta::after{ content: ""; position: absolute; top: 0; left: -60%; width: 45%; height: 100%; z-index: 0; pointer-events: none; background: linear-gradient(105deg, transparent, rgba(255,255,255,0.10) 45%, rgba(224,225,251,0.18) 50%, transparent 75%); transform: skewX(-18deg); }.dfx-brand-violet .dfx-ms grid-template-columns: 1fr auto; gap: 24px; align-items: center; .board-cta::before{ content: ""; position: absolute; inset: -40%; z-index: -1; pointer-events: none; background: radial-gradient(ellipse 40% 50% at 50% 50%, rgba(129,130,239,0.16) 0%, transparent 60%); }.dfx-brand-violet .dfx-ms .board-cta-text strong{ color: #fff; font-size: 20px; font-weight: 700; letter-spacing: -0.4px; text-shadow: 0 2px 18px rgba(90,91,235,0.30); }.dfx-brand-violet .dfx-ms .step-deep-link{ display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; padding: 8px 16px; font-size: 11.5px; font-weight: 600; letter-spacing: 0.02em; color: var(--brand); text-decoration: none; background: rgba(90,91,235,0.08); border: 1px solid rgba(90,91,235,0.28); border-radius: 100px; transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }.dfx-brand-violet .dfx-ms .step-deep-link:hover{ background: rgba(90,91,235,0.14); border-color: rgba(90,91,235,0.45); transform: translateY(1px); }.dfx-brand-violet .dfx-ms .step-deep-pane::before{ content: ""; position: absolute; top: 0; left: 16px; right: 16px; height: 3px; border-radius: 0 0 3px 3px; background: linear-gradient(90deg, var(--c-green) 0%, rgba(90,91,235,0.4) 45%, transparent 100%); }.dfx-brand-violet .dfx-ms .step-deep-pane{ margin-top: 64px; padding: 44px 48px 40px; background: radial-gradient(ellipse at 15% 0%, rgba(90,91,235,0.07) 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(90,91,235,0.05) 0%, transparent 50%), var(--s-card-2); box-shadow: 0 0 0 1px rgba(90,91,235,0.10); border-radius: 20px; position: relative; scroll-margin-top: 80px; }.dfx-brand-violet .dfx-ms .pillar{ position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 36px 28px 32px; border: 0; border-radius: 20px; background: radial-gradient(ellipse at 20% 0%, rgba(90,91,235,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 110%, rgba(90,91,235,0.06) 0%, transparent 50%), var(--s-card); box-shadow: 0 0 0 1px rgba(90,91,235,0.10), 0 1px 2px rgba(7,1,24,0.04); transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, opacity 0.35s ease; cursor: default; }.dfx-brand-violet .dfx-ms .pillar:hover{ transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(90,91,235,0.35), 0 24px 48px -16px rgba(90,91,235,0.30); }.dfx-brand-violet .dfx-ms .pillar{ --glyph-glow: rgba(90,91,235,0.5); }.dfx-brand-violet .dfx-ms .pillar.pillar-featured{ background: radial-gradient(ellipse at 20% 0%, rgba(90,91,235,0.16) 0%, transparent 55%), radial-gradient(ellipse at 80% 110%, rgba(90,91,235,0.10) 0%, transparent 50%), var(--s-card); box-shadow: 0 0 0 2px var(--brand), 0 16px 40px -14px rgba(90,91,235,0.4); z-index: 2; }.dfx-brand-violet .dfx-ms .pillar.pillar-featured:hover{ box-shadow: 0 0 0 2px var(--brand), 0 24px 48px -16px rgba(90,91,235,0.55); }.dfx-brand-violet .dfx-ms .flagship-band{ position: relative; background: radial-gradient(ellipse 90vw 70vh at 50% 0%, rgba(129,130,239,0.18) 0%, transparent 55%), radial-gradient(ellipse 100vw 80vh at 50% 100%, rgba(90,91,235,0.07) 0%, transparent 55%), linear-gradient(180deg, #0c0a28 0%, #130b34 48%, #0a0722 100%); color: #fff; overflow: hidden; }.dfx-brand-violet .dfx-ms .fs-neb-1{ top: -8%; left: 8%; width: 460px; height: 420px; background: radial-gradient(circle, rgba(129,130,239,0.30) 0%, rgba(129,130,239,0.09) 35%, transparent 70%); }.dfx-brand-violet .dfx-ms .fs-neb-2{ bottom: -10%; right: -4%; width: 540px; height: 480px; background: radial-gradient(circle, rgba(90,91,235,0.20) 0%, rgba(90,91,235,0.06) 40%, transparent 70%); }.dfx-brand-violet .dfx-ms .flagship-card{ position: relative; overflow: hidden; padding: 44px 48px 36px; background: radial-gradient(ellipse at 80% 0%, rgba(129,130,239,0.13) 0%, transparent 55%), radial-gradient(ellipse at 20% 100%, rgba(90,91,235,0.06) 0%, transparent 50%), rgba(13, 10, 40, 0.82); border: 1px solid rgba(129,130,239,0.28); border-radius: 18px; box-shadow: 0 0 0 1px rgba(129,130,239,0.14) inset, 0 1px 0 rgba(196,181,253,0.22) inset, 0 32px 72px -28px rgba(90,91,235,0.48), 0 14px 36px -16px rgba(0, 0, 0, 0.70); }.dfx-brand-violet .dfx-ms .flagship-tag{ display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #8182EF; background: rgba(90,91,235,0.10); border: 1px solid rgba(90,91,235,0.30); border-radius: 100px; }.dfx-brand-violet .dfx-ms .flagship-tag-dot{ width: 6px; height: 6px; border-radius: 50%; background: #8182EF; box-shadow: 0 0 8px #8182EF; }.dfx-brand-violet .dfx-ms .fs-stat-dot{ width: 4px; height: 4px; border-radius: 50%; background: #8182EF; }.dfx-brand-violet .dfx-ms .fs-stat:nth-child(3) .fs-stat-v{ color: #8182EF; }.dfx-brand-violet .dfx-ms .flagship-cite-name{ font-size: 13px; font-weight: 700; color: #8182EF; letter-spacing: -0.1px; }.dfx-brand-violet .dfx-ms .flagship-rail-status{ display: inline-flex; align-items: center; gap: 8px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(129,130,239,0.85); }.dfx-brand-violet .dfx-ms .flagship-rail-dot{ width: 6px; height: 6px; border-radius: 50%; background: #8182EF; box-shadow: 0 0 8px #8182EF; }.dfx-brand-violet .dfx-ms .andro-arc{ stroke-dasharray: 3 7; filter: drop-shadow(0 0 5px rgba(165,180,252,0.9)) drop-shadow(0 0 10px rgba(129,130,239,0.55)); }.dfx-brand-violet .dfx-ms .andro-pulse{ filter: drop-shadow(0 0 6px #fff) drop-shadow(0 0 12px #8182EF) drop-shadow(0 0 18px rgba(129,130,239,0.7)); }.dfx-brand-violet .dfx-ms .andro-end-b{ color: #8182EF; }.dfx-brand-violet .dfx-ms .aud-flow-near{ filter: drop-shadow(0 0 6px rgba(129,130,239,0.55)); }.dfx-brand-violet .dfx-ms #audience:hover .aud-flow-near{ filter: drop-shadow(0 0 9px rgba(129,130,239,0.7)); }.dfx-brand-violet .dfx-ms .mirror-photo-borrower::before{ background: radial-gradient(ellipse 70% 80% at 30% 30%, rgba(129,130,239,0.30), transparent 60%), linear-gradient(135deg, #0e2a1f 0%, #14241d 50%, #0c1a14 100%); }.dfx-brand-violet .dfx-ms .axis-line{ position: absolute; left: 0; right: 0; top: 0; height: 4px; background: linear-gradient(90deg, rgba(90,91,235,0.55) 0%, rgba(90,91,235,0.40) 25%, rgba(90,91,235,0.55) 60%, rgba(225,163,37,0.55) 100%); border-radius: 2px; }.dfx-brand-violet .dfx-ms .axis-marker-us .axis-marker-dot{ width: 26px; height: 26px; background: var(--brand); border-color: #ffffff; box-shadow: 0 0 0 3px var(--brand), 0 0 0 6px rgba(90,91,235,0.20), 0 6px 16px rgba(90,91,235,0.40); margin-top: -4px; }.dfx-brand-violet .dfx-ms .axis-marker-nebula{ position: absolute; left: 50%; top: 50%; width: 60px; height: 60px; transform: translate(-50%, -50%); border-radius: 50%; z-index: 1; pointer-events: none; background: radial-gradient(circle, rgba(129,130,239,0.35) 0%, transparent 70%); }.dfx-brand-violet .dfx-ms .pc-card:hover{ border-color: rgba(90,91,235,0.30); }.dfx-brand-violet .dfx-ms .bento-card{ position: relative; border-radius: 16px; overflow: hidden; background: radial-gradient(ellipse 70% 60% at 100% 0%, rgba(90,91,235,0.07) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(90,91,235,0.04) 0%, transparent 50%), var(--s-card); box-shadow: 0 0 0 1px rgba(90,91,235,0.16); transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease; }.dfx-brand-violet .dfx-ms .bento-card:hover{ box-shadow: 0 0 0 1px rgba(90,91,235,0.34), 0 22px 44px -16px rgba(90,91,235,0.35); transform: translateY(-3px); }.dfx-brand-violet .dfx-ms .bento-card .accent-bar{ height: 4px; background: linear-gradient(90deg, var(--brand), rgba(90,91,235,0.4), transparent); }.dfx-brand-violet .dfx-ms .bento-card{ --cap-color: var(--c-green); --cap-glow: rgba(90,91,235,0.55); }.dfx-brand-violet .dfx-ms .mirror-tag.tag-green{ color: var(--brand); background: rgba(90,91,235,0.14); }.dfx-brand-violet .dfx-ms .mirror-borrower .msurface{ border-color: rgba(90,91,235,0.24); box-shadow: 0 20px 44px -24px rgba(90,91,235,0.45); }.dfx-brand-violet .dfx-ms .mirror-borrower:hover .msurface{ transform: translateY(-3px); box-shadow: 0 26px 52px -22px rgba(90,91,235,0.55); }.dfx-brand-violet .dfx-ms .mpill.pill-green{ background: rgba(90,91,235,0.16); color: var(--brand); }.dfx-brand-violet .dfx-ms .mbtn.mbtn-green{ background: var(--brand); box-shadow: 0 8px 18px -8px rgba(90,91,235,0.7); }.dfx-brand-violet .dfx-ms .seam-line{ position: absolute; top: 50%; left: 4%; right: 4%; height: 2px; transform: translateY(-50%); background: linear-gradient(90deg, transparent, rgba(90,91,235,0.5) 24%, rgba(225,163,37,0.5) 76%, transparent); overflow: visible; }.dfx-brand-violet .dfx-ms .seam-line::before{ content: ""; position: absolute; top: 50%; left: 0; right: 0; height: 2px; transform: translateY(-50%); background: linear-gradient(90deg, transparent 0%, rgba(129,130,239,0) 30%, #e0e1fb 48%, #fff 50%, #fde9c0 52%, rgba(253,233,192,0) 70%, transparent 100%); background-size: 220% 100%; filter: drop-shadow(0 0 6px rgba(255,255,255,0.8)) drop-shadow(0 0 12px rgba(129,130,239,0.6)); }.dfx-brand-violet .dfx-ms .flow-token{ position: absolute; top: 50%; width: 9px; height: 9px; margin-top: -4.6px; border-radius: 50%; background: radial-gradient(circle at 40% 40%, #ffffff, #e0e1fb 55%, var(--brand) 100%); box-shadow: 0 0 8px 2px rgba(255,255,255,0.9), 0 0 16px 4px rgba(90,91,235,0.7); }.dfx-brand-violet .dfx-ms .hub-ring{ position: absolute; top: 4px; width: 56px; height: 56px; border-radius: 50%; background: radial-gradient(circle, rgba(129,130,239,0.35) 0%, transparent 70%); }@media (max-width: 860px){.dfx-brand-violet .dfx-ms .seam-line{ top: 50%; bottom: auto; left: 8%; right: 8%; width: auto; height: 2px; transform: translateY(-50%); background: linear-gradient(90deg, transparent, rgba(90,91,235,0.5) 22%, rgba(225,163,37,0.5) 78%, transparent); }}.dfx-brand-violet .dfx-ms .audience-card.lenders .tag::before{ background-image: radial-gradient(circle, var(--c-green) 40%, transparent 41%); background-color: rgba(90,91,235,0.12); }.dfx-brand-violet .dfx-ms .proof-grid .proof:hover{ border-color: rgba(90,91,235,0.4); transform: translateY(-3px); box-shadow: 0 4px 16px rgba(0,0,0,0.08), 0 16px 32px -16px rgba(90,91,235,0.5); }.dfx-brand-violet .dfx-ms .app-band{ background: radial-gradient(ellipse 80vw 60vh at 25% 15%, rgba(90,91,235,0.10) 0%, transparent 55%), radial-gradient(ellipse 70vw 50vh at 80% 80%, rgba(90,91,235,0.08) 0%, transparent 55%), radial-gradient(ellipse 60vw 40vh at 50% 100%, rgba(94,228,205,0.06) 0%, transparent 50%), linear-gradient(180deg, #050614 0%, #06051a 100%); color: #fff; position: relative; overflow: hidden; }.dfx-brand-violet .dfx-ms .app-band::before{ content: ""; position: absolute; inset: -20% -10%; pointer-events: none; background: linear-gradient(108deg, transparent 35%, rgba(129,130,239,0.05) 50%, rgba(129,130,239,0.08) 52%, rgba(129,130,239,0.05) 54%, transparent 65%), radial-gradient(ellipse at 15% 18%, rgba(90,91,235,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 82%, rgba(90,91,235,0.10) 0%, transparent 52%); mix-blend-mode: screen; will-change: transform, opacity; }.dfx-brand-violet .dfx-ms .app-spot{ position: absolute; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(circle 38vw at 50% 42%, rgba(129,130,239,0.10) 0%, rgba(90,91,235,0.06) 40%, transparent 70%); mix-blend-mode: screen; will-change: transform; }.dfx-brand-violet .dfx-ms .app-canvas{ border-radius: 20px; background: rgba(17, 9, 38, 0.72); border: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); overflow: hidden; box-shadow: inset 0 1px 0 rgba(255,255,255,0.11), 0 30px 70px -20px rgba(0,0,0,0.65), 0 0 130px -22px rgba(90,91,235,0.45), 0 0 70px -34px rgba(90,91,235,0.32); }.dfx-brand-violet .dfx-ms .app-chrome-bar .crumb .live{ margin-left: 6px; display: inline-flex; align-items: center; gap: 6px; font-size: 10px; letter-spacing: 0.10em; color: #8182EF; text-transform: uppercase; }.dfx-brand-violet .dfx-ms .app-chrome-bar .crumb .live::before{ content: ""; width: 6px; height: 6px; border-radius: 50%; background: #5A5BEB; box-shadow: 0 0 8px #5A5BEB; }.dfx-brand-violet .dfx-ms .app-kpi::before{ content: ""; position: absolute; top: 0; left: 16px; right: 16px; height: 2px; background: var(--brand); border-radius: 0 0 2px 2px; opacity: 0.95; box-shadow: 0 0 10px rgba(90,91,235,0.7); }.dfx-brand-violet .dfx-ms .app-kpi:hover{ border-color: rgba(90,91,235,0.32); background: rgba(255,255,255,0.045); }.dfx-brand-violet .dfx-ms .app-kpi:first-child .value{ text-shadow: 0 0 20px rgba(90,91,235,0.5); }.dfx-brand-violet .dfx-ms .app-kpi .delta{ font-size: 11px; font-weight: 600; padding: 4px 8px; border-radius: 100px; background: rgba(129,130,239,0.12); color: #8182EF; }.dfx-brand-violet .dfx-ms .app-kpi:first-child .delta{ background: rgba(129,130,239,0.2); color: #a5b4fc; box-shadow: 0 0 16px -3px rgba(90,91,235,0.6); }.dfx-brand-violet .dfx-ms .app-drawdown .bar{ height: 8px; background: rgba(90,91,235,0.14); border-radius: 100px; overflow: hidden; box-shadow: inset 0 0 8px rgba(0,0,0,0.35); }.dfx-brand-violet .dfx-ms .app-drawdown .bar .fill{ height: 100%; width: 71%; background: linear-gradient(90deg, var(--brand), #8182EF); border-radius: 100px; box-shadow: 0 0 16px -2px rgba(90,91,235,0.7); position: relative; overflow: hidden; }.dfx-brand-violet .dfx-ms .app-fac:hover{ border-color: rgba(90,91,235,0.32); background: rgba(255,255,255,0.04); }.dfx-brand-violet .dfx-ms .app-fac .status.active{ background: rgba(90,91,235,0.18); color: #a5b4fc; box-shadow: 0 0 12px -3px rgba(90,91,235,0.6); }.dfx-brand-violet .dfx-ms .app-action:hover{ transform: translateY(-3px); border-color: rgba(90,91,235,0.45); background: rgba(90,91,235,0.07); box-shadow: 0 16px 34px -16px rgba(90,91,235,0.55), inset 0 1px 0 rgba(255,255,255,0.06); }.dfx-brand-violet .dfx-ms .app-action.is-primary{ background: rgba(90,91,235,0.10); border-color: rgba(90,91,235,0.40); box-shadow: 0 0 26px -10px rgba(90,91,235,0.55); }.dfx-brand-violet .dfx-ms .app-action.is-primary:hover{ box-shadow: 0 18px 38px -16px rgba(90,91,235,0.7); }.dfx-brand-violet .dfx-ms .app-action:hover svg{ stroke: var(--brand); transform: scale(1.08); filter: drop-shadow(0 0 6px rgba(90,91,235,0.55)); }.dfx-brand-violet .dfx-ms .app-action.is-primary svg{ stroke: var(--brand); filter: drop-shadow(0 0 5px rgba(90,91,235,0.6)); }.dfx-brand-violet .dfx-ms .action-nudge{ display: flex; align-items: center; gap: 12px; margin-top: 16px; padding: 12px 16px; background: linear-gradient(135deg, rgba(90,91,235,0.14), rgba(90,91,235,0.10)); border: 1px solid rgba(129,130,239,0.34); border-radius: 12px; box-shadow: 0 10px 30px -14px rgba(90,91,235,0.6); }.dfx-brand-violet .dfx-ms .action-nudge-globe .atm-g{ background: radial-gradient(circle at 70% 68%, rgba(90,91,235,1) 0%, transparent 40%); }.dfx-brand-violet .dfx-ms .action-nudge-globe .dot-2{ left: 68%; top: 38%; background: #8182EF; box-shadow: 0 0 5px #5A5BEB; }.dfx-brand-violet .dfx-ms .action-nudge-btn{ flex-shrink: 0; padding: 8px 16px; border-radius: 100px; background: linear-gradient(135deg, #5A5BEB, #3B3CCF); color: #fff; font-family: 'Sora', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 6px 18px -6px rgba(90,91,235,0.7); white-space: nowrap; transition: transform 0.18s ease, box-shadow 0.18s ease; }.dfx-brand-violet .dfx-ms .action-nudge-btn:hover{ transform: translateY(-1px); box-shadow: 0 10px 24px -6px rgba(90,91,235,0.85); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms{ --mesh-base: #F8F9FB; --mesh-a: rgba(90,91,235,0.18); --mesh-b: rgba(90,91,235,0.10); --mesh-c: rgba(90,91,235,0.07); --stream-base: #F4F6F8; --app-base: #ffffff; --on-dark: #1a1532; --on-dark-mut: rgba(26,21,50,0.65); --on-dark-lo: rgba(26,21,50,0.42); --rule: rgba(26,21,50,0.10); --s-bg: var(--s-bg-day); --s-surface: var(--s-surface-day); --s-card: var(--s-card-day); --s-card-2: var(--s-card2-day); --s-border: var(--s-border-day); --s-ink: var(--s-ink-day); --s-muted: var(--s-muted-day); --s-lo: var(--s-lo-day); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .grad-irid{ background-image: linear-gradient(95deg, #2c2da0 0%, #4344c9 26%, #0B7FAB 50%, #4078b0 72%, #4344c9 86%, #2c2da0 100%); filter: drop-shadow(0 1px 1px rgba(7,1,24,0.18)); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .mirror-photo-borrower::before{ background: radial-gradient(ellipse 70% 80% at 30% 30%, rgba(90,91,235,0.22), transparent 60%), linear-gradient(135deg, #e8f5ee 0%, #f0f6f2 100%); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .action-nudge{ background: linear-gradient(135deg, rgba(90,91,235,0.10), rgba(90,91,235,0.07)), #FFFFFF; border-color: rgba(129,130,239,0.30); box-shadow: 0 10px 26px -16px rgba(90,91,235,0.4); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .mesh{ color: #1a1532; background: radial-gradient(ellipse at 78% 22%, rgba(90,91,235,0.12) 0%, transparent 50%), radial-gradient(ellipse at 18% 30%, rgba(90,91,235,0.14) 0%, transparent 52%), radial-gradient(ellipse at 70% 82%, rgba(90,91,235,0.10) 0%, transparent 55%), #F8F9FB; }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .hero-meta .item::before{ background: linear-gradient(180deg, rgba(90,91,235,0.55) 0%, rgba(7,1,24,0.05) 100%); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .hero-meta .item .v{ color: #1a1532; text-shadow: 0 0 18px rgba(90,91,235,0.25); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .hero-meta .item .delta{ color: var(--brand-deep); background: rgba(90,91,235,0.10); border-color: rgba(90,91,235,0.30); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .stream-band{ background: radial-gradient(ellipse at 20% 0%, rgba(90,91,235,0.16) 0%, transparent 55%), radial-gradient(ellipse at 88% 30%, rgba(90,91,235,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(90,91,235,0.06) 0%, transparent 50%), #F8F9FB; border-bottom-color: rgba(7,1,24,0.10); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .flagship-band{ background: radial-gradient(ellipse 90vw 70vh at 50% 0%, rgba(90,91,235,0.10) 0%, transparent 55%), radial-gradient(ellipse 100vw 80vh at 50% 100%, rgba(90,91,235,0.06) 0%, transparent 55%), #F8F9FB; color: #1a1532; }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .fs-neb-1{ background: radial-gradient(circle, rgba(90,91,235,0.24) 0%, rgba(90,91,235,0.07) 40%, transparent 70%); opacity: 0.82; }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .flagship-tag{ color: var(--brand-deep); background: rgba(90,91,235,0.10); border-color: rgba(90,91,235,0.28); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .flagship-tag-dot, .dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .flagship-rail-dot{ background: var(--brand); box-shadow: 0 0 8px rgba(90,91,235,0.5); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .app-band::before{ background: radial-gradient(ellipse at 15% 18%, rgba(90,91,235,0.08) 0%, transparent 50%), radial-gradient(ellipse at 85% 82%, rgba(90,91,235,0.06) 0%, transparent 52%); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .app-canvas{ background: #fafaf6; border-color: rgba(7,1,24,0.10); box-shadow: 0 20px 50px -16px rgba(7,1,24,0.18), 0 0 60px -20px rgba(90,91,235,0.20); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .app-kpi:hover{ background: rgba(255,255,255,1); border-color: rgba(90,91,235,0.30); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .app-fac:hover{ background: rgba(255,255,255,1); border-color: rgba(90,91,235,0.30); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .app-action:hover{ background: rgba(90,91,235,0.06); border-color: rgba(90,91,235,0.30); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .app-action.is-primary{ background: rgba(90,91,235,0.06); border-color: rgba(90,91,235,0.30); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .stream-band .pulse-dot{ box-shadow: 0 0 12px rgba(90,91,235,0.55); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .hero-meta{ background: radial-gradient(ellipse at 20% 0%, rgba(90,91,235,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(90,91,235,0.05) 0%, transparent 55%), rgba(255,255,255,0.74); box-shadow: 0 0 0 1px rgba(90,91,235,0.18), 0 20px 44px -26px rgba(7,1,24,0.22); }.dfx-site.dfx-brand-violet:not(.dfx-night) .dfx-ms .board-cta{ background: radial-gradient(ellipse 70% 130% at 8% 20%, rgba(90,91,235,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 120% at 95% 90%, rgba(90,91,235,0.10) 0%, transparent 55%), #FFFFFF; border-color: rgba(90,91,235,0.28); box-shadow: 0 18px 44px -26px rgba(90,91,235,0.35), inset 0 1px 0 rgba(255,255,255,0.6); }.dfx-brand-violet .dfx-ms .grad-crim{background:linear-gradient(90deg,#5A5BEB,#8182EF);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}.dfx-brand-violet .dfx-ms .login-mesh{ position: absolute; inset: 0; overflow: hidden; color: #fff; background: radial-gradient(ellipse at 78% 22%, rgba(129,130,239,0.16) 0%, transparent 50%), radial-gradient(ellipse at 18% 30%, rgba(90,91,235,0.18) 0%, transparent 52%), radial-gradient(ellipse at 70% 82%, rgba(94,228,205,0.10) 0%, transparent 55%), #050614; }.dfx-brand-violet .dfx-ms .login-wordmark .login-raise{ color: #8182EF; text-shadow: 0 0 8px rgba(129,130,239,0.45); }.dfx-brand-violet .dfx-ms .login-grad-mint{ color: #a5b4fc; text-shadow: 0 0 16px rgba(94,228,192,0.35); }.dfx-brand-violet .dfx-ms .login-stat-dot.g{ background: #5A5BEB; box-shadow: 0 0 7px #5A5BEB; }.dfx-brand-violet .dfx-ms .login-input:hover:not(:focus){ border-color: rgba(129,130,239,0.45); background: rgba(90,91,235,0.05); box-shadow: 0 0 0 4px rgba(90,91,235,0.10), 0 8px 28px rgba(90,91,235,0.18); transform: translateY(-1px); }.dfx-brand-violet .dfx-ms .login-input:focus{ border-color: #5A5BEB; background: rgba(90,91,235,0.08); box-shadow: 0 0 0 4px rgba(90,91,235,0.22), 0 10px 32px rgba(90,91,235,0.30); transform: translateY(-1px); }.dfx-brand-violet .dfx-ms .field-wrap:has(.login-input:focus) .field-label{ color: #8182EF; transform: translateX(2px); }.dfx-brand-violet .dfx-ms .login-btn{ width: 100%; height: 46px; border: 0; border-radius: 12px; background: linear-gradient(135deg, #5A5BEB, #3536a0); color: #fff; font-family: 'Sora', sans-serif; font-size: 13.5px; font-weight: 700; cursor: pointer; box-shadow: 0 10px 28px -8px rgba(90,91,235,0.6); transition: transform .2s, box-shadow .2s; margin-top: 6px; }.dfx-brand-violet .dfx-ms .login-btn:hover{ transform: translateY(-1px); box-shadow: 0 14px 34px -8px rgba(90,91,235,0.75); }.dfx-brand-violet .dfx-ms .login-alt a{ color: #8182EF; font-weight: 600; cursor: pointer; text-decoration: none; }.dfx-brand-violet .dfx-ms .login-chord .g{ background: #5A5BEB; }.dfx-brand-violet .dfx-ms .login-accent-green{ background: linear-gradient(90deg, #5A5BEB, rgba(90,91,235,0.4), transparent); }.dfx-brand-violet .dfx-ms .login-forgot{ font-size: 11.5px; color: #8182EF; font-weight: 600; cursor: pointer; }.dfx-brand-violet .dfx-ms .login-btn-create{ width: 100%; height: 44px; border-radius: 12px; background: rgba(90,91,235,0.10); border: 1px solid rgba(90,91,235,0.40); color: #8182EF; font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: all .15s; display: flex; align-items: center; justify-content: center; gap: 8px; }.dfx-brand-violet .dfx-ms .login-btn-create:hover{ background: rgba(90,91,235,0.18); border-color: rgba(90,91,235,0.65); }.dfx-brand-violet .dfx-ms .login-foot a{ color: #8182EF; font-weight: 600; cursor: pointer; text-decoration: none; }.dfx-ms .fade-up{opacity:1 !important;transform:none !important;}`;

// ── Compliance cross-cut band (shared helper, ported as a local function) ──
function ComplianceCrossCut() {
  const items = [
    { icon: "Shield", t: "KYB & Onboarding", d: "Everyone's verified before they can join a deal." },
    { icon: "Wallet", t: "Whitelisting", d: "Only approved holders can hold or transfer. Checked automatically." },
    { icon: "Landmark", t: "Rules Built Into the Token", d: "The rules live in the token. Every transfer checks them automatically." },
    { icon: "Clock", t: "One-Click Reporting", d: "Audit-ready reports on demand, reconciled automatically." },
  ];
  return (
    <div
      style={{
        padding: "32px 32px",
        background:
          "radial-gradient(ellipse at 20% 6%, rgba(11,127,171,0.10) 0%, transparent 50%), radial-gradient(ellipse at 22% 12%, rgba(94,228,205,0.20) 0%, transparent 55%), radial-gradient(ellipse at 82% 90%, rgba(11,127,171,0.12) 0%, transparent 52%), radial-gradient(ellipse at 60% 50%, rgba(94,228,205,0.08) 0%, transparent 64%), var(--s-surface-alt)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <CenterEyebrow accent={TEAL}>Compliance · Cross-cutting</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>
          Compliant by Design, Across Everything
        </h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.6, fontFamily: "Sora" }}>
          Compliance isn't a product beside Raise, Yield and Mint — it's the layer that runs underneath all three. The same KYB, whitelisting and permissioning, everywhere capital moves.
        </p>
        <div className="dfx-comp-grid stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, maxWidth: RAIL, margin: "0 auto" }}>
          {items.map((it, i) => (
            <MirrorCard key={i} accent={TEAL} style={{ padding: "22px 20px" }}>
              <div style={{ marginBottom: 14 }}>
                <Icon name={it.icon} size={26} color={TEAL} strokeWidth={1.9} />
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6, fontFamily: "Sora", letterSpacing: "-0.3px" }}>{it.t}</div>
              <div style={{ fontSize: 12.5, color: "var(--s-muted)", lineHeight: 1.6, fontFamily: "Sora" }}>{it.d}</div>
            </MirrorCard>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 24, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--s-lo)", fontFamily: "Sora" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: G }} />
            Raise
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD }} />
            Yield
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: V_LIGHT }} />
            Mint
          </span>
        </div>
      </div>
    </div>
  );
}

const PAIN_FIX: [string, string][] = [
  ["Still collecting KYC by email?", "Centralised onboarding. Less chasing."],
  ["Still calculating interest in Excel?", "Accurate calculations. Automated."],
  ["Who invested in what?", "One source of truth for every facility."],
  ["“When do I get paid?” — again.", "Lenders get the visibility they expect."],
  ["Managing drawdowns across five systems?", "The whole lifecycle in one place."],
  ["Reporting shouldn’t need a law firm.", "Reporting built into the workflow."],
];

const WINS = [
  { accent: V, icon: "Clock", title: "Get your evenings back", d: "No more Excel interest runs or chasing 50 lenders for KYC. One run pays every lender." },
  { accent: V, icon: "Users", title: "Look like an institution", d: "Every lender sees their position and next payment — so the “when do I get paid?” emails stop." },
  { accent: V, icon: "TrendingUp", title: "Scale without hiring", d: "Add the next facility, and the one after, without growing your back office." },
];

const ACCESS = [
  { accent: V, icon: "Globe", name: "Anyone Can Invest", line: "Open to every signed-in user with a wallet.", badge: null as string | null },
  { accent: V, icon: "Shield", name: "KYC-Verified Only", line: "Only KYC-approved investors can commit capital.", badge: "Compliant" as string | null },
  { accent: V, icon: "Lock", name: "Specific Users", line: "Invite-only. Add investor emails; others apply for access.", badge: null as string | null },
];

export default function Raise() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [clock, setClock] = useState("00:00:00 UTC");
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setClock(`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const night = mounted ? resolvedTheme !== "light" : true;
  const openApp = () => router.push(appHref("raise"));
  const booking = () => router.push("/contact");

  return (
    <div
      className={night ? "dfx-site dfx-night dfx-brand-violet" : "dfx-site dfx-brand-violet"}
      style={{ minHeight: "100vh", background: "var(--s-bg)", "--c-green": "#5A5BEB", "--t-grn": "#8182EF", "--brand-deep": "#3B3CCF" } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: MS_CSS }} />

      <CosmicHero
        audience="raise"
        accent={V}
        glow="rgba(90,91,235,0.82)"
        name="Raise"
        eyebrow="Private credit, minus the busywork"
        h1a="Stop Waiting on Your Bank."
        h1b="Run Private Credit Yourself."
        phLabel="Raise dashboard — your facility in one view"
        sub="Open a facility, draw from lenders, pay everyone at once, and report — one app. No queue, no spreadsheets."
        kpis={[
          { v: "$84M", l: "Capital drawn" },
          { v: "24", l: "Active facilities" },
          { v: "50+", l: "Lender network" },
          { v: "9 days", l: "To first draw" },
        ]}
        ctaPrimary="See it live"
        ctaGhost="How it works"
        onPrimary={openApp}
        onGhost={() => {
          const el = document.getElementById("how");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Sound familiar? — before / after */}
      <div style={{ padding: "56px 32px", background: "var(--s-surface)" }}>
        <CenterEyebrow accent={V}>Sound familiar?</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>The Busywork Ends Here.</h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.6, fontFamily: "Sora" }}>Every headache of running a facility by hand — answered in one app.</p>
        <div style={{ display: "grid", gap: 12, maxWidth: RAIL, margin: "0 auto" }}>
          <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, padding: "0 24px 2px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-lo)", fontFamily: "Sora", paddingLeft: 32 }}>The old way</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: V, fontFamily: "Sora", paddingLeft: 32 }}>With Raise</div>
          </div>
          {PAIN_FIX.map(([pain, fix], i) => (
            <div key={i} className="stack-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 18, background: "var(--s-card)", border: "1px solid var(--s-border)", borderRadius: 14, padding: "20px 24px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, marginTop: 1, width: 20, height: 20, borderRadius: "50%", border: "1px solid var(--s-line)", color: "var(--s-lo)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, lineHeight: 1, fontFamily: "Sora" }}>{"–"}</span>
                <span style={{ fontSize: 14.5, color: "var(--s-muted)", lineHeight: 1.5, fontFamily: "Sora" }}>{pain}</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, marginTop: 1, width: 20, height: 20, borderRadius: "50%", background: V, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, lineHeight: 1, fontFamily: "Sora" }}>{"✓"}</span>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--s-ink)", lineHeight: 1.5, fontFamily: "Sora" }}>{fix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why You Win */}
      <div style={{ padding: "56px 32px", background: "var(--s-bg)" }}>
        <CenterEyebrow accent={V}>For operators running a book</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>Why You Win.</h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 580, margin: "0 auto 34px", lineHeight: 1.6, fontFamily: "Sora" }}>You built the lender book. Raise gives back the hours and room to grow.</p>
        <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: RAIL, margin: "0 auto" }}>
          {WINS.map((w, i) => (
            <div key={i} style={{ background: "var(--s-card)", border: "1px solid var(--s-border)", borderRadius: 16, padding: "26px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 100, background: `${w.accent}1f`, border: `1px solid ${w.accent}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={w.icon} size={20} color={w.accent} />
              </div>
              <div className="h-feat">{w.title}</div>
              <div style={{ fontSize: 13, color: "var(--s-muted)", lineHeight: 1.55, fontFamily: "Sora" }}>{w.d}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionSeam accent={V} />

      {/* One payment in, everyone paid out — mirror */}
      <div className="dfx-ms">
        <section className="section-pad section-light">
          <div style={{ maxWidth: RAIL, margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>
            <div className="intro-head fade-up" style={{ textAlign: "center", margin: "0 auto 48px", maxWidth: 720 }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>One Movement, Both Sides</span>
              <h2 className="h-section">
                One Payment In. <span className="grad-crim">Everyone Paid Out.</span>
              </h2>
              <p className="sub">The borrower pays once. Defactor splits it to every lender by share — matched, recorded, reported.</p>
            </div>
            <div className="mirror">
              <div className="mirror-side mirror-borrower">
                <div className="mirror-head">
                  <span className="mirror-tag tag-green">Borrower</span>
                  <span className="mirror-role">Pays once</span>
                </div>
                <div className="msurface">
                  <div className="msurface-bar">
                    <span className="msd" />
                    <span className="msd" />
                    <span className="msd" />
                    <span className="mcrumb">Facility · Pay</span>
                  </div>
                  <div className="msurface-body">
                    <div className="mrow mrow-head">
                      <span className="mname">Acme Trading Ltd</span>
                      <span className="mpill pill-green">Active</span>
                    </div>
                    <div className="mrow">
                      <span className="mk">Invoice due</span>
                      <span className="mv">$48,200</span>
                    </div>
                    <div className="mrow mrow-sub">
                      <span className="mk">Split across</span>
                      <span className="mv-muted">12 lenders</span>
                    </div>
                    <button className="mbtn mbtn-green">Pay now</button>
                  </div>
                </div>
                <p className="mirror-blurb">One payment in. The borrower never touches the lender list.</p>
              </div>
              <div className="mirror-seam">
                <div className="seam-line" />
                <div className="seam-flow">
                  <span className="flow-token ft1" />
                  <span className="flow-token ft2" />
                  <span className="flow-token ft3" />
                </div>
                <div className="seam-hub">
                  <div className="hub-ring" />
                  <div className="hub-core">
                    <img className="hub-emblem" src={EMBLEM_SRC} alt="" style={{ width: 34, height: 34 }} />
                  </div>
                  <div className="hub-label">Raise</div>
                  <div className="hub-sub">Splits and matches</div>
                  <div className="hub-amt">$48,200</div>
                </div>
              </div>
              <div className="mirror-side mirror-lender">
                <div className="mirror-head">
                  <span className="mirror-tag tag-violet">Lender</span>
                  <span className="mirror-role">Paid by share</span>
                </div>
                <div className="msurface">
                  <div className="msurface-bar">
                    <span className="msd" />
                    <span className="msd" />
                    <span className="msd" />
                    <span className="mcrumb">Portfolio · In</span>
                  </div>
                  <div className="msurface-body">
                    <div className="mrow mrow-head">
                      <span className="mname">Your position</span>
                      <span className="mpill pill-violet">Funded</span>
                    </div>
                    <div className="mrow">
                      <span className="mk">Share of facility</span>
                      <span className="mv">8.3%</span>
                    </div>
                    <div className="mrow">
                      <span className="mk">This payment</span>
                      <span className="mv">$4,001</span>
                    </div>
                    <div className="mrow mrow-sub">
                      <span className="mk">Next</span>
                      <span className="mv-muted">Apr 30</span>
                    </div>
                  </div>
                </div>
                <p className="mirror-blurb">Each lender is paid automatically, by their share.</p>
              </div>
            </div>
            <div style={{ maxWidth: 980, margin: "44px auto 0" }}>
              <Img num={11} page="raise" accent={V} ratio="16 / 9" label="Product surface — borrower invoice + lender payouts" />
            </div>
            <p className="mirror-synthesis">
              The borrower pays once; Defactor splits it to every lender by share — matched, recorded, and reported.{" "}
              <strong>One payment in, many paid out.</strong>
            </p>
          </div>
        </section>
      </div>

      {/* Positioning */}
      <div className="dfx-ms">
        <section className="section-pad section-grey" id="positioning">
          <div style={{ maxWidth: RAIL, margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>
            <div className="intro-head fade-up" style={{ textAlign: "center", margin: "0 auto 48px", maxWidth: 720 }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>Where Raise Sits</span>
              <h2 className="h-section">
                Not a Bank. <span className="grad-crim">Not a Spreadsheet.</span>
              </h2>
              <p className="sub">Everyone runs private credit somewhere on this line. Most are stuck on the left.</p>
            </div>
            <div className="positioning-axis fade-up">
              <div className="axis-labels">
                <div className="axis-label-l">
                  <div className="axis-label-strong">Manual & fragmented</div>
                  <div className="axis-label-weak">Spreadsheets, email, bank queues</div>
                </div>
                <div className="axis-label-r">
                  <div className="axis-label-strong">One automated app</div>
                  <div className="axis-label-weak">Set up, fund, pay, report — in one place</div>
                </div>
              </div>
              <div className="axis-track">
                <div className="axis-line" />
                <div className="axis-marker axis-marker-ghost" style={{ left: "10%" }}>
                  <div className="axis-marker-dot" />
                  <div className="axis-marker-label">Spreadsheets + email</div>
                </div>
                <div className="axis-marker axis-marker-ghost" style={{ left: "35%" }}>
                  <div className="axis-marker-dot" />
                  <div className="axis-marker-label">Bank facility desk</div>
                </div>
                <div className="axis-marker axis-marker-ghost" style={{ left: "60%" }}>
                  <div className="axis-marker-dot" />
                  <div className="axis-marker-label">Generic lending SaaS</div>
                </div>
                <div className="axis-marker axis-marker-us" style={{ left: "90%" }}>
                  <div className="axis-marker-hot">You are here</div>
                  <div className="axis-marker-glyph">
                    <div className="axis-marker-nebula" />
                    <img className="axis-marker-emblem" src={EMBLEM_SRC} alt="" />
                  </div>
                  <div className="axis-marker-dot" />
                  <div className="axis-marker-label">
                    <span className="axis-marker-wordmark">
                      <span className="axw-defactor">Defactor </span>
                      <span className="axw-raise">Raise</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="positioning-conclusions">
                <div className="pc-card d1">
                  <div className="pc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h4>Built for operators</h4>
                  <p>Not a bank product bolted onto lending. Made for the people who actually run the book.</p>
                </div>
                <div className="pc-card d2">
                  <div className="pc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <h4>One app, end to end</h4>
                  <p>Set up, fund, service, and report without leaving the screen — or hiring for it.</p>
                </div>
                <div className="pc-card d3">
                  <div className="pc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h4>Compliance built in</h4>
                  <p>Checks are built in, so every loan is audit-ready by default.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* How It Works */}
      <div className="dfx-ms">
        <section className="section-pad section-grey" id="how">
          <div style={{ maxWidth: RAIL, margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>
            <div className="intro-head fade-up">
              <span className="eyebrow">How It Works</span>
              <h2 className="h-section">
                Structure. Raise. <span className="grad-crim">Service. Report.</span>
              </h2>
              <p className="sub">Set up a loan, open it to lenders, handle payments, then report.</p>
            </div>
            <div className="steps-grid">
              <div className="step fade-up d1">
                <div className="step-head">
                  <span className="step-index">01</span>
                  <h3 className="h-card">Structure the Facility</h3>
                </div>
                <p className="body">Set the amount, term, rate, and schedule. Deffo drafts it; you approve before money moves.</p>
              </div>
              <div className="step fade-up d2">
                <div className="step-head">
                  <span className="step-index">02</span>
                  <h3 className="h-card">Open to Lenders</h3>
                </div>
                <p className="body">List openly or invite privately. Approved lenders chip in as funding fills live.</p>
              </div>
              <div className="step fade-up d3 step-deep" id="payment-lifecycle" style={{ scrollMarginTop: "90px" }}>
                <div className="step-head">
                  <span className="step-index">03</span>
                  <h3 className="h-card">Service the Payments</h3>
                </div>
                <p className="body">Invoices go out on schedule. The borrower taps Pay now, and the app splits the money to each lender. You handle only exceptions.</p>
              </div>
              <div className="step fade-up d4">
                <div className="step-head">
                  <span className="step-index">04</span>
                  <h3 className="h-card">Report & Match</h3>
                </div>
                <p className="body">Statements, balances, audit packs — every payment matched and traced, exportable anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Capabilities / bento (decorative cap-mesh dropped for a static backdrop) */}
      <div className="dfx-ms">
        <section className="section-pad section-grey" id="capabilities" style={{ position: "relative", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 30% 12%, " + V + "22 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, " + V + "16 0%, transparent 55%)" }} />
          <div style={{ position: "relative", maxWidth: RAIL, margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>
            <div className="intro-head fade-up">
              <span className="eyebrow">What’s Inside</span>
              <h2 className="h-section">
                The Whole Job, <span className="grad-crim">in One App.</span>
              </h2>
              <p className="sub">As simple as Stripe, with reporting auditors recognize.</p>
            </div>
            <div className="bento">
              <div className="bento-card hero-tile fade-up">
                <div className="accent-bar" />
                <div className="inner">
                  <div className="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="7" height="9" x="3" y="3" rx="1" />
                      <rect width="7" height="5" x="14" y="3" rx="1" />
                      <rect width="7" height="9" x="14" y="12" rx="1" />
                      <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
                  </div>
                  <div className="e">Lead capability</div>
                  <h4>One App for the Whole Journey.</h4>
                  <p>Set up the loan, invite lenders, send invoices, get paid any way. We match, split, and report.</p>
                  <div className="img-ph lead-tile-img" role="img" aria-label="Product screenshot — facility lifecycle dashboard">
                    <Img file="Image-11.0" page="raise" accent={V} ratio="16 / 9" label="Lifecycle dashboard" />
                  </div>
                  <div className="stat-row">
                    <div className="stat">
                      <div className="k">Avg facility size</div>
                      <div className="v">$3.4M</div>
                    </div>
                    <div className="stat">
                      <div className="k">Time to fund</div>
                      <div className="v">7d</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bento-card fade-up d1 tile-teal">
                <div className="accent-bar" />
                <div className="inner">
                  <div className="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="e">Checks & Monitoring</div>
                  <h4>Know Who You’re Dealing With — Automatically.</h4>
                  <p>Verify a business in minutes, not weeks. If a loan drifts outside its terms, you’re flagged right away.</p>
                </div>
              </div>
              <div className="bento-card fade-up d2 tile-gold">
                <div className="accent-bar" />
                <div className="inner">
                  <div className="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="6" cy="19" r="3" />
                      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                      <circle cx="18" cy="5" r="3" />
                    </svg>
                  </div>
                  <div className="e">Payments</div>
                  <h4>Pay Any Way You Like.</h4>
                  <p>Bank, card, or stablecoin. Part-payments, auto-pay, and retries built in.</p>
                </div>
              </div>
              <div className="bento-card wide fade-up d3">
                <div className="accent-bar" />
                <div className="inner">
                  <div className="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                      <path d="M2 12a10 10 0 0 1 18-6" />
                      <path d="M2 16h.01" />
                      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                      <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
                      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
                      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
                    </svg>
                  </div>
                  <div className="e">Compliance</div>
                  <h4>Verified Once. Compliant Everywhere.</h4>
                  <p>Everyone’s verified before taking part, rules built in. Verify a business once; it carries across every loan.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Distribution & access */}
      <div style={{ padding: "56px 32px", background: "var(--s-surface)" }}>
        <CenterEyebrow accent={V}>Distribution & access</CenterEyebrow>
        <h2 className="h-section" style={{ textAlign: "center", color: "var(--s-ink)", margin: 0, marginBottom: 6, fontFamily: "Sora" }}>You Choose Who Can Invest.</h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--s-muted)", maxWidth: 580, margin: "0 auto 34px", lineHeight: 1.6, fontFamily: "Sora" }}>Every pool has an access gate — open, KYC-verified, or invite-only — enforced automatically. Adjust the whitelist anytime.</p>
        <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: RAIL, margin: "0 auto" }}>
          {ACCESS.map((p, i) => (
            <div key={i} style={{ position: "relative", background: "var(--s-card)", border: `1px solid ${p.badge ? p.accent + "55" : "var(--s-border)"}`, borderRadius: 16, padding: "26px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              {p.badge && (
                <span style={{ position: "absolute", top: 14, right: 14, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p.accent, background: `${p.accent}1a`, border: `1px solid ${p.accent}3a`, borderRadius: 100, padding: "3px 9px", fontFamily: "Sora" }}>{p.badge}</span>
              )}
              <div style={{ width: 44, height: 44, borderRadius: 100, background: `${p.accent}1f`, border: `1px solid ${p.accent}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={p.icon} size={20} color={p.accent} />
              </div>
              <div className="h-feat">{p.name}</div>
              <div style={{ fontSize: 13, color: "var(--s-muted)", lineHeight: 1.55, fontFamily: "Sora" }}>{p.line}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Inside the app — live credit desk dashboard */}
      <div className="dfx-ms">
        <section className="section-pad app-band" id="app" aria-label="Inside the Defactor Raise app">
          <div className="app-spot" aria-hidden="true" />
          <div style={{ maxWidth: RAIL, margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>
            <div className="intro-head fade-up">
              <span className="eyebrow on-dark">Inside the app</span>
              <h2 className="h-section">
                A Live Credit Desk. <span className="grad-crim">No Spreadsheets.</span>
              </h2>
              <p className="sub">Every loan, invoice, and payment in one view — the same your lenders see.</p>
            </div>
            <div className="app-canvas fade-up d1">
              <div className="app-chrome-bar">
                <span className="dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="crumb">
                  Defactor Raise <b>· Portfolio</b>
                  <span className="live">Live</span>
                </span>
                <span className="app-chrome-stamp">{clock}</span>
              </div>
              <div className="app-body">
                <div className="app-kpis">
                  <div className="app-kpi">
                    <div className="label">Total Raised</div>
                    <div className="value">
                      <span>$486K</span>
                      <span className="delta">+$146K</span>
                    </div>
                    <div className="sub">Across 4 Facilities</div>
                  </div>
                  <div className="app-kpi">
                    <div className="label">Available to Draw</div>
                    <div className="value">
                      $124K <span className="delta">Ready</span>
                    </div>
                    <div className="sub">2 Facilities Ready</div>
                  </div>
                  <div className="app-kpi">
                    <div className="label">Next Repayment</div>
                    <div className="value">
                      $8,400 <span className="delta neutral">12 Days</span>
                    </div>
                    <div className="sub">Apr 28 · Growth Facility I</div>
                  </div>
                </div>
                <div className="app-drawdown">
                  <div className="row">
                    <div className="lhs">
                      <div className="lbl">Total Available to Draw</div>
                      <div className="big">$124,000</div>
                    </div>
                    <div className="rhs">
                      <div className="sm">Across 2 Active Facilities</div>
                      <div className="pct">71% of Total Facility Drawn</div>
                    </div>
                  </div>
                  <div className="bar">
                    <div className="fill" />
                  </div>
                  <div className="foot">
                    <span>$236,000 drawn to date</span>
                    <span>$360,000 total facility</span>
                  </div>
                </div>
                <div>
                  <div className="app-section-label" style={{ marginBottom: "12px" }}>Facility Book</div>
                  <div className="app-facilities">
                    <div className="app-fac">
                      <div>
                        <div className="name">Growth Facility I</div>
                        <div className="meta">
                          <span>VH-2026-001</span>
                          <span>Revenue-Based</span>
                        </div>
                      </div>
                      <div className="fill-mini">
                        <div className="bar">
                          <div className="v" style={{ width: "100%" }} />
                        </div>
                        <div className="lbl">100% funded</div>
                      </div>
                      <div className="apy">8.5%</div>
                      <span className="status active">Active</span>
                    </div>
                    <div className="app-fac">
                      <div>
                        <div className="name">Working Capital II</div>
                        <div className="meta">
                          <span>VH-2026-002</span>
                          <span>Revenue-Based</span>
                        </div>
                      </div>
                      <div className="fill-mini">
                        <div className="bar">
                          <div className="v" style={{ width: "78%" }} />
                        </div>
                        <div className="lbl">78% funded</div>
                      </div>
                      <div className="apy">8.0%</div>
                      <span className="status funded">Funded</span>
                    </div>
                    <div className="app-fac">
                      <div>
                        <div className="name">Equipment Finance</div>
                        <div className="meta">
                          <span>VH-2026-003</span>
                          <span>Asset-Backed</span>
                        </div>
                      </div>
                      <div className="fill-mini">
                        <div className="bar">
                          <div className="v" style={{ width: "24%" }} />
                        </div>
                        <div className="lbl">24% funded</div>
                      </div>
                      <div className="apy">7.2%</div>
                      <span className="status pending">Pending</span>
                    </div>
                    <div className="app-fac">
                      <div>
                        <div className="name">Invoice Bridge Q2</div>
                        <div className="meta">
                          <span>VH-2026-004</span>
                          <span>Revenue-Based</span>
                        </div>
                      </div>
                      <div className="fill-mini">
                        <div className="bar">
                          <div className="v" style={{ width: "0%" }} />
                        </div>
                        <div className="lbl">Draft</div>
                      </div>
                      <div className="apy">9.0%</div>
                      <span className="status draft">Draft</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="app-section-label" style={{ marginBottom: "12px" }}>Quick Actions</div>
                  <div className="app-actions" id="appActions" data-action-demo="">
                    <div className="app-action is-primary">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
                      </svg>
                      <div className="label">Open a Facility</div>
                      <div className="desc">Open a new revenue-based or asset-backed credit facility.</div>
                    </div>
                    <div className="app-action">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                      <div className="label">Facility Book</div>
                      <div className="desc">Every loan you’ve set up — status, funding, and usage.</div>
                    </div>
                    <div className="app-action">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <div className="label">Request Drawdown</div>
                      <div className="desc">Draw down funds and see remaining capacity across your loans.</div>
                    </div>
                    <div className="app-action">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <div className="label">Borrower Profile</div>
                      <div className="desc">Your public opportunity page — preview and share.</div>
                    </div>
                  </div>
                  <div className="action-nudge" id="actionNudge" role="status" aria-live="polite" hidden>
                    <span className="action-nudge-globe" aria-hidden="true">
                      <span className="atm atm-v" />
                      <span className="atm atm-g" />
                      <span className="dot dot-1" />
                      <span className="dot dot-2" />
                      <span className="dot dot-3" />
                    </span>
                    <span className="action-nudge-text">A live preview. Try it on a real facility?</span>
                    <a className="action-nudge-btn" role="button" tabIndex={0} onClick={booking}>Book a demo →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Flagship client (decorative star atmosphere dropped) */}
      <div className="dfx-ms">
        <section className="section-pad section-dark flagship-band" id="flagship" aria-label="Featured client">
          <div style={{ maxWidth: RAIL, margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", position: "relative", zIndex: 2 }}>
            <div className="flagship-card fade-up">
              <div className="flagship-card-head">
                <div className="flagship-client-lockup">
                  <img className="flagship-client-logo" src="assets/clients/featured-client.png" alt="Featured client" width="172" height="95" />
                  <div className="flagship-tag">
                    <span className="flagship-tag-dot" />
                    <span>Featured Client · Trade & Invoice Finance</span>
                  </div>
                </div>
              </div>
              <h2 className="flagship-h">
                {" A Client Connects SMEs to 300+ Funders."}
                <br />
                <span className="grad-irid">We Give the Facility a Surface.</span>
              </h2>
              <p className="flagship-sub"> The client keeps the relationship; we run the software. The borrower sees a loan and a Pay now button, and the lender watches it update live. </p>
              <div className="img-ph ratio-16x9 on-dark flagship-product" role="img" aria-label="Product screens — borrower invoice view and funder facility data">
                <Img file="Image-11.1" page="raise" accent={V} ratio="16 / 9" label="Product surface — borrower invoice view + funder facility data" />
              </div>
              <div className="flagship-stats">
                <div className="fs-stat">
                  <div className="fs-stat-eyebrow">
                    <span className="fs-stat-dot" />
                    <span>Pool live</span>
                  </div>
                  <div className="fs-stat-v">$500K</div>
                </div>
                <div className="fs-stat">
                  <div className="fs-stat-eyebrow">
                    <span className="fs-stat-dot" />
                    <span>Rollovers settled</span>
                  </div>
                  <div className="fs-stat-v">3×</div>
                </div>
                <div className="fs-stat">
                  <div className="fs-stat-eyebrow">
                    <span className="fs-stat-dot" />
                    <span>Next funding target</span>
                  </div>
                  <div className="fs-stat-v">$1–2M</div>
                </div>
                <div className="fs-stat">
                  <div className="fs-stat-eyebrow">
                    <span className="fs-stat-dot" />
                    <span>Default lifetime</span>
                  </div>
                  <div className="fs-stat-v">0.0%</div>
                </div>
              </div>
              <blockquote className="flagship-quote">
                <svg className="flagship-quote-glyph" width="36" height="28" viewBox="0 0 36 28" aria-hidden="true">
                  <path d="M2 14 Q 2 4 12 4 L 12 12 Q 6 12 6 18 L 6 24 L 0 24 Z" fill="#9192F3" opacity="0.8" />
                  <path d="M20 14 Q 20 4 30 4 L 30 12 Q 24 12 24 18 L 24 24 L 18 24 Z" fill="#9192F3" opacity="0.8" />
                </svg>
                <p> The same model scales to invoice finance, SME lending, and emerging-market credit. Only the facility changes. </p>
                <cite className="flagship-cite">
                  <span className="flagship-cite-name">Live with the client</span>
                  <span className="flagship-cite-meta">Trade finance pilot · scaling to multi-million-dollar facility</span>
                </cite>
              </blockquote>
              <div className="flagship-rail">
                <div className="flagship-rail-status">
                  <span className="flagship-rail-dot" />
                  <span>Live · Operational</span>
                </div>
                <div className="flagship-rail-chord">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ComplianceCrossCut />

      {/* Closing CTA */}
      <ChordMeshHero variant="raise" height={264} withGrain withChordStripe sink={false}>
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 120% at 50% 50%, #5A5BEB26 0%, transparent 64%)" }} />
        <div style={{ minHeight: 264, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "52px 40px" }}>
          <MEyebrow audience="raise" dark style={{ justifyContent: "center", marginBottom: 10 }}>Defactor Raise</MEyebrow>
          <h2 className="h-section" style={{ color: "#fff", margin: 0, marginBottom: 10, fontFamily: "Sora" }}>Stop Waiting. Run It Yourself.</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", margin: 0, marginBottom: 20, maxWidth: CW.md, fontFamily: "Sora" }}>Track commitments, pay every lender, and report — all on one facility.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <MButton audience="raise" variant="primary" size="md" onClick={openApp}>Get Started</MButton>
            <MButton audience="raise" variant="ghostDark" size="md" icon={null} onClick={booking}>Talk to Our Team</MButton>
          </div>
        </div>
      </ChordMeshHero>
    </div>
  );
}
