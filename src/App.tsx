import React, { useEffect, useState } from "react";
import "./App.scss";
import HeaderFile from "./HeaderFile";
import MainContent from "./MainContent";
import ExtraContent from "./ExtraContent";
import { Routes, Route, HashRouter } from "react-router-dom";

function App() {
  const [isActive, setActive] = useState<boolean>(false);
  localStorage.getItem("theme");

  useEffect(() => {
    themeToggle();
  }, []);

  const themeToggle = () => {
    console.log("has been run");
    var i = 0;
    setActive(!isActive);
    if (isActive === true) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div
      className={
        localStorage.getItem("theme") === "dark"
          ? "App light-theme"
          : "App dark-theme"
      }
    >
      <HashRouter>
        <HeaderFile themeToggle={themeToggle} />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/alpha/:ccn3" element={<ExtraContent />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

//

export default App;
