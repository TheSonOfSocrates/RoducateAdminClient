// ** React Imports
import React, {forwardRef, Fragment, useEffect, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {ChevronDown, MoreVertical, Trash} from 'react-feather'
import {
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
import './MarketProduct.css'
import Avatar from "../../../@core/components/avatar";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import {showCreateMockExam} from "../../../redux/actions/modal";

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const MarketProduct = () => {
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
            name: 'Product name',
            sortable: true,
            minWidth: '250px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center justify-content-center">
                        <img style={{height: '30px', width: '30px', marginRight: 10}}
                             src={process.env.REACT_APP_3BUCKET_URL + row.images[0]}/>&nbsp;
                        <div>
                            <span className="datatable-first-column">{row.title}</span><br/>
                        </div>
                    </div>
                )
            }
        },
        {
            name: 'Rating',
            sortable: true,
            minWidth: '50px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.6562 7.14863L11.8375 9.60863L12.6818 13.2711C12.7265 13.4626 12.7138 13.663 12.6452 13.8472C12.5766 14.0315 12.4552 14.1914 12.2962 14.3071C12.1372 14.4227 11.9477 14.489 11.7512 14.4975C11.5548 14.5059 11.3602 14.4564 11.1918 14.3549L7.99747 12.4174L4.80996 14.3549C4.64157 14.4564 4.447 14.5059 4.25057 14.4975C4.05415 14.489 3.86459 14.4227 3.70559 14.3071C3.54659 14.1914 3.42521 14.0315 3.35662 13.8472C3.28803 13.663 3.27528 13.4626 3.31996 13.2711L4.16309 9.61238L1.34372 7.14863C1.1946 7.02002 1.08677 6.85024 1.03375 6.66059C0.980734 6.47094 0.98489 6.26986 1.0457 6.08257C1.10651 5.89527 1.22126 5.7301 1.37556 5.60776C1.52987 5.48542 1.71686 5.41137 1.91309 5.39488L5.62934 5.073L7.07997 1.613C7.15572 1.43145 7.2835 1.27637 7.44721 1.16729C7.61092 1.05821 7.80324 1 7.99997 1C8.19669 1 8.38901 1.05821 8.55272 1.16729C8.71643 1.27637 8.84421 1.43145 8.91997 1.613L10.375 5.073L14.09 5.39488C14.2862 5.41137 14.4732 5.48542 14.6275 5.60776C14.7818 5.7301 14.8966 5.89527 14.9574 6.08257C15.0182 6.26986 15.0223 6.47094 14.9693 6.66059C14.9163 6.85024 14.8085 7.02002 14.6593 7.14863H14.6562Z"
                                fill="#FCB22B"/>
                        </svg>&nbsp;&nbsp;&nbsp;
                        <span className="datatable-primary-color">{row.rate}</span>
                    </div>
                )
            }
        },
        {
            name: 'Categories',
            sortable: true,
            minWidth: '250px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <img style={{height: '30px', width: '30px', marginRight: 10}}
                             src={process.env.REACT_APP_3BUCKET_URL + row.category.icon}/>
                        <span className="datatable-primary-color">{row.category.title}</span>
                    </div>
                )
            }
        },
        {
            name: 'Price',
            sortable: true,
            minWidth: '100px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <span>₦{row.price}</span>
                    </div>
                )
            }
        },
        {
            name: 'Store Name',
            selector: 'storeName',
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'Status',
            sortable: true,
            minWidth: '200px',
            cell: row => {
                return (
                    <div>
                        <div>
                            {isActive[row.stockAmount > 0].icon}&nbsp;&nbsp;&nbsp;
                            {row.stockAmount > 0 && <span style={{color: "#00AB5F"}}>Available</span>}
                            {row.stockAmount === 0 && <span style={{color: "#FC7753"}}>Sold Out</span>}
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
            icon: <Avatar color='light-success' icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                           xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#C5F2C7"/>
                <path
                    d="M9.649 5.09759C9.84631 5.02377 10.0619 5.01414 10.265 5.07009L10.351 5.09759L13.851 6.41009C14.0285 6.47663 14.1834 6.59224 14.2976 6.74344C14.4119 6.89464 14.4809 7.0752 14.4965 7.26409L14.5 7.34659V10.0281C14.5 10.8383 14.2812 11.6335 13.8668 12.3297C13.4524 13.0259 12.8577 13.5973 12.1455 13.9836L12.0125 14.0531L10.3355 14.8916C10.2432 14.9377 10.1423 14.9642 10.0392 14.9696C9.93616 14.9749 9.8331 14.9589 9.7365 14.9226L9.6645 14.8916L7.9875 14.0531C7.26281 13.6907 6.64939 13.1394 6.212 12.4574C5.77462 11.7754 5.52949 10.9879 5.5025 10.1781L5.5 10.0281V7.34659C5.5 7.15715 5.55381 6.97162 5.65517 6.81157C5.75652 6.65153 5.90125 6.52357 6.0725 6.44259L6.149 6.41009L9.649 5.09759ZM10 6.03409L6.5 7.34659V10.0281C6.50001 10.6556 6.66873 11.2716 6.98848 11.8115C7.30823 12.3514 7.76726 12.7954 8.3175 13.0971L8.435 13.1586L10 13.9411L11.565 13.1586C12.1264 12.878 12.6019 12.4516 12.9419 11.924C13.2819 11.3965 13.4738 10.7872 13.4975 10.1601L13.5 10.0281V7.34659L10 6.03409ZM9.5715 8.07609C9.63709 7.96659 9.74207 7.88631 9.86493 7.85172C9.9878 7.81712 10.1192 7.83083 10.2323 7.89002C10.3454 7.94922 10.4316 8.04942 10.4732 8.1701C10.5148 8.29078 10.5086 8.42279 10.456 8.53909L10.4285 8.59059L9.8835 9.50059H10.991C11.364 9.50059 11.6015 9.88659 11.451 10.2141L11.424 10.2651L10.429 11.9241C10.364 12.0348 10.2589 12.1162 10.1355 12.1515C10.0121 12.1869 9.87983 12.1734 9.76609 12.1139C9.65235 12.0544 9.56586 11.9534 9.52451 11.8319C9.48317 11.7104 9.49015 11.5776 9.544 11.4611L9.5715 11.4096L10.116 10.5001H9.0085C8.92404 10.5001 8.84093 10.4789 8.76677 10.4385C8.69261 10.3981 8.62978 10.3397 8.58401 10.2687C8.53825 10.1977 8.51102 10.1164 8.50481 10.0322C8.49861 9.94795 8.51363 9.86351 8.5485 9.78659L8.5755 9.73509L9.5705 8.07609H9.5715Z"
                    fill="#00C56D"/>
            </svg>}/>
        },
        "false": {
            icon: <Avatar color='light-danger' icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                          xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#FFFAF2"/>
                <path
                    d="M9.649 5.09759C9.84631 5.02377 10.0619 5.01414 10.265 5.07009L10.351 5.09759L13.851 6.41009C14.0285 6.47663 14.1834 6.59224 14.2976 6.74344C14.4119 6.89464 14.4809 7.0752 14.4965 7.26409L14.5 7.34659V10.0281C14.5 10.8383 14.2812 11.6335 13.8668 12.3297C13.4524 13.0259 12.8577 13.5973 12.1455 13.9836L12.0125 14.0531L10.3355 14.8916C10.2432 14.9377 10.1423 14.9642 10.0392 14.9696C9.93616 14.9749 9.8331 14.9589 9.7365 14.9226L9.6645 14.8916L7.9875 14.0531C7.26281 13.6907 6.64939 13.1394 6.212 12.4574C5.77462 11.7754 5.52949 10.9879 5.5025 10.1781L5.5 10.0281V7.34659C5.5 7.15715 5.55381 6.97162 5.65517 6.81157C5.75652 6.65153 5.90125 6.52357 6.0725 6.44259L6.149 6.41009L9.649 5.09759ZM10 6.03409L6.5 7.34659V10.0281C6.50001 10.6556 6.66873 11.2716 6.98848 11.8115C7.30823 12.3514 7.76726 12.7954 8.3175 13.0971L8.435 13.1586L10 13.9411L11.565 13.1586C12.1264 12.878 12.6019 12.4516 12.9419 11.924C13.2819 11.3965 13.4738 10.7872 13.4975 10.1601L13.5 10.0281V7.34659L10 6.03409ZM9.5715 8.07609C9.63709 7.96659 9.74207 7.88631 9.86493 7.85172C9.9878 7.81712 10.1192 7.83083 10.2323 7.89002C10.3454 7.94922 10.4316 8.04942 10.4732 8.1701C10.5148 8.29078 10.5086 8.42279 10.456 8.53909L10.4285 8.59059L9.8835 9.50059H10.991C11.364 9.50059 11.6015 9.88659 11.451 10.2141L11.424 10.2651L10.429 11.9241C10.364 12.0348 10.2589 12.1162 10.1355 12.1515C10.0121 12.1869 9.87983 12.1734 9.76609 12.1139C9.65235 12.0544 9.56586 11.9534 9.52451 11.8319C9.48317 11.7104 9.49015 11.5776 9.544 11.4611L9.5715 11.4096L10.116 10.5001H9.0085C8.92404 10.5001 8.84093 10.4789 8.76677 10.4385C8.69261 10.3981 8.62978 10.3397 8.58401 10.2687C8.53825 10.1977 8.51102 10.1164 8.50481 10.0322C8.49861 9.94795 8.51363 9.86351 8.5485 9.78659L8.5755 9.73509L9.5705 8.07609H9.5715Z"
                    fill="#FC7753"/>
            </svg>}/>
        }
    }

    useEffect(async () => {
        loadData()
    }, [pageNumber, pageSize, sort])

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/marketplace/getProducts', {pageNumber, pageSize, searchStr, sort})
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
        </Fragment>
    )
}

export default MarketProduct