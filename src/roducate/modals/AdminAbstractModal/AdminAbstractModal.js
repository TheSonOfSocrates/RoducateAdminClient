import {Button, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAdminAbstractModal} from '@store/actions/modal'
import './AdminAbstractModal.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import Avatar from '@components/avatar'
import {isUserLoggedIn} from '@utils'
import {showCreateAdmin} from "../../../redux/actions/modal";
import {CreateAdmin} from "../CreateAdmin/CreateAdmin";

export const AdminAbstractModal = ({admin = undefined}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState(undefined);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [permissionList, setPermissionList] = useState([]);

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (admin) {
            setFirstName(admin.firstName)
            setLastName(admin.lastName)
        } else {
            setFirstName('')
            setLastName('')
        }
    }, [admin])

    const addAdmin = async () => {
        let link = '/library/admin';
        if (admin)
            link = `/library/admin/${admin._id}`

        let result;
        try {
            result = await axios.post(link, {
                title: firstName,
                country: lastName
            });
            if (result.status) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You ${admin ? 'updated' : 'created'} admin successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdate) onUpdate();
                    dispatch(showAdminAbstractModal());
                })
            } else {
                await MySwal.fire({
                    title: 'Error',
                    text: 'Something went wrong.',
                    icon: 'error',
                    timer: 2000,
                    position: 'center',
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })
            }
        } catch (e) {
            await MySwal.fire({
                title: 'Error',
                text: e.toString(),
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }
    }

    const optionType = [
        {value: 'male', label: 'Male'},
        {value: 'female', label: 'Female'}
    ]

    const [userData, setUserData] = useState(null)

    //** ComponentDidMount
    useEffect(() => {
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])

    const userAvatar = (userData && userData.avatar) || defaultAvatar

    return (
        <Modal toggle={() => dispatch(showAdminAbstractModal())}
               isOpen={store.showAdminAbstractModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showAdminAbstractModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAdminAbstractModal())}
                                   className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>

                <div className="d-flex justify-content-center">
                    <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${userAvatar}`} imgHeight='100' imgWidth='100'
                            status='online'/>
                </div>

                <p className="text-center mt-1 profile-name">{userData?.firstName} {userData?.lastName}</p>

                <div className="text-center mt-2 mb-2">
                    <span className="edit-btn cursor-pointer" onClick={e => dispatch(showCreateAdmin(true))}>Edit Details</span>
                </div>

                <div className="profile-act-pan mt-2 mb-2 p-2">
                    <div className="text-center">
                        <span className="edit-day-change">Today
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M10.0302 12.2802C9.8896 12.4209 9.69887 12.4998 9.5 12.4998C9.30113 12.4998 9.1104 12.4209 8.96975 12.2802L4.727 8.0375C4.65537 7.96831 4.59823 7.88555 4.55892 7.79405C4.51962 7.70255 4.49893 7.60413 4.49806 7.50455C4.4972 7.40496 4.51617 7.3062 4.55388 7.21403C4.59159 7.12186 4.64728 7.03812 4.7177 6.9677C4.78812 6.89728 4.87186 6.84159 4.96403 6.80388C5.05621 6.76617 5.15497 6.74719 5.25455 6.74806C5.35414 6.74893 5.45255 6.76962 5.54405 6.80892C5.63556 6.84823 5.71831 6.90536 5.7875 6.977L9.5 10.6895L13.2125 6.977C13.354 6.84038 13.5434 6.76478 13.7401 6.76649C13.9367 6.7682 14.1248 6.84708 14.2639 6.98613C14.4029 7.12519 14.4818 7.3133 14.4835 7.50995C14.4852 7.70659 14.4096 7.89605 14.273 8.0375L10.0302 12.2802Z"
                                      fill="#8840E6"/>
                            </svg>
                        </span>
                    </div>
                    <div className="row mt-2 mb-1">
                        <div className="col-4 profile-table-header"><span>Modules</span></div>
                        <div className="col-4 profile-table-header"><span>Last updated</span></div>
                        <div className="col-4 profile-table-header"><span>Numbers of uploads</span></div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-4 profile-first-col">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.99999 1.66667C10.2217 1.66667 12.8333 4.27825 12.8333 7.5C12.8333 10.7218 10.2217 13.3333 6.99999 13.3333C3.77824 13.3333 1.16666 10.7218 1.16666 7.5C1.16666 4.27825 3.77824 1.66667 6.99999 1.66667ZM6.41666 2.8695C5.2399 3.01923 4.16432 3.61142 3.40852 4.52571C2.65271 5.44 2.2734 6.60777 2.34769 7.79168C2.42197 8.9756 2.94427 10.0868 3.80842 10.8994C4.67258 11.7121 5.81375 12.1652 6.99999 12.1667C8.13668 12.1666 9.23429 11.7518 10.0868 11C10.9394 10.2482 11.4883 9.21109 11.6305 8.08333H6.99999C6.84528 8.08333 6.69691 8.02188 6.58751 7.91248C6.47811 7.80308 6.41666 7.65471 6.41666 7.5V2.8695ZM7.58332 2.8695V6.91667H11.6305C11.5006 5.8886 11.0325 4.93295 10.2998 4.20022C9.56704 3.4675 8.61139 2.99934 7.58332 2.8695Z"
                                    fill="#8840E6"/>
                            </svg>
                            <span className="ml-1">Study</span></div>
                        <div className="col-4 profile-table-header"><span>3 hours ago</span></div>
                        <div className="col-4 profile-last-col"><span>23 Content uploaded</span></div>
                    </div>
                    <div className="row">
                        <div className="col-4 profile-first-col">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.99999 1.66667C10.2217 1.66667 12.8333 4.27825 12.8333 7.5C12.8333 10.7218 10.2217 13.3333 6.99999 13.3333C3.77824 13.3333 1.16666 10.7218 1.16666 7.5C1.16666 4.27825 3.77824 1.66667 6.99999 1.66667ZM6.41666 2.8695C5.2399 3.01923 4.16432 3.61142 3.40852 4.52571C2.65271 5.44 2.2734 6.60777 2.34769 7.79168C2.42197 8.9756 2.94427 10.0868 3.80842 10.8994C4.67258 11.7121 5.81375 12.1652 6.99999 12.1667C8.13668 12.1666 9.23429 11.7518 10.0868 11C10.9394 10.2482 11.4883 9.21109 11.6305 8.08333H6.99999C6.84528 8.08333 6.69691 8.02188 6.58751 7.91248C6.47811 7.80308 6.41666 7.65471 6.41666 7.5V2.8695ZM7.58332 2.8695V6.91667H11.6305C11.5006 5.8886 11.0325 4.93295 10.2998 4.20022C9.56704 3.4675 8.61139 2.99934 7.58332 2.8695Z"
                                    fill="#8840E6"/>
                            </svg>
                            <span className="ml-1">Exam Success</span></div>
                        <div className="col-4 profile-table-header"><span>3 hours ago</span></div>
                        <div className="col-4 profile-last-col"><span>23 Content uploaded</span></div>
                    </div>
                </div>
            </ModalBody>

            <CreateAdmin admin={{
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                gender: userData?.gender,
                email: userData?.email
            }}/>
        </Modal>
    );
};