// ** React Imports
import React, {Fragment, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {PlusCircle} from 'react-feather'
import {Button, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {showAddTopicModal} from '@store/actions/modal'
import './ExamSuccess.css'
import Exam from "../exam/Exam";
import {showCreateClassModal, showCreateExamPlanModal} from "../../../redux/actions/modal";
import Classification from "../classification/Classification";

const ExamSuccess = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [active, setActive] = useState('exams')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const handleBtnClick = () => {
        switch (active) {
            case 'exams':
                dispatch(showCreateExamPlanModal(true))
                break
            case 'class':
                dispatch(showCreateClassModal(true))
                break
        }
    }

    const getBtnNameByTab = (tabName) => {
        switch (tabName) {
            case 'exams':
                return 'Create Plan'
            case 'class':
                return 'Create Classification'
        }
    }

    return (
        <Fragment>
            <div>
                <div className="d-flex justify-content-between mb-2 align-items-center">
                    <span>Recently Added</span>

                    <Nav tabs style={{margin: 'auto', height: 'fit-content'}}>
                        <NavItem>
                            <NavLink
                                active={active === 'exams'}
                                onClick={() => {
                                    toggle('exams')
                                }}
                            >
                                Exams
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'class'}
                                onClick={() => {
                                    toggle('class')
                                }}
                            >
                                Classification
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <Button style={{height: 'fit-content'}} className='ml-2' color='primary'
                            onClick={handleBtnClick}>
                        <PlusCircle size={15}/>
                        <span className='align-middle ml-50'>{getBtnNameByTab(active)}</span>
                    </Button>
                </div>
            </div>

            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='exams'>
                    <Exam/>
                </TabPane>
                <TabPane tabId='class'>
                    <Classification/>
                </TabPane>
            </TabContent>
        </Fragment>
    )
}

export default ExamSuccess