import {Button, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showEditDayPlanModal} from '@store/actions/modal'
import './EditDayPlanModal.css'
import {X} from "react-feather";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";
import {showAddSubjectTopicsModal, showMockExamSelectModal} from "../../../redux/actions/modal";
import {AddSubjectTopicsModal} from "../AddSubjectTopicsModal/AddSubjectTopicsModal";
import {MockExamSelectModal} from "../MockExamSelectModal/MockExamSelectModal";
import axios from "../../../utility/axios";
import Avatar from "../../../@core/components/avatar";

export const EditDayPlanModal = ({dayPlan, onUpdate, classId, examId, examName}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [editingPlan, setEditingPlan] = useState(undefined)
    const [topicItemList, setTopicItemList] = useState([])
    const [mockExamList, setMockExamList] = useState([])
    const [selectedMockExamList, setSelectedMockExamList] = useState([])

    useEffect(async () => {
        setEditingPlan(dayPlan)
    }, [dayPlan])

    useEffect(async () => {
        setEditingPlan(dayPlan)
        const response = await axios.post('/resource/examsuccess/getAvailableMockExams', {
            examId,
            subjectIds: topicItemList.map(item => item.subject._id)
        })
        if (response.data) {
            setMockExamList(response.data)
        }
    }, [topicItemList, examId])

    const MySwal = withReactContent(Swal)

    return (
        <Modal toggle={() => dispatch(showEditDayPlanModal())}
               isOpen={store.showEditDayPlanModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showEditDayPlanModal())}>
                {editingPlan && <div>
                    <div style={{textAlign: 'right'}}>
                        <Button.Ripple onClick={() => dispatch(showEditDayPlanModal())}
                                       className='btn-icon rounded-circle'
                                       color='flat-danger'>
                            <X size={16}/>
                        </Button.Ripple>
                    </div>
                    <h1 className="add-subject-title">DAY {editingPlan.index}</h1>

                    {topicItemList.map((item, index) => <div
                        className="day-plan-card d-flex align-items-center justify-content-between mb-1">
                        <div>
                            <p className="day-plan-title">{item.subject.title}</p>
                            <p className="mb-0 day-plan-sub">{item.topics.length} Topics Selected</p>
                        </div>
                        <span className="day-edit-button cursor-pointer">Edit</span>
                    </div>)}

                    <div className="cursor-pointer d-flex justify-content-center align-items-center add-st-wrapper mb-1"
                         onClick={() => dispatch(showAddSubjectTopicsModal(true))}>
                        <div className="d-flex justify-content-center align-items-center">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2.5C17.523 2.5 22 6.977 22 12.5C22 18.023 17.523 22.5 12 22.5C6.477 22.5 2 18.023 2 12.5C2 6.977 6.477 2.5 12 2.5ZM12 4.5C9.87827 4.5 7.84344 5.34285 6.34315 6.84315C4.84285 8.34344 4 10.3783 4 12.5C4 14.6217 4.84285 16.6566 6.34315 18.1569C7.84344 19.6571 9.87827 20.5 12 20.5C14.1217 20.5 16.1566 19.6571 17.6569 18.1569C19.1571 16.6566 20 14.6217 20 12.5C20 10.3783 19.1571 8.34344 17.6569 6.84315C16.1566 5.34285 14.1217 4.5 12 4.5ZM12 7.5C12.2652 7.5 12.5196 7.60536 12.7071 7.79289C12.8946 7.98043 13 8.23478 13 8.5V11.5H16C16.2652 11.5 16.5196 11.6054 16.7071 11.7929C16.8946 11.9804 17 12.2348 17 12.5C17 12.7652 16.8946 13.0196 16.7071 13.2071C16.5196 13.3946 16.2652 13.5 16 13.5H13V16.5C13 16.7652 12.8946 17.0196 12.7071 17.2071C12.5196 17.3946 12.2652 17.5 12 17.5C11.7348 17.5 11.4804 17.3946 11.2929 17.2071C11.1054 17.0196 11 16.7652 11 16.5V13.5H8C7.73478 13.5 7.48043 13.3946 7.29289 13.2071C7.10536 13.0196 7 12.7652 7 12.5C7 12.2348 7.10536 11.9804 7.29289 11.7929C7.48043 11.6054 7.73478 11.5 8 11.5H11V8.5C11 8.23478 11.1054 7.98043 11.2929 7.79289C11.4804 7.60536 11.7348 7.5 12 7.5Z"
                                    fill="#CACACC"/>
                            </svg>
                            <div className="ml-2">
                                <p className="ed-add-title">Add Subjects & Topics</p>
                                <p className="ed-sub-title1 mb-0">Click to add item type</p>
                            </div>
                        </div>
                    </div>

                    {selectedMockExamList.map((item, index) => <div
                        className="day-mock-card d-flex align-items-center justify-content-between mb-1">
                        <div>
                            <p className="day-plan-title">{item.examCode}</p>
                            <p className="day-plan-sub">{item.subject.title}</p>
                            <div>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M7.37501 1.64576C7.53904 1.51459 7.7402 1.4384 7.94997 1.42799C8.15974 1.41758 8.36746 1.47348 8.54367 1.58776L8.62434 1.64576L11.499 3.94576C11.6393 4.05786 11.7554 4.19713 11.8405 4.35522C11.9257 4.51331 11.978 4.68696 11.9943 4.86576L11.9997 4.98643V6.66643H13.333C13.6694 6.66632 13.9934 6.79336 14.24 7.02209C14.4867 7.25082 14.6378 7.56432 14.663 7.89976L14.6663 7.99976V13.2664C14.6664 13.4471 14.5998 13.6215 14.4792 13.7561C14.3587 13.8907 14.1926 13.976 14.013 13.9958L13.933 13.9998H2.06634C1.88564 13.9999 1.71126 13.9332 1.57666 13.8126C1.44206 13.6921 1.35672 13.5261 1.33701 13.3464L1.33301 13.2664V7.99976C1.3329 7.66338 1.45995 7.33938 1.68867 7.09273C1.9174 6.84607 2.2309 6.69499 2.56634 6.66976L2.66634 6.66643H3.99967V4.98643C3.99966 4.80688 4.03591 4.62919 4.10625 4.46399C4.17659 4.2988 4.27957 4.14952 4.40901 4.02509L4.50034 3.94509L7.37501 1.64509V1.64576ZM7.99967 2.85309L5.33301 4.98643V12.6664H10.6663V4.98643L7.99967 2.85309ZM13.333 7.99976H11.9997V12.6664H13.333V7.99976ZM3.99967 7.99976H2.66634V12.6664H3.99967V7.99976ZM7.99967 5.33309C8.26232 5.33309 8.52239 5.38482 8.76504 5.48533C9.00769 5.58584 9.22817 5.73316 9.41389 5.91888C9.59961 6.1046 9.74692 6.32508 9.84743 6.56773C9.94794 6.81038 9.99967 7.07045 9.99967 7.33309C9.99967 7.59574 9.94794 7.85581 9.84743 8.09846C9.74692 8.34111 9.59961 8.56159 9.41389 8.74731C9.22817 8.93302 9.00769 9.08034 8.76504 9.18085C8.52239 9.28136 8.26232 9.33309 7.99967 9.33309C7.46924 9.33309 6.96053 9.12238 6.58546 8.74731C6.21039 8.37223 5.99967 7.86353 5.99967 7.33309C5.99967 6.80266 6.21039 6.29395 6.58546 5.91888C6.96053 5.54381 7.46924 5.33309 7.99967 5.33309ZM7.99967 6.66643C7.82286 6.66643 7.65329 6.73666 7.52827 6.86169C7.40325 6.98671 7.33301 7.15628 7.33301 7.33309C7.33301 7.5099 7.40325 7.67947 7.52827 7.8045C7.65329 7.92952 7.82286 7.99976 7.99967 7.99976C8.17649 7.99976 8.34606 7.92952 8.47108 7.8045C8.5961 7.67947 8.66634 7.5099 8.66634 7.33309C8.66634 7.15628 8.5961 6.98671 8.47108 6.86169C8.34606 6.73666 8.17649 6.66643 7.99967 6.66643Z"
                                          fill="#8840E6"/>
                                </svg>
                                <span className="day-plan-examcode ml-1">{examName}</span>
                            </div>
                            <div className="d-flex align-items-center mt-1">
                                <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${item.createdBy.avatar}`}
                                        imgHeight='30' imgWidth='30' status='online'/>&nbsp;
                                <span>{item.createdBy.firstName}</span>
                            </div>
                        </div>
                        <span className="day-plan-sub">{item.questionCount} Questions</span>
                    </div>)}

                    <div className="cursor-pointer d-flex justify-content-center align-items-center add-st-wrapper mt-1"
                         onClick={() => dispatch(showMockExamSelectModal(true))}>
                        <div className="d-flex justify-content-center align-items-center">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2.5C17.523 2.5 22 6.977 22 12.5C22 18.023 17.523 22.5 12 22.5C6.477 22.5 2 18.023 2 12.5C2 6.977 6.477 2.5 12 2.5ZM12 4.5C9.87827 4.5 7.84344 5.34285 6.34315 6.84315C4.84285 8.34344 4 10.3783 4 12.5C4 14.6217 4.84285 16.6566 6.34315 18.1569C7.84344 19.6571 9.87827 20.5 12 20.5C14.1217 20.5 16.1566 19.6571 17.6569 18.1569C19.1571 16.6566 20 14.6217 20 12.5C20 10.3783 19.1571 8.34344 17.6569 6.84315C16.1566 5.34285 14.1217 4.5 12 4.5ZM12 7.5C12.2652 7.5 12.5196 7.60536 12.7071 7.79289C12.8946 7.98043 13 8.23478 13 8.5V11.5H16C16.2652 11.5 16.5196 11.6054 16.7071 11.7929C16.8946 11.9804 17 12.2348 17 12.5C17 12.7652 16.8946 13.0196 16.7071 13.2071C16.5196 13.3946 16.2652 13.5 16 13.5H13V16.5C13 16.7652 12.8946 17.0196 12.7071 17.2071C12.5196 17.3946 12.2652 17.5 12 17.5C11.7348 17.5 11.4804 17.3946 11.2929 17.2071C11.1054 17.0196 11 16.7652 11 16.5V13.5H8C7.73478 13.5 7.48043 13.3946 7.29289 13.2071C7.10536 13.0196 7 12.7652 7 12.5C7 12.2348 7.10536 11.9804 7.29289 11.7929C7.48043 11.6054 7.73478 11.5 8 11.5H11V8.5C11 8.23478 11.1054 7.98043 11.2929 7.79289C11.4804 7.60536 11.7348 7.5 12 7.5Z"
                                    fill="#CACACC"/>
                            </svg>
                            <div className="ml-2">
                                <p className="ed-add-title">Add Mock Exam</p>
                                <p className="ed-sub-title1 mb-0">Click to add item type</p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-1">
                        <Button color='gradient-primary' onClick={() => onUpdate({
                            index: dayPlan.index,
                            content: topicItemList,
                            mockExams: selectedMockExamList
                        })}>Done</Button>
                    </div>
                </div>}
                <AddSubjectTopicsModal classId={classId} onAdd={(item) => setTopicItemList([...topicItemList, item])}/>
                <MockExamSelectModal data={mockExamList}
                                     onSelected={(item) => setSelectedMockExamList([...selectedMockExamList, item])}/>
            </ModalBody>
        </Modal>
    );
};