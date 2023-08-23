/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const MingcuteComputerLine1 = ({ color = "black", className }) => {
  return (
    <svg
      className={`mingcute-computer-line-1 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M19 3.5C19.5304 3.5 20.0391 3.71071 20.4142 4.08579C20.7893 4.46086 21 4.96957 21 5.5V16.5C21 17.0304 20.7893 17.5391 20.4142 17.9142C20.0391 18.2893 19.5304 18.5 19 18.5H15V19.5H16C16.2652 19.5 16.5196 19.6054 16.7071 19.7929C16.8946 19.9804 17 20.2348 17 20.5C17 20.7652 16.8946 21.0196 16.7071 21.2071C16.5196 21.3946 16.2652 21.5 16 21.5H8C7.73478 21.5 7.48043 21.3946 7.29289 21.2071C7.10536 21.0196 7 20.7652 7 20.5C7 20.2348 7.10536 19.9804 7.29289 19.7929C7.48043 19.6054 7.73478 19.5 8 19.5H9V18.5H5C4.46957 18.5 3.96086 18.2893 3.58579 17.9142C3.21071 17.5391 3 17.0304 3 16.5V5.5C3 4.96957 3.21071 4.46086 3.58579 4.08579C3.96086 3.71071 4.46957 3.5 5 3.5H19ZM13 18.5H11V19.5H13V18.5ZM19 5.5H5V16.5H19V5.5Z"
        fill={color}
      />
    </svg>
  );
};

MingcuteComputerLine1.propTypes = {
  color: PropTypes.string,
};
