import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showCreatorSelectModal} from '@store/actions/modal'
import './CreatorSelectModal.css'
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";
import {Search} from "react-feather";
import {CreatorMultiSelect} from "../../components/CreatorMultiSelect/CreatorMultiSelect";

export const CreatorSelectModal = ({onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [creators, setCreators] = useState([])
    const [filter, setFilter] = useState('')

    const [selectedItemList, setSelectedItemList] = useState([])

    const MySwal = withReactContent(Swal)
    const [id, setId] = useState('');

    useEffect(() => {
        fetchCreators()
    }, [])

    const fetchCreators = async () => {
        const res = await axios.post('/overview/getAdmins')
        if (res && res.data.success) {
            setCreators(res.data.normalUsers)
        }
    }

    const onItemSelected = (item) => {
        setSelectedItemList(item)
    }

    const onFinalSelect = () => {
        if (selectedItemList.length === 0) {
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
        onSelected(selectedItemList)
        dispatch(showCreatorSelectModal())
    }

    const onChangeFilter = (e) => {
        setFilter(e.target.value)
    }

    return (
        <Modal toggle={() => dispatch(showCreatorSelectModal())}
               isOpen={store.showCreatorSelectModal}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(showCreatorSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2 creator-all-title"> All Creators</h1>

                <InputGroup className='input-group-merge mb-2'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='search...' focus onChange={onChangeFilter} value={filter}/>
                </InputGroup>

                <CreatorMultiSelect filter={filter} data={creators} onSelected={onItemSelected}/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};