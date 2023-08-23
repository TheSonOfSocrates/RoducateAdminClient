import {Button, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddPeriodModal, showLevelSelectModal} from '@store/actions/modal'
import {X} from "react-feather";
import './AddPeriodModal.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import {LevelSelectModal} from "../LevelSelectModal/LevelSelectModal";
import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";

export const AddPeriodModal = ({period = undefined, onUpdate = undefined}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [level, setLevel] = useState('')
    const [levelId, setLevelId] = useState('')

    const [title, setTitle] = useState('')

    useEffect(() => {
        if (period) {
            setTitle(period.title)
            setLevel(period.educationLevelTitle)
            setLevelId(period.educationLevelId)
        } else {
            setTitle('')
            setLevel('')
            setLevelId('')
        }
    }, [period])

    const showLevelListModal = () => {
        dispatch(showLevelSelectModal())
    }

    const onLevelSelected = (title, id) => {
        setLevel(title)
        setLevelId(id)
    }

    const addPeriod = async () => {
        if (level === '' || title === '') {
            return MySwal.fire({
                title: 'Error!',
                text: 'Something went wrong.',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        let link = '/library/termsLevel';
        if (period)
            link = `/library/termsLevel/${period._id}`

        let result;
        try {
            result = await axios.post(link, {title, educationLevel: levelId});
            if (result.data.success) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: `You ${period ? 'updated' : 'created'} period successfully!`,
                    icon: 'success',
                    timer: 2000,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                }).then(function (result) {
                    dispatch(showAddPeriodModal())
                    if (onUpdate) onUpdate()
                })
            } else {
                MySwal.fire({
                    title: 'Error!',
                    text: 'Something went wrong.',
                    icon: 'error',
                    timer: 2000,
                    position: 'center',
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })
            }
        } catch (e) {
            MySwal.fire({
                title: 'Error!',
                text: e.toString(),
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }
    }

    return (
        <Modal toggle={() => dispatch(showAddPeriodModal())}
               isOpen={store.showAddPeriodModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showAddPeriodModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAddPeriodModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title">{period ? 'EDIT' : 'ADD'} PERIOD</h1>
                <FormGroup>
                    <Input placeholder='Period Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </FormGroup>
                <br/>
                <SelectOutlinedWrapper onClick={showLevelListModal} text="Assign to"
                                       text1={level}/>
                <br/>

                <div className="d-flex justify-content-center">
                    <Button color='gradient-primary' onClick={addPeriod}>Publish</Button>
                </div>
                <br/>

                <LevelSelectModal title="Educational Level & Class" onSelected={onLevelSelected}/>
            </ModalBody>
        </Modal>
    );
};