import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showCreateAdmin} from '@store/actions/modal'
import './CreateAdmin.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {selectThemeColors} from "../../../utility/Utils";
import {RoleSelectModal} from "../RoleSelectModal/RoleSelectModal";
import {AccessSelectModal} from "../AccessSelectModal/AccessSelectModal";
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {showAccessSelectModal, showRoleSelectModal} from "../../../redux/actions/modal";

export const CreateAdmin = ({admin = undefined, onUpdate}) => {

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
            setEmail(admin.email)
            setGender(optionType.find(item => item.value === admin.gender))
        } else {
            setFirstName('')
            setLastName('')
        }
    }, [admin])

    const addAdmin = async () => {
        console.log(role)
        let link = '/admins';
        let adminData = {
            firstName,
            lastName,
            gender: gender.value,
            email,
            role: role.id,
            permissions: permissionList.map(item => item.title).join(', ')
        }
        if (admin) {
            link = `/setting/updateProfile`
            adminData = {
                firstName,
                lastName,
                gender: gender.value
            }
        }

        let result;
        try {
            result = await axios.post(link, adminData);
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
                    dispatch(showCreateAdmin());
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

    return (
        <Modal toggle={() => dispatch(showCreateAdmin())}
               isOpen={store.showCreateAdmin}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showCreateAdmin())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showCreateAdmin())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <div className="d-flex justify-content-center mb-1">
                    <svg width="96" height="95" viewBox="0 0 96 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" width="95" height="95" rx="47.5" fill="#0089FD" fill-opacity="0.06"/>
                        <path
                            d="M57.1667 52.082C60.1194 52.0822 62.9581 53.2222 65.0907 55.2644C67.2234 57.3065 68.4854 60.0931 68.6135 63.0431L68.625 63.5404V65.832C68.6254 66.9884 68.1887 68.1021 67.4024 68.95C66.6162 69.7978 65.5385 70.3172 64.3854 70.4039L64.0417 70.4154H31.9583C30.802 70.4157 29.6883 69.979 28.8404 69.1928C27.9925 68.4065 27.4732 67.3288 27.3865 66.1758L27.375 65.832V63.5404C27.3752 60.5876 28.5152 57.749 30.5573 55.6163C32.5995 53.4836 35.3861 52.2216 38.336 52.0935L38.8333 52.082H57.1667ZM48 24.582C51.0389 24.582 53.9534 25.7892 56.1023 27.9381C58.2511 30.087 59.4583 33.0014 59.4583 36.0404C59.4583 39.0793 58.2511 41.9938 56.1023 44.1426C53.9534 46.2915 51.0389 47.4987 48 47.4987C44.9611 47.4987 42.0466 46.2915 39.8977 44.1426C37.7489 41.9938 36.5417 39.0793 36.5417 36.0404C36.5417 33.0014 37.7489 30.087 39.8977 27.9381C42.0466 25.7892 44.9611 24.582 48 24.582Z"
                            fill="#0089FD"/>
                    </svg>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Input placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="col-6">
                        <Input placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </div>
                </div>

                <Select
                    theme={selectThemeColors}
                    className='react-select mt-1 mb-1'
                    classNamePrefix='select'
                    options={optionType}
                    isClearable={false}
                    value={gender}
                    placeholder="Gender"
                    onChange={(item) => setGender(item)}
                />

                <FormGroup className="mb-1">
                    <Input placeholder='Email' disabled={admin} type="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </FormGroup>

                {!admin && <SelectOutlinedWrapper className="mb-1" onClick={() => dispatch(showRoleSelectModal(true))}
                                                  text="Set Role"
                                                  text1={role?.title}/>}

                {!admin && <SelectOutlinedWrapper onClick={() => dispatch(showAccessSelectModal(true))} text="Access"
                                                  text1={permissionList?.map(item => item.title).join(', ')}/>}

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={addAdmin}>{admin ? 'Update' : 'Create Admin'}</Button>
                </div>
            </ModalBody>

            <RoleSelectModal onSelected={(title, id) => setRole({title, id})} title={'Admin Role'}/>
            <AccessSelectModal onSelected={(items) => setPermissionList(items)} title="Admin Access"/>
        </Modal>
    );
};