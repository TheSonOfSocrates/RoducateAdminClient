import "./SelectOutlinedWrapper.css";
import {SelectOutlined} from "./SelectOutlined";

export const SelectOutlinedWrapper = ({onClick, text, text1}) => {
  return (
    <div className="SelectOutlined-box" onClick={onClick} style={{marginBottom: 1}}>
      <div className="select-outlined-wrapper">
        <SelectOutlined
          className="select-outlined-instance"
          hasValue
          helperText={false}
          labelClassName="design-component-instance-node"
          prefix={false}
          size="medium"
          state="inactive"
          text={text}
          text1={text1}
          valueClassName="select-outlined-2"
        />
      </div>
    </div>
  );
};
