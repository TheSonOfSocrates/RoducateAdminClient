// ** React Imports
import React, {forwardRef, Fragment, useEffect, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {ChevronDown, MoreVertical, PlusCircle, Trash} from 'react-feather'
import {
    Button,
    Card,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Label,
    Row,
    UncontrolledButtonDropdown,
    UncontrolledDropdown
} from 'reactstrap'
import axios from "../../../utility/axios";
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {showLoadingScreen} from '@store/actions/layout'
import './Category.css'
import Avatar from "../../../@core/components/avatar";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import {showAddCategoryModal, showCreateMockExam} from "../../../redux/actions/modal";
import {AddCategoryModal} from "../../modals/AddCategoryModal/AddCategoryModal";

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const Category = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    // data table model
    const [mediaList, setMediaList] = useState([])
    const [selectedList, setSelectedList] = useState([])

    // data table rendering
    const [searchStr, setSearchStr] = useState('')
    const [sort, setSort] = useState({sortBy: '_id', sortOrder: 'asc'})
    const [pageSize, setPageSize] = useState(5)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // data table operation (edit, delete)
    const [editingRow, setEditingRow] = useState(undefined)

    const columns = [
        {
            name: '#',
            selector: '_id',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Name',
            sortable: true,
            minWidth: '250px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <img style={{height: '30px', width: '30px', marginRight: 10}}
                             src={process.env.REACT_APP_3BUCKET_URL + row.icon}/>
                        <span className="datatable-first-column">{row.title}</span>
                    </div>
                )
            }
        },
        {
            name: 'Users',
            selector: '',
            sortable: true,
            minWidth: '50px',
        },
        {
            name: 'Date Modified',
            sortable: true,
            minWidth: '150px',
            cell: row => {
                return <div>{moment(row.updatedAt).format('DD MMM YYYY h:mm A')}</div>
            }
        },
        {
            name: 'Status',
            sortable: true,
            minWidth: '150px',
            cell: row => {
                return (
                    <div>
                        {!row.isDeleted && <div>
                            {isActive[row.isPublished].icon}&nbsp;&nbsp;&nbsp;
                            {row.isPublished && <span style={{color: "#00AB5F"}}>Active</span>}
                            {!row.isPublished && <span style={{color: "#FC7753"}}>Inactive</span>}
                        </div>}
                        {row.isDeleted && <div>
                            {isActive[false].icon}&nbsp;&nbsp;&nbsp;
                            {<span style={{color: "#FC7753"}}>Deleted</span>}
                        </div>}
                    </div>
                )
            }
        },
        {
            name: 'Actions',
            allowOverflow: true,
            cell: row => {
                return (
                    <div className='d-flex'>
                        <UncontrolledDropdown>
                            <DropdownToggle className='pr-1' tag='span'>
                                <MoreVertical size={15}/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag='a' href='#' className='w-100'
                                              onClick={async (e) => {
                                                  setEditingRow(row)
                                                  dispatch(showCreateMockExam(true))
                                              }}>
                                    <span className='align-middle ml-50'>Edit</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Trash size={15} style={{cursor: 'pointer'}} onClick={(e) => {
                            e.preventDefault()
                            deleteMediaList([row._id])
                        }}/>
                    </div>
                )
            }
        }
    ]

    const isActive = {
        "true": {
            icon: <Avatar color='light-success' icon={<svg width="13" height="12" viewBox="0 0 13 12" fill="none"
                                                           xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.5955 9.999C6.66116 9.99746 6.72648 10.0089 6.78774 10.0326C6.84899 10.0563 6.90497 10.0918 6.9525 10.1371C7.00002 10.1825 7.03814 10.2367 7.06469 10.2968C7.09125 10.3569 7.10571 10.4216 7.10725 10.4873C7.10879 10.5529 7.09739 10.6182 7.07369 10.6795C7.04998 10.7407 7.01445 10.7967 6.96911 10.8442C6.92377 10.8918 6.86952 10.9299 6.80945 10.9564C6.74937 10.983 6.68466 10.9975 6.619 10.999L6.5 11L6.381 10.9985C6.31534 10.997 6.25063 10.9825 6.19055 10.9559C6.13048 10.9294 6.07623 10.8913 6.03089 10.8437C5.98555 10.7962 5.95002 10.7402 5.92631 10.679C5.90261 10.6177 5.89121 10.5524 5.89275 10.4867C5.89429 10.4211 5.90875 10.3564 5.93531 10.2963C5.96186 10.2362 5.99998 10.182 6.0475 10.1366C6.09503 10.0913 6.15101 10.0558 6.21226 10.0321C6.27352 10.0084 6.33884 9.99696 6.4045 9.9985L6.5 10L6.5955 9.999ZM9.269 9.5825C9.30326 9.63854 9.32614 9.70078 9.33633 9.76566C9.34653 9.83054 9.34384 9.8968 9.32843 9.96064C9.31301 10.0245 9.28517 10.0847 9.24649 10.1377C9.20781 10.1908 9.15905 10.2358 9.103 10.27C9.03529 10.3113 8.9666 10.351 8.897 10.389C8.83938 10.4205 8.77612 10.4404 8.71083 10.4474C8.64554 10.4545 8.57949 10.4487 8.51646 10.4302C8.38917 10.3929 8.2819 10.3066 8.21825 10.1903C8.1546 10.0739 8.13978 9.937 8.17705 9.80971C8.21432 9.68242 8.30064 9.57515 8.417 9.5115C8.47276 9.48118 8.52778 9.4495 8.582 9.4165C8.69513 9.34748 8.83104 9.32619 8.95986 9.35731C9.08868 9.38844 9.19987 9.46943 9.269 9.5825ZM4.4185 9.4165C4.4725 9.4495 4.5275 9.4815 4.5835 9.5115C4.69986 9.57522 4.78615 9.68255 4.82338 9.80989C4.8606 9.93723 4.84572 10.0741 4.782 10.1905C4.71828 10.3069 4.61095 10.3931 4.48361 10.4304C4.35627 10.4676 4.21936 10.4527 4.103 10.389C4.03338 10.351 3.96469 10.3113 3.897 10.27C3.78382 10.2008 3.70275 10.0896 3.67161 9.96063C3.64048 9.8317 3.66184 9.69568 3.731 9.5825C3.80016 9.46932 3.91144 9.38824 4.04037 9.35711C4.1693 9.32598 4.30532 9.34735 4.4185 9.4165ZM6.5 3C7.29565 3 8.05871 3.31607 8.62132 3.87868C9.18393 4.44129 9.5 5.20435 9.5 6C9.5 6.79565 9.18393 7.55871 8.62132 8.12132C8.05871 8.68393 7.29565 9 6.5 9C5.70435 9 4.94129 8.68393 4.37868 8.12132C3.81607 7.55871 3.5 6.79565 3.5 6C3.5 5.20435 3.81607 4.44129 4.37868 3.87868C4.94129 3.31607 5.70435 3 6.5 3ZM10.69 7.7185C10.8064 7.78209 10.8927 7.8893 10.93 8.01654C10.9673 8.14378 10.9526 8.28064 10.889 8.397C10.851 8.467 10.811 8.5355 10.77 8.603C10.7358 8.65904 10.6908 8.70779 10.6377 8.74646C10.5846 8.78513 10.5245 8.81297 10.4606 8.82839C10.3317 8.85952 10.1957 8.83816 10.0825 8.769C9.96932 8.69984 9.88824 8.58856 9.85711 8.45963C9.82598 8.3307 9.84735 8.19468 9.9165 8.0815C9.9495 8.0275 9.9815 7.9725 10.0115 7.9165C10.0431 7.8589 10.0857 7.80809 10.1369 7.76697C10.1881 7.72584 10.2469 7.69521 10.31 7.67683C10.373 7.65844 10.4391 7.65266 10.5044 7.65981C10.5697 7.66696 10.6329 7.6869 10.6905 7.7185H10.69ZM2.9885 7.917C3.01882 7.97276 3.0505 8.02778 3.0835 8.082C3.11848 8.13806 3.142 8.20049 3.15271 8.26569C3.16341 8.33089 3.16109 8.39757 3.14587 8.46187C3.13065 8.52617 3.10283 8.58681 3.06404 8.64029C3.02524 8.69378 2.97622 8.73904 2.91983 8.77347C2.86343 8.80789 2.80077 8.8308 2.73546 8.84087C2.67016 8.85093 2.60351 8.84795 2.53936 8.8321C2.47522 8.81624 2.41485 8.78784 2.36175 8.74851C2.30865 8.70919 2.26387 8.65973 2.23 8.603C2.1887 8.53529 2.14902 8.4666 2.111 8.397C2.04735 8.28064 2.03253 8.14375 2.0698 8.01646C2.10707 7.88917 2.19339 7.7819 2.30975 7.71825C2.42611 7.6546 2.563 7.63978 2.69029 7.67705C2.81758 7.71432 2.92485 7.80064 2.9885 7.917ZM6.5 4C5.96957 4 5.46086 4.21071 5.08579 4.58579C4.71071 4.96086 4.5 5.46957 4.5 6C4.5 6.53043 4.71071 7.03914 5.08579 7.41421C5.46086 7.78929 5.96957 8 6.5 8C7.03043 8 7.53914 7.78929 7.91421 7.41421C8.28929 7.03914 8.5 6.53043 8.5 6C8.5 5.46957 8.28929 4.96086 7.91421 4.58579C7.53914 4.21071 7.03043 4 6.5 4ZM6.5 5C6.76522 5 7.01957 5.10536 7.20711 5.29289C7.39464 5.48043 7.5 5.73478 7.5 6C7.5 6.26522 7.39464 6.51957 7.20711 6.70711C7.01957 6.89464 6.76522 7 6.5 7C6.23478 7 5.98043 6.89464 5.79289 6.70711C5.60536 6.51957 5.5 6.26522 5.5 6C5.5 5.73478 5.60536 5.48043 5.79289 5.29289C5.98043 5.10536 6.23478 5 6.5 5ZM2.013 5.3925C2.07867 5.39406 2.14338 5.40854 2.20345 5.43511C2.26352 5.46169 2.31776 5.49984 2.36308 5.54739C2.4084 5.59494 2.44391 5.65095 2.46757 5.71222C2.49124 5.7735 2.50259 5.83883 2.501 5.9045L2.5 6C2.5 6.032 2.5 6.064 2.501 6.0955C2.50412 6.22811 2.45443 6.35652 2.36286 6.4525C2.2713 6.54847 2.14536 6.60413 2.01275 6.60725C1.88014 6.61037 1.75173 6.56068 1.65576 6.46911C1.55978 6.37755 1.50412 6.25161 1.501 6.119L1.5 6C1.5 5.96 1.5 5.92 1.5015 5.881C1.50299 5.81533 1.51741 5.75061 1.54393 5.69051C1.57044 5.63042 1.60854 5.57614 1.65604 5.53078C1.70354 5.48541 1.75951 5.44985 1.82076 5.42612C1.88201 5.4024 1.94733 5.39097 2.013 5.3925ZM10.987 5.3925C11.0527 5.39097 11.118 5.4024 11.1792 5.42612C11.2405 5.44985 11.2965 5.48541 11.344 5.53078C11.3915 5.57614 11.4296 5.63042 11.4561 5.69051C11.4826 5.75061 11.497 5.81533 11.4985 5.881L11.5 6L11.4985 6.119C11.497 6.18466 11.4825 6.24937 11.4559 6.30945C11.4294 6.36952 11.3913 6.42377 11.3437 6.46911C11.2962 6.51445 11.2402 6.54998 11.179 6.57369C11.1177 6.59739 11.0524 6.60879 10.9867 6.60725C10.9211 6.60571 10.8564 6.59125 10.7963 6.56469C10.7362 6.53814 10.682 6.50002 10.6366 6.4525C10.5913 6.40497 10.5558 6.34899 10.5321 6.28774C10.5084 6.22648 10.497 6.16116 10.4985 6.0955L10.5 6L10.499 5.9045C10.4974 5.83883 10.5088 5.7735 10.5324 5.71222C10.5561 5.65095 10.5916 5.59494 10.6369 5.54739C10.6822 5.49984 10.7365 5.46169 10.7965 5.43511C10.8566 5.40854 10.9213 5.39406 10.987 5.3925ZM10.77 3.397C10.811 3.4645 10.851 3.5335 10.889 3.603C10.9205 3.66062 10.9404 3.72388 10.9474 3.78917C10.9545 3.85446 10.9487 3.92051 10.9302 3.98354C10.9117 4.04657 10.8811 4.10534 10.8399 4.15651C10.7987 4.20768 10.7479 4.25023 10.6903 4.28175C10.5739 4.3454 10.437 4.36022 10.3097 4.32295C10.1824 4.28568 10.0752 4.19936 10.0115 4.083C9.98115 4.02725 9.94947 3.97224 9.9165 3.918C9.88152 3.86194 9.858 3.79951 9.84729 3.73431C9.83659 3.66911 9.83891 3.60243 9.85413 3.53813C9.86935 3.47383 9.89717 3.41319 9.93596 3.35971C9.97476 3.30622 10.0238 3.26096 10.0802 3.22653C10.1366 3.1921 10.1992 3.1692 10.2645 3.15913C10.3298 3.14907 10.3965 3.15205 10.4606 3.1679C10.5248 3.18376 10.5852 3.21216 10.6383 3.25149C10.6913 3.29081 10.7361 3.34027 10.77 3.397ZM2.9175 3.231C2.97355 3.26523 3.02231 3.31017 3.06099 3.36325C3.09967 3.41633 3.12751 3.47652 3.14293 3.54036C3.15834 3.6042 3.16103 3.67046 3.15083 3.73534C3.14064 3.80022 3.11776 3.86246 3.0835 3.9185C3.0505 3.9725 3.0185 4.0275 2.9885 4.0835C2.92478 4.19986 2.81745 4.28615 2.69011 4.32338C2.56277 4.3606 2.42586 4.34572 2.3095 4.282C2.19314 4.21828 2.10685 4.11095 2.06962 3.98361C2.0324 3.85627 2.04728 3.71936 2.111 3.603C2.149 3.533 2.189 3.4645 2.23 3.397C2.26423 3.34095 2.30917 3.29219 2.36225 3.25351C2.41533 3.21483 2.47552 3.18699 2.53936 3.17157C2.6032 3.15616 2.66946 3.15347 2.73434 3.16367C2.79922 3.17386 2.86146 3.19674 2.9175 3.231ZM8.897 1.611C8.967 1.649 9.0355 1.689 9.103 1.73C9.21618 1.79916 9.29726 1.91044 9.32839 2.03937C9.35952 2.1683 9.33816 2.30432 9.269 2.4175C9.19984 2.53068 9.08856 2.61175 8.95963 2.64289C8.8307 2.67402 8.69468 2.65266 8.5815 2.5835C8.52726 2.55053 8.47225 2.51885 8.4165 2.4885C8.30014 2.42478 8.21385 2.31745 8.17662 2.19011C8.1394 2.06277 8.15428 1.92586 8.218 1.8095C8.28172 1.69314 8.38905 1.60685 8.51639 1.56962C8.64373 1.5324 8.78064 1.54728 8.897 1.611ZM4.782 1.8095C4.81356 1.86714 4.83345 1.93044 4.84053 1.99577C4.84761 2.0611 4.84174 2.12719 4.82325 2.19025C4.80477 2.25331 4.77404 2.31211 4.73281 2.36329C4.69159 2.41447 4.64068 2.45701 4.583 2.4885C4.52725 2.51885 4.47224 2.55053 4.418 2.5835C4.30497 2.64863 4.17095 2.66701 4.04456 2.63471C3.91816 2.60241 3.8094 2.52199 3.74148 2.41061C3.67355 2.29923 3.65185 2.16572 3.681 2.03856C3.71015 1.9114 3.78784 1.80067 3.8975 1.73C3.965 1.689 4.034 1.649 4.1035 1.611C4.2198 1.54738 4.35661 1.53255 4.48385 1.56977C4.61108 1.607 4.71833 1.69323 4.782 1.8095ZM6.619 1.0015C6.75161 1.00462 6.87755 1.06028 6.96911 1.15626C7.06068 1.25223 7.11037 1.38064 7.10725 1.51325C7.10413 1.64586 7.04847 1.7718 6.9525 1.86336C6.85652 1.95493 6.72811 2.00462 6.5955 2.0015L6.5 2L6.4045 2.001C6.27189 2.00412 6.14348 1.95443 6.0475 1.86286C5.95153 1.7713 5.89587 1.64536 5.89275 1.51275C5.88963 1.38014 5.93932 1.25173 6.03089 1.15576C6.12245 1.05978 6.24839 1.00412 6.381 1.001L6.5 1L6.619 1.0015Z"
                    fill="#00C56D"/>
            </svg>
            }/>
        },
        "false": {
            icon: <Avatar color='light-danger' icon={<svg width="13" height="12" viewBox="0 0 13 12" fill="none"
                                                          xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.5955 9.999C6.66116 9.99746 6.72648 10.0089 6.78774 10.0326C6.84899 10.0563 6.90497 10.0918 6.9525 10.1371C7.00002 10.1825 7.03814 10.2367 7.06469 10.2968C7.09125 10.3569 7.10571 10.4216 7.10725 10.4873C7.10879 10.5529 7.09739 10.6182 7.07369 10.6795C7.04998 10.7407 7.01445 10.7967 6.96911 10.8442C6.92377 10.8918 6.86952 10.9299 6.80945 10.9564C6.74937 10.983 6.68466 10.9975 6.619 10.999L6.5 11L6.381 10.9985C6.31534 10.997 6.25063 10.9825 6.19055 10.9559C6.13048 10.9294 6.07623 10.8913 6.03089 10.8437C5.98555 10.7962 5.95002 10.7402 5.92631 10.679C5.90261 10.6177 5.89121 10.5524 5.89275 10.4867C5.89429 10.4211 5.90875 10.3564 5.93531 10.2963C5.96186 10.2362 5.99998 10.182 6.0475 10.1366C6.09503 10.0913 6.15101 10.0558 6.21226 10.0321C6.27352 10.0084 6.33884 9.99696 6.4045 9.9985L6.5 10L6.5955 9.999ZM9.269 9.5825C9.30326 9.63854 9.32614 9.70078 9.33633 9.76566C9.34653 9.83054 9.34384 9.8968 9.32843 9.96064C9.31301 10.0245 9.28517 10.0847 9.24649 10.1377C9.20781 10.1908 9.15905 10.2358 9.103 10.27C9.03529 10.3113 8.9666 10.351 8.897 10.389C8.83938 10.4205 8.77612 10.4404 8.71083 10.4474C8.64554 10.4545 8.57949 10.4487 8.51646 10.4302C8.38917 10.3929 8.2819 10.3066 8.21825 10.1903C8.1546 10.0739 8.13978 9.937 8.17705 9.80971C8.21432 9.68242 8.30064 9.57515 8.417 9.5115C8.47276 9.48118 8.52778 9.4495 8.582 9.4165C8.69513 9.34748 8.83104 9.32619 8.95986 9.35731C9.08868 9.38844 9.19987 9.46943 9.269 9.5825ZM4.4185 9.4165C4.4725 9.4495 4.5275 9.4815 4.5835 9.5115C4.69986 9.57522 4.78615 9.68255 4.82338 9.80989C4.8606 9.93723 4.84572 10.0741 4.782 10.1905C4.71828 10.3069 4.61095 10.3931 4.48361 10.4304C4.35627 10.4676 4.21936 10.4527 4.103 10.389C4.03338 10.351 3.96469 10.3113 3.897 10.27C3.78382 10.2008 3.70275 10.0896 3.67161 9.96063C3.64048 9.8317 3.66184 9.69568 3.731 9.5825C3.80016 9.46932 3.91144 9.38824 4.04037 9.35711C4.1693 9.32598 4.30532 9.34735 4.4185 9.4165ZM6.5 3C7.29565 3 8.05871 3.31607 8.62132 3.87868C9.18393 4.44129 9.5 5.20435 9.5 6C9.5 6.79565 9.18393 7.55871 8.62132 8.12132C8.05871 8.68393 7.29565 9 6.5 9C5.70435 9 4.94129 8.68393 4.37868 8.12132C3.81607 7.55871 3.5 6.79565 3.5 6C3.5 5.20435 3.81607 4.44129 4.37868 3.87868C4.94129 3.31607 5.70435 3 6.5 3ZM10.69 7.7185C10.8064 7.78209 10.8927 7.8893 10.93 8.01654C10.9673 8.14378 10.9526 8.28064 10.889 8.397C10.851 8.467 10.811 8.5355 10.77 8.603C10.7358 8.65904 10.6908 8.70779 10.6377 8.74646C10.5846 8.78513 10.5245 8.81297 10.4606 8.82839C10.3317 8.85952 10.1957 8.83816 10.0825 8.769C9.96932 8.69984 9.88824 8.58856 9.85711 8.45963C9.82598 8.3307 9.84735 8.19468 9.9165 8.0815C9.9495 8.0275 9.9815 7.9725 10.0115 7.9165C10.0431 7.8589 10.0857 7.80809 10.1369 7.76697C10.1881 7.72584 10.2469 7.69521 10.31 7.67683C10.373 7.65844 10.4391 7.65266 10.5044 7.65981C10.5697 7.66696 10.6329 7.6869 10.6905 7.7185H10.69ZM2.9885 7.917C3.01882 7.97276 3.0505 8.02778 3.0835 8.082C3.11848 8.13806 3.142 8.20049 3.15271 8.26569C3.16341 8.33089 3.16109 8.39757 3.14587 8.46187C3.13065 8.52617 3.10283 8.58681 3.06404 8.64029C3.02524 8.69378 2.97622 8.73904 2.91983 8.77347C2.86343 8.80789 2.80077 8.8308 2.73546 8.84087C2.67016 8.85093 2.60351 8.84795 2.53936 8.8321C2.47522 8.81624 2.41485 8.78784 2.36175 8.74851C2.30865 8.70919 2.26387 8.65973 2.23 8.603C2.1887 8.53529 2.14902 8.4666 2.111 8.397C2.04735 8.28064 2.03253 8.14375 2.0698 8.01646C2.10707 7.88917 2.19339 7.7819 2.30975 7.71825C2.42611 7.6546 2.563 7.63978 2.69029 7.67705C2.81758 7.71432 2.92485 7.80064 2.9885 7.917ZM6.5 4C5.96957 4 5.46086 4.21071 5.08579 4.58579C4.71071 4.96086 4.5 5.46957 4.5 6C4.5 6.53043 4.71071 7.03914 5.08579 7.41421C5.46086 7.78929 5.96957 8 6.5 8C7.03043 8 7.53914 7.78929 7.91421 7.41421C8.28929 7.03914 8.5 6.53043 8.5 6C8.5 5.46957 8.28929 4.96086 7.91421 4.58579C7.53914 4.21071 7.03043 4 6.5 4ZM6.5 5C6.76522 5 7.01957 5.10536 7.20711 5.29289C7.39464 5.48043 7.5 5.73478 7.5 6C7.5 6.26522 7.39464 6.51957 7.20711 6.70711C7.01957 6.89464 6.76522 7 6.5 7C6.23478 7 5.98043 6.89464 5.79289 6.70711C5.60536 6.51957 5.5 6.26522 5.5 6C5.5 5.73478 5.60536 5.48043 5.79289 5.29289C5.98043 5.10536 6.23478 5 6.5 5ZM2.013 5.3925C2.07867 5.39406 2.14338 5.40854 2.20345 5.43511C2.26352 5.46169 2.31776 5.49984 2.36308 5.54739C2.4084 5.59494 2.44391 5.65095 2.46757 5.71222C2.49124 5.7735 2.50259 5.83883 2.501 5.9045L2.5 6C2.5 6.032 2.5 6.064 2.501 6.0955C2.50412 6.22811 2.45443 6.35652 2.36286 6.4525C2.2713 6.54847 2.14536 6.60413 2.01275 6.60725C1.88014 6.61037 1.75173 6.56068 1.65576 6.46911C1.55978 6.37755 1.50412 6.25161 1.501 6.119L1.5 6C1.5 5.96 1.5 5.92 1.5015 5.881C1.50299 5.81533 1.51741 5.75061 1.54393 5.69051C1.57044 5.63042 1.60854 5.57614 1.65604 5.53078C1.70354 5.48541 1.75951 5.44985 1.82076 5.42612C1.88201 5.4024 1.94733 5.39097 2.013 5.3925ZM10.987 5.3925C11.0527 5.39097 11.118 5.4024 11.1792 5.42612C11.2405 5.44985 11.2965 5.48541 11.344 5.53078C11.3915 5.57614 11.4296 5.63042 11.4561 5.69051C11.4826 5.75061 11.497 5.81533 11.4985 5.881L11.5 6L11.4985 6.119C11.497 6.18466 11.4825 6.24937 11.4559 6.30945C11.4294 6.36952 11.3913 6.42377 11.3437 6.46911C11.2962 6.51445 11.2402 6.54998 11.179 6.57369C11.1177 6.59739 11.0524 6.60879 10.9867 6.60725C10.9211 6.60571 10.8564 6.59125 10.7963 6.56469C10.7362 6.53814 10.682 6.50002 10.6366 6.4525C10.5913 6.40497 10.5558 6.34899 10.5321 6.28774C10.5084 6.22648 10.497 6.16116 10.4985 6.0955L10.5 6L10.499 5.9045C10.4974 5.83883 10.5088 5.7735 10.5324 5.71222C10.5561 5.65095 10.5916 5.59494 10.6369 5.54739C10.6822 5.49984 10.7365 5.46169 10.7965 5.43511C10.8566 5.40854 10.9213 5.39406 10.987 5.3925ZM10.77 3.397C10.811 3.4645 10.851 3.5335 10.889 3.603C10.9205 3.66062 10.9404 3.72388 10.9474 3.78917C10.9545 3.85446 10.9487 3.92051 10.9302 3.98354C10.9117 4.04657 10.8811 4.10534 10.8399 4.15651C10.7987 4.20768 10.7479 4.25023 10.6903 4.28175C10.5739 4.3454 10.437 4.36022 10.3097 4.32295C10.1824 4.28568 10.0752 4.19936 10.0115 4.083C9.98115 4.02725 9.94947 3.97224 9.9165 3.918C9.88152 3.86194 9.858 3.79951 9.84729 3.73431C9.83659 3.66911 9.83891 3.60243 9.85413 3.53813C9.86935 3.47383 9.89717 3.41319 9.93596 3.35971C9.97476 3.30622 10.0238 3.26096 10.0802 3.22653C10.1366 3.1921 10.1992 3.1692 10.2645 3.15913C10.3298 3.14907 10.3965 3.15205 10.4606 3.1679C10.5248 3.18376 10.5852 3.21216 10.6383 3.25149C10.6913 3.29081 10.7361 3.34027 10.77 3.397ZM2.9175 3.231C2.97355 3.26523 3.02231 3.31017 3.06099 3.36325C3.09967 3.41633 3.12751 3.47652 3.14293 3.54036C3.15834 3.6042 3.16103 3.67046 3.15083 3.73534C3.14064 3.80022 3.11776 3.86246 3.0835 3.9185C3.0505 3.9725 3.0185 4.0275 2.9885 4.0835C2.92478 4.19986 2.81745 4.28615 2.69011 4.32338C2.56277 4.3606 2.42586 4.34572 2.3095 4.282C2.19314 4.21828 2.10685 4.11095 2.06962 3.98361C2.0324 3.85627 2.04728 3.71936 2.111 3.603C2.149 3.533 2.189 3.4645 2.23 3.397C2.26423 3.34095 2.30917 3.29219 2.36225 3.25351C2.41533 3.21483 2.47552 3.18699 2.53936 3.17157C2.6032 3.15616 2.66946 3.15347 2.73434 3.16367C2.79922 3.17386 2.86146 3.19674 2.9175 3.231ZM8.897 1.611C8.967 1.649 9.0355 1.689 9.103 1.73C9.21618 1.79916 9.29726 1.91044 9.32839 2.03937C9.35952 2.1683 9.33816 2.30432 9.269 2.4175C9.19984 2.53068 9.08856 2.61175 8.95963 2.64289C8.8307 2.67402 8.69468 2.65266 8.5815 2.5835C8.52726 2.55053 8.47225 2.51885 8.4165 2.4885C8.30014 2.42478 8.21385 2.31745 8.17662 2.19011C8.1394 2.06277 8.15428 1.92586 8.218 1.8095C8.28172 1.69314 8.38905 1.60685 8.51639 1.56962C8.64373 1.5324 8.78064 1.54728 8.897 1.611ZM4.782 1.8095C4.81356 1.86714 4.83345 1.93044 4.84053 1.99577C4.84761 2.0611 4.84174 2.12719 4.82325 2.19025C4.80477 2.25331 4.77404 2.31211 4.73281 2.36329C4.69159 2.41447 4.64068 2.45701 4.583 2.4885C4.52725 2.51885 4.47224 2.55053 4.418 2.5835C4.30497 2.64863 4.17095 2.66701 4.04456 2.63471C3.91816 2.60241 3.8094 2.52199 3.74148 2.41061C3.67355 2.29923 3.65185 2.16572 3.681 2.03856C3.71015 1.9114 3.78784 1.80067 3.8975 1.73C3.965 1.689 4.034 1.649 4.1035 1.611C4.2198 1.54738 4.35661 1.53255 4.48385 1.56977C4.61108 1.607 4.71833 1.69323 4.782 1.8095ZM6.619 1.0015C6.75161 1.00462 6.87755 1.06028 6.96911 1.15626C7.06068 1.25223 7.11037 1.38064 7.10725 1.51325C7.10413 1.64586 7.04847 1.7718 6.9525 1.86336C6.85652 1.95493 6.72811 2.00462 6.5955 2.0015L6.5 2L6.4045 2.001C6.27189 2.00412 6.14348 1.95443 6.0475 1.86286C5.95153 1.7713 5.89587 1.64536 5.89275 1.51275C5.88963 1.38014 5.93932 1.25173 6.03089 1.15576C6.12245 1.05978 6.24839 1.00412 6.381 1.001L6.5 1L6.619 1.0015Z"
                    fill="#fc7753"/>
            </svg>
            }/>
        }
    }

    useEffect(async () => {
        loadData()
    }, [pageNumber, pageSize, sort])

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/marketplace/productCategory/getAllCategory', {
                pageNumber,
                pageSize,
                searchStr,
                sort
            })
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }
        if (response) {
            setTotalPages(response.data.totalPages)
            setMediaList(response.data.data)
        }

        dispatch(showLoadingScreen(false))
    }

    const deleteMediaList = async (ids) => {
        await MySwal.fire({
            title: 'Oh No, Delete',
            text: "Do you want to delete this content?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        }).then(async function (result) {
            if (result.value) {
                dispatch(showLoadingScreen(true))
                try {
                    const res = await axios.post(`/resource/study/deleteStudyModules`, {ids})
                    dispatch(showLoadingScreen(false))
                    if (res.data.success) {
                        await MySwal.fire({
                            title: 'Good job!',
                            text: 'You deleted study module successfully!',
                            icon: 'success',
                            timer: 2000,
                            position: 'center',
                            customClass: {
                                confirmButton: 'btn btn-primary'
                            },
                            buttonsStyling: false
                        })
                        loadData()
                    } else {
                        MySwal.fire({
                            title: 'Error!',
                            text: 'Something went wrong!',
                            icon: 'error',
                            timer: 2000,
                            position: 'center',
                            customClass: {
                                confirmButton: 'btn btn-primary'
                            },
                            buttonsStyling: false
                        })
                    }
                } catch (e) {
                    dispatch(showLoadingScreen(false))
                    toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                        transition: Slide,
                        hideProgressBar: true,
                        autoClose: 2000
                    })
                }
                setSelectedList([])
            }
        })
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                breakLabel='...'
                pageCount={totalPages || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                activeClassName='active'
                forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
                onPageChange={page => setPageNumber(++page.selected)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName={
                    'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
                }
            />
        )
    }

    return (
        <Fragment>
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <UncontrolledButtonDropdown>
                        <DropdownToggle color='secondary' caret outline>
                            <span className='align-middle ml-50'>Action</span>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem className='w-100' onClick={() => deleteMediaList(selectedList)}>
                                <span className='align-middle ml-50'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <Button className='ml-2' color='primary' onClick={() => dispatch(showAddCategoryModal(true))}>
                        <PlusCircle size={15}/>
                        <span className='align-middle ml-50'>Create Category</span>
                    </Button>
                </CardHeader>
                <Row className='justify-content-end mx-0'>
                    <Col className='d-flex align-items-center justify-content-start' md='6' sm='12'>
                        <div className='d-flex align-items-center'>
                            <Label for='sort-select' className="mb-0">Rows per page: </Label>
                            <Input
                                className='dataTable-select'
                                type='select'
                                id='sort-select'
                                value={pageSize}
                                onChange={e => setPageSize(parseInt(e.target.value))}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={75}>75</option>
                                <option value={100}>100</option>
                            </Input>
                        </div>
                    </Col>

                    <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
                        <Label className='mr-1' for='search-input'>
                            Search
                        </Label>
                        <Input
                            className='dataTable-filter mb-50'
                            type='text'
                            bsSize='sm'
                            id='search-input'
                            value={searchStr}
                            onChange={(e) => setSearchStr(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && loadData()}
                        />
                    </Col>
                </Row>
                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    selectableRows
                    columns={columns}
                    paginationPerPage={7}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10}/>}
                    paginationDefaultPage={pageNumber + 1}
                    paginationComponent={CustomPagination}
                    data={mediaList}
                    selectableRowsComponent={BootstrapCheckbox}
                    onSelectedRowsChange={(e) => setSelectedList(e.selectedRows.map(item => item._id))}
                    onSort={(e, sortOrder) => setSort({sortBy: e.selector, sortOrder})}
                />
            </Card>

            <AddCategoryModal/>
        </Fragment>
    )
}

export default Category