// ** React Imports
import React, {Fragment, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import './BadgeReward.css'
import BadgeComp from "../../components/BadgeComp/BadgeComp";
import RewardComp from "../../components/RewardComp/RewardComp";

const BadgeReward = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [active, setActive] = useState('badge')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Fragment>
            <Nav tabs style={{height: 'fit-content', justifyContent: 'center'}}>
                <NavItem>
                    <NavLink
                        active={active === 'badge'}
                        onClick={() => {
                            toggle('badge')
                        }}
                    >
                        Badges
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === 'reward'}
                        onClick={() => {
                            toggle('reward')
                        }}
                    >
                        Rewards
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === 'referral'}
                        onClick={() => {
                            toggle('referral')
                        }}
                    >
                        Referrals
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='badge'>
                    <BadgeComp/>
                </TabPane>
                <TabPane tabId='reward'>
                    <RewardComp/>
                </TabPane>
                <TabPane tabId='referral'>
                    <BadgeComp/>
                </TabPane>
            </TabContent>

        </Fragment>
    )
}

export default BadgeReward