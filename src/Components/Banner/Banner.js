import React, { useState, useEffect } from "react";
import "./Banner.css";

import axiosObj from "../../axios";
import requests from "../../request";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosObj.get(requests.fetchNetflixOriginals);
        setMovie(
          res.data.results[
            Math.floor(Math.random() * res.data.results.length - 1)
          ]
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="Banner__contents">
        <h1 className="Banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="Banner__buttons">
          <button className="Banner__button">Play</button>
          <button className="Banner__button">My List</button>
        </div>
        <h2 className="Banner__description">
          {truncate(movie?.overview, 150)}
        </h2>
      </div>
      <div className="Banner__fadeBottom"></div>
    </header>
  );
};

export default Banner;
