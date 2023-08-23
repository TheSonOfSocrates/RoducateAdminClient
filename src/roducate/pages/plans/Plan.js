// ** React Imports
import React, {forwardRef, Fragment, useEffect, useState} from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {Archive, Check, ChevronDown, Edit, MoreVertical, PlusCircle, Trash, X} from 'react-feather'
import {
    Badge,
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
import {CreatePlanModal} from "../../modals/CreatePlanModal/CreatePlanModal";
import {showCreatePlanModal} from "../../../redux/actions/modal";
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {showLoadingScreen} from '@store/actions/layout'
import {AddSubscriptionPlanModal} from "../../modals/AddSubscriptionPlanModal/AddSubscriptionPlanModal";
import {showSubscriptionPlanModal} from '@store/actions/modal'

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const Plan = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    // data table model
    const [plans, setPlans] = useState([])
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
            name: '#',
            selector: '_id',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: 'Status',
            selector: 'isActive',
            sortable: true,
            minWidth: '150px',
            cell: row => {
                return (
                    <div>
                        {isActive[row.isActive].icon}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {row.isActive && <span style={{color: "#00AB5F"}}>Active</span>}
                        {!row.isActive && <span style={{color: "#FC7753"}}>Inactive</span>}
                    </div>
                )
            }
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
            minWidth: '50px'
        },
        {
            name: 'Subscription Type',
            selector: 'isFullSubscription',
            sortable: true,
            minWidth: '250px',
            cell: row => {
                return <div>{row.isFullSubscription ? 'Full Subscription' : row.modules.join(',')}</div>
            }
        },
        {
            name: 'Created at',
            selector: 'createdAt',
            sortable: true,
            minWidth: '150px',
            cell: row => {
                return <div>{moment(row.createdAt).format('DD MMM YYYY')}</div>
            }
        },
        {
            name: 'Duration',
            selector: 'duration',
            sortable: true,
            minWidth: '100px',
            cell: row => {
                return (
                    <Badge color="light-success" pill>
                        {row.duration + row.durationType}
                    </Badge>
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
                                              onClick={(e) => reserveActivationSubscriptionPlan(e, row._id, !row.isActive)}>
                                    <Archive size={15}/>
                                    <span
                                        className='align-middle ml-50'>{row.isActive ? 'Deactivate' : 'Activate'}</span>
                                </DropdownItem>
                                <DropdownItem tag='a' href='#' className='w-100'
                                              onClick={(e) => {
                                                  e.preventDefault()
                                                  deletePlans([row._id])
                                              }}>
                                    <Trash size={15}/>
                                    <span className='align-middle ml-50'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Edit size={15} onClick={() => {
                            const plan = plans.find(item => item._id === row._id)
                            setEditingRow(plan)
                            console.log(plan)
                            dispatch(showSubscriptionPlanModal())
                        }}/>
                    </div>
                )
            }
        }
    ]

    const MySwal = withReactContent(Swal)

    const isActive = {
        "true": {icon: <Avatar color='light-success' icon={<Check size={14}/>}/>},
        "false": {icon: <Avatar color='light-danger' icon={<X size={14}/>}/>}
    }

    useEffect(async () => {
        if (!store.isVisibleCreatePlan)
            loadData()
    }, [store.isVisibleCreatePlan, pageNumber, pageSize, sort])

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/plan/getAll', {pageNumber, pageSize, searchStr, sort})
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }
        if (response && response.data.success) {
            setTotalPages(response.data.subscriptionPlans.totalPages)
            setPlans(response.data.subscriptionPlans.data)
        }

        dispatch(showLoadingScreen(false))
    }

    const deletePlans = async (ids) => {
        dispatch(showLoadingScreen(true))
        try {
            const res = await axios.post('/plan/deletePlans', {ids})
            dispatch(showLoadingScreen(false))
            if (res.data.success) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: 'You deleted subscription plan successfully!',
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

    const reserveActivationSubscriptionPlan = async (e, id, isActive) => {
        e.preventDefault()

        dispatch(showLoadingScreen(true))
        try {
            const res = await axios.post(`/plan/activePlan/${id}`, {isActive})
            dispatch(showLoadingScreen(false))
            if (res.data.success) {
                await MySwal.fire({
                    title: 'Good job!',
                    text: 'You reserved plan status successfully!',
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
                            <DropdownItem className='w-100' onClick={() => deletePlans(selectedList)}>
                                <span className='align-middle ml-50'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <Button className='ml-2' color='primary' onClick={() => dispatch(showCreatePlanModal())}>
                        <PlusCircle size={15}/>
                        <span className='align-middle ml-50'>Create Plan</span>
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
                    data={plans}
                    selectableRowsComponent={BootstrapCheckbox}
                    onSelectedRowsChange={(e) => setSelectedList(e.selectedRows.map(item => (item._id)))}
                    onSort={(e, sortOrder) => setSort({sortBy: e.selector, sortOrder})}
                />
            </Card>

            <CreatePlanModal/>
            <AddSubscriptionPlanModal onChanged={loadData} editingRow={editingRow} isEdit={true}/>
        </Fragment>
    )
}

export default Plan
