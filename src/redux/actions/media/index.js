export const showMediaPlayModal = (showMediaPlayModal = false,
                                   mediaType = undefined,
                                   mediaList = [],
                                   title = '',
                                   description = '',
                                   mediaId = '') => dispatch => dispatch({
    type: 'showMediaPlayModal',
    showMediaPlayModal, mediaType, mediaList, title, description, mediaId
})

export const setIsPlaying = (isPlaying = false) => dispatch => dispatch({
    type: 'setIsPlaying',
    isPlaying
})