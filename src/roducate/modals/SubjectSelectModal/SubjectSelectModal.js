import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideSubjectSelectModal} from '@store/actions/modal'
import './SubjectSelectModal.css'
import {Search} from "react-feather";
import {useEffect, useState} from "react";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {SingleSelect} from "../../components/SingleSelect/SingleSelect";

export const SubjectSelectModal = ({title, onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [selectedTitle, setSelectedTitle] = useState('')
    const [id, setId] = useState('')
    const [filter, setFilter] = useState('')

    const MySwal = withReactContent(Swal)

    const [subject, setSubject] = useState([])

    useEffect(async () => {
        fetchData()
    }, [filter]);

    const onChangeFilter = (e) => {
        setFilter(e.target.value)
    }

    async function fetchData() {
        const response = await axios.post('/library/getSubjectsByTitle', {
            "title": filter,
        })
        if (response.data.success) {
            setSubject(response.data.subjects)
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
        onSelected(subject.find((item) => item._id === id))
        dispatch(hideSubjectSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(hideSubjectSelectModal())}
               isOpen={store.isVisibleSubjectSelect}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(hideSubjectSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>

                <InputGroup className='input-group-merge mb-2'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='search...' focus onChange={onChangeFilter} value={filter}/>
                </InputGroup>

                <SingleSelect selectedId={id} data={subject} onSelected={onItemSelected}
                              displayField='title' idField='_id' subShowingField1="educationLevel"
                              subShowingField2="syllabus"/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};