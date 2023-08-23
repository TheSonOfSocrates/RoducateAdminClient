// ** React Imports
import PropTypes from 'prop-types'

// ** Styles
import './OneMsg.css'

const OneMsg = props => {
    // ** Props
    const {
        msg,
        time,
        style
    } = props

    return (
        <div className="frame-5" style={{zIndex: 1, ...style}}>
            <div className="frame-4">
                <div className="text-wrapper-2">{msg}</div>
            </div>
            <div className="description-wrapper">
                <div className="description">{time}</div>
            </div>
        </div>
    )
}

export default OneMsg

// ** PropTypes
OneMsg.propTypes = {
    msg: PropTypes.string,
    time: PropTypes.string
}