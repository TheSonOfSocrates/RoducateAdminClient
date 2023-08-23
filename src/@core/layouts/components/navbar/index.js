// ** React Imports
import {Fragment} from 'react'

// ** Dropdowns Imports
import UserDropdown from './UserDropdown'
import NotificationDropdown from './NotificationDropdown'

// ** Custom Components
import NavbarBookmarks from './NavbarBookmarks'

// ** Third Party Components
import {Moon, Sun} from 'react-feather'
import {TotalUsers} from "../../../../roducate/components/TotalUsers";
import TooltipDropdown from "../../../../roducate/components/TooltipDropdown/TooltipDropdown";

const ThemeNavbar = props => {
    // ** Props
    const {skin, setSkin, setMenuVisibility} = props

    // ** Function to toggle Theme (Light/Dark)
    const ThemeToggler = () => {
        if (skin === 'dark') {
            return <Sun className='ficon' onClick={() => setSkin('light')}/>
        } else {
            return <Moon className='ficon' onClick={() => setSkin('dark')}/>
        }
    }

    return (
        <Fragment>
            <div className="d-flex" style={{margin: 'auto'}}>
                <div className='bookmark-wrapper d-flex align-items-center' style={{marginRight: 30}}>
                    <NavbarBookmarks setMenuVisibility={setMenuVisibility}/>
                </div>

                <TotalUsers/>
            </div>

            <ul className='nav navbar-nav align-items-center ml-auto'>
                {/*<IntlDropdown />*/}
                {/*<NavItem className='d-none d-lg-block'>*/}
                {/*  <NavLink className='nav-link-style'>*/}
                {/*    <ThemeToggler />*/}
                {/*  </NavLink>*/}
                {/*</NavItem>*/}
                {/*<NavbarSearch />*/}
                {/*<CartDropdown />*/}
                <NotificationDropdown/>
                <TooltipDropdown/>
                <UserDropdown/>
            </ul>
        </Fragment>
    )
}

export default ThemeNavbar
