import './QuestionObjectWord.css'
import {useEffect, useState} from "react";
import {PlusCircle} from "react-feather";
import {AddDDOptionModal} from "../../modals/AddDDOptionModal/AddDDOptionModal";
import {showAddDDOptionModal} from '@store/actions/modal'
import {useDispatch} from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Select from "react-select";
import {selectThemeColors} from '@utils'

const QuestionObjectWord = ({questionContent, questionContentUpdated}) => {

    const [options, setOptions] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])

    const [currentOptionType, setCurrentOptionType] = useState('single')

    const dispatch = useDispatch()

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (questionContent) {
            setOptions(questionContent.options.map((item) => item.title))
            setCurrentOptionType(questionContent.optionType)
            setCorrectAnswers(questionContent.correctAnswers)
        }

    }, [questionContent])

    const optionType = [
        {value: 'single', label: 'Single Selection'},
        {value: 'multiple', label: 'Multiple Selection'}
    ]

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

        questionContentUpdated({
            options: tmpOptions.map((item, index) => ({index, title: item, type: "word"})),
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
                        options: options.map((item, index) => ({index, title: item, type: "word"})),
                        correctAnswers: [],
                        questionType: 'object',
                        optionType: item.value
                    })
                }}
            />
            <div className="row m-0">
                {options.map((item, index) => <div
                    className="col-6 mb-1">
                    <div className="option-item align-items-center d-flex justify-content-between">
                        <div className="d-flex align-items-center" style={{padding: 5, maxWidth: '80%'}}>
                        <span style={{
                            background: '#F8F7FE',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 10,
                            marginLeft: 10,
                            color: correctAnswers.includes(index) ? '#00AB5F' : '#4C20A8'
                        }}>{index + 1}</span>
                            <div style={{maxWidth: '80%'}}>
                                {correctAnswers.includes(index) && <p className="mb-0"
                                                                      style={{
                                                                          color: '#00AB5F',
                                                                          textOverflow: 'ellipsis',
                                                                          overflow: 'hidden'
                                                                      }}>Answer</p>}
                                <p className="mb-0"
                                   style={{color: 'black', textOverflow: 'ellipsis', overflow: 'hidden'}}>{item}</p>
                            </div>
                        </div>
                        <input type='checkbox' id={item} style={{marginRight: 15}}
                               checked={correctAnswers.includes(index)} onChange={(e) => {
                            let tmpCorrectAnswers;
                            if (e.target.checked) {
                                if (currentOptionType === 'single' && correctAnswers.length === 1)
                                    return
                                tmpCorrectAnswers = [...correctAnswers, index]
                            } else {
                                tmpCorrectAnswers = [...correctAnswers.filter((item) => item !== index)]
                            }
                            questionContentUpdated({
                                options: options.map((item, index) => ({index, title: item, type: "word"})),
                                correctAnswers: tmpCorrectAnswers,
                                questionType: 'object',
                                optionType: currentOptionType
                            })
                        }}/>
                    </div>
                </div>)}
            </div>
            <div onClick={() => dispatch(showAddDDOptionModal(true))}
                 className="d-flex align-items-center btn-add-more-option mb-1">
                <PlusCircle style={{color: '#4C20A8'}}/>&nbsp;&nbsp;
                <sapn>Add more option</sapn>
            </div>
            <AddDDOptionModal onOptionAdded={onOptionAdded}/>
        </div>
    )
}

export default QuestionObjectWord