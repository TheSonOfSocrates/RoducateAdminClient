import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showCreateClassModal} from '@store/actions/modal'
import './CreateClassModal.css'
import {X} from "react-feather";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {showItemSelectModal} from "../../../redux/actions/modal";
import axios from "../../../utility/axios";
import {ItemSelectModal} from "../ItemSelectModal/ItemSelectModal";
import FileUploader from "../../components/FileUploader/FileUploader";

export const CreateClassModal = ({classification}) => {

        const store = useSelector(state => state.modal)
        const dispatch = useDispatch()

        const [name, setName] = useState('')
        const [des, setDes] = useState('')
        const [entry, setEntry] = useState('')
        const [selectedSubject, setSelectedSubject] = useState([])
        const [icon, setIcon] = useState(undefined)

        const [subjectList, setSubjectList] = useState([])

        const MySwal = withReactContent(Swal)

        useEffect(async () => {
            const response = await axios.post('/library/getSubjectsByTitle', {title: ''})
            if (response.data) {
                setSubjectList(response.data.subjects)
            }

            if (classification) {

            } else {
                setName('')
                setDes('')
                setEntry('')

                setSelectedSubject([])
                setIcon(undefined)
            }

        }, [classification])

        const createClass = async () => {
            if (name === '' || des === '' || entry === '' || !icon || selectedSubject.length === 0) {
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

            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', des)
            formData.append('suitablEntry', entry)
            formData.append('subjects', selectedSubject.map(item => item._id))
            formData.append('isPublished', true)
            formData.append('image', icon)

            const result = await axios.post('/resource/examsuccess/classification', formData);

            if (result.data.success) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: 'You created classification successfully!',
                    icon: 'success',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    setName('')
                    setDes('')
                    setEntry('')

                    setSelectedSubject([])
                    setIcon(undefined)
                    dispatch(showCreateClassModal())
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

        const onIconChange = (icon) => {
            setIcon(icon)
        }

        return (
            <Modal toggle={() => dispatch(showCreateClassModal())}
                   isOpen={store.showCreateClassModal}
                   className="modal-dialog-centered"
            >
                <ModalBody toggle={() => dispatch(showCreateClassModal())}>
                    <div style={{textAlign: 'right'}}>
                        <Button.Ripple onClick={() => dispatch(showCreateClassModal())}
                                       className='btn-icon rounded-circle'
                                       color='flat-danger'>
                            <X size={16}/>
                        </Button.Ripple>
                    </div>
                    <h1 className="add-subject-title">{classification ? 'EDIT' : 'CREATE'} CLASSIFICATION</h1>

                    <FormGroup>
                        <Input placeholder='Classification Name' value={name}
                               onChange={e => setName(e.target.value)}/>
                    </FormGroup>

                    <FormGroup>
                        <Input placeholder='Description' value={des} type="textarea" rows={3}
                               onChange={e => setDes(e.target.value)}/>
                    </FormGroup>

                    <SelectOutlinedWrapper className="col-6" onClick={() => {
                        dispatch(showItemSelectModal(true))
                    }}
                                           text="Subjects"
                                           text1={selectedSubject.length > 0 ? selectedSubject.map(item => item.title).join(', ') : ''}/>

                    <FormGroup>
                        <Input placeholder='Suitable Entry' value={entry}
                               onChange={e => setEntry(e.target.value)}/>
                    </FormGroup>

                    <FileUploader onFileChange={onIconChange}/>

                    <div className="d-flex justify-content-center mt-1">
                        <Button color='gradient-primary' onClick={createClass}>Create</Button>
                    </div>
                </ModalBody>

                <ItemSelectModal data={subjectList}
                                 onSelected={selectedList => {
                                     setSelectedSubject(selectedList)
                                 }}
                                 isMulti={true}
                                 title='Select Subjects'/>
            </Modal>
        );
    }
;