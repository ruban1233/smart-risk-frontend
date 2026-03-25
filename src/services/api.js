import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 120000,   // 🔥 change 60s → 120s
  headers: { "Content-Type": "application/json" },
});

export const fetchSmartRisk = async (symbol, capital) => {
  try {
    const res = await api.get("smartrisk/", { params: { symbol, capital } });
    console.log("SmartRisk RAW:", res.data);
    if (!res.data || Object.keys(res.data).length === 0) {
      return { error: true, message: "Empty response from backend." };
    }
    return res.data;
  } catch (err) {
    console.error("SmartRisk Error:", err.message);
    if (err.code === "ECONNABORTED") {
      return { error: true, message: "Server took too long. Backend is fetching live data — please wait and try again." };
    }
    if (err.code === "ERR_NETWORK") {
      return { error: true, message: "Cannot connect to Django. Is server running on port 8000?" };
    }
    if (err.response) {
      return { error: true, message: `Server error ${err.response.status}: ${JSON.stringify(err.response.data)}` };
    }
    return { error: true, message: err.message };
  }
};

export const fetchInvestmentPlanner = async (capital) => {
  try {
    const res = await api.get("investment-planner/", { params: { capital } });
    const raw = res.data;
    const plan = raw?.investment_plan || raw?.plan || raw?.data || raw || {};
    return { investment_plan: plan };
  } catch (err) {
    console.error("InvestmentPlanner Error:", err);
    return { investment_plan: {} };
  }
};

export const fetchMarketSentiment = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("market-sentiment/", { params: { symbol } });
    return res.data || {};
  } catch (err) {
    return { error: true };
  }
};

export const fetchOptionChain = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("full-option-chain/", { params: { symbol } });
    return res.data || {};
  } catch (err) {
    return { error: true };
  }
};

export const fetchPayoff = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("payoff/", { params: { symbol } });
    return res.data || {};
  } catch (err) {
    return { error: true };
  }
};

export default api;