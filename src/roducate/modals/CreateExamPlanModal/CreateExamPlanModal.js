import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showCreateExamPlanModal} from '@store/actions/modal'
import './CreateExamPlanModal.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {showEditDayPlanModal, showExamSelectModal} from "../../../redux/actions/modal";
import {ExamSelectModal} from "../ExamSelectModal/ExamSelectModal";
import Select from "react-select";
import {selectThemeColors} from "../../../utility/Utils";
import {EditDayPlanModal} from "../EditDayPlanModal/EditDayPlanModal";

export const CreateExamPlanModal = ({exam, onUpdate}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [selectedExam, setSelectedExam] = useState(undefined)
    const [selectedClass, setSelectedClass] = useState(undefined)
    const [classList, setClassList] = useState([])

    const [dayPlans, setDayPlans] = useState([
        {
            "index": 1,
            "content": [],
            "mockExams": []
        },
        {
            "index": 2,
            "content": [],
            "mockExams": []
        },
        {
            "index": 3,
            "content": [],
            "mockExams": []
        },
        {
            "index": 4,
            "content": [],
            "mockExams": []
        },
        {
            "index": 5,
            "content": [],
            "mockExams": []
        },
        {
            "index": 6,
            "content": [],
            "mockExams": []
        }, {
            "index": 7,
            "content": [],
            "mockExams": []
        }
    ])

    const [editingDayPlan, setEditingDayPlan] = useState(undefined)

    const MySwal = withReactContent(Swal)

    useEffect(async () => {
        const response = await axios.get('/resource/examsuccess/classification/getAllClassification')
        if (response.data.success) {
            setClassList(response.data.allClassifications)
        }
    }, [exam])

    const createExam = async (isPublished) => {
        let link = '/resource/examsuccess';
        if (exam)
            link = `/resource/examsuccess/${exam._id}`

        let result;
        try {
            result = await axios.post(link, {
                examId: selectedExam?._id,
                classification: selectedClass?.value,
                daysContent: dayPlans.map(item => ({
                    index: item.index,
                    content: item.content.map(item1 => ({
                        subject: item1.subject._id,
                        topics: item1.topics.map(item2 => item2._id)
                    })),
                    mockExams: item.mockExams.map(item3 => item3._id)
                })),
                isPublished
            });
            if (result.status) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You ${exam ? 'updated' : 'created'} exam successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdate) onUpdate();
                    dispatch(showCreateExamPlanModal());
                })
            } else {
                await MySwal.fire({
                    title: 'Error',
                    text: 'Something went wrong.',
                    icon: 'error',
                    timer: 2000,
                    position: 'center',
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })
            }
        } catch (e) {
            await MySwal.fire({
                title: 'Error',
                text: e.toString(),
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }
    }

    return (
        <Modal toggle={() => dispatch(showCreateExamPlanModal())}
               isOpen={store.showCreateExamPlanModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody className="p-3" toggle={() => dispatch(showCreateExamPlanModal())}>
                <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex justify-content-center">
                        <Button.Ripple color='info' outline onClick={() => createExam(false)}>
                            Save as Draft
                        </Button.Ripple>

                        <Button className="ml-1" color='gradient-primary'
                                onClick={() => createExam(true)}>Publish</Button>
                    </div>
                    <div>
                        <Button.Ripple onClick={() => dispatch(showCreateExamPlanModal())}
                                       className='btn-icon rounded-circle'
                                       color='flat-danger'>
                            <X size={16}/>
                        </Button.Ripple>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <SelectOutlinedWrapper onClick={() => dispatch(showExamSelectModal(true))}
                                               text="Exam" text1={selectedExam?.name}/>
                        <FormGroup>
                            <Input placeholder='Description' value={selectedExam?.description} readonly/>
                        </FormGroup>

                        <FormGroup>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                value={selectedClass}
                                options={classList.map(item => ({value: item._id, label: item.name}))}
                                isClearable={false}
                                onChange={(value) => setSelectedClass(value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-6">
                        {dayPlans.map((item, index) => <div
                            className="day-plan-card d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <p className="day-plan-title">Day {index + 1}</p>
                                <p className="mb-0 day-plan-sub">{item.content.length} subjects, {item.mockExams.length} mock
                                    exams</p>
                            </div>
                            <span className="day-edit-button cursor-pointer"
                                  onClick={() => {
                                      setEditingDayPlan(item)
                                      dispatch(showEditDayPlanModal(true))
                                  }}>Edit</span>
                        </div>)}
                    </div>

                </div>
            </ModalBody>
            <ExamSelectModal title="Exam" onSelected={(item) => setSelectedExam(item)}/>
            <EditDayPlanModal examName={selectedExam?.name} examId={selectedExam?._id} dayPlan={editingDayPlan}
                              onUpdate={(item) => {
                                  dispatch(showEditDayPlanModal())
                                  setDayPlans([...dayPlans.slice(0, item.index - 1), item, ...dayPlans.splice(item.index)])
                              }} classId={selectedClass?.value}/>
        </Modal>
    );
};