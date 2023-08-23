import './QuestionDragWord.css'
import {useEffect, useState} from "react";
import {PlusCircle} from "react-feather";
import {AddDDOptionModal} from "../../modals/AddDDOptionModal/AddDDOptionModal";
import {showAddDDOptionModal} from '@store/actions/modal'
import {useDispatch} from "react-redux";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const QuestionDragWord = ({questionContent, questionContentUpdated, onQDWCompleted}) => {

    const [options, setOptions] = useState([])
    const [answerOrders, setAnswerOrders] = useState([])

    const dispatch = useDispatch()

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (questionContent) {
            setOptions(questionContent.options.map((item) => item.title))
            setAnswerOrders(questionContent.correctAnswers.map((item) => questionContent.options[item].title))
        }

    }, [questionContent])

    const onOptionAdded = (option) => {
        const isAdded = options.some((item) => item === option)
        if (isAdded) {
            return MySwal.fire({
                title: 'Error!',
                text: 'Option already added.',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        const tmpOptions = [...options, option]
        const tmpAnswers = [...answerOrders, option]

        questionContentUpdated({
            options: tmpOptions.map((item, index) => ({index, title: item, type: "word"})),
            correctAnswers: tmpAnswers.map((item) => tmpOptions.findIndex((oItem) => oItem === item)),
            questionType: 'drag'
        })
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const tmpAnswers = Array.from(answerOrders);
        const [reorderedItem] = tmpAnswers.splice(result.source.index, 1);
        tmpAnswers.splice(result.destination.index, 0, reorderedItem);

        questionContentUpdated({
            options: options.map((item, index) => ({index, title: item, type: "word"})),
            correctAnswers: tmpAnswers.map((item) => options.findIndex((oItem) => oItem === item))
        })
    }

    return (
        <div className="mt-1">
            <div>
                {options.map((item) => <div className="qdw-option">{item}</div>)}
            </div>
            <div onClick={() => dispatch(showAddDDOptionModal(true))}
                 className="d-flex align-items-center btn-add-more-option mb-1">
                <PlusCircle style={{color: '#4C20A8'}}/>&nbsp;&nbsp;
                <sapn>Add more option</sapn>
            </div>
            <p style={{color: 'black', marginBottom: 1}}>ANSWER</p>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="dnd-answers">
                    {(provided) => (
                        <ul className="dnd-answers" {...provided.droppableProps} ref={provided.innerRef}>
                            {answerOrders.map((name, index) => {
                                return (
                                    <Draggable draggableId={name + index} index={index}>
                                        {(provided) => (
                                            <li className="d-flex justify-content-between"
                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <span>{name}</span>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 6C11 6.19698 11.0388 6.39204 11.1142 6.57403C11.1896 6.75601 11.3001 6.92137 11.4393 7.06066C11.5786 7.19995 11.744 7.31044 11.926 7.38582C12.108 7.4612 12.303 7.5 12.5 7.5C12.697 7.5 12.892 7.4612 13.074 7.38582C13.256 7.31044 13.4214 7.19995 13.5607 7.06066C13.6999 6.92137 13.8104 6.75601 13.8858 6.57403C13.9612 6.39204 14 6.19698 14 6C14 5.60218 13.842 5.22064 13.5607 4.93934C13.2794 4.65804 12.8978 4.5 12.5 4.5C12.1022 4.5 11.7206 4.65804 11.4393 4.93934C11.158 5.22064 11 5.60218 11 6ZM6.5 6C6.5 6.39782 6.65804 6.77936 6.93934 7.06066C7.22064 7.34196 7.60218 7.5 8 7.5C8.39782 7.5 8.77936 7.34196 9.06066 7.06066C9.34196 6.77936 9.5 6.39782 9.5 6C9.5 5.60218 9.34196 5.22064 9.06066 4.93934C8.77936 4.65804 8.39782 4.5 8 4.5C7.60218 4.5 7.22064 4.65804 6.93934 4.93934C6.65804 5.22064 6.5 5.60218 6.5 6ZM3.5 7.5C3.30302 7.5 3.10796 7.4612 2.92597 7.38582C2.74399 7.31044 2.57863 7.19995 2.43934 7.06066C2.30005 6.92137 2.18956 6.75601 2.11418 6.57403C2.0388 6.39204 2 6.19698 2 6C2 5.80302 2.0388 5.60796 2.11418 5.42597C2.18956 5.24399 2.30005 5.07863 2.43934 4.93934C2.57863 4.80005 2.74399 4.68956 2.92597 4.61418C3.10796 4.5388 3.30302 4.5 3.5 4.5C3.89782 4.5 4.27936 4.65804 4.56066 4.93934C4.84196 5.22064 5 5.60218 5 6C5 6.39782 4.84196 6.77936 4.56066 7.06066C4.27936 7.34196 3.89782 7.5 3.5 7.5ZM11 11C11 11.197 11.0388 11.392 11.1142 11.574C11.1896 11.756 11.3001 11.9214 11.4393 12.0607C11.5786 12.1999 11.744 12.3104 11.926 12.3858C12.108 12.4612 12.303 12.5 12.5 12.5C12.697 12.5 12.892 12.4612 13.074 12.3858C13.256 12.3104 13.4214 12.1999 13.5607 12.0607C13.6999 11.9214 13.8104 11.756 13.8858 11.574C13.9612 11.392 14 11.197 14 11C14 10.6022 13.842 10.2206 13.5607 9.93934C13.2794 9.65804 12.8978 9.5 12.5 9.5C12.1022 9.5 11.7206 9.65804 11.4393 9.93934C11.158 10.2206 11 10.6022 11 11ZM8 12.5C7.60218 12.5 7.22064 12.342 6.93934 12.0607C6.65804 11.7794 6.5 11.3978 6.5 11C6.5 10.6022 6.65804 10.2206 6.93934 9.93934C7.22064 9.65804 7.60218 9.5 8 9.5C8.39782 9.5 8.77936 9.65804 9.06066 9.93934C9.34196 10.2206 9.5 10.6022 9.5 11C9.5 11.3978 9.34196 11.7794 9.06066 12.0607C8.77936 12.342 8.39782 12.5 8 12.5ZM2 11C2 11.197 2.0388 11.392 2.11418 11.574C2.18956 11.756 2.30005 11.9214 2.43934 12.0607C2.57863 12.1999 2.74399 12.3104 2.92597 12.3858C3.10796 12.4612 3.30302 12.5 3.5 12.5C3.69698 12.5 3.89204 12.4612 4.07403 12.3858C4.25601 12.3104 4.42137 12.1999 4.56066 12.0607C4.69995 11.9214 4.81044 11.756 4.88582 11.574C4.9612 11.392 5 11.197 5 11C5 10.6022 4.84196 10.2206 4.56066 9.93934C4.27936 9.65804 3.89782 9.5 3.5 9.5C3.10218 9.5 2.72064 9.65804 2.43934 9.93934C2.15804 10.2206 2 10.6022 2 11Z"
                                                        fill="#C0C1C3"/>
                                                </svg>
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <AddDDOptionModal onOptionAdded={onOptionAdded}/>
        </div>
    )
}

export default QuestionDragWord