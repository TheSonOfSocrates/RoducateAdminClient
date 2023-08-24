import './SubjectCard.css'
import {useDispatch, useSelector} from "react-redux";

const moment = require('moment');

const SubjectCard = ({subject = undefined}) => {
    const store = useSelector(state => state.subject)
    const dispatch = useDispatch()

    return (
        <div style={{width: '300px', height: '100%', backgroundColor: 'white', padding: '15px', borderRadius: '10px'}}>
            {subject?.thumbnail && <img style={{width: '100%', height: '150px', borderRadius: '10px'}}
                                        src={`${process.env.REACT_APP_3BUCKET_URL}${subject?.thumbnail}?version=${Math.floor(Math.random() * 50000) + 1}`}/>}
            <p className="subject-card-title mt-1">{subject?.title}</p>
            <div className="d-flex justify-content-between">
                <div>
                    <p className="subject-card-cnt">{243}</p>
                    <span className="subject-card-category"
                          style={{color: 'green'}}>{moment(subject?.updatedAt).format('DD MMM YYYY')}</span>
                </div>
                <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.332031" width="44" height="44" rx="22" fill="#1E63EE"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M20.332 13C20.999 13 21.665 13.253 22.332 13.76C22.999 13.253 23.665 13 24.332 13H30.332C30.8625 13 31.3712 13.2107 31.7462 13.5858C32.1213 13.9609 32.332 14.4696 32.332 15V28C32.332 28.5304 32.1213 29.0391 31.7462 29.4142C31.3712 29.7893 30.8625 30 30.332 30H23.332C23.332 30.552 22.882 31 22.332 31C21.782 31 21.332 30.55 21.332 30H14.332C13.8016 30 13.2929 29.7893 12.9178 29.4142C12.5427 29.0391 12.332 28.5304 12.332 28V15C12.332 14.4696 12.5427 13.9609 12.9178 13.5858C13.2929 13.2107 13.8016 13 14.332 13H20.332ZM20.332 15H14.332V28H21.332V16C21.332 15.45 20.882 15 20.332 15ZM30.332 15H24.332C23.782 15 23.332 15.45 23.332 16V28H30.332V15Z"
                          fill="white"/>
                </svg>

            </div>
        </div>
    )
}

export default SubjectCard