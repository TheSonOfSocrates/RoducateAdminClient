import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showCreateMockExam, showSubjectSelectModal} from '@store/actions/modal'
import {PlusCircle, X} from "react-feather";
import './CreateMockExam.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {SubjectSelectModal} from "../SubjectSelectModal/SubjectSelectModal";
import QuestionWrapper from "../../components/QuestionWrapper/QuestionWrapper";
import axios from "../../../utility/axios";
import DurationPicker from "react-duration-picker";
import Select from "react-select";
import {selectThemeColors} from '@utils'

export const CreateMockExam = ({
                                   task,
                                   onChange = undefined,
                                   inlineMode = false,
                                   qaInsertMode = false,
                                   onFinished
                               }) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    // const [creators, setCreators] = useState([]);

    const [subject, setSubject] = useState(null);
    const [examList, setExamList] = useState([]);
    const [selectedExam, setSelectedExam] = useState(undefined);
    const [examCode, setExamCode] = useState(undefined);
    const [examYear, setExamYear] = useState(undefined);

    const [instruction, setInstruction] = useState('')
    const [duration, setDuration] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [initialDuration, setInitialDuration] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // questions
    const [questions, setQuestions] = useState([{index: 0, isExpanding: true}])

    useEffect(() => {
        if (task) {
            if (qaInsertMode) {
                setQuestions(task?.questions ?? [{index: 0, isExpanding: true}])
            } else {
                setInitialDuration({
                    hours: Math.floor(task.duration / 3600),
                    minutes: Math.floor(task.duration % 3600 / 60),
                    seconds: task.duration % 3600 % 60
                })
                setInstruction(task.taskInstruction)
                setQuestions(task.questions.map((item, index) => ({
                    index, isExpanding: false,
                    questionTitle: item.questionTitle,
                    questionType: item.questionType === 'theory' ? 'theory' : item.questionType + '-' + item.optionStyle,
                    sbsg: item.sbsg,
                    questionContent: {
                        options: item.options,
                        correctAnswers: item.correctAnswers,
                        optionStyle: item.optionStyle,
                        optionType: item.optionType,
                        theoryCorrectAnswer: item.theoryCorrectAnswer,
                    }
                })))
                setSubject({
                    _id: task?.subjectId,
                    title: task.subjectTitle,
                    educationLevel: {
                        _id: task.educationLevel,
                        title: task.educationLevelTitle
                    },
                    syllabus: {
                        _id: task.syllabus,
                        title: task.syllabusTitle
                    }
                })
            }
        } else {
            setSubject(undefined)
            setInstruction('')
            setQuestions([{index: 0, isExpanding: true}])
        }

        getExamList()
    }, [task])

    const getExamList = async () => {
        const res = await axios.post('/resource/exam/getAllExams')
        if (res) {
            setExamList(res.data)
        }
    }

    const onDurationChange = (newDuration) => {
        const {hours, minutes, seconds} = newDuration;
        if (hours === duration.hours && minutes === duration.minutes && seconds === duration.seconds)
            return

        setDuration({hours, minutes, seconds});
    };

    const addMoreQuestionClicked = () => {
        if (!questions[questions.length - 1]?.isCompleted) {
            return MySwal.fire({
                title: 'Error!',
                text: 'Please complete current question.',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        questions[questions.length - 1] = {...questions[questions.length - 1], isExpanding: false}
        setQuestions([...questions, {index: questions.length, isExpanding: true}])
    }

    const publish = async () => {
        if ((questions.length === 1 && !questions[0]?.questionContent) || !subject ||
            ((duration.hours * 3600) + (duration.minutes * 60) + duration.seconds) === 0 ||
            !selectedExam || !examCode || !examYear) {
            return MySwal.fire({
                title: 'Error!',
                text: 'Please input correctly.',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        let res;
        try {
            let link = '/resource/mockexam'
            if (task)
                link = `/resource/mockexam/${task._id}`

            res = await axios.post(link, {
                // creators,
                examId: selectedExam.value,
                examYear,
                examCode,
                subjectId: subject._id,
                educationLevel: subject?.educationLevel._id,
                taskInstruction: instruction,
                duration: (duration.hours * 3600) + (duration.minutes * 60) + duration.seconds,
                isTimed: true,
                questions: questions.filter((item) => item !== null).map((question) => {
                    switch (question.questionType) {
                        case "theory":
                            return {
                                index: question.index,
                                questionTitle: question.questionTitle,
                                questionType: 'theory',
                                theoryCorrectAnswer: question.questionContent.answer,
                                sbsg: question?.sbsg?.id ?? ''
                            }
                        case "drag-word":
                            return {
                                index: question.index,
                                questionTitle: question.questionTitle,
                                questionType: 'drag',
                                options: question?.questionContent?.options,
                                correctAnswers: question?.questionContent?.correctAnswers,
                                sbsg: question?.sbsg?.id ?? ''
                            }
                        case "drag-image":
                            return {
                                index: question.index,
                                questionTitle: question.questionTitle,
                                questionType: 'drag',
                                options: question?.questionContent?.options.map((item) => ({
                                    ...item,
                                    title: item.title.split('/')[item.title.split('/').length - 1]
                                })),
                                correctAnswers: question?.questionContent?.correctAnswers,
                                sbsg: question?.sbsg?.id ?? ''
                            }
                        case "object-word":
                            return {
                                index: question.index,
                                questionTitle: question.questionTitle,
                                questionType: 'object',
                                optionType: question.questionContent.optionType,
                                options: question?.questionContent?.options,
                                correctAnswers: question?.questionContent?.correctAnswers,
                                sbsg: question?.sbsg?.id ?? ''
                            }
                        case "object-image":
                            return {
                                index: question.index,
                                questionTitle: question.questionTitle,
                                questionType: 'object',
                                optionType: question.questionContent.optionType,
                                options: question?.questionContent?.options.map((item) => ({
                                    ...item,
                                    title: item.title.split('/')[item.title.split('/').length - 1]
                                })),
                                correctAnswers: question?.questionContent?.correctAnswers,
                                sbsg: question?.sbsg?.id ?? ''
                            }
                    }
                })
            })
        } catch (e) {
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

        if (res && res.data.success) {
            // setCreators([]);

            setSubject(undefined);
            setInstruction('')
            setDuration({
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            setQuestions([{index: 0, isExpanding: true}])

            MySwal.fire({
                title: 'Good Job!',
                text: `Mock exam ${task ? 'updated' : 'created'} successfully.`,
                icon: 'success',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-info'
                },
                buttonsStyling: false
            }).then(function (result) {
                dispatch(showCreateMockExam())
            })
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

    return (
        <Modal toggle={() => dispatch(showCreateMockExam())}
               isOpen={store.showCreateMockExam}
               style={{maxWidth: qaInsertMode ? '60%' : '80%'}}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showCreateMockExam())}>
                <div className="d-flex justify-content-between align-items-center">
                    {/*{<AddCreators onCreatorChange={(creators) => setCreators(creators.map((item) => item._id))}/>}*/}
                    <div style={{margin: 'auto'}} className="d-flex">
                        {!inlineMode && <Button className="mr-1" color='gradient-primary ghost'>Save as Draft</Button>}
                        {/*<Button className="mr-1" color='gradient-primary'>Preview</Button>*/}
                        {!inlineMode && <Button color='gradient-primary' onClick={publish}>Publish</Button>}

                        {inlineMode && <Button className="mr-1" color='gradient-primary ghost'
                                               onClick={() => dispatch(showCreateMockExam())}>Cancel</Button>}
                        {inlineMode && <Button color='gradient-primary' onClick={() => {
                            if (((!qaInsertMode && (duration.hours * 3600) + (duration.minutes * 60) + duration.seconds) === 0) || (questions.length === 1 && !questions[0]?.questionContent)) {
                                return MySwal.fire({
                                    title: 'Error!',
                                    text: 'Please input correctly.',
                                    icon: 'error',
                                    timer: 2000,
                                    position: 'center',
                                    customClass: {
                                        confirmButton: 'btn btn-danger'
                                    },
                                    buttonsStyling: false
                                })
                            }
                            onFinished(questions, duration, instruction);
                            dispatch(showCreateMockExam())
                        }}>Finish</Button>}
                    </div>
                    <Button.Ripple onClick={() => dispatch(showCreateMockExam())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>

                <div className="row">
                    <div className={qaInsertMode ? 'col-12' : 'col-8'}>
                        {questions.map((item) => <QuestionWrapper question={item}
                                                                  onQuestionUpdated={(newQuestion) => {
                                                                      questions[newQuestion.index] = newQuestion;
                                                                      setQuestions([...questions])
                                                                  }}/>)}

                        <div>
                            <div className="mt-2">
                                <span style={{cursor: 'pointer'}}
                                      onClick={addMoreQuestionClicked}
                                      className="add-more-questions-btn"><PlusCircle/>&nbsp;&nbsp;Add more Questions</span>
                            </div>
                        </div>
                    </div>
                    {!qaInsertMode && <div className="col-4">
                        <div className="mt-2">
                            {!inlineMode &&
                                <SelectOutlinedWrapper onClick={() => dispatch(showSubjectSelectModal())} text="Subject"
                                                       text1={subject ? subject.title : ''}/>}
                            {!inlineMode && <SelectOutlinedWrapper className="col-6" text="Syllabus"
                                                                   text1={subject ? subject.syllabus.title : ''}/>}
                            {!inlineMode && <SelectOutlinedWrapper className="col-6"
                                                                   text="Education Level & Class"
                                                                   text1={subject ? subject.educationLevel.title : ''}/>}

                            <Select
                                theme={selectThemeColors}
                                className='react-select mt-1 mb-1'
                                classNamePrefix='select'
                                options={examList.map(item => ({value: item._id, label: item.name}))}
                                isClearable={false}
                                value={selectedExam}
                                placeholder="Question Type"
                                onChange={(item) => {
                                    setSelectedExam(item)
                                }}
                            />

                            <Input type='text' value={examCode} placeholder='Exam Code'
                                   onChange={(e) => setExamCode(e.target.value)}/>
                            <Input type='number' className="mt-1" value={examYear} placeholder='Exam Year'
                                   onChange={(e) => setExamYear(e.target.value)}/>

                            <div className="mt-1 mb-1">
                                <p>Duration:</p>
                                <DurationPicker
                                    onChange={onDurationChange}
                                    initialDuration={initialDuration}
                                    maxHours={100}
                                />
                            </div>

                            <Input type='textarea' name='text' rows='2' value={instruction}
                                   placeholder='Task Instruction (Optional)'
                                   onChange={(e) => setInstruction(e.target.value)}/>

                        </div>
                    </div>}
                </div>
            </ModalBody>

            <SubjectSelectModal title="Subject" onSelected={(subjectItem) => {
                setSubject(subjectItem)
            }}/>
        </Modal>
    );
};