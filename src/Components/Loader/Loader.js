import React from "react";
import "./Loader.css";

const Loader = ({ show }) => {
  const myLoader = show ? (
    <div className="Loader">
      <div className="Loader__image"></div>
    </div>
  ) : null;
  return myLoader;
};

export default Loader;
