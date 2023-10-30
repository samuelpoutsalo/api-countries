import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import HeaderFile from "./HeaderFile";

type MainContentProps = {
  themeToggle: () => void;
};

function MainContent({ themeToggle }: MainContentProps) {
  const [selectedCountry, setSelectedCountry] = useState<String>("");
  const [selectedRegion, setSelectedRegion] = useState<String>("");
  const [countries, setCountries] = useState<Country[]>([]);
  console.log(selectedCountry + " " + selectedRegion);

  interface Country {
    ccn3: number;

    flags: {
      png: string;
    };
    name: {
      common: string;
    };
    population: number;
    region: string;
    subregion: string;
    currencies: {
      XPF: {
        name: string;
      };
    };
    capital: string;
    tld: string;
    borders: string;
  }

  useEffect(() => {
    if (selectedRegion === "" && selectedCountry === "") {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => {
          console.log(res.data);
          setCountries(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedCountry !== "") {
      axios
        .get("https://restcountries.com/v3.1/name/" + selectedCountry)
        .then((res) => {
          console.log(res.data);
          setCountries(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedRegion !== "") {
      axios
        .get("https://restcountries.com/v3.1/region/" + selectedRegion)
        .then((res) => {
          console.log(res);
          setCountries(res.data);
          themeToggle();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedRegion, selectedCountry]);

  return (
    <section className="main theme-background">
      <div className="main-bar">
        <div className="main-bar--input">
          <SearchIcon className="searchIcon" />
          <input
            id="country"
            className="main-input theme-elements theme-text main-bar--box smaller-input"
            placeholder="Search for a country..."
            onChange={(e) => setSelectedCountry(e.target.value)}
          />
        </div>
        <select
          id="region"
          className="main-filter theme-elements theme-text main-bar--box"
          defaultValue={""}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      <div className="main-content">
        {countries.map((post) => (
          <div
            className="card theme-elements default-cards"
            key={post.name.common}
          >
            <Link className="theme-text" to={`/alpha/${post.ccn3}`}>
              <img placeholder="flag" src={post.flags.png} />
              <div className="card-text-container card-text-container-default">
                <h2 className="card-country">{post.name.common}</h2>
                <p className="card-text">
                  Population: <span className="light">{post.population}</span>
                </p>
                <p className="card-text">
                  Region: <span className="light">{post.region}</span>
                </p>
                <p className="card-text">
                  Capital: <span className="light">{post.capital}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MainContent;
