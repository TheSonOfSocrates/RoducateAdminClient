import "./SizeTextfieldStateWrapper.css";
import {SizeTextfieldState} from "./SizeTextfieldState";

export const SizeTextfieldStateWrapper = () => {
    return (
        <div className="box">
            <div className="textfield-outlined-wrapper">
                <SizeTextfieldState className="textfield-outlined" />
            </div>
        </div>
    );
};
