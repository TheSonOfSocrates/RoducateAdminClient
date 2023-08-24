// ** React Imports
import React, {forwardRef, Fragment, useEffect, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {ChevronDown, MoreVertical, PlusCircle} from 'react-feather'
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
import './Products.css'
import {showAddProduct, showSaleDetailModal} from "../../../redux/actions/modal";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import {AddProduct} from "../../modals/AddProduct/AddProduct";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const Products = () => {
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
            name: 'IMAGE',
            sortable: true,
            minWidth: '50px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <img style={{height: '30px', width: '30px', marginRight: 10}}
                             src={process.env.REACT_APP_3BUCKET_URL + row.images[0]}/>
                    </div>
                )
            }
        },
        {
            name: 'PRODUCT NAME',
            sortable: true,
            minWidth: '350px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <span className="datatable-id-column">{row.title}</span>
                    </div>
                )
            }
        },
        {
            name: 'QTY',
            selector: 'stockAmount',
            sortable: true,
            width: '100px'
        },
        {
            name: 'Price',
            sortable: true,
            minWidth: '200px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <span>₦{row.price}</span>
                    </div>
                )
            }
        },
        {
            name: 'TOTAL',
            sortable: true,
            minWidth: '200px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <span>₦{row.totalPrice}</span>
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
                                                  dispatch(showSaleDetailModal(true))
                                              }}>
                                    <span className='align-middle ml-50'>View</span>
                                </DropdownItem>
                                <DropdownItem tag='a' href='#' className='w-100'
                                              onClick={async (e) => {
                                                  setEditingRow(row)
                                              }}>
                                    <span className='align-middle ml-50'>Export</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                )
            }
        }
    ]

    useEffect(async () => {
        loadData()
    }, [pageNumber, pageSize, sort])

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/product/getAllProducts', {pageNumber, pageSize, searchStr, sort})
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
            <Card className="p-2">
                <div>
                    <span className="sale-sale-overview">Sales Overview</span>
                </div>
                <div className="d-flex align-items-center">
                    <span className="sale-total-sales">Total 42.5k Sales</span>
                    <span className="sale-persent ml-1">+18%</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M12.707 15.7069C12.5194 15.8943 12.2651 15.9996 12 15.9996C11.7348 15.9996 11.4805 15.8943 11.293 15.7069L5.63598 10.0499C5.54047 9.95761 5.46428 9.84726 5.41188 9.72526C5.35947 9.60326 5.33188 9.47204 5.33073 9.33926C5.32957 9.20648 5.35487 9.0748 5.40516 8.9519C5.45544 8.829 5.52969 8.71735 5.62358 8.62346C5.71747 8.52957 5.82913 8.45531 5.95202 8.40503C6.07492 8.35475 6.2066 8.32945 6.33938 8.3306C6.47216 8.33176 6.60338 8.35934 6.72538 8.41175C6.84739 8.46416 6.95773 8.54034 7.04998 8.63585L12 13.5859L16.95 8.63585C17.1386 8.4537 17.3912 8.3529 17.6534 8.35518C17.9156 8.35746 18.1664 8.46263 18.3518 8.64804C18.5372 8.83344 18.6424 9.08426 18.6447 9.34645C18.6469 9.60865 18.5461 9.86125 18.364 10.0499L12.707 15.7069Z"
                              fill="#00BF6F"/>
                    </svg>
                </div>
                <div className="row mt-1">
                    <div className="col-4 d-flex align-items-center">
                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="40" height="40" rx="8" fill="#666CFF"/>
                            <rect y="0.5" width="40" height="40" rx="8" fill="white" fill-opacity="0.88"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M24 22.5C25.2885 22.5001 26.5272 22.9975 27.4578 23.8887C28.3884 24.7798 28.9391 25.9958 28.995 27.283L29 27.5V29.5C28.9997 29.7549 28.9021 30 28.7272 30.1854C28.5522 30.3707 28.313 30.4822 28.0586 30.4972C27.8042 30.5121 27.5536 30.4293 27.3582 30.2657C27.1627 30.1021 27.0371 29.8701 27.007 29.617L27 29.5V27.5C27 26.7348 26.7077 25.9985 26.1827 25.4417C25.6578 24.885 24.9399 24.5499 24.176 24.505L24 24.5H16C15.2348 24.5 14.4985 24.7923 13.9417 25.3173C13.385 25.8422 13.0499 26.5601 13.005 27.324L13 27.5V29.5C12.9997 29.7549 12.9021 30 12.7272 30.1854C12.5522 30.3707 12.313 30.4822 12.0586 30.4972C11.8042 30.5121 11.5536 30.4293 11.3582 30.2657C11.1627 30.1021 11.0371 29.8701 11.007 29.617L11 29.5V27.5C11.0001 26.2115 11.4975 24.9728 12.3887 24.0422C13.2798 23.1116 14.4958 22.5609 15.783 22.505L16 22.5H24ZM20 10.5C21.3261 10.5 22.5979 11.0268 23.5355 11.9645C24.4732 12.9021 25 14.1739 25 15.5C25 16.8261 24.4732 18.0979 23.5355 19.0355C22.5979 19.9732 21.3261 20.5 20 20.5C18.6739 20.5 17.4021 19.9732 16.4645 19.0355C15.5268 18.0979 15 16.8261 15 15.5C15 14.1739 15.5268 12.9021 16.4645 11.9645C17.4021 11.0268 18.6739 10.5 20 10.5ZM20 12.5C19.606 12.5 19.2159 12.5776 18.8519 12.7284C18.488 12.8791 18.1573 13.1001 17.8787 13.3787C17.6001 13.6573 17.3791 13.988 17.2284 14.3519C17.0776 14.7159 17 15.106 17 15.5C17 15.894 17.0776 16.2841 17.2284 16.6481C17.3791 17.012 17.6001 17.3427 17.8787 17.6213C18.1573 17.8999 18.488 18.1209 18.8519 18.2716C19.2159 18.4224 19.606 18.5 20 18.5C20.7956 18.5 21.5587 18.1839 22.1213 17.6213C22.6839 17.0587 23 16.2956 23 15.5C23 14.7044 22.6839 13.9413 22.1213 13.3787C21.5587 12.8161 20.7956 12.5 20 12.5Z"
                                  fill="#1E63EE"/>
                        </svg>
                        <div className="d-block ml-1">
                            <p className="sale-sub-overview" style={{marginBottom: 3}}>8458</p>
                            <p className="sale-sub-cus mb-0">Customers</p>
                        </div>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="40" height="40" rx="8" fill="#FDB528"/>
                            <rect y="0.5" width="40" height="40" rx="8" fill="white" fill-opacity="0.88"/>
                            <path
                                d="M21 11.5C21.5046 11.4998 21.9906 11.6904 22.3605 12.0335C22.7305 12.3766 22.9572 12.8468 22.995 13.35L23 13.5V29.5H17V13.5C16.9998 12.9954 17.1904 12.5094 17.5335 12.1395C17.8766 11.7695 18.3468 11.5428 18.85 11.505L19 11.5H21ZM28 16.5C28.5304 16.5 29.0391 16.7107 29.4142 17.0858C29.7893 17.4609 30 17.9696 30 18.5V27.5C30 28.0304 29.7893 28.5391 29.4142 28.9142C29.0391 29.2893 28.5304 29.5 28 29.5H25V16.5H28ZM15 19.5V29.5H12C11.4696 29.5 10.9609 29.2893 10.5858 28.9142C10.2107 28.5391 10 28.0304 10 27.5V21.5C10 20.9696 10.2107 20.4609 10.5858 20.0858C10.9609 19.7107 11.4696 19.5 12 19.5H15Z"
                                fill="#FCB22B"/>
                        </svg>
                        <div className="d-block ml-1">
                            <p className="sale-sub-overview" style={{marginBottom: 3}}>₦28.5m</p>
                            <p className="sale-sub-cus mb-0">Total Sales</p>
                        </div>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="40" height="40" rx="8" fill="#26C6F9"/>
                            <rect y="0.5" width="40" height="40" rx="8" fill="white" fill-opacity="0.88"/>
                            <path
                                d="M12 12.5C12.2449 12.5 12.4813 12.59 12.6644 12.7527C12.8474 12.9155 12.9643 13.1397 12.993 13.383L13 13.5V26.5H28C28.2549 26.5003 28.5 26.5979 28.6854 26.7728C28.8707 26.9478 28.9822 27.187 28.9972 27.4414C29.0121 27.6958 28.9293 27.9464 28.7657 28.1418C28.6021 28.3373 28.3701 28.4629 28.117 28.493L28 28.5H12C11.7551 28.5 11.5187 28.41 11.3356 28.2473C11.1526 28.0845 11.0357 27.8603 11.007 27.617L11 27.5V13.5C11 13.2348 11.1054 12.9804 11.2929 12.7929C11.4804 12.6054 11.7348 12.5 12 12.5ZM28.194 15.318C29.094 15.318 29.544 16.406 28.908 17.042L23.338 22.612C23.1317 22.8181 22.8521 22.9339 22.5605 22.9339C22.2689 22.9339 21.9893 22.8181 21.783 22.612L19.025 19.854L15.49 23.389C15.3025 23.5766 15.0481 23.6821 14.7829 23.6822C14.5176 23.6823 14.2631 23.577 14.0755 23.3895C13.8879 23.202 13.7824 22.9476 13.7823 22.6824C13.7822 22.4171 13.8875 22.1626 14.075 21.975L18.247 17.803C18.3492 17.7008 18.4704 17.6197 18.6039 17.5644C18.7374 17.5091 18.8805 17.4806 19.025 17.4806C19.1695 17.4806 19.3126 17.5091 19.4461 17.5644C19.5796 17.6197 19.7008 17.7008 19.803 17.803L22.561 20.561L25.803 17.318H25.389C25.1238 17.318 24.8694 17.2126 24.6819 17.0251C24.4944 16.8376 24.389 16.5832 24.389 16.318C24.389 16.0528 24.4944 15.7984 24.6819 15.6109C24.8694 15.4234 25.1238 15.318 25.389 15.318H28.194Z"
                                fill="#1E63EE"/>
                        </svg>
                        <div className="d-block ml-1">
                            <p className="sale-sub-overview" style={{marginBottom: 3}}>450</p>
                            <p className="sale-sub-cus mb-0">New Transactions</p>
                        </div>
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
                            <DropdownItem className='w-100' onClick={() => deleteMediaList(selectedList)}>
                                <span className='align-middle ml-50'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>

                    <Button className='ml-2' color='primary' onClick={() => dispatch(showAddProduct(true))}>
                        <PlusCircle size={15}/>
                        <span className='align-middle ml-50'>Add Product</span>
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

            <AddProduct/>
        </Fragment>
    )
}

export default Products