import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import CreateActivity from "./components/CreateActivity/CreateActivity";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/countries/:id" element={<CountryDetail />} />
        <Route path="/createActivity" element={<CreateActivity />} />
      </Routes>
    </div>
  );
}

export default App;
