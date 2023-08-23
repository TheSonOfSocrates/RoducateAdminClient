// ** React Imports
import React, {forwardRef, useEffect, useState} from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {ChevronDown, Edit, MoreVertical, PlusCircle, Trash} from 'react-feather'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import "react-vis/dist/style.css";
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
import Avatar from "../../../@core/components/avatar";
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {showLoadingScreen} from '@store/actions/layout'
import './Schools.css'
import UserStatComp from "../../components/UserStatComp/UserStatComp";
import ActiveStatComp from "../../components/ActiveStatComp/ActiveStatComp";
import InActiveStatComp from "../../components/InActiveStatComp/InActiveStatComp";
import SchoolStatComp from "../../components/SchoolStatComp/SchoolStatComp";

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const Schools = ({userType = 'admin'}) => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    // data table model
    const [dataList, setDataList] = useState([])
    const [selectedList, setSelectedList] = useState([])

    // data table rendering
    const [searchStr, setSearchStr] = useState('')
    const [sort, setSort] = useState({sortBy: '_id', sortOrder: 'asc'})
    const [pageSize, setPageSize] = useState(5)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // data table operation (edit, delete)
    const [editingRow, setEditingRow] = useState(undefined)

    // data table columns
    const columns = [
        {
            name: 'School',
            sortable: true,
            minWidth: '100px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center justify-content-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M11.063 2.46913C11.309 2.27238 11.6108 2.15809 11.9254 2.14247C12.2401 2.12685 12.5517 2.2107 12.816 2.38213L12.937 2.46913L17.249 5.91913C17.4594 6.08728 17.6336 6.29618 17.7613 6.53332C17.889 6.77045 17.9675 7.03093 17.992 7.29913L18 7.48013V10.0001H20C20.5046 9.99997 20.9906 10.1905 21.3605 10.5336C21.7305 10.8767 21.9572 11.347 21.995 11.8501L22 12.0001V19.9001C22.0001 20.1712 21.9002 20.4328 21.7193 20.6346C21.5385 20.8365 21.2894 20.9646 21.02 20.9941L20.9 21.0001H3.1C2.82894 21.0003 2.56738 20.9003 2.36548 20.7195C2.16358 20.5386 2.03557 20.2896 2.006 20.0201L2 19.9001V12.0001C1.99984 11.4956 2.19041 11.0096 2.5335 10.6396C2.87659 10.2696 3.34684 10.043 3.85 10.0051L4 10.0001H6V7.48013C5.99998 7.21081 6.05436 6.94427 6.15987 6.69648C6.26537 6.44869 6.41984 6.22476 6.614 6.03813L6.751 5.91813L11.063 2.46813V2.46913ZM12 4.28013L8 7.48013V19.0001H16V7.48013L12 4.28013ZM20 12.0001H18V19.0001H20V12.0001ZM6 12.0001H4V19.0001H6V12.0001ZM12 8.00013C12.394 8.00013 12.7841 8.07772 13.1481 8.22849C13.512 8.37925 13.8427 8.60023 14.1213 8.87881C14.3999 9.15738 14.6209 9.4881 14.7716 9.85208C14.9224 10.2161 15 10.6062 15 11.0001C15 11.3941 14.9224 11.7842 14.7716 12.1482C14.6209 12.5122 14.3999 12.8429 14.1213 13.1214C13.8427 13.4 13.512 13.621 13.1481 13.7718C12.7841 13.9225 12.394 14.0001 12 14.0001C11.2044 14.0001 10.4413 13.6841 9.87868 13.1214C9.31607 12.5588 9 11.7958 9 11.0001C9 10.2045 9.31607 9.44142 9.87868 8.87881C10.4413 8.3162 11.2044 8.00013 12 8.00013ZM12 10.0001C11.7348 10.0001 11.4804 10.1055 11.2929 10.293C11.1054 10.4806 11 10.7349 11 11.0001C11 11.2653 11.1054 11.5197 11.2929 11.7072C11.4804 11.8948 11.7348 12.0001 12 12.0001C12.2652 12.0001 12.5196 11.8948 12.7071 11.7072C12.8946 11.5197 13 11.2653 13 11.0001C13 10.7349 12.8946 10.4806 12.7071 10.293C12.5196 10.1055 12.2652 10.0001 12 10.0001Z"
                                  fill="#1E63EE"/>
                        </svg>
                        &nbsp;
                        <span>{row.schoolName}</span>
                    </div>
                )
            }
        },
        {
            name: 'Location',
            sortable: true,
            selector: 'location',
            minWidth: '100px'
        },
        // {
        //     name: 'Admin info',
        //     sortable: true,
        //     minWidth: '100px',
        //     cell: row => {
        //         return (
        //             <div className="d-flex align-items-center justify-content-center">
        //                 <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${row.uploadedUserAvatar}`}
        //                         imgHeight='30' imgWidth='30' status='online'/>&nbsp;
        //                 <span>{row.uploadedUserFristName}</span>
        //             </div>
        //         )
        //     }
        // },
        // {
        //     name: 'Last login',
        //     selector: 'updatedAt',
        //     sortable: true,
        //     minWidth: '150px',
        //     cell: row => {
        //         return <div>{moment(row.lastLoginDate).format('DD MMM YYYY h:mm A')}</div>
        //     }
        // },
        {
            name: 'Status',
            sortable: true,
            width: '150px',
            cell: row => {
                return (
                    <div>
                        <div>
                            {isActive[row.status]?.icon}&nbsp;&nbsp;&nbsp;
                            {row.status === 'active' && <span style={{color: "#00AB5F"}}>Active</span>}
                            {row.status === 'pending' && <span style={{color: "#FCB22B"}}>Pending</span>}
                            {row.status === 'unverified' && <span style={{color: "#FC7753"}}>Unverified</span>}
                        </div>
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
                                              onClick={(e) => {
                                                  e.preventDefault()
                                                  deleteData([row._id])
                                              }}>
                                    <Trash size={15}/>
                                    <span className='align-middle ml-50'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Edit size={15} onClick={() => {
                            setEditingRow(dataList.find(item => item._id === row._id))
                            dispatch(showAddSubjectModal())
                        }}/>
                    </div>
                )
            }
        }
    ]

    const MySwal = withReactContent(Swal)

    const isActive = {
        "pending": {
            icon: <Avatar color='light-success' icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                           xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M2.5 2C2.5 1.73478 2.60536 1.48043 2.79289 1.29289C2.98043 1.10536 3.23478 1 3.5 1H8.5C8.76522 1 9.01957 1.10536 9.20711 1.29289C9.39464 1.48043 9.5 1.73478 9.5 2V2.93C9.49995 3.34157 9.39829 3.74676 9.20405 4.10961C9.0098 4.47246 8.72898 4.78174 8.3865 5.01L6.9015 6L8.3865 6.99C8.72898 7.21826 9.0098 7.52754 9.20405 7.89039C9.39829 8.25324 9.49995 8.65843 9.5 9.07V10C9.5 10.2652 9.39464 10.5196 9.20711 10.7071C9.01957 10.8946 8.76522 11 8.5 11H3.5C3.23478 11 2.98043 10.8946 2.79289 10.7071C2.60536 10.5196 2.5 10.2652 2.5 10V9.07C2.49999 8.65847 2.60158 8.25331 2.79573 7.89046C2.98989 7.52762 3.27062 7.21831 3.613 6.99L5.0985 6L3.6135 5.01C3.27102 4.78174 2.9902 4.47246 2.79595 4.10961C2.60171 3.74676 2.50005 3.34157 2.5 2.93V2ZM6 5.399L7.832 4.1775C8.0374 4.04058 8.20583 3.85509 8.32235 3.63747C8.43888 3.41986 8.4999 3.17685 8.5 2.93V2H3.5V2.93C3.5001 3.17685 3.56112 3.41986 3.67765 3.63747C3.79417 3.85509 3.9626 4.04058 4.168 4.1775L6 5.399ZM6 6.601L4.168 7.8225C3.9626 7.95942 3.79417 8.14491 3.67765 8.36253C3.56112 8.58014 3.5001 8.82315 3.5 9.07V10H8.5V9.07C8.4999 8.82315 8.43888 8.58014 8.32235 8.36253C8.20583 8.14491 8.0374 7.95942 7.832 7.8225L6 6.601Z"
                      fill="#FCB22B"/>
            </svg>
            }/>
        },
        "active": {
            icon: <Avatar color='light-danger' icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                          xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.649 1.09857C5.84631 1.02474 6.0619 1.01512 6.265 1.07107L6.351 1.09857L9.851 2.41107C10.0285 2.47761 10.1834 2.59322 10.2976 2.74442C10.4119 2.89562 10.4809 3.07618 10.4965 3.26507L10.5 3.34757V6.02907C10.5 6.83928 10.2812 7.63445 9.8668 8.33066C9.45239 9.02687 8.8577 9.59828 8.1455 9.98457L8.0125 10.0541L6.3355 10.8926C6.24316 10.9387 6.1423 10.9652 6.03923 10.9706C5.93616 10.9759 5.8331 10.9599 5.7365 10.9236L5.6645 10.8926L3.9875 10.0541C3.26281 9.69171 2.64939 9.14041 2.212 8.45837C1.77462 7.77633 1.52949 6.98885 1.5025 6.17907L1.5 6.02907V3.34757C1.5 3.15813 1.55381 2.97259 1.65517 2.81255C1.75652 2.65251 1.90125 2.52455 2.0725 2.44357L2.149 2.41107L5.649 1.09857ZM6 2.03507L2.5 3.34757V6.02907C2.50001 6.65657 2.66873 7.27253 2.98848 7.81246C3.30823 8.35238 3.76726 8.79642 4.3175 9.09807L4.435 9.15957L6 9.94207L7.565 9.15957C8.12636 8.87894 8.60194 8.45253 8.94193 7.925C9.28192 7.39746 9.47381 6.78822 9.4975 6.16107L9.5 6.02907V3.34757L6 2.03507ZM5.5715 4.07707C5.63709 3.96756 5.74207 3.88729 5.86493 3.85269C5.9878 3.8181 6.11924 3.8318 6.23233 3.891C6.34542 3.95019 6.43158 4.0504 6.47317 4.17108C6.51475 4.29176 6.50861 4.42377 6.456 4.54007L6.4285 4.59157L5.8835 5.50157H6.991C7.364 5.50157 7.6015 5.88757 7.451 6.21507L7.424 6.26607L6.429 7.92507C6.36399 8.03575 6.2589 8.11719 6.1355 8.15252C6.01209 8.18785 5.87983 8.17437 5.76609 8.11487C5.65235 8.05536 5.56586 7.9544 5.52451 7.83288C5.48317 7.71135 5.49015 7.57859 5.544 7.46207L5.5715 7.41057L6.116 6.50107H5.0085C4.92404 6.50107 4.84093 6.4799 4.76677 6.43948C4.69261 6.39906 4.62978 6.34069 4.58401 6.2697C4.53825 6.19872 4.51102 6.11739 4.50481 6.03316C4.49861 5.94893 4.51363 5.86449 4.5485 5.78757L4.5755 5.73607L5.5705 4.07707H5.5715Z"
                    fill="#00C56D"/>
            </svg>}/>
        },
        "unverified": {
            icon: <Avatar color='light-danger' icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                          xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.649 1.09857C5.84631 1.02474 6.0619 1.01512 6.265 1.07107L6.351 1.09857L9.851 2.41107C10.0285 2.47761 10.1834 2.59322 10.2976 2.74442C10.4119 2.89562 10.4809 3.07618 10.4965 3.26507L10.5 3.34757V6.02907C10.5 6.83928 10.2812 7.63445 9.8668 8.33066C9.45239 9.02687 8.8577 9.59828 8.1455 9.98457L8.0125 10.0541L6.3355 10.8926C6.24316 10.9387 6.1423 10.9652 6.03923 10.9706C5.93616 10.9759 5.8331 10.9599 5.7365 10.9236L5.6645 10.8926L3.9875 10.0541C3.26281 9.69171 2.64939 9.14041 2.212 8.45837C1.77462 7.77633 1.52949 6.98885 1.5025 6.17907L1.5 6.02907V3.34757C1.5 3.15813 1.55381 2.97259 1.65517 2.81255C1.75652 2.65251 1.90125 2.52455 2.0725 2.44357L2.149 2.41107L5.649 1.09857ZM6 2.03507L2.5 3.34757V6.02907C2.50001 6.65657 2.66873 7.27253 2.98848 7.81246C3.30823 8.35238 3.76726 8.79642 4.3175 9.09807L4.435 9.15957L6 9.94207L7.565 9.15957C8.12636 8.87894 8.60194 8.45253 8.94193 7.925C9.28192 7.39746 9.47381 6.78822 9.4975 6.16107L9.5 6.02907V3.34757L6 2.03507ZM5.5715 4.07707C5.63709 3.96756 5.74207 3.88729 5.86493 3.85269C5.9878 3.8181 6.11924 3.8318 6.23233 3.891C6.34542 3.95019 6.43158 4.0504 6.47317 4.17108C6.51475 4.29176 6.50861 4.42377 6.456 4.54007L6.4285 4.59157L5.8835 5.50157H6.991C7.364 5.50157 7.6015 5.88757 7.451 6.21507L7.424 6.26607L6.429 7.92507C6.36399 8.03575 6.2589 8.11719 6.1355 8.15252C6.01209 8.18785 5.87983 8.17437 5.76609 8.11487C5.65235 8.05536 5.56586 7.9544 5.52451 7.83288C5.48317 7.71135 5.49015 7.57859 5.544 7.46207L5.5715 7.41057L6.116 6.50107H5.0085C4.92404 6.50107 4.84093 6.4799 4.76677 6.43948C4.69261 6.39906 4.62978 6.34069 4.58401 6.2697C4.53825 6.19872 4.51102 6.11739 4.50481 6.03316C4.49861 5.94893 4.51363 5.86449 4.5485 5.78757L4.5755 5.73607L5.5705 4.07707H5.5715Z"
                    fill="#FC7753"/>
            </svg>}/>
        }
    }

    useEffect(async () => {
        loadData()
    }, [userType, pageNumber, pageSize, sort])

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/school/getAllSchools', {
                pageNumber,
                pageSize,
                searchStr,
                sort,
                userType
            })
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }

        if (response && response.data) {
            setTotalPages(response.data.totalPages)
            setDataList(response.data.data)
        }

        dispatch(showLoadingScreen(false))
    }

    const deleteData = async (ids) => {
        dispatch(showLoadingScreen(true))
        try {
            const res = await axios.post('/users/deleteUsers', {ids})
            dispatch(showLoadingScreen(false))
            if (res.data.success) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: 'You deleted user successfully!',
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
        <div>
            <Card>
                <div className="row p-3">
                    <div className="col-4">
                        <SchoolStatComp/>
                    </div>
                    <div className="col-4">
                        <ActiveStatComp/>
                    </div>
                    <div className="col-4">
                        <InActiveStatComp/>
                    </div>
                </div>
            </Card>
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <UncontrolledButtonDropdown>
                        <DropdownToggle color='secondary' caret outline>
                            <span className='align-middle ml-50'>Action</span>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem className='w-100' onClick={() => deleteData(selectedList)}>
                                <span className='align-middle ml-50'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <Button className='ml-2' color='primary' onClick={() => dispatch(showCreatePlanModal())}>
                        <PlusCircle size={15}/>
                        <span className='align-middle ml-50'>Create School</span>
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
                    paginationDefaultPage={1}
                    paginationComponent={CustomPagination}
                    data={dataList}
                    selectableRowsComponent={BootstrapCheckbox}
                    onSelectedRowsChange={(e) => setSelectedList(e.selectedRows.map(item => item._id))}
                    onSort={(e, sortOrder) => setSort({sortBy: e.selector, sortOrder})}
                />
            </Card>
        </div>
    )
}

export default Schools