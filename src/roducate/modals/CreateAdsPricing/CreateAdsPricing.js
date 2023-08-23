import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAdsPricingModal} from '@store/actions/modal'
import './CreateAdsPricing.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {selectThemeColors} from '@utils'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {showUserTypeSelectModal} from "../../../redux/actions/modal";
import {UserTypeSelectModal} from "../UserTypeSelectModal/UserTypeSelectModal";
import '@styles/react/libs/flatpickr/flatpickr.scss'

export const CreateAdsPricing = ({ads, onUpdate}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [userType, setUserType] = useState(undefined);
    const [selectedDisplayChannel, setSelectedDisplayChannel] = useState(undefined);
    const [price, setPrice] = useState(undefined);

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (ads) {

        } else {
        }
    }, [ads])

    const createAdsPricing = async () => {
        let linkUrl = '/adsManager/adsPrice';
        if (ads)
            linkUrl = `/adsManager/adsPrice/${ads._id}`

        let result;
        try {
            result = await axios.post(linkUrl, {
                displayChannel: selectedDisplayChannel.value,
                userType,
                price
            });
            if (result.status) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You ${ads ? 'updated' : 'created'} ads pricing successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdate) onUpdate();
                    dispatch(showAdsPricingModal());
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

    const transitionOptions = [
        {value: 'Home Screen', label: 'Home Screen'},
        {value: 'Web App Side Panel', label: 'Web App Side Panel'},
        {value: 'Community', label: 'Community'},
        {value: 'Study Screen', label: 'Study Screen'}
    ]

    const onUserTypeSelected = (id) => {
        setUserType(id)
    }

    const activateUserTypeModal = () => {
        dispatch(showUserTypeSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(showAdsPricingModal())}
               isOpen={store.showAdsPricingModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showAdsPricingModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAdsPricingModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title">{ads ? 'Edit' : 'Create'} Ads Pricing</h1>
                <SelectOutlinedWrapper className="col-6" onClick={activateUserTypeModal} text="User type"
                                       text1={userType ? userType?.charAt(0).toUpperCase() + userType?.substring(1) : ''}/>

                <FormGroup>
                    <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        value={selectedDisplayChannel}
                        options={transitionOptions}
                        isClearable={false}
                        onChange={(value) => setSelectedDisplayChannel(value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Input placeholder='Price' value={price} type="number"
                           onChange={e => setPrice(e.target.value)}/>
                </FormGroup>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={createAdsPricing}>Create</Button>
                </div>
            </ModalBody>

            <UserTypeSelectModal title="User type" onSelected={onUserTypeSelected}/>
        </Modal>
    );
};