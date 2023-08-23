// ** React Imports
import React, {Fragment, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import './UploadComp.css'
import UploadVideoComp from "../UploadVideoComp/UploadVideoComp";
import {UploadModal} from "../../modals/UploadModal/UploadModal";
import UploadPodcastComp from "../UploadPodcastComp/UploadPodcastComp";

const UploadComp = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [active, setActive] = useState('Video')

    // data table operation (edit, delete)
    const [editingRow, setEditingRow] = useState(undefined)

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Fragment>
            <Nav tabs style={{margin: 'auto', height: 'fit-content'}}>
                <NavItem>
                    <NavLink
                        active={active === 'Video'}
                        onClick={() => {
                            toggle('Video')
                        }}
                    >
                        Video
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === 'Podcast'}
                        onClick={() => {
                            toggle('Podcast')
                        }}
                    >
                        Podcast
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === 'Lesson Note'}
                        onClick={() => {
                            toggle('Lesson Note')
                        }}
                    >
                        Lesson Note
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='Video'>
                    <UploadVideoComp onRowSelected={(row) => setEditingRow(row)}/>
                </TabPane>
                <TabPane tabId='Podcast'>
                    <UploadPodcastComp/>
                </TabPane>
                <TabPane tabId='Lesson Note'>
                    <UploadVideoComp/>
                </TabPane>
            </TabContent>

            <UploadModal file={editingRow}/>
        </Fragment>
    )
}

export default UploadComp