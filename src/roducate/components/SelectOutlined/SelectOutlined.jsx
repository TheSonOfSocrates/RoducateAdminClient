/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import {Arrowdropdown1} from "../../icons/Arrowdropdown1";
import {MingcuteDownLine} from "../../icons/MingcuteDownLine";
import {Removeredeye} from "../../icons/Removeredeye";
import "./style.css";

export const SelectOutlined = ({
                                   size,
                                   state,
                                   hasValue,
                                   prefix,
                                   helperText,
                                   className,
                                   labelClassName,
                                   text = "Label",
                                   valueClassName,
                                   text1 = "",
                               }) => {
    return (
        <div className={`select-outlined ${className}`}>
            <div className={`input ${state} helper-text-${helperText} ${size} has-value-${hasValue} prefix-${prefix}`}>
                {((!hasValue && state === "active") ||
                    (hasValue && !prefix) ||
                    (hasValue && prefix && state === "active") ||
                    (prefix && state === "disabled") ||
                    (prefix && state === "error") ||
                    (prefix && state === "inactive")) && (
                    <div className="label-container">
                        <div style={{overflow: 'hidden'}}
                             className={`label ${!helperText ? labelClassName : undefined}`}>{text}</div>
                    </div>
                )}

                <div className="div">
                    {prefix && (
                        <div className="adornment-start">
                            <Removeredeye className="instance-node"/>
                        </div>
                    )}

                    {((!hasValue && !helperText && !prefix && size === "medium" && state === "inactive") ||
                        (!hasValue && helperText && !prefix && state === "inactive") ||
                        (hasValue && helperText && !prefix && size === "medium" && state === "inactive") ||
                        (hasValue && !prefix && size === "small" && state === "inactive") ||
                        (!prefix && state === "active") ||
                        (!prefix && state === "disabled") ||
                        (!prefix && state === "error") ||
                        prefix) && (
                        <div
                            style={{overflow: 'hidden'}}
                            className={`value ${
                                (!hasValue && !helperText && !prefix && state === "active") ||
                                (!hasValue && !helperText && size === "small" && state === "inactive") ||
                                (hasValue && !helperText && !prefix)
                                    ? valueClassName
                                    : undefined
                            }`}
                        >
                            {hasValue && <span>{text1}</span>}

                            {((!hasValue && !prefix && state === "disabled") ||
                                (!hasValue && !prefix && state === "error") ||
                                (!hasValue && !prefix && state === "inactive")) && <span>{text}</span>}
                        </div>
                    )}

                    {((!hasValue && !helperText && !prefix && size === "medium" && state === "inactive") ||
                        (!hasValue && helperText && !prefix && state === "inactive") ||
                        (hasValue && helperText && !prefix && size === "medium" && state === "inactive") ||
                        (hasValue && !prefix && size === "small" && state === "inactive") ||
                        (!prefix && state === "active") ||
                        (!prefix && state === "disabled") ||
                        (!prefix && state === "error") ||
                        prefix) && (
                        <div className="arrow">
                            <Arrowdropdown1 className="instance-node"/>
                        </div>
                    )}

                    {((!hasValue && !helperText && !prefix && size === "small" && state === "inactive") ||
                        (hasValue && !helperText && !prefix && size === "medium" && state === "inactive")) && (
                        <>
                            <div style={{overflow: 'hidden'}}
                                 className={`value-2 ${hasValue ? valueClassName : undefined}`}>
                                {hasValue && <>{text1}</>}

                                {size === "small" && <>{text}</>}
                            </div>
                            <MingcuteDownLine className="instance-node" color="#747474"/>
                        </>
                    )}
                </div>
            </div>
            {helperText && (
                <div className="helper-text">
                    <div className={`helper-text-i state-2-${state}`}>Helper text</div>
                </div>
            )}
        </div>
    );
};

SelectOutlined.propTypes = {
    size: PropTypes.oneOf(["medium", "small"]),
    state: PropTypes.oneOf(["error", "inactive", "active", "disabled"]),
    hasValue: PropTypes.bool,
    prefix: PropTypes.bool,
    helperText: PropTypes.bool,
    text: PropTypes.string,
    text1: PropTypes.string,
};
