import "./style.css";
import {LightButton} from "./LightButton";
import "./LightButtonWrapper.css";

export const LightButtonWrapper = () => {
    return (
        <div className="box">
            <div className="frame-wrapper">
                <div className="frame">
                    <LightButton marketingAutomationClassName="light-button-instance" property1="default" text="Login" />
                </div>
            </div>
        </div>
    );
};