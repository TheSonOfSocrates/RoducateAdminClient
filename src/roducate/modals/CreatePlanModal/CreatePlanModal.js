import {Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideCreatePlanModal} from '@store/actions/modal'
import {CreatePlan} from "../../screens/CreatePlan";

export const CreatePlanModal = () => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    return (
        <Modal toggle={() => dispatch(hideCreatePlanModal())}
               isOpen={store.isVisibleCreatePlan}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(hideCreatePlanModal())}>
                <CreatePlan/>
            </ModalBody>
        </Modal>
    );
};