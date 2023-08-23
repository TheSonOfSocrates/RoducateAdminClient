import './QuestionTheory.css'
import {useEffect, useState} from "react";
import {Input} from "reactstrap";

const QuestionTheory = ({questionContent, questionContentUpdated, onTheoryCompleted}) => {

    const [answer, setAnswer] = useState('')

    useEffect(() => {
        if (questionContent) {
            setAnswer(questionContent.answer)
        }

    }, [questionContent])

    const checkCompleted = () => {
        onTheoryCompleted(answer !== '')
    }

    return (
        <div className="mt-1">
            <Input className="mt-1" type='textarea' rows='2' value={answer}
                   placeholder='Answer'
                   onBlur={checkCompleted}
                   onChange={(e) => {
                       questionContentUpdated({answer: e.target.value})
                   }}/>
        </div>
    )
}

export default QuestionTheory