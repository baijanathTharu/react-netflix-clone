import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

import "./Row.css";

import axiosObj from "../../axios";

const baseURL = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");

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
    playerVars: {
      autoplay: 1,
    },
  };

  const trailerHandler = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          // getting the value of v from youtube url of the trailer
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) =>
          console.log("Error:>> ", error, "Movie Details::>> ", movie)
        );
    }
  };

  return (
    <div className="Row">
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
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
