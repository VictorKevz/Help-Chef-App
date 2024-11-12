import React, { createContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home/Home";
export const ThemeAppContext = createContext();

function App() {
  const [isDark, setDark] = useState(true);
  return (
    <ThemeAppContext.Provider value={{ isDark, setDark }}>
      <main className={`outer-container ${!isDark && "light-body-bg"}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </ThemeAppContext.Provider>
  );
}

export default App;
