import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddSyllabus, showRoleSelectModal} from '@store/actions/modal'
import './RoleSelectModal.css'
import {PlusCircle, Search} from "react-feather";
import {useEffect, useState} from "react";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {SingleSelect} from "../../components/SingleSelect/SingleSelect";
// import {AddRoleModal} from "../AddRoleModal/AddRoleModal";
import {showAddRoleModal} from "../../../redux/actions/modal";
import {AddRoleModal} from "../AddRoleModal/AddRoleModal";

export const RoleSelectModal = ({title, onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [selectedTitle, setSelectedTitle] = useState('')
    const [id, setId] = useState('')
    const [filter, setFilter] = useState('')

    const MySwal = withReactContent(Swal)

    const [syllabuses, setSyllabuses] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(async () => {
    }, [syllabuses]);

    const onChangeFilter = (e) => {
        setFilter(e.target.value)
    }

    async function fetchData() {
        const response = await axios.get('/admins/getAllRoles')
        if (response.data) {
            setSyllabuses(response.data)
        }
    }

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
        onSelected(selectedTitle, id)
        dispatch(showRoleSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(showRoleSelectModal())}
               isOpen={store.showRoleSelectModal}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(showRoleSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>

                <InputGroup className='input-group-merge mb-2'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='search...' focus onChange={onChangeFilter} value={filter}/>
                </InputGroup>

                <SingleSelect selectedId={id} data={syllabuses} filter={filter} onSelected={onItemSelected}
                              displayField='title' idField='_id'/>

                <div className="mb-1" style={{cursor: 'pointer'}} onClick={e => dispatch(showAddRoleModal(true))}>
                    <PlusCircle className="mr-1" color="#8840E5"/>
                    <span style={{color: '#8840E5'}}>Add Role</span>
                </div>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>

            <AddRoleModal onUpdate={fetchData}/>
        </Modal>
    );
};