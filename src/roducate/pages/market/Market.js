// ** React Imports
import React, {Fragment, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import './Market.css'
import Sellers from "../sellers/Sellers";
import Category from "../category/Category";
import MarketRatingsCard from "../../components/MarketRatingsCard/MarketRatingsCard";
import MarketProductsCard from "../../components/MarketProductsCard/MarketProductsCard";
import MarketCustomerCard from "../../components/MarketCustomerCard/MarketCustomerCard";
import MarketOrderCard from "../../components/MarketOrderCard/MarketOrderCard";
import MarketProduct from "../market_products/MarketProduct";

const Market = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [active, setActive] = useState('sellers')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Fragment>
            <div className="row mb-2">
                <div className="col-3">
                    <MarketRatingsCard/>
                </div>
                <div className="col-3">
                    <MarketProductsCard/>
                </div>
                <div className="col-3">
                    <MarketCustomerCard/>
                </div>
                <div className="col-3">
                    <MarketOrderCard/>
                </div>
            </div>
            <div>
                <div className="d-flex justify-content-between mb-1 align-items-center">
                    <Nav tabs style={{margin: 'auto', height: 'fit-content'}}>
                        <NavItem>
                            <NavLink
                                active={active === 'sellers'}
                                onClick={() => {
                                    toggle('sellers')
                                }}
                            >
                                Sellers
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'products'}
                                onClick={() => {
                                    toggle('products')
                                }}
                            >
                                Products
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'categories'}
                                onClick={() => {
                                    toggle('categories')
                                }}
                            >
                                Categories
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </div>

            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='sellers'>
                    <Sellers/>
                </TabPane>
                <TabPane tabId='products'>
                    <MarketProduct/>
                </TabPane>
                <TabPane tabId='categories'>
                    <Category fetchData={active === 'categories'}/>
                </TabPane>
            </TabContent>
        </Fragment>
    )
}

export default Market