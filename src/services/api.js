import axios from "axios";

// ------------------------------------
// AXIOS INSTANCE
// ------------------------------------
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000,
});

// ------------------------------------
// SMART RISK (TRADING / RISK DASHBOARD)
// ------------------------------------
export const fetchSmartRisk = async (symbol, capital) => {
  const response = await api.get(
    `/smartrisk/?symbol=${symbol}&capital=${capital}`
  );
  return response.data;
};

// ------------------------------------
// INVESTMENT PLANNER
// ------------------------------------
export const fetchInvestmentPlanner = async (capital) => {
  const response = await api.get(
    `/investment-planner/?capital=${capital}`
  );
  return response.data;
};

export default api;
