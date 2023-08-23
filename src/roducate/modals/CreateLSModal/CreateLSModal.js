import {Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showCreateLSModal} from '@store/actions/modal'
import {PropertyIcon} from "../../components/PropertyIcon";
import {MingcuteQuillPenLine6} from "../../icons/MingcuteQuillPenLine6";
import React from "react";
import './CreateLSModal.css'

export const CreateLSModal = ({onSelected}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const headCreate = require(`@src/assets/images/svg/head-create.svg`).default

    const handlePodcastModal = () => {
        onSelected('podcast')
        dispatch(showCreateLSModal())
    }

    const handleVideoModal = () => {
        onSelected('video')
        dispatch(showCreateLSModal())
    }

    return (
        <Modal toggle={() => dispatch(showCreateLSModal())}
               isOpen={store.showCreateLSModal}
               className="modal-dialog-centered"
        >
            <ModalBody toggle={() => dispatch(showCreateLSModal())}>
                <div className="create-dialog">
                    <div className="div-2" style={{background: `url(${headCreate})`}}/>
                    <h1 className="marketing-automation">Let’s create!</h1>
                    <div className="list">
                        <PropertyIcon
                            onClick={handlePodcastModal}
                            className="list-item"
                            icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                            override={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                           xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 3C12.2449 3.00003 12.4813 3.08996 12.6644 3.25272C12.8474 3.41547 12.9643 3.63975 12.993 3.883L13 4V20C12.9997 20.2549 12.9021 20.5 12.7272 20.6854C12.5522 20.8707 12.313 20.9822 12.0586 20.9972C11.8042 21.0121 11.5536 20.9293 11.3582 20.7657C11.1627 20.6021 11.0371 20.3701 11.007 20.117L11 20V4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3ZM8 6C8.26522 6 8.51957 6.10536 8.70711 6.29289C8.89464 6.48043 9 6.73478 9 7V17C9 17.2652 8.89464 17.5196 8.70711 17.7071C8.51957 17.8946 8.26522 18 8 18C7.73478 18 7.48043 17.8946 7.29289 17.7071C7.10536 17.5196 7 17.2652 7 17V7C7 6.73478 7.10536 6.48043 7.29289 6.29289C7.48043 6.10536 7.73478 6 8 6ZM16 6C16.2652 6 16.5196 6.10536 16.7071 6.29289C16.8946 6.48043 17 6.73478 17 7V17C17 17.2652 16.8946 17.5196 16.7071 17.7071C16.5196 17.8946 16.2652 18 16 18C15.7348 18 15.4804 17.8946 15.2929 17.7071C15.1054 17.5196 15 17.2652 15 17V7C15 6.73478 15.1054 6.48043 15.2929 6.29289C15.4804 6.10536 15.7348 6 16 6ZM4 9C4.26522 9 4.51957 9.10536 4.70711 9.29289C4.89464 9.48043 5 9.73478 5 10V14C5 14.2652 4.89464 14.5196 4.70711 14.7071C4.51957 14.8946 4.26522 15 4 15C3.73478 15 3.48043 14.8946 3.29289 14.7071C3.10536 14.5196 3 14.2652 3 14V10C3 9.73478 3.10536 9.48043 3.29289 9.29289C3.48043 9.10536 3.73478 9 4 9ZM20 9C20.2449 9.00003 20.4813 9.08996 20.6644 9.25272C20.8474 9.41547 20.9643 9.63975 20.993 9.883L21 10V14C20.9997 14.2549 20.9021 14.5 20.7272 14.6854C20.5522 14.8707 20.313 14.9822 20.0586 14.9972C19.8042 15.0121 19.5536 14.9293 19.3582 14.7657C19.1627 14.6021 19.0371 14.3701 19.007 14.117L19 14V10C19 9.73478 19.1054 9.48043 19.2929 9.29289C19.4804 9.10536 19.7348 9 20 9Z"
                                    fill="black"/>
                            </svg>}
                            text="Create and manage podcast categories and content."
                            text1="Podcasts"
                        />
                        <PropertyIcon
                            onClick={handleVideoModal}
                            className="list-item"
                            icon={<MingcuteQuillPenLine6 className="icon-instance-node" color="#8840E6"/>}
                            override={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                           xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M20 3C20.5046 2.99984 20.9906 3.19041 21.3605 3.5335C21.7305 3.87659 21.9572 4.34684 21.995 4.85L22 5V19C22.0002 19.5046 21.8096 19.9906 21.4665 20.3605C21.1234 20.7305 20.6532 20.9572 20.15 20.995L20 21H4C3.49542 21.0002 3.00943 20.8096 2.63945 20.4665C2.26947 20.1234 2.04284 19.6532 2.005 19.15L2 19V5C1.99984 4.49542 2.19041 4.00943 2.5335 3.63945C2.87659 3.26947 3.34684 3.04284 3.85 3.005L4 3H20ZM20 5H4V19H20V5ZM10.34 7.638L10.858 7.868L11.196 8.028L11.583 8.218L12.013 8.436L12.483 8.686L12.99 8.966L13.256 9.118L13.774 9.423L14.248 9.715L14.678 9.988L15.058 10.241L15.538 10.571L15.902 10.834L15.997 10.904C16.1513 11.0188 16.2767 11.1682 16.363 11.34C16.4494 11.5119 16.4943 11.7016 16.4943 11.894C16.4943 12.0864 16.4494 12.2761 16.363 12.448C16.2767 12.6198 16.1513 12.7692 15.997 12.884L15.674 13.119L15.234 13.427L14.878 13.666L14.473 13.929L14.02 14.212L13.521 14.512L12.987 14.821L12.478 15.103L12.007 15.353L11.577 15.573L11.191 15.761L10.569 16.049L10.339 16.149C10.1624 16.2251 9.97051 16.2589 9.77856 16.2476C9.58662 16.2364 9.39995 16.1805 9.23346 16.0843C9.06696 15.9881 8.92524 15.8544 8.8196 15.6937C8.71396 15.5331 8.64732 15.35 8.625 15.159L8.567 14.594L8.535 14.22L8.493 13.556L8.47 13.048L8.455 12.493C8.45322 12.395 8.45189 12.297 8.451 12.199L8.449 11.894C8.449 11.687 8.451 11.487 8.455 11.294L8.47 10.739L8.493 10.232L8.52 9.775L8.55 9.374L8.625 8.63C8.64719 8.43882 8.71376 8.25547 8.81939 8.09458C8.92502 7.93369 9.0668 7.79972 9.2334 7.70335C9.4 7.60698 9.58682 7.55089 9.77896 7.53954C9.97109 7.5282 10.1632 7.56191 10.34 7.638ZM10.951 10.139L10.515 9.921L10.486 10.408L10.464 10.959L10.451 11.569L10.449 11.894L10.451 12.219L10.464 12.828L10.474 13.111L10.5 13.631L10.515 13.866L10.949 13.648L11.436 13.392L11.971 13.098L12.255 12.936L12.806 12.61L13.3 12.304L13.736 12.024L13.932 11.894L13.525 11.624L13.059 11.33C12.7938 11.1658 12.5261 11.0058 12.256 10.85L11.973 10.689L11.439 10.395L10.951 10.139Z"
                                      fill="black"/>
                            </svg>}
                            text="Create and manage videos and channels."
                            text1="Videos"
                        />
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};