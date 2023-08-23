import {Button, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideUserTypeSelectModal} from '@store/actions/modal'
import './UserTypeSelectModal.css'
import {useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {SingleSelect} from "../../components/SingleSelect/SingleSelect";

export const SubscriptionTypeSelectModal = ({title, onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [selectedTitle, setSelectedTitle] = useState('')

    const MySwal = withReactContent(Swal)

    const [userTypes, setUserTypes] = useState([{title: 'Student', id: 'Student'},
        {title: 'Parent', id: 'Parent'}, {title: 'Teacher', id: 'Teacher'}, {title: 'Counsellor', id: 'Counsellor'}])

    const [id, setId] = useState('');

    const onItemSelected = (title) => {
        setSelectedTitle(title)
    }

    const onFinalSelect = () => {
        if (selectedTitle === '') {
            MySwal.fire({
                title: 'Error',
                text: 'Please select one',
                icon: 'error',
                timer: 2000,
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            return
        }
        onSelected(selectedTitle)
        dispatch(hideUserTypeSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(hideUserTypeSelectModal())}
               isOpen={store.isVisibleUserTypeSelect}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(hideUserTypeSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>

                <SingleSelect selectedId={id} data={userTypes} onSelected={onItemSelected}
                              displayField='title' idField='id'/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};