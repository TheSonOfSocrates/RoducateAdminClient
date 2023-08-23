import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddDDOptionModal} from '@store/actions/modal'
import './AddDDOptionModal.css'
import {X} from "react-feather";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {useState} from "react";

export const AddDDOptionModal = ({onOptionAdded}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [option, setOption] = useState('');

    const MySwal = withReactContent(Swal)

    const titleChanged = (e) => {
        setOption(e.target.value);
    }

    const addOption = async () => {
        if (!option) {
            return await MySwal.fire({
                title: 'Error!',
                text: 'Please input option name correctly!',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        onOptionAdded(option)
        dispatch(showAddDDOptionModal())
    }

    return (
        <Modal toggle={() => dispatch(showAddDDOptionModal())}
               isOpen={store.showAddDDOptionModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showAddDDOptionModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAddDDOptionModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title mb-1">ADD OPTION</h1>
                <FormGroup>
                    <Input placeholder='Option Name' onChange={titleChanged}/>
                </FormGroup>
                <br/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={addOption}>Add</Button>
                </div>

            </ModalBody>
        </Modal>
    );
};