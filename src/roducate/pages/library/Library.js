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
import {
    showAddLevel,
    showAddMediaModal,
    showAddPeriodModal,
    showAddSBSGModal,
    showAddSubjectModal,
    showAddSyllabus,
    showAddTaskModal,
    showAddTopicModal,
    showUploadModal
} from '@store/actions/modal'
import './Library.css'
import LibraryComp from "../../components/LibraryComp/LibraryComp";
import AddCreators from "../../components/AddCreators/AddCreators";
import TaskComp from "../../components/TaskComp/TaskComp";
import LevelComp from "../../components/LevelComp/LevelComp";
import PeriodComp from "../../components/PeriodComp/PeriodComp";
import SyllabusComp from "../../components/SyllabusComp/SyllabusComp";
import SBSGComp from "../../components/SBSBComp/SBSGComp";
import SubjectComp from "../../components/SubjectComp/SubjectComp";
import UploadComp from "../../components/UploadComp/UploadComp";
import TopicComp from "../../components/TopicComp/TopicComp";

const Library = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [active, setActive] = useState('subjects')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const handleBtnClick = () => {
        switch (active) {
            case 'library':
                dispatch(showAddMediaModal())
                break
            case 'topics':
                dispatch(showAddTopicModal(true))
                break
            case 'subjects':
                dispatch(showAddSubjectModal())
                break
            case 'tasks':
                dispatch(showAddTaskModal(true))
                break
            case 'levels':
                dispatch(showAddLevel())
                break
            case 'period':
                dispatch(showAddPeriodModal(true))
                break
            case 'syllabus':
                dispatch(showAddSyllabus())
                break
            case 'sbsg':
                dispatch(showAddSBSGModal(true))
                break
            case 'uploads':
                dispatch(showUploadModal(true))
                break
        }
    }

    const getBtnNameByTab = (tabName) => {
        switch (tabName) {
            case 'uploads':
                return 'Upload'
            case 'topics':
                return 'Add Topic'
            case 'subjects':
                return 'Add Subject'
            case 'tasks':
                return 'Create Task'
            case 'levels':
                return 'Add Level'
            case 'period':
                return 'Add Period'
            case 'syllabus':
                return 'Add Syllabus'
            case 'sbsg':
                return 'Add Guide'

            default:
                return 'Create Content'
        }
    }

    return (
        <Fragment>
            <div>
                <div className="d-flex justify-content-between mb-2 align-items-center">
                    <AddCreators/>

                    <Nav tabs style={{margin: 'auto', height: 'fit-content'}}>
                        <NavItem>
                            {/*<NavLink*/}
                            {/*    active={active === 'library'}*/}
                            {/*    onClick={() => {*/}
                            {/*        toggle('library')*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Library*/}
                            {/*</NavLink>*/}
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'subjects'}
                                onClick={() => {
                                    toggle('subjects')
                                }}
                            >
                                Subjects
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'topics'}
                                onClick={() => {
                                    toggle('topics')
                                }}
                            >
                                Topics
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'tasks'}
                                onClick={() => {
                                    toggle('tasks')
                                }}
                            >
                                Tasks
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'levels'}
                                onClick={() => {
                                    toggle('levels')
                                }}
                            >
                                Levels
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'period'}
                                onClick={() => {
                                    toggle('period')
                                }}
                            >
                                Period
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'syllabus'}
                                onClick={() => {
                                    toggle('syllabus')
                                }}
                            >
                                Syllabus
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'sbsg'}
                                onClick={() => {
                                    toggle('sbsg')
                                }}
                            >
                                SBSG
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === 'uploads'}
                                onClick={() => {
                                    toggle('uploads')
                                }}
                            >
                                Uploads
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
                <TabPane tabId='library'>
                    <LibraryComp/>
                </TabPane>
                <TabPane tabId='subjects'>
                    <SubjectComp fetchData={active === 'subjects'}/>
                </TabPane>
                <TabPane tabId='topics'>
                    <TopicComp fetchData={active === 'topics'}/>
                </TabPane>
                <TabPane tabId='tasks'>
                    <TaskComp fetchData={active === 'tasks'}/>
                </TabPane>
                <TabPane tabId='levels'>
                    <LevelComp fetchData={active === 'levels'}/>
                </TabPane>
                <TabPane tabId='period'>
                    <PeriodComp fetchData={active === 'period'}/>
                </TabPane>
                <TabPane tabId='syllabus'>
                    <SyllabusComp fetchData={active === 'syllabus'}/>
                </TabPane>
                <TabPane tabId='sbsg'>
                    <SBSGComp fetchData={active === 'sbsg'}/>
                </TabPane>
                <TabPane tabId='uploads'>
                    <UploadComp fetchData={active === 'uploads'}/>
                </TabPane>
            </TabContent>
        </Fragment>
    )
}

export default Library