/**
 * OptionTrading.jsx
 * Path: frontend/src/pages/OptionTrading.jsx
 *
 * ✅ Shows Expiry Date (auto-detected weekly/monthly)
 * ✅ Shows Days to Expiry countdown
 * ✅ Real Greeks from SmartAPI (Delta, Gamma, Theta, Vega, IV)
 * ✅ CE + PE Greeks side by side (table + card view)
 * ✅ IV Level analysis (Low / Normal / High / Extreme)
 * ✅ Reads from data.greeks.ce / data.greeks.pe (new structure)
 *    with fallback to data.ce_greeks / data.pe_greeks (old structure)
 */

import React, { useState, useEffect } from "react";
import { fetchSmartRisk, fetchExpiries } from "../services/api";
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from "recharts";

// ============================================================
// HELPERS
// ============================================================

const fmt = (n) =>
  n !== undefined && n !== null
    ? "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 })
    : "—";

const INVESTOR_STYLE = {
  ALERT:        { color: "#f97316", bg: "#fff7ed", emoji: "⚠"  },
  BEGINNER:     { color: "#16a34a", bg: "#f0fdf4", emoji: "🟢" },
  PROFESSIONAL: { color: "#d97706", bg: "#fffbeb", emoji: "🟡" },
  EXPERT:       { color: "#dc2626", bg: "#fef2f2", emoji: "🔴" },
};

const RISK_COLOR = {
  LOW:    { bg: "#dcfce7", text: "#15803d" },
  MEDIUM: { bg: "#fef9c3", text: "#92400e" },
  HIGH:   { bg: "#fee2e2", text: "#991b1b" },
};

const IV_LEVEL_STYLE = {
  Low:     { color: "#2563eb", bg: "#eff6ff", emoji: "📉" },
  Normal:  { color: "#16a34a", bg: "#f0fdf4", emoji: "✅" },
  High:    { color: "#d97706", bg: "#fffbeb", emoji: "📈" },
  Extreme: { color: "#dc2626", bg: "#fef2f2", emoji: "🔥" },
};

// ============================================================
// LOADING DOTS
// ============================================================

const LoadingDots = () => {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 500);
    return () => clearInterval(t);
  }, []);
  return <span>{".".repeat(dots)}</span>;
};

// ============================================================
// LOADING PANEL
// ============================================================

const LOADING_STEPS = [
  { label: "Connecting to Angel One SmartAPI",  time: 0  },
  { label: "Fetching live spot price",          time: 4  },
  { label: "Fetching option chain data",        time: 10 },
  { label: "Running market sentiment analysis", time: 18 },
  { label: "Computing strategy engine",         time: 24 },
  { label: "Fetching real Greeks from API",     time: 30 },
  { label: "Building risk signal",              time: 36 },
  { label: "Finalizing response",               time: 42 },
];

const LoadingPanel = ({ elapsed }) => (
  <div style={{
    margin: "16px 0", padding: "20px 24px",
    border: "1px solid #e5e7eb", borderRadius: 12,
    backgroundColor: "#f8fafc", maxWidth: 480,
  }}>
    <div style={{ fontSize: 14, fontWeight: 700, color: "#1e40af", marginBottom: 14 }}>
      ⏳ Fetching live market data<LoadingDots />
    </div>
    {LOADING_STEPS.map((step, i) => {
      const done    = elapsed >= step.time + 3;
      const active  = elapsed >= step.time && !done;
      const pending = elapsed < step.time;
      return (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 8, opacity: pending ? 0.35 : 1, transition: "opacity 0.4s",
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
            backgroundColor: done ? "#16a34a" : active ? "#f59e0b" : "#d1d5db",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, color: "#fff", fontWeight: 700, transition: "background-color 0.4s",
          }}>
            {done ? "✓" : i + 1}
          </div>
          <span style={{
            fontSize: 13,
            color: done ? "#16a34a" : active ? "#92400e" : "#6b7280",
            fontWeight: active ? 600 : 400,
          }}>
            {step.label}
          </span>
        </div>
      );
    })}
    <div style={{ marginTop: 14, fontSize: 12, color: "#9ca3af" }}>
      Live data fetch typically takes 15–45 seconds
    </div>
  </div>
);

