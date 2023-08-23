// ** React Imports
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import {isUserLoggedIn} from '@utils'

// ** Store & Actions
import {useDispatch} from 'react-redux'
import {handleLogout} from '@store/actions/auth'

// ** Third Party Components
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import {CreditCard, HelpCircle, Power} from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import './UserDropdown.css'
import {showReportIssueModal} from "../../../../redux/actions/modal";

const UserDropdown = () => {
    // ** Store Vars
    const dispatch = useDispatch()

    // ** State
    const [userData, setUserData] = useState(null)

    //** ComponentDidMount
    useEffect(() => {
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])

    //** Vars
    const userAvatar = (userData && userData.avatar) || defaultAvatar

    return (
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
                <div className='user-nav d-sm-flex d-none'>
                    <span
                        className='mb-0 user-name font-weight-bold'>{(userData && `${`${userData['firstName']} ${userData['lastName']}`}`) || 'Error'}</span>
                    <span className='user-status'>{(userData && userData.role) || 'Admin'}</span>
                </div>
                <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${userAvatar}`} imgHeight='40' imgWidth='40'
                        status='online'/>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem tag={Link} to='/pages/pricing'>
                    <CreditCard size={14} className='mr-75' style={{color: 'black'}}/>
                    <span className='align-middle' style={{color: 'black'}}>Switch Account</span>
                </DropdownItem>
                <DropdownItem tag={Link} to='/pages/faq' onClick={(e) => {
                    e.preventDefault()
                    dispatch(showReportIssueModal(true))
                }}>
                    <HelpCircle size={14} className='mr-75' style={{color: 'black'}}/>
                    <span className='align-middle' style={{color: 'black'}}>Report Issue</span>
                </DropdownItem>
                <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
                    <Power size={14} className='mr-75' style={{color: '#FC7753'}}/>
                    <span className='align-middle' style={{color: '#FC7753'}}>Log out</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown
