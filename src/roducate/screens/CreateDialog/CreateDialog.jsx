import React, {useState} from "react";
import {PropertyIcon} from "../../components/PropertyIcon";
import {Component1} from "../../icons/Component1";
import {MingcuteBook2Line1} from "../../icons/MingcuteBook2Line1";
import {MingcuteBookLine1} from "../../icons/MingcuteBookLine1";
import {MingcutePlanetLine1} from "../../icons/MingcutePlanetLine1";
import {MingcuteQuillPenLine6} from "../../icons/MingcuteQuillPenLine6";
import {MingcuteVideoLine1} from "../../icons/MingcuteVideoLine1";
import {MingcuteVoiceLine1} from "../../icons/MingcuteVoiceLine1";
import "./style.css";
import {AddSubjectModal} from "../../modals/AddSubjectModal/AddSubjectModal";
import {showAddCommunity, showAddMediaModal, showAddSubjectModal, showAddTopicModal} from '@store/actions/modal'
import {useDispatch} from "react-redux";
import {AddMedia} from "../../modals/AddMedia/AddMedia";
import {AddCommunity} from "../../modals/AddCommunityContent/AddCommunity";
import {CreateTopic} from "../../modals/CreateTopic/CreateTopic";

export const CreateDialog = () => {

    const headCreate = require(`@src/assets/images/svg/head-create.svg`).default

    const dispatch = useDispatch()

    const [type, setType] = useState('podcast');

    const showAddSubject = () => {
        dispatch(showAddSubjectModal());
    }

    const showAddTopic = () => {
        dispatch(showAddTopicModal(true));
    }

    const showAddPodcasts = () => {
        setType('podcast')
        dispatch(showAddMediaModal())
    }

    const showAddVideo = () => {
        setType('video')
        dispatch(showAddMediaModal())
    }

    const showAddCommunityModal = () => {
        dispatch(showAddCommunity())
    }

    return (
        <div className="create-dialog">
            <div className="div-2" style={{background: `url(${headCreate})`}}/>
            <h1 className="marketing-automation">Let’s create!</h1>
            <div className="list">
                <PropertyIcon
                    onClick={showAddSubject}
                    className="list-item"
                    icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                    override={<MingcuteBookLine1 className="icon-instance-node"/>}
                    text="Create and manage all content including tasks and topics."
                />
                <PropertyIcon
                    onClick={showAddTopic}
                    className="list-item"
                    icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                    override={<MingcuteBook2Line1 className="icon-instance-node"/>}
                    text="Create subject topics and add topic content."
                    text1="Topics"
                />
                <PropertyIcon
                    onClick={showAddPodcasts}
                    className="list-item"
                    icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                    override={<MingcuteVoiceLine1 className="icon-instance-node"/>}
                    text="Create and manage podcast categories and content."
                    text1="Podcasts"
                />
                <PropertyIcon
                    onClick={showAddVideo}
                    className="list-item"
                    icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                    override={<MingcuteVideoLine1 className="icon-instance-node"/>}
                    text="Create and manage videos and channels."
                    text1="Videos"
                />
                <PropertyIcon
                    onClick={showAddCommunityModal}
                    className="list-item"
                    icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                    override={<MingcutePlanetLine1 className="icon-instance-node"/>}
                    text="Create and manage content for the Roducate community."
                    text1="Community Content"
                />
                <PropertyIcon
                    className="list-item"
                    icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                    override={<Component1 className="icon-instance-node"/>}
                    text="Create and manage notifications for all users, or specific users."
                    text1="Notifications"
                />
            </div>
            <AddMedia type={type}/>
            <AddCommunity/>
            <CreateTopic/>
        </div>
    );
};