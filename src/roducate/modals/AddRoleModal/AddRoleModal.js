import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddRoleModal} from '@store/actions/modal'
import './AddRoleModal.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import React, {useState} from "react";

export const AddRoleModal = ({onUpdate}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [role, setRole] = useState('');

    const MySwal = withReactContent(Swal)

    const titleChanged = (e) => {
        setRole(e.target.value);
    }

    const addRole = async () => {
        let link = '/admins/createRole';

        let result;
        try {
            result = await axios.post(link, {
                title: role
            });
            if (result.status) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You created role successfully!`,
                    icon: 'success',
                    position: 'center',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    if (onUpdate) onUpdate();
                    dispatch(showAddRoleModal());
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
        <Modal toggle={() => dispatch(showAddRoleModal())}
               isOpen={store.showAddRoleModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showAddRoleModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAddRoleModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title">ADD ROLE</h1>
                <FormGroup>
                    <Input placeholder='Admin Role' value={role} onChange={titleChanged}/>
                </FormGroup>
                <br/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={addRole}>Publish</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};