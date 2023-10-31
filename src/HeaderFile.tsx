import React, { useState, useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type MainContentProps = {
  themeToggle: () => void;
};

function HeaderFile({ themeToggle }: MainContentProps) {
  const [darkMode, setDarkMode] = useState<string>("enabled");

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "disabled") {
      localStorage.setItem("darkMode", "enabled");
      setDarkMode("enabled");
    } else {
      setDarkMode("disabled");
    }
    themeToggle();
  }, []);

  return (
    <section className="header">
      <div className="header--title theme-text"> Where in the world?</div>
      <div
        className="header--theme theme-text"
        id="theme-toggle-button"
        onClick={themeToggle}
      >
        <DarkModeIcon /> Change theme
      </div>
    </section>
  );
}
//
export default HeaderFile;
