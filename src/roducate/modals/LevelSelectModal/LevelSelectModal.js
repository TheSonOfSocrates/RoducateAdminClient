import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideLevelSelectModal, showAddLevel} from '@store/actions/modal'
import './LevelSelectModal.css'
import {PlusCircle, Search} from "react-feather";
import {useEffect, useState} from "react";
import {GroupSingleSelect} from "../../components/GroupSingleSelect/GroupSingleSelect";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {AddLevelModal} from "../AddLevelModal/AddLevelModal";

export const LevelSelectModal = ({title, onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [selectedTitle, setSelectedTitle] = useState('')
    const [id, setId] = useState('')
    const [filter, setFilter] = useState('')

    const [levels, setLevels] = useState([])

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        fetchData();
    }, [store.isVisibleAddLevel]);

    useEffect(async () => {
    }, [levels]);

    const onChangeFilter = (e) => {
        setFilter(e.target.value)
    }

    async function fetchData() {
        const response = await axios.get('/library/educationlevel')
        if (response.data.success) {
            const educationLevels = response.data.educationLevels;

            const result = [];

            educationLevels.forEach(level => {
                const title = level.title;
                const titleExists = result.some(item => item.title === title);

                if (titleExists) {
                    // Level already exists, just add to levels array
                    result.find(item => item.title === title).levels.push([level.level, level._id]);
                } else {
                    // New title, add a new level object
                    result.push({
                        title,
                        levels: [[level.level, level._id]]
                    });
                }
            });
            setLevels(result)
        }
    }

    const showAddLevelModal = () => {
        dispatch(showAddLevel());
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
        dispatch(hideLevelSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(hideLevelSelectModal())}
               isOpen={store.isVisibleLevelSelectModal}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(hideLevelSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>
                <InputGroup className='input-group-merge mb-2'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='search...' focus onChange={onChangeFilter} value={filter}/>
                </InputGroup>

                <GroupSingleSelect selectedId={id} data={levels} filter={filter} onSelected={onItemSelected}/>

                <div className="mb-1" style={{cursor: 'pointer'}} onClick={showAddLevelModal}>
                    <PlusCircle className="mr-1" color="#8840E5"/>
                    <span style={{color: '#8840E5'}}>Add Level</span>
                </div>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
            <AddLevelModal/>
        </Modal>
    );
};