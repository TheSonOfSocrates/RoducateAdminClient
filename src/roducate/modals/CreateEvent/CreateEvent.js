import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showCreateEvent, showUserTypeSelectModal} from '@store/actions/modal'
import {X} from "react-feather";
import './CreateEvent.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";
import {UserTypeSelectModal} from "../UserTypeSelectModal/UserTypeSelectModal";
import Select from "react-select";
import {selectThemeColors} from '@utils'
import Flatpickr from "react-flatpickr";
import FileUploader from "../../components/FileUploader/FileUploader";
import '@styles/react/libs/flatpickr/flatpickr.scss'

export const CreateEvent = ({event = undefined, onChange = undefined}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')
    const [userType, setUserType] = useState(undefined);
    const [eventType, setEventType] = useState('free')
    const [ageLimit, setAgeLimit] = useState(0)

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [icon, setIcon] = useState(undefined)

    useEffect(() => {
        if (event) {
            setTitle(event?.title)
            setDescription(event?.description)
            setUserType(event.userType)
            setAgeLimit(event.ageLimit)
        } else {
            setTitle('')
            setDescription('')
            setUserType(undefined)
            setAgeLimit(0)
        }
    }, [store.showCreateEvent])

    const onIconChange = (icon) => {
        setIcon(icon)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const create = async (isPublished) => {
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

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('startDate', startDate.toUTCString())
        formData.append('endDate', endDate.toUTCString())
        formData.append('eventImages', icon)
        formData.append('fee', eventType === 'free' ? 0 : amount)
        formData.append('userType', userType.toLowerCase())
        formData.append('ageLimit', Number.isInteger(ageLimit) ? ageLimit : ageLimit.value)

        let result;
        if (event)
            result = await axios.post(`/event/updateEvent/${event._id}`, formData);
        else
            result = await axios.post(`/event`, formData);

        if (result.data.success) {
            await MySwal.fire({
                title: 'Good job!',
                text: `You ${event ? 'updated' : 'added'} event successfully!`,
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    dispatch(showCreateEvent())
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

    const eventTypeOptions = [
        {value: 'free', label: 'Free Event'},
        {value: 'paid', label: 'Paid Event'}
    ]

    return (
        <Modal toggle={() => dispatch(showCreateEvent())}
               isOpen={store.showCreateEvent}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showCreateEvent())}>
                <div className="d-flex justify-content-between">
                    <Button.Ripple color='info' outline onClick={() => create(false)}>
                        Save as Draft
                    </Button.Ripple>
                    <Button.Ripple onClick={() => dispatch(showCreateEvent())}
                                   className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-event-title">{(event ? 'EDIT ' : 'CREATE ') + 'EVENT'}</h1>

                <Select
                    theme={selectThemeColors}
                    className='react-select mb-1'
                    classNamePrefix='select'
                    value={eventTypeOptions.find((item) => item.value === eventType)}
                    options={eventTypeOptions}
                    isClearable={false}
                    onChange={(value) => setEventType(value.value)}
                />

                <Input placeholder={`Event title`} style={{marginBottom: 20}}
                       value={title} onChange={onTitleChanged}/>

                <div className="row">
                    <div className="col-6">
                        <span>Start Date:</span>
                        <Flatpickr
                            value={startDate}
                            data-enable-time
                            id='date-time-picker1'
                            className='form-control'
                            onChange={date => setStartDate(date)}
                        />
                    </div>
                    <div className="col-6">
                        <span>End Date:</span>
                        <Flatpickr
                            value={endDate}
                            data-enable-time
                            id='date-time-picker2'
                            className='form-control'
                            onChange={date => setEndDate(date)}
                        />
                    </div>
                </div>

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

                <Input className="mb-1" type='textarea' name='text' rows='2' value={description}
                       placeholder='Description'
                       onChange={onChangeDescription}/>

                {eventType === 'paid' && <div className="col-6 pl-0">
                    <Input placeholder="Amount" type="number" style={{marginBottom: 20}}
                           value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>}

                <FileUploader onFileChange={onIconChange}/>

                <div className="d-flex justify-content-center mt-2">
                    <Button color='gradient-primary' onClick={() => create(true)}>Create event</Button>
                </div>
            </ModalBody>

            <UserTypeSelectModal title="User type" onSelected={onUserTypeSelected}/>
        </Modal>
    );
};