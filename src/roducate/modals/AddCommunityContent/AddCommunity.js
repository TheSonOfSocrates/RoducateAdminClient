import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideAddCommunity} from '@store/actions/modal'
import {X} from "react-feather";
import './AddCommunity.css'
import FileUploader from "../../components/FileUploader/FileUploader";
import {useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";
import {TagsInput} from "react-tag-input-component";

export const AddCommunity = () => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')
    const [link, setLink] = useState('')
    const [hashList, setHashList] = useState([]);
    const [postImages, setPostImages] = useState(undefined)

    const onCaptionChanged = (e) => {
        setCaption(e.target.value)
    }

    const onLinkChanged = (e) => {
        setLink(e.target.value)
    }

    const savePost = () => {
        createPost(true)
    }

    const saveAsDraft = () => {
        createPost(false)
    }

    const createPost = async (isPublished) => {
        if (title === '' && caption === '' && link === '' && postImages.length === 0) {
            return MySwal.fire({
                title: 'Error',
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
        formData.append('caption', caption)
        formData.append('link', link)

        formData.append('hashTags', hashList.join(','))

        if (postImages.length > 0) for (const postImage of postImages) formData.append('postImages', postImage)

        const result = await axios.post('/post', formData);

        if (result.data.success) {
            setTitle('')
            setCaption('')
            setLink('')
            setHashList([])
            setPostImages([])

            await MySwal.fire({
                title: 'Good job!',
                text: 'You added post successfully!',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    dispatch(hideAddCommunity())
                }
            })
        } else {
            MySwal.fire({
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
    }

    const onTitleChanged = (e) => {
        setTitle(e.target.value);
    }

    const onPostImageChanged = (images) => {
        setPostImages(images)
    }

    const onHashTagChanged = (newHashList) => {
        if (newHashList.length === hashList.length) return

        const tmpHashList = []
        for (const hash of newHashList) {
            if (hash.startsWith('#')) tmpHashList.push(hash)
            else tmpHashList.push(`#${hash}`)
        }
        setHashList(tmpHashList)
    }

    return (
        <Modal toggle={() => dispatch(hideAddCommunity())}
               isOpen={store.isVisibleAddCommunity}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(hideAddCommunity())}>
                <div className="d-flex justify-content-between mb-2">
                    <Button.Ripple color='info' outline onClick={saveAsDraft}>
                        Save as Draft
                    </Button.Ripple>

                    <div style={{textAlign: 'right'}}>
                        <Button.Ripple onClick={() => dispatch(hideAddCommunity())} className='btn-icon rounded-circle'
                                       color='flat-danger'>
                            <X size={16}/>
                        </Button.Ripple>
                    </div>
                </div>

                <h1 className="add-subject-title">CREATE POST</h1>

                <Input placeholder='Post Title' value={title} onChange={onTitleChanged}/>

                <Input type='textarea' rows='2' placeholder='Caption' onChange={onCaptionChanged}
                       className="mb-2 mt-2"/>

                <Input placeholder='Add Link' value={link} onChange={onLinkChanged}/>

                <div className="mb-2 mt-2">
                    <TagsInput
                        value={hashList}
                        onChange={onHashTagChanged}
                        placeHolder="Input Hash Tags"
                    />
                </div>

                <FileUploader onFileChange={onPostImageChanged} multi={true}/>
                <br/>

                <div className="d-flex justify-content-center">
                    <Button color='gradient-primary' onClick={savePost}>Create Post</Button>
                </div>
                <br/>


            </ModalBody>
        </Modal>
    );
};