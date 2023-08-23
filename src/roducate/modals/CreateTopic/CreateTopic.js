import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showSubjectSelectModal, showTermsLevelSelectModal} from '@store/actions/modal'
import {PlusCircle, X} from "react-feather";
import './CreateTopic.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {SubjectSelectModal} from "../SubjectSelectModal/SubjectSelectModal";
import AddCreators from "../../components/AddCreators/AddCreators";
import {TermsLevelSelectModal} from "../TermsLevelSelectModal/TermsLevelSelectModal";
import {
    showAddTaskModal,
    showAddTopicContentModal,
    showAddTopicModal,
    showMediaLibModal
} from "../../../redux/actions/modal";
import {showMediaPlayModal} from "../../../redux/actions/media";
import {CreateTask} from "../CreateTask/CreateTask";
import {MediaGalleryModal} from "../MediaGalleryModal/MediaGalleryModal";
import {AddTopicContentModal} from "../AddTopicContentModal/AddTopicContentModal";
import {getDocument, GlobalWorkerOptions, version} from 'pdfjs-dist';
import CustomUppyFileUploader from "../../components/CustomUppyFileUploader/CustomUppyFileUploader";
import axios from "../../../utility/axios";
import DurationPicker from "react-duration-picker";

export const CreateTopic = ({topic = undefined, onChange = undefined}) => {

    GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`;

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const mediaStore = useSelector(state => state.media)
    const dispatch = useDispatch()

    const [creators, setCreators] = useState([]);

    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState(undefined);
    const [termsLevel, setTermsLevel] = useState(undefined);

    // questions
    const [questions, setQuestions] = useState(undefined)
    const [instruction, setInstruction] = useState('')
    const [duration, setDuration] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [videos, setVideos] = useState([])
    const [podcasts, setPodcasts] = useState([])
    const [games, setGames] = useState([])

    const [noteDuration, setNoteDuration] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [studySteps, setStudySteps] = useState([])

    // for UI
    const [selectedType, setSelectedType] = useState(undefined)
    const [insertIndex, setInsertIndex] = useState(0)
    const [isQAInsertMode, setIsQAInsertMode] = useState(false)
    const [editingQA, setEditingQA] = useState(undefined)
    const [initialDuration, setInitialDuration] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    let pdfRef

    useEffect(() => {
        if (topic) {
            setSubject({...topic?.subject, educationLevel: topic.educationLevel, syllabus: topic.syllabus})
            setTermsLevel(topic.termsLevel)
        } else {
            setSubject(undefined)
            setTermsLevel(undefined)
        }
    }, [store.showAddTopicModal])

    const onDurationChange = (newDuration) => {
        const {hours, minutes, seconds} = newDuration;
        if (hours === noteDuration.hours && minutes === noteDuration.minutes && seconds === noteDuration.seconds)
            return

        setNoteDuration({hours, minutes, seconds});
    };

    const publish = async (isPublished = true) => {
        if (!subject || !questions || !termsLevel || title === '' || studySteps.length === 0 || ((noteDuration.hours * 3600) + (noteDuration.minutes * 60) + noteDuration.seconds) === 0) {
            return MySwal.fire({
                title: 'Error!',
                text: 'Please input correctly',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        let tmpStudySteps = []
        let tmpDescription = []
        for (let i = 0; i < studySteps.length; i++) {
            if (studySteps[i].type === 'qa') {
                tmpStudySteps.push({description: tmpDescription})
                tmpDescription = []

                tmpStudySteps.push({
                    quickAssessment: studySteps[i].content.filter((item) => item !== null).map((questionItem) => {
                        switch (questionItem.questionType) {
                            case "theory":
                                return {
                                    index: questionItem.index,
                                    questionTitle: questionItem.title,
                                    questionType: 'theory',
                                    theoryCorrectAnswer: questionItem.questionContent.answer,
                                    sbsg: questionItem?.sbsg?.id ?? ''
                                }
                            case "drag-word":
                                return {
                                    index: questionItem.index,
                                    questionTitle: questionItem.title,
                                    questionType: 'drag',
                                    options: questionItem?.questionContent?.options,
                                    correctAnswers: questionItem?.questionContent?.correctAnswers,
                                    sbsg: questionItem?.sbsg?.id ?? ''
                                }
                            case "drag-image":
                                return {
                                    index: questionItem.index,
                                    questionTitle: questionItem.title,
                                    questionType: 'drag',
                                    options: questionItem?.questionContent?.options.map((item) => ({
                                        ...item,
                                        title: item.title.split('/')[item.title.split('/').length - 1]
                                    })),
                                    correctAnswers: questionItem?.questionContent?.correctAnswers,
                                    sbsg: questionItem?.sbsg?.id ?? ''
                                }
                            case "object-word":
                                return {
                                    index: questionItem.index,
                                    questionTitle: questionItem.title,
                                    questionType: 'object',
                                    optionType: questionItem.questionContent.optionType,
                                    options: questionItem?.questionContent?.options,
                                    correctAnswers: questionItem?.questionContent?.correctAnswers,
                                    sbsg: questionItem?.sbsg?.id ?? ''
                                }
                            case "object-image":
                                return {
                                    index: questionItem.index,
                                    questionTitle: questionItem.title,
                                    questionType: 'object',
                                    optionType: questionItem.questionContent.optionType,
                                    options: questionItem?.questionContent?.options.map((item) => ({
                                        ...item,
                                        title: item.title.split('/')[item.title.split('/').length - 1]
                                    })),
                                    correctAnswers: questionItem?.questionContent?.correctAnswers,
                                    sbsg: questionItem?.sbsg?.id ?? ''
                                }
                        }
                    })
                })
            } else {
                if (studySteps[i].type === 'header') {
                    let tmpDescriptionItem = {
                        title: studySteps[i].content,
                        content: [(i + 1) < studySteps.length && studySteps[i + 1].type !== 'header' && studySteps[i + 1].type !== 'image' ?
                            studySteps[i + 1].content : '']
                    }
                    if ((i + 1) < studySteps.length && studySteps[i + 1].type === 'image') {
                        tmpDescriptionItem = {...tmpDescriptionItem, image: studySteps[i + 1].image}
                    }

                    tmpDescription.push(tmpDescriptionItem)
                    if ((i + 1) < studySteps.length && studySteps[i + 1].type !== 'header')
                        i++
                } else {
                    if (studySteps[i].type === 'image') tmpDescription.push({image: studySteps[i].image})
                    else tmpDescription.push({content: [studySteps[i].content]})
                }
            }
        }

        if (tmpDescription.length !== 0)
            tmpStudySteps.push({description: tmpDescription})

        let res;
        try {
            res = await axios.post('/library/topic', {
                title,
                subjectId: subject._id,
                syllabus: subject.syllabus._id,
                educationLevel: subject.educationLevel._id,
                termsLevel: termsLevel._id,
                isPublished,
                videos: videos.map((item) => item._id),
                podcasts: podcasts.map((item) => item._id),
                questions,
                duration: (duration.hours * 3600) + (duration.minutes * 60) + duration.seconds,
                isTimed: true,
                taskInstruction: instruction,
                studySteps: tmpStudySteps,
                creators,
                noteDuration: (noteDuration.hours * 3600) + (noteDuration.minutes * 60) + noteDuration.seconds,
            })
        } catch (e) {
            return MySwal.fire({
                title: 'Error!',
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

        if (res && res.data && res.data.success) {
            setCreators([]);
            setTitle('')
            setSubject(undefined)
            setTermsLevel(undefined)
            setQuestions(undefined)
            setInstruction('')
            setDuration({
                hours: 0,
                minutes: 0,
                seconds: 0
            });

            setVideos([])
            setPodcasts([])
            setGames([])

            setNoteDuration({
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            setStudySteps([])

            // for UI
            setSelectedType(undefined)
            setInsertIndex(0)
            setIsQAInsertMode(false)
            setEditingQA(undefined)

            MySwal.fire({
                title: 'Error!',
                text: 'Topic created successfully.',
                icon: 'success',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-info'
                },
                buttonsStyling: false
            }).then(function (result) {
                dispatch(showAddTaskModal())
            })

            dispatch(showAddTopicModal())
        } else {
            return MySwal.fire({
                title: 'Error!',
                text: 'Something went wrong',
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

    const handlePDFSelect = (event) => {
        const file = event.target.files[0];

        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const buffer = e.target.result;
                const typedArray = new Uint8Array(buffer);

                try {
                    const loadingTask = getDocument(typedArray);
                    const pdf = await loadingTask.promise;

                    let content = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const pageText = await page.getTextContent();
                        const pageString = pageText.items.map((item) => item.str).join(' ');
                        content += pageString + ' ';
                    }

                    if (content !== '')
                        setStudySteps([...studySteps.slice(0, insertIndex), {
                            type: selectedType,
                            content
                        }, ...studySteps.slice(insertIndex)])

                    // Get the file input element by its id
                    let fileInput = document.getElementById('pdf-file-input');

                    // Clear the value of the file input field
                    fileInput.value = '';

                } catch (error) {
                    console.error('Error reading PDF:', error);
                }
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const onOptionImgAttached = (images, index) => {
        setStudySteps([...studySteps.slice(0, index), {
            type: 'image',
            content: "",
            image: images[0].title
        }, ...studySteps.slice(index + 1)])
    }

    return (
        <Modal toggle={() => dispatch(showAddTopicModal())}
               isOpen={store.showAddTopicModal}
               style={{maxWidth: '80%'}}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showAddTopicModal())}>
                <div className="d-flex justify-content-between align-items-center">
                    <AddCreators onCreatorChange={(creators) => setCreators(creators.map((item) => item._id))}/>
                    <div className="d-flex">
                        <Button className="mr-1" color='gradient-primary ghost' onClick={() => publish(false)}>Save as
                            Draft</Button>
                        {/*<Button className="mr-1" color='gradient-primary'>Preview</Button>*/}
                        <Button color='gradient-primary' onClick={() => publish(true)}>Publish</Button>
                    </div>
                    <Button.Ripple onClick={() => dispatch(showAddTopicModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>

                <div className="row">
                    <div className="col-8 p-1">
                        <div>
                            <p style={{textAlign: 'center'}}>CREATE TOPIC</p>
                            <Input type="text" className="mb-1" placeholder="Topic title" value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>

                            {studySteps.map((item, index) => {
                                return <div className="d-flex align-items-center mb-1">
                                    {item.type === 'header' &&
                                        <svg className="mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5 3C4.73478 3 4.48043 3.10536 4.29289 3.29289C4.10536 3.48043 4 3.73478 4 4C4 4.26522 4.10536 4.51957 4.29289 4.70711C4.48043 4.89464 4.73478 5 5 5H11V20C11 20.2652 11.1054 20.5196 11.2929 20.7071C11.4804 20.8946 11.7348 21 12 21C12.2652 21 12.5196 20.8946 12.7071 20.7071C12.8946 20.5196 13 20.2652 13 20V5H19C19.2652 5 19.5196 4.89464 19.7071 4.70711C19.8946 4.51957 20 4.26522 20 4C20 3.73478 19.8946 3.48043 19.7071 3.29289C19.5196 3.10536 19.2652 3 19 3H5Z"
                                                fill="#8840E6"/>
                                        </svg>}
                                    {item.type !== 'header' &&
                                        <PlusCircle className="mr-1 cursor-pointer"
                                                    onClick={() => {
                                                        setInsertIndex(index);
                                                        dispatch(showAddTopicContentModal(true))
                                                    }}/>}

                                    {item.type === 'header' &&
                                        <Input type="text" placeholder="Header" value={studySteps[index].content}
                                               onChange={(e) => setStudySteps([...studySteps.slice(0, index), {
                                                   type: item.type,
                                                   content: e.target.value
                                               }, ...studySteps.slice(index + 1)])}/>}

                                    {(item.type === 'pdf' || item.type === 'note') &&
                                        <Input type="textarea" rows="5" value={studySteps[index].content}
                                               placeholder="Note"
                                               onChange={(e) => setStudySteps([...studySteps.slice(0, index), {
                                                   type: item.type,
                                                   content: e.target.value
                                               }, ...studySteps.slice(index + 1)])}/>
                                    }
                                    {(item.type === 'image') &&
                                        <CustomUppyFileUploader multi={false}
                                                                currentImgs={studySteps[index]?.image ? [{title: studySteps[index]?.image}] : []}
                                                                onFileChange={(images) => onOptionImgAttached(images, index)}/>}
                                    {(item.type === 'qa') && <div className="qa-container">
                                        <span className="qa-edit-button">QUICK ASSESSMENT</span>
                                        <div className="d-flex justify-content-between mt-1">
                                            <div className="d-flex align-items-center">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M10.5 13.5C10.6912 13.5002 10.875 13.5734 11.014 13.7046C11.153 13.8359 11.2367 14.0152 11.2479 14.206C11.2591 14.3969 11.197 14.5848 11.0743 14.7314C10.9516 14.878 10.7776 14.9722 10.5877 14.9948L10.5 15H3C2.80884 14.9998 2.62498 14.9266 2.48597 14.7954C2.34697 14.6641 2.26332 14.4848 2.25212 14.294C2.24092 14.1031 2.30301 13.9152 2.4257 13.7686C2.54839 13.622 2.72243 13.5278 2.91225 13.5052L3 13.5H10.5ZM15 9.75C15.1989 9.75 15.3897 9.82902 15.5303 9.96967C15.671 10.1103 15.75 10.3011 15.75 10.5C15.75 10.6989 15.671 10.8897 15.5303 11.0303C15.3897 11.171 15.1989 11.25 15 11.25H3C2.80109 11.25 2.61032 11.171 2.46967 11.0303C2.32902 10.8897 2.25 10.6989 2.25 10.5C2.25 10.3011 2.32902 10.1103 2.46967 9.96967C2.61032 9.82902 2.80109 9.75 3 9.75H15ZM10.5 6C10.6912 6.00021 10.875 6.07341 11.014 6.20464C11.153 6.33586 11.2367 6.51521 11.2479 6.70605C11.2591 6.89688 11.197 7.08478 11.0743 7.23137C10.9516 7.37796 10.7776 7.47217 10.5877 7.49475L10.5 7.5H3C2.80884 7.49979 2.62498 7.42659 2.48597 7.29536C2.34697 7.16414 2.26332 6.98479 2.25212 6.79395C2.24092 6.60312 2.30301 6.41522 2.4257 6.26863C2.54839 6.12204 2.72243 6.02783 2.91225 6.00525L3 6H10.5ZM15 2.25C15.1912 2.25021 15.375 2.32341 15.514 2.45464C15.653 2.58586 15.7367 2.76521 15.7479 2.95605C15.7591 3.14688 15.697 3.33478 15.5743 3.48137C15.4516 3.62796 15.2776 3.72217 15.0878 3.74475L15 3.75H3C2.80884 3.74979 2.62498 3.67659 2.48597 3.54536C2.34697 3.41414 2.26332 3.23479 2.25212 3.04395C2.24092 2.85312 2.30301 2.66522 2.4257 2.51863C2.54839 2.37204 2.72243 2.27783 2.91225 2.25525L3 2.25H15Z"
                                                        fill="#C0C1C3"/>
                                                </svg>
                                                <span className="ml-1">{item.content.length} Questions</span>
                                            </div>
                                            <div className="qa-edit-btn-container cursor-pointer" onClick={() => {
                                                setEditingQA({questions: studySteps[insertIndex].content})
                                                setIsQAInsertMode(true)
                                                dispatch(showAddTaskModal(true))
                                            }}>
                                                <span className="qa-edit-button">Edit</span>
                                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M17.2241 3.02991C16.849 2.65497 16.3404 2.44434 15.8101 2.44434C15.2798 2.44434 14.7711 2.65497 14.3961 3.02991L4.08209 13.3439C3.70699 13.7189 3.49621 14.2275 3.49609 14.7579V19.9909C3.49609 20.5479 3.94909 21.0009 4.50609 21.0009L20.5001 20.9999C20.7653 20.9999 21.0197 20.8946 21.2072 20.707C21.3947 20.5195 21.5001 20.2651 21.5001 19.9999C21.5001 19.7347 21.3947 19.4803 21.2072 19.2928C21.0197 19.1053 20.7653 18.9999 20.5001 18.9999H12.5681L21.4671 10.1009C21.842 9.72585 22.0527 9.21724 22.0527 8.68691C22.0527 8.15658 21.842 7.64796 21.4671 7.27291L17.2241 3.02991ZM9.74009 18.9999L20.0531 8.68691L15.8101 4.44391L5.49609 14.7579V18.9999H9.74009Z"
                                                          fill="#8840E6"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>}

                                </div>
                            })}

                            <div className="mt-2">
                                <span style={{cursor: 'pointer'}}
                                      onClick={() => {
                                          setInsertIndex(studySteps.length);
                                          dispatch(showAddTopicContentModal(true))
                                      }}
                                      className="add-more-questions-btn"><PlusCircle/>&nbsp;&nbsp;</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="mt-2">
                            <SelectOutlinedWrapper onClick={() => dispatch(showSubjectSelectModal())} text="Subject"
                                                   text1={subject ? subject.title : ''}/>
                            <SelectOutlinedWrapper text="Syllabus"
                                                   text1={subject ? subject.syllabus.title : ''}/>
                            <SelectOutlinedWrapper text="Education Level & Class"
                                                   text1={subject ? subject.educationLevel.title : ''}/>
                            <SelectOutlinedWrapper text="Period"
                                                   onClick={() => {
                                                       if (!subject)
                                                           return MySwal.fire({
                                                               title: 'Error!',
                                                               text: 'Please select subject first.',
                                                               icon: 'error',
                                                               timer: 2000,
                                                               position: 'center',
                                                               customClass: {
                                                                   confirmButton: 'btn btn-danger'
                                                               },
                                                               buttonsStyling: false
                                                           })
                                                       dispatch(showTermsLevelSelectModal(true))
                                                   }}
                                                   text1={termsLevel ? termsLevel.title : ''}/>

                            <div className="mt-1 mb-1">
                                <p>Duration:</p>
                                <DurationPicker
                                    onChange={onDurationChange}
                                    initialDuration={initialDuration}
                                    maxHours={100}
                                />
                            </div>

                            <hr/>
                            <p style={{textAlign: 'center'}}>Task</p>
                            {!questions && <div className="p-1 d-flex justify-content-center align-items-center"
                                                style={{
                                                    cursor: 'pointer',
                                                    borderRadius: '10px',
                                                    backgroundColor: '#F8F7FE'
                                                }}
                                                onClick={() => {
                                                    if (!subject) {
                                                        return MySwal.fire({
                                                            title: 'Error!',
                                                            text: 'Please select subject first.',
                                                            icon: 'error',
                                                            timer: 2000,
                                                            position: 'center',
                                                            customClass: {
                                                                confirmButton: 'btn btn-danger'
                                                            },
                                                            buttonsStyling: false
                                                        })
                                                    }
                                                    dispatch(showAddTaskModal(true))
                                                }}>
                                <PlusCircle/>&nbsp;&nbsp;&nbsp;
                                <div className="d-block">
                                    <p className="mb-1 ct-add-task">Add Task</p>
                                    <p className="mb-0 ct-click-to-add">Click to add item type</p>
                                </div>
                            </div>}
                            {questions && <div className="card p-2">
                                <p className="ct-task-subject-title">{subject?.title}</p>
                                <div className="d-flex justify-content-between">
                                    <span className="ct-task-level">{subject?.educationLevel.title}</span>
                                    <span className="ct-task-question-cnt">{questions.length} Questions</span>
                                </div>
                            </div>}

                            {/*video*/}
                            <div className="card pt-2 pl-1 pr-1 pb-1 mt-2">
                                <p style={{textAlign: 'center'}}>Videos</p>
                                <div className="row">
                                    {videos.map((video, index) => {
                                        return <div className="col-6 mb-1">
                                            <div className="d-flex"
                                                 style={{
                                                     cursor: 'pointer',
                                                     width: '100%',
                                                     aspectRatio: '2/1',
                                                     borderRadius: '10px'
                                                 }}>
                                                <div className="d-flex justify-content-center"
                                                     style={{
                                                         backgroundColor: '#8840e5',
                                                         width: '45%',
                                                         borderRadius: '10px 0 0 10px'
                                                     }}>
                                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M39.9994 6.66602C58.4094 6.66602 73.3327 21.5894 73.3327 39.9994C73.3327 58.4094 58.4094 73.3327 39.9994 73.3327C21.5894 73.3327 6.66602 58.4094 6.66602 39.9994C6.66602 21.5894 21.5894 6.66602 39.9994 6.66602ZM39.9994 13.3327C32.9269 13.3327 26.1441 16.1422 21.1432 21.1432C16.1422 26.1441 13.3327 32.9269 13.3327 39.9994C13.3327 47.0718 16.1422 53.8546 21.1432 58.8555C26.1441 63.8565 32.9269 66.666 39.9994 66.666C47.0718 66.666 53.8546 63.8565 58.8555 58.8555C63.8565 53.8546 66.666 47.0718 66.666 39.9994C66.666 32.9269 63.8565 26.1441 58.8555 21.1432C53.8546 16.1422 47.0718 13.3327 39.9994 13.3327ZM29.8793 28.8327C29.953 28.2195 30.1687 27.6318 30.5091 27.1165C30.8496 26.6012 31.3055 26.1723 31.8407 25.864C32.3758 25.5556 32.9755 25.3763 33.5921 25.3402C34.2087 25.3041 34.8252 25.4122 35.3927 25.656L36.476 26.1327L37.9427 26.806L39.106 27.3694L40.406 28.0227L41.8394 28.766L43.3793 29.6027L45.026 30.536L45.856 31.0194L47.4193 31.9594L48.846 32.8527L50.726 34.0793L52.2727 35.1393L53.7893 36.2327L54.066 36.436C56.1827 38.026 56.1994 41.1994 54.0694 42.7994L53.126 43.496L51.816 44.416L50.1627 45.5327L48.8727 46.366L47.4394 47.266L45.8627 48.2094C45.5894 48.3727 45.3093 48.536 45.0227 48.6993L43.3627 49.6394L41.8094 50.4827L40.376 51.2294L39.076 51.8827L37.3927 52.6894L36.0593 53.2927L35.386 53.586C34.8188 53.8279 34.203 53.9344 33.5875 53.8972C32.972 53.8599 32.3736 53.6799 31.8396 53.3714C31.3057 53.0629 30.8509 52.6343 30.5112 52.1196C30.1716 51.6049 29.9564 51.0183 29.8827 50.406L29.7027 48.7427L29.6027 47.6293L29.4627 45.6327L29.3827 44.0993L29.3227 42.4127L29.2893 40.5827V38.6527L29.3227 36.826L29.3827 35.1393L29.4627 33.606L29.6027 31.6094L29.8393 29.176L29.8793 28.8327ZM36.1593 33.3493L36.0694 34.906L35.9994 36.656L35.9594 38.5893V40.6493L35.9994 42.5827L36.066 44.3327L36.1593 45.8894L37.546 45.1894L38.2993 44.796L39.926 43.9227L41.6927 42.926L43.4327 41.896L44.2394 41.4027L45.7193 40.4693L47.0194 39.6194L45.7127 38.7627L44.2327 37.826L42.5793 36.826C41.7061 36.3091 40.8249 35.8057 39.936 35.316L38.3094 34.4427L36.836 33.686L36.1593 33.3493Z"
                                                              fill="white"/>
                                                    </svg>
                                                </div>
                                                <div style={{
                                                    background: `url('${process.env.REACT_APP_3BUCKET_URL + video.coverImage}')`,
                                                    width: '55%',
                                                    backgroundSize: 'cover',
                                                    borderRadius: '0 10px 10px 0'
                                                }}>

                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between" style={{margin: '5px 3px'}}>
                                                <div>
                                                <span
                                                    className="media-gallery-title">{video.mediaURL.split('.')[0]}</span>
                                                    <span
                                                        className="media-gallery-ext">.{video.mediaURL.split('.')[1]}</span>
                                                </div>
                                                <div
                                                    onClick={() => setVideos([...videos.filter((item, fIndex) => index !== fIndex)])}
                                                    className="media-gallery-btn-delete"
                                                    style={{cursor: 'pointer'}}>Delete
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>

                                <div className="d-flex align-items-center cursor-pointer" onClick={() => {
                                    dispatch(showMediaPlayModal(false, 'video'))
                                    dispatch(showMediaLibModal())
                                }}>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M19.1669 6.66655C14.7519 6.66655 11.2319 10.6332 11.7119 14.9999C11.7564 15.4042 11.6529 15.811 11.4207 16.145C11.1884 16.4789 10.8431 16.7175 10.4486 16.8165C9.27014 17.1185 8.24209 17.8395 7.55676 18.8446C6.87144 19.8498 6.57578 21.0701 6.72512 22.2774C6.87445 23.4848 7.45853 24.5963 8.3681 25.4042C9.27767 26.212 10.4504 26.6608 11.6669 26.6665H13.3336C13.7756 26.6665 14.1995 26.8421 14.5121 27.1547C14.8247 27.4673 15.0003 27.8912 15.0003 28.3332C15.0003 28.7752 14.8247 29.1992 14.5121 29.5117C14.1995 29.8243 13.7756 29.9999 13.3336 29.9999H11.6669C9.75144 30.0011 7.894 29.3425 6.40724 28.1347C4.92048 26.927 3.89516 25.244 3.50387 23.3689C3.11257 21.4938 3.37919 19.5412 4.25884 17.8396C5.13849 16.1381 6.57747 14.7915 8.33359 14.0265C8.36369 11.4998 9.27616 9.06301 10.9131 7.13792C12.55 5.21283 14.8084 3.92054 17.2975 3.48466C19.7866 3.04879 22.3497 3.49675 24.5434 4.75104C26.7371 6.00533 28.4233 7.98702 29.3103 10.3532C31.6424 10.9964 33.6625 12.4629 34.9963 14.4812C36.3302 16.4995 36.8874 18.9328 36.5648 21.3304C36.2422 23.728 35.0617 25.9275 33.2418 27.5215C31.422 29.1155 29.0861 29.996 26.6669 29.9999C26.2249 29.9999 25.801 29.8243 25.4884 29.5117C25.1758 29.1992 25.0003 28.7752 25.0003 28.3332C25.0003 27.8912 25.1758 27.4673 25.4884 27.1547C25.801 26.8421 26.2249 26.6665 26.6669 26.6665C28.342 26.6691 29.9566 26.0409 31.1896 24.9071C32.4225 23.7733 33.1835 22.2169 33.3211 20.5475C33.4587 18.8781 32.9628 17.2181 31.9321 15.8977C30.9014 14.5773 29.4114 13.6933 27.7586 13.4215C27.4403 13.3689 27.1439 13.226 26.9045 13.0097C26.6652 12.7934 26.4931 12.5129 26.4086 12.2015C25.9765 10.612 25.0333 9.20877 23.7245 8.20846C22.4157 7.20814 20.8142 6.6663 19.1669 6.66655ZM21.6669 20.6932L23.8219 22.8465C23.9769 23.0013 24.1608 23.124 24.3632 23.2077C24.5656 23.2913 24.7824 23.3343 25.0014 23.3341C25.2204 23.334 25.4372 23.2907 25.6395 23.2067C25.8418 23.1228 26.0255 22.9998 26.1803 22.8449C26.335 22.6899 26.4577 22.506 26.5414 22.3036C26.625 22.1012 26.668 21.8844 26.6678 21.6654C26.6677 21.4464 26.6244 21.2296 26.5405 21.0273C26.4565 20.825 26.3335 20.6413 26.1786 20.4865L21.4719 15.7882C21.0813 15.3984 20.5521 15.1795 20.0003 15.1795C19.4484 15.1795 18.9192 15.3984 18.5286 15.7882L13.8219 20.4882C13.5092 20.8007 13.3334 21.2247 13.3332 21.6668C13.3331 22.1089 13.5086 22.533 13.8211 22.8457C14.1336 23.1584 14.5575 23.3342 14.9997 23.3344C15.4418 23.3345 15.8659 23.1591 16.1786 22.8465L18.3336 20.6932V34.9999C18.3336 35.4419 18.5092 35.8658 18.8217 36.1784C19.1343 36.491 19.5582 36.6665 20.0003 36.6665C20.4423 36.6665 20.8662 36.491 21.1788 36.1784C21.4913 35.8658 21.6669 35.4419 21.6669 34.9999V20.6932Z"
                                              fill="#C0C1C3"/>
                                    </svg>
                                    &nbsp;&nbsp;&nbsp;
                                    <div>
                                        <p className="ct-add-media-type mb-0">Add video</p>
                                    </div>
                                </div>
                            </div>

                            {/*podcasts*/}
                            <div className="card pt-2 pl-1 pr-1 pb-1 mt-2">
                                <p style={{textAlign: 'center'}}>Podcasts</p>
                                <div className="row">
                                    {podcasts.map((podcast, index) => {
                                        return <div className="col-6 mb-1">
                                            <div className="d-flex"
                                                 style={{
                                                     cursor: 'pointer',
                                                     width: '100%',
                                                     aspectRatio: '2/1',
                                                     borderRadius: '10px'
                                                 }}>
                                                <div className="d-flex justify-content-center"
                                                     style={{
                                                         backgroundColor: '#8840e5',
                                                         width: '45%',
                                                         borderRadius: '10px 0 0 10px'
                                                     }}>
                                                    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M40 10C40.8164 10.0001 41.6045 10.2999 42.2146 10.8424C42.8247 11.3849 43.2145 12.1325 43.31 12.9433L43.3333 13.3333V66.6667C43.3324 67.5163 43.0071 68.3334 42.4238 68.9512C41.8406 69.569 41.0435 69.9408 40.1953 69.9906C39.3472 70.0404 38.5121 69.7644 37.8606 69.2191C37.209 68.6738 36.7903 67.9003 36.69 67.0567L36.6667 66.6667V13.3333C36.6667 12.4493 37.0179 11.6014 37.643 10.9763C38.2681 10.3512 39.1159 10 40 10V10ZM26.6667 20C27.5507 20 28.3986 20.3512 29.0237 20.9763C29.6488 21.6014 30 22.4493 30 23.3333V56.6667C30 57.5507 29.6488 58.3986 29.0237 59.0237C28.3986 59.6488 27.5507 60 26.6667 60C25.7826 60 24.9348 59.6488 24.3096 59.0237C23.6845 58.3986 23.3333 57.5507 23.3333 56.6667V23.3333C23.3333 22.4493 23.6845 21.6014 24.3096 20.9763C24.9348 20.3512 25.7826 20 26.6667 20V20ZM53.3333 20C54.2174 20 55.0652 20.3512 55.6904 20.9763C56.3155 21.6014 56.6667 22.4493 56.6667 23.3333V56.6667C56.6667 57.5507 56.3155 58.3986 55.6904 59.0237C55.0652 59.6488 54.2174 60 53.3333 60C52.4493 60 51.6014 59.6488 50.9763 59.0237C50.3512 58.3986 50 57.5507 50 56.6667V23.3333C50 22.4493 50.3512 21.6014 50.9763 20.9763C51.6014 20.3512 52.4493 20 53.3333 20V20ZM13.3333 30C14.2174 30 15.0652 30.3512 15.6904 30.9763C16.3155 31.6014 16.6667 32.4493 16.6667 33.3333V46.6667C16.6667 47.5507 16.3155 48.3986 15.6904 49.0237C15.0652 49.6488 14.2174 50 13.3333 50C12.4493 50 11.6014 49.6488 10.9763 49.0237C10.3512 48.3986 10 47.5507 10 46.6667V33.3333C10 32.4493 10.3512 31.6014 10.9763 30.9763C11.6014 30.3512 12.4493 30 13.3333 30V30ZM66.6667 30C67.4831 30.0001 68.2711 30.2999 68.8812 30.8424C69.4914 31.3849 69.8811 32.1325 69.9767 32.9433L70 33.3333V46.6667C69.9991 47.5163 69.6737 48.3334 69.0905 48.9512C68.5073 49.569 67.7102 49.9408 66.862 49.9906C66.0139 50.0404 65.1787 49.7644 64.5272 49.2191C63.8757 48.6738 63.457 47.9003 63.3567 47.0567L63.3333 46.6667V33.3333C63.3333 32.4493 63.6845 31.6014 64.3096 30.9763C64.9348 30.3512 65.7826 30 66.6667 30Z"
                                                            fill="white"/>
                                                    </svg>
                                                </div>
                                                <div style={{
                                                    background: `url('${process.env.REACT_APP_3BUCKET_URL + podcast.coverImage}')`,
                                                    width: '55%',
                                                    backgroundSize: 'cover',
                                                    borderRadius: '0 10px 10px 0'
                                                }}>

                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between" style={{margin: '5px 3px'}}>
                                                <div>
                                                <span
                                                    className="media-gallery-title">{podcast.mediaURL.split('.')[0]}</span>
                                                    <span
                                                        className="media-gallery-ext">.{podcast.mediaURL.split('.')[1]}</span>
                                                </div>
                                                <div
                                                    onClick={() => setPodcasts([...podcasts.filter((item, fIndex) => index !== fIndex)])}
                                                    className="media-gallery-btn-delete"
                                                    style={{cursor: 'pointer'}}>Delete
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>

                                <div className="d-flex align-items-center cursor-pointer" onClick={() => {
                                    dispatch(showMediaPlayModal(false, 'podcast'))
                                    dispatch(showMediaLibModal())
                                }}>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M19.1669 6.66655C14.7519 6.66655 11.2319 10.6332 11.7119 14.9999C11.7564 15.4042 11.6529 15.811 11.4207 16.145C11.1884 16.4789 10.8431 16.7175 10.4486 16.8165C9.27014 17.1185 8.24209 17.8395 7.55676 18.8446C6.87144 19.8498 6.57578 21.0701 6.72512 22.2774C6.87445 23.4848 7.45853 24.5963 8.3681 25.4042C9.27767 26.212 10.4504 26.6608 11.6669 26.6665H13.3336C13.7756 26.6665 14.1995 26.8421 14.5121 27.1547C14.8247 27.4673 15.0003 27.8912 15.0003 28.3332C15.0003 28.7752 14.8247 29.1992 14.5121 29.5117C14.1995 29.8243 13.7756 29.9999 13.3336 29.9999H11.6669C9.75144 30.0011 7.894 29.3425 6.40724 28.1347C4.92048 26.927 3.89516 25.244 3.50387 23.3689C3.11257 21.4938 3.37919 19.5412 4.25884 17.8396C5.13849 16.1381 6.57747 14.7915 8.33359 14.0265C8.36369 11.4998 9.27616 9.06301 10.9131 7.13792C12.55 5.21283 14.8084 3.92054 17.2975 3.48466C19.7866 3.04879 22.3497 3.49675 24.5434 4.75104C26.7371 6.00533 28.4233 7.98702 29.3103 10.3532C31.6424 10.9964 33.6625 12.4629 34.9963 14.4812C36.3302 16.4995 36.8874 18.9328 36.5648 21.3304C36.2422 23.728 35.0617 25.9275 33.2418 27.5215C31.422 29.1155 29.0861 29.996 26.6669 29.9999C26.2249 29.9999 25.801 29.8243 25.4884 29.5117C25.1758 29.1992 25.0003 28.7752 25.0003 28.3332C25.0003 27.8912 25.1758 27.4673 25.4884 27.1547C25.801 26.8421 26.2249 26.6665 26.6669 26.6665C28.342 26.6691 29.9566 26.0409 31.1896 24.9071C32.4225 23.7733 33.1835 22.2169 33.3211 20.5475C33.4587 18.8781 32.9628 17.2181 31.9321 15.8977C30.9014 14.5773 29.4114 13.6933 27.7586 13.4215C27.4403 13.3689 27.1439 13.226 26.9045 13.0097C26.6652 12.7934 26.4931 12.5129 26.4086 12.2015C25.9765 10.612 25.0333 9.20877 23.7245 8.20846C22.4157 7.20814 20.8142 6.6663 19.1669 6.66655ZM21.6669 20.6932L23.8219 22.8465C23.9769 23.0013 24.1608 23.124 24.3632 23.2077C24.5656 23.2913 24.7824 23.3343 25.0014 23.3341C25.2204 23.334 25.4372 23.2907 25.6395 23.2067C25.8418 23.1228 26.0255 22.9998 26.1803 22.8449C26.335 22.6899 26.4577 22.506 26.5414 22.3036C26.625 22.1012 26.668 21.8844 26.6678 21.6654C26.6677 21.4464 26.6244 21.2296 26.5405 21.0273C26.4565 20.825 26.3335 20.6413 26.1786 20.4865L21.4719 15.7882C21.0813 15.3984 20.5521 15.1795 20.0003 15.1795C19.4484 15.1795 18.9192 15.3984 18.5286 15.7882L13.8219 20.4882C13.5092 20.8007 13.3334 21.2247 13.3332 21.6668C13.3331 22.1089 13.5086 22.533 13.8211 22.8457C14.1336 23.1584 14.5575 23.3342 14.9997 23.3344C15.4418 23.3345 15.8659 23.1591 16.1786 22.8465L18.3336 20.6932V34.9999C18.3336 35.4419 18.5092 35.8658 18.8217 36.1784C19.1343 36.491 19.5582 36.6665 20.0003 36.6665C20.4423 36.6665 20.8662 36.491 21.1788 36.1784C21.4913 35.8658 21.6669 35.4419 21.6669 34.9999V20.6932Z"
                                              fill="#C0C1C3"/>
                                    </svg>
                                    &nbsp;&nbsp;&nbsp;
                                    <div>
                                        <p className="ct-add-media-type mb-0">Add podcast</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </ModalBody>

            <SubjectSelectModal title="Subject" onSelected={(subjectItem) => {
                setSubject(subjectItem)
                setTermsLevel(undefined)
            }}/>
            <TermsLevelSelectModal title="Terms" onSelected={(termsLevel) => {
                setTermsLevel(termsLevel)
            }} educationLevelId={subject ? subject.educationLevel._id : ''}/>

            <CreateTask inlineMode={true}
                        qaInsertMode={isQAInsertMode}
                        task={editingQA}
                        onFinished={(finishedQuestions, duration, taskInstruction) => {
                            if (editingQA) {
                                setStudySteps([...studySteps.slice(0, insertIndex), {
                                    type: 'qa',
                                    content: finishedQuestions
                                }, ...studySteps.slice(insertIndex + 1)])

                                setEditingQA(undefined)
                                setIsQAInsertMode(false)
                                return
                            } else {
                                if (isQAInsertMode) {
                                    setStudySteps([...studySteps.slice(0, insertIndex), {
                                        type: 'qa',
                                        content: finishedQuestions,
                                    }, ...studySteps.slice(insertIndex + 1)])

                                    setIsQAInsertMode(false)
                                    return
                                }
                            }

                            setQuestions(finishedQuestions)
                            setDuration(duration)
                            setInstruction(taskInstruction)
                        }}/>

            <MediaGalleryModal type={mediaStore.mediaType} onSelected={(selectedMedia) => {
                if (mediaStore.mediaType === 'video')
                    setVideos(selectedMedia)
                else
                    setPodcasts(selectedMedia)
            }}/>

            <AddTopicContentModal onSelected={(type) => {
                dispatch(showAddTopicContentModal())

                if (type === 'pdf') {
                    setSelectedType(type)
                    pdfRef.click();
                    return
                }

                if (type === 'qa') {
                    setIsQAInsertMode(true)
                    dispatch(showAddTaskModal(true))
                    return
                }

                setStudySteps([...studySteps.slice(0, insertIndex), {
                    type,
                    content: ''
                }, ...studySteps.slice(insertIndex)])
            }}/>

            <input
                ref={(input) => {
                    pdfRef = input;
                }}
                id="pdf-file-input"
                type="file"
                style={{display: 'none'}}
                onChange={handlePDFSelect}
            />

        </Modal>
    );
};