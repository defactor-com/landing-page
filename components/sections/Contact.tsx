"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { V, V_LIGHT, G, GOLD, TEAL, RAIL } from "@/lib/tokens";
import { Icon } from "@/components/ui/Icon";
import { MButton } from "@/components/ui/primitives";
import { ChordMeshHero } from "@/components/hero/ChordMeshHero";
import { appHref } from "@/components/layout/nav-config";

export default function Contact() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const night = mounted ? resolvedTheme !== "light" : true;

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    purpose: "Raising capital (Raise)",
    message: "",
  });
  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 46,
    padding: "0 14px",
    borderRadius: 12,
    border: "1px solid var(--s-border)",
    background: "var(--s-surface-alt)",
    fontSize: 13.5,
    color: "var(--s-ink)",
    outline: "none",
    fontFamily: "Sora",
    boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: "var(--s-muted)",
    marginBottom: 6,
    fontFamily: "Sora",
  };

  const channels = [
    { icon: "Landmark", t: "Sales & Onboarding", d: "Tokenize an asset or set up a facility.", email: "sales@defactor.com", a: G },
    { icon: "Activity", t: "Investor Desk", d: "Access fully vetted real-world-asset income.", email: "invest@defactor.com", a: GOLD },
    { icon: "Globe", t: "Enterprise & Partnerships", d: "Run Defactor under your own brand.", email: "partners@defactor.com", a: V },
    { icon: "Shield", t: "Support", d: "Already using Defactor and need a hand?", email: "support@defactor.com", a: TEAL },
  ];

  return (
    <div style={{ background: "var(--s-bg)" }}>
      <ChordMeshHero variant="hub" height={580} withGrain withChordStripe>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: night
              ? "radial-gradient(ellipse at 28% 42%, rgba(90,91,235,0.20) 0%, rgba(7,1,24,0) 58%), linear-gradient(180deg, rgba(7,1,24,0) 60%, #06051a 100%)"
              : "radial-gradient(ellipse at 15% 25%, rgba(90,91,235,0.16) 0%, transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(11,127,171,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 10%, rgba(90,91,235,0.10) 0%, transparent 46%), radial-gradient(ellipse at 25% 90%, rgba(224,162,37,0.09) 0%, transparent 46%), radial-gradient(ellipse at 50% 50%, rgba(129,130,239,0.07) 0%, transparent 70%), var(--s-bg)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: 580,
            display: "flex",
            alignItems: "center",
            padding: "52px 40px",
            maxWidth: RAIL,
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            className="dfx-contact-hero stack-sm"
            style={{ display: "grid", gridTemplateColumns: "0.84fr 1.16fr", gap: 48, alignItems: "center", width: "100%" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                <Icon name="Users" size={56} color={night ? V_LIGHT : V} strokeWidth={2} />
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: night ? "rgba(255,255,255,0.5)" : "var(--s-muted)", flexShrink: 0 }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: night ? "rgba(255,255,255,0.5)" : "var(--s-muted)", fontFamily: "Sora" }}>
                  Contact
                </span>
              </div>
              <h1 className="h-hero" style={{ color: night ? "#fff" : "var(--s-ink)", margin: 0, marginBottom: 18 }}>
                Let’s get your assets tokenized
              </h1>
              <p style={{ fontSize: 15.5, color: night ? "rgba(255,255,255,0.74)" : "var(--s-muted)", lineHeight: 1.6, margin: 0, maxWidth: 400, fontFamily: "Sora" }}>
                Tell us about your asset or your mandate — we’ll point you to the right desk. Most messages get a human reply inside a business day.
              </p>
            </div>
            <div
              style={{
                background: "var(--s-surface)",
                border: "1px solid var(--s-border)",
                borderRadius: 20,
                padding: "26px",
                boxShadow: night ? "0 24px 60px -20px rgba(0,0,0,0.45)" : "0 24px 60px -24px rgba(20,20,50,0.14)",
              }}
            >
              <h2 className="h-section" style={{ color: "var(--s-ink)", margin: "0 0 18px", fontFamily: "Sora" }}>
                Send us a message
              </h2>
              <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle}>Full name</label>
                  <input placeholder="Jane Doe" style={inputStyle} value={form.name} onChange={set("name")} />
                </div>
                <div>
                  <label style={labelStyle}>Work email</label>
                  <input placeholder="jane@company.com" style={inputStyle} value={form.email} onChange={set("email")} />
                </div>
              </div>
              <div className="stack-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input placeholder="Company name" style={inputStyle} value={form.company} onChange={set("company")} />
                </div>
                <div>
                  <label style={labelStyle}>
                    Phone <span style={{ color: "var(--s-lo)", fontWeight: 400, letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <input placeholder="+1 555 000 0000" style={inputStyle} value={form.phone} onChange={set("phone")} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>I’m reaching out about</label>
                <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.purpose} onChange={set("purpose")}>
                  <option>Raising capital (Raise)</option>
                  <option>Investing in real-world assets (Yield)</option>
                  <option>Tokenizing an asset (Mint)</option>
                  <option>Enterprise / white-label</option>
                  <option>Partnerships</option>
                  <option>Support</option>
                  <option>Something else</option>
                </select>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  placeholder="Tell us a little about what you’re working on."
                  rows={3}
                  style={{ ...inputStyle, height: 96, padding: "10px 14px", resize: "none" }}
                  value={form.message}
                  onChange={set("message")}
                />
              </div>
              <MButton audience="hub" variant="primary" size="md" onClick={() => {}}>
                Send message
              </MButton>
              <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 14, marginBottom: 0, fontFamily: "Sora" }}>
                By submitting, you agree to our privacy policy. We’ll only use your details to respond.
              </p>
            </div>
          </div>
        </div>
      </ChordMeshHero>

      <div style={{ maxWidth: RAIL, margin: "0 auto", padding: "40px 32px 52px", background: "var(--s-bg)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--s-muted)", flexShrink: 0 }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--s-muted)", fontFamily: "Sora" }}>
            Ways to reach us
          </span>
        </div>
        <div
          className="dfx-contact-ways stack-sm"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16, alignItems: "stretch" }}
        >
          {channels.map((c, k) => (
            <a
              key={k}
              href={`mailto:${c.email}`}
              className="dfxps-card"
              style={{
                ["--ac" as string]: c.a,
                display: "block",
                textDecoration: "none",
                background: "var(--s-surface)",
                border: "1px solid var(--s-border)",
                borderLeft: "3px solid " + c.a,
                borderRadius: 16,
                padding: "16px 16px",
              } as React.CSSProperties}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                <Icon name={c.icon} size={19} color={c.a} strokeWidth={2} />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--s-ink)", fontFamily: "Sora" }}>{c.t}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--s-muted)", lineHeight: 1.55, marginBottom: 7, fontFamily: "Sora" }}>{c.d}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.a, fontFamily: "Sora" }}>{c.email}</div>
            </a>
          ))}
          <div
            style={{
              background: `linear-gradient(160deg, ${V}1f, var(--s-surface))`,
              border: `1px solid ${V}33`,
              borderRadius: 16,
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--s-ink)", marginBottom: 6, fontFamily: "Sora" }}>Prefer to talk it through?</div>
            <div style={{ fontSize: 12, color: "var(--s-muted)", lineHeight: 1.55, marginBottom: 12, fontFamily: "Sora", flex: 1 }}>
              Book a 30-minute call with the team and we’ll walk you through the platform.
            </div>
            <MButton audience="hub" variant="primary" size="sm" onClick={() => router.push(appHref())}>
              Book a call
            </MButton>
          </div>
        </div>
      </div>
    </div>
  );
}
