import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showItemSelectModal} from '@store/actions/modal'
import './ItemSelectModal.css'
import {Search} from "react-feather";
import {useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {PlanMultiSelect} from "../../components/PlanMultiSelect/PlanMultiSelect";
import {SingleSelect} from "../../components/SingleSelect/SingleSelect";
import {MultiSelect} from "../../components/MultiSelect/MultiSelect";

export const ItemSelectModal = ({data, title, onSelected, isMulti}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [filter, setFilter] = useState('')
    const [selectedItemList, setSelectedItemList] = useState([])

    const MySwal = withReactContent(Swal)

    const onChangeFilter = (e) => {
        setFilter(e.target.value)
    }

    const onItemSelected = (tmpList) => {
        setSelectedItemList(tmpList)
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
        dispatch(showItemSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(showItemSelectModal())}
               isOpen={store.showItemSelectModal}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(showItemSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>

                <InputGroup className='input-group-merge mb-2'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='search...' focus onChange={onChangeFilter} value={filter}/>
                </InputGroup>

                {isMulti && data && <MultiSelect idField="_id" displayField="title" filter={filter} data={data} selectedItemList={selectedItemList}
                                             onSelected={onItemSelected}/>}

                {!isMulti && data && <SingleSelect data={data} filter={filter}
                                           onSelected={(title, id) => onItemSelected([data.find(item => item._id === id)])}
                                           displayField='title' idField='_id'/>}

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};