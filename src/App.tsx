import React, { useEffect, useState } from "react";
import "./App.scss";
import HeaderFile from "./HeaderFile";
import MainContent from "./MainContent";
import ExtraContent from "./ExtraContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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

  /*   Toggle theme between "dark" and "light"
   I figured out a much cleaner way to this after learning for quite a while, 
   but it works good enough for this practice project :d*/
  const themeToggle = () => {
    console.log("has been run");
    var i = 0;
    setDarkMode((prevMode) =>
      prevMode === "enabled" ? "disabled" : "enabled"
    );
    const themeBody = document.querySelector("body");
    const themeText = document.querySelector(".theme-text");
    const themeToggle = document.querySelector("#theme-toggle-button");
    const themeLink = document.querySelector(".theme-link");
    const themeElements = document.querySelector(".theme-elements");
    const themeBackground = document.querySelector(".theme-background");
    const themeHeader = document.querySelector(".header");
    const themeCardContainer = document.querySelectorAll(
      ".card-text-container-default"
    );
    const themelightCardContainer = document.querySelectorAll(
      ".card-text-container-light"
    );
    const themeCards = document.querySelectorAll(".default-cards");
    const themelightCards = document.querySelectorAll(".light-cards");

    const themeMainInput = document.querySelector(".main-input");
    const themeMainFilter = document.querySelector(".main-filter");
    const themeExtra = document.querySelector(".extra-text-container");
    if (darkMode != "enabled") {
      localStorage.setItem("darkMode", "enabled");
      console.log("light");
      if (themeBody) {
        themeBody.classList.add("light-background");
        themeBody.classList.remove("dark-background");
      }
      if (themeText) {
        themeText.classList.add("light-text");
        themeText.classList.remove("dark-text");
      }

      if (themeToggle) {
        themeToggle.classList.add("light-text");
        themeToggle.classList.remove("dark-text");
      }
      if (themeElements) {
        themeElements.classList.add("light-elements");
        themeElements.classList.remove("dark-elements");
      }
      if (themeBackground) {
        themeBackground.classList.add("light-background-double");
        themeBackground.classList.remove("dark-background-double");
      }
      if (themeHeader) {
        themeHeader.classList.add("light-elements");
        themeHeader.classList.remove("dark-elements");
      }
      if (themeMainInput) {
        themeMainInput.classList.add("pseudo-light");
        themeMainInput.classList.remove("pseudo-dark");
      }
      if (themeMainFilter) {
        themeMainFilter.classList.add("pseudo-light");
        themeMainFilter.classList.remove("pseudo-dark");
      }
      if (themeExtra) {
        themeExtra.classList.add("light-text");
        themeExtra.classList.remove("dark-text");
      }

      while (i < themeCards.length) {
        themeCards[i].classList.toggle("light-cards");
        themeCards[i].classList.toggle("default-cards");
        if (themeCardContainer) {
          themeCardContainer[i].classList.toggle("card-text-container-light");
          themeCardContainer[i].classList.toggle("card-text-container-default");
        }
        i++;
      }
    } else {
      console.log("dark");
      localStorage.setItem("darkMode", "disabled");
      if (themeBody) {
        themeBody.classList.remove("light-background");
        themeBody.classList.add("dark-background");
      }
      if (themeText) {
        themeText.classList.remove("light-text");
        themeText.classList.add("dark-text");
      }
      if (themeLink) {
        themeLink.classList.remove("light-text");
        themeLink.classList.add("dark-text");
      }
      if (themeToggle) {
        themeToggle.classList.remove("light-text");
        themeToggle.classList.add("dark-text");
      }
      if (themeElements) {
        themeElements.classList.remove("light-elements");
        themeElements.classList.add("dark-elements");
      }
      if (themeBackground) {
        themeBackground.classList.remove("light-background-double");
        themeBackground.classList.add("dark-background-double");
      }
      if (themeHeader) {
        themeHeader.classList.remove("light-elements");
        themeHeader.classList.add("dark-elements");
      }
      if (themeMainInput) {
        themeMainInput.classList.remove("pseudo-light");
        themeMainInput.classList.add("pseudo-dark");
      }
      if (themeMainFilter) {
        themeMainFilter.classList.remove("pseudo-light");
        themeMainFilter.classList.add("pseudo-dark");
      }
      if (themeExtra) {
        themeExtra.classList.remove("light-text");
        themeExtra.classList.add("dark-text");
      }
      while (i < themelightCards.length) {
        themelightCards[i].classList.toggle("light-cards");
        themelightCards[i].classList.toggle("default-cards");
        if (themelightCardContainer) {
          themelightCardContainer[i].classList.toggle(
            "card-text-container-light"
          );
          themelightCardContainer[i].classList.toggle(
            "card-text-container-default"
          );
        }
        i++;
      }
    }
  };

  const updateThemeToggle = () => {
    console.log("has been run");
    var i = 0;
    const themeCard = document.querySelectorAll(".card-text-container");
    const themeCards = document.querySelectorAll(".theme-cards");
    const defaultThemeCard = document.querySelectorAll(
      ".card-text-container-default"
    );

    if (darkMode == "disabled") {
      while (i < themeCards.length) {
        themeCards[i].classList.toggle("light-cards");
        themeCards[i].classList.toggle("default-cards");
        if (themeCard != null) {
          themeCard[i].classList.toggle("card-text-container-light");
          themeCard[i].classList.toggle("card-text-container-default");
        }
        i++;
      }
    } else if (darkMode == "enabled") {
      while (i < themeCards.length) {
        themeCards[i].classList.toggle("light-cards");
        themeCards[i].classList.toggle("default-cards");
        if (themeCard) {
          themeCard[i].classList.toggle("card-text-container-light");
          themeCard[i].classList.toggle("card-text-container-default");
        }
        i++;
      }
    }
  };

  return (
    <BrowserRouter>
      <HeaderFile themeToggle={themeToggle} />
      <Routes>
        <Route
          path="/"
          element={<MainContent themeToggle={updateThemeToggle} />}
        />
        <Route
          path="/alpha/:ccn3"
          element={<ExtraContent themeToggle={themeToggle} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
