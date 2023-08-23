/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const MingcuteDownLine = ({ color = "#747474", className }) => {
  return (
    <svg
      className={`mingcute-down-line ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        clipRule="evenodd"
        d="M12.707 15.707C12.5195 15.8945 12.2652 15.9998 12 15.9998C11.7348 15.9998 11.4805 15.8945 11.293 15.707L5.636 10.05C5.54049 9.95775 5.46431 9.84741 5.4119 9.7254C5.35949 9.6034 5.3319 9.47218 5.33075 9.3394C5.3296 9.20662 5.3549 9.07494 5.40518 8.95205C5.45546 8.82915 5.52971 8.7175 5.62361 8.6236C5.7175 8.52971 5.82915 8.45546 5.95205 8.40518C6.07494 8.3549 6.20662 8.3296 6.3394 8.33075C6.47218 8.3319 6.6034 8.35949 6.7254 8.4119C6.84741 8.46431 6.95775 8.54049 7.05 8.636L12 13.586L16.95 8.636C17.1386 8.45384 17.3912 8.35305 17.6534 8.35533C17.9156 8.3576 18.1664 8.46277 18.3518 8.64818C18.5372 8.83359 18.6424 9.0844 18.6447 9.3466C18.647 9.6088 18.5462 9.8614 18.364 10.05L12.707 15.707V15.707Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

MingcuteDownLine.propTypes = {
  color: PropTypes.string,
};
