import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddSBSGModal} from '@store/actions/modal'
import {X} from "react-feather";
import './AddSBSGModal.css'
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {UppyMultiUploader} from "../../components/UppyMultiUploader/UppyMultiUploader";
import axios from "../../../utility/axios";
import React, {useState} from "react";

export const AddSBSGModal = ({sbsg, onUpdated}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [question, setQuestion] = useState('')

    const [note, setNote] = useState(undefined)
    const [video, setVideo] = useState(undefined)
    const [podcast, setPodcast] = useState(undefined)

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

        let link = '/library/sbsg'
        if (sbsg)
            link = `/library/sbsg/${sbsg._id}`

        let res
        try {
            res = await axios.post(link, {
                question,
                note: note?.s3Link,
                video: video?.s3Link,
                podcast: podcast?.s3Link,
                isPublish
            })
            if (res && res.data.success) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You ${sbsg ? 'updated' : 'created'} guide successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdated) onUpdated()
                    dispatch(showAddSBSGModal())
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

    return (
        <Modal toggle={() => dispatch(showAddSBSGModal())}
               isOpen={store.showAddSBSGModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showAddSBSGModal())}>
                <div className="justify-content-between d-flex">
                    <Button className="mr-1" color='gradient-primary ghost' onClick={() => publish(false)}>Save as
                        Draft</Button>
                    <Button.Ripple onClick={() => dispatch(showAddSBSGModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-sbsg-title text-center">ADD STEP-BY-STEP GUIDE</h1>

                <FormGroup>
                    <Input placeholder='Question' value={question} onChange={(e) => setQuestion(e.target.value)}/>
                </FormGroup>

                <div className="row d-flex justify-content-between">
                    <div className="col-4">
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
                    </div>
                    <div className="col-4">
                        <p className="text-center">ADD VIDEO</p>
                        {!video &&
                            <UppyMultiUploader onFileUploaded={(fileInfo) => (setNote(fileInfo))} type="video"/>}
                        {video && <div>
                            <span>{video.fileName}</span>
                            <Button.Ripple onClick={() => setVideo(undefined)}
                                           className='btn-icon rounded-circle float-right'
                                           color='flat-danger'>
                                <X size={12}/>
                            </Button.Ripple>
                        </div>}
                    </div>
                    <div className="col-4">
                        <p className="text-center">ADD PODCAST</p>
                        {!podcast &&
                            <UppyMultiUploader onFileUploaded={(fileInfo) => (setNote(fileInfo))} type="podcast"/>}
                        {podcast && <div>
                            <span>{podcast.fileName}</span>
                            <Button.Ripple onClick={() => setPodcast(undefined)}
                                           className='btn-icon rounded-circle float-right'
                                           color='flat-danger'>
                                <X size={12}/>
                            </Button.Ripple>
                        </div>}
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-2">
                    <Button color='gradient-primary' onClick={() => publish(true)}>Publish</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};