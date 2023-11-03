import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ExtraContent() {
  const [countries, setCountries] = useState<Country | null>(null);
  const { ccn3 } = useParams();

  interface Country {
    flags: {
      png: string;
    };
    name: {
      common: string;
      nativeName: {
        [nativeCode: string]: {
          common: string;
        };
      };
    };
    population: number;
    region: string;
    subregion: string;
    currencies: {
      [currencyCode: string]: {
        name: string;
      };
    };
    capital: string;
    tld: string;
    borders: {
      [bordersCode: string]: string;
    };
    languages: {
      [languageCode: string]: string;
    };
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/alpha/" + ccn3)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCountries(res.data[0]);
        } else {
          console.log("No valid data");
        }
      })
      .catch((err) => {
        console.log("API Request ERROR:", err);
      });
  }, [ccn3]);

  return (
    <section className="main theme-background">
      <div className="main-bar">
        <Link to={"/"}>
          <button className="main-input theme-elements theme-text main-bar--box back-btn">
            <ArrowBackIcon className="arrowIcon" />
            Back
          </button>
        </Link>
      </div>
      <div className="extra">
        {countries ? ( // Check if countries is not null
          <div className="extra-content" key={countries.name.common}>
            <div className="extra-image">
              <img
                placeholder="flag"
                className="extra-flag"
                src={countries.flags.png}
              />
            </div>
            <div className="extra-text-container extra-text-container-default">
              <h1 className="extra-h1">{countries.name.common}</h1>{" "}
              <div className="extra-information-1-and-2">
                <div className="extra-information-1">
                  <p className="extra-text">
                    Native Name: &nbsp;
                    <span>
                      {Object.keys(countries.name.nativeName).map(
                        (nativeCode, index) =>
                          index === 0 ? (
                            <span key={nativeCode} className="extra-light">
                              {countries.name.nativeName[nativeCode].common}
                            </span>
                          ) : null
                      )}
                    </span>
                  </p>
                  <p className="extra-text">
                    Population: &nbsp;
                    <span className="extra-light">{countries.population}</span>
                  </p>
                  <p className="extra-text">
                    Region:{" "}
                    <span className="extra-light">{countries.region}</span>
                  </p>
                  <p className="extra-text">
                    Sub Region:{" "}
                    <span className="extra-light">{countries.subregion}</span>
                  </p>
                  <p className="extra-text">
                    Capital:{" "}
                    <span className="extra-light">{countries.capital}</span>
                  </p>
                </div>
                <div className="extra-information-2">
                  <p className="extra-text">
                    Top Level Domain:{" "}
                    <span className="extra-light">{countries.tld}</span>
                  </p>
                  <p className="extra-text">
                    Currencies: &nbsp;
                    <span>
                      {Object.keys(countries.currencies).map((currencyCode) => (
                        <span className="extra-light" key={currencyCode}>
                          {countries.currencies[currencyCode].name}
                        </span>
                      ))}
                    </span>
                  </p>

                  <p className="extra-text">
                    Languages: &nbsp;
                    <span className="extra-light">
                      {Object.keys(countries.languages)
                        .map(
                          (languageCode) => countries.languages[languageCode]
                        )
                        .join(", ")}
                    </span>
                  </p>
                </div>
              </div>
              <div className="extra-information-3">
                {countries.borders ? (
                  <p className="extra-text country-Container">
                    Border Countries: &nbsp;
                    <span className="extra-light border-countries">
                      {Object.keys(countries.borders).map((borderCode) => (
                        <span
                          key={borderCode}
                          className="border-country theme-elements theme-text"
                        >
                          {countries.borders[borderCode]}
                        </span>
                      ))}
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
//
export default ExtraContent;
