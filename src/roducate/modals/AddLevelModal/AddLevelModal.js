import {Button, CustomInput, FormGroup, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideAddLevel} from '@store/actions/modal'
import './AddLevelModal.css'
import {X} from "react-feather";
import axios from "../../../utility/axios";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {useEffect, useState} from "react";

export const AddLevelModal = ({currentLevel, onUpdate}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('');
    const [isChangedCourse, setIsChangedCourse] = useState(false);

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (currentLevel) {
            setTitle(currentLevel.title)
            setLevel(currentLevel.level)
            setIsChangedCourse(currentLevel?.isChangedCourse)
        } else {
            setTitle('')
            setLevel('')
            setIsChangedCourse(false)
        }
    }, [currentLevel])

    const titleChanged = (e) => {
        setTitle(e.target.value);
    }

    const levelChanged = (e) => {
        setLevel(e.target.value);
    }

    const addLevel = async () => {
        let link = '/library/educationlevel';
        if (currentLevel)
            link = `/library/educationLevel/${currentLevel._id}`

        const result = await axios.post(link, {
            title,
            level,
            isChangedCourse
        });

        if (result.status) {
            MySwal.fire({
                title: 'Good Job!',
                text: `Level ${currentLevel ? 'updated' : 'created'} successfully.`,
                icon: 'success',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-info'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (onUpdate) onUpdate()
                dispatch(hideAddLevel());
            })

        } else {
            await MySwal.fire({
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
    }

    const onIsCourseChange = () => {
        setIsChangedCourse(!isChangedCourse)
    }

    return (
        <Modal toggle={() => dispatch(hideAddLevel())}
               isOpen={store.isVisibleAddLevel}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(hideAddLevel())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(hideAddLevel())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title mb-1">ADD LEVEL</h1>
                <FormGroup>
                    <Input placeholder='Educational Level Title' value={title} onChange={titleChanged}/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder='Class' onChange={levelChanged} value={level}/>
                </FormGroup>
                <br/>
                <div className="d-flex justify-content-between">
                    <div>
                        <p className="ModalAddLevel-title">This change “Subject” to “Course” on User Interface</p>
                        <p className="ModalAddLevel-sub-title">Toggle OFF or ON to change subject to course for all
                            users University or Advance</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <CustomInput
                            type='switch'
                            id="add-level-switch"
                            name='customSwitch'
                            inline
                            checked={isChangedCourse}
                            onChange={onIsCourseChange}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={addLevel}>Publish</Button>
                </div>

            </ModalBody>
        </Modal>
    );
};