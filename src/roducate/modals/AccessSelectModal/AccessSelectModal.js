import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAccessSelectModal} from '@store/actions/modal'
import './AccessSelectModal.css'
import {Search} from "react-feather";
import {useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {SingleSelect} from "../../components/SingleSelect/SingleSelect";
import {MultiSelect} from "../../components/MultiSelect/MultiSelect";

export const AccessSelectModal = ({title, onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [filter, setFilter] = useState('')

    const MySwal = withReactContent(Swal)

    const [syllabuses, setSyllabuses] = useState([
        {
            title: 'Create',
            _id: 'create'
        },
        {
            title: 'Activities',
            _id: 'Activities'
        },
        {
            title: 'Plans',
            _id: 'Plans'
        },
        {
            title: 'Resources',
            _id: 'Resources'
        },
        {
            title: 'Library',
            _id: 'Library'
        },
        {
            title: 'Sales',
            _id: 'Sales'
        }, {
            title: 'Market',
            _id: 'Market'
        }, {
            title: 'Products',
            _id: 'Products'
        },
        {
            title: 'Events',
            _id: 'Events'
        },
        {
            title: 'Rewards',
            _id: 'Rewards'
        },
        {
            title: 'Users',
            _id: 'Users'
        },
        {
            title: 'Admins',
            _id: 'Admins'
        },
        {
            title: 'Schools',
            _id: 'Schools'
        },
        {
            title: 'Sponsors',
            _id: 'Sponsors'
        },
        {
            title: 'APIs & SDKs',
            _id: 'APIs & SDKs'
        },
        {
            title: 'Settings',
            _id: 'Settings'
        }
    ])

    const [selectedItemList, setSelectedItemList] = useState([])

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
        dispatch(showAccessSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(showAccessSelectModal())}
               isOpen={store.showAccessSelectModal}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(showAccessSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>

                <InputGroup className='input-group-merge mb-2'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='search...' focus onChange={onChangeFilter} value={filter}/>
                </InputGroup>

                <MultiSelect idField="_id" displayField="title" filter={filter} data={syllabuses} selectedItemList={selectedItemList}
                                                 onSelected={onItemSelected}/>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};