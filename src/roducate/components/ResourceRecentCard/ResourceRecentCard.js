import './ResourceRecentCard.css'
import Avatar from "../../../@core/components/avatar";
import {Item, Menu, useContextMenu} from "react-contexify";

const ResourceRecentCard = ({
                                _id,
                                title,
                                des,
                                date,
                                creatorName,
                                creatorAvatar,
                                level,
                                onEdit,
                                onDelete,
                                onDuplicate
                            }) => {

    const {show} = useContextMenu({
        id: 'rrc-menu' + _id
    })

    return (
        <div style={{width: '350px', height: '100%', backgroundColor: 'white', padding: '28px', borderRadius: '15px'}}>
            <div className="d-flex justify-content-between">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10 3C10.667 3 11.333 3.253 12 3.76C12.667 3.253 13.333 3 14 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H13C13 20.552 12.55 21 12 21C11.45 21 11 20.55 11 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H10ZM10 5H4V18H11V6C11 5.45 10.55 5 10 5ZM20 5H14C13.45 5 13 5.45 13 6V18H20V5Z"
                          fill="#C0C1C3"/>
                </svg>
                <svg className="cursor-pointer" onClick={show} width="25" height="24" viewBox="0 0 25 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.5 10.5C6.89782 10.5 7.27936 10.658 7.56066 10.9393C7.84196 11.2206 8 11.6022 8 12C8 12.3978 7.84196 12.7794 7.56066 13.0607C7.27936 13.342 6.89782 13.5 6.5 13.5C6.10218 13.5 5.72064 13.342 5.43934 13.0607C5.15804 12.7794 5 12.3978 5 12C5 11.6022 5.15804 11.2206 5.43934 10.9393C5.72064 10.658 6.10218 10.5 6.5 10.5ZM12.5 10.5C12.8978 10.5 13.2794 10.658 13.5607 10.9393C13.842 11.2206 14 11.6022 14 12C14 12.3978 13.842 12.7794 13.5607 13.0607C13.2794 13.342 12.8978 13.5 12.5 13.5C12.1022 13.5 11.7206 13.342 11.4393 13.0607C11.158 12.7794 11 12.3978 11 12C11 11.6022 11.158 11.2206 11.4393 10.9393C11.7206 10.658 12.1022 10.5 12.5 10.5ZM18.5 10.5C18.8978 10.5 19.2794 10.658 19.5607 10.9393C19.842 11.2206 20 11.6022 20 12C20 12.3978 19.842 12.7794 19.5607 13.0607C19.2794 13.342 18.8978 13.5 18.5 13.5C18.1022 13.5 17.7206 13.342 17.4393 13.0607C17.158 12.7794 17 12.3978 17 12C17 11.6022 17.158 11.2206 17.4393 10.9393C17.7206 10.658 18.1022 10.5 18.5 10.5Z"
                        fill="black"/>
                </svg>
            </div>
            <p className="rrc-title mt-2">{title}</p>
            {des !== undefined && <p className="rrc-des mb-0" style={{minHeight: 20}}>{des}</p>}
            {date && <p className="rrc-des">{date}</p>}
            <div className="d-flex mt-2 align-items-center">
                <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${creatorAvatar}`} imgHeight='30'
                        imgWidth='30'
                        status='online'/>
                <span className="rrc-username" style={{marginLeft: 5}}>{creatorName}</span>
                {level && <span className="rrc-level ml-2">{level}</span>}
            </div>
            <Menu id={'rrc-menu' + _id}>
                <Item onClick={onEdit}>Edit</Item>
                <Item onClick={onDelete}>Delete</Item>
                <Item onClick={onDuplicate}>Duplicate</Item>
            </Menu>
        </div>
    )
}

export default ResourceRecentCard