import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showUploadModal} from '@store/actions/modal'
import {X} from "react-feather";
import './UploadModal.css'
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {UppyMultiUploader} from "../../components/UppyMultiUploader/UppyMultiUploader";
import axios from "../../../utility/axios";
import React, {useState} from "react";
import Select from "react-select";
import {selectThemeColors} from '@utils'
import {TagsInput} from "react-tag-input-component";
import CustomUppyFileUploader from "../../components/CustomUppyFileUploader/CustomUppyFileUploader";

export const UploadModal = ({file, onUpdated}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [note, setNote] = useState(undefined)
    const [video, setVideo] = useState(undefined)
    const [podcast, setPodcast] = useState(undefined)

    const [currentOptionType, setCurrentOptionType] = useState('pdf')
    const [tagList, setTagList] = useState([])
    const [coverImage, setCoverImage] = useState(undefined)
    const publish = async (isPublish = true) => {
        if (!note && !video && !podcast) {
            return MySwal.fire({
                title: 'Error',
                text: 'Please upload more than one file',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        let link = '/resource/pdf'
        if (currentOptionType === 'video') {
            link = '/resource/videoStore'
        } else if (currentOptionType === 'podcast') {
            link = '/resource/podcastStore'
        }
        if (file) {
            link = `/resource/pdf/${file._id}`
            if (currentOptionType === 'video') {
                link = `/resource/videoStore/${file._id}`
            } else if (currentOptionType === 'podcast') {
                link = `/resource/podcastStore/${file._id}`
            }
        }

        let mediaURL
        let originalName
        switch (currentOptionType) {
            case 'pdf':
                mediaURL = note?.s3Link.split('/')[note?.s3Link.split('/').length - 1]
                originalName = note?.fileName.split('/')[note?.fileName.split('/').length - 1]
                break
            case 'podcast':
                mediaURL = podcast?.s3Link.split('/')[podcast?.s3Link.split('/').length - 1]
                originalName = podcast?.fileName.split('/')[podcast?.fileName.split('/').length - 1]
                break
            case 'video':
                mediaURL = video?.s3Link.split('/')[video?.s3Link.split('/').length - 1]
                originalName = video?.fileName.split('/')[video?.fileName.split('/').length - 1]
                break
        }

        let res
        try {
            res = await axios.post(link, {
                title,
                description,
                duration: 3200,
                size: 180000,
                tags: tagList,
                coverImage: coverImage.split('/')[coverImage.split('/').length - 1],
                mediaURL,
                originalName,
                isPublish
            })
            if (res && res.data.success) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You ${file ? 'updated' : 'created'} guide successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdated) onUpdated()
                    dispatch(showUploadModal())
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
        {value: 'pdf', label: 'Lesson Note'},
        {value: 'podcast', label: 'Podcast'},
        {value: 'video', label: 'Video'}
    ]

    const onTagChanged = (newList) => {
        if (newList.length === tagList.length) return
        setTagList(newList)
    }

    return (
        <Modal toggle={() => dispatch(showUploadModal())}
               isOpen={store.showUploadModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showUploadModal())}>
                <div className="justify-content-between d-flex">
                    <Button className="mr-1" color='gradient-primary ghost' onClick={() => publish(false)}>Save as
                        Draft</Button>
                    <Button.Ripple onClick={() => dispatch(showUploadModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-sbsg-title text-center">UPLOAD</h1>

                <FormGroup>
                    <Input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </FormGroup>

                <Select
                    theme={selectThemeColors}
                    className='react-select mt-1 mb-1'
                    classNamePrefix='select'
                    options={optionType}
                    isClearable={false}
                    value={optionType.find((item) => item.value === currentOptionType)}
                    placeholder="Question Type"
                    onChange={(item) => {
                        setCurrentOptionType(item.value)
                    }}
                />

                <div className="mb-1">
                    <TagsInput
                        value={tagList}
                        onChange={onTagChanged}
                        placeHolder="Input Tags"
                    />
                </div>

                <FormGroup>
                    <Input type="textarea" placeholder='Description' value={description}
                           onChange={(e) => setDescription(e.target.value)}/>
                </FormGroup>

                <CustomUppyFileUploader multi={false}
                                        currentImgs={coverImage ? [{title: coverImage}] : []}
                                        onFileChange={(images) => setCoverImage(images[0].title)}/>

                <div className="mt-1 row d-flex justify-content-between">
                    {currentOptionType === 'pdf' && <div className="col-12">
                        <p className="text-center">ADD NOTE</p>
                        {!note &&
                            <UppyMultiUploader onFileUploaded={(fileInfo) => (setNote(fileInfo))} type="document"/>}
                        {note && <div>
                            <span>{note.fileName}</span>
                            <Button.Ripple onClick={() => setNote(undefined)}
                                           className='btn-icon rounded-circle float-right'
                                           color='flat-danger'>
                                <X size={12}/>
                            </Button.Ripple>
                        </div>}
                    </div>}
                    {currentOptionType === 'video' && <div className="col-12">
                        <p className="text-center">ADD VIDEO</p>
                        {!video &&
                            <UppyMultiUploader onFileUploaded={(fileInfo) => (setVideo(fileInfo))} type="video"/>}
                        {video && <div>
                            <span>{video.fileName}</span>
                            <Button.Ripple onClick={() => setVideo(undefined)}
                                           className='btn-icon rounded-circle float-right'
                                           color='flat-danger'>
                                <X size={12}/>
                            </Button.Ripple>
                        </div>}
                    </div>}
                    {currentOptionType === 'podcast' && <div className="col-12">
                        <p className="text-center">ADD PODCAST</p>
                        {!podcast &&
                            <UppyMultiUploader onFileUploaded={(fileInfo) => (setPodcast(fileInfo))} type="podcast"/>}
                        {podcast && <div>
                            <span>{podcast.fileName}</span>
                            <Button.Ripple onClick={() => setPodcast(undefined)}
                                           className='btn-icon rounded-circle float-right'
                                           color='flat-danger'>
                                <X size={12}/>
                            </Button.Ripple>
                        </div>}
                    </div>}
                </div>

                <div className="d-flex justify-content-center mt-2">
                    <Button color='gradient-primary' onClick={() => publish(true)}>Publish</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};