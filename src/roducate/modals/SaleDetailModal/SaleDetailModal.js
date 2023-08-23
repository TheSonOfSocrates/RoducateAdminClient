import {Button, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {showSaleDetailModal} from '@store/actions/modal'
import './SaleDetailModal.css'
import {X} from "react-feather";
import React from "react";
import moment from "moment/moment";
import {showAddStudyModal} from "../../../redux/actions/modal";
import {BiDownload, BiSend} from "react-icons/bi";
import {FaPrint} from "react-icons/fa";

export const SaleDetailModal = ({row, onDownload}) => {

    const store = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const print = () => {
        let content = document.getElementById("printablediv");
        let pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    return (
        <Modal toggle={() => dispatch(showSaleDetailModal())}
               isOpen={store.showSaleDetailModal}
               className="modal-dialog-centered modal-lg"
        >
            {row && <ModalBody className="p-2" toggle={() => dispatch(showSaleDetailModal())}>
                <div style={{textAlign: 'right'}}>
                    <Button.Ripple onClick={() => dispatch(showSaleDetailModal())} className='btn-icon rounded-circle'
                                   color='flat-danger'>
                        <X size={16}/>
                    </Button.Ripple>
                </div>
                <div id="printablediv">
                    <div className="row">
                        <div className="col-8">
                            <svg width="48" height="60" viewBox="0 0 48 60" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_9893_41521)">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M46.2204 56.5129C46.0721 56.7601 45.9732 56.859 46.0226 56.8095C46.0226 56.8095 46.1215 56.6612 46.2204 56.5129ZM21.553 57.8973C21.0093 58.3917 20.4655 58.6884 19.9711 58.8861C19.5757 59.0345 19.2296 59.0839 19.1308 59.1334C19.1308 59.1334 18.8836 59.1334 18.7847 59.1334C18.6364 59.1334 18.4881 59.1334 18.3893 59.1334C18.1915 59.1334 17.9938 59.1334 17.7466 59.1334C17.3017 59.1334 16.7085 59.1334 16.0165 59.1334C14.6818 59.1334 12.9516 59.1334 11.2214 59.1334C9.49123 59.1334 7.76105 59.0839 6.47578 59.0345C5.83314 59.0345 5.23994 59.0345 4.79504 58.985C4.5973 58.985 4.35013 58.985 4.1524 58.985C4.05353 58.985 3.90523 58.985 3.7075 58.9356C3.60863 58.9356 3.4109 58.9356 3.21316 58.8367C3.1143 58.8367 2.86713 58.7378 2.61996 58.6389C2.47166 58.54 1.82902 58.2928 1.23582 57.6995C0.593183 57.0568 0.346015 56.3646 0.247148 56.2162C0.148281 55.969 0.0988475 55.7218 0.0494139 55.6229C-1.96248e-05 55.3757 -0.0494532 55.1779 -0.0494532 55.0791C-0.0494532 54.8813 -0.0494532 54.6341 -0.0988868 54.4857C-0.0988868 54.1396 -0.0988868 53.7441 -0.14832 53.2497C-0.14832 52.3103 -0.197754 50.9753 -0.197754 49.4426C-1.96099e-05 46.3772 -1.96099e-05 42.2734 -1.96099e-05 38.1202C-1.96099e-05 33.9671 -1.96099e-05 29.8139 0.0988475 26.5012C0.0988475 24.8696 0.148281 23.4358 0.197715 22.348C0.197715 21.4581 0.247148 20.3703 0.395449 19.7276C2.17506 9.29519 10.7271 1.23604 21.207 0.148299C35.3944 -1.33498 44.8857 8.00968 47.3573 18.5904C49.483 27.7373 46.4181 38.2191 36.828 43.8061C37.9155 44.6467 38.8548 45.4377 39.6457 46.0805C42.5129 48.4043 44.0453 49.5909 44.7868 50.1842C45.034 50.382 45.2811 50.5798 45.4789 50.7775C45.5777 50.8764 46.1709 51.4203 46.5664 52.2114C46.863 52.7553 47.1596 53.6947 47.0113 54.8813C46.9619 55.6229 46.7147 56.859 45.6272 57.8478C44.6385 58.7873 43.551 59.0345 43.2049 59.0839C42.76 59.1828 42.3151 59.2322 42.0185 59.2322C40.9804 59.2817 39.0031 59.2817 35.5427 59.2322C34.9495 59.2322 34.3069 59.2322 33.6148 59.2322C32.4778 59.2322 31.3903 59.2322 30.5005 59.2322C29.4624 59.2322 28.5726 59.2322 27.8311 59.2322C26.5458 59.2322 25.1617 59.1828 23.9753 58.8367C23.0855 58.5895 22.3934 58.2434 21.8002 57.7984L21.553 57.8973ZM23.2832 53.398C23.036 53.1014 22.7889 52.7058 22.4923 52.2608C22.4923 52.2608 22.2945 52.0136 22.1957 51.8653C20.07 49.0471 19.9217 48.8987 19.5757 49.0965C19.3285 49.2448 19.3285 49.2943 19.0813 51.9642C19.0319 52.5575 18.9825 53.0025 18.933 53.3486C18.8836 54.0408 18.7847 54.3374 18.7353 54.5352C18.6859 54.6835 18.587 54.733 18.5376 54.733C18.1421 54.8813 4.7456 54.733 4.5973 54.5846C4.25127 54.2385 4.35013 22.3975 4.64674 20.4692C6.12974 12.0145 13.1493 5.38922 21.6025 4.54869C43.897 2.22489 51.7569 31.8905 32.9722 40.8396C32.8733 40.8396 32.8239 40.889 32.725 40.9385C31.9341 41.2846 31.0937 41.6307 30.2039 41.9273C29.3635 42.224 28.7703 42.3229 28.7209 42.5701C28.622 42.9162 29.3141 43.5589 31.2914 45.1411C31.4892 45.2894 31.6869 45.4377 31.8846 45.6355C31.9835 45.7344 32.1318 45.8333 32.2307 45.9322C32.725 46.3277 33.3182 46.7727 33.9608 47.3166C35.5922 48.6515 36.9269 49.6898 38.0144 50.5798C38.5087 50.9753 38.9536 51.3214 39.3491 51.6181C42.3151 53.9913 42.5623 54.2385 42.5129 54.3374C42.5129 54.3374 42.5129 54.3869 42.5129 54.4363C42.5129 54.5352 42.5129 54.6341 42.5129 54.733C42.414 54.9802 41.8208 54.9802 38.2121 54.9802C37.7178 54.9802 37.1246 54.9802 36.5314 54.9802C35.691 54.9802 34.7024 54.9802 33.5654 54.9802C27.0401 54.9802 25.31 55.1285 24.2719 54.3869C23.9753 54.1891 23.7281 53.8924 23.4315 53.4969L23.2832 53.398Z"
                                          fill="#4C20A8"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M10.0226 25.3849L20.4603 16.2434C21.1183 15.6671 22.0165 15.4488 22.8656 15.6589L36.1301 18.9409C36.3881 19.0047 36.4557 19.3397 36.2428 19.4987L31.9588 22.6957C31.6789 22.9046 31.5387 23.2506 31.5968 23.5949C31.6962 24.1841 31.7989 24.846 31.74 25.3171L31.7394 25.3216C31.6605 25.953 31.4936 27.2886 27.1761 29.0941C22.8482 30.904 19.3072 30.8253 18.1269 30.4318C16.9466 30.0384 16.6318 29.6449 16.3957 29.1728C16.2301 28.8415 15.832 27.6192 15.6092 26.9194C15.5127 26.6161 15.2448 26.3997 14.9279 26.3705L10.2011 25.9351C9.92574 25.9098 9.81457 25.5671 10.0226 25.3849ZM24.6969 29.4622C28.7754 28.3694 31.7708 26.3233 31.3874 24.8922C31.0039 23.4611 27.3868 23.1869 23.3082 24.2797C19.2297 25.3726 16.2343 27.4186 16.6177 28.8497C17.0012 30.2808 20.6183 30.5551 24.6969 29.4622Z"
                                          fill="#4C20A8"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_9893_41521">
                                        <rect width="48" height="59.3311" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="mb-0 mt-1" style={{width: '60%'}}>Office 149, 450 South Brand Brooklyn
                                San Diego County, CA 91905, USA
                                +1 (123) 456 7891, +44 (876) 543 2198</p>
                        </div>
                        <div className="col-4">
                            <div className="mt-2">
                                <p className="sdm-id" style={{wordWrap: 'break-word'}}>#{row._id}</p>
                                <p className="mb-0 sdm-date">{moment(row.updatedAt).format('DD MMM YYYY h:mm A')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 p-1">
                        <div className="row p-1" style={{border: '1px solid lightgray'}}>
                            <div className="col-3 sdm-table-header">Item</div>
                            <div className="col-3 sdm-table-header">Description</div>
                            <div className="col-3 sdm-table-header">Duration</div>
                            <div className="col-3 sdm-table-header">Price</div>
                        </div>
                        <div className="row p-1" style={{
                            borderBottom: '1px solid lightgray',
                            borderLeft: '1px solid lightgray',
                            borderRight: '1px solid lightgray'
                        }}>
                            <div className="col-3 sdm-table-content">{row.title}</div>
                            <div className="col-3 sdm-table-content">{row.type}</div>
                            <div className="col-3 sdm-table-content">
                                {row.duration === 0 && <span>One Time Payment</span>}
                                {row.duration === 1 && <span>1 Month</span>}
                                {row.duration > 1 && <span>{row.duration} Month</span>}
                            </div>
                            <div className="col-3 sdm-table-content">{<span>₦{row.price}</span>}</div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-2">
                    <Button className='ml-2' color='primary' onClick={() => dispatch(showAddStudyModal(true))}>
                        <span className='align-middle mr-50'>Send</span>
                        <BiSend size={15}/>
                    </Button>
                    <Button className='ml-2' color='primary' onClick={print}>
                        <span className='align-middle mr-50'>Print</span>
                        <FaPrint size={15}/>
                    </Button>
                    <Button className='ml-2' color='primary' onClick={() => onDownload()}>
                        <span className='align-middle mr-50'>Download</span>
                        <BiDownload size={15}/>
                    </Button>
                </div>
            </ModalBody>}
            <iframe id="ifmcontentstoprint" style={{height: 0, width: 0, position: 'absolute'}}></iframe>
        </Modal>
    );
};