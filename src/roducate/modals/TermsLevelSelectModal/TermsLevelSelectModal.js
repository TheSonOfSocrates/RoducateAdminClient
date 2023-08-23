import {Button, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showTermsLevelSelectModal} from '@store/actions/modal'
import './TermsLevelSelectModal.css'
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {SingleSelect} from "../../components/SingleSelect/SingleSelect";
import axios from "../../../utility/axios";

export const TermsLevelSelectModal = ({title, onSelected, educationLevelId}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [selectedTitle, setSelectedTitle] = useState('')

    const MySwal = withReactContent(Swal)

    const [termsLevel, setTermsLevel] = useState([])

    const [id, setId] = useState('');

    useEffect(async () => {
        async function getTermsLevel() {
            const res = (educationLevelId === '' || !educationLevelId) ? undefined : await axios.get(`/library/educationlevel/${educationLevelId}/termslevel`)
            if (res && res.data && res.data.success) {
                console.log(res.data.termsLevelList)
                setTermsLevel(res.data.termsLevelList)
            }
        }

        getTermsLevel()
    }, [educationLevelId])

    const onItemSelected = (title, id) => {
        setSelectedTitle(title)
        setId(id)
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
        onSelected(termsLevel.find((item) => item._id === id))
        dispatch(showTermsLevelSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(showTermsLevelSelectModal())}
               isOpen={store.showTermsLevelSelectModal}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(showTermsLevelSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>

                <SingleSelect selectedId={id} data={termsLevel} onSelected={onItemSelected}
                              displayField='title' idField='_id'/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};