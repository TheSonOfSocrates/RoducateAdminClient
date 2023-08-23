import {Button, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddSubjectTopicsModal} from '@store/actions/modal'
import './AddSubjectTopicsModal.css'
import {X} from "react-feather";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {showItemSelectModal, showLevelSelectModal} from "../../../redux/actions/modal";
import {LevelSelectModal} from "../LevelSelectModal/LevelSelectModal";
import axios from "../../../utility/axios";
import {ItemSelectModal} from "../ItemSelectModal/ItemSelectModal";

export const AddSubjectTopicsModal = ({st, onAdd, classId}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [selectedLevel, setSelectedLevel] = useState(undefined)
    const [subjectList, setSubjectList] = useState([])
    const [selectedSubject, setSelectedSubject] = useState(undefined)
    const [selectedTopics, setSelectedTopics] = useState([])

    const [modalEditingData, setModalEditingData] = useState([])
    const [modalEditType, setModalEditType] = useState('subject')

    const MySwal = withReactContent(Swal)

    useEffect(async () => {
        const response = await axios.post('/resource/examsuccess/getAvailableSubjects', {classificationId: classId})
        if (response.data) {
            setSubjectList(response.data)
        }

        if (st) {

        } else {
            setSelectedLevel(undefined)
            setSelectedSubject(undefined)
            setSelectedTopics([])

            setModalEditingData([])
            setModalEditType('subject')
        }

    }, [st, classId])

    const addSubjectTopicsModal = async () => {
        onAdd({subject: selectedSubject, topics: selectedTopics})
        setSelectedLevel(undefined)
        setSelectedSubject(undefined)
        setSelectedTopics([])

        setModalEditingData([])
        setModalEditType('subject')
        dispatch(showAddSubjectTopicsModal())
    }

    return (
        <Modal toggle={() => dispatch(showAddSubjectTopicsModal())}
               isOpen={store.showAddSubjectTopicsModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showAddSubjectTopicsModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAddSubjectTopicsModal())}
                                   className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title">{st ? 'EDIT' : 'ADD'} SUBJECT & TOPICS</h1>

                <SelectOutlinedWrapper className="col-6" onClick={() => dispatch(showLevelSelectModal())}
                                       text="Education Level & Class"
                                       text1={selectedLevel ? selectedLevel.title : ''}/>

                <SelectOutlinedWrapper className="col-6" onClick={() => {
                    setModalEditingData(subjectList.filter(item => item.educationLevel._id === selectedLevel?._id))
                    setModalEditType('subject')
                    dispatch(showItemSelectModal(true))
                }}
                                       text="Subjects"
                                       text1={selectedSubject ? selectedSubject.title : ''}/>

                <SelectOutlinedWrapper className="col-6" onClick={() => {
                    setModalEditingData(selectedSubject?.topics)
                    setModalEditType('topic')
                    dispatch(showItemSelectModal(true))
                }}
                                       text="Topics"
                                       text1={selectedTopics ? selectedTopics.map(item => item.title).join(', ') : ''}/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={addSubjectTopicsModal}>Add</Button>
                </div>
            </ModalBody>

            <LevelSelectModal title="Educational Level & Class"
                              onSelected={(title, _id) => setSelectedLevel({title, _id})}/>

            <ItemSelectModal data={modalEditingData}
                             onSelected={selectedList => {
                                 if (modalEditType === 'topic')
                                     setSelectedTopics(selectedList)
                                 else
                                     setSelectedSubject(selectedList[0])
                             }}
                             isMulti={modalEditType === 'topic'}
                             title={modalEditType === 'subject' ? 'Select Subjects' : 'Select Topics'}/>
        </Modal>
    );
};