// ** Styles
import './AddCreators.css'
import Avatar from "../../../@core/components/avatar";
import {PlusCircle} from "react-feather";
import {CreatorSelectModal} from "../../modals/CreatorSelectModal/CreatorSelectModal";
import {showCreatorSelectModal} from '@store/actions/modal'
import {useDispatch} from "react-redux";
import {useState} from "react";

const AddCreators = ({onCreatorChange}) => {

    const dispatch = useDispatch()

    const [creatorList, setCreatorList] = useState([])

    const onSelect = (itemList) => {
        setCreatorList(itemList)
        onCreatorChange(itemList)
    }

    return (
        <div style={{backgroundColor: "white", borderRadius: '35px'}}>
            <div className="d-flex justify-content-center align-items-center p-1 AddCreator-creators">
                <span className="mr-1 AddCreator-title">Creators</span>
                {creatorList.map((item, idx) => <div className="AddCreator-creator"
                                                     style={{marginLeft: idx === 0 ? 0 : '-25px'}}>
                    <Avatar className="AddCreator-avatar" imgHeight="50px" imgWidth="50px"
                            img={`${process.env.REACT_APP_3BUCKET_URL}${item.avatar}`}
                            status={item.isOnline ? 'online' : 'offline'}/>
                    <span className="AddCreator-name"
                          style={{color: 'black', display: 'none'}}>{item.firstName}</span>
                </div>)}

                <span className="d-flex justify-content-center align-items-center" style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#DCC2FF',
                    color: '#4C20A8',
                    cursor: 'pointer',
                    marginLeft: '8px'
                }} onClick={() => dispatch(showCreatorSelectModal(true))}><PlusCircle/></span>
            </div>

            <CreatorSelectModal onSelected={onSelect}/>
        </div>
    )
}

export default AddCreators