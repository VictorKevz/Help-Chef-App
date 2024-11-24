import React, { useContext,useEffect } from "react";
import Switch from "@mui/material/Switch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./themeSwitch.css";
import { ThemeAppContext } from "../../App";

function ThemeSwitch() {
  const { isDark, setDark } = useContext(ThemeAppContext);
  const handleChange = (event) => {
    const { checked } = event.target;
    setDark(checked);
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [
    isDark,
    
  ]);
  return (
    <div
  className={`toggle-container ${!isDark && "border-light"}`}
  role="switch"
  aria-checked={isDark}
  aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
>
  {!isDark && (
    <LightModeIcon
      fontSize="large"
      className={`toggle-icon ${!isDark && "light-text"}`}
      aria-hidden="true"
    />
  )}
  <Switch
    checked={isDark}
    onChange={handleChange}
    inputProps={{
      "aria-label": `Toggle between light and dark mode`,
      role: "switch",
    }}
    className="switch"
  />
  {isDark && (
    <DarkModeIcon
      fontSize="large"
      className={`toggle-icon ${!isDark && "light-text"}`}
      aria-hidden="true"
    />
  )}
</div>
  );
}

export default ThemeSwitch;
