import {Button, CustomInput, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddLSModal, showMediaLibModal, showUserTypeSelectModal} from '@store/actions/modal'
import {MinusCircle, Radio, UploadCloud, Video, X} from "react-feather";
import './AddLifeSkill.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";
import {UserTypeSelectModal} from "../UserTypeSelectModal/UserTypeSelectModal";
import RIconBtn from "../../components/RIconBtn/RIconBtn";
import {MediaGalleryModal} from "../MediaGalleryModal/MediaGalleryModal";
import FileUploader from "../../components/FileUploader/FileUploader";
import Select from "react-select";
import {selectThemeColors} from '@utils'
import {ChannelSelectModal} from "../ChannelSelectModal/ChannelSelectModal";
import {showChannelSelectModal} from "../../../redux/actions/modal";

export const AddLifeSkill = ({type, media = undefined, onChange = undefined}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const [description, setDescription] = useState('')

    const [icon, setIcon] = useState(undefined)
    const [existingIcon, setExistingIcon] = useState(undefined)

    const [userType, setUserType] = useState('');

    const [isActive, setIsActive] = useState(false);

    const [selectedMediaList, setSelectedMediaList] = useState([])

    const [ageLimit, setAgeLimit] = useState(0)

    const [channel, setChannel] = useState(undefined)

    useEffect(() => {
        if (media) {
            setTitle(media?.title)
            setDescription(media?.description)
            setUserType(media.userType)
            setIsActive(media.isActiveComment)
            setSelectedMediaList(media.materialType === 'video' ? media.videoStores : media.podcastStores)
            setExistingIcon(media.thumbnail)
            setAgeLimit(media.ageLimit)
            setChannel(media.channel)
            setIcon(undefined)
        } else {
            setTitle('')
            setDescription('')
            setIcon(undefined)
            setUserType('')
            setIsActive(false)
            setSelectedMediaList([])
            setAgeLimit(0)
            setChannel(undefined)
        }
    }, [store.showAddLSModal])

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const onActiveChange = () => {
        setIsActive(!isActive)
    }

    const addMedia = async () => {
        if (title === '' || userType === '' || ageLimit === '' || !channel || !icon || selectedMediaList.length === 0) {
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
        formData.append('userType', userType.toLowerCase())
        formData.append('ageLimit', Number.isInteger(ageLimit) ? ageLimit : ageLimit.value)
        formData.append('materialType', type)
        formData.append('channelId', channel._id)

        if (type === "video")
            formData.append('videoStoreIds', selectedMediaList.map((item) => item._id).join(','))
        else
            formData.append('podcastStoreIds', selectedMediaList.map((item) => item._id).join(','))

        formData.append('isActiveComment', isActive)
        if (icon) formData.append('thumbnail', icon)

        let result;
        if (media)
            result = await axios.post(`/resource/ls/material/${media._id}`, formData);
        else
            result = await axios.post(`/resource/ls/material`, formData);

        if (result.data.success) {
            await MySwal.fire({
                title: 'Good job!',
                text: `You ${media ? 'updated' : 'added'} ${type} successfully!`,
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    dispatch(showAddLSModal())
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

    const onIconChange = (icon) => {
        setIcon(icon)
    }

    const activateUserTypeModal = () => {
        dispatch(showUserTypeSelectModal())
    }

    const activateChannelSelectModal = () => {
        dispatch(showChannelSelectModal(true))
    }

    const onUserTypeSelected = (title) => {
        setUserType(title)
    }

    const onChannelSelected = (channel) => {
        setChannel(channel)
    }

    const showVideoLibModal = () => {
        dispatch(showMediaLibModal());
    }

    const showUploadModal = () => {

    }

    const onSelected = (mediaList) => {
        setSelectedMediaList(mediaList)
    }

    const ageLimitOptions = [
        {value: 5, label: '5+'},
        {value: 12, label: '12+'},
        {value: 15, label: '15+'},
        {value: 18, label: '18+'}
    ]

    return (
        <Modal toggle={() => dispatch(showAddLSModal())}
               isOpen={store.showAddLSModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showAddLSModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAddLSModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-media-title">{(media ? 'EDIT ' : 'ADD ') + type?.toUpperCase()}</h1>

                <Input placeholder={`${type} title`} style={{marginBottom: 20}}
                       value={title} onChange={onTitleChanged}/>

                <Input type='textarea' name='text' rows='2' value={description} placeholder='Description'
                       onChange={onChangeDescription}/>

                <div>
                    <div className="mt-2 d-flex justify-content-between">
                        <span className="media-activeComment">Active Comment</span>
                        <CustomInput
                            type='switch'
                            id="add-life-skill"
                            name='customSwitch'
                            inline
                            checked={isActive}
                            onChange={onActiveChange}
                        />
                    </div>
                    <span
                        className="media-activeDescription">Toggle switch OFF or ON to deactivate or activate comments</span>
                </div>

                <div className="row mt-2">
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" onClick={activateUserTypeModal} text="User type"
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
                    <div className="col-12">
                        <SelectOutlinedWrapper className="col-6" onClick={activateChannelSelectModal} text="Channel"
                                               text1={channel ? channel?.title.charAt(0).toUpperCase() + channel?.title.substring(1) : ''}/>
                    </div>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center">TOPICS</div>
                    <div className="d-flex">
                        <RIconBtn onClick={showUploadModal} text="Upload" icon={<UploadCloud/>}
                                  style={{color: '#8840e5', marginRight: '20px'}}/>
                        <RIconBtn onClick={showVideoLibModal} text={`Add from ${type} Library`}
                                  icon={type === 'video' ? <Video/> : <Radio/>} style={{color: '#1e63ee'}}/>
                    </div>
                </div>

                <div className="mt-2 mb-2 overflow-auto" style={{maxHeight: '130px'}}>
                    {selectedMediaList?.map((item, index) => {
                        return <div className="d-flex justify-content-between mb-1"
                                    style={{borderRadius: '8px', padding: '5px 10px', background: '#e9e6ff'}}>
                            <div className="d-flex justify-content-center">
                                <span className="add-media-gallery-title"
                                      style={{margin: 'auto'}}>{item.mediaURL.split('.')[0]}</span>
                                <span className="add-media-gallery-ext"
                                      style={{margin: 'auto'}}>.{item.mediaURL.split('.')[1]}</span>
                            </div>
                            <Button.Ripple
                                onClick={() => setSelectedMediaList(selectedMediaList.filter((sitem) => sitem._id !== item._id))}
                                className='btn-icon rounded-circle' color='flat-success'>
                                <MinusCircle color="#fc7753" size={21}/>
                            </Button.Ripple>
                        </div>
                    })}
                </div>

                <div>
                    <p>ADD THUMBNAIL</p>
                    <FileUploader onFileChange={onIconChange}/>
                    {media && !icon && <img className="rounded mt-2"
                                            src={`${process.env.REACT_APP_3BUCKET_URL}${existingIcon}`}
                                            alt="avatar"/>}
                </div>

                <div className="d-flex justify-content-center mt-2">
                    <Button color='gradient-primary' onClick={addMedia}>Add</Button>
                </div>
            </ModalBody>

            <UserTypeSelectModal title="User type" onSelected={onUserTypeSelected}/>
            <ChannelSelectModal title="Channel" onSelected={onChannelSelected}/>

            <MediaGalleryModal type={type} onSelected={onSelected}/>
        </Modal>
    );
};