/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const MingcuteCellphoneLine = ({ color = "#FCB22B", className }) => {
  return (
    <svg
      className={`mingcute-cellphone-line ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M17 2C17.5046 1.99984 17.9906 2.19041 18.3605 2.5335C18.7305 2.87659 18.9572 3.34684 18.995 3.85L19 4V20C19.0002 20.5046 18.8096 20.9906 18.4665 21.3605C18.1234 21.7305 17.6532 21.9572 17.15 21.995L17 22H7C6.49542 22.0002 6.00943 21.8096 5.63945 21.4665C5.26947 21.1234 5.04284 20.6532 5.005 20.15L5 20V4C4.99984 3.49542 5.19041 3.00943 5.5335 2.63945C5.87659 2.26947 6.34684 2.04284 6.85 2.005L7 2H17ZM17 4H7V20H17V4ZM12.5 16C12.617 16 12.7304 16.041 12.8203 16.1159C12.9102 16.1908 12.9709 16.2949 12.992 16.41L13 16.5V17.5C13 17.617 12.959 17.7304 12.8841 17.8203C12.8092 17.9102 12.7051 17.9709 12.59 17.992L12.5 18H11.5C11.383 18 11.2696 17.959 11.1797 17.8841C11.0898 17.8092 11.0291 17.7051 11.008 17.59L11 17.5V16.5C11 16.383 11.041 16.2696 11.1159 16.1797C11.1908 16.0898 11.2949 16.0291 11.41 16.008L11.5 16H12.5Z"
        fill={color}
      />
    </svg>
  );
};

MingcuteCellphoneLine.propTypes = {
  color: PropTypes.string,
};