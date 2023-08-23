import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showCreateChannelModal, showUserTypeSelectModal} from '@store/actions/modal'
import {X} from "react-feather";
import './CreateChannelModal.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";
import {UserTypeSelectModal} from "../UserTypeSelectModal/UserTypeSelectModal";
import Select from "react-select";
import {selectThemeColors} from '@utils'

export const CreateChannelModal = ({channel = undefined, onChange = undefined}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [userType, setUserType] = useState(undefined);
    const [ageLimit, setAgeLimit] = useState(0)

    useEffect(() => {
        if (channel) {
            setTitle(channel?.title)
            setDescription(channel?.description)
            setUserType(channel.userType)
            setAgeLimit(channel.ageLimit)
        } else {
            setTitle('')
            setDescription('')
            setUserType(undefined)
            setAgeLimit(0)
        }
    }, [store.showCreateChannelModal])

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const createChannel = async () => {
        if (title === '' || !userType || ageLimit === 0) {
            return MySwal.fire({
                title: 'Error!',
                text: 'Please input correctly.',
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
        if (channel)
            result = await axios.put(`/resource/ls/channel/${channel._id}`, {
                title,
                description,
                userType: userType.toLowerCase(),
                ageLimit: Number.isInteger(ageLimit) ? ageLimit : ageLimit.value
            });
        else
            result = await axios.post(`/resource/ls/channel`, {
                title,
                description,
                userType: userType.toLowerCase(),
                ageLimit: Number.isInteger(ageLimit) ? ageLimit : ageLimit.value
            });

        if (result.data.success) {
            await MySwal.fire({
                title: 'Good job!',
                text: `You ${channel ? 'updated' : 'added'} channel successfully!`,
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    dispatch(showCreateChannelModal())
                    if (onChange) onChange()
                }
            })
        } else {
            MySwal.fire({
                title: 'Error!',
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
    }

    const onTitleChanged = (e) => {
        setTitle(e.target.value);
    }

    const onUserTypeSelected = (title) => {
        setUserType(title)
    }

    const ageLimitOptions = [
        {value: 5, label: '5+'},
        {value: 12, label: '12+'},
        {value: 15, label: '15+'},
        {value: 18, label: '18+'}
    ]

    return (
        <Modal toggle={() => dispatch(showCreateChannelModal())}
               isOpen={store.showCreateChannelModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showCreateChannelModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showCreateChannelModal())}
                                   className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-channel-title">{(channel ? 'EDIT ' : 'CREATE ') + 'CHANNEL'}</h1>

                <Input placeholder={`Channel title`} style={{marginBottom: 20}}
                       value={title} onChange={onTitleChanged}/>

                <Input type='textarea' name='text' rows='2' value={description} placeholder='Description'
                       onChange={onChangeDescription}/>

                <div className="row mt-2">
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" onClick={() => dispatch(showUserTypeSelectModal())}
                                               text="User type"
                                               text1={userType ? userType?.charAt(0).toUpperCase() + userType?.substring(1) : ''}/>
                    </div>
                    <div className="col-6">
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            value={ageLimitOptions.find((item) => item.value === ageLimit)}
                            options={ageLimitOptions}
                            isClearable={false}
                            onChange={(value) => setAgeLimit(value)}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-2">
                    <Button color='gradient-primary' onClick={createChannel}>Add</Button>
                </div>
            </ModalBody>

            <UserTypeSelectModal title="User type" onSelected={onUserTypeSelected}/>
        </Modal>
    );
};