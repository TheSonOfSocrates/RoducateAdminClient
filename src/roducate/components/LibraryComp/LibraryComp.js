// ** React Imports
import React, {forwardRef, Fragment, useEffect, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {ChevronDown, Delete, MoreVertical, PlusCircle, Trash} from 'react-feather'
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
import {CreatePlanModal} from "../../modals/CreatePlanModal/CreatePlanModal";
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {showLoadingScreen} from '@store/actions/layout'
import {AddSubscriptionPlanModal} from "../../modals/AddSubscriptionPlanModal/AddSubscriptionPlanModal";
import {showAddMediaModal} from '@store/actions/modal'
import './LifeComp.css'
import MediaCard from "../../components/MediaCard/MediaCard";
import {AddMedia} from "../../modals/AddMedia/AddMedia";

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const LibraryComp = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.modal)

    const MySwal = withReactContent(Swal)

    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const [mediaList, setMediaList] = useState([])
    const [selectedList, setSelectedList] = useState([])

    const [selectedRow, setSelectedRow] = useState(undefined)

    useEffect(async () => {
        // loadData()
    }, [])

    const onChanged = () => {
        loadData()
    }

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/plan/getAll')
        } catch (e) {
            dispatch(showLoadingScreen(false))

            toast.error(<span style={{color: 'white'}}>{e.message}</span>, {
                transition: Slide,
                hideProgressBar: true,
                autoClose: 2000
            })
        }
        if (response && !response.errorMessage) {
            const result = response.data
            let tmpMediaList = []
            for (let media of result) {
                let tmpMedia = {
                    "subscriptionType": media.isFullSubscription ? 'Full Subscription' : media.modules.join(','),
                    "status": media.isActive,
                    "created_at": moment(media.createdAt).format('DD MMM YYYY')
                }

                tmpMedia['duration'] = media.duration + ' ' + media.durationType
                tmpMedia['price'] = media.price
                tmpMedia['region'] = media.region
                tmpMedia['_id'] = media._id

                tmpMediaList.push(tmpMedia)
            }

            setMediaList(tmpMediaList)
        }

        dispatch(showLoadingScreen(false))
    }

    const deleteMediaList = async (ids) => {
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

    const deleteMedia = async (e, id) => {
        e.preventDefault()
        deleteMediaList([id])
    }

    const editMedia = async (id) => {
        const media = mediaList.find(item => item._id === id)
        setSelectedRow(media)

        dispatch(showSubscriptionPlanModal())
    }

    const columns = [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: 'File Type',
            selector: 'status',
            sortable: true,
            minWidth: '150px',
            cell: row => {
                return (
                    <div>
                        {status[row.status].icon}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {row.status && <span style={{color: "#00AB5F"}}>Active</span>}
                        {!row.status && <span style={{color: "#FC7753"}}>Inactive</span>}
                    </div>
                )
            }
        },
        {
            name: 'Views',
            selector: 'price',
            sortable: true,
            minWidth: '50px'
        },
        {
            name: 'Size',
            selector: 'subscriptionType',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: 'Last updated',
            selector: 'created_at',
            sortable: true,
            minWidth: '150px'
        },
        {
            name: 'Comment',
            selector: 'duration',
            sortable: true,
            minWidth: '100px',
            cell: row => {
                return (
                    <Badge color="light-success" pill>
                        {row.duration}
                    </Badge>
                )
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
                        {row.duration}
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
                                              onClick={(e) => editMedia(e, row._id)}>
                                    <span className='align-middle ml-50'>View</span>
                                </DropdownItem>
                                <DropdownItem tag='a' href='#' className='w-100'
                                              onClick={(e) => editMedia(e, row._id)}>
                                    <span className='align-middle ml-50'>View</span>
                                </DropdownItem>
                                <DropdownItem tag='a' href='#' className='w-100'
                                              onClick={(e) => deleteMedia(e, row._id)}>
                                    <Trash size={15}/>
                                    <span className='align-middle ml-50'>Delete</span>
                                </DropdownItem>
                                <DropdownItem tag='a' href='#' className='w-100'
                                              onClick={(e) => editMedia(e, row._id)}>
                                    <span className='align-middle ml-50' style={{color: '#8840E5'}}>Upload</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Delete size={15} onClick={() => deleteMedia(row._id)}/>
                    </div>
                )
            }
        }
    ]

    const handleRowSelected = (currentRowsSelected, allRowsSelected) => {
        setSelectedList(currentRowsSelected.selectedRows.map(item => item._id))
    };

    // ** Function to handle filter
    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {

            updatedData = mediaList.filter(item => {
                const startsWith = item._id.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.created_at.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.currency.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.duration.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.price === value ||
                    item.subscriptionType.toLowerCase().startsWith(value.toLowerCase())

                const includes = item._id.toLowerCase().includes(value.toLowerCase()) ||
                    item.created_at.toLowerCase().includes(value.toLowerCase()) ||
                    item.currency.toLowerCase().includes(value.toLowerCase()) ||
                    item.duration.toLowerCase().includes(value.toLowerCase()) ||
                    item.price === value ||
                    item.subscriptionType.toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
            setSearchValue(value)
        }
    }

    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? filteredData.length / 7 : mediaList.length / 7 || 1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName='page-link'
            nextClassName='page-item next'
            previousClassName='page-item prev'
            previousLinkClassName='page-link'
            pageLinkClassName='page-link'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        />
    )

    return (
        <Fragment>
            <div>
                <div class="d-flex mb-1">
                    <div class="flex-fill mr-2"><MediaCard/></div>
                    <div class="flex-fill mr-2"><MediaCard/></div>
                    <div class="flex-fill mr-2"><MediaCard/></div>
                    <div class="flex-fill mr-2"><MediaCard/></div>
                    <div class="flex-fill"><MediaCard/></div>
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
                    <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
                        <Label className='mr-1' for='search-input'>
                            Search
                        </Label>
                        <Input
                            className='dataTable-filter mb-50'
                            type='text'
                            bsSize='sm'
                            id='search-input'
                            value={searchValue}
                            onChange={handleFilter}
                        />
                    </Col>
                </Row>
                <DataTable
                    noHeader
                    pagination
                    selectableRows
                    columns={columns}
                    paginationPerPage={7}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10}/>}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : mediaList}
                    selectableRowsComponent={BootstrapCheckbox}
                    onSelectedRowsChange={handleRowSelected}
                />
            </Card>

            <CreatePlanModal onChanged={onChanged}/>

            <AddSubscriptionPlanModal onChanged={onChanged} selectedRow={selectedRow} isEdit={true}/>

            <AddMedia type="video"/>
        </Fragment>
    )
}

export default LibraryComp