// ============================================================
// CARD
// ============================================================

const Card = ({ label, value, sub, color = "#111827", borderTop, bg = "#fff" }) => (
  <div style={{
    flex: "1 1 160px", padding: "14px 16px", borderRadius: 10, backgroundColor: bg,
    border: "1px solid #e5e7eb",
    borderTop: borderTop ? `4px solid ${borderTop}` : "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  }}>
    <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{sub}</div>}
  </div>
);

// ============================================================
// EXPIRY CARD
// ============================================================

const ExpiryCard = ({ expiry_display, days_to_expiry }) => {
  if (!expiry_display) return null;

  const urgency =
    days_to_expiry <= 1 ? { color: "#dc2626", bg: "#fef2f2", label: "EXPIRES TODAY" } :
    days_to_expiry <= 3 ? { color: "#f97316", bg: "#fff7ed", label: "EXPIRING SOON" } :
    days_to_expiry <= 7 ? { color: "#d97706", bg: "#fffbeb", label: "THIS WEEK"     } :
                          { color: "#16a34a", bg: "#f0fdf4", label: "ACTIVE"        };

  return (
    <div style={{
      flex: "1 1 180px", padding: "14px 16px", borderRadius: 10,
      backgroundColor: urgency.bg,
      border: `1px solid ${urgency.color}33`,
      borderTop: `4px solid ${urgency.color}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}>
      <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
        📅 Expiry Date
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: urgency.color }}>
        {expiry_display}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 5,
          backgroundColor: urgency.color + "22", color: urgency.color,
        }}>
          {urgency.label}
        </span>
        <span style={{ fontSize: 12, color: "#6b7280" }}>
          {days_to_expiry} day{days_to_expiry !== 1 ? "s" : ""} left
        </span>
      </div>
    </div>
  );
};

// ============================================================
// TRAFFIC LIGHT
// ============================================================

const TrafficLight = ({ signal }) => {
  if (!signal) return null;
  const { signal: lvl, color, message } = signal;
  const lights = [
    { id: "RED",    bg: "#ef4444" },
    { id: "YELLOW", bg: "#f59e0b" },
    { id: "GREEN",  bg: "#22c55e" },
  ];
  return (
    <div style={{
      flex: "0 0 auto", minWidth: 150, padding: "14px 16px",
      border: "1px solid #e5e7eb", borderRadius: 10, backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ alignSelf: "flex-start", fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Risk Signal</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, backgroundColor: "#1f2937", padding: "10px 14px", borderRadius: 12 }}>
        {lights.map(l => (
          <div key={l.id} style={{
            width: 24, height: 24, borderRadius: "50%",
            backgroundColor: lvl === l.id ? l.bg : "#374151",
            boxShadow: lvl === l.id ? `0 0 10px ${l.bg}, 0 0 20px ${l.bg}55` : "none",
            transition: "box-shadow 0.3s",
          }} />
        ))}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color, marginTop: 8 }}>{lvl}</div>
      <div style={{ fontSize: 11, color: "#6b7280", textAlign: "center", marginTop: 4, maxWidth: 130 }}>{message}</div>
    </div>
  );
};

// ============================================================
// IV ANALYSIS PANEL (Step 3)
// ============================================================

const IVAnalysisPanel = ({ iv_analysis }) => {
  if (!iv_analysis) return null;
  const level   = iv_analysis.level || "Normal";
  const style   = IV_LEVEL_STYLE[level] || IV_LEVEL_STYLE.Normal;

  return (
    <div style={{
      padding: "14px 18px",
      border: `1px solid ${style.color}44`,
      borderLeft: `5px solid ${style.color}`,
      borderRadius: 10,
      backgroundColor: style.bg,
      marginBottom: 24,
    }}>
      <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>
        IV Analysis
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: style.color, marginBottom: 4 }}>
        {style.emoji} IV Level: {level}
      </div>
      {iv_analysis.suggestion && (
        <div style={{ fontSize: 13, color: "#374151" }}>{iv_analysis.suggestion}</div>
      )}
    </div>
  );
};

// ============================================================
// GREEKS TABLE — CE + PE side by side (like Zerodha / Opstra)
// ============================================================

const GreeksTable = ({ ce, pe, source }) => {
  const sourceLabel =
    source === "smartapi" ? "🟢 Live (SmartAPI)" : "🟡 Model (Estimated)";

  const rows = [
    { key: "delta", label: "Delta" },
    { key: "gamma", label: "Gamma" },
    { key: "theta", label: "Theta" },
    { key: "vega",  label: "Vega"  },
    { key: "iv",    label: "IV (%)" },
  ];

  const fmtNum = (v) =>
    v !== undefined && v !== null ? Number(v).toFixed(4) : "—";

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
        Source: <strong>{sourceLabel}</strong>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", fontSize: 14, minWidth: 320 }}>
          <thead>
            <tr>
              <th style={TH}></th>
              <th style={{ ...TH, color: "#92400e", backgroundColor: "#fef9c3" }}>CE</th>
              <th style={{ ...TH, color: "#15803d", backgroundColor: "#f0fdf4" }}>PE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, label }, i) => (
              <tr key={key} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ ...TD2, fontWeight: 600, color: "#374151" }}>{label}</td>
                <td style={{ ...TD2, color: "#92400e", fontWeight: 700 }}>
                  {fmtNum(ce?.[key])}
                </td>
                <td style={{ ...TD2, color: "#15803d", fontWeight: 700 }}>
                  {fmtNum(pe?.[key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TH  = { padding: "10px 20px", textAlign: "center", fontWeight: 700, fontSize: 13, border: "1px solid #e5e7eb" };
const TD2 = { padding: "9px 20px",  textAlign: "center", border: "1px solid #f3f4f6" };

// ============================================================
// GREEKS PANEL — cards view (fallback / Black-Scholes)
// ============================================================

const GreeksPanel = ({ greeks, ce_greeks, pe_greeks, greeks_source }) => {
  const sourceLabel =
    greeks_source === "smartapi" ? "🟢 Live from SmartAPI" : "🟡 Black-Scholes (fallback)";

  const displayCE = ce_greeks || greeks;

  const greekItems = [
    { key: "delta", label: "Δ Delta", desc: "Direction sensitivity",  color: "#2563eb" },
    { key: "gamma", label: "Γ Gamma", desc: "Delta change rate",      color: "#7c3aed" },
    { key: "theta", label: "Θ Theta", desc: "Time decay / day",       color: "#dc2626" },
    { key: "vega",  label: "ν Vega",  desc: "IV sensitivity (1%)",    color: "#059669" },
  ];

  return (
    <div>
      {/* Source badge */}
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
        Source: <strong>{sourceLabel}</strong>
        {ce_greeks?.iv && (
          <span style={{ marginLeft: 12, padding: "2px 8px", borderRadius: 5, backgroundColor: "#eff6ff", color: "#1d4ed8", fontWeight: 700, fontSize: 12 }}>
            IV: {ce_greeks.iv}%
          </span>
        )}
      </div>

      {/* CE + PE split if real data available */}
      {ce_greeks && pe_greeks ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* CE Greeks */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", backgroundColor: "#fef9c3", padding: "4px 10px", borderRadius: 6, marginBottom: 8, display: "inline-block" }}>
              CALL (CE){ce_greeks.strike ? ` — Strike ${ce_greeks.strike}` : ""}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {greekItems.map(({ key, label, desc, color }) => (
                <div key={key} style={{ flex: "1 1 100px", padding: "12px", border: "1px solid #e5e7eb", borderTop: `3px solid ${color}`, borderRadius: 8, backgroundColor: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color }}>
                    {ce_greeks[key] !== undefined ? Number(ce_greeks[key]).toFixed(4) : "—"}
                  </div>
                  <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PE Greeks */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#15803d", backgroundColor: "#f0fdf4", padding: "4px 10px", borderRadius: 6, marginBottom: 8, display: "inline-block" }}>
              PUT (PE){pe_greeks.strike ? ` — Strike ${pe_greeks.strike}` : ""}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {greekItems.map(({ key, label, desc, color }) => (
                <div key={key} style={{ flex: "1 1 100px", padding: "12px", border: "1px solid #e5e7eb", borderTop: `3px solid ${color}`, borderRadius: 8, backgroundColor: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color }}>
                    {pe_greeks[key] !== undefined ? Number(pe_greeks[key]).toFixed(4) : "—"}
                  </div>
                  <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Single row fallback (Black-Scholes) */
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {greekItems.map(({ key, label, desc, color }) => (
            <div key={key} style={{ flex: "1 1 130px", padding: "14px 16px", border: "1px solid #e5e7eb", borderTop: `4px solid ${color}`, borderRadius: 10, backgroundColor: "#fff", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color, marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color }}>
                {displayCE?.[key] !== undefined ? Number(displayCE[key]).toFixed(4) : "—"}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>{desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================
// PAYOFF CHART
// ============================================================

const PayoffChart = ({ payoff, atm }) => {
  if (!payoff || payoff.length === 0) return null;
  const data  = payoff.map(d => ({ price: d.price ?? d.spot ?? 0, pl: d.pl ?? d.pnl ?? 0 }));
  const maxPL = Math.max(...data.map(d => d.pl));
  const minPL = Math.min(...data.map(d => d.pl));

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const pl = payload[0]?.value;
    return (
      <div style={{ background: "#1f2937", padding: "8px 14px", borderRadius: 8, border: "1px solid #374151", fontSize: 13 }}>
        <div style={{ color: "#9ca3af" }}>Price: <strong style={{ color: "#fff" }}>{Number(label).toLocaleString("en-IN")}</strong></div>
        <div style={{ color: pl >= 0 ? "#4ade80" : "#f87171" }}>
          P&L: <strong>₹{Number(pl).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 16, fontSize: 13, marginBottom: 10 }}>
        <span>Max Profit: <strong style={{ color: "#16a34a" }}>₹{maxPL.toLocaleString("en-IN")}</strong></span>
        <span style={{ color: "#d1d5db" }}>|</span>
        <span>Max Loss: <strong style={{ color: "#dc2626" }}>₹{Math.abs(minPL).toLocaleString("en-IN")}</strong></span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="price" tick={{ fontSize: 11, fill: "#6b7280" }} tickFormatter={v => Number(v).toLocaleString("en-IN")} />
          <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} tickFormatter={v => `₹${Number(v).toLocaleString("en-IN")}`} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="4 4" />
          {atm && <ReferenceLine x={atm} stroke="#7c3aed" strokeDasharray="4 4" label={{ value: "ATM", position: "top", fontSize: 11, fill: "#7c3aed" }} />}
          <Area type="monotone" dataKey="pl" stroke="#22c55e" strokeWidth={2.5} fill="url(#pg)" dot={false} activeDot={{ r: 5, fill: "#22c55e" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// ============================================================
// LEGS TABLE
// ============================================================

const LegsTable = ({ legs }) => {
  if (!legs || legs.length === 0) return null;
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {["#", "Action", "Type", "Strike", "LTP (₹)", "Lots", "Lot Size", "Total (₹)"].map(h => (
              <th key={h} style={{ backgroundColor: "#f3f4f6", padding: "9px 12px", textAlign: "left", fontWeight: 600, fontSize: 12, color: "#374151", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {legs.map((leg, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
              <td style={TD}>{i + 1}</td>
              <td style={TD}>
                <span style={{ padding: "2px 10px", borderRadius: 5, fontWeight: 700, fontSize: 12, backgroundColor: leg.action === "BUY" ? "#dbeafe" : "#fce7f3", color: leg.action === "BUY" ? "#1d4ed8" : "#be185d" }}>
                  {leg.action}
                </span>
              </td>
              <td style={TD}>
                <span style={{ padding: "2px 10px", borderRadius: 5, fontWeight: 700, fontSize: 12, backgroundColor: leg.type === "CE" ? "#fef9c3" : "#f0fdf4", color: leg.type === "CE" ? "#92400e" : "#15803d" }}>
                  {leg.type}
                </span>
              </td>
              <td style={{ ...TD, fontWeight: 600 }}>{leg.strike}</td>
              <td style={TD}>{leg.display_price?.toFixed ? leg.display_price.toFixed(2) : leg.ltp}</td>
              <td style={TD}>{leg.lots}</td>
              <td style={TD}>{leg.lot_size}</td>
              <td style={{ ...TD, fontWeight: 700, color: leg.cost < 0 ? "#16a34a" : "#dc2626" }}>
                {leg.cost < 0 ? "+" : "−"} ₹{Math.abs(leg.cost ?? 0).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TD = { padding: "9px 12px", borderBottom: "1px solid #f3f4f6", color: "#111827", whiteSpace: "nowrap" };
const SH = { fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 12, marginTop: 0 };

// ============================================================
// MAIN PAGE
// ============================================================

function OptionTrading() {
  const [symbol,     setSymbol]     = useState("NIFTY");
  const [capital,    setCapital]    = useState("");
  const [data,       setData]       = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [elapsed,    setElapsed]    = useState(0);
  const [expiry,     setExpiry]     = useState("");
  const [expiryList, setExpiryList] = useState([]);

  // Loading timer
  useEffect(() => {
    if (!loading) { setElapsed(0); return; }
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [loading]);

  // Load expiries when symbol changes
  useEffect(() => {
    const loadExpiries = async () => {
      try {
        const list = await fetchExpiries(symbol);
        console.log("EXPIRIES:", list);
        setExpiryList(list || []);
        if (list && list.length > 0) {
          setExpiry(list[0]);
        } else {
          setExpiry("");
        }
      } catch (e) {
        console.error("Failed to load expiries", e);
        setExpiryList([]);
        setExpiry("");
      }
    };
    loadExpiries();
  }, [symbol]);

  const handleAnalyze = async () => {
    const cap = Number(capital);
    if (!capital || cap < 5000) {
      setError("Minimum ₹5,000 required for F&O trading.");
      return;
    }
    if (!expiry) {
      setError("Please select an expiry.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    const result = await fetchSmartRisk(symbol, cap, expiry);
    console.log("RESULT:", result);

    if (result?.error) {
      setError(result.message || "Backend error. Check Django server.");
    } else {
      setData(result);
    }
    setLoading(false);
  };

  // ── Derived values
  const strategy    = data?.strategy;
  const capData     = data?.capital_data;
  const investorLvl = capData?.investor_level;
  const badge       = investorLvl ? (INVESTOR_STYLE[investorLvl.level] || INVESTOR_STYLE.BEGINNER) : null;
  const riskStyle   = strategy ? (RISK_COLOR[strategy.risk] || RISK_COLOR.MEDIUM) : null;
  const atm         = data?.atm_price ?? data?.atm_used ?? null;

  // ── Greeks — support both new and old backend structure
  const ce_greeks     = data?.greeks?.ce  ?? data?.ce_greeks  ?? null;
  const pe_greeks     = data?.greeks?.pe  ?? data?.pe_greeks  ?? null;
  const greeks_source = data?.greeks?.source ?? data?.greeks_source ?? "fallback";
  const greeks_flat   = data?.greeks_flat ?? data?.greeks ?? {};

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", fontFamily: "system-ui, sans-serif" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#111827" }}>
          📊 Option Trading — Smart Risk Engine
        </h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>
          Capital-based strategy · Real Greeks · Payoff · Risk signal · Live Expiry
        </p>
      </div>

      {/* INPUT ROW */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <select
          value={symbol}
          onChange={e => { setSymbol(e.target.value); setData(null); setError(""); }}
          disabled={loading}
          style={{ padding: "10px 14px", fontSize: 14, borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer" }}
        >
          <option value="NIFTY">NIFTY</option>
          <option value="BANKNIFTY">BANKNIFTY</option>
          <option value="FINNIFTY">FINNIFTY</option>
        </select>

        {/* Expiry Dropdown */}
        <select
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
          disabled={loading || expiryList.length === 0}
          style={{ padding: "10px 14px", fontSize: 14, borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer" }}
        >
          <option value="">Select Expiry</option>
          {expiryList.map((exp, i) => (
            <option key={i} value={exp}>{exp}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter Capital (₹)"
          value={capital}
          disabled={loading}
          onChange={e => { setCapital(e.target.value); setError(""); setData(null); }}
          style={{ padding: "10px 14px", fontSize: 14, borderRadius: 8, border: "1px solid #d1d5db", width: 210 }}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !capital || Number(capital) < 5000 || !expiry}
          style={{
            padding: "10px 24px", fontSize: 14, fontWeight: 600, borderRadius: 8,
            border: "none", backgroundColor: "#1e40af", color: "#fff",
            opacity: loading || !capital || Number(capital) < 5000 || !expiry ? 0.5 : 1,
            cursor:  loading || !capital || Number(capital) < 5000 || !expiry ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
          }}
        >
          {loading ? `⏳ Analyzing... ${elapsed}s` : "🔍 Analyze"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div style={{ padding: "12px 16px", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, marginBottom: 16 }}>
          <p style={{ color: "#dc2626", fontWeight: 600, margin: 0 }}>⚠ {error}</p>
        </div>
      )}

      {/* LOADING */}
      {loading && <LoadingPanel elapsed={elapsed} />}

      {/* RESULTS */}
      {data && (
        <>
          {/* ROW 1: Investor + Signal + Expiry + Trend + ATM + Spot */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>

            {badge && investorLvl && (
              <div style={{ flex: "1 1 180px", padding: "14px 16px", border: "1px solid #e5e7eb", borderLeft: `5px solid ${badge.color}`, borderRadius: 10, backgroundColor: badge.bg, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Investor Level</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: badge.color }}>{badge.emoji} {investorLvl.level}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{investorLvl.message}</div>
              </div>
            )}

            <TrafficLight signal={data.traffic_signal} />

            <ExpiryCard
              expiry_display={data.expiry_display}
              days_to_expiry={data.days_to_expiry}
            />

            <Card label="Market Trend"           value={data.trend || "—"} sub={`IV: ${data.iv_percentile ?? "—"}%`} color="#1e40af" />
            <Card label={`ATM (${data.symbol})`} value={atm ?? "—"}        sub={`Lot: ${data.lot_size ?? "—"} units`} color="#7c3aed" />
            <Card label="Spot Price"             value={data.spot ?? "—"}  color="#111827" />
          </div>

          {/* STRATEGY BOX */}
          {strategy && (
            <div style={{ padding: "18px 22px", border: "2px solid #1e40af", borderRadius: 12, backgroundColor: "#eff6ff", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#1e3a8a" }}>{strategy.name}</span>
                {riskStyle && (
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 6, backgroundColor: riskStyle.bg, color: riskStyle.text }}>
                    {strategy.risk} RISK
                  </span>
                )}
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 6, backgroundColor: "#eff6ff", color: "#1d4ed8" }}>
                  {strategy.direction}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 6, backgroundColor: "#f3e8ff", color: "#6b21a8" }}>
                  {strategy.legs} LEG{strategy.legs > 1 ? "S" : ""}
                </span>
                {data.expiry_display && (
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 6, backgroundColor: "#f0fdf4", color: "#15803d" }}>
                    📅 {data.expiry_display} ({data.days_to_expiry}d)
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: "#374151", margin: "0 0 10px" }}>{strategy.description}</p>
              {data.net_premium && (
                <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14 }}>
                  <span style={{ fontWeight: 600, color: "#374151" }}>Net Premium:</span>
                  <span style={{ fontWeight: 700, fontSize: 16, color: data.net_premium.type === "CREDIT" ? "#16a34a" : "#dc2626" }}>
                    {data.net_premium.label}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STRATEGY LEGS */}
          {data.legs?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={SH}>Strategy Legs</h3>
              <LegsTable legs={data.legs} />
            </div>
          )}

          {/* ✅ GREEKS SECTION — Table (Step 2) + IV Analysis (Step 3) */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={SH}>Option Greeks</h3>

            {/* Table view — CE vs PE side by side (like Zerodha / Opstra) */}
            <GreeksTable
              ce={ce_greeks}
              pe={pe_greeks}
              source={greeks_source}
            />

            {/* Card view — detailed with labels (shown below table) */}
            <div style={{ marginTop: 20 }}>
              <GreeksPanel
                greeks={greeks_flat}
                ce_greeks={ce_greeks}
                pe_greeks={pe_greeks}
                greeks_source={greeks_source}
              />
            </div>
          </div>

          {/* ✅ IV ANALYSIS (Step 3) */}
          <IVAnalysisPanel iv_analysis={data.iv_analysis} />

          {/* PAYOFF CHART */}
          {data.payoff?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={SH}>Payoff Chart</h3>
              <PayoffChart payoff={data.payoff} atm={atm} />
            </div>
          )}

          {/* RISK SCORE */}
          {data.risk && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={SH}>Risk Score</h3>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 auto", padding: "14px 20px", border: "1px solid #e5e7eb", borderRadius: 10, backgroundColor: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Score</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: data.risk.signal === "RED" ? "#dc2626" : data.risk.signal === "YELLOW" ? "#d97706" : "#16a34a" }}>
                    {data.risk.risk_score}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>/ 100</div>
                </div>
                {data.risk.reasons?.map((r, i) => (
                  <div key={i} style={{ flex: "1 1 200px", padding: "14px 16px", border: "1px solid #fca5a5", borderRadius: 10, backgroundColor: "#fef2f2" }}>
                    <div style={{ fontSize: 13, color: "#991b1b" }}>⚠ {r}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SIGNAL ADVICE */}
          {data.signal_advice?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={SH}>Signal Advice</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.signal_advice.map((advice, i) => (
                  <div key={i} style={{ padding: "10px 14px", border: "1px solid #fde68a", borderRadius: 8, backgroundColor: "#fffbeb", fontSize: 13, color: "#92400e" }}>
                    {advice}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CAPITAL ANALYSIS */}
          {capData && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={SH}>Capital Analysis</h3>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
                <Card label="Total Capital"    value={fmt(capData.capital)}                                                      borderTop="#6b7280" />
                <Card label="Deploy (30%)"     value={fmt(capData.deploy_capital)}            color="#16a34a"                    borderTop="#16a34a" />
                <Card label="Reserve (70%)"    value={fmt(capData.reserve_capital)}           color="#2563eb"                    borderTop="#2563eb" />
                <Card label="Max Loss / Trade" value={fmt(capData.risk_per_trade?.max_loss_per_trade)} color="#dc2626"
                  sub={`${capData.risk_per_trade?.risk_pct}% risk rule`}                                                         borderTop="#dc2626" />
              </div>
            </div>
          )}

          {/* LOT AFFORDABILITY */}
          {capData?.lot_affordability?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={SH}>Lot Affordability</h3>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {capData.lot_affordability.map((item, i) => (
                  <div key={i} style={{ flex: "1 1 180px", padding: "14px 16px", border: "1px solid #e5e7eb", borderTop: `4px solid ${item.affordable ? "#16a34a" : "#dc2626"}`, borderRadius: 10, backgroundColor: "#fff" }}>
                    <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>{item.symbol}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{item.max_lots} lots</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{item.lot_size} units/lot · {fmt(item.cost_per_lot)}/lot</div>
                    <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: item.affordable ? "#16a34a" : "#dc2626" }}>
                      {item.affordable ? "✅ Affordable" : "❌ Not affordable"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ELIGIBLE STRATEGIES */}
          {capData?.eligible_strategies?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={SH}>All Eligible Strategies for Your Capital</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      {["Strategy", "Min Capital", "Risk", "Reward", "Description"].map(h => (
                        <th key={h} style={{ backgroundColor: "#f3f4f6", padding: "9px 12px", textAlign: "left", fontWeight: 600, fontSize: 12, color: "#374151", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {capData.eligible_strategies.map((s, i) => {
                      const rs = RISK_COLOR[s.risk] || RISK_COLOR.MEDIUM;
                      return (
                        <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f9fafb" : "#fff" }}>
                          <td style={{ ...TD, fontWeight: 600 }}>{s.strategy}</td>
                          <td style={TD}>{fmt(s.min_capital)}</td>
                          <td style={TD}>
                            <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, backgroundColor: rs.bg, color: rs.text }}>{s.risk}</span>
                          </td>
                          <td style={TD}>{s.reward}</td>
                          <td style={{ ...TD, color: "#6b7280", fontSize: 13 }}>{s.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </>
      )}
    </div>
  );
}

export default OptionTrading;