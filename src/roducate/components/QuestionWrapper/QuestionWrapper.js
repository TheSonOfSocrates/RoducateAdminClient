import {useEffect, useState} from "react";
import Select from "react-select";
import {selectThemeColors} from '@utils'
import QuestionTheory from "../QuestionTheory/QuestionTheory";
import {useDispatch} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import './QuestionWrapper.css'
import {showSBSGModal} from '@store/actions/modal'
import {SBSGFileUploadModal} from "../../modals/SBSGFileUploadModal/SBSGFileUploadModal";
import {PlusCircle} from "react-feather";
import {Input} from "reactstrap";
import QuestionDragWord from "../QuestionDragWord/QuestionDragWord";
import QuestionDragImage from "../QuestionDragImage/QuestionDragImage";
import QuestionObjectWord from "../QuestionObjectWord/QuestionObjectWord";
import QuestionObjectImage from "../QuestionObjectImage/QuestionObjectImage";

const QuestionWrapper = ({question, onQuestionUpdated}) => {

    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal)

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionType, setQuestionType] = useState('')
    const [questionContent, setQuestionContent] = useState(undefined)

    const [sbsg, setSbsg] = useState(undefined)

    // UI
    const [isExpanding, setIsExpanding] = useState(true)
    const [isCompleted, setIsCompleted] = useState(false)

    const questionTypes = [
        {value: 'theory', label: 'Theory'},
        {value: 'drag-word', label: 'Words Drag & Drop'},
        {value: 'drag-image', label: 'Image Drag & Drop'},
        {value: 'object-word', label: 'Object Words'},
        {value: 'object-image', label: 'Object Image'}
    ]

    useEffect(() => {
        console.log(question)
        setQuestionTitle(question?.questionTitle)
        setQuestionType(question?.questionType)
        setQuestionContent(question?.questionContent)
        setSbsg(question?.sbsg)
        setIsExpanding(question?.isExpanding ?? false)
        setIsCompleted(question?.isCompleted ?? true)
    }, [question])

    const onSBSGAdded = (sbsg) => {
        onQuestionUpdated({
            index: question.index,
            questionTitle,
            questionType,
            questionContent,
            sbsg,
            isExpanding,
            isCompleted
        })
    }

    const editSbsg = () => {

    }

    return (
        <div className="p-1 align-items-center">
            <div onClick={() => setIsExpanding(!isExpanding)}
                 style={{backgroundColor: isExpanding ? '#A05AFF4C' : ''}}
                 className="align-items-center cursor-pointer d-flex justify-content-between question-title-wrapper">
                <div className="d-flex align-items-center">
                    <span
                        className="question-title-index">{question?.index + 1}.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    <div>
                        <p className="question-title mb-0">{questionTitle}</p>
                        {question.questionType && !question.isExpanding && <div className="mt-1">
                            <div className="question-title-sub-info">Type&nbsp;&nbsp;&nbsp;<span
                                className="question-title-sub-value">{question?.questionType}</span>
                            </div>
                        </div>}

                        {question.sbsb && !question.isExpanding && <span className="question-title-sub-info">Step-By-Step
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9.5" r="7.5" fill="white"/>
                                <path
                                    d="M9 2C13.1423 2 16.5 5.35775 16.5 9.5C16.5 13.6423 13.1423 17 9 17C4.85775 17 1.5 13.6423 1.5 9.5C1.5 5.35775 4.85775 2 9 2ZM11.6512 6.78575L7.93875 10.4983L6.34875 8.9075C6.27912 8.83782 6.19644 8.78253 6.10544 8.7448C6.01444 8.70707 5.9169 8.68763 5.81839 8.6876C5.61944 8.68753 5.42861 8.76649 5.28787 8.90713C5.14714 9.04776 5.06804 9.23853 5.06797 9.43748C5.0679 9.63644 5.14687 9.82727 5.2875 9.968L7.356 12.0365C7.43261 12.1131 7.52358 12.174 7.6237 12.2154C7.72382 12.2569 7.83113 12.2783 7.9395 12.2783C8.04787 12.2783 8.15518 12.2569 8.2553 12.2154C8.35542 12.174 8.44639 12.1131 8.523 12.0365L12.7125 7.847C12.8532 7.70627 12.9323 7.5154 12.9323 7.31637C12.9323 7.11735 12.8532 6.92648 12.7125 6.78575C12.5718 6.64502 12.3809 6.56596 12.1819 6.56596C11.9829 6.56596 11.792 6.64502 11.6512 6.78575Z"
                                    fill="#8840E6"/>
                            </svg>
                        </span>}
                    </div>
                </div>

                <svg className="mingcute-down-line instance-node" fill="none" height="24" viewBox="0 0 24 24" width="24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path className="path" clip-rule="evenodd"
                          d="M12.707 15.707C12.5195 15.8945 12.2652 15.9998 12 15.9998C11.7348 15.9998 11.4805 15.8945 11.293 15.707L5.636 10.05C5.54049 9.95775 5.46431 9.84741 5.4119 9.7254C5.35949 9.6034 5.3319 9.47218 5.33075 9.3394C5.3296 9.20662 5.3549 9.07494 5.40518 8.95205C5.45546 8.82915 5.52971 8.7175 5.62361 8.6236C5.7175 8.52971 5.82915 8.45546 5.95205 8.40518C6.07494 8.3549 6.20662 8.3296 6.3394 8.33075C6.47218 8.3319 6.6034 8.35949 6.7254 8.4119C6.84741 8.46431 6.95775 8.54049 7.05 8.636L12 13.586L16.95 8.636C17.1386 8.45384 17.3912 8.35305 17.6534 8.35533C17.9156 8.3576 18.1664 8.46277 18.3518 8.64818C18.5372 8.83359 18.6424 9.0844 18.6447 9.3466C18.647 9.6088 18.5462 9.8614 18.364 10.05L12.707 15.707V15.707Z"
                          fill="#747474" fill-rule="evenodd"></path>
                </svg>
            </div>

            {isExpanding && <Input className="mt-1" type='textarea' rows='2' value={questionTitle}
                                   placeholder='Title'
                                   onChange={(e) => {
                                       onQuestionUpdated({
                                           index: question.index,
                                           questionTitle: e.target.value,
                                           questionType,
                                           questionContent,
                                           sbsg,
                                           isExpanding,
                                           isCompleted: questionType === 'theory' ? isCompleted : e.target.value.length > 0
                                       })
                                   }}/>}

            {isExpanding && <div>
                <Select
                    theme={selectThemeColors}
                    className='react-select mt-1'
                    classNamePrefix='select'
                    options={questionTypes}
                    isClearable={false}
                    value={questionTypes.find((item) => item.value === questionType)}
                    placeholder="Question Type"
                    onChange={(item) => {
                        onQuestionUpdated({
                            index: question.index,
                            questionTitle,
                            questionType: item.value,
                            questionContent: undefined,
                            sbsg,
                            isExpanding,
                            isCompleted
                        })
                    }}
                />

                {questionType === 'theory' &&
                    <QuestionTheory questionContent={questionContent}
                                    questionContentUpdated={(newContent) => {
                                        onQuestionUpdated({
                                            index: question.index,
                                            questionTitle,
                                            questionType,
                                            questionContent: newContent,
                                            sbsg,
                                            isExpanding,
                                            isCompleted
                                        })
                                    }}
                                    onTheoryCompleted={(isCompleted) => onQuestionUpdated({
                                        index: question.index,
                                        questionTitle,
                                        questionType,
                                        questionContent,
                                        sbsg,
                                        isExpanding,
                                        isCompleted
                                    })}/>}

                {questionType === 'drag-word' &&
                    <QuestionDragWord questionContent={questionContent}
                                      questionContentUpdated={(newContent) => {
                                          onQuestionUpdated({
                                              index: question.index,
                                              questionTitle,
                                              questionType,
                                              questionContent: newContent,
                                              sbsg,
                                              isExpanding,
                                              isCompleted: questionTitle?.length > 0
                                          })
                                      }}/>}

                {questionType === 'drag-image' &&
                    <QuestionDragImage questionContent={questionContent}
                                       questionContentUpdated={(newContent) => {
                                           onQuestionUpdated({
                                               index: question.index,
                                               questionTitle,
                                               questionType,
                                               questionContent: newContent,
                                               sbsg,
                                               isExpanding,
                                               isCompleted: questionTitle?.length > 0
                                           })
                                       }}/>}

                {questionType === 'object-word' &&
                    <QuestionObjectWord questionContent={questionContent}
                                        questionContentUpdated={(newContent) => {
                                            onQuestionUpdated({
                                                index: question.index,
                                                questionTitle,
                                                questionType,
                                                questionContent: newContent,
                                                sbsg,
                                                isExpanding,
                                                isCompleted: questionTitle?.length > 0
                                            })
                                        }}/>}

                {questionType === 'object-image' &&
                    <QuestionObjectImage questionContent={questionContent}
                                         questionContentUpdated={(newContent) => {
                                             onQuestionUpdated({
                                                 index: question.index,
                                                 questionTitle,
                                                 questionType,
                                                 questionContent: newContent,
                                                 sbsg,
                                                 isExpanding,
                                                 isCompleted: questionTitle?.length > 0
                                             })
                                         }}/>}

                {!sbsg && <div className="mt-1">
                    <p className="mb-2 question-sbsg-title">STEP-BY-STEP</p>
                    <div>
                        <span
                            onClick={() => {
                                if (!questionTitle)
                                    return MySwal.fire({
                                        title: 'Error!',
                                        text: 'Please input question title first.',
                                        icon: 'error',
                                        timer: 2000,
                                        position: 'center',
                                        customClass: {
                                            confirmButton: 'btn btn-danger'
                                        },
                                        buttonsStyling: false
                                    })
                                dispatch(showSBSGModal(true))
                            }}
                            className="btn-add-sbsg"><PlusCircle/>&nbsp;&nbsp;Add Step-By-Step</span>
                    </div>
                </div>}

                {sbsg && <div className="mt-3">
                    <span className="btn-add-sbsg" onClick={editSbsg}>SBSG-{sbsg.id}</span>
                </div>}

                <SBSGFileUploadModal onSBSGAdded={onSBSGAdded} questionTitle={questionTitle}/>
            </div>}
        </div>
    )
}

export default QuestionWrapper