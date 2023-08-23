import './QuestionDragImage.css'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import CustomUppyFileUploader from "../CustomUppyFileUploader/CustomUppyFileUploader";
import {GridContextProvider, GridDropZone, GridItem, swap} from "react-grid-dnd";

const QuestionDragImage = ({questionContent, questionContentUpdated}) => {

    const [optionImgs, setOptionImgs] = useState([])
    const [answerOrders, setAnswerOrders] = useState([])

    const dispatch = useDispatch()

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (questionContent) {
            setOptionImgs(questionContent.options)
            setAnswerOrders(questionContent.correctAnswers.map((item) => questionContent.options[item]?.title))
        }

    }, [questionContent])

    const onOptionImgAttached = (images) => {
        const tmpImgOptions = [...optionImgs, ...images]
        const tmpAnswers = [...answerOrders, ...images.map((item) => item.title)]

        questionContentUpdated({
            options: tmpImgOptions.map((item, index) => ({
                index,
                title: item.title,
                type: "image",
                fileName: item.fileName
            })),
            correctAnswers: tmpAnswers.map((item) => tmpImgOptions.findIndex((oItem) => oItem.title === item)),
            questionType: 'drag'
        })
    }

    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        const tmpAnswers = swap(answerOrders, sourceIndex, targetIndex);

        questionContentUpdated({
            options: optionImgs.map((item, index) => ({
                index,
                title: item.title,
                type: "image",
                fileName: item.fileName
            })),
            correctAnswers: tmpAnswers.map((item) => optionImgs.findIndex((oItem) => oItem.title === item)),
            questionType: 'drag'
        })
    }

    return (
        <div className="mt-1">
            <CustomUppyFileUploader currentImgs={optionImgs} onFileChange={onOptionImgAttached} multi={true}/>

            <p style={{color: 'black', marginBottom: 1, marginTop: 10}}>ANSWER</p>

            <GridContextProvider onChange={onChange}>
                <GridDropZone
                    id="items"
                    boxesPerRow={3}
                    rowHeight={150}
                    style={{height: `${((Math.ceil(answerOrders.length / 3) * 150))}px`}}
                >
                    {answerOrders.map(title => (
                        <GridItem key={title} className="griditemUI">
                            <div className="rounded" style={{
                                backgroundImage: `url(${title})`,
                                width: "90%",
                                height: "90%",
                                position: 'relative',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                margin: 'auto'
                            }}>
                                <svg style={{position: 'absolute', right: 10, top: 10}} width="35" height="34"
                                     viewBox="0 0 35 34" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.75" width="34" height="34" rx="17" fill="black"
                                          fill-opacity="0.06"/>
                                    <path
                                        d="M15.0979 13.0304C14.9573 12.8898 14.8783 12.6991 14.8783 12.5002C14.8783 12.3013 14.9573 12.1106 15.0979 11.9699L17.1664 9.90144C17.243 9.82479 17.334 9.76399 17.4341 9.7225C17.5342 9.68102 17.6416 9.65967 17.7499 9.65967C17.8583 9.65967 17.9656 9.68102 18.0657 9.7225C18.1659 9.76399 18.2568 9.82479 18.3334 9.90144L20.4012 11.9699C20.4728 12.0391 20.53 12.1219 20.5693 12.2134C20.6086 12.3049 20.6293 12.4033 20.6301 12.5029C20.631 12.6025 20.612 12.7012 20.5743 12.7934C20.5366 12.8856 20.4809 12.9693 20.4105 13.0397C20.3401 13.1102 20.2563 13.1658 20.1641 13.2036C20.072 13.2413 19.9732 13.2602 19.8736 13.2594C19.774 13.2585 19.6756 13.2378 19.5841 13.1985C19.4926 13.1592 19.4099 13.1021 19.3407 13.0304L18.4999 12.1897V16.2502H22.5604L21.7197 15.4094C21.5789 15.2688 21.4999 15.078 21.4998 14.8791C21.4997 14.6801 21.5787 14.4893 21.7193 14.3486C21.8599 14.2078 22.0507 14.1287 22.2497 14.1287C22.4486 14.1286 22.6395 14.2076 22.7802 14.3482L24.8487 16.4167C24.9253 16.4933 24.9861 16.5843 25.0276 16.6844C25.0691 16.7845 25.0905 16.8918 25.0905 17.0002C25.0905 17.1086 25.0691 17.2159 25.0276 17.316C24.9861 17.4161 24.9253 17.5071 24.8487 17.5837L22.7802 19.6522C22.6395 19.7928 22.4486 19.8718 22.2497 19.8717C22.0507 19.8716 21.8599 19.7925 21.7193 19.6518C21.5787 19.5111 21.4997 19.3203 21.4998 19.1213C21.4999 18.9223 21.5789 18.7316 21.7197 18.5909L22.5604 17.7502H18.4999V21.8107L19.3407 20.9699C19.4821 20.8333 19.6716 20.7577 19.8682 20.7594C20.0649 20.7611 20.253 20.84 20.392 20.9791C20.5311 21.1181 20.61 21.3062 20.6117 21.5029C20.6134 21.6995 20.5378 21.889 20.4012 22.0304L18.3334 24.0989C18.2568 24.1756 18.1659 24.2364 18.0657 24.2779C17.9656 24.3194 17.8583 24.3407 17.7499 24.3407C17.6416 24.3407 17.5342 24.3194 17.4341 24.2779C17.334 24.2364 17.243 24.1756 17.1664 24.0989L15.0979 22.0304C15.0283 21.9608 14.9731 21.878 14.9354 21.787C14.8977 21.696 14.8784 21.5984 14.8784 21.4999C14.8784 21.4014 14.8979 21.3039 14.9356 21.2129C14.9733 21.1219 15.0286 21.0392 15.0983 20.9696C15.168 20.8999 15.2507 20.8447 15.3417 20.807C15.4328 20.7694 15.5303 20.75 15.6288 20.75C15.7273 20.7501 15.8249 20.7695 15.9159 20.8072C16.0069 20.845 16.0895 20.9003 16.1592 20.9699L16.9992 21.8107V17.7502H12.9402L13.7809 18.5909C13.8506 18.6606 13.9059 18.7433 13.9436 18.8343C13.9814 18.9253 14.0008 19.0228 14.0008 19.1213C14.0009 19.2198 13.9815 19.3174 13.9438 19.4084C13.9062 19.4994 13.8509 19.5821 13.7813 19.6518C13.7117 19.7215 13.629 19.7768 13.538 19.8145C13.447 19.8522 13.3495 19.8717 13.2509 19.8717C13.1524 19.8718 13.0549 19.8524 12.9639 19.8147C12.8728 19.7771 12.7901 19.7218 12.7204 19.6522L10.6519 17.5837C10.5753 17.5071 10.5145 17.4161 10.473 17.316C10.4315 17.2159 10.4102 17.1086 10.4102 17.0002C10.4102 16.8918 10.4315 16.7845 10.473 16.6844C10.5145 16.5843 10.5753 16.4933 10.6519 16.4167L12.7204 14.3482C12.8613 14.2077 13.0521 14.1288 13.2511 14.129C13.4501 14.1293 13.6408 14.2085 13.7813 14.3493C13.9218 14.4901 14.0007 14.681 14.0005 14.88C14.0002 15.0789 13.921 15.2697 13.7802 15.4102L12.9394 16.2502H16.9999V12.1904L16.1592 13.0304C16.0895 13.1002 16.0068 13.1555 15.9158 13.1932C15.8247 13.231 15.7271 13.2504 15.6286 13.2504C15.53 13.2504 15.4324 13.231 15.3414 13.1932C15.2503 13.1555 15.1676 13.1002 15.0979 13.0304Z"
                                        fill="white"/>
                                </svg>
                            </div>
                        </GridItem>
                    ))}
                </GridDropZone>
            </GridContextProvider>
        </div>
    )
}

export default QuestionDragImage