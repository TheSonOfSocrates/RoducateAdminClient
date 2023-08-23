import {showMediaPlayModal} from '@store/actions/media'
import './LSMediaCard.css'
import Avatar from "../../../@core/components/avatar";
import {secondsToHMS} from "../../../utility/Utils";
import {useDispatch, useSelector} from "react-redux";

const LSMediaCard = ({media = undefined}) => {
    const store = useSelector(state => state.media)
    const dispatch = useDispatch()

    return (
        <div style={{width: '250px', backgroundColor: 'white', padding: '8px', borderRadius: '10px'}}>
            <img style={{width: '100%', height: '150px', borderRadius: '10px'}}
                 src={`${process.env.REACT_APP_3BUCKET_URL}${media?.thumbnail}?version=${Math.floor(Math.random() * 50000) + 1}`}/>
            <p className="media-card-title mt-1">{media.title}</p>
            <p className="media-card-des">{media.description ?? 'No description'}</p>
            <div className="d-flex justify-content-between">
                <div>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M13.333 2.5C13.6694 2.49989 13.9934 2.62694 14.24 2.85566C14.4867 3.08439 14.6378 3.3979 14.663 3.73333L14.6663 3.83333V13.1667C14.6664 13.5031 14.5394 13.827 14.3107 14.0737C14.082 14.3204 13.7684 14.4714 13.433 14.4967L13.333 14.5H2.66634C2.32996 14.5001 2.00596 14.3731 1.75931 14.1443C1.51265 13.9156 1.36157 13.6021 1.33634 13.2667L1.33301 13.1667V3.83333C1.3329 3.49695 1.45995 3.17296 1.68867 2.9263C1.9174 2.67965 2.2309 2.52856 2.56634 2.50333L2.66634 2.5H13.333ZM13.333 3.83333H2.66634V13.1667H13.333V3.83333ZM6.89301 5.592L7.23834 5.74533L7.46367 5.852L7.72167 5.97867L8.00834 6.124L8.32167 6.29067L8.65967 6.47733L8.83701 6.57867L9.18234 6.782L9.49834 6.97667L9.78501 7.15867L10.0383 7.32733L10.3583 7.54733L10.601 7.72267L10.6643 7.76933C10.7672 7.84589 10.8508 7.94544 10.9084 8.06003C10.9659 8.17463 10.9959 8.30109 10.9959 8.42933C10.9959 8.55758 10.9659 8.68404 10.9084 8.79864C10.8508 8.91323 10.7672 9.01278 10.6643 9.08933L10.449 9.246L10.1557 9.45133L9.91834 9.61067L9.64834 9.786L9.34634 9.97467L9.01367 10.1747L8.65767 10.3807L8.31834 10.5687L8.00434 10.7353L7.71767 10.882L7.46034 11.0073L7.04567 11.1993L6.89234 11.266C6.77462 11.3167 6.64668 11.3392 6.51872 11.3318C6.39075 11.3243 6.26631 11.287 6.15531 11.2229C6.04432 11.1588 5.94984 11.0696 5.87941 10.9625C5.80898 10.8554 5.76456 10.7333 5.74967 10.606L5.71101 10.2293L5.68967 9.98L5.66167 9.53733L5.64634 9.19867L5.63634 8.82867C5.63515 8.76334 5.63426 8.698 5.63367 8.63267L5.63234 8.42933C5.63234 8.29133 5.63367 8.158 5.63634 8.02933L5.64634 7.65933L5.66167 7.32133L5.67968 7.01667L5.69967 6.74933L5.74967 6.25333C5.76447 6.12588 5.80885 6.00364 5.87927 5.89639C5.94969 5.78913 6.04421 5.69981 6.15528 5.63557C6.26634 5.57132 6.39089 5.53393 6.51898 5.52636C6.64707 5.5188 6.77515 5.54127 6.89301 5.592ZM7.30034 7.25933L7.00968 7.114L6.99034 7.43867L6.97567 7.806L6.96701 8.21267L6.96567 8.42933L6.96701 8.646L6.97567 9.052L6.98234 9.24067L6.99967 9.58733L7.00968 9.744L7.29901 9.59867L7.62367 9.428L7.98034 9.232L8.16967 9.124L8.53701 8.90667L8.86634 8.70267L9.15701 8.516L9.28767 8.42933L9.01634 8.24933L8.70567 8.05333C8.5289 7.9439 8.35043 7.83722 8.17034 7.73333L7.98167 7.626L7.62567 7.43L7.30034 7.25933Z"
                              fill="#CACACC"/>
                    </svg>

                    <span className="media-card-category"
                          style={{marginLeft: 5}}>Videos: </span>
                    <span className="media-card-cnt">{media.materialCount}</span>
                </div>{console.log(media)}
                <span className="media-card-time">{secondsToHMS(media.materialDuration)}</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
                <div className="d-flex">
                    <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${media.avatar}`} imgHeight='40'
                            imgWidth='40'
                            status='online'/>
                    <span className="media-card-username">{media.creatorFirstName}</span>
                </div>
                {((!store.isPlaying && store.mediaId === media._id) || store.mediaId === '' || (store.mediaId !== media._id)) &&
                    <span className="media-card-play">
                    <svg
                        onClick={() => dispatch(showMediaPlayModal(true, 'video', media.materials, media.title, media.description, media._id))}
                        width="24" height="24" viewBox="0 0 24 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M7.57541 5.70772C7.36906 7.79698 7.26827 9.89531 7.27341 11.9947C7.27341 14.7957 7.44341 16.9917 7.57541 18.2837C9.48757 17.4157 11.3549 16.4521 13.1704 15.3967C14.9916 14.3524 16.7591 13.2173 18.4664 11.9957C16.7594 10.773 14.9922 9.63661 13.1714 8.59072C11.3554 7.5369 9.48771 6.57469 7.57541 5.70772ZM5.67041 4.75972C5.69722 4.53257 5.7767 4.31481 5.90253 4.1238C6.02835 3.93278 6.19704 3.77379 6.39516 3.65948C6.59328 3.54518 6.81536 3.47871 7.0437 3.46539C7.27204 3.45206 7.50034 3.49224 7.71041 3.58272C8.77241 4.03672 11.1524 5.11572 14.1724 6.85872C17.1934 8.60272 19.3184 10.1257 20.2414 10.8167C21.0294 11.4077 21.0314 12.5797 20.2424 13.1727C19.3284 13.8597 17.2294 15.3627 14.1724 17.1287C11.1124 18.8947 8.76041 19.9607 7.70841 20.4087C6.80241 20.7957 5.78841 20.2087 5.67041 19.2317C5.53241 18.0897 5.27441 15.4967 5.27441 11.9947C5.27441 8.49472 5.53141 5.90272 5.67041 4.75972Z"
                          fill="white"/>
                    </svg>
                    </span>}
                {store.isPlaying && media._id === store.mediaId && <span className="media-card-play">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 4C8.24493 4.00003 8.48134 4.08996 8.66437 4.25272C8.84741 4.41547 8.96434 4.63975 8.993 4.883L9 5V19C8.99972 19.2549 8.90212 19.5 8.72715 19.6854C8.55218 19.8707 8.31305 19.9822 8.05861 19.9972C7.80416 20.0121 7.55362 19.9293 7.35817 19.7657C7.16271 19.6021 7.0371 19.3701 7.007 19.117L7 19V5C7 4.73478 7.10536 4.48043 7.29289 4.29289C7.48043 4.10536 7.73478 4 8 4ZM16 4C16.2449 4.00003 16.4813 4.08996 16.6644 4.25272C16.8474 4.41547 16.9643 4.63975 16.993 4.883L17 5V19C16.9997 19.2549 16.9021 19.5 16.7272 19.6854C16.5522 19.8707 16.313 19.9822 16.0586 19.9972C15.8042 20.0121 15.5536 19.9293 15.3582 19.7657C15.1627 19.6021 15.0371 19.3701 15.007 19.117L15 19V5C15 4.73478 15.1054 4.48043 15.2929 4.29289C15.4804 4.10536 15.7348 4 16 4Z"
                            fill="white"/>
                    </svg>
                </span>}
            </div>
        </div>
    )
}

export default LSMediaCard