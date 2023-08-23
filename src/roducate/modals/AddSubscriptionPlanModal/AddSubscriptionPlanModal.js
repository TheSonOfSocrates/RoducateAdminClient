import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideSubscriptionPlanModal, showModuleSelectModal, showStaticSingleSelectModal} from '@store/actions/modal'
import {selectThemeColors} from '@utils'
import {X} from "react-feather";
import './AddSubscriptionPlanModal.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";
import Select from "react-select";
import {ModuleSelectModal} from "../ModuleSelectModal/ModuleSelectModal";
import {StaticSingleSelectModal} from "../StaticSingleSelectModal/StaticSingleSelectModal";

const subTypes = [
    {value: 'full', isFullSubscription: true, label: 'Full Subscription'},
    {value: 'module', isFullSubscription: false, label: 'Module Subscription'}
]

export const AddSubscriptionPlanModal = ({editingRow = undefined, isEdit = false, onChanged = undefined}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [isFullSubscription, setIsFullSubscription] = useState(undefined)

    const [currentSelect, setCurrentSelect] = useState('')

    const [durationTypeTitle, setDurationTypeTitle] = useState('');
    const [durationTypeId, setDurationTypeId] = useState('');

    const [regionTypeTitle, setRegionTypeTitle] = useState('');
    const [regionTypeId, setRegionTypeId] = useState('');

    const [modules, setModules] = useState([])

    const [singleSelectList, setSingleSelectList] = useState([])
    const [singleSelectTitle, setSingleSelectTitle] = useState([])

    const [price, setPrice] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if (editingRow) {
            console.log(editingRow)
            setIsFullSubscription(editingRow.isFullSubscription || editingRow.modules.includes("exam_success"))
            setDuration(parseInt(editingRow.duration))

            const durationType = editingRow.durationType.charAt(0).toUpperCase() + editingRow.durationType.slice(1)
            setDurationTypeTitle(durationType)
            setDurationTypeId(editingRow.durationType)

            setRegionTypeTitle(editingRow.region)
            setRegionTypeId(editingRow.region)

            setModules(editingRow.modules.map(item => ({
                "id": item,
                "title": item.charAt(0).toUpperCase() + item.slice(1)
            })))

            setPrice(parseInt(editingRow.price))
        } else {
            setIsFullSubscription(undefined)
            setDurationTypeTitle('')
            setDurationTypeId('')
            setRegionTypeTitle('')
            setRegionTypeId('')
            setModules([])
            setPrice(0)
            setDuration(0)
        }

        setSingleSelectList([])
        setSingleSelectTitle([])
        setCurrentSelect('duration')
    }, [editingRow])

    const publishPlan = async () => {
        if (isFullSubscription === undefined || (!isFullSubscription && modules.length === 0) || duration === 0 || price === 0 || durationTypeId === '' || regionTypeId === '') {
            return MySwal.fire({
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

        if (price < 400) {
            return MySwal.fire({
                title: 'Error!',
                text: 'Please input price over 400.',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        const data = {
            isFullSubscription: isFullSubscription || modules.some(item => item.id === "exam_success"),
            modules: modules.map(item => item.id),
            duration,
            durationTypeId,
            region: regionTypeId,
            price
        }

        let result = undefined
        if (isEdit) {
            result = await axios.put('/plan/' + editingRow._id, data);
        } else {
            result = await axios.post('/plan', data);
        }

        if (result && result.data.success) {
            await MySwal.fire({
                title: 'Good job!',
                text: 'You added subscription plan successfully!',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    dispatch(hideSubscriptionPlanModal())
                }
            })

            if (isEdit) {
                onChanged()
            }

        } else {
            await MySwal.fire({
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

    const activateDurationTypeModal = () => {
        setCurrentSelect('duration')
        setSingleSelectTitle('Duration Type')
        setSingleSelectList([{title: 'Day', id: 'day'},
            {title: 'Week', id: 'week'}, {title: 'Month', id: 'month'}, {title: 'Year', id: 'year'}])
        dispatch(showStaticSingleSelectModal(true))
    }

    const activateRegionTypeModal = () => {
        setCurrentSelect('region')
        setSingleSelectTitle('Region Type')
        setSingleSelectList([{title: 'Nigeria', id: 'Nigeria'},
            {title: 'Ghana', id: 'Ghana'}, {title: 'South Africa', id: 'South Africa'},
            {title: 'Benin', id: 'Benin'}, {title: 'Cameroon', id: 'Cameroon'}, {title: 'Egypt', id: 'Egypt'},
            {title: 'Kenya', id: 'Kenya'}, {title: 'India', id: 'India'}, {title: 'United State', id: 'United State'},
            {title: 'United Kingdom', id: 'United Kingdom'}])
        dispatch(showStaticSingleSelectModal(true))
    }

    const activateModuleSelectModal = () => {
        dispatch(showModuleSelectModal(true))
    }

    const onSingleTypeSelected = (title, id) => {
        if (currentSelect === 'duration') {
            setDurationTypeTitle(title)
            setDurationTypeId(id)
        } else {
            setRegionTypeTitle(title)
            setRegionTypeId(id)
        }
    }

    const onModuleSelected = (modules) => {
        setModules(modules)
    }

    const onSubscriptionChange = (item) => {
        setIsFullSubscription(item.value === 'full')
    }

    return (
        <Modal toggle={() => dispatch(hideSubscriptionPlanModal())}
               isOpen={store.isVisibleSubscriptionPlanModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(hideSubscriptionPlanModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(hideSubscriptionPlanModal())}
                                   className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subscription-title">{isEdit ? 'Edit Plan' : 'Create Plan'}</h1>

                <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={subTypes}
                    isClearable={false}
                    value={isFullSubscription ? subTypes[0] : subTypes[1]}
                    placeholder="Subscription Type"
                    onChange={onSubscriptionChange}
                />
                <br/>

                {!isFullSubscription &&
                    <SelectOutlinedWrapper className="col-12" onClick={activateModuleSelectModal}
                                           text="Select Module"
                                           text1={modules?.map(item => item.title).join(',')}/>}

                <div className="row mt-2">
                    <div className="col-6">
                        <Input
                            type='text'
                            placeholder="Duration"
                            value={duration}
                            onChange={e => setDuration(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" onClick={activateDurationTypeModal}
                                               text="Select Duration Type"
                                               text1={durationTypeTitle}/>
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-6">
                        <Input
                            type='text'
                            placeholder="Amount"
                            value={price}
                            onChange={e => setPrice(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" text="Select Region" onClick={activateRegionTypeModal}
                                               text1={regionTypeTitle}/>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-2">
                    <Button color='gradient-primary' onClick={publishPlan}>Publish</Button>
                </div>
            </ModalBody>

            <StaticSingleSelectModal data={singleSelectList} title={singleSelectTitle}
                                     onSelected={onSingleTypeSelected}/>
            <ModuleSelectModal onSelected={onModuleSelected}/>

        </Modal>
    );
};