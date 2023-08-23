/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Star90 = ({ color = "#FF4D49", opacity = "unset", className }) => {
  return (
    <svg
      className={`star-90 ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M10 14.3917L15.15 17.5L13.7833 11.6417L18.3333 7.69999L12.3417 7.19166L10 1.66666L7.65833 7.19166L1.66667 7.69999L6.21667 11.6417L4.85 17.5L10 14.3917Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

Star90.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.string,
};
