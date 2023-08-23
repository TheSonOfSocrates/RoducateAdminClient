import './QuestionObjectImage.css'
import {useEffect, useState} from "react";
import Select from "react-select";
import {selectThemeColors} from '@utils'
import CustomUppyFileUploaderWithCheckBox
    from "../CustomUppyFileUploaderWithCheckBox/CustomUppyFileUploaderWithCheckBox";

const QuestionObjectImage = ({questionContent, questionContentUpdated}) => {

    const [optionImgs, setOptionImgs] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])

    const [currentOptionType, setCurrentOptionType] = useState('single')

    useEffect(() => {
        if (questionContent) {
            setOptionImgs(questionContent.options)
            setCurrentOptionType(questionContent.optionType)
            setCorrectAnswers(questionContent.correctAnswers)
        }

    }, [questionContent])

    const optionType = [
        {value: 'single', label: 'Single Selection'},
        {value: 'multiple', label: 'Multiple Selection'}
    ]

    const onOptionImgAttached = (images) => {
        const tmpImgOptions = [...optionImgs, ...images]

        questionContentUpdated({
            options: tmpImgOptions.map((item, index) => ({
                index,
                title: item.title,
                type: "image",
                fileName: item.fileName
            })),
            correctAnswers,
            questionType: 'object',
            optionType: currentOptionType
        })
    }

    return (
        <div className="mt-1">
            <Select
                theme={selectThemeColors}
                className='react-select mt-1 mb-1'
                classNamePrefix='select'
                options={optionType}
                isClearable={false}
                value={optionType.find((item) => item.value === currentOptionType)}
                placeholder="Question Type"
                onChange={(item) => {
                    questionContentUpdated({
                        options: optionImgs.map((item, index) => ({
                            index,
                            title: item.title,
                            type: "image",
                            fileName: item.fileName
                        })),
                        correctAnswers: [],
                        questionType: 'object',
                        optionType: item.value
                    })
                }}
            />

            <CustomUppyFileUploaderWithCheckBox answerUpdated={(newAnswer) => questionContentUpdated({
                options: optionImgs.map((item, index) => ({
                    index,
                    title: item.title,
                    type: "image",
                    fileName: item.fileName
                })),
                correctAnswers: newAnswer,
                questionType: 'object',
                optionType: currentOptionType
            })} currentOptionType={currentOptionType} correctAnswers={correctAnswers} currentImgs={optionImgs}
                                                onFileChange={onOptionImgAttached} multi={true}/>

        </div>
    )
}

export default QuestionObjectImage