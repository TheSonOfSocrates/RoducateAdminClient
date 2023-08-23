// ** React Imports
// ** Custom Components

// ** Utils

// ** Store & Actions

// ** Third Party Components
import {UncontrolledDropdown} from 'reactstrap'

// ** Default Avatar Image
import {TooltipWrapper} from "../Tooltip/TooltipWrapper";

const TooltipDropdown = () => {

    return (
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
            <TooltipWrapper/>
        </UncontrolledDropdown>
    )
}

export default TooltipDropdown
