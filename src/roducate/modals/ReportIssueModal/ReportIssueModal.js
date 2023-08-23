import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showReportIssueModal} from '@store/actions/modal'
import './ReportIssueModal.css'
import React, {useState} from "react";
import {X} from "react-feather";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "../../../utility/axios";
import CustomUppyFileUploader from "../../components/CustomUppyFileUploader/CustomUppyFileUploader";

export const ReportIssueModal = () => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [issue, setIssue] = useState('')
    const [des, setDes] = useState('')
    const [link, setLink] = useState('')
    const [imageList, setImageList] = useState([]);

    const MySwal = withReactContent(Swal)

    const sendReport = async () => {
        const res = await axios.post('/activity/reportIssue', {
            title: issue,
            description: des,
            issueLink: link,
            images: imageList[0].title.split('/')[imageList[0].title.split('/').length - 1]
        })
        if (res) {
            await MySwal.fire({
                title: 'Good job!',
                text: `You reported successfully!`,
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            })
            dispatch(showReportIssueModal())
        }
    }

    const onOptionImgAttached = (images) => {
        setImageList([...imageList, ...images])
    }

    return (
        <Modal toggle={() => dispatch(showReportIssueModal())}
               isOpen={store.showReportIssueModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showReportIssueModal())} className="text-center">
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showReportIssueModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <span className="rm-issue-title">REPORT ISSUE</span>
                <Input type="text" className="mb-1" placeholder="Define Issue" value={issue}
                       onChange={e => setIssue(e.target.value)}/>
                <Input type="textarea" className="mb-1" row={3} placeholder="Description" value={des}
                       onChange={e => setDes(e.target.value)}/>
                <Input type="text" className="mb-1" placeholder="Link" value={link}
                       onChange={e => setLink(e.target.value)}/>
                <CustomUppyFileUploader currentImgs={imageList} onFileChange={onOptionImgAttached} multi={false}/>
                <div className="d-flex justify-content-center mt-2">
                    <Button color='gradient-primary' onClick={sendReport}>Send</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};