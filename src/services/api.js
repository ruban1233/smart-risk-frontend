import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 120000,
  headers: { "Content-Type": "application/json" },
});

const handleApiError = (err, defaultMessage = "API error") => {
  console.error("API Error:", err?.message || err);
  if (err?.code === "ECONNABORTED") {
    return { error: true, message: "Server took too long." };
  }
  return { error: true, message: err?.message || defaultMessage };
};

export const fetchHealth = async () => {
  try {
    const res = await api.get("health/");
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchAngelLogin = async () => {
  try {
    const res = await api.get("angel-login/");
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchMarketStatus = async () => {
  try {
    const res = await api.get("market-status/");
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchLtp = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("ltp/", { params: { symbol } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchAtmStrike = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("atm-strike/", { params: { symbol } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchMarketSentiment = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("market-sentiment/", { params: { symbol } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchOptionChainAnalysis = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("option-chain-analysis/", { params: { symbol } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchSmartRisk = async (symbol, capital, expiry = null) => {
  try {
    const params = { symbol, capital };

    // Only send expiry if explicitly provided
    if (expiry) {
      params.expiry = expiry;
    }

    const res = await api.get("smartrisk/", { params });

    console.log("SmartRisk RAW:", res.data);

    if (!res.data || Object.keys(res.data).length === 0) {
      return { error: true, message: "Empty response from backend." };
    }

    return res.data;
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchInvestmentPlanner = async (capital, risk = "low", symbol = "NIFTY") => {
  try {
    const res = await api.get("investment-planner/", { params: { capital, risk, symbol } });
    const raw = res.data;
    const plan = raw?.plan || raw?.investment_plan || {};
    return {
      capital: raw?.capital ?? capital,
      market_trend: raw?.market_trend ?? "Sideways",
      plan: plan,
      ...raw,
    };
  } catch (err) {
    return handleApiError(err, { capital, market_trend: "Sideways", plan: {} });
  }
};

export const fetchOptionDoctor = async (symbol = "NIFTY", strike = 0) => {
  try {
    const res = await api.get("option-doctor/", { params: { symbol, strike } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchIvTest = async (iv) => {
  try {
    const res = await api.get("iv-test/", { params: { iv } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchOptionGreeks = async (symbol = "NIFTY", expiry = null, monthly = false) => {
  try {
    const res = await api.get("option-greeks/", {
      params: { symbol, expiry, monthly: monthly ? "true" : "false" },
    });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchTestOptionPrice = async (symbol = "NIFTY", strike = 0) => {
  try {
    const res = await api.get("test-option-price/", { params: { symbol, strike } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};
export const fetchFullOptionChain = async (symbol = "NIFTY", expiry = null) => {
  try {
    const params = { symbol };

    if (expiry) {
      params.expiry = expiry;
    }

    const res = await api.get("full-option-chain/", { params });

    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};


export const fetchAiStrategy = async (symbol = "NIFTY", capital = 10000, iv = 15) => {
  try {
    const res = await api.get("ai-strategy/", { params: { symbol, capital, iv } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchPayoff = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("payoff/", { params: { symbol } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchExpiryInfo = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("expiry/", { params: { symbol } });
    return res.data || {};
  } catch (err) {
    return handleApiError(err);
  }
};
export const fetchExpiries = async (symbol = "NIFTY") => {
  try {
    const res = await api.get("expiries/", {
      params: { symbol }
    });
    return res.data.expiries || [];
  } catch (err) {
    console.error("Expiry fetch error:", err);
    return [];
  }
};

export default api;