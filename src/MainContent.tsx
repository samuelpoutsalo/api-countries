import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

function MainContent() {
  const [selectedCountry, setSelectedCountry] = useState<String>("");
  const [selectedRegion, setSelectedRegion] = useState<String>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<Country[]>([]);
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
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setIsLoaded(true);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const result = items.filter(
      (item) =>
        (!selectedCountry ||
          item.name.common
            .toLowerCase()
            .includes(selectedCountry.toLowerCase())) &&
        (!selectedRegion ||
          item.region.toLowerCase() === selectedRegion.toLowerCase())
    );

    setCountries(result);
  }, [selectedRegion, selectedCountry, items]);

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
          <option value="americas">America</option>
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
