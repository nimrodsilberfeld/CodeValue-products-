import React from "react";
import logoIcon from "../assets/svg/gorilla.svg";
const Header = () => {
  return (
    <div className="header">
      <h1>My Store</h1>
      <img src={logoIcon} />
    </div>
  );
};

export default Header;
