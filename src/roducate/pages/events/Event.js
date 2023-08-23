// ** React Imports
import React, {forwardRef, useEffect, useState} from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {ChevronDown, Edit, MoreVertical, PlusCircle, Trash, X} from 'react-feather'
import '@styles/react/libs/tables/react-dataTable-component.scss'
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
import {showCreateEvent} from "../../../redux/actions/modal";
import './Event.css'
import {CreateEvent} from "../../modals/CreateEvent/CreateEvent";
import Flatpickr from "react-flatpickr";

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const Event = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const [eventListByDate, setEventListByDate] = useState([])

    // data table model
    const [dataList, setDataList] = useState([])
    const [selectedList, setSelectedList] = useState([])

    // data table rendering
    const [searchStr, setSearchStr] = useState('')
    const [sort, setSort] = useState({sortBy: '_id', sortOrder: 'asc'})
    const [pageSize, setPageSize] = useState(5)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [currentDate, setCurrentDate] = useState(new Date())

    // data table operation (edit, delete)
    const [editingRow, setEditingRow] = useState(undefined)

    useEffect(() => {
        getEventListByDate()
    }, [currentDate])

    const getEventListByDate = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/event/getEventByDate', {
                eventDate: new Date(currentDate).toUTCString()
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
            setEventListByDate(response.data)
        }

        dispatch(showLoadingScreen(false))
    }

    // data table columns
    const columns = [
        {
            name: 'Thumbnail',
            sortable: false,
            minWidth: '100px',
            cell: row => {
                return (
                    <img style={{height: '40px'}} src={process.env.REACT_APP_3BUCKET_URL + row.coverImages[0]}/>
                )
            }
        },
        {
            name: 'Event title',
            selector: 'title',
            sortable: false,
            minWidth: '200px'
        },
        {
            name: 'Date & Time',
            selector: 'updatedAt',
            sortable: true,
            minWidth: '150px',
            cell: row => {
                return <div>{moment(row.createdAt.toLocaleString()).format('DD MMM YYYY h:mm A')}</div>
            }
        },
        {
            name: 'Status',
            sortable: true,
            minWidth: '150px',
            cell: row => {
                return (
                    <div>
                        {new Date().getTime() > new Date(row.endDate).getTime() && <div>
                            {isActive['pass']?.icon}&nbsp;&nbsp;&nbsp;
                            {<span style={{color: "#FCB22B"}}>Pass</span>}
                        </div>}
                        {new Date().getTime() < new Date(row.endDate).getTime() && new Date().getTime() > new Date(row.startDate).getTime() &&
                            <div>
                                {isActive['pass']?.icon}&nbsp;&nbsp;&nbsp;
                                {<span style={{color: "#00AB5F"}}>Ongoing</span>}
                            </div>}
                        {new Date().getTime() < new Date(row.startDate).getTime() && <div>
                            {isActive['pass']?.icon}&nbsp;&nbsp;&nbsp;
                            {<span style={{color: "#1E63EE"}}>Upcoming</span>}
                        </div>}
                        {row.isDeleted && <div>
                            {isActive['pass']?.icon}&nbsp;&nbsp;&nbsp;
                            {<span style={{color: "#FC7753"}}>Cancelled</span>}
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
                            dispatch(showCreateEvent(true))
                        }}/>
                    </div>
                )
            }
        }
    ]

    const MySwal = withReactContent(Swal)

    const isActive = {
        "pass": {
            icon: <Avatar color='light-success' icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                           xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 1.5C8.12247 1.50002 8.24067 1.54498 8.33219 1.62636C8.4237 1.70774 8.48217 1.81987 8.4965 1.9415L8.5 2V2.5H9.5C9.75229 2.49992 9.99528 2.5952 10.1803 2.76675C10.3653 2.93829 10.4786 3.17342 10.4975 3.425L10.5 3.5V9.5C10.5001 9.75229 10.4048 9.99528 10.2333 10.1803C10.0617 10.3653 9.82658 10.4786 9.575 10.4975L9.5 10.5H2.5C2.24771 10.5001 2.00472 10.4048 1.81973 10.2333C1.63474 10.0617 1.52142 9.82658 1.5025 9.575L1.5 9.5V3.5C1.49992 3.24771 1.5952 3.00472 1.76675 2.81973C1.93829 2.63474 2.17342 2.52142 2.425 2.5025L2.5 2.5H3.5V2C3.50014 1.87256 3.54894 1.74998 3.63642 1.65732C3.72391 1.56465 3.84348 1.50888 3.9707 1.50141C4.09792 1.49395 4.22319 1.53534 4.32092 1.61713C4.41864 1.69893 4.48145 1.81495 4.4965 1.9415L4.5 2V2.5H7.5V2C7.5 1.86739 7.55268 1.74021 7.64645 1.64645C7.74021 1.55268 7.86739 1.5 8 1.5ZM9.5 6H2.5V9.5H9.5V6ZM9.5 3.5H2.5V5H9.5V3.5Z"
                    fill="#FCB22B"/>
            </svg>}/>
        },
        "ongoing": {
            icon: <Avatar color='light-danger' icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                          xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6 1C8.7615 1 11 3.2385 11 6C11 8.7615 8.7615 11 6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1ZM6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2ZM6 3C6.12247 3.00002 6.24067 3.04498 6.33219 3.12636C6.4237 3.20774 6.48217 3.31987 6.4965 3.4415L6.5 3.5V5.793L7.8535 7.1465C7.94317 7.23648 7.99524 7.35722 7.99911 7.48419C8.00299 7.61117 7.95839 7.73486 7.87438 7.83014C7.79036 7.92542 7.67322 7.98515 7.54676 7.9972C7.4203 8.00925 7.294 7.97271 7.1935 7.895L7.1465 7.8535L5.6465 6.3535C5.56879 6.27572 5.51888 6.1745 5.5045 6.0655L5.5 6V3.5C5.5 3.36739 5.55268 3.24021 5.64645 3.14645C5.74021 3.05268 5.86739 3 6 3Z"
                    fill="#00AB5F"/>
            </svg>}/>
        },
        "upcoming": {
            icon: <Avatar color='light-danger' icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                          xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6 1C8.7615 1 11 3.2385 11 6C11 8.7615 8.7615 11 6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1ZM6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2ZM6 3C6.12247 3.00002 6.24067 3.04498 6.33219 3.12636C6.4237 3.20774 6.48217 3.31987 6.4965 3.4415L6.5 3.5V5.793L7.8535 7.1465C7.94317 7.23648 7.99524 7.35722 7.99911 7.48419C8.00299 7.61117 7.95839 7.73486 7.87438 7.83014C7.79036 7.92542 7.67322 7.98515 7.54676 7.9972C7.4203 8.00925 7.294 7.97271 7.1935 7.895L7.1465 7.8535L5.6465 6.3535C5.56879 6.27572 5.51888 6.1745 5.5045 6.0655L5.5 6V3.5C5.5 3.36739 5.55268 3.24021 5.64645 3.14645C5.74021 3.05268 5.86739 3 6 3Z"
                    fill="#1E63EE"/>
            </svg>}/>
        },
        "cancelled": {
            icon: <Avatar color='light-danger' icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                          xmlns="http://www.w3.org/2000/svg">
                <path d="M4.50537 11.4955L8.0007 8.00022L11.496 11.4955M11.496 4.50488L8.00004 8.00022L4.50537 4.50488"
                      stroke="#FC7753" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>}/>
        }
    }

    useEffect(async () => {
        if (!store.showCreateEvent)
            loadData()
    }, [store.showCreateEvent, pageNumber, pageSize, sort])

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/event/getAllEvent', {
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

        if (response && response.data) {
            setTotalPages(response.data.totalPages)
            setDataList(response.data.data)
        }

        dispatch(showLoadingScreen(false))
    }

    const deleteData = async (ids) => {
        dispatch(showLoadingScreen(true))
        try {
            const res = await axios.post('/event/deleteEvents', {ids})
            dispatch(showLoadingScreen(false))
            if (res.data.success) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: 'You deleted syllabus successfully!',
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
            <div className="row d-flex justify-content-between mb-2">
                <div className="d-flex">
                </div>
                <Button className='ml-2' color='primary' onClick={() => dispatch(showCreateEvent(true))}>
                    <PlusCircle size={15}/>
                    <span className='align-middle ml-50'>Add Event</span>
                </Button>
            </div>
            <div className="row">
                <div className="col-9">
                    <Card className="row">
                        <CardHeader
                            className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
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
                <div className="col-3">
                    <Flatpickr
                        className='form-control'
                        value={currentDate}
                        options={{inline: true}}
                        onChange={date => setCurrentDate(date)}
                    />

                    <Card className="mt-1">
                        {eventListByDate.map(item => <div className="d-flex justify-content-between p-1">
                            <img style={{height: '40px'}}
                                 src={process.env.REACT_APP_3BUCKET_URL + item.coverImages[0]}/>
                            <div>
                                <p>{item.title}</p>
                                <p className="mb-0">{item.startDate.toLocaleString()}</p>
                            </div>
                            <Button.Ripple onClick={() => deleteData([item._id])}
                                           className='btn-icon rounded-circle'
                                           color='flat-danger'>
                                <X size={16}/>
                            </Button.Ripple>
                        </div>)}
                    </Card>
                </div>
            </div>

            <CreateEvent event={editingRow}/>
        </div>
    )
}

export default Event