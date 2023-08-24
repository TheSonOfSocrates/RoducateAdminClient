import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAdsModal} from '@store/actions/modal'
import './CreateAds.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {selectThemeColors} from '@utils'
import CustomUppyFileUploader from "../../components/CustomUppyFileUploader/CustomUppyFileUploader";
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {showLevelSelectModal, showUserTypeSelectModal} from "../../../redux/actions/modal";
import {UserTypeSelectModal} from "../UserTypeSelectModal/UserTypeSelectModal";
import {LevelSelectModal} from "../LevelSelectModal/LevelSelectModal";
import Flatpickr from "react-flatpickr";
import '@styles/react/libs/flatpickr/flatpickr.scss'

export const CreateAds = ({ads, onUpdate}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [link, setLink] = useState('');
    const [userType, setUserType] = useState(undefined);
    const [level, setLevel] = useState('')
    const [levelId, setLevelId] = useState('')
    const [selectedDisplayChannel, setSelectedDisplayChannel] = useState(undefined);
    const [startDate, setStartDate] = useState(undefined)
    const [endDate, setEndDate] = useState(undefined);
    const [isMobile, setIsMobile] = useState(false);
    const [isWeb, setIsWeb] = useState(false);
    const [imageList, setImageList] = useState([]);

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (ads) {

        } else {
            setName('')
        }
    }, [ads])

    const createAds = async () => {
        let linkUrl = '/adsManager';
        if (ads)
            linkUrl = `/adsManager/${ads._id}`

        let result;
        try {
            result = await axios.post(linkUrl, {
                name,
                userType,
                description: des,
                educationLevel: levelId,
                displayChannel: selectedDisplayChannel.value,
                linkURL: link,
                startDate: new Date(startDate).toUTCString(),
                endDate: new Date(endDate).toUTCString(),
                images: imageList.map(item => 'Account_Uploads/' + item.fileName),
                isMobile,
                isWeb
            });
            if (result.status) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You ${ads ? 'updated' : 'created'} ads successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdate) onUpdate();
                    dispatch(showAdsModal());
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

    const onOptionImgAttached = (images) => {
        setImageList([...imageList, ...images])
    }

    const activateUserTypeModal = () => {
        dispatch(showUserTypeSelectModal())
    }

    const onLevelSelected = (title, id) => {
        setLevel(title)
        setLevelId(id)
    }

    const showLevelListModal = () => {
        dispatch(showLevelSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(showAdsModal())}
               isOpen={store.showAdsModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showAdsModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAdsModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title">{ads ? 'Edit' : 'Create'} Ads</h1>
                <FormGroup>
                    <Input placeholder='Ads Name' value={name}
                           onChange={e => setName(e.target.value)}/>
                </FormGroup>
                <div className="row mt-2">
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" onClick={activateUserTypeModal} text="User type"
                                               text1={userType ? userType?.charAt(0).toUpperCase() + userType?.substring(1) : ''}/>
                    </div>
                    <div className="col-6">
                        <SelectOutlinedWrapper onClick={showLevelListModal} text="Educational Level"
                                               text1={level}/>
                    </div>
                </div>

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
                    <Input placeholder='Link' value={link}
                           onChange={e => setLink(e.target.value)}/>
                </FormGroup>

                <FormGroup>
                    <Input type="textarea" rows="3" placeholder='Description' value={des}
                           onChange={(e) => setDes(e.target.value)}/>
                </FormGroup>

                <div className="row mb-1">
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

                <div className="d-flex justify-content-end mb-1">
                    <div className="cursor-pointer" onClick={() => setIsWeb(!isWeb)}>
                        Web
                        {!isWeb && <svg className="ml-1" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM15.535 8.381L10.585 13.331L8.465 11.21C8.37216 11.1171 8.26192 11.0434 8.14059 10.9931C8.01926 10.9428 7.8892 10.9168 7.75785 10.9168C7.49258 10.9167 7.23814 11.022 7.0505 11.2095C6.86286 11.397 6.75739 11.6514 6.7573 11.9166C6.7572 12.1819 6.86249 12.4364 7.05 12.624L9.808 15.382C9.91015 15.4842 10.0314 15.5653 10.1649 15.6206C10.2984 15.6759 10.4415 15.7044 10.586 15.7044C10.7305 15.7044 10.8736 15.6759 11.0071 15.6206C11.1406 15.5653 11.2618 15.4842 11.364 15.382L16.95 9.796C17.1376 9.60836 17.2431 9.35386 17.2431 9.0885C17.2431 8.82314 17.1376 8.56864 16.95 8.381C16.7624 8.19336 16.5079 8.08794 16.2425 8.08794C15.9771 8.08794 15.7226 8.19336 15.535 8.381Z"
                                fill="#CACACC"/>
                        </svg>}
                        {isWeb && <svg className="ml-1" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM15.535 8.381L10.585 13.331L8.465 11.21C8.37216 11.1171 8.26192 11.0434 8.14059 10.9931C8.01926 10.9428 7.8892 10.9168 7.75785 10.9168C7.49258 10.9167 7.23814 11.022 7.0505 11.2095C6.86286 11.397 6.75739 11.6514 6.7573 11.9166C6.7572 12.1819 6.86249 12.4364 7.05 12.624L9.808 15.382C9.91015 15.4842 10.0314 15.5653 10.1649 15.6206C10.2984 15.6759 10.4415 15.7044 10.586 15.7044C10.7305 15.7044 10.8736 15.6759 11.0071 15.6206C11.1406 15.5653 11.2618 15.4842 11.364 15.382L16.95 9.796C17.1376 9.60836 17.2431 9.35386 17.2431 9.0885C17.2431 8.82314 17.1376 8.56864 16.95 8.381C16.7624 8.19336 16.5079 8.08794 16.2425 8.08794C15.9771 8.08794 15.7226 8.19336 15.535 8.381Z"
                                fill="#1E63EE"/>
                        </svg>}
                    </div>
                    <div className="ml-2 cursor-pointer" onClick={() => setIsMobile(!isMobile)}>
                        Mobile
                        {!isMobile && <svg className="ml-1" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                           xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM15.535 8.381L10.585 13.331L8.465 11.21C8.37216 11.1171 8.26192 11.0434 8.14059 10.9931C8.01926 10.9428 7.8892 10.9168 7.75785 10.9168C7.49258 10.9167 7.23814 11.022 7.0505 11.2095C6.86286 11.397 6.75739 11.6514 6.7573 11.9166C6.7572 12.1819 6.86249 12.4364 7.05 12.624L9.808 15.382C9.91015 15.4842 10.0314 15.5653 10.1649 15.6206C10.2984 15.6759 10.4415 15.7044 10.586 15.7044C10.7305 15.7044 10.8736 15.6759 11.0071 15.6206C11.1406 15.5653 11.2618 15.4842 11.364 15.382L16.95 9.796C17.1376 9.60836 17.2431 9.35386 17.2431 9.0885C17.2431 8.82314 17.1376 8.56864 16.95 8.381C16.7624 8.19336 16.5079 8.08794 16.2425 8.08794C15.9771 8.08794 15.7226 8.19336 15.535 8.381Z"
                                fill="#CACACC"/>
                        </svg>}
                        {isMobile && <svg className="ml-1" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM15.535 8.381L10.585 13.331L8.465 11.21C8.37216 11.1171 8.26192 11.0434 8.14059 10.9931C8.01926 10.9428 7.8892 10.9168 7.75785 10.9168C7.49258 10.9167 7.23814 11.022 7.0505 11.2095C6.86286 11.397 6.75739 11.6514 6.7573 11.9166C6.7572 12.1819 6.86249 12.4364 7.05 12.624L9.808 15.382C9.91015 15.4842 10.0314 15.5653 10.1649 15.6206C10.2984 15.6759 10.4415 15.7044 10.586 15.7044C10.7305 15.7044 10.8736 15.6759 11.0071 15.6206C11.1406 15.5653 11.2618 15.4842 11.364 15.382L16.95 9.796C17.1376 9.60836 17.2431 9.35386 17.2431 9.0885C17.2431 8.82314 17.1376 8.56864 16.95 8.381C16.7624 8.19336 16.5079 8.08794 16.2425 8.08794C15.9771 8.08794 15.7226 8.19336 15.535 8.381Z"
                                fill="#1E63EE"/>
                        </svg>}
                    </div>
                </div>

                <CustomUppyFileUploader currentImgs={imageList} onFileChange={onOptionImgAttached} multi={true}/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={createAds}>Publish</Button>
                </div>
            </ModalBody>

            <UserTypeSelectModal title="User type" onSelected={onUserTypeSelected}/>
            <LevelSelectModal title="Educational Level & Class" onSelected={onLevelSelected}/>

        </Modal>
    );
};