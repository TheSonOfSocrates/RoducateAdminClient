/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import {MingcuteLivePhotoLine1} from "../../icons/MingcuteLivePhotoLine1";
import {MingcuteRightDot} from "../MingcuteRightDot";
import "./style.css";

export const PropertyIcon = ({
                                 onClick,
                                 className,
                                 override = <MingcuteRightDot className="mingcute-right-dot-3"/>,
                                 text = "Create subject name, add quick assessment and add subject topic.",
                                 icon = <MingcuteLivePhotoLine1 className="mingcute-live-photo"/>,
                                 text1 = "Subjects",
                             }) => {
    return (
        <div onClick={onClick} className={`property-icon ${className}`}>
            <div className="frame">
                {override}
                <div className="text-container">
                    <div className="subjects">{text1}</div>
                    <span className="create-subject-name">{text}</span>
                </div>
            </div>
            {icon}
        </div>
    );
};

PropertyIcon.propTypes = {
    text: PropTypes.string,
    text1: PropTypes.string,
};
