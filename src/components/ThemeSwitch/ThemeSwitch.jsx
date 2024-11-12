import React, { useContext } from "react";
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
  return (
    <div className={`toggle-container ${!isDark && "border-light"}`}>
      {!isDark && (
        <LightModeIcon
        fontSize="large"
        className={`toggle-icon ${!isDark && "light-text"}`}
      />
      )}
      <Switch
        checked={isDark}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        className="switch"
      />
      {isDark && (
        <DarkModeIcon
        fontSize="large"
        className={`toggle-icon ${!isDark && "light-text"}`}
      />
      )}
      
    </div>
  );
}

export default ThemeSwitch;
