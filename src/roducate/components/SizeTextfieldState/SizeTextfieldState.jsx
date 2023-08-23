/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { MingcuteSearchLine } from "../../icons/MingcuteSearchLine";
import "./style.css";

export const SizeTextfieldState = ({ className }) => {
  return (
    <div className={`size-textfield-state ${className}`}>
      <MingcuteSearchLine className="mingcute-search-line" color="#8840E6" />
      <div className="search">Search</div>
    </div>
  );
};
