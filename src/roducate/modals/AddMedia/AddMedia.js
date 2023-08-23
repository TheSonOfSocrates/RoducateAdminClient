import {Button, CustomInput, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    hideAddMediaModal,
    showLevelSelectModal,
    showMediaLibModal,
    showSubjectSelectModal,
    showSyllabusSelectModal,
    showTermsLevelSelectModal,
    showUserTypeSelectModal
} from '@store/actions/modal'
import {MinusCircle, Radio, UploadCloud, Video, X} from "react-feather";
import './AddMedia.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";
import {SubjectSelectModal} from "../SubjectSelectModal/SubjectSelectModal";
import {UserTypeSelectModal} from "../UserTypeSelectModal/UserTypeSelectModal";
import RIconBtn from "../../components/RIconBtn/RIconBtn";
import {MediaGalleryModal} from "../MediaGalleryModal/MediaGalleryModal";
import FileUploader from "../../components/FileUploader/FileUploader";
import {TermsLevelSelectModal} from "../TermsLevelSelectModal/TermsLevelSelectModal";

export const AddMedia = ({type, media = undefined, onChange = undefined}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const [description, setDescription] = useState('')

    const [icon, setIcon] = useState(undefined)
    const [existingIcon, setExistingIcon] = useState(undefined)

    const [subject, setSubject] = useState(undefined);

    const [userType, setUserType] = useState('');
    const [termsLevel, setTermsLevel] = useState(undefined);

    const [isActive, setIsActive] = useState(false);

    const [selectedMediaList, setSelectedMediaList] = useState([])

    useEffect(() => {
        if (media) {
            setTitle(media?.title)
            setDescription(media?.description ?? '')
            setSubject({...media?.subject, educationLevel: media.educationLevel, syllabus: media.syllabus})
            setUserType(media.userType)
            setTermsLevel(media.termsLevel)
            setIsActive(media.isActiveComment)
            setSelectedMediaList(type === 'video' ? media.videoStores : media.podcastStores)
            setExistingIcon(media.thumbnail)
            setIcon(undefined)
        } else {
            setTitle('')
            setDescription('')
            setIcon(undefined)
            setSubject(undefined)
            setUserType('')
            setTermsLevel(undefined)
            setIsActive(false)
            setSelectedMediaList([])
        }
    }, [store.isVisibleAddMedia])

    const onSubjectSelected = (subjectItem) => {
        setSubject(subjectItem)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const onActiveChange = () => {
        setIsActive(!isActive)
    }

    const addMedia = async () => {
        if (title === '' || !subject || userType === '' || !termsLevel) {
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
        formData.append('subjectId', subject._id)

        formData.append('syllabus', subject.syllabus._id)
        formData.append('educationLevel', subject.educationLevel._id)
        formData.append('termsLevel', termsLevel._id)

        if (type === "video")
            formData.append('videoStoreIds', selectedMediaList.map((item) => item._id).join(','))
        else
            formData.append('podcastStoreIds', selectedMediaList.map((item) => item._id).join(','))

        formData.append('isPublished', true)
        formData.append('isActiveComment', isActive)
        if (icon) formData.append('thumbnail', icon)

        let result;
        if (media)
            result = await axios.post(`/resource/${type}/${media._id}`, formData);
        else
            result = await axios.post(`/resource/${type}`, formData);

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
                    dispatch(hideAddMediaModal())
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

    const activateSubjectModal = () => {
        dispatch(showSubjectSelectModal())
    }

    const activateUserTypeModal = () => {
        dispatch(showUserTypeSelectModal())
    }

    const activateLevelModal = () => {
        dispatch(showLevelSelectModal())
    }

    const activateSyllabusModal = () => {
        dispatch(showSyllabusSelectModal())
    }

    const activateTermsLevelModal = () => {
        if (subject)
            dispatch(showTermsLevelSelectModal(true))
    }

    const onUserTypeSelected = (title) => {
        setUserType(title)
    }

    const onTermsLevelSelected = (termsLevel) => {
        setTermsLevel(termsLevel)
    }

    const showVideoLibModal = () => {
        dispatch(showMediaLibModal());
    }

    const showUploadModal = () => {

    }

    const onSelected = (mediaList) => {
        setSelectedMediaList(mediaList)
    }

    return (
        <Modal toggle={() => dispatch(hideAddMediaModal())}
               isOpen={store.isVisibleAddMedia}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(hideAddMediaModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(hideAddMediaModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-media-title">{(media ? 'EDIT ' : 'ADD ') + type.toUpperCase()}</h1>

                <Input placeholder={`${type} title`} style={{marginBottom: 20}}
                       value={title} onChange={onTitleChanged}/>

                <SelectOutlinedWrapper onClick={activateSubjectModal} text="Subject"
                                       text1={subject ? subject.title : ''}/>
                <br/>

                <Input type='textarea' name='text' rows='2' value={description} placeholder='Description'
                       onChange={onChangeDescription}/>

                <div>
                    <div className="mt-2 d-flex justify-content-between">
                        <span className="media-activeComment">Active Comment</span>
                        <CustomInput
                            type='switch'
                            id="add-media-switch"
                            name='customSwitch'
                            checked={isActive}
                            inline
                            onChange={onActiveChange}
                        />
                    </div>
                    <span
                        className="media-activeDescription">Toggle switch OFF or ON to deactivate or activate comments</span>
                </div>

                <div className="row mt-2">
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" onClick={activateUserTypeModal} text="User type"
                                               text1={userType.charAt(0).toUpperCase() + userType.substring(1)}/>
                    </div>
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" onClick={activateLevelModal}
                                               text="Education Level & Class"
                                               text1={subject ? subject.educationLevel.title : ''}/>
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" text="Syllabus" onClick={activateSyllabusModal}
                                               text1={subject ? subject.syllabus.title : ''}/>
                    </div>
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" text="Period" onClick={activateTermsLevelModal}
                                               text1={termsLevel ? termsLevel.title : ''}/>
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

            <SubjectSelectModal title="Subject" onSelected={onSubjectSelected}/>
            <UserTypeSelectModal title="User type" onSelected={onUserTypeSelected}/>
            <TermsLevelSelectModal title="Terms" onSelected={onTermsLevelSelected}
                                   educationLevelId={subject ? subject.educationLevel._id : ''}/>

            <MediaGalleryModal type={type} onSelected={onSelected}/>
        </Modal>
    );
};