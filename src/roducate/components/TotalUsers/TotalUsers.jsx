import {MingcuteUser1Line} from "../../icons/MingcuteUser1Line";
import "./style.css";
import React, {useEffect, useState} from "react";
import axios from "../../../utility/axios";
import {Button, Modal, ModalBody} from "reactstrap";
import {X} from "react-feather";
import {useDispatch, useSelector} from "react-redux";
import {showTotalUserDetailModal} from '@store/actions/modal'

export const TotalUsers = () => {

    const [totalUserCnt, setTotalUserCnt] = useState(0)
    const [studentsCount, setStudentsCount] = useState(0)
    const [teachersCount, setTeachersCount] = useState(0)
    const [counsellorsCount, setCounsellorsCount] = useState(0)
    const [parentsCount, setParentsCount] = useState(0)
    const [normalUserCount, setNormalUserCount] = useState(0)

    const store = useSelector(state => state.modal)

    const dispatch = useDispatch()

    useEffect(async () => {
        async function getTotalCnt() {
            try {
                const res = await axios.get('/overview/getHeaderData')
                if (res && res.data.success) {
                    setStudentsCount(res.data.studentsCount)
                    setTeachersCount(res.data.teachersCount)
                    setCounsellorsCount(res.data.counsellorsCount)
                    setParentsCount(res.data.parentsCount)
                    setNormalUserCount(res.data.normalUserCount)
                    setTotalUserCnt(res.data.studentsCount + res.data.teachersCount + res.data.counsellorsCount + res.data.parentsCount + res.data.normalUserCount)
                }
            } catch (e) {
                setTotalUserCnt(100)
            }
        }

        getTotalCnt()

    }, [])

    const showDetail = () => {

    }

    return (
        <div className="totaluser-box">
            <div className="frame-wrapper">
                <div className="frame">
                    <div className="button">Total Users</div>
                    <div className="unstyled-FAB" style={{cursor: "pointer"}}
                         onClick={() => dispatch(showTotalUserDetailModal(true))}>
                        <MingcuteUser1Line className="mingcute-user-line" color="#592DB5"/>
                        <div className="text-wrapper">{totalUserCnt}</div>
                        <div className="button-wrapper">
                            <div className="div">View</div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal toggle={() => dispatch(showTotalUserDetailModal())}
                   isOpen={store.showTotalUserDetailModal}
                   className="modal-dialog-centered modal-lg"
            >
                <ModalBody toggle={() => dispatch(showTotalUserDetailModal())}>
                    <div className="p-2">
                        <div className="mb-1" style={{textAlign: 'right'}}>
                            <Button.Ripple onClick={() => dispatch(showTotalUserDetailModal())}
                                           className='btn-icon rounded-circle'
                                           color='flat-danger'>
                                <X size={16}/>
                            </Button.Ripple>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <div>
                                    <p className="total-users-app-downloads">APP DOWNLOADS</p>
                                    <hr/>
                                    <div className="mb-1">
                                        <svg width="50" height="50" viewBox="0 0 142 139" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" width="141" height="139" rx="50" fill="#1E63EE"
                                                  fill-opacity="0.06"/>
                                            <path
                                                d="M108.172 46.2266L101.922 33.7266C101.662 33.2074 101.263 32.7708 100.769 32.4659C100.275 32.1609 99.7056 31.9996 99.125 32H42.875C42.2944 31.9996 41.7252 32.1609 41.2312 32.4659C40.7372 32.7708 40.3379 33.2074 40.0781 33.7266L33.8281 46.2266C33.6127 46.6613 33.5004 47.1398 33.5 47.625V100.75C33.5 102.408 34.1585 103.997 35.3306 105.169C36.5027 106.342 38.0924 107 39.75 107H102.25C103.908 107 105.497 106.342 106.669 105.169C107.842 103.997 108.5 102.408 108.5 100.75V47.625C108.5 47.1398 108.387 46.6613 108.172 46.2266ZM44.8047 38.25H97.1953L100.32 44.5H41.6797L44.8047 38.25ZM102.25 100.75H39.75V50.75H102.25V100.75ZM85.7109 76.6641C86.0015 76.9543 86.232 77.2989 86.3893 77.6783C86.5465 78.0577 86.6275 78.4643 86.6275 78.875C86.6275 79.2857 86.5465 79.6923 86.3893 80.0717C86.232 80.4511 86.0015 80.7957 85.7109 81.0859L73.2109 93.5859C72.9207 93.8765 72.5761 94.107 72.1967 94.2643C71.8173 94.4215 71.4107 94.5025 71 94.5025C70.5893 94.5025 70.1827 94.4215 69.8033 94.2643C69.4239 94.107 69.0793 93.8765 68.7891 93.5859L56.2891 81.0859C55.7027 80.4996 55.3733 79.7043 55.3733 78.875C55.3733 78.0457 55.7027 77.2504 56.2891 76.6641C56.8754 76.0777 57.6707 75.7483 58.5 75.7483C59.3293 75.7483 60.1246 76.0777 60.7109 76.6641L67.875 83.832V60.125C67.875 59.2962 68.2042 58.5013 68.7903 57.9153C69.3763 57.3292 70.1712 57 71 57C71.8288 57 72.6237 57.3292 73.2097 57.9153C73.7958 58.5013 74.125 59.2962 74.125 60.125V83.832L81.2891 76.6641C81.5793 76.3735 81.9239 76.143 82.3033 75.9857C82.6827 75.8285 83.0893 75.7475 83.5 75.7475C83.9107 75.7475 84.3173 75.8285 84.6967 75.9857C85.0761 76.143 85.4207 76.3735 85.7109 76.6641Z"
                                                fill="#1E63EE"/>
                                        </svg>
                                    </div>

                                    <p className="total-users-cnt">27, 409, 437</p>
                                </div>
                            </div>
                            <div className="col-5">
                                <p className="total-users-app-downloads">TOTAL USERS</p>
                                <hr/>
                                <div className="mb-1">
                                    <svg width="50" height="50" viewBox="0 0 140 137" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" width="139.328" height="136.207" rx="50" fill="#8172EA"
                                              fill-opacity="0.06"/>
                                        <path
                                            d="M110.367 102.448C104.418 92.163 95.2501 84.788 84.5509 81.2919C89.8432 78.1413 93.955 73.3406 96.2549 67.627C98.5547 61.9134 98.9154 55.6028 97.2816 49.6644C95.6478 43.7259 92.1098 38.4879 87.211 34.7549C82.3121 31.0218 76.3233 29 70.1642 29C64.0051 29 58.0163 31.0218 53.1174 34.7549C48.2186 38.4879 44.6806 43.7259 43.0468 49.6644C41.413 55.6028 41.7737 61.9134 44.0735 67.627C46.3734 73.3406 50.4852 78.1413 55.7775 81.2919C45.0783 84.7841 35.9103 92.1591 29.9611 102.448C29.7429 102.804 29.5982 103.2 29.5355 103.612C29.4728 104.025 29.4933 104.446 29.5959 104.85C29.6985 105.255 29.8811 105.635 30.1329 105.967C30.3847 106.3 30.7006 106.579 31.062 106.788C31.4233 106.997 31.8228 107.131 32.2369 107.183C32.651 107.235 33.0712 107.203 33.4729 107.09C33.8745 106.976 34.2494 106.784 34.5755 106.523C34.9015 106.263 35.1721 105.94 35.3712 105.573C42.7306 92.8544 55.7384 85.2606 70.1642 85.2606C84.59 85.2606 97.5978 92.8544 104.957 105.573C105.156 105.94 105.427 106.263 105.753 106.523C106.079 106.784 106.454 106.976 106.856 107.09C107.257 107.203 107.677 107.235 108.092 107.183C108.506 107.131 108.905 106.997 109.266 106.788C109.628 106.579 109.944 106.3 110.195 105.967C110.447 105.635 110.63 105.255 110.732 104.85C110.835 104.446 110.856 104.025 110.793 103.612C110.73 103.2 110.585 102.804 110.367 102.448ZM48.2892 57.1356C48.2892 52.8092 49.5721 48.5799 51.9758 44.9825C54.3795 41.3852 57.7959 38.5814 61.793 36.9258C65.7901 35.2701 70.1885 34.8369 74.4318 35.6809C78.6751 36.525 82.5729 38.6084 85.6322 41.6677C88.6914 44.7269 90.7748 48.6247 91.6189 52.868C92.4629 57.1114 92.0297 61.5097 90.3741 65.5068C88.7184 69.504 85.9146 72.9204 82.3173 75.324C78.72 77.7277 74.4907 79.0106 70.1642 79.0106C64.3645 79.0044 58.8041 76.6978 54.7031 72.5967C50.6021 68.4957 48.2954 62.9353 48.2892 57.1356Z"
                                            fill="#8840E6"/>
                                    </svg>
                                </div>
                                <p className="total-users-cnt">{totalUserCnt}</p>
                            </div>
                            <div className="col-2">
                                <span className="total-users-title">Students</span>
                                <div className="mb-1">
                                    <svg width="25" height="25" viewBox="0 0 51 50" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M45.6016 41.4057C42.627 36.2631 38.043 32.5756 32.6934 30.8276C35.3396 29.2523 37.3955 26.852 38.5454 23.9951C39.6953 21.1383 39.8757 17.9831 39.0588 15.0138C38.2419 12.0446 36.4729 9.42561 34.0235 7.55907C31.574 5.69253 28.5796 4.68164 25.5001 4.68164C22.4205 4.68164 19.4261 5.69253 16.9767 7.55907C14.5273 9.42561 12.7583 12.0446 11.9414 15.0138C11.1245 17.9831 11.3048 21.1383 12.4547 23.9951C13.6047 26.852 15.6606 29.2523 18.3067 30.8276C12.9571 32.5737 8.37312 36.2612 5.39851 41.4057C5.28942 41.5836 5.21707 41.7815 5.18571 41.9878C5.15436 42.1941 5.16463 42.4045 5.21594 42.6068C5.26724 42.809 5.35854 42.9989 5.48443 43.1653C5.61032 43.3317 5.76827 43.4712 5.94895 43.5756C6.12963 43.68 6.32938 43.7471 6.53641 43.773C6.74345 43.7989 6.95358 43.7831 7.15441 43.7265C7.35524 43.6699 7.54269 43.5736 7.70571 43.4434C7.86873 43.3131 8.00402 43.1516 8.10359 42.9682C11.7833 36.6088 18.2872 32.812 25.5001 32.812C32.713 32.812 39.2169 36.6088 42.8966 42.9682C42.9961 43.1516 43.1314 43.3131 43.2944 43.4434C43.4575 43.5736 43.6449 43.6699 43.8457 43.7265C44.0466 43.7831 44.2567 43.7989 44.4637 43.773C44.6708 43.7471 44.8705 43.68 45.0512 43.5756C45.2319 43.4712 45.3898 43.3317 45.5157 43.1653C45.6416 42.9989 45.7329 42.809 45.7842 42.6068C45.8355 42.4045 45.8458 42.1941 45.8144 41.9878C45.7831 41.7815 45.7107 41.5836 45.6016 41.4057ZM14.5626 18.7495C14.5626 16.5862 15.204 14.4716 16.4059 12.6729C17.6077 10.8742 19.3159 9.47235 21.3145 8.64452C23.313 7.81669 25.5122 7.60009 27.6339 8.02211C29.7555 8.44414 31.7044 9.48584 33.234 11.0155C34.7637 12.5451 35.8054 14.494 36.2274 16.6157C36.6494 18.7373 36.4328 20.9365 35.605 22.9351C34.7772 24.9336 33.3753 26.6418 31.5766 27.8437C29.778 29.0455 27.6633 29.687 25.5001 29.687C22.6002 29.6839 19.82 28.5305 17.7695 26.48C15.719 24.4295 14.5657 21.6493 14.5626 18.7495Z"
                                            fill="black"/>
                                    </svg>
                                    <span className="ml-1 total-users-type-cnt">{studentsCount}</span>
                                </div>

                                <span className="total-users-title">Parents</span>
                                <div className="mb-1">
                                    <svg width="25" height="25" viewBox="0 0 51 50" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M48.3126 29.3753C48.1485 29.4984 47.9617 29.588 47.7629 29.6389C47.5641 29.6898 47.3573 29.7011 47.1541 29.6721C46.951 29.643 46.7556 29.5743 46.579 29.4698C46.4025 29.3652 46.2482 29.2269 46.1251 29.0628C45.1833 27.7969 43.9575 26.7698 42.5463 26.0642C41.1351 25.3586 39.5779 24.9941 38.0001 25.0003C37.6928 25.0002 37.3924 24.9096 37.1364 24.7397C36.8804 24.5699 36.6801 24.3283 36.5607 24.0452C36.4795 23.853 36.4378 23.6464 36.4378 23.4378C36.4378 23.2291 36.4795 23.0226 36.5607 22.8303C36.6801 22.5473 36.8804 22.3057 37.1364 22.1358C37.3924 21.9659 37.6928 21.8753 38.0001 21.8753C38.8768 21.8752 39.7359 21.6293 40.4799 21.1654C41.2238 20.7015 41.8227 20.0383 42.2086 19.2511C42.5945 18.4639 42.752 17.5843 42.663 16.7121C42.574 15.8399 42.2423 15.0102 41.7054 14.3171C41.1685 13.624 40.448 13.0954 39.6257 12.7913C38.8034 12.4872 37.9123 12.4198 37.0537 12.5967C36.195 12.7737 35.4032 13.1878 34.7681 13.7922C34.1331 14.3966 33.6802 15.167 33.461 16.0159C33.4097 16.2147 33.3198 16.4014 33.1963 16.5654C33.0729 16.7294 32.9183 16.8675 32.7415 16.9718C32.5647 17.0761 32.369 17.1445 32.1657 17.1732C31.9625 17.2019 31.7555 17.1902 31.5567 17.1389C31.358 17.0876 31.1712 16.9977 31.0072 16.8742C30.8432 16.7508 30.7051 16.5962 30.6008 16.4194C30.4965 16.2426 30.4281 16.0469 30.3994 15.8436C30.3708 15.6404 30.3824 15.4334 30.4337 15.2346C30.7379 14.0575 31.3127 12.9676 32.1122 12.0517C32.9117 11.1358 33.914 10.4192 35.0393 9.95876C36.1645 9.49837 37.3817 9.30695 38.5939 9.39974C39.8062 9.49253 40.98 9.86697 42.0221 10.4933C43.0642 11.1195 43.9457 11.9804 44.5965 13.0073C45.2474 14.0343 45.6495 15.1989 45.7711 16.4086C45.8926 17.6183 45.7301 18.8397 45.2965 19.9756C44.8629 21.1114 44.1702 22.1304 43.2735 22.9514C45.3982 23.8714 47.2451 25.3312 48.631 27.1858C48.7541 27.3504 48.8435 27.5376 48.8941 27.7368C48.9448 27.936 48.9556 28.1432 48.926 28.3466C48.8965 28.55 48.8271 28.7455 48.7218 28.922C48.6165 29.0986 48.4775 29.2526 48.3126 29.3753ZM37.7892 41.4065C37.9022 41.5844 37.9781 41.7832 38.0123 41.9912C38.0465 42.1991 38.0383 42.4118 37.9882 42.6165C37.938 42.8212 37.847 43.0136 37.7206 43.1822C37.5942 43.3508 37.4349 43.4921 37.2525 43.5975C37.07 43.703 36.8682 43.7704 36.659 43.7959C36.4498 43.8213 36.2376 43.8041 36.0352 43.7454C35.8328 43.6867 35.6444 43.5876 35.4813 43.4542C35.3182 43.3208 35.1837 43.1557 35.086 42.969C34.1018 41.3024 32.6999 39.9211 31.0189 38.9616C29.3379 38.0021 27.4357 37.4974 25.5001 37.4974C23.5645 37.4974 21.6623 38.0021 19.9813 38.9616C18.3003 39.9211 16.8985 41.3024 15.9142 42.969C15.8165 43.1557 15.682 43.3208 15.5189 43.4542C15.3558 43.5876 15.1674 43.6867 14.965 43.7454C14.7626 43.8041 14.5504 43.8213 14.3412 43.7959C14.1321 43.7704 13.9302 43.703 13.7477 43.5975C13.5653 43.4921 13.406 43.3508 13.2796 43.1822C13.1532 43.0136 13.0622 42.8212 13.012 42.6165C12.9619 42.4118 12.9537 42.1991 12.9879 41.9912C13.0221 41.7832 13.098 41.5844 13.211 41.4065C14.7259 38.8037 17.0356 36.7555 19.8009 35.5628C18.2449 34.3714 17.1013 32.7224 16.531 30.8476C15.9606 28.9727 15.9921 26.9663 16.621 25.1102C17.25 23.2542 18.4447 21.6419 20.0373 20.5C21.63 19.3581 23.5404 18.744 25.5001 18.744C27.4598 18.744 29.3702 19.3581 30.9629 20.5C32.5555 21.6419 33.7502 23.2542 34.3792 25.1102C35.0081 26.9663 35.0396 28.9727 34.4692 30.8476C33.8989 32.7224 32.7553 34.3714 31.1993 35.5628C33.9646 36.7555 36.2743 38.8037 37.7892 41.4065ZM25.5001 34.3753C26.7362 34.3753 27.9446 34.0087 28.9724 33.322C30.0002 32.6352 30.8013 31.6591 31.2744 30.517C31.7474 29.375 31.8712 28.1183 31.63 26.906C31.3889 25.6936 30.7936 24.5799 29.9195 23.7058C29.0454 22.8318 27.9318 22.2365 26.7194 21.9954C25.507 21.7542 24.2504 21.878 23.1083 22.351C21.9663 22.8241 20.9902 23.6251 20.3034 24.653C19.6167 25.6808 19.2501 26.8891 19.2501 28.1253C19.2501 29.7829 19.9086 31.3726 21.0807 32.5447C22.2528 33.7168 23.8425 34.3753 25.5001 34.3753ZM14.5626 23.4378C14.5626 23.0234 14.398 22.6259 14.105 22.3329C13.8119 22.0399 13.4145 21.8753 13.0001 21.8753C12.1234 21.8752 11.2643 21.6293 10.5204 21.1654C9.77642 20.7015 9.17748 20.0383 8.79157 19.2511C8.40566 18.4639 8.24825 17.5843 8.33721 16.7121C8.42617 15.8399 8.75795 15.0102 9.29485 14.3171C9.83174 13.624 10.5522 13.0954 11.3745 12.7913C12.1968 12.4872 13.0879 12.4198 13.9465 12.5967C14.8052 12.7737 15.597 13.1878 16.2321 13.7922C16.8672 14.3966 17.32 15.167 17.5392 16.0159C17.6428 16.4173 17.9016 16.7612 18.2587 16.9718C18.6159 17.1824 19.042 17.2425 19.4435 17.1389C19.8449 17.0353 20.1888 16.7765 20.3994 16.4194C20.61 16.0623 20.6701 15.6361 20.5665 15.2346C20.2623 14.0575 19.6876 12.9676 18.888 12.0517C18.0885 11.1358 17.0862 10.4192 15.961 9.95876C14.8357 9.49837 13.6185 9.30695 12.4063 9.39974C11.194 9.49253 10.0202 9.86697 8.97809 10.4933C7.93601 11.1195 7.05449 11.9804 6.40366 13.0073C5.75283 14.0343 5.35066 15.1989 5.22914 16.4086C5.10763 17.6183 5.27013 18.8397 5.70371 19.9756C6.13728 21.1114 6.82998 22.1304 7.72667 22.9514C5.60417 23.8722 3.75931 25.332 2.3751 27.1858C2.1262 27.5173 2.0192 27.9342 2.07762 28.3446C2.13604 28.755 2.35511 29.1254 2.68663 29.3743C3.01815 29.6232 3.43497 29.7302 3.84538 29.6718C4.2558 29.6134 4.6262 29.3943 4.8751 29.0628C5.81687 27.7969 7.04271 26.7698 8.45393 26.0642C9.86515 25.3586 11.4223 24.9941 13.0001 25.0003C13.4145 25.0003 13.8119 24.8356 14.105 24.5426C14.398 24.2496 14.5626 23.8522 14.5626 23.4378Z"
                                            fill="black"/>
                                    </svg>
                                    <span className="ml-1 total-users-type-cnt">{parentsCount}</span>
                                </div>

                                <span className="total-users-title">Teachers</span>
                                <div className="mb-1">
                                    <svg width="25" height="25" viewBox="0 0 51 50" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_5234_125482)">
                                            <path
                                                d="M28.625 15.6245C28.625 15.2101 28.7897 14.8127 29.0827 14.5197C29.3757 14.2266 29.7731 14.062 30.1875 14.062H48.9375C49.3519 14.062 49.7494 14.2266 50.0424 14.5197C50.3354 14.8127 50.5 15.2101 50.5 15.6245C50.5 16.0389 50.3354 16.4364 50.0424 16.7294C49.7494 17.0224 49.3519 17.187 48.9375 17.187H30.1875C29.7731 17.187 29.3757 17.0224 29.0827 16.7294C28.7897 16.4364 28.625 16.0389 28.625 15.6245ZM48.9375 23.437H30.1875C29.7731 23.437 29.3757 23.6016 29.0827 23.8947C28.7897 24.1877 28.625 24.5851 28.625 24.9995C28.625 25.4139 28.7897 25.8114 29.0827 26.1044C29.3757 26.3974 29.7731 26.562 30.1875 26.562H48.9375C49.3519 26.562 49.7494 26.3974 50.0424 26.1044C50.3354 25.8114 50.5 25.4139 50.5 24.9995C50.5 24.5851 50.3354 24.1877 50.0424 23.8947C49.7494 23.6016 49.3519 23.437 48.9375 23.437ZM48.9375 32.812H34.875C34.4606 32.812 34.0632 32.9766 33.7702 33.2697C33.4772 33.5627 33.3125 33.9601 33.3125 34.3745C33.3125 34.7889 33.4772 35.1864 33.7702 35.4794C34.0632 35.7724 34.4606 35.937 34.875 35.937H48.9375C49.3519 35.937 49.7494 35.7724 50.0424 35.4794C50.3354 35.1864 50.5 34.7889 50.5 34.3745C50.5 33.9601 50.3354 33.5627 50.0424 33.2697C49.7494 32.9766 49.3519 32.812 48.9375 32.812ZM30.1387 37.1089C30.1898 37.3077 30.2012 37.5146 30.1723 37.7178C30.1434 37.921 30.0748 38.1165 29.9703 38.2931C29.8658 38.4698 29.7276 38.6241 29.5634 38.7473C29.3993 38.8706 29.2125 38.9602 29.0137 39.0112C28.8864 39.0456 28.755 39.0626 28.6231 39.062C28.2765 39.0622 27.9398 38.9472 27.6658 38.735C27.3918 38.5229 27.196 38.2257 27.1094 37.8902C25.9063 33.2144 21.1836 29.687 16.1231 29.687C11.0625 29.687 6.33988 33.2124 5.13675 37.8902C5.03315 38.2916 4.77432 38.6355 4.4172 38.8461C4.06007 39.0567 3.63391 39.1168 3.23246 39.0132C2.83101 38.9096 2.48715 38.6508 2.27654 38.2936C2.06593 37.9365 2.00581 37.5104 2.10941 37.1089C3.20121 32.8687 6.37503 29.4351 10.4024 27.7339C8.85166 26.5395 7.71368 24.8897 7.14805 23.0158C6.58242 21.1419 6.61749 19.138 7.24837 17.285C7.87924 15.4321 9.07426 13.8231 10.6658 12.6837C12.2574 11.5443 14.1657 10.9316 16.1231 10.9316C18.0805 10.9316 19.9888 11.5443 21.5803 12.6837C23.1719 13.8231 24.3669 15.4321 24.9978 17.285C25.6287 19.138 25.6637 21.1419 25.0981 23.0158C24.5325 24.8897 23.3945 26.5395 21.8438 27.7339C25.8731 29.4351 29.0469 32.8687 30.1387 37.1089ZM16.125 26.562C17.3612 26.562 18.5695 26.1955 19.5973 25.5087C20.6252 24.822 21.4262 23.8458 21.8993 22.7038C22.3723 21.5618 22.4961 20.3051 22.2549 19.0927C22.0138 17.8803 21.4185 16.7667 20.5445 15.8926C19.6704 15.0185 18.5567 14.4233 17.3443 14.1821C16.132 13.941 14.8753 14.0647 13.7333 14.5378C12.5912 15.0108 11.6151 15.8119 10.9283 16.8397C10.2416 17.8675 9.87503 19.0759 9.87503 20.312C9.87503 21.9696 10.5335 23.5593 11.7056 24.7314C12.8777 25.9035 14.4674 26.562 16.125 26.562Z"
                                                fill="black"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_5234_125482">
                                                <rect width="50" height="50" fill="white" transform="translate(0.5)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="ml-1 total-users-type-cnt">{teachersCount}</span>
                                </div>

                                <span className="total-users-title">Counsellors</span>
                                <div className="mb-1">
                                    <svg width="25" height="25" viewBox="0 0 51 50" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.1855 38.75C15.3498 38.8734 15.5367 38.9632 15.7357 39.0143C15.9346 39.0654 16.1417 39.0768 16.3451 39.0478C16.5484 39.0187 16.7441 38.9499 16.9208 38.8452C17.0975 38.7405 17.2519 38.6019 17.375 38.4375C18.321 37.1761 19.5477 36.1523 20.958 35.4472C22.3682 34.7421 23.9233 34.375 25.5 34.375C27.0767 34.375 28.6318 34.7421 30.042 35.4472C31.4523 36.1523 32.679 37.1761 33.625 38.4375C33.7481 38.6017 33.9024 38.7399 34.0789 38.8445C34.2555 38.949 34.4509 39.0178 34.654 39.0468C34.8572 39.0758 35.064 39.0645 35.2628 39.0136C35.4616 38.9627 35.6483 38.8731 35.8125 38.75C35.9767 38.6269 36.1149 38.4726 36.2195 38.2961C36.324 38.1195 36.3928 37.9241 36.4218 37.721C36.4508 37.5178 36.4395 37.311 36.3886 37.1122C36.3377 36.9134 36.2481 36.7267 36.125 36.5625C34.7414 34.7075 32.8964 33.247 30.7734 32.3262C31.9369 31.2639 32.752 29.8748 33.1119 28.341C33.4717 26.8072 33.3594 25.2005 32.7897 23.7317C32.2201 22.2629 31.2197 21.0006 29.9198 20.1105C28.6199 19.2204 27.0813 18.7441 25.5059 18.7441C23.9304 18.7441 22.3918 19.2204 21.0919 20.1105C19.7921 21.0006 18.7916 22.2629 18.222 23.7317C17.6523 25.2005 17.54 26.8072 17.8999 28.341C18.2597 29.8748 19.0748 31.2639 20.2383 32.3262C18.111 33.2453 16.2618 34.7059 14.875 36.5625C14.6262 36.8938 14.5191 37.3103 14.5773 37.7206C14.6355 38.1308 14.8543 38.5011 15.1855 38.75ZM25.5 21.875C26.4271 21.875 27.3334 22.1499 28.1042 22.665C28.8751 23.1801 29.4759 23.9121 29.8307 24.7687C30.1855 25.6252 30.2783 26.5677 30.0974 27.477C29.9166 28.3863 29.4701 29.2215 28.8146 29.8771C28.159 30.5326 27.3238 30.9791 26.4145 31.1599C25.5052 31.3408 24.5627 31.248 23.7062 30.8932C22.8496 30.5384 22.1176 29.9376 21.6025 29.1667C21.0874 28.3959 20.8125 27.4896 20.8125 26.5625C20.8125 25.3193 21.3064 24.127 22.1854 23.2479C23.0645 22.3689 24.2568 21.875 25.5 21.875ZM39.5625 4.6875H11.4375C10.6087 4.6875 9.81384 5.01674 9.22779 5.60279C8.64174 6.18884 8.3125 6.9837 8.3125 7.8125V42.1875C8.3125 43.0163 8.64174 43.8112 9.22779 44.3972C9.81384 44.9833 10.6087 45.3125 11.4375 45.3125H39.5625C40.3913 45.3125 41.1862 44.9833 41.7722 44.3972C42.3583 43.8112 42.6875 43.0163 42.6875 42.1875V7.8125C42.6875 6.9837 42.3583 6.18884 41.7722 5.60279C41.1862 5.01674 40.3913 4.6875 39.5625 4.6875ZM39.5625 42.1875H11.4375V7.8125H39.5625V42.1875ZM17.6875 12.5C17.6875 12.0856 17.8521 11.6882 18.1451 11.3951C18.4382 11.1021 18.8356 10.9375 19.25 10.9375H31.75C32.1644 10.9375 32.5618 11.1021 32.8549 11.3951C33.1479 11.6882 33.3125 12.0856 33.3125 12.5C33.3125 12.9144 33.1479 13.3118 32.8549 13.6049C32.5618 13.8979 32.1644 14.0625 31.75 14.0625H19.25C18.8356 14.0625 18.4382 13.8979 18.1451 13.6049C17.8521 13.3118 17.6875 12.9144 17.6875 12.5Z"
                                            fill="black"/>
                                    </svg>
                                    <span className="ml-1 total-users-type-cnt">{counsellorsCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};