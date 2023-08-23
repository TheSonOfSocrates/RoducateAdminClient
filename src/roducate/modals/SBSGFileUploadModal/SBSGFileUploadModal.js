import {Button, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showSBSGModal} from '@store/actions/modal'
import {X} from "react-feather";
import './SBSGFileUploadModal.css'
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {UppyMultiUploader} from "../../components/UppyMultiUploader/UppyMultiUploader";
import axios from "../../../utility/axios";

export const SBSGFileUploadModal = ({questionTitle, onSBSGAdded}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    let note;
    let video;
    let podcast;

    const publish = async () => {
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

        const res = await axios.post('/library/sbsg', {
            question: questionTitle,
            note: note?.s3Link,
            video: video?.s3Link,
            podcast: podcast?.s3Link
        })

        if (res && res.data.success) {
            onSBSGAdded({
                id: res.data.id,
                question: questionTitle,
                note,
                video,
                podcast
            })

            dispatch(showSBSGModal())
        }
    }

    return (
        <Modal toggle={() => dispatch(showSBSGModal())}
               isOpen={store.showSBSGModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showSBSGModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showSBSGModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-sbsg-title text-center">ADD STEP-BY-STEP GUIDE</h1>

                <div className="row d-flex justify-content-between">
                    <div className="col-4">
                        <p className="text-center">ADD NOTE</p>
                        <UppyMultiUploader onFileUploaded={(fileInfo) => (note = fileInfo)} type="document"/>
                    </div>
                    <div className="col-4">
                        <p className="text-center">ADD VIDEO</p>
                        <UppyMultiUploader onFileUploaded={(fileInfo) => (video = fileInfo)} type="video"/>
                    </div>
                    <div className="col-4">
                        <p className="text-center">ADD PODCAST</p>
                        <UppyMultiUploader onFileUploaded={(fileInfo) => (podcast = fileInfo)} type="podcast"/>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-2">
                    <Button color='gradient-primary' onClick={publish}>Publish</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};