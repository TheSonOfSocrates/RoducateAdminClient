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
import './Study.css'
import Avatar from "../../../@core/components/avatar";
import {AddStudyModal} from "../../modals/AddStudyModal/AddStudyModal";
import {showAddStudyModal} from "../../../redux/actions/modal";
import ResourceRecentCard from "../../components/ResourceRecentCard/ResourceRecentCard";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const Study = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [recentData, setRecentData] = useState([])

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
            name: 'Subject(s)',
            sortable: true,
            minWidth: '300px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <span className="datatable-first-column">{row.subjectTitle}</span>
                    </div>
                )
            }
        },
        {
            name: 'Topics',
            sortable: true,
            minWidth: '300px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <span>{row.topics.join(', ')}</span>
                    </div>
                )
            }
        },
        {
            name: 'Created by',
            sortable: true,
            minWidth: '100px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center justify-content-center">
                        <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${row.creatorAvatar}`}
                                imgHeight='30' imgWidth='30' status='online'/>&nbsp;
                        <span>{row.creatorFirstName}</span>
                    </div>
                )
            }
        },
        {
            name: 'Level',
            selector: 'educationLevel.title',
            sortable: true,
            minWidth: '50px'
        },
        {
            name: 'Last updated',
            selector: 'updatedAt',
            sortable: true,
            minWidth: '200px',
            cell: row => {
                return <div>{moment(row.updatedAt).format('DD MMM YYYY h:mm A')}</div>
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
                                                  dispatch(showAddStudyModal(true))
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

    useEffect(async () => {
        loadRecentInfo()
        loadData()
    }, [pageNumber, pageSize, sort])

    const loadRecentInfo = async () => {
        let response = undefined
        try {
            response = await axios.post('/resource/study/getAllStudyModules', {
                pageNumber: 1,
                pageSize: 5,
                searchStr: ''
            })
        } catch (e) {
            dispatch(showLoadingScreen(false))
        }
        if (response && response.data.success) {
            setRecentData(response.data.studyModules.data)
        }
    }

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/resource/study/getAllStudyModules', {pageNumber, pageSize, searchStr, sort})
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }
        if (response && response.data.success) {
            setTotalPages(response.data.studyModules.totalPages)
            setMediaList(response.data.studyModules.data)
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
            <div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="video-head-text">Recently Added</span>
                    <Button className='ml-2' color='primary' onClick={() => dispatch(showAddStudyModal(true))}>
                        <PlusCircle size={15}/>
                        <span className='align-middle ml-50'>Create Content</span>
                    </Button>
                </div>

                <div class="mb-1" style={{overflowX: 'auto', paddingBottom: 5}}>
                    <div class="d-flex">
                        {recentData.map((item, idx) => <div class="mr-2">
                            <ResourceRecentCard
                                _id={item._id}
                                title={item.subjectTitle} des={item.topics.join(', ')}
                                date={undefined}
                                creatorName={item.creatorFirstName}
                                creatorAvatar={item.creatorAvatar}
                                level={item.educationLevel.title}
                                onEdit={() => {
                                    setEditingRow(item)
                                    dispatch(showAddStudyModal(true))
                                }}
                                onDelete={() => {
                                    deleteMediaList([item._id])
                                }}
                                onDuplicate={() => {
                                    setEditingRow(item)
                                    dispatch(showAddStudyModal(true))
                                }}

                            />
                        </div>)}
                    </div>
                </div>
            </div>
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

            <AddStudyModal/>
        </Fragment>
    )
}

export default Study