import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showChannelSelectModal} from '@store/actions/modal'
import './ChannelSelectModal.css'
import {Search} from "react-feather";
import {useEffect, useState} from "react";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {SingleSelect} from "../../components/SingleSelect/SingleSelect";

export const ChannelSelectModal = ({title, onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [filter, setFilter] = useState('')

    const MySwal = withReactContent(Swal)

    const [channels, setChannels] = useState([])
    const [selectedChannel, setSelectedChannel] = useState(undefined)

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(async () => {
    }, [channels]);

    const onChangeFilter = (e) => {
        setFilter(e.target.value)
    }

    async function fetchData() {
        const response = await axios.post('/resource/ls/channel/getAllChannels', {
            "pageSize": 10000000000,
            "pageNumber": 1
        })
        if (response.data.success) {
            const channels = response.data.allChannels.data;
            setChannels(channels)
        }
    }

    // const activateAddChannelModal = () => {
    //     dispatch(showAddChannelModal());
    // }

    const onItemSelected = (title, _id) => {
        setSelectedChannel({title, _id})
    }

    const onFinalSelect = () => {
        if (!selectedChannel) {
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
        onSelected(selectedChannel)
        dispatch(showChannelSelectModal())
    }

    return (
        <Modal toggle={() => dispatch(showChannelSelectModal())}
               isOpen={store.showChannelSelectModal}
               className="modal-dialog-centered modal-sm"
        >
            <ModalBody toggle={() => dispatch(showChannelSelectModal())}>
                <h1 className="SelectListModal-title mt-2 mb-2">{title}</h1>

                <InputGroup className='input-group-merge mb-2'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='search...' focus onChange={onChangeFilter} value={filter}/>
                </InputGroup>

                <SingleSelect selectedId={selectedChannel?.id} data={channels} filter={filter}
                              onSelected={onItemSelected}
                              displayField='title' idField='_id'/>

                {/*<div className="mb-1" style={{cursor: 'pointer'}} onClick={activateAddChannelModal}>*/}
                {/*    <PlusCircle className="mr-1" color="#8840E5"/>*/}
                {/*    <span style={{color: '#8840E5'}}>Add Channel</span>*/}
                {/*</div>*/}

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>

            {/*<AddSyllabus onUpdate={fetchData}/>*/}
        </Modal>
    );
};