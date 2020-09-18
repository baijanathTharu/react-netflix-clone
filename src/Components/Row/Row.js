import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import Loader from "../Loader/Loader";

import "./Row.css";

import axiosObj from "../../axios";

const baseURL = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosObj.get(fetchUrl);
        // console.log(request);
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    marginLeft: "auto",
    playerVars: {
      autoplay: 1,
    },
  };

  const trailerHandler = (movie) => {
    setLoader(true);
    console.log(loader);
    if (trailerUrl) {
      // if video is already playing
      setTrailerUrl("");
      setLoader(false);
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          // getting the value of v from youtube url of the trailer
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.log("Error:>> ", error, "Movie Details::>> ", movie);
        });
    }
  };

  return (
    <div className="Row">
      <Loader show={loader} />
      <h2>{title}</h2>
      <div className="Row__posters">
        {movies.map((movie, id) => (
          <img
            loading="lazy"
            className={
              isLargeRow
                ? `Row__poster Row__larger`
                : `Row__poster Row__smaller`
            }
            key={id}
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.original_name}
            onClick={() => trailerHandler(movie)}
          />
        ))}
      </div>
      <div className="Row__youtube">
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
