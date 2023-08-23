// ** React Imports
import React, {Fragment, useEffect, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {Card, Nav, NavItem, NavLink} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import './Users.css'
import UsersComp from "../../components/UsersComp/UsersComp";
import {LineSeries, XYPlot} from "react-vis";
import "react-vis/dist/style.css";
import UserStatComp from "../../components/UserStatComp/UserStatComp";
import ActiveStatComp from "../../components/ActiveStatComp/ActiveStatComp";
import InActiveStatComp from "../../components/InActiveStatComp/InActiveStatComp";
import axios from "../../../utility/axios";

const Users = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [active, setActive] = useState('')

    const [overViewData, setOverViewData] = useState(undefined)

    useEffect(async () => {
        const res = await axios.get('/users/overview')
        if (res) {
            setOverViewData(res.data)
        }
    }, [])

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Fragment>
            <Card>
                <div className="row p-1">
                    <div className="col-3">
                        <div className="row d-flex justify-content-between">
                            <div className="col-8 d-flex justify-content-between pr-0">
                                <span className="user-type-cnt">Students</span>
                                <span className="user-type-count">{overViewData?.studentCount}</span>
                            </div>
                            <div className="col-4 pl-0">
                                <XYPlot
                                    width={120}
                                    style={{marginLeft: '-25px'}}
                                    height={55}>
                                    <LineSeries
                                        color="#8840E5"
                                        data={[
                                            {x: 0, y: 8},
                                            {x: 1, y: 5},
                                            {x: 2, y: 4},
                                            {x: 3, y: 9},
                                            {x: 4, y: 1},
                                            {x: 5, y: 7},
                                            {x: 6, y: 6},
                                            {x: 7, y: 3},
                                            {x: 8, y: 2},
                                            {x: 9, y: 0}
                                        ]}/>
                                </XYPlot>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between" style={{marginTop: '-20px'}}>
                            <div className="col-8 d-flex justify-content-between pr-0">
                                <span className="user-type-cnt">Teachers</span>
                                <span className="user-type-count">{overViewData?.teacherCount}</span>
                            </div>
                            <div className="col-4 pl-0">
                                <XYPlot
                                    width={120}
                                    style={{marginLeft: '-25px'}}
                                    height={55}>
                                    <LineSeries
                                        color="#8AFF6C"
                                        data={[
                                            {x: 0, y: 8},
                                            {x: 1, y: 5},
                                            {x: 2, y: 4},
                                            {x: 3, y: 9},
                                            {x: 4, y: 1},
                                            {x: 5, y: 7},
                                            {x: 6, y: 6},
                                            {x: 7, y: 3},
                                            {x: 8, y: 2},
                                            {x: 9, y: 0}
                                        ]}/>
                                </XYPlot>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between" style={{marginTop: '-20px'}}>
                            <div className="col-8 d-flex justify-content-between pr-0">
                                <span className="user-type-cnt">Parents</span>
                                <span className="user-type-count">{overViewData?.parentCount}</span>
                            </div>
                            <div className="col-4 pl-0">
                                <XYPlot
                                    width={120}
                                    style={{marginLeft: '-25px'}}
                                    height={55}>
                                    <LineSeries
                                        color="#8AFF6C"
                                        data={[
                                            {x: 0, y: 8},
                                            {x: 1, y: 5},
                                            {x: 2, y: 4},
                                            {x: 3, y: 9},
                                            {x: 4, y: 1},
                                            {x: 5, y: 7},
                                            {x: 6, y: 6},
                                            {x: 7, y: 3},
                                            {x: 8, y: 2},
                                            {x: 9, y: 0}
                                        ]}/>
                                </XYPlot>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between" style={{marginTop: '-20px'}}>
                            <div className="col-8 d-flex justify-content-between pr-0">
                                <span className="user-type-cnt">Counsellors</span>
                                <span className="user-type-count">{overViewData?.counsellorCount}</span>
                            </div>
                            <div className="col-4 pl-0">
                                <XYPlot
                                    width={120}
                                    style={{marginLeft: '-25px'}}
                                    height={55}>
                                    <LineSeries
                                        color="#FFD422"
                                        data={[
                                            {x: 0, y: 8},
                                            {x: 1, y: 5},
                                            {x: 2, y: 4},
                                            {x: 3, y: 9},
                                            {x: 4, y: 1},
                                            {x: 5, y: 7},
                                            {x: 6, y: 6},
                                            {x: 7, y: 3},
                                            {x: 8, y: 2},
                                            {x: 9, y: 0}
                                        ]}/>
                                </XYPlot>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between" style={{marginTop: '-20px'}}>
                            <div className="col-8 d-flex justify-content-between pr-0">
                                <span className="user-type-cnt">Sponsors</span>
                                <span className="user-type-count">{overViewData?.sponsorCount}</span>
                            </div>
                            <div className="col-4 pl-0">
                                <XYPlot
                                    width={120}
                                    style={{marginLeft: '-25px'}}
                                    height={55}>
                                    <LineSeries
                                        color="#FFD422"
                                        data={[
                                            {x: 0, y: 8},
                                            {x: 1, y: 5},
                                            {x: 2, y: 4},
                                            {x: 3, y: 9},
                                            {x: 4, y: 1},
                                            {x: 5, y: 7},
                                            {x: 6, y: 6},
                                            {x: 7, y: 3},
                                            {x: 8, y: 2},
                                            {x: 9, y: 0}
                                        ]}/>
                                </XYPlot>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <UserStatComp/>
                    </div>
                    <div className="col-3">
                        <ActiveStatComp/>
                    </div>
                    <div className="col-3">
                        <InActiveStatComp/>
                    </div>
                </div>
            </Card>
            <Nav tabs style={{height: 'fit-content', justifyContent: 'center'}}>
                <NavItem>
                    <NavLink
                        active={active === ''}
                        onClick={() => {
                            toggle('')
                        }}
                    >
                        All Users
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === 'student'}
                        onClick={() => {
                            toggle('student')
                        }}
                    >
                        Students
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === 'parent'}
                        onClick={() => {
                            toggle('parent')
                        }}
                    >
                        Parents
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === 'teacher'}
                        onClick={() => {
                            toggle('teacher')
                        }}
                    >
                        Teachers
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === 'counsellor'}
                        onClick={() => {
                            toggle('counsellor')
                        }}
                    >
                        Counsellors
                    </NavLink>
                </NavItem>
            </Nav>

            <UsersComp userType={active}/>
            {/*<TabContent className='py-50' activeTab={active}>*/}
            {/*    <TabPane tabId='all_users'>*/}
            {/*        */}
            {/*    </TabPane>*/}
            {/*    <TabPane tabId='student'>*/}
            {/*        <RewardComp/>*/}
            {/*    </TabPane>*/}
            {/*    <TabPane tabId='parent'>*/}
            {/*        <BadgeComp/>*/}
            {/*    </TabPane>*/}
            {/*    <TabPane tabId='teacher'>*/}
            {/*        <BadgeComp/>*/}
            {/*    </TabPane>*/}
            {/*    <TabPane tabId='counsellor'>*/}
            {/*        <BadgeComp/>*/}
            {/*    </TabPane>*/}
            {/*</TabContent>*/}

        </Fragment>
    )
}

export default Users