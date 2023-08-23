import {Button, Card, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddStudyModal, showLevelSelectModal, showSyllabusSelectModal} from '@store/actions/modal'
import {X} from "react-feather";
import './AddStudyModal.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {LevelSelectModal} from "../LevelSelectModal/LevelSelectModal";
import React, {useEffect, useState} from "react";
import {SyllabusSelectModal} from "../SyllabusSelectModal/SyllabusSelectModal";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";

export const AddStudyModal = ({study, onUpdate}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [level, setLevel] = useState('')
    const [levelId, setLevelId] = useState('')

    const [syllabus, setSyllabus] = useState('')
    const [syllabusId, setSyllabusId] = useState('')

    const [subjectList, setSubjectList] = useState([])
    const [subjectSearchStr, setSubjectSearchStr] = useState('')

    const [topicList, setTopicList] = useState([])
    const [topicSearchStr, setTopicSearchStr] = useState('')

    const [selectedSubject, setSelectedSubject] = useState(undefined)
    const [selectedTopicList, setSelectedTopicList] = useState([])

    useEffect(() => {
        if (study) {
            setLevel('')
            setLevelId(study.educationLevel)

            const [syllabus, setSyllabus] = useState('')
            setSyllabusId(syllabus)

        } else {

        }

        setSubjectSearchStr('')
        setTopicSearchStr('')

        getSubjectList()
        getTopicList()
    }, [study])

    useEffect(() => {
        setSubjectSearchStr('')
        setTopicSearchStr('')
        setTopicList([])
        getSubjectList()
    }, [levelId, syllabusId])

    useEffect(() => {
        setTopicSearchStr('')
        setTopicList([])
        setSelectedTopicList([])
        getTopicList()
    }, [selectedSubject])

    const getSubjectList = async () => {
        if (levelId === '' || syllabusId === '')
            return

        const response = await axios.post('/resource/study/getSubjects', {
            syllabus: syllabusId,
            educationLevel: levelId
        })
        if (response) {
            setSubjectList(response.data)
        }
    }

    const getTopicList = async () => {
        if (levelId === '' || syllabusId === '' || !selectedSubject)
            return

        const response = await axios.post('/resource/study/getTopics', {
            syllabus: syllabusId,
            educationLevel: levelId,
            subjectId: selectedSubject.subject._id
        })
        if (response && response.data) {
            setTopicList(response.data)
        }
    }

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

    const addSubject = async () => {
        if (level === '' || syllabus === '' || !selectedSubject || selectedTopicList.length === 0) {
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

        const result = await axios.post('/resource/study', {
            syllabus: syllabusId, educationLevel: levelId,
            subjectId: selectedSubject._id, topicIds: selectedTopicList.map(item => item._id)
        });

        if (result && result.data.success) {
            await MySwal.fire({
                title: 'Good job!',
                text: 'You added study successfully!',
                icon: 'success',
                timer: 2000,
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            }).then(function (result) {
                setLevel('')
                setLevelId('')

                setSyllabus('')
                setSyllabusId('')

                setSubjectList([])
                setSubjectSearchStr('')

                setTopicList([])
                setTopicSearchStr('')

                setSelectedSubject(undefined)
                setSelectedTopicList([])

                dispatch(showAddStudyModal())
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

    return (
        <Modal toggle={() => dispatch(showAddStudyModal())}
               isOpen={store.showAddStudyModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showAddStudyModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAddStudyModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>

                <div className="row">
                    <div className="col-6">
                        <p className="study-sub-title">SUBJECT</p>
                        <div className="p-2 text-center align-items-center sub-title-stud-back">
                            {!selectedSubject && <div>
                                <svg width="52" height="51" viewBox="0 0 52 51" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_3771_90385)">
                                        <path
                                            d="M26 4.58496C37.7364 4.58496 47.25 13.912 47.25 25.4183C47.25 36.9245 37.7364 46.2516 26 46.2516C14.2636 46.2516 4.75 36.9245 4.75 25.4183C4.75 13.912 14.2636 4.58496 26 4.58496ZM26 8.75163C21.4913 8.75163 17.1673 10.5076 13.9792 13.6332C10.7911 16.7588 9 20.998 9 25.4183C9 29.8386 10.7911 34.0778 13.9792 37.2034C17.1673 40.329 21.4913 42.085 26 42.085C30.5087 42.085 34.8327 40.329 38.0208 37.2034C41.2089 34.0778 43 29.8386 43 25.4183C43 20.998 41.2089 16.7588 38.0208 13.6332C34.8327 10.5076 30.5087 8.75163 26 8.75163ZM26 15.0016C26.5636 15.0016 27.1041 15.2211 27.5026 15.6118C27.9011 16.0025 28.125 16.5324 28.125 17.085V23.335H34.5C35.0636 23.335 35.6041 23.5545 36.0026 23.9452C36.4011 24.3359 36.625 24.8658 36.625 25.4183C36.625 25.9708 36.4011 26.5007 36.0026 26.8914C35.6041 27.2821 35.0636 27.5016 34.5 27.5016H28.125V33.7516C28.125 34.3042 27.9011 34.8341 27.5026 35.2248C27.1041 35.6155 26.5636 35.835 26 35.835C25.4364 35.835 24.8959 35.6155 24.4974 35.2248C24.0989 34.8341 23.875 34.3042 23.875 33.7516V27.5016H17.5C16.9364 27.5016 16.3959 27.2821 15.9974 26.8914C15.5989 26.5007 15.375 25.9708 15.375 25.4183C15.375 24.8658 15.5989 24.3359 15.9974 23.9452C16.3959 23.5545 16.9364 23.335 17.5 23.335H23.875V17.085C23.875 16.5324 24.0989 16.0025 24.4974 15.6118C24.8959 15.2211 25.4364 15.0016 26 15.0016Z"
                                            fill="#8172EA" fill-opacity="0.5"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3771_90385">
                                            <rect width="51" height="50" fill="white"
                                                  transform="translate(0.5 0.418213)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p className="mt-1 sub-sub-tile">Add a subject here</p>
                                <p className="mb-0 sub-sub-des">E.g., English Language, Mathematics.</p>
                            </div>}
                            {selectedSubject && <div
                                className="d-flex justify-content-between p-1 add-item-study align-items-center cursor-pointer">
                                <div className="d-flex">
                                    <img style={{height: '40px', width: '40px', marginRight: 10}}
                                         src={process.env.REACT_APP_3BUCKET_URL + selectedSubject.subject.coverImage}/>
                                    <div>
                                        <p className="mb-0 text-left">{selectedSubject.subject.title}</p>
                                        <p className="mb-0 text-left">Added by {selectedSubject.creator.firstName}</p>
                                    </div>
                                </div>
                                <svg
                                    onClick={() => setSelectedSubject(undefined)}
                                    width="24" height="25"
                                    style={{transform: 'rotate(45deg)'}}
                                    viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2.33643C17.523 2.33643 22 6.81343 22 12.3364C22 17.8594 17.523 22.3364 12 22.3364C6.477 22.3364 2 17.8594 2 12.3364C2 6.81343 6.477 2.33643 12 2.33643ZM12 4.33643C9.87827 4.33643 7.84344 5.17928 6.34315 6.67957C4.84285 8.17986 4 10.2147 4 12.3364C4 14.4582 4.84285 16.493 6.34315 17.9933C7.84344 19.4936 9.87827 20.3364 12 20.3364C14.1217 20.3364 16.1566 19.4936 17.6569 17.9933C19.1571 16.493 20 14.4582 20 12.3364C20 10.2147 19.1571 8.17986 17.6569 6.67957C16.1566 5.17928 14.1217 4.33643 12 4.33643ZM12 7.33643C12.2652 7.33643 12.5196 7.44178 12.7071 7.62932C12.8946 7.81686 13 8.07121 13 8.33643V11.3364H16C16.2652 11.3364 16.5196 11.4418 16.7071 11.6293C16.8946 11.8169 17 12.0712 17 12.3364C17 12.6016 16.8946 12.856 16.7071 13.0435C16.5196 13.2311 16.2652 13.3364 16 13.3364H13V16.3364C13 16.6016 12.8946 16.856 12.7071 17.0435C12.5196 17.2311 12.2652 17.3364 12 17.3364C11.7348 17.3364 11.4804 17.2311 11.2929 17.0435C11.1054 16.856 11 16.6016 11 16.3364V13.3364H8C7.73478 13.3364 7.48043 13.2311 7.29289 13.0435C7.10536 12.856 7 12.6016 7 12.3364C7 12.0712 7.10536 11.8169 7.29289 11.6293C7.48043 11.4418 7.73478 11.3364 8 11.3364H11V8.33643C11 8.07121 11.1054 7.81686 11.2929 7.62932C11.4804 7.44178 11.7348 7.33643 12 7.33643Z"
                                        fill="#e760e6"/>
                                </svg>
                            </div>}
                        </div>
                        <hr/>
                        <p className="study-sub-title">TOPICS</p>
                        <div className="p-2 text-center align-items-center sub-title-stud-back"
                             style={{height: 200}}>
                            {selectedTopicList.length === 0 &&
                                <div className="full-height justify-content-center align-items-center d-flex">
                                    <div>
                                        <svg width="52" height="51" viewBox="0 0 52 51" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_3771_90385)">
                                                <path
                                                    d="M26 4.58496C37.7364 4.58496 47.25 13.912 47.25 25.4183C47.25 36.9245 37.7364 46.2516 26 46.2516C14.2636 46.2516 4.75 36.9245 4.75 25.4183C4.75 13.912 14.2636 4.58496 26 4.58496ZM26 8.75163C21.4913 8.75163 17.1673 10.5076 13.9792 13.6332C10.7911 16.7588 9 20.998 9 25.4183C9 29.8386 10.7911 34.0778 13.9792 37.2034C17.1673 40.329 21.4913 42.085 26 42.085C30.5087 42.085 34.8327 40.329 38.0208 37.2034C41.2089 34.0778 43 29.8386 43 25.4183C43 20.998 41.2089 16.7588 38.0208 13.6332C34.8327 10.5076 30.5087 8.75163 26 8.75163ZM26 15.0016C26.5636 15.0016 27.1041 15.2211 27.5026 15.6118C27.9011 16.0025 28.125 16.5324 28.125 17.085V23.335H34.5C35.0636 23.335 35.6041 23.5545 36.0026 23.9452C36.4011 24.3359 36.625 24.8658 36.625 25.4183C36.625 25.9708 36.4011 26.5007 36.0026 26.8914C35.6041 27.2821 35.0636 27.5016 34.5 27.5016H28.125V33.7516C28.125 34.3042 27.9011 34.8341 27.5026 35.2248C27.1041 35.6155 26.5636 35.835 26 35.835C25.4364 35.835 24.8959 35.6155 24.4974 35.2248C24.0989 34.8341 23.875 34.3042 23.875 33.7516V27.5016H17.5C16.9364 27.5016 16.3959 27.2821 15.9974 26.8914C15.5989 26.5007 15.375 25.9708 15.375 25.4183C15.375 24.8658 15.5989 24.3359 15.9974 23.9452C16.3959 23.5545 16.9364 23.335 17.5 23.335H23.875V17.085C23.875 16.5324 24.0989 16.0025 24.4974 15.6118C24.8959 15.2211 25.4364 15.0016 26 15.0016Z"
                                                    fill="#8172EA" fill-opacity="0.5"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_3771_90385">
                                                    <rect width="51" height="50" fill="white"
                                                          transform="translate(0.5 0.418213)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className="mt-1 sub-sub-tile">Add topics here</p>
                                        <p className="mb-0 sub-sub-des">You can add multiple topics in a
                                            subject</p>
                                    </div>
                                </div>}
                            {selectedTopicList.length !== 0 && <div style={{overflowY: 'auto', maxHeight: '100%'}}>
                                {selectedTopicList.map(item => <div
                                    className="d-flex justify-content-between p-1 add-item-study align-items-center cursor-pointer">
                                    <div className="d-flex align-items-center">
                                        <svg style={{marginRight: 10}} width="24" height="25"
                                             viewBox="0 0 24 25" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M10 3.33643C10.667 3.33643 11.333 3.58943 12 4.09643C12.667 3.58943 13.333 3.33643 14 3.33643H20C20.5304 3.33643 21.0391 3.54714 21.4142 3.92221C21.7893 4.29728 22 4.80599 22 5.33643V18.3364C22 18.8669 21.7893 19.3756 21.4142 19.7506C21.0391 20.1257 20.5304 20.3364 20 20.3364H13C13 20.8884 12.55 21.3364 12 21.3364C11.45 21.3364 11 20.8864 11 20.3364H4C3.46957 20.3364 2.96086 20.1257 2.58579 19.7506C2.21071 19.3756 2 18.8669 2 18.3364V5.33643C2 4.80599 2.21071 4.29728 2.58579 3.92221C2.96086 3.54714 3.46957 3.33643 4 3.33643H10ZM10 5.33643H4V18.3364H11V6.33643C11 5.78643 10.55 5.33643 10 5.33643ZM20 5.33643H14C13.45 5.33643 13 5.78643 13 6.33643V18.3364H20V5.33643Z"
                                                  fill="#8840E6"/>
                                        </svg>
                                        <div>
                                            <p className="mb-0 text-left">{item.title}</p>
                                            <p className="mb-0 text-left">Added by {item.createdBy}</p>
                                        </div>
                                    </div>
                                    <svg
                                        onClick={() => setSelectedTopicList([...selectedTopicList.filter(item1 => item1._id !== item._id)])}
                                        width="24" height="25"
                                        style={{transform: 'rotate(45deg)'}}
                                        viewBox="0 0 24 25" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 2.33643C17.523 2.33643 22 6.81343 22 12.3364C22 17.8594 17.523 22.3364 12 22.3364C6.477 22.3364 2 17.8594 2 12.3364C2 6.81343 6.477 2.33643 12 2.33643ZM12 4.33643C9.87827 4.33643 7.84344 5.17928 6.34315 6.67957C4.84285 8.17986 4 10.2147 4 12.3364C4 14.4582 4.84285 16.493 6.34315 17.9933C7.84344 19.4936 9.87827 20.3364 12 20.3364C14.1217 20.3364 16.1566 19.4936 17.6569 17.9933C19.1571 16.493 20 14.4582 20 12.3364C20 10.2147 19.1571 8.17986 17.6569 6.67957C16.1566 5.17928 14.1217 4.33643 12 4.33643ZM12 7.33643C12.2652 7.33643 12.5196 7.44178 12.7071 7.62932C12.8946 7.81686 13 8.07121 13 8.33643V11.3364H16C16.2652 11.3364 16.5196 11.4418 16.7071 11.6293C16.8946 11.8169 17 12.0712 17 12.3364C17 12.6016 16.8946 12.856 16.7071 13.0435C16.5196 13.2311 16.2652 13.3364 16 13.3364H13V16.3364C13 16.6016 12.8946 16.856 12.7071 17.0435C12.5196 17.2311 12.2652 17.3364 12 17.3364C11.7348 17.3364 11.4804 17.2311 11.2929 17.0435C11.1054 16.856 11 16.6016 11 16.3364V13.3364H8C7.73478 13.3364 7.48043 13.2311 7.29289 13.0435C7.10536 12.856 7 12.6016 7 12.3364C7 12.0712 7.10536 11.8169 7.29289 11.6293C7.48043 11.4418 7.73478 11.3364 8 11.3364H11V8.33643C11 8.07121 11.1054 7.81686 11.2929 7.62932C11.4804 7.44178 11.7348 7.33643 12 7.33643Z"
                                            fill="#e760e6"/>
                                    </svg>
                                </div>)}
                            </div>}
                        </div>

                        <br/>

                        <SelectOutlinedWrapper onClick={showLevelListModal} text="Educational Level & Class"
                                               text1={level}/>
                        <br/>
                        <SelectOutlinedWrapper onClick={showSyllabusListModal} text="Syllabus" text1={syllabus}/>
                        <br/>

                        <div className="d-flex justify-content-center">
                            <Button color='gradient-primary' onClick={addSubject}>SAVE</Button>
                        </div>

                    </div>
                    <div className="col-6">
                        <div style={{height: '45%'}} className="mb-1">
                            <Card style={{maxHeight: '250px', height: '100%'}} className="p-1">
                                <Input type="text" placeholder="Search subjects" value={subjectSearchStr}
                                       onChange={(e) => setSubjectSearchStr(e.target.value)}/>
                                <p className="mt-1">SUBJECTS</p>
                                <div className="full-height" style={{overflowY: 'auto'}}>
                                    {subjectList.filter((item1) => item1.subject.title.toLowerCase().includes(subjectSearchStr.toLowerCase()))
                                        .map((item) => <div
                                            className="d-flex justify-content-between p-1 add-item-study align-items-center cursor-pointer">
                                            <div className="d-flex">
                                                <img style={{height: '40px', width: '40px', marginRight: 10}}
                                                     src={process.env.REACT_APP_3BUCKET_URL + item.subject.coverImage}/>
                                                <div>
                                                    <p className="mb-0">{item.subject.title}</p>
                                                    <p className="mb-0">Added by {item.creator.firstName}</p>
                                                </div>
                                            </div>
                                            <svg onClick={() => setSelectedSubject(item)} width="24" height="25"
                                                 viewBox="0 0 24 25" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 2.33643C17.523 2.33643 22 6.81343 22 12.3364C22 17.8594 17.523 22.3364 12 22.3364C6.477 22.3364 2 17.8594 2 12.3364C2 6.81343 6.477 2.33643 12 2.33643ZM12 4.33643C9.87827 4.33643 7.84344 5.17928 6.34315 6.67957C4.84285 8.17986 4 10.2147 4 12.3364C4 14.4582 4.84285 16.493 6.34315 17.9933C7.84344 19.4936 9.87827 20.3364 12 20.3364C14.1217 20.3364 16.1566 19.4936 17.6569 17.9933C19.1571 16.493 20 14.4582 20 12.3364C20 10.2147 19.1571 8.17986 17.6569 6.67957C16.1566 5.17928 14.1217 4.33643 12 4.33643ZM12 7.33643C12.2652 7.33643 12.5196 7.44178 12.7071 7.62932C12.8946 7.81686 13 8.07121 13 8.33643V11.3364H16C16.2652 11.3364 16.5196 11.4418 16.7071 11.6293C16.8946 11.8169 17 12.0712 17 12.3364C17 12.6016 16.8946 12.856 16.7071 13.0435C16.5196 13.2311 16.2652 13.3364 16 13.3364H13V16.3364C13 16.6016 12.8946 16.856 12.7071 17.0435C12.5196 17.2311 12.2652 17.3364 12 17.3364C11.7348 17.3364 11.4804 17.2311 11.2929 17.0435C11.1054 16.856 11 16.6016 11 16.3364V13.3364H8C7.73478 13.3364 7.48043 13.2311 7.29289 13.0435C7.10536 12.856 7 12.6016 7 12.3364C7 12.0712 7.10536 11.8169 7.29289 11.6293C7.48043 11.4418 7.73478 11.3364 8 11.3364H11V8.33643C11 8.07121 11.1054 7.81686 11.2929 7.62932C11.4804 7.44178 11.7348 7.33643 12 7.33643Z"
                                                    fill="#8840E6"/>
                                            </svg>
                                        </div>)}
                                    {subjectList.length === 0 &&
                                        <div className="d-flex justify-content-center align-items-center full-height">
                                            <span>Please choose educational level and syllabus</span>
                                        </div>}
                                </div>
                            </Card>
                        </div>
                        <div style={{height: '45%'}}>
                            <Card style={{maxHeight: '250px', height: '100%'}} className="p-1">
                                <Input type="text" placeholder="Search topics" value={topicSearchStr}
                                       onChange={(e) => setTopicSearchStr(e.target.value)}/>
                                <p className="mt-1">TOPICS</p>
                                <div className="full-height" style={{overflowY: 'auto'}}>
                                    {topicList?.filter((item1) => item1.title.toLowerCase().includes(topicSearchStr.toLowerCase()))
                                        .map((item) => <div
                                            className="d-flex justify-content-between p-1 add-item-study align-items-center cursor-pointer">
                                            <div className="d-flex align-items-center">
                                                <svg style={{marginRight: 10}} width="24" height="25"
                                                     viewBox="0 0 24 25" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M10 3.33643C10.667 3.33643 11.333 3.58943 12 4.09643C12.667 3.58943 13.333 3.33643 14 3.33643H20C20.5304 3.33643 21.0391 3.54714 21.4142 3.92221C21.7893 4.29728 22 4.80599 22 5.33643V18.3364C22 18.8669 21.7893 19.3756 21.4142 19.7506C21.0391 20.1257 20.5304 20.3364 20 20.3364H13C13 20.8884 12.55 21.3364 12 21.3364C11.45 21.3364 11 20.8864 11 20.3364H4C3.46957 20.3364 2.96086 20.1257 2.58579 19.7506C2.21071 19.3756 2 18.8669 2 18.3364V5.33643C2 4.80599 2.21071 4.29728 2.58579 3.92221C2.96086 3.54714 3.46957 3.33643 4 3.33643H10ZM10 5.33643H4V18.3364H11V6.33643C11 5.78643 10.55 5.33643 10 5.33643ZM20 5.33643H14C13.45 5.33643 13 5.78643 13 6.33643V18.3364H20V5.33643Z"
                                                          fill="#8840E6"/>
                                                </svg>
                                                <div>
                                                    <p className="mb-0">{item.title}</p>
                                                    <p className="mb-0">Added by {item.createdBy}</p>
                                                </div>
                                            </div>
                                            <svg
                                                onClick={() => !selectedTopicList.some(item1 => item1._id === item._id) && setSelectedTopicList([...selectedTopicList, item])}
                                                width="24" height="25"
                                                viewBox="0 0 24 25" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 2.33643C17.523 2.33643 22 6.81343 22 12.3364C22 17.8594 17.523 22.3364 12 22.3364C6.477 22.3364 2 17.8594 2 12.3364C2 6.81343 6.477 2.33643 12 2.33643ZM12 4.33643C9.87827 4.33643 7.84344 5.17928 6.34315 6.67957C4.84285 8.17986 4 10.2147 4 12.3364C4 14.4582 4.84285 16.493 6.34315 17.9933C7.84344 19.4936 9.87827 20.3364 12 20.3364C14.1217 20.3364 16.1566 19.4936 17.6569 17.9933C19.1571 16.493 20 14.4582 20 12.3364C20 10.2147 19.1571 8.17986 17.6569 6.67957C16.1566 5.17928 14.1217 4.33643 12 4.33643ZM12 7.33643C12.2652 7.33643 12.5196 7.44178 12.7071 7.62932C12.8946 7.81686 13 8.07121 13 8.33643V11.3364H16C16.2652 11.3364 16.5196 11.4418 16.7071 11.6293C16.8946 11.8169 17 12.0712 17 12.3364C17 12.6016 16.8946 12.856 16.7071 13.0435C16.5196 13.2311 16.2652 13.3364 16 13.3364H13V16.3364C13 16.6016 12.8946 16.856 12.7071 17.0435C12.5196 17.2311 12.2652 17.3364 12 17.3364C11.7348 17.3364 11.4804 17.2311 11.2929 17.0435C11.1054 16.856 11 16.6016 11 16.3364V13.3364H8C7.73478 13.3364 7.48043 13.2311 7.29289 13.0435C7.10536 12.856 7 12.6016 7 12.3364C7 12.0712 7.10536 11.8169 7.29289 11.6293C7.48043 11.4418 7.73478 11.3364 8 11.3364H11V8.33643C11 8.07121 11.1054 7.81686 11.2929 7.62932C11.4804 7.44178 11.7348 7.33643 12 7.33643Z"
                                                    fill="#8840E6"/>
                                            </svg>
                                        </div>)}
                                    {topicList?.length === 0 &&
                                        <div className="d-flex justify-content-center align-items-center full-height">
                                            <span>{selectedSubject ? 'No topic on this subject' : 'Please choose subject'}</span>
                                        </div>}
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>

                <LevelSelectModal title="Educational Level & Class" onSelected={onLevelSelected}/>

                <SyllabusSelectModal title="Syllabus" onSelected={onSyllabusSelected}/>

            </ModalBody>
        </Modal>
    );
};