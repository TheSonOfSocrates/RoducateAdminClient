import React from "react";
import {PropertyIcon} from "../../components/PropertyIcon";
import {MingcuteBook2Line1} from "../../icons/MingcuteBook2Line1";
import {MingcuteBookLine1} from "../../icons/MingcuteBookLine1";
import {MingcuteQuillPenLine6} from "../../icons/MingcuteQuillPenLine6";
import "./style.css";
import {showSubscriptionPlanModal} from '@store/actions/modal'
import {useDispatch} from "react-redux";
import {AddSubscriptionPlanModal} from '../../modals/AddSubscriptionPlanModal/AddSubscriptionPlanModal'

export const CreatePlan = () => {

    const headCreate = require(`@src/assets/images/svg/head-create.svg`).default

    const dispatch = useDispatch()

    const handleSubscriptionModal = () => {
        dispatch(showSubscriptionPlanModal())
    }

    const handleEventModal = () => {

    }

    return (
        <div className="create-dialog">
            <div className="div-2" style={{background: `url(${headCreate})`}}/>
            <h1 className="marketing-automation">Let’s create!</h1>
            <div className="list">
                <PropertyIcon
                    onClick={handleSubscriptionModal}
                    className="list-item"
                    icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                    override={<MingcuteBookLine1 className="icon-instance-node"/>}
                    text="Create subscription plan for app access"
                    text1="App Subscription Plan"
                />
                <PropertyIcon
                    onClick={handleEventModal}
                    className="list-item"
                    icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                    override={<MingcuteBook2Line1 className="icon-instance-node"/>}
                    text="Create event package plan"
                    text1="Event Package"
                />
            </div>

            <AddSubscriptionPlanModal/>
        </div>
    );
};