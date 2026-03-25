/**
 * App.js
 * Path: D:\FRONTEND\SMARTFIN\SRC\App.js
 */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home              from "./pages/Home";
import Dashboard         from "./pages/Dashboard";
import InvestmentPlanner from "./pages/InvestmentPlanner";
import OptionTrading     from "./pages/OptionTrading";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/dashboard"      element={<Dashboard />} />
        <Route path="/investment"     element={<InvestmentPlanner />} />
        <Route path="/option-trading" element={<OptionTrading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;