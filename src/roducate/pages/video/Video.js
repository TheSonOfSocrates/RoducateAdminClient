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
import './Video.css'
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

const Video = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [recentVideo, setRecentVideo] = useState([])
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
            name: 'Title',
            selector: 'title',
            sortable: true,
            minWidth: '350px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M20 3C20.5046 2.99984 20.9906 3.19041 21.3605 3.5335C21.7305 3.87659 21.9572 4.34684 21.995 4.85L22 5V19C22.0002 19.5046 21.8096 19.9906 21.4665 20.3605C21.1234 20.7305 20.6532 20.9572 20.15 20.995L20 21H4C3.49542 21.0002 3.00943 20.8096 2.63945 20.4665C2.26947 20.1234 2.04284 19.6532 2.005 19.15L2 19V5C1.99984 4.49542 2.19041 4.00943 2.5335 3.63945C2.87659 3.26947 3.34684 3.04284 3.85 3.005L4 3H20ZM20 5H4V19H20V5ZM10.34 7.638L10.858 7.868L11.196 8.028L11.583 8.218L12.013 8.436L12.483 8.686L12.99 8.966L13.256 9.118L13.774 9.423L14.248 9.715L14.678 9.988L15.058 10.241L15.538 10.571L15.902 10.834L15.997 10.904C16.1513 11.0188 16.2767 11.1682 16.363 11.34C16.4494 11.5119 16.4943 11.7016 16.4943 11.894C16.4943 12.0864 16.4494 12.2761 16.363 12.448C16.2767 12.6198 16.1513 12.7692 15.997 12.884L15.674 13.119L15.234 13.427L14.878 13.666L14.473 13.929L14.02 14.212L13.521 14.512L12.987 14.821L12.478 15.103L12.007 15.353L11.577 15.573L11.191 15.761L10.569 16.049L10.339 16.149C10.1624 16.2251 9.97051 16.2589 9.77856 16.2476C9.58662 16.2364 9.39995 16.1805 9.23346 16.0843C9.06696 15.9881 8.92524 15.8544 8.8196 15.6937C8.71396 15.5331 8.64732 15.35 8.625 15.159L8.567 14.594L8.535 14.22L8.493 13.556L8.47 13.048L8.455 12.493C8.45322 12.395 8.45189 12.297 8.451 12.199L8.449 11.894C8.449 11.687 8.451 11.487 8.455 11.294L8.47 10.739L8.493 10.232L8.52 9.775L8.55 9.374L8.625 8.63C8.64719 8.43882 8.71376 8.25547 8.81939 8.09458C8.92502 7.93369 9.0668 7.79972 9.2334 7.70335C9.4 7.60698 9.58682 7.55089 9.77896 7.53954C9.97109 7.5282 10.1632 7.56191 10.34 7.638ZM10.951 10.139L10.515 9.921L10.486 10.408L10.464 10.959L10.451 11.569L10.449 11.894L10.451 12.219L10.464 12.828L10.474 13.111L10.5 13.631L10.515 13.866L10.949 13.648L11.436 13.392L11.971 13.098L12.255 12.936L12.806 12.61L13.3 12.304L13.736 12.024L13.932 11.894L13.525 11.624L13.059 11.33C12.7938 11.1658 12.5261 11.0058 12.256 10.85L11.973 10.689L11.439 10.395L10.951 10.139Z"
                                  fill="grey"/>
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
                                    dispatch(showMediaPlayModal(true, 'video', [row.mediaURL], row.title, row.description, row._id))
                                }}>
                                    <span className='align-middle ml-50'>View</span>
                                </DropdownItem>
                                <DropdownItem tag='a' href='#' className='w-100'
                                              onClick={async (e) => {
                                                  dispatch(showLoadingScreen(true))
                                                  let response;
                                                  try {
                                                      response = await axios.post(`/resource/video/${row.videoId}/detail`)
                                                  } catch (e) {
                                                      dispatch(showLoadingScreen(false))

                                                      toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                                                          transition: Slide,
                                                          hideProgressBar: true,
                                                          autoClose: 2000
                                                      })
                                                  }

                                                  dispatch(showLoadingScreen(false))

                                                  setEditingRow(response.data.videoDetails)
                                                  dispatch(showAddMediaModal())
                                              }}>
                                    <span className='align-middle ml-50'>Edit</span>
                                </DropdownItem>
                                <DropdownItem tag='a' href='#' className='w-100' onClick={async (e) => {
                                    dispatch(showLoadingScreen(true))
                                    let response;
                                    try {
                                        response = await axios.post(`/resource/video/${row.videoId}/detail`)
                                    } catch (e) {
                                        dispatch(showLoadingScreen(false))

                                        toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                                            transition: Slide,
                                            hideProgressBar: true,
                                            autoClose: 2000
                                        })
                                    }

                                    dispatch(showLoadingScreen(false))

                                    setEditingRow(response.data.videoDetails)
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
            response = await axios.post('/resource/video/getRecentlyVideosAndTotoalInfo')
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }
        if (response && response.data.success) {
            setRecentVideo(response.data.videos)
            setVideoCnt([response.data.totalVideoStoreCount, response.data.totalViews, response.data.removedCount])
        }
    }

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/resource/video/getAllVideos', {pageNumber, pageSize, searchStr, sort})
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }
        if (response && response.data.success) {
            setTotalPages(response.data.videos.totalPages)
            setMediaList(response.data.videos.data)
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
                    const res = await axios.post(`/resource/videoStore/delete`, {ids})
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
                        <span className="video-head-text">All Videos</span>
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
                        <span className="video-head-text">Views</span>
                        <span className="video-head-views-cnt">{videoCnt[2]}
                            <svg width="25" height="24" viewBox="0 0 25 24"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.5 4C15.287 4 17.763 5.257 19.526 6.813C20.411 7.594 21.14 8.471 21.654 9.344C22.159 10.201 22.5 11.13 22.5 12C22.5 12.87 22.16 13.799 21.654 14.656C21.14 15.529 20.411 16.406 19.526 17.187C17.763 18.743 15.286 20 12.5 20C9.713 20 7.237 18.743 5.474 17.187C4.589 16.406 3.86 15.529 3.346 14.656C2.84 13.799 2.5 12.87 2.5 12C2.5 11.13 2.84 10.201 3.346 9.344C3.86 8.471 4.589 7.594 5.474 6.813C7.237 5.257 9.714 4 12.5 4ZM12.5 6C10.316 6 8.292 6.993 6.798 8.312C6.054 8.968 5.466 9.685 5.069 10.359C4.663 11.049 4.5 11.62 4.5 12C4.5 12.38 4.663 12.951 5.069 13.641C5.466 14.315 6.054 15.031 6.798 15.688C8.292 17.007 10.316 18 12.5 18C14.684 18 16.708 17.007 18.202 15.688C18.946 15.031 19.534 14.315 19.931 13.641C20.337 12.951 20.5 12.38 20.5 12C20.5 11.62 20.337 11.049 19.931 10.359C19.534 9.685 18.946 8.969 18.202 8.312C16.708 6.993 14.684 6 12.5 6ZM12.5 9C12.588 9 12.675 9.004 12.761 9.011C12.5439 9.39185 12.4579 9.8335 12.5163 10.268C12.5747 10.7025 12.7743 11.1057 13.0843 11.4157C13.3943 11.7257 13.7975 11.9253 14.232 11.9837C14.6665 12.0421 15.1081 11.9561 15.489 11.739C15.5416 12.3412 15.411 12.9452 15.1145 13.4719C14.8179 13.9986 14.3692 14.4234 13.827 14.6907C13.2849 14.958 12.6746 15.0553 12.0762 14.9699C11.4778 14.8844 10.9192 14.6202 10.4736 14.2118C10.0279 13.8034 9.71603 13.27 9.57876 12.6813C9.44149 12.0926 9.48524 11.4762 9.70429 10.9128C9.92334 10.3495 10.3075 9.8654 10.8063 9.52407C11.3052 9.18274 11.8955 9.00008 12.5 9Z"
                                    fill="#8840E6"/>
                            </svg>
                        </span>
                    </div>
                    <Button className='ml-2' color='primary' onClick={() => dispatch(showAddMediaModal())}>
                        <PlusCircle size={15}/>
                        <span className='align-middle ml-50'>Add Video</span>
                    </Button>
                </div>

                <div class="d-flex mb-1" style={{overflowX: 'auto'}}>
                    {recentVideo.map((item, idx) => <div class="mr-2"><MediaCard media={item}/></div>)}
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

            <AddMedia type="video" media={editingRow} onChange={() => {
                loadData();
                loadRecentInfo()
            }}/>
        </Fragment>
    )
}

export default Video