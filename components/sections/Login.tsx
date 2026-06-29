"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DefactorLogo } from "@/components/ui/Brand";

export default function Login() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPass, setShowPass] = useState(false);
  const searchParams = useSearchParams();
  const loginProduct = searchParams.get("product") || "";

  const PRODN: Record<string, string> = { raise: "Raise", tokenize: "Mint", invest: "Yield", token: "REAL" };
  const pname = PRODN[loginProduct];
  const sub = pname ? "Sign in to continue to Defactor " + pname + "." : "Welcome back. Sign in to your Defactor account.";
  const V = "#5A5BEB", VL = "#8182EF";

  const inputStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 10, padding: "12px 13px", color: "#fff", fontSize: 14, fontFamily: "Sora, sans-serif", outline: "none", marginBottom: 18 };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.62)", marginBottom: 7 };
  const ssoStyle: React.CSSProperties = { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 9, background: "rgba(255,255,255,0.04)", color: "#fff", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: 11, fontSize: 13.5, fontWeight: 500, fontFamily: "Sora", cursor: "pointer" };

  const Google = (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5C29.6 34.6 26.9 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.5 5.5C42.3 35.7 44 30.3 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
  const Wallet = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8182EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="14" rx="3" />
      <path d="M2 10h20" />
      <circle cx="17" cy="14" r="1.4" fill="#8182EF" />
    </svg>
  );
  const Eye = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  return (
    <div style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "56px 20px", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(90,91,235,0.14), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(225,163,37,0.06), transparent 55%), #070118" }}>
      <Link href="/" style={{ position: "absolute", top: 26, left: 30, fontSize: 13, color: "rgba(255,255,255,0.55)", cursor: "pointer", textDecoration: "none" }}>
        {"← Back to site"}
      </Link>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <DefactorLogo h={30} />
        </div>
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "36px 36px 30px", boxShadow: "0 24px 70px rgba(0,0,0,0.45)" }}>
          <h1 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 600, letterSpacing: "-0.4px", color: "#fff", margin: "0 0 6px" }}>
            {mode === "signin" ? "Sign in" : "Create your account"}
          </h1>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", margin: "0 0 26px" }}>
            {mode === "signin" ? sub : "Start tokenizing and investing in real-world assets."}
          </p>
          {mode === "signup" && (
            <>
              <label style={labelStyle}>Full name</label>
              <input placeholder="Barbara Chen" style={inputStyle} />
              <label style={labelStyle}>Company</label>
              <input placeholder="Acme Capital Ltd." style={inputStyle} />
            </>
          )}
          <label style={labelStyle}>Email</label>
          <input placeholder="you@company.com" style={inputStyle} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.62)" }}>Password</label>
            {mode === "signin" && <span style={{ fontSize: 12, color: VL, cursor: "pointer" }}>Forgot password?</span>}
          </div>
          <div style={{ position: "relative", marginBottom: 22 }}>
            <input type={showPass ? "text" : "password"} placeholder={showPass ? "Defactor2026!" : "••••••••"} style={{ ...inputStyle, marginBottom: 0, paddingRight: 42 }} />
            <span onClick={() => setShowPass((s) => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>{Eye}</span>
          </div>
          <button style={{ width: "100%", background: V, color: "#fff", border: "none", borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 600, fontFamily: "Sora", cursor: "pointer" }}>
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={ssoStyle}>
              {Google}
              Google
            </button>
            <button style={ssoStyle}>
              {Wallet}
              Wallet
            </button>
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 22 }}>
          {mode === "signin" ? "Don’t have an account? " : "Already have an account? "}
          <span onClick={() => setMode(mode === "signin" ? "signup" : "signin")} style={{ color: VL, cursor: "pointer", fontWeight: 500 }}>
            {mode === "signin" ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}
