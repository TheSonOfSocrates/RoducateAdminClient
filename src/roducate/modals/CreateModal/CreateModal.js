import {Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideCreateModal} from '@store/actions/modal'
import {CreateDialog} from "../../screens/CreateDialog";

export const CreateModal = () => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    return (
        <Modal toggle={() => dispatch(hideCreateModal())}
               isOpen={store.isVisibleCreate}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(hideCreateModal())}>
                <CreateDialog/>
            </ModalBody>
        </Modal>
    );
};