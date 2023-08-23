import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideMediaLibModal} from '@store/actions/modal'
import './MediaGalleryModal.css'
import {Check, Search, ShoppingBag, X} from "react-feather";
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import RIconBtn from "../../components/RIconBtn/RIconBtn";
import axios from "../../../utility/axios";

export const MediaGalleryModal = ({type, onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [filter, setFilter] = useState('')
    const [selectedTag, setSelectedTag] = useState('all')
    const [tags, setTags] = useState([])
    const [mediaList, setMediaList] = useState([])
    const [selectedMediaList, setSelectedMediaList] = useState([])

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        setMediaList([])
        setSelectedMediaList([])
        getTags()
        getMediaList()
    }, [type])

    const getTags = async () => {
        const response = await axios.get(`/resource/${type === 'video' ? 'videoStore' : 'podcastStore'}/getAllTags`)
        if (response && response.data.success) {
            setTags(response.data.tags);
        }
    }

    const getMediaList = async () => {
        const response = await axios.post(`/resource/${type === 'video' ? 'videoStore' : 'podcastStore'}/getAll`, {
            pageNumber: 1,
            pageSize: 10000,
            category: selectedTag === 'all' ? '' : selectedTag
        })
        if (response && response.data.success) {
            setMediaList(response.data[`${type === 'video' ? 'videoStoreList' : 'podcastStoreList'}`].data);
        }
    }

    const onFinalSelect = () => {
        if (setSelectedMediaList.length === 0) {
            MySwal.fire({
                title: 'Error',
                text: 'Please select one item at least',
                icon: 'error',
                timer: 2000,
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            return
        }
        onSelected(selectedMediaList)
        dispatch(hideMediaLibModal())
    }

    const onChangeFilter = () => {

    }

    const deleteMedia = async (id) => {
        const result = await axios.delete('/library/podcastStore/' + id);

        if (result.data.success) {
            await MySwal.fire({
                title: 'Good job!',
                text: `You deleted ${type} successfully!`,
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            })
            getMediaList()
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

    return (
        <Modal toggle={() => dispatch(hideMediaLibModal())}
               isOpen={store.isVisibleMediaLib}
               style={{width: '80%', margin: 'auto'}}
               className="modal-dialog-centered modal-xl"
        >
            <ModalBody toggle={() => dispatch(hideMediaLibModal())} className="p-4">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <span
                            className="media-videos-gallery">{`${type === 'video' ? 'Videos' : 'Podcasts'} Gallery`}</span>
                    </div>
                    <RIconBtn text="Library Store" icon={<ShoppingBag/>} style={{color: '#1e63ee'}}/>
                    <div className="d-flex justify-content-center">
                        <InputGroup className='input-group-merge' style={{margin: 'auto'}}>
                            <InputGroupAddon addonType='prepend'>
                                <InputGroupText>
                                    <Search size={14}/>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder='search...'/>
                        </InputGroup>
                    </div>
                    <Button.Ripple style={{width: '44px'}} onClick={() => dispatch(hideMediaLibModal())}
                                   className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>

                <div className="d-flex mb-2 mt-3">
                    <div className="mr-2 d-flex">
                        <span className="media-gallery-categories" style={{margin: 'auto'}}>Tags</span>
                    </div>
                    <div className="d-flex overflow-auto">
                        <span onClick={() => setSelectedTag('all')}
                              className={`media-gallery-category ${selectedTag === 'all' ? 'selected' : ''}`}>All</span>
                        {
                            tags.map((item) => <span onClick={() => setSelectedTag(item)}
                                                     className={`media-gallery-category ${selectedTag === item ? 'selected' : ''}`}>{item}</span>)
                        }
                    </div>
                </div>

                <div className="row overflow-auto" style={{maxHeight: '400px'}}>
                    {mediaList && mediaList?.map((item, index) => {
                        return (selectedTag === 'all' || item.tags.includes(selectedTag)) &&
                            <div className="col-2 mb-1">
                                <div className="d-flex"
                                     onClick={() => {
                                         selectedMediaList.some((sitem) => sitem._id === item._id) ? setSelectedMediaList(selectedMediaList.filter((sitem) => sitem._id !== item._id)) : setSelectedMediaList([...selectedMediaList, item])
                                     }}
                                     style={{
                                         cursor: 'pointer',
                                         width: '100%',
                                         aspectRatio: '2/1',
                                         borderRadius: '10px'
                                     }}>
                                    <div className="d-flex justify-content-center"
                                         style={{
                                             backgroundColor: '#8840e5',
                                             width: '45%',
                                             borderRadius: '10px 0 0 10px'
                                         }}>
                                        {!selectedMediaList.some((sitem) => sitem._id === item._id) && type === 'podcast' &&
                                            <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M40 10C40.8164 10.0001 41.6045 10.2999 42.2146 10.8424C42.8247 11.3849 43.2145 12.1325 43.31 12.9433L43.3333 13.3333V66.6667C43.3324 67.5163 43.0071 68.3334 42.4238 68.9512C41.8406 69.569 41.0435 69.9408 40.1953 69.9906C39.3472 70.0404 38.5121 69.7644 37.8606 69.2191C37.209 68.6738 36.7903 67.9003 36.69 67.0567L36.6667 66.6667V13.3333C36.6667 12.4493 37.0179 11.6014 37.643 10.9763C38.2681 10.3512 39.1159 10 40 10V10ZM26.6667 20C27.5507 20 28.3986 20.3512 29.0237 20.9763C29.6488 21.6014 30 22.4493 30 23.3333V56.6667C30 57.5507 29.6488 58.3986 29.0237 59.0237C28.3986 59.6488 27.5507 60 26.6667 60C25.7826 60 24.9348 59.6488 24.3096 59.0237C23.6845 58.3986 23.3333 57.5507 23.3333 56.6667V23.3333C23.3333 22.4493 23.6845 21.6014 24.3096 20.9763C24.9348 20.3512 25.7826 20 26.6667 20V20ZM53.3333 20C54.2174 20 55.0652 20.3512 55.6904 20.9763C56.3155 21.6014 56.6667 22.4493 56.6667 23.3333V56.6667C56.6667 57.5507 56.3155 58.3986 55.6904 59.0237C55.0652 59.6488 54.2174 60 53.3333 60C52.4493 60 51.6014 59.6488 50.9763 59.0237C50.3512 58.3986 50 57.5507 50 56.6667V23.3333C50 22.4493 50.3512 21.6014 50.9763 20.9763C51.6014 20.3512 52.4493 20 53.3333 20V20ZM13.3333 30C14.2174 30 15.0652 30.3512 15.6904 30.9763C16.3155 31.6014 16.6667 32.4493 16.6667 33.3333V46.6667C16.6667 47.5507 16.3155 48.3986 15.6904 49.0237C15.0652 49.6488 14.2174 50 13.3333 50C12.4493 50 11.6014 49.6488 10.9763 49.0237C10.3512 48.3986 10 47.5507 10 46.6667V33.3333C10 32.4493 10.3512 31.6014 10.9763 30.9763C11.6014 30.3512 12.4493 30 13.3333 30V30ZM66.6667 30C67.4831 30.0001 68.2711 30.2999 68.8812 30.8424C69.4914 31.3849 69.8811 32.1325 69.9767 32.9433L70 33.3333V46.6667C69.9991 47.5163 69.6737 48.3334 69.0905 48.9512C68.5073 49.569 67.7102 49.9408 66.862 49.9906C66.0139 50.0404 65.1787 49.7644 64.5272 49.2191C63.8757 48.6738 63.457 47.9003 63.3567 47.0567L63.3333 46.6667V33.3333C63.3333 32.4493 63.6845 31.6014 64.3096 30.9763C64.9348 30.3512 65.7826 30 66.6667 30Z"
                                                    fill="white"/>
                                            </svg>}
                                        {!selectedMediaList.some((sitem) => sitem._id === item._id) && type === 'video' &&
                                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M39.9994 6.66602C58.4094 6.66602 73.3327 21.5894 73.3327 39.9994C73.3327 58.4094 58.4094 73.3327 39.9994 73.3327C21.5894 73.3327 6.66602 58.4094 6.66602 39.9994C6.66602 21.5894 21.5894 6.66602 39.9994 6.66602ZM39.9994 13.3327C32.9269 13.3327 26.1441 16.1422 21.1432 21.1432C16.1422 26.1441 13.3327 32.9269 13.3327 39.9994C13.3327 47.0718 16.1422 53.8546 21.1432 58.8555C26.1441 63.8565 32.9269 66.666 39.9994 66.666C47.0718 66.666 53.8546 63.8565 58.8555 58.8555C63.8565 53.8546 66.666 47.0718 66.666 39.9994C66.666 32.9269 63.8565 26.1441 58.8555 21.1432C53.8546 16.1422 47.0718 13.3327 39.9994 13.3327ZM29.8793 28.8327C29.953 28.2195 30.1687 27.6318 30.5091 27.1165C30.8496 26.6012 31.3055 26.1723 31.8407 25.864C32.3758 25.5556 32.9755 25.3763 33.5921 25.3402C34.2087 25.3041 34.8252 25.4122 35.3927 25.656L36.476 26.1327L37.9427 26.806L39.106 27.3694L40.406 28.0227L41.8394 28.766L43.3793 29.6027L45.026 30.536L45.856 31.0194L47.4193 31.9594L48.846 32.8527L50.726 34.0793L52.2727 35.1393L53.7893 36.2327L54.066 36.436C56.1827 38.026 56.1994 41.1994 54.0694 42.7994L53.126 43.496L51.816 44.416L50.1627 45.5327L48.8727 46.366L47.4394 47.266L45.8627 48.2094C45.5894 48.3727 45.3093 48.536 45.0227 48.6993L43.3627 49.6394L41.8094 50.4827L40.376 51.2294L39.076 51.8827L37.3927 52.6894L36.0593 53.2927L35.386 53.586C34.8188 53.8279 34.203 53.9344 33.5875 53.8972C32.972 53.8599 32.3736 53.6799 31.8396 53.3714C31.3057 53.0629 30.8509 52.6343 30.5112 52.1196C30.1716 51.6049 29.9564 51.0183 29.8827 50.406L29.7027 48.7427L29.6027 47.6293L29.4627 45.6327L29.3827 44.0993L29.3227 42.4127L29.2893 40.5827V38.6527L29.3227 36.826L29.3827 35.1393L29.4627 33.606L29.6027 31.6094L29.8393 29.176L29.8793 28.8327ZM36.1593 33.3493L36.0694 34.906L35.9994 36.656L35.9594 38.5893V40.6493L35.9994 42.5827L36.066 44.3327L36.1593 45.8894L37.546 45.1894L38.2993 44.796L39.926 43.9227L41.6927 42.926L43.4327 41.896L44.2394 41.4027L45.7193 40.4693L47.0194 39.6194L45.7127 38.7627L44.2327 37.826L42.5793 36.826C41.7061 36.3091 40.8249 35.8057 39.936 35.316L38.3094 34.4427L36.836 33.686L36.1593 33.3493Z"
                                                      fill="white"/>
                                            </svg>
                                        }
                                        {selectedMediaList.some((sitem) => sitem._id === item._id) && <Check
                                            style={{margin: 'auto', color: 'white', width: '60%', height: '60%'}}/>}
                                    </div>
                                    <div style={{
                                        background: `url('${process.env.REACT_APP_3BUCKET_URL + item.coverImage}')`,
                                        width: '55%',
                                        backgroundSize: 'cover',
                                        borderRadius: '0 10px 10px 0'
                                    }}>

                                    </div>
                                </div>
                                <div className="d-flex justify-content-between" style={{margin: '5px 3px'}}>
                                    <div>
                                        <span className="media-gallery-title">{item.mediaURL.split('.')[0]}</span>
                                        <span className="media-gallery-ext">.{item.mediaURL.split('.')[1]}</span>
                                    </div>
                                    <div onClick={() => deleteMedia(item._id)} className="media-gallery-btn-delete"
                                         style={{cursor: 'pointer'}}>Delete
                                    </div>
                                </div>
                            </div>
                    })}

                </div>

                <div className="d-flex justify-content-center mt-1">
                    <Button color='gradient-primary' onClick={onFinalSelect}>Select</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};