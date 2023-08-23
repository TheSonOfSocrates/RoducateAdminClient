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
import './Game.css'
import Avatar from "../../../@core/components/avatar";
import {AddGame} from "../../modals/AddGame/AddGame";
import {showAddGameModal} from "../../../redux/actions/modal";
import GameCard from "../../components/GameCard/GameCard";

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const Game = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [recentGame, setRecentGame] = useState([])
    const [videoCnt, setVideoCnt] = useState([0, 0, 0])

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
            name: 'Game name',
            selector: 'title',
            sortable: true,
            minWidth: '350px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V5H14.5C16.4891 5 18.3968 5.79018 19.8033 7.1967C21.2098 8.60322 22 10.5109 22 12.5C22 14.4891 21.2098 16.3968 19.8033 17.8033C18.3968 19.2098 16.4891 20 14.5 20H9.5C7.51088 20 5.60322 19.2098 4.1967 17.8033C2.79018 16.3968 2 14.4891 2 12.5C2 10.5109 2.79018 8.60322 4.1967 7.1967C5.60322 5.79018 7.51088 5 9.5 5H11V4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3ZM14.5 7H9.5C8.04131 7 6.64236 7.57946 5.61091 8.61091C4.57946 9.64236 4 11.0413 4 12.5C4 13.9587 4.57946 15.3576 5.61091 16.3891C6.64236 17.4205 8.04131 18 9.5 18H14.5C15.9587 18 17.3576 17.4205 18.3891 16.3891C19.4205 15.3576 20 13.9587 20 12.5C20 11.0413 19.4205 9.64236 18.3891 8.61091C17.3576 7.57946 15.9587 7 14.5 7ZM15.5 10C15.7449 10 15.9813 10.09 16.1644 10.2527C16.3474 10.4155 16.4643 10.6397 16.493 10.883L16.5 11V11.5H17C17.2549 11.5003 17.5 11.5979 17.6854 11.7728C17.8707 11.9478 17.9822 12.187 17.9972 12.4414C18.0121 12.6958 17.9293 12.9464 17.7657 13.1418C17.6021 13.3373 17.3701 13.4629 17.117 13.493L17 13.5H16.5V14C16.4997 14.2549 16.4021 14.5 16.2272 14.6854C16.0522 14.8707 15.813 14.9822 15.5586 14.9972C15.3042 15.0121 15.0536 14.9293 14.8582 14.7657C14.6627 14.6021 14.5371 14.3701 14.507 14.117L14.5 14V13.5H14C13.7451 13.4997 13.5 13.4021 13.3146 13.2272C13.1293 13.0522 13.0178 12.813 13.0028 12.5586C12.9879 12.3042 13.0707 12.0536 13.2343 11.8582C13.3979 11.6627 13.6299 11.5371 13.883 11.507L14 11.5H14.5V11C14.5 10.7348 14.6054 10.4804 14.7929 10.2929C14.9804 10.1054 15.2348 10 15.5 10ZM8.5 10C9.16304 10 9.79893 10.2634 10.2678 10.7322C10.7366 11.2011 11 11.837 11 12.5C11 13.163 10.7366 13.7989 10.2678 14.2678C9.79893 14.7366 9.16304 15 8.5 15C7.83696 15 7.20107 14.7366 6.73223 14.2678C6.26339 13.7989 6 13.163 6 12.5C6 11.837 6.26339 11.2011 6.73223 10.7322C7.20107 10.2634 7.83696 10 8.5 10ZM8.5 12C8.36739 12 8.24021 12.0527 8.14645 12.1464C8.05268 12.2402 8 12.3674 8 12.5C8 12.6326 8.05268 12.7598 8.14645 12.8536C8.24021 12.9473 8.36739 13 8.5 13C8.63261 13 8.75979 12.9473 8.85355 12.8536C8.94732 12.7598 9 12.6326 9 12.5C9 12.3674 8.94732 12.2402 8.85355 12.1464C8.75979 12.0527 8.63261 12 8.5 12Z"
                                fill="#747474"/>
                        </svg>
                        &nbsp;
                        <span>{row.title}</span>
                    </div>
                )
            }
        },
        {
            name: 'Level',
            selector: 'difficulty',
            sortable: true,
            minWidth: '50px'
        },
        {
            name: 'Age Limit',
            selector: 'ageLimit',
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
            name: 'Uploaded by',
            selector: 'duration',
            sortable: true,
            minWidth: '100px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center justify-content-center">
                        <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${row?.createdBy.avatar}`}
                                imgHeight='30' imgWidth='30' status='online'/>&nbsp;
                        <span>{row?.createdBy.name}</span>
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
                                                  dispatch(showAddGameModal(true))
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
            response = await axios.post('/resource/game/getAll', {
                "pageNumber": 1,
                "pageSize": 5
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
            setRecentGame(response.data.data)
        }

        response = undefined
        try {
            response = await axios.get('/resource/game/overview')
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }
        if (response) {
            setVideoCnt([response.data.totalGames, response.data.totalGames, response.data.removedGames])
        }
    }

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/resource/game/getAll', {pageNumber, pageSize, searchStr, sort})
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
                    const res = await axios.post(`/resource/game/deleteGames`, {ids})
                    dispatch(showLoadingScreen(false))
                    if (res.data.success) {
                        await MySwal.fire({
                            title: 'Good job!',
                            text: 'You deleted video successfully!',
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
                    <div className="d-flex">
                        <span className="video-head-text">All Games</span>
                        <span className="video-head-all-cnt">{videoCnt[0]}
                            <svg width="25" height="24" viewBox="0 0 25 24"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.086 6.99982L6.136 16.9498C5.95384 17.1384 5.85305 17.391 5.85533 17.6532C5.8576 17.9154 5.96277 18.1662 6.14818 18.3516C6.33359 18.537 6.5844 18.6422 6.8466 18.6445C7.1088 18.6468 7.3614 18.546 7.55 18.3638L17.5 8.41382L17.5 13.9998C17.5 14.265 17.6054 14.5194 17.7929 14.7069C17.9804 14.8945 18.2348 14.9998 18.5 14.9998C18.7652 14.9998 19.0196 14.8945 19.2071 14.7069C19.3946 14.5194 19.5 14.265 19.5 13.9998L19.5 5.99982C19.5 5.7346 19.3946 5.48025 19.2071 5.29271C19.0196 5.10518 18.7652 4.99982 18.5 4.99982L10.5 4.99982C10.2348 4.99982 9.98043 5.10518 9.79289 5.29271C9.60536 5.48025 9.5 5.7346 9.5 5.99982C9.5 6.26504 9.60536 6.51939 9.79289 6.70693C9.98043 6.89446 10.2348 6.99982 10.5 6.99982L16.086 6.99982Z"
                                fill="#00AB5F"/>
                            </svg>
                        </span>
                        <span className="video-head-text">Removed</span>
                        <span className="video-head-removed-cnt">{videoCnt[1]}
                            <svg width="25" height="24" viewBox="0 0 25 24"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.914 17.0002L18.864 7.05018C19.0462 6.86158 19.147 6.60898 19.1447 6.34678C19.1424 6.08458 19.0372 5.83377 18.8518 5.64836C18.6664 5.46295 18.4156 5.35778 18.1534 5.35551C17.8912 5.35323 17.6386 5.45402 17.45 5.63618L7.5 15.5862V10.0002C7.5 9.73496 7.39464 9.48061 7.20711 9.29307C7.01957 9.10554 6.76522 9.00018 6.5 9.00018C6.23478 9.00018 5.98043 9.10554 5.79289 9.29307C5.60536 9.48061 5.5 9.73496 5.5 10.0002V18.0002C5.5 18.2654 5.60536 18.5198 5.79289 18.7073C5.98043 18.8948 6.23478 19.0002 6.5 19.0002H14.5C14.7652 19.0002 15.0196 18.8948 15.2071 18.7073C15.3946 18.5198 15.5 18.2654 15.5 18.0002C15.5 17.735 15.3946 17.4806 15.2071 17.2931C15.0196 17.1055 14.7652 17.0002 14.5 17.0002H8.914Z"
                                    fill="#FC7753"/>
                            </svg>
                        </span>
                        <span className="video-head-text">Played</span>
                        <span className="video-head-views-cnt">{videoCnt[2]}
                            <svg width="25" height="24" viewBox="0 0 25 24"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.5 4C15.287 4 17.763 5.257 19.526 6.813C20.411 7.594 21.14 8.471 21.654 9.344C22.159 10.201 22.5 11.13 22.5 12C22.5 12.87 22.16 13.799 21.654 14.656C21.14 15.529 20.411 16.406 19.526 17.187C17.763 18.743 15.286 20 12.5 20C9.713 20 7.237 18.743 5.474 17.187C4.589 16.406 3.86 15.529 3.346 14.656C2.84 13.799 2.5 12.87 2.5 12C2.5 11.13 2.84 10.201 3.346 9.344C3.86 8.471 4.589 7.594 5.474 6.813C7.237 5.257 9.714 4 12.5 4ZM12.5 6C10.316 6 8.292 6.993 6.798 8.312C6.054 8.968 5.466 9.685 5.069 10.359C4.663 11.049 4.5 11.62 4.5 12C4.5 12.38 4.663 12.951 5.069 13.641C5.466 14.315 6.054 15.031 6.798 15.688C8.292 17.007 10.316 18 12.5 18C14.684 18 16.708 17.007 18.202 15.688C18.946 15.031 19.534 14.315 19.931 13.641C20.337 12.951 20.5 12.38 20.5 12C20.5 11.62 20.337 11.049 19.931 10.359C19.534 9.685 18.946 8.969 18.202 8.312C16.708 6.993 14.684 6 12.5 6ZM12.5 9C12.588 9 12.675 9.004 12.761 9.011C12.5439 9.39185 12.4579 9.8335 12.5163 10.268C12.5747 10.7025 12.7743 11.1057 13.0843 11.4157C13.3943 11.7257 13.7975 11.9253 14.232 11.9837C14.6665 12.0421 15.1081 11.9561 15.489 11.739C15.5416 12.3412 15.411 12.9452 15.1145 13.4719C14.8179 13.9986 14.3692 14.4234 13.827 14.6907C13.2849 14.958 12.6746 15.0553 12.0762 14.9699C11.4778 14.8844 10.9192 14.6202 10.4736 14.2118C10.0279 13.8034 9.71603 13.27 9.57876 12.6813C9.44149 12.0926 9.48524 11.4762 9.70429 10.9128C9.92334 10.3495 10.3075 9.8654 10.8063 9.52407C11.3052 9.18274 11.8955 9.00008 12.5 9Z"
                                    fill="#8840E6"/>
                            </svg>
                        </span>
                    </div>
                    <Button className='ml-2' color='primary' onClick={() => dispatch(showAddGameModal(true))}>
                        <PlusCircle size={15}/>
                        <span className='align-middle ml-50'>Add Game</span>
                    </Button>
                </div>

                <div class="d-flex mb-1" style={{overflowX: 'auto'}}>
                    {recentGame.map((item, idx) => <div class="mr-2"><GameCard game={item}/></div>)}
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

            <AddGame game={editingRow} onChange={() => {
                loadData();
                loadRecentInfo()
            }}/>
        </Fragment>
    )
}

export default Game