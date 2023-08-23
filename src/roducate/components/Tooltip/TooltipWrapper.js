import "./TooltipWrapper.css";
import {Tooltip} from "./Tooltip";

export const TooltipWrapper = () => {

    const rightArrow = require(`@src/assets/images/svg/right-arrow.svg`).default

    return (
        <div className="tooltip-wrapper-box">
            <div className="tooltip-wrapper">
                <Tooltip
                    arrow={rightArrow}
                    arrowClassName="design-component-instance-node"
                    className="tooltip-instance"
                    direction="right"
                    myTooltipClassName="tooltip-2"
                    text="Super Admin"
                />
            </div>
        </div>
    );
};
