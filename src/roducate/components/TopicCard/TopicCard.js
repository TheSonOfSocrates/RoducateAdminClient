import './TopicCard.css'
import {useDispatch, useSelector} from "react-redux";
import Avatar from "../../../@core/components/avatar";

const moment = require('moment');

const TopicCard = ({topic = undefined}) => {
    const store = useSelector(state => state.topic)
    const dispatch = useDispatch()

    return (
        <div style={{width: '300px', height: '100%', backgroundColor: 'white', padding: '15px', borderRadius: '10px'}}>
            {topic?.thumbnail && <img style={{width: '100%', height: '150px', borderRadius: '10px'}}
                                      src={`${process.env.REACT_APP_3BUCKET_URL}${topic?.thumbnail}?version=${Math.floor(Math.random() * 50000) + 1}`}/>}
            <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="topic-card-title mt-1">{topic?.title}</span>
                <svg className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 10.5C6.39782 10.5 6.77936 10.658 7.06066 10.9393C7.34196 11.2206 7.5 11.6022 7.5 12C7.5 12.3978 7.34196 12.7794 7.06066 13.0607C6.77936 13.342 6.39782 13.5 6 13.5C5.60218 13.5 5.22064 13.342 4.93934 13.0607C4.65804 12.7794 4.5 12.3978 4.5 12C4.5 11.6022 4.65804 11.2206 4.93934 10.9393C5.22064 10.658 5.60218 10.5 6 10.5ZM12 10.5C12.3978 10.5 12.7794 10.658 13.0607 10.9393C13.342 11.2206 13.5 11.6022 13.5 12C13.5 12.3978 13.342 12.7794 13.0607 13.0607C12.7794 13.342 12.3978 13.5 12 13.5C11.6022 13.5 11.2206 13.342 10.9393 13.0607C10.658 12.7794 10.5 12.3978 10.5 12C10.5 11.6022 10.658 11.2206 10.9393 10.9393C11.2206 10.658 11.6022 10.5 12 10.5ZM18 10.5C18.3978 10.5 18.7794 10.658 19.0607 10.9393C19.342 11.2206 19.5 11.6022 19.5 12C19.5 12.3978 19.342 12.7794 19.0607 13.0607C18.7794 13.342 18.3978 13.5 18 13.5C17.6022 13.5 17.2206 13.342 16.9393 13.0607C16.658 12.7794 16.5 12.3978 16.5 12C16.5 11.6022 16.658 11.2206 16.9393 10.9393C17.2206 10.658 17.6022 10.5 18 10.5Z"
                        fill="black"/>
                </svg>
            </div>
            <div className="d-flex">
                <span className="topic-card-term mr-1">{topic.subject.title}</span>
                <span className="topic-card-term">{topic.termsLevel.title}</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
                <div className="d-flex align-items-center">
                    <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${topic?.createdBy.avatar}`} imgHeight='40'
                            imgWidth='40'
                            status='online'/>
                    <span className="game-card-username ml-1">{topic?.createdBy.name}</span>
                </div>
            </div>
        </div>
    )
}

export default TopicCard