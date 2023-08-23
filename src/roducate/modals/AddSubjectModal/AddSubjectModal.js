import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideAddSubjectModal, showLevelSelectModal, showSyllabusSelectModal} from '@store/actions/modal'
import {X} from "react-feather";
import './AddSubjectModal.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import FileUploader from "../../components/FileUploader/FileUploader";
import {LevelSelectModal} from "../LevelSelectModal/LevelSelectModal";
import {useEffect, useState} from "react";
import {SyllabusSelectModal} from "../SyllabusSelectModal/SyllabusSelectModal";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";

export const AddSubjectModal = ({subject, onUpdate}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [level, setLevel] = useState('')
    const [levelId, setLevelId] = useState('')

    const [syllabus, setSyllabus] = useState('')
    const [syllabusId, setSyllabusId] = useState('')

    const [title, setTitle] = useState('')

    const [icon, setIcon] = useState(undefined)

    useEffect(() => {
        if (subject) {
            setLevel('')
            setLevelId(subject.educationLevel)

            const [syllabus, setSyllabus] = useState('')
            setSyllabusId(syllabus)

            setTitle(title)

            setIcon(subject.coverImage)
        } else {

        }
    }, [subject])

    const showLevelListModal = () => {
        dispatch(showLevelSelectModal())
    }

    const showSyllabusListModal = () => {
        dispatch(showSyllabusSelectModal())
    }

    const onLevelSelected = (title, id) => {
        setLevel(title)
        setLevelId(id)
    }

    const onSyllabusSelected = (title, id) => {
        setSyllabus(title)
        setSyllabusId(id)
    }

    const publish = () => {
        addSubject(true)
    }

    const saveAsDraft = () => {
        addSubject(false)
    }

    const addSubject = async (isPublished) => {
        if (level === '' || syllabus === '' || title === '' || !icon) {
            return MySwal.fire({
                title: 'Error!',
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

        const formData = new FormData()
        formData.append('title', title)
        formData.append('syllabus', syllabusId)
        formData.append('educationLevel', levelId)
        formData.append('subjectImage', icon)
        formData.append('isPublished', isPublished)

        const result = await axios.post('/subject', formData);

        if (result.data.success) {
            await MySwal.fire({
                title: 'Good job!',
                text: 'You added subject successfully!',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    dispatch(hideAddSubjectModal())
                }
            })
        } else {
            MySwal.fire({
                title: 'Error!',
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
    }

    const onTitleChanged = (e) => {
        setTitle(e.target.value);
    }

    const onIconChange = (icon) => {
        setIcon(icon)
    }

    return (
        <Modal toggle={() => dispatch(hideAddSubjectModal())}
               isOpen={store.isVisibleAddSubject}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(hideAddSubjectModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(hideAddSubjectModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title">ADD SUBJECT</h1>
                <SelectOutlinedWrapper onClick={showLevelListModal} text="Educational Level & Class"
                                       text1={level}/>
                <br/>

                <Input placeholder='Subject or Course Title' value={title} onChange={onTitleChanged}/>

                <br/>
                <SelectOutlinedWrapper onClick={showSyllabusListModal} text="Syllabus" text1={syllabus}/>
                <br/>

                <FileUploader onFileChange={onIconChange}/>
                <br/>

                <div className="d-flex justify-content-center">
                    <Button color='gradient-primary' onClick={publish}>Publish</Button>
                </div>
                <br/>

                <div className="d-flex justify-content-center">
                    <Button.Ripple color='info' outline onClick={saveAsDraft}>
                        Save as Draft
                    </Button.Ripple>
                </div>

                <LevelSelectModal title="Educational Level & Class" onSelected={onLevelSelected}/>

                <SyllabusSelectModal title="Syllabus" onSelected={onSyllabusSelected}/>

            </ModalBody>
        </Modal>
    );
};