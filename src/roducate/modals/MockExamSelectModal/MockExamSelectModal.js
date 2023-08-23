import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showMockExamSelectModal} from '@store/actions/modal'
import './MockExamSelectModal.css'
import {Search} from "react-feather";
import {useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {MockSingleSelect} from "../../components/MockSingleSelect/MockSingleSelect";

export const MockExamSelectModal = ({data, title, onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [filter, setFilter] = useState('')
    const [selectedItemList, setSelectedItemList] = useState([])

    const MySwal = withReactContent(Swal)

    const onChangeFilter = (e) => {
        setFilter(e.target.value)
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
        dispatch(showMockExamSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(showMockExamSelectModal())}
               isOpen={store.showMockExamSelectModal}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(showMockExamSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>

                <InputGroup className='input-group-merge mb-2'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='search...' focus onChange={onChangeFilter} value={filter}/>
                </InputGroup>

                {data && <MockSingleSelect data={data} filter={filter}
                                           onSelected={(item) => onItemSelected(item)}/>}

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};