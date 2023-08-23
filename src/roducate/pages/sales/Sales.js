// ** React Imports
import React, {forwardRef, Fragment, useEffect, useState} from 'react'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // import the CSS file for styling
import {ChevronDown, MoreVertical} from 'react-feather'
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
import './Sales.css'
import Avatar from "../../../@core/components/avatar";
import {showDateRangerPickerModal, showSaleDetailModal} from "../../../redux/actions/modal";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import {TbTableExport} from "react-icons/tb";
import {SaleDetailModal} from "../../modals/SaleDetailModal/SaleDetailModal";
import {Dropdown} from 'antd';
import {DateRangePickerModal} from "../../modals/DateRangerPickerModal/DateRangePickerModal";
import ExcelJs from "exceljs";

const moment = require('moment');

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({onClick, ...rest}, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick}/>
    </div>
))

const Sales = () => {
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

    const isActive = {
        "success": {
            icon: <Avatar color='light-success' icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                           xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#C5F2C7"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M14.596 6.73233C14.6897 6.82609 14.7424 6.95325 14.7424 7.08583C14.7424 7.21841 14.6897 7.34557 14.596 7.43933L8.97497 13.0608C8.9239 13.1119 8.86326 13.1525 8.79651 13.1801C8.72976 13.2078 8.65822 13.222 8.58597 13.222C8.51373 13.222 8.44218 13.2078 8.37544 13.1801C8.30869 13.1525 8.24805 13.1119 8.19697 13.0608L5.40397 10.2678C5.35752 10.2214 5.32067 10.1662 5.29553 10.1055C5.27039 10.0448 5.25745 9.97978 5.25745 9.91408C5.25745 9.84838 5.27039 9.78333 5.29553 9.72263C5.32067 9.66194 5.35752 9.60679 5.40397 9.56033C5.45043 9.51388 5.50558 9.47703 5.56628 9.45188C5.62697 9.42674 5.69203 9.4138 5.75772 9.4138C5.82342 9.4138 5.88848 9.42674 5.94917 9.45188C6.00987 9.47703 6.06502 9.51388 6.11147 9.56033L8.58647 12.0353L13.8885 6.73233C13.9822 6.6386 14.1094 6.58594 14.242 6.58594C14.3746 6.58594 14.5017 6.6386 14.5955 6.73233H14.596Z"
                      fill="#00C56D"/>
            </svg>}/>
        },
        "fail": {
            icon: <Avatar color='light-danger' icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                          xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#FEF2F2"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M9.99997 10.7071L12.8285 13.5356C12.9228 13.6267 13.0491 13.6771 13.1802 13.6759C13.3113 13.6748 13.4367 13.6222 13.5294 13.5295C13.6221 13.4368 13.6747 13.3114 13.6758 13.1803C13.6769 13.0492 13.6266 12.9229 13.5355 12.8286L10.707 10.0001L13.5355 7.17157C13.6266 7.07727 13.6769 6.95097 13.6758 6.81987C13.6747 6.68878 13.6221 6.56337 13.5294 6.47067C13.4367 6.37796 13.3113 6.32538 13.1802 6.32424C13.0491 6.3231 12.9228 6.3735 12.8285 6.46457L9.99997 9.29307L7.17147 6.46457C7.07675 6.37575 6.95118 6.32726 6.82134 6.32937C6.6915 6.33147 6.56757 6.38402 6.47578 6.47587C6.38399 6.56773 6.33153 6.69169 6.32952 6.82154C6.3275 6.95138 6.37608 7.07691 6.46497 7.17157L9.29297 10.0001L6.46447 12.8286C6.41672 12.8747 6.37863 12.9299 6.35242 12.9909C6.32622 13.0519 6.31242 13.1175 6.31185 13.1839C6.31127 13.2503 6.32392 13.3161 6.34906 13.3776C6.3742 13.439 6.41133 13.4948 6.45828 13.5418C6.50522 13.5887 6.56105 13.6258 6.6225 13.651C6.68394 13.6761 6.74978 13.6888 6.81617 13.6882C6.88256 13.6876 6.94817 13.6738 7.00917 13.6476C7.07018 13.6214 7.12535 13.5833 7.17147 13.5356L9.99997 10.7071Z"
                      fill="#FC7753"/>
            </svg>}/>
        },
        "pending": {
            icon: <Avatar color='light-danger' icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                          xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#FEF2F2"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M9.99997 10.7071L12.8285 13.5356C12.9228 13.6267 13.0491 13.6771 13.1802 13.6759C13.3113 13.6748 13.4367 13.6222 13.5294 13.5295C13.6221 13.4368 13.6747 13.3114 13.6758 13.1803C13.6769 13.0492 13.6266 12.9229 13.5355 12.8286L10.707 10.0001L13.5355 7.17157C13.6266 7.07727 13.6769 6.95097 13.6758 6.81987C13.6747 6.68878 13.6221 6.56337 13.5294 6.47067C13.4367 6.37796 13.3113 6.32538 13.1802 6.32424C13.0491 6.3231 12.9228 6.3735 12.8285 6.46457L9.99997 9.29307L7.17147 6.46457C7.07675 6.37575 6.95118 6.32726 6.82134 6.32937C6.6915 6.33147 6.56757 6.38402 6.47578 6.47587C6.38399 6.56773 6.33153 6.69169 6.32952 6.82154C6.3275 6.95138 6.37608 7.07691 6.46497 7.17157L9.29297 10.0001L6.46447 12.8286C6.41672 12.8747 6.37863 12.9299 6.35242 12.9909C6.32622 13.0519 6.31242 13.1175 6.31185 13.1839C6.31127 13.2503 6.32392 13.3161 6.34906 13.3776C6.3742 13.439 6.41133 13.4948 6.45828 13.5418C6.50522 13.5887 6.56105 13.6258 6.6225 13.651C6.68394 13.6761 6.74978 13.6888 6.81617 13.6882C6.88256 13.6876 6.94817 13.6738 7.00917 13.6476C7.07018 13.6214 7.12535 13.5833 7.17147 13.5356L9.99997 10.7071Z"
                      fill="#FC7753"/>
            </svg>}/>
        }
    }

    const columns = [
        {
            name: '#',
            sortable: true,
            minWidth: '250px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <span className="datatable-id-column">#{row._id}</span>
                    </div>
                )
            }
        },
        {
            name: 'Status',
            sortable: true,
            width: '150px',
            cell: row => {
                return (
                    <div>
                        {row.status === 'success' && <div>
                            {isActive['success']?.icon}&nbsp;&nbsp;&nbsp;
                            {<span style={{color: "#00AB5F"}}>Successful</span>}
                        </div>}
                        {row.status === 'fail' && <div>
                            {isActive['fail']?.icon}&nbsp;&nbsp;&nbsp;
                            {<span style={{color: "#FC7753"}}>Failed</span>}
                        </div>}
                        {row.status === 'pending' && <div>
                            {isActive['pending']?.icon}&nbsp;&nbsp;&nbsp;
                            {<span style={{color: "#FC7753"}}>Pending</span>}
                        </div>}
                    </div>
                )
            }
        },
        {
            name: 'Transaction Type',
            sortable: true,
            minWidth: '250px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <svg width="35" height="35" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="44" height="44" rx="22" fill="#F8F7FE"/>
                            <path
                                d="M23 30C23.2652 30 23.5196 30.1054 23.7071 30.2929C23.8946 30.4804 24 30.7348 24 31C24 31.2652 23.8946 31.5196 23.7071 31.7071C23.5196 31.8946 23.2652 32 23 32H21C20.7348 32 20.4804 31.8946 20.2929 31.7071C20.1054 31.5196 20 31.2652 20 31C20 30.7348 20.1054 30.4804 20.2929 30.2929C20.4804 30.1054 20.7348 30 21 30H23ZM22 12C26.41 12 30 15.543 30 19.933C30 22.939 28.478 25.129 27.22 26.427L26.936 26.71L26.666 26.962L26.414 27.182L26.084 27.452L25.756 27.696C25.56 27.834 25.416 28.025 25.29 28.231L25.145 28.482L25.004 28.734C24.764 29.146 24.486 29.5 23.893 29.5H20.107C19.514 29.5 19.236 29.146 18.997 28.734L18.784 28.356C18.639 28.103 18.479 27.862 18.244 27.696L18.012 27.525L17.813 27.37L17.586 27.182L17.334 26.962L17.064 26.71L16.779 26.427C15.522 25.129 14 22.939 14 19.933C14 15.543 17.59 12 22 12ZM22 14C18.677 14 16 16.665 16 19.933C16 22.557 17.533 24.427 18.593 25.404L18.838 25.622L19.058 25.804L19.328 26.012L19.4 26.064C19.715 26.286 19.949 26.595 20.162 26.918L20.535 27.5H23.465L23.838 26.918C24.051 26.595 24.285 26.286 24.6 26.064L24.843 25.882L25.049 25.717L25.282 25.517C26.342 24.576 28 22.662 28 19.933C28 16.665 25.323 14 22 14ZM22.293 16.293C22.473 16.1137 22.7144 16.0095 22.9684 16.0018C23.2223 15.994 23.4697 16.0832 23.6603 16.2512C23.8508 16.4193 23.9703 16.6536 23.9944 16.9065C24.0185 17.1594 23.9454 17.412 23.79 17.613L23.707 17.707L22.414 19L23.7 20.286C24.064 20.65 24.092 21.223 23.784 21.619L23.7 21.714L21.707 23.707C21.527 23.8863 21.2856 23.9905 21.0316 23.9982C20.7777 24.006 20.5303 23.9168 20.3397 23.7488C20.1492 23.5807 20.0297 23.3464 20.0056 23.0935C19.9815 22.8406 20.0546 22.588 20.21 22.387L20.293 22.293L21.586 21L20.3 19.714C20.1261 19.5401 20.0217 19.3088 20.0062 19.0634C19.9907 18.818 20.0653 18.5753 20.216 18.381L20.3 18.286L22.293 16.293Z"
                                fill="#8840E6"/>
                        </svg>
                        <div className="d-block ml-1">
                            <p className="datatable-first-column mb-0">{row.title}</p>
                            <p className="mb-0">{row.type}</p>
                        </div>
                    </div>
                )
            }
        },
        {
            name: 'Price',
            sortable: true,
            minWidth: '50px',
            cell: row => {
                return (
                    <div className="d-flex align-items-center">
                        <span>₦{row.price}</span>
                    </div>
                )
            }
        },
        {
            name: 'Date',
            selector: 'updatedAt',
            sortable: true,
            minWidth: '200px',
            cell: row => {
                return <div>{moment(row.updatedAt).format('DD MMM YYYY h:mm A')}</div>
            }
        },
        {
            name: 'Duration',
            selector: 'updatedAt',
            sortable: true,
            minWidth: '200px',
            cell: row => {
                return <div className="table-duration-text">
                    {row.duration === 0 && <span>One Time Payment</span>}
                    {row.duration === 1 && <span>1 Month</span>}
                    {row.duration > 1 && <span>{row.duration} Month</span>}
                </div>
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

    const items = [
        {
            key: '1',
            type: 'group',
            label: 'Export',
            children: [
                {
                    key: '1-1',
                    label: 'CSV Export',
                    children: [
                        {
                            key: '2-1',
                            label: (
                                <a onClick={() => exportData('csv', 'total')} rel="noopener noreferrer" href="#">
                                    Export All
                                </a>
                            ),
                        },
                        {
                            key: '2-2',
                            label: (
                                <a onClick={() => exportData('csv', 'date')} rel="noopener noreferrer" href="#">
                                    Export Specific Date
                                </a>
                            )
                        },
                    ]
                },
                {
                    key: '1-2',
                    label: 'Excel Export',
                    children: [
                        {
                            key: '2-1',
                            label: (
                                <a onClick={() => exportData('excel', 'total')} rel="noopener noreferrer" href="#">
                                    Export All
                                </a>
                            ),
                        },
                        {
                            key: '2-2',
                            label: (
                                <a onClick={() => exportData('excel', 'date')} rel="noopener noreferrer" href="#">
                                    Export Specific Date
                                </a>
                            )
                        },
                    ]
                },
            ],
        }
    ];

    useEffect(async () => {
        loadData()
    }, [pageNumber, pageSize, sort])

    const loadData = async () => {
        dispatch(showLoadingScreen(true))
        let response = undefined
        try {
            response = await axios.post('/sales/getAll', {pageNumber, pageSize, searchStr, sort})
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

    const [exportType, setExportType] = useState('csv')

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

    const exportData = (exportType, dateType) => {
        setExportType(exportType)
        if (dateType === 'date') {
            dispatch(showDateRangerPickerModal(true))
        } else {
            exportToExcel(true)
        }
    }

    const exportToExcel = async (isAll, dates) => {
        const res = await axios.post('/sales/getSalesDataOfRange', {
            isAll,
            startDate: dates?.length === 2 ? moment(new Date(dates[0])).format('YYYY-MM-DD') : '',
            endDate: dates?.length === 2 ? moment(new Date(dates[1])).format('YYYY-MM-DD') : ''
        })
        if (!res || res.data.length === 0) return

        const data = res.data.map(item => ({
            Id: item._id,
            Status: item.status,
            TransactionType: item.title,
            Price: item.price,
            Date: moment(new Date(item.updatedAt)).format('DD MMM YYYY'),
            Duration: item.duration === 0 ? 'One Time Payment' : item.duration + 'Month(s)'
        }))

        let sheetName = moment(new Date()).format('DD_MMM_YYYY_hh_mm_ss') + '.csv';
        if (exportType === 'excel')
            sheetName = moment(new Date()).format('DD_MMM_YYYY_hh_mm_ss') + '.xlsx';

        let headerName = "RequestsList";

        let workbook = new ExcelJs.Workbook();
        let sheet = workbook.addWorksheet(sheetName, {
            views: [{showGridLines: false}]
        });

        // sheet.addTable({
        //     name: `Header`,
        //     ref: "A1",
        //     headerRow: true,
        //     totalsRow: false,
        //     style: {
        //         theme: "",
        //         showRowStripes: false,
        //         showFirstColumn: true,
        //         width: 200
        //     },
        //     columns: [{name: "This is the header text"}, {name: "Hahaha"}],
        //     rows: [[`As of: 07/09/2021`], [`Allen`]]
        // });

        sheet.addTable({
            name: headerName,
            ref: "A1",
            headerRow: true,
            totalsRow: false,
            style: {
                theme: "TableStyleMedium2",
                showRowStripes: false,
                width: 300
            },
            columns: [{name: "Id"}, {name: "Status"}, {name: "Transaction Type"}, {name: "Price"}, {name: "Date"}, {name: "Duration"}],
            rows: data.map((e) => {
                let arr = [];
                for (let i in e) {
                    arr.push(e[i]);
                }
                return arr;
            })
        });

        sheet.columns = sheet.columns.map((e) => {
            const expr = e.values[5];
            switch (expr) {
                case "Name":
                    return {width: 50};
                case "Gender":
                    return {width: 40};
                case "Height":
                    return {width: 30};
                default:
                    return {width: 20};
            }
        });

        const table = sheet.getTable(headerName);
        for (let i = 0; i < table.table.columns.length; i++) {
            sheet.getCell(`${String.fromCharCode(65 + i)}5`).font = {size: 12};
            sheet.getCell(`${String.fromCharCode(65 + i)}5`).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {argb: "c5d9f1"}
            };

            for (let j = 0; j < table.table.rows.length; j++) {
                let rowCell = sheet.getCell(`${String.fromCharCode(65 + i)}${j + 6}`);
                rowCell.alignment = {wrapText: true};
                rowCell.border = {
                    bottom: {
                        style: "thin",
                        color: {argb: "a6a6a6"}
                    }
                };
            }
        }
        table.commit();

        const writeFile = (fileName, content) => {
            const link = document.createElement("a");
            const blob = new Blob([content], {
                type: "application/vnd.ms-excel;charset=utf-8;"
            });
            link.download = fileName;
            link.href = URL.createObjectURL(blob);
            link.click();
        };

        if (exportType === 'csv') {
            workbook.csv.writeBuffer().then((buffer) => {
                writeFile(sheetName, buffer);
            });
        } else {
            workbook.xlsx.writeBuffer().then((buffer) => {
                writeFile(sheetName, buffer);
            });
        }
    };

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

                    <div className="d-flex justify-content-between mb-2">
                        {/*<Button className='ml-2' color='primary'>*/}
                        {/*    <span className='align-middle mr-50'>Export</span>*/}
                        {/*    <TbTableExport size={15}/>*/}
                        {/*</Button>*/}
                        <Dropdown menu={{items}} placement="bottomRight" arrow>
                            <Button color='primary'>Export&nbsp;&nbsp;&nbsp;<TbTableExport size={15}/></Button>
                        </Dropdown>
                    </div>
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

            <SaleDetailModal row={editingRow}/>
            <DateRangePickerModal onSelect={(dates) => exportToExcel(false, dates)}/>

        </Fragment>
    )
}

export default Sales