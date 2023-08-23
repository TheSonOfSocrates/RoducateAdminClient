import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddCategoryModal} from '@store/actions/modal'
import {X} from "react-feather";
import './AddCategoryModal.css'
import FileUploader from "../../components/FileUploader/FileUploader";
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";

export const AddCategoryModal = ({subject: category, onUpdate}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')

    const [icon, setIcon] = useState(undefined)

    useEffect(() => {
        if (category) {
            setTitle(title)
            setIcon(category.coverImage)
        } else {

        }
    }, [category])

    const createCategory = async () => {
        if (title === '' || !icon || des === '') {
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

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', des)
        formData.append('icon', icon)

        const result = await axios.post('/marketplace/productCategory', formData);

        if (result.data.success) {
            await MySwal.fire({
                title: 'Good job!',
                text: 'You added category successfully!',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    dispatch(showAddCategoryModal())
                }
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
    }

    const onTitleChanged = (e) => {
        setTitle(e.target.value);
    }

    const onIconChange = (icon) => {
        setIcon(icon)
    }

    return (
        <Modal toggle={() => dispatch(showAddCategoryModal())}
               isOpen={store.showAddCategoryModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showAddCategoryModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAddCategoryModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-subject-title">ADD CATEGORY</h1>
                <Input placeholder='Category title' value={title} onChange={onTitleChanged}/>

                <br/>

                <Input type="textarea" placeholder='Category description' value={des}
                       onChange={e => setDes(e.target.value)}/>

                <br/>

                <FileUploader onFileChange={onIconChange}/>
                <br/>

                <div className="d-flex justify-content-center">
                    <Button color='gradient-primary' onClick={createCategory}>Create category</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};