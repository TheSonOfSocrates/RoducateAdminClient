/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Cancel13 = ({ color = "#4C4E64", opacity = "unset", className }) => {
  return (
    <svg
      className={`cancel-13 ${className}`}
      fill="none"
      height="22"
      viewBox="0 0 22 22"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M11 1.83333C5.93083 1.83333 1.83333 5.93083 1.83333 11C1.83333 16.0692 5.93083 20.1667 11 20.1667C16.0692 20.1667 20.1667 16.0692 20.1667 11C20.1667 5.93083 16.0692 1.83333 11 1.83333ZM15.5833 14.2908L14.2908 15.5833L11 12.2925L7.70917 15.5833L6.41667 14.2908L9.7075 11L6.41667 7.70917L7.70917 6.41667L11 9.7075L14.2908 6.41667L15.5833 7.70917L12.2925 11L15.5833 14.2908Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

Cancel13.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.string,
};
