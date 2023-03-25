import "./App.css";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CountryDetail from "./components/CountryDetail/CountryDetail";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* {location.pathname !== "/" && <Navbar />} */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/countries/:id" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;
