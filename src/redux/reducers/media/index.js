// ** Initial State
import {showMediaPlayModal} from "../../actions/media";

const initialState = {
    showMediaPlayModal: false,
    mediaType: 'video',
    mediaList: [],
    title: '',
    description: '',
    isPlaying: false,
    mediaId: ''
}

const mediaReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'showMediaPlayModal':
            return {
                ...state,
                showMediaPlayModal: action.showMediaPlayModal,
                mediaType: action.mediaType,
                mediaList: action.mediaList,
                title: action.title,
                description: action.description,
                mediaId: action.mediaId,
                isPlaying: false
            }
        case 'setIsPlaying':
            return {
                ...state, isPlaying: action.isPlaying
            }

        default:
            return state
    }
}

export default mediaReducer