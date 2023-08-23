import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showChangePwdModal} from '@store/actions/modal'
import './ChangePwdModal.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useState} from "react";

export const ChangePwdModal = ({syllabus, onUpdate}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const MySwal = withReactContent(Swal)

    const pwdChange = (e) => {
        setPwd(e.target.value);
    }

    const confirm = async () => {
        if (pwd === '' || confirmPwd === '' || pwd !== confirmPwd) {
            return await MySwal.fire({
                title: 'Error',
                text: 'Please input correctly',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        let result;
        try {
            result = await axios.post('/pwd/change', {
                password: pwd,
            });
            if (result.status) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You changed password successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdate) onUpdate();
                    dispatch(showChangePwdModal());
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

    return (
        <Modal toggle={() => dispatch(showChangePwdModal())}
               isOpen={store.showChangePwdModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showChangePwdModal())}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C13.2211 1.99891 14.4004 2.44472 15.3155 3.25335C16.2305 4.06198 16.818 5.17751 16.9671 6.3895C17.1162 7.60149 16.8166 8.82615 16.1248 9.83244C15.4331 10.8387 14.397 11.5571 13.212 11.852L13 11.9V15H15C15.2549 15.0003 15.5 15.0979 15.6854 15.2729C15.8707 15.4478 15.9822 15.687 15.9972 15.9414C16.0121 16.1958 15.9293 16.4464 15.7657 16.6418C15.6021 16.8373 15.3701 16.9629 15.117 16.993L15 17H13V18H15C15.2549 18.0003 15.5 18.0979 15.6854 18.2729C15.8707 18.4478 15.9822 18.687 15.9972 18.9414C16.0121 19.1958 15.9293 19.4464 15.7657 19.6418C15.6021 19.8373 15.3701 19.9629 15.117 19.993L15 20H13V21C12.9997 21.2549 12.9021 21.5 12.7271 21.6854C12.5522 21.8707 12.313 21.9822 12.0586 21.9972C11.8042 22.0121 11.5536 21.9293 11.3582 21.7657C11.1627 21.6021 11.0371 21.3701 11.007 21.117L11 21V11.9C9.78864 11.6491 8.71325 10.9582 7.9815 9.96074C7.24976 8.9633 6.91359 7.73009 7.03791 6.49929C7.16223 5.26848 7.73823 4.12741 8.65466 3.29645C9.57109 2.4655 10.7629 2.00361 12 2ZM12 4C11.606 4 11.2159 4.0776 10.8519 4.22836C10.488 4.37913 10.1573 4.60011 9.87867 4.87868C9.6001 5.15726 9.37912 5.48797 9.22836 5.85195C9.07759 6.21593 9 6.60604 9 7C9 7.39397 9.07759 7.78408 9.22836 8.14805C9.37912 8.51203 9.6001 8.84275 9.87867 9.12132C10.1573 9.3999 10.488 9.62088 10.8519 9.77164C11.2159 9.9224 11.606 10 12 10C12.7956 10 13.5587 9.68393 14.1213 9.12132C14.6839 8.55871 15 7.79565 15 7C15 6.20435 14.6839 5.44129 14.1213 4.87868C13.5587 4.31607 12.7956 4 12 4Z"
                                fill="black"/>
                        </svg>
                        <span className="pwd-title">Change Password</span>
                    </div>
                    <Button.Ripple onClick={() => dispatch(showChangePwdModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <div className="text-center">
                    <svg width="99" height="98" viewBox="0 0 99 98" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.780029" width="97.44" height="97.4426" rx="48.72" fill="#F8F7FE"/>
                        <g clip-path="url(#clip0_6782_167865)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M68.017 71.0924C67.8934 71.2984 67.811 71.3808 67.8522 71.3396C67.8522 71.3396 67.9346 71.216 68.017 71.0924ZM47.4608 72.246C47.0077 72.6581 46.5546 72.9053 46.1426 73.0701C45.8131 73.1937 45.5247 73.2349 45.4423 73.2761C45.4423 73.2761 45.2363 73.2761 45.1539 73.2761C45.0304 73.2761 44.9068 73.2761 44.8244 73.2761C44.6596 73.2761 44.4948 73.2761 44.2889 73.2761C43.9181 73.2761 43.4238 73.2761 42.847 73.2761C41.7348 73.2761 40.293 73.2761 38.8512 73.2761C37.4094 73.2761 35.9675 73.2349 34.8965 73.1937C34.361 73.1937 33.8666 73.1937 33.4959 73.1525C33.3311 73.1525 33.1251 73.1525 32.9603 73.1525C32.8779 73.1525 32.7544 73.1525 32.5896 73.1113C32.5072 73.1113 32.3424 73.1113 32.1776 73.0289C32.0952 73.0289 31.8893 72.9465 31.6833 72.8641C31.5597 72.7817 31.0242 72.5756 30.5298 72.0812C29.9943 71.5456 29.7883 70.9688 29.706 70.8452C29.6236 70.6391 29.5824 70.4331 29.5412 70.3507C29.5 70.1447 29.4588 69.9799 29.4588 69.8975C29.4588 69.7327 29.4588 69.5267 29.4176 69.4031C29.4176 69.1147 29.4176 68.785 29.3764 68.373C29.3764 67.5902 29.3352 66.4777 29.3352 65.2005C29.5 62.6459 29.5 59.2261 29.5 55.7652C29.5 52.3042 29.5 48.8432 29.5824 46.0826C29.5824 44.723 29.6236 43.5281 29.6648 42.6217C29.6648 41.88 29.706 40.9736 29.8295 40.4379C31.3125 31.7443 38.4392 25.0283 47.1725 24.1219C58.9953 22.8858 66.9047 30.673 68.9645 39.4903C70.7358 47.1127 68.1818 55.8476 60.19 60.5034C61.0963 61.2038 61.879 61.8631 62.5381 62.3987C64.9274 64.3352 66.2044 65.3241 66.8223 65.8185C67.0283 65.9833 67.2343 66.1481 67.3991 66.3129C67.4814 66.3953 67.9758 66.8485 68.3053 67.5078C68.5525 67.961 68.7997 68.7438 68.6761 69.7327C68.6349 70.3507 68.4289 71.3808 67.5226 72.2048C66.6987 72.9877 65.7925 73.1937 65.5041 73.2349C65.1334 73.3173 64.7626 73.3585 64.5154 73.3585C63.6503 73.3997 62.0026 73.3997 59.1189 73.3585C58.6246 73.3585 58.0891 73.3585 57.5123 73.3585C56.5649 73.3585 55.6586 73.3585 54.9171 73.3585C54.052 73.3585 53.3105 73.3585 52.6926 73.3585C51.6215 73.3585 50.4681 73.3173 49.4794 73.0289C48.7379 72.8229 48.1612 72.5344 47.6668 72.1636L47.4608 72.246ZM48.9027 68.4966C48.6967 68.2494 48.4907 67.9198 48.2435 67.549C48.2435 67.549 48.0788 67.343 47.9964 67.2194C46.225 64.8708 46.1014 64.7472 45.8131 64.912C45.6071 65.0357 45.6071 65.0769 45.4011 67.3018C45.3599 67.7962 45.3187 68.167 45.2775 68.4554C45.2363 69.0323 45.1539 69.2795 45.1128 69.4443C45.0716 69.5679 44.9892 69.6091 44.948 69.6091C44.6184 69.7327 33.4547 69.6091 33.3311 69.4855C33.0427 69.1971 33.1251 42.6629 33.3723 41.056C34.6081 34.0104 40.4578 28.4893 47.502 27.7889C66.0808 25.8524 72.6308 50.5737 56.9768 58.0313C56.8944 58.0313 56.8532 58.0725 56.7708 58.1137C56.1117 58.4021 55.4114 58.6905 54.6699 58.9377C53.9696 59.1849 53.4753 59.2673 53.4341 59.4734C53.3517 59.7618 53.9284 60.2974 55.5762 61.6159C55.741 61.7395 55.9058 61.8631 56.0705 62.0279C56.1529 62.1103 56.2765 62.1927 56.3589 62.2751C56.7708 62.6047 57.2652 62.9755 57.8007 63.4288C59.1601 64.5412 60.2724 65.4065 61.1787 66.1481C61.5906 66.4777 61.9614 66.7661 62.2909 67.0134C64.7626 68.9911 64.9686 69.1971 64.9274 69.2795C64.9274 69.2795 64.9274 69.3207 64.9274 69.3619C64.9274 69.4443 64.9274 69.5267 64.9274 69.6091C64.845 69.8151 64.3507 69.8151 61.3434 69.8151C60.9315 69.8151 60.4372 69.8151 59.9428 69.8151C59.2425 69.8151 58.4186 69.8151 57.4711 69.8151C52.0335 69.8151 50.5916 69.9387 49.7266 69.3207C49.4794 69.1559 49.2734 68.9087 49.0262 68.579L48.9027 68.4966Z"
                                  fill="#8840E6"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M37.8521 45.1547L46.5502 37.5367C47.0986 37.0565 47.847 36.8746 48.5546 37.0497L59.6084 39.7846C59.8233 39.8378 59.8797 40.117 59.7022 40.2494L56.1322 42.9136C55.899 43.0877 55.7822 43.376 55.8306 43.663C55.9134 44.154 55.999 44.7056 55.9499 45.0981L55.9495 45.1019C55.8837 45.628 55.7446 46.7411 52.1467 48.2457C48.5401 49.7539 45.5893 49.6883 44.6057 49.3604C43.6221 49.0326 43.3598 48.7047 43.163 48.3112C43.025 48.0352 42.6933 47.0166 42.5076 46.4334C42.4272 46.1807 42.204 46.0003 41.9399 45.976L38.0009 45.6132C37.7714 45.592 37.6788 45.3065 37.8521 45.1547ZM50.0806 48.5524C53.4794 47.6417 55.9756 45.9367 55.6561 44.7441C55.3365 43.5515 52.3222 43.323 48.9234 44.2337C45.5247 45.1444 43.0285 46.8494 43.348 48.042C43.6676 49.2346 46.6819 49.4631 50.0806 48.5524Z"
                                  fill="#8840E6"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_6782_167865">
                                <rect width="40" height="49.4426" fill="white" transform="translate(29.5 24)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <h1 className="enter-new-password mt-1">Enter new password</h1>
                <h1 className="enter-new-password-des pl-1 pr-1 mt-1 mb-2">Password should be a minimum of 8 characters,
                    and
                    must contain
                    an uppercase letter, a lowercase letter, a number, and a special character.</h1>
                <FormGroup>
                    <Input type="password" placeholder='Password' value={pwd} onChange={pwdChange}/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" placeholder='Confirm Password' value={confirmPwd}
                           onChange={(e) => setConfirmPwd(e.target.value)}/>
                </FormGroup>
                <br/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={confirm}>Confirm</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};