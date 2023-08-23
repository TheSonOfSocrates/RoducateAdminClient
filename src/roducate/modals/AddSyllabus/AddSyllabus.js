import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideAddSyllabus} from '@store/actions/modal'
import './AddSyllabus.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useEffect, useState} from "react";

export const AddSyllabus = ({syllabus, onUpdate}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('');
    const [country, setCountry] = useState('');

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (syllabus) {
            setTitle(syllabus.title)
            setCountry(syllabus.country)
        } else {
            setTitle('')
            setCountry('')
        }
    }, [syllabus])

    const titleChanged = (e) => {
        setTitle(e.target.value);
    }

    const addSyllabus = async () => {
        let link = '/library/syllabus';
        if (syllabus)
            link = `/library/syllabus/${syllabus._id}`

        let result;
        try {
            result = await axios.post(link, {
                title,
                country
            });
            if (result.status) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You ${syllabus ? 'updated' : 'created'} syllabus successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdate) onUpdate();
                    dispatch(hideAddSyllabus());
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
        <Modal toggle={() => dispatch(hideAddSyllabus())}
               isOpen={store.isVisibleAddSyllabus}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(hideAddSyllabus())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(hideAddSyllabus())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title">{syllabus ? 'EDIT' : 'ADD'} SYLLABUS</h1>
                <FormGroup>
                    <Input placeholder='Syllabus Title' value={title} onChange={titleChanged}/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)}/>
                </FormGroup>
                <br/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={addSyllabus}>Publish</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};