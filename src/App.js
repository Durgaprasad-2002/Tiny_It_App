import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import URLDashboard from "./pages/URLSDashboard";
import URL_Main_page from "./pages/URL_Main_page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shorten" element={<URL_Main_page />} />
        <Route path="/analytics" element={<URLDashboard />} />
        <Route path="/analytic/:shortUrl" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
