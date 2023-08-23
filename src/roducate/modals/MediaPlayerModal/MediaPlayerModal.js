import {Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showMediaPlayModal} from '@store/actions/media'
import './MediaPlayerModal.css'
import {VideoPlayer} from "../../components/VideoPlayer/VideoPlayer";
import {PodcastPlayer} from "../../components/PodcastPlayer/PodcastPlayer";

export const MediaPlayerModal = () => {

    const store = useSelector(state => state.media)
    const dispatch = useDispatch()

    return (
        <Modal toggle={() => dispatch(showMediaPlayModal())}
               isOpen={store.showMediaPlayModal}
               style={{width: 'fit-content', margin: 'auto'}}
               className="modal-dialog-centered modal-xl"
        >
            <ModalBody toggle={() => dispatch(showMediaPlayModal())} className="p-0">
                {store.mediaType === 'video' &&
                    <VideoPlayer/>}
                {store.mediaType === 'podcast' &&
                    <PodcastPlayer/>}
            </ModalBody>
        </Modal>
    );
};