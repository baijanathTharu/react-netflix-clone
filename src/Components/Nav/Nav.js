import React, { useState, useEffect } from "react";
import "./Nav.css";

import logo from "../../images/Netflix_logo.svg";
import menu from "../../images/menu.svg";

const Nav = () => {
  const [background, setBackground] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackground(true);
      } else {
        setBackground(false);
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`Nav ${background && "Nav__background"}`}>
      <img className="Nav__logo" src={logo} alt="Netflix Logo" />
      <img className="Nav__menu" src={menu} alt="menu" />
    </div>
  );
};

export default Nav;
