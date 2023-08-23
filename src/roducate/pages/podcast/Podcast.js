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
import {showAddMediaModal} from '@store/actions/modal'
import {showMediaPlayModal} from '@store/actions/media'
import './Podcast.css'
import MediaCard from "../../components/MediaCard/MediaCard";
import {AddMedia} from "../../modals/AddMedia/AddMedia";
import Avatar from "../../../@core/components/avatar";

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const Podcast = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [recentPodcast, setRecentPodcast] = useState([])
    const [podcastCnt, setPodcastCnt] = useState([0, 0, 0])

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
            name: 'Title',
            selector: 'title',
            sortable: true,
            minWidth: '350px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 3C12.2449 3.00003 12.4813 3.08996 12.6644 3.25272C12.8474 3.41547 12.9643 3.63975 12.993 3.883L13 4V20C12.9997 20.2549 12.9021 20.5 12.7272 20.6854C12.5522 20.8707 12.313 20.9822 12.0586 20.9972C11.8042 21.0121 11.5536 20.9293 11.3582 20.7657C11.1627 20.6021 11.0371 20.3701 11.007 20.117L11 20V4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3ZM8 6C8.26522 6 8.51957 6.10536 8.70711 6.29289C8.89464 6.48043 9 6.73478 9 7V17C9 17.2652 8.89464 17.5196 8.70711 17.7071C8.51957 17.8946 8.26522 18 8 18C7.73478 18 7.48043 17.8946 7.29289 17.7071C7.10536 17.5196 7 17.2652 7 17V7C7 6.73478 7.10536 6.48043 7.29289 6.29289C7.48043 6.10536 7.73478 6 8 6ZM16 6C16.2652 6 16.5196 6.10536 16.7071 6.29289C16.8946 6.48043 17 6.73478 17 7V17C17 17.2652 16.8946 17.5196 16.7071 17.7071C16.5196 17.8946 16.2652 18 16 18C15.7348 18 15.4804 17.8946 15.2929 17.7071C15.1054 17.5196 15 17.2652 15 17V7C15 6.73478 15.1054 6.48043 15.2929 6.29289C15.4804 6.10536 15.7348 6 16 6ZM4 9C4.26522 9 4.51957 9.10536 4.70711 9.29289C4.89464 9.48043 5 9.73478 5 10V14C5 14.2652 4.89464 14.5196 4.70711 14.7071C4.51957 14.8946 4.26522 15 4 15C3.73478 15 3.48043 14.8946 3.29289 14.7071C3.10536 14.5196 3 14.2652 3 14V10C3 9.73478 3.10536 9.48043 3.29289 9.29289C3.48043 9.10536 3.73478 9 4 9ZM20 9C20.2449 9.00003 20.4813 9.08996 20.6644 9.25272C20.8474 9.41547 20.9643 9.63975 20.993 9.883L21 10V14C20.9997 14.2549 20.9021 14.5 20.7272 14.6854C20.5522 14.8707 20.313 14.9822 20.0586 14.9972C19.8042 15.0121 19.5536 14.9293 19.3582 14.7657C19.1627 14.6021 19.0371 14.3701 19.007 14.117L19 14V10C19 9.73478 19.1054 9.48043 19.2929 9.29289C19.4804 9.10536 19.7348 9 20 9Z"
                                fill="#CACACC"/>
                        </svg>
                        &nbsp;
                        <span>{row.title}</span>
                    </div>
                )
            }
        },
        {
            name: 'File Type',
            selector: 'orginalName',
            sortable: false,
            minWidth: '50px',
            cell: row => {
                return (
                    <div>
                        {row.mediaURL?.includes('.') ? row.mediaURL.split('.')[row.mediaURL.split('.').length - 1] : ''}
                    </div>
                )
            }
        },
        {
            name: 'Views',
            selector: 'viewsCount',
            sortable: true,
            minWidth: '50px'
        },
        {
            name: 'Size',
            selector: 'size',
            sortable: true,
            minWidth: '100px',
            cell: row => {
                return (
                    <div>
                        {(row.size / 1000000) + ' Mb'}
                    </div>
                )
            }
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
            name: 'Comment',
            selector: 'commentsCount',
            sortable: true,
            minWidth: '50px',
            cell: row => {
                return <div style={{color: '#8840E5'}}>{row.commentsCount}</div>
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
                        <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${row.uploadedUserAvatar}`}
                                imgHeight='30' imgWidth='30' status='online'/>&nbsp;
                        <span>{row.uploadedUserFristName}</span>
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
                                <DropdownItem tag='a' href='#' className='w-100' onClick={(e) => {
                                    dispatch(showMediaPlayModal(true, 'podcast', [row.mediaURL], row.title, row.description, row._id))
                                }}>
                                    <span className='align-middle ml-50'>View</span>
                                </DropdownItem>
                                <DropdownItem tag='a' href='#' className='w-100'
                                              onClick={async (e) => {
                                                  dispatch(showLoadingScreen(true))
                                                  let response;
                                                  try {
                                                      response = await axios.post(`/resource/podcast/${row.podcastId}/detail`)
                                                  } catch (e) {
                                                      dispatch(showLoadingScreen(false))

                                                      toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                                                          transition: Slide,
                                                          hideProgressBar: true,
                                                          autoClose: 2000
                                                      })
                                                  }

                                                  dispatch(showLoadingScreen(false))

                                                  setEditingRow(response.data.podcastDetails)
                                                  dispatch(showAddMediaModal())
                                              }}>
                                    <span className='align-middle ml-50'>Edit</span>
                                </DropdownItem>
                                <DropdownItem tag='a' href='#' className='w-100' onClick={async (e) => {
                                    dispatch(showLoadingScreen(true))
                                    let response;
                                    try {
                                        response = await axios.post(`/resource/podcast/${row.podcastId}/detail`)
                                    } catch (e) {
                                        dispatch(showLoadingScreen(false))

                                        toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                                            transition: Slide,
                                            hideProgressBar: true,
                                            autoClose: 2000
                                        })
                                    }

                                    dispatch(showLoadingScreen(false))

                                    setEditingRow(response.data.podcastDetails)
                                    dispatch(showAddMediaModal())
                                }}>
                                    <span className='align-middle ml-50' style={{color: '#8840E5'}}>Upload</span>
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
            response = await axios.post('/resource/podcast/recently')
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }
        if (response && response.data.success) {
            setRecentPodcast(response.data.podcasts)
            setPodcastCnt([response.data.totalPodcastStoreCount, response.data.totalViews, response.data.removedCount])
        }
    }

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/resource/podcast/getAllPodcasts', {pageNumber, pageSize, searchStr, sort})
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }
        if (response && response.data.success) {
            setTotalPages(response.data.podcasts.totalPages)
            setMediaList(response.data.podcasts.data)
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
                    const res = await axios.post(`/resource/podcastStore/delete`, {ids})
                    dispatch(showLoadingScreen(false))
                    if (res.data.success) {
                        await MySwal.fire({
                            title: 'Good job!',
                            text: 'You deleted podcast successfully!',
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
                    <span className="podcast-head-text">Recently Added</span>
                    <div className="d-flex">
                        <span className="podcast-head-text">All Podcasts</span>
                        <span className="podcast-head-all-cnt">{podcastCnt[0]}
                            <svg width="25" height="24" viewBox="0 0 25 24"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.086 6.99982L6.136 16.9498C5.95384 17.1384 5.85305 17.391 5.85533 17.6532C5.8576 17.9154 5.96277 18.1662 6.14818 18.3516C6.33359 18.537 6.5844 18.6422 6.8466 18.6445C7.1088 18.6468 7.3614 18.546 7.55 18.3638L17.5 8.41382L17.5 13.9998C17.5 14.265 17.6054 14.5194 17.7929 14.7069C17.9804 14.8945 18.2348 14.9998 18.5 14.9998C18.7652 14.9998 19.0196 14.8945 19.2071 14.7069C19.3946 14.5194 19.5 14.265 19.5 13.9998L19.5 5.99982C19.5 5.7346 19.3946 5.48025 19.2071 5.29271C19.0196 5.10518 18.7652 4.99982 18.5 4.99982L10.5 4.99982C10.2348 4.99982 9.98043 5.10518 9.79289 5.29271C9.60536 5.48025 9.5 5.7346 9.5 5.99982C9.5 6.26504 9.60536 6.51939 9.79289 6.70693C9.98043 6.89446 10.2348 6.99982 10.5 6.99982L16.086 6.99982Z"
                                fill="#00AB5F"/>
                            </svg>
                        </span>
                        <span className="podcast-head-text">Removed</span>
                        <span className="podcast-head-removed-cnt">{podcastCnt[1]}
                            <svg width="25" height="24" viewBox="0 0 25 24"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.914 17.0002L18.864 7.05018C19.0462 6.86158 19.147 6.60898 19.1447 6.34678C19.1424 6.08458 19.0372 5.83377 18.8518 5.64836C18.6664 5.46295 18.4156 5.35778 18.1534 5.35551C17.8912 5.35323 17.6386 5.45402 17.45 5.63618L7.5 15.5862V10.0002C7.5 9.73496 7.39464 9.48061 7.20711 9.29307C7.01957 9.10554 6.76522 9.00018 6.5 9.00018C6.23478 9.00018 5.98043 9.10554 5.79289 9.29307C5.60536 9.48061 5.5 9.73496 5.5 10.0002V18.0002C5.5 18.2654 5.60536 18.5198 5.79289 18.7073C5.98043 18.8948 6.23478 19.0002 6.5 19.0002H14.5C14.7652 19.0002 15.0196 18.8948 15.2071 18.7073C15.3946 18.5198 15.5 18.2654 15.5 18.0002C15.5 17.735 15.3946 17.4806 15.2071 17.2931C15.0196 17.1055 14.7652 17.0002 14.5 17.0002H8.914Z"
                                    fill="#FC7753"/>
                            </svg>
                        </span>
                        <span className="podcast-head-text">Plays</span>
                        <span className="podcast-head-views-cnt">{podcastCnt[2]}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M7.57541 5.70772C7.36906 7.79698 7.26827 9.89531 7.27341 11.9947C7.27341 14.7957 7.44341 16.9917 7.57541 18.2837C9.48757 17.4157 11.3549 16.4521 13.1704 15.3967C14.9916 14.3524 16.7591 13.2173 18.4664 11.9957C16.7594 10.773 14.9922 9.63661 13.1714 8.59072C11.3554 7.5369 9.48771 6.57469 7.57541 5.70772ZM5.67041 4.75972C5.69722 4.53257 5.7767 4.31481 5.90253 4.1238C6.02835 3.93278 6.19704 3.77379 6.39516 3.65948C6.59328 3.54518 6.81536 3.47871 7.0437 3.46539C7.27204 3.45206 7.50034 3.49224 7.71041 3.58272C8.77241 4.03672 11.1524 5.11572 14.1724 6.85872C17.1934 8.60272 19.3184 10.1257 20.2414 10.8167C21.0294 11.4077 21.0314 12.5797 20.2424 13.1727C19.3284 13.8597 17.2294 15.3627 14.1724 17.1287C11.1124 18.8947 8.76041 19.9607 7.70841 20.4087C6.80241 20.7957 5.78841 20.2087 5.67041 19.2317C5.53241 18.0897 5.27441 15.4967 5.27441 11.9947C5.27441 8.49472 5.53141 5.90272 5.67041 4.75972Z"
                                      fill="#8840E6"/>
                            </svg>
                        </span>
                    </div>
                    <Button className='ml-2' color='primary' onClick={() => dispatch(showAddMediaModal())}>
                        <PlusCircle size={15}/>
                        <span className='align-middle ml-50'>Add Podcast</span>
                    </Button>
                </div>

                <div class="d-flex mb-1" style={{overflowX: 'auto'}}>
                    {recentPodcast.map((item, idx) => <div class="mr-2"><MediaCard type="podcast" media={item}/></div>)}
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

            <AddMedia type="podcast" media={editingRow} onChange={() => {
                loadData();
                loadRecentInfo()
            }}/>
        </Fragment>
    )
}

export default Podcast