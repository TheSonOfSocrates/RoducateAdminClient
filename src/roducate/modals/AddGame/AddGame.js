import {Button, Input, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showAddGameModal, showUserTypeSelectModal} from '@store/actions/modal'
import {X} from "react-feather";
import './AddGame.css'
import {SelectOutlinedWrapper} from "../../components/SelectOutlined/SelectOutlinedWrapper";
import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import axios from "../../../utility/axios";
import {UserTypeSelectModal} from "../UserTypeSelectModal/UserTypeSelectModal";
import Select from "react-select";
import {selectThemeColors} from '@utils'
import {LevelSelectModal} from "../LevelSelectModal/LevelSelectModal";
import {showLevelSelectModal} from "../../../redux/actions/modal";
import CustomUppyFileUploader from "../../components/CustomUppyFileUploader/CustomUppyFileUploader";

export const AddGame = ({game = undefined, onChange = undefined}) => {

    const MySwal = withReactContent(Swal)

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const [link, setLink] = useState('')

    const [parentNotice, setParentNotice] = useState('')

    const [imageList, setImageList] = useState([]);

    const [existingIcon, setExistingIcon] = useState(undefined)

    const [userType, setUserType] = useState('');

    const [ageLimit, setAgeLimit] = useState(0)

    const [selectedLevel, setSelectedLevel] = useState(undefined)

    const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState(undefined)

    useEffect(() => {
        if (game) {
            setTitle(game?.title)
            setParentNotice(game?.parentNotice)
            setUserType(game.userType)
            setExistingIcon(game.thumbnail)
            setAgeLimit(game.ageLimit)
        } else {

        }
    }, [store.showAddGameModal])

    const onChangeDescription = (e) => {
        setParentNotice(e.target.value)
    }

    const addGame = async () => {
        if (title === '' || userType === '' || ageLimit === '' || imageList.length === 0) {
            return MySwal.fire({
                title: 'Error!',
                text: 'Please input correctly.',
                icon: 'error',
                timer: 2000,
                position: 'center',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
        }

        const gameData = {
            title,
            description: parentNotice,
            userType,
            educationLevel: selectedLevel._id,
            ageLimit: ageLimit.value,
            difficulty: selectedDifficultyLevel.value,
            link,
            thumbnail: imageList[0].title.split('/')[imageList[0].title.split('/').length - 1]
        }

        let result;
        if (game)
            result = await axios.post(`/resource/game/${game._id}`, gameData);
        else
            result = await axios.post(`/resource/game`, gameData);

        if (result.data.success) {
            await MySwal.fire({
                title: 'Good job!',
                text: `You ${game ? 'updated' : 'added'} game successfully!`,
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    dispatch(showAddGameModal())
                    if (onChange) onChange()
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

    const onOptionImgAttached = (images) => {
        setImageList([...imageList, ...images])
    }

    const activateUserTypeModal = () => {
        dispatch(showUserTypeSelectModal())
    }

    const onUserTypeSelected = (title) => {
        setUserType(title)
    }

    const ageLimitOptions = [
        {value: 5, label: '5+'},
        {value: 12, label: '12+'},
        {value: 15, label: '15+'},
        {value: 18, label: '18+'}
    ]

    const difficultyOptions = [
        {value: 'easy', label: 'Easy'},
        {value: 'normal', label: 'Normal'},
        {value: 'hard', label: 'Hard'},
    ]

    return (
        <Modal toggle={() => dispatch(showAddGameModal())}
               isOpen={store.showAddGameModal}
               className="modal-dialog-centered modal-lg"
        >
            <ModalBody toggle={() => dispatch(showAddGameModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showAddGameModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <h1 className="add-game-title">{(game ? 'EDIT' : 'ADD')} Game</h1>

                <Input placeholder='Game Title' style={{marginBottom: 20}}
                       value={title} onChange={onTitleChanged}/>

                <Input type='textarea' name='text' rows='2' value={parentNotice} placeholder='Parental Notice'
                       onChange={onChangeDescription}/>

                <div className="row mt-2">
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" onClick={activateUserTypeModal} text="User type"
                                               text1={userType ? userType?.charAt(0).toUpperCase() + userType?.substring(1) : ''}/>
                    </div>
                    <div className="col-6">
                        <SelectOutlinedWrapper className="col-6" onClick={() => dispatch(showLevelSelectModal())}
                                               text="Education Level & Class"
                                               text1={selectedLevel ? selectedLevel.title : ''}/>
                    </div>
                    <div className="col-6">
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            value={ageLimitOptions.find((item) => item.value === ageLimit)}
                            options={ageLimitOptions}
                            isClearable={false}
                            onChange={(value) => setAgeLimit(value)}
                        />
                    </div>
                    <div className="col-6">
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            value={selectedDifficultyLevel}
                            options={difficultyOptions}
                            isClearable={false}
                            onChange={(value) => setSelectedDifficultyLevel(value)}
                        />
                    </div>
                </div>

                <Input placeholder='Game Link' style={{marginBottom: 20, marginTop: 20}}
                       value={link} onChange={e => setLink(e.target.value)}/>

                <CustomUppyFileUploader currentImgs={imageList} onFileChange={onOptionImgAttached} multi={false}/>

                <div className="d-flex justify-content-center mt-2">
                    <Button color='gradient-primary' onClick={addGame}>Publish</Button>
                </div>
            </ModalBody>

            <UserTypeSelectModal title="User type" onSelected={onUserTypeSelected}/>

            <LevelSelectModal title="Educational Level & Class"
                              onSelected={(title, _id) => setSelectedLevel({title, _id})}/>
        </Modal>
    );
};