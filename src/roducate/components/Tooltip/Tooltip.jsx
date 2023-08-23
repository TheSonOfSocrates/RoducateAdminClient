/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import "./style.css";

export const Tooltip = ({
                            direction,
                            className,
                            arrowClassName,
                            myTooltipClassName,
                            text = "My Tooltip",
                            arrow = "https://generation-sessions.s3.amazonaws.com/368dfcb3539cdef08aac90063c8dc7d1/img/arrow-4.svg",
                        }) => {
    return (
        <div className={`rtooltip ${direction} ${className}`}>
            {["left", "up"].includes(direction) && (
                <img
                    className={`arrow ${arrowClassName}`}
                    alt="Arrow"
                    src={
                        direction === "left"
                            ? "https://generation-sessions.s3.amazonaws.com/368dfcb3539cdef08aac90063c8dc7d1/img/arrow-3.svg"
                            : "https://generation-sessions.s3.amazonaws.com/368dfcb3539cdef08aac90063c8dc7d1/img/arrow.svg"
                    }
                />
            )}

            {["left", "none", "up"].includes(direction) && (
                <div className="my-tooltip-wrapper">
                    <div className="my-tooltip">{text}</div>
                </div>
            )}

            {["down", "right"].includes(direction) && (
                <>
                    <div className={`div-wrapper ${arrowClassName}`}>
                        <div className={`text-wrapper ${myTooltipClassName}`}>{text}</div>
                    </div>
                    <img
                        className="img"
                        alt="Arrow"
                        src={
                            direction === "right"
                                ? arrow
                                : "https://generation-sessions.s3.amazonaws.com/368dfcb3539cdef08aac90063c8dc7d1/img/arrow-1.svg"
                        }
                    />
                </>
            )}
        </div>
    );
};

Tooltip.propTypes = {
    direction: PropTypes.oneOf(["none", "up", "right", "left", "down"]),
    text: PropTypes.string,
    arrow: PropTypes.string,
};
