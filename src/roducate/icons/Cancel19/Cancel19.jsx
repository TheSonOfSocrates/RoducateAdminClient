/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Cancel19 = ({ color = "#6D788D", className }) => {
  return (
    <svg
      className={`cancel-19 ${className}`}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="g" opacity="0.7">
        <path
          className="path"
          d="M8 1.33333C4.31333 1.33333 1.33333 4.31333 1.33333 8C1.33333 11.6867 4.31333 14.6667 8 14.6667C11.6867 14.6667 14.6667 11.6867 14.6667 8C14.6667 4.31333 11.6867 1.33333 8 1.33333ZM11.3333 10.3933L10.3933 11.3333L8 8.94L5.60667 11.3333L4.66667 10.3933L7.06 8L4.66667 5.60667L5.60667 4.66667L8 7.06L10.3933 4.66667L11.3333 5.60667L8.94 8L11.3333 10.3933Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

Cancel19.propTypes = {
  color: PropTypes.string,
};
