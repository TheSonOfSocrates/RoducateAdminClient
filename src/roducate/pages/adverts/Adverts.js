// ** React Imports
import React, {Fragment, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import './Adverts.css'
import Ads from "../ads/Ads";
import AdsPricing from "../ads_price/AdsPricing";

const Adverts = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [active, setActive] = useState('ads')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Fragment>
            <div>
                <div className="d-flex justify-content-between mb-1 align-items-center">
                    <Nav tabs style={{margin: 'auto', height: 'fit-content'}}>
                        <NavItem>
                            <NavLink
                                active={active === 'ads'}
                                onClick={() => {
                                    toggle('ads')
                                }}
                            >
                                Ads
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'ads_pricing'}
                                onClick={() => {
                                    toggle('ads_pricing')
                                }}
                            >
                                Ads Pricing
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </div>

            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='ads'>
                    <Ads/>
                </TabPane>
                <TabPane tabId='ads_pricing'>
                    <AdsPricing/>
                </TabPane>
            </TabContent>
        </Fragment>
    )
}

export default Adverts