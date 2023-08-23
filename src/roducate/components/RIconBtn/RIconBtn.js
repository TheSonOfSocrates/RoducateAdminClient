// ** React Imports
import PropTypes from 'prop-types'

// ** Styles
import './RIconBtn.css'

const RIconBtn = props => {
    // ** Props
    const {
        text,
        icon,
        onClick,
        style
    } = props

    return (
        <div className="riconbtn-wrapper" style={{...style}} onClick={onClick}>
            <span className="riconbtn-text-wrapper">{text}</span>
            {icon}
        </div>
    )
}

export default RIconBtn