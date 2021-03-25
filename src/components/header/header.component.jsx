import PropTypes from "prop-types";
import Button from "../button/button.component";
import { useState } from "react";
const Header = ({ title, handleChange, buttonChange }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        text={buttonChange ? "Close" : "Open"}
        color={buttonChange ? "Red" : "Green"}
        handleChange={handleChange}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// const headingStyle = {
//   color: "red",
//   backgroundColor: "black",
// };

export default Header;
