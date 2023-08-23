import {Button, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showModuleSelectModal} from '@store/actions/modal'
import './ModuleSelectModal.css'
import {useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {MultiSelect} from "../../components/MultiSelect/MultiSelect";
import {PlanMultiSelect} from "../../components/PlanMultiSelect/PlanMultiSelect";

export const ModuleSelectModal = ({title, onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [selectedModules, setSelectedModules] = useState([])

    const [modules, setModules] = useState([
        {id: 'exam_success', label: 'Exam_success'},
        {id: 'videos', label: 'Videos'},
        {id: 'mock_exams', label: 'Mock_exams'},
        {id: 'podcasts', label: 'Podcasts'},
        {id: 'teachat', label: 'Teachat'},
        {id: 'life_skills', label: 'Life_skills'},
        {id: 'games', label: 'Games'},
        {id: 'seek_counsel', label: 'Seek_counsel'},
        {id: 'digiprenuer', label: 'Digiprenuer'}
    ])

    const MySwal = withReactContent(Swal)

    const onItemSelected = (modules) => {
        setSelectedModules(modules)
    }

    const onFinalSelect = () => {
        if (selectedModules.length === 0) {
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

        onSelected(selectedModules)
        dispatch(showModuleSelectModal(false))
    }

    return (
        <Modal toggle={() => dispatch(showModuleSelectModal())}
               isOpen={store.isVisibleModuleSelectModal}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(showModuleSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>

                <PlanMultiSelect idField="id" displayField="label" data={modules} onSelected={onItemSelected}/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};