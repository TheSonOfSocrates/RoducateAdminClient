// ** React Imports
import PropTypes from 'prop-types'

// ** Styles
import './ActiveStatComp.css'
import {LineSeries, XYPlot} from "react-vis";
import React, {useEffect, useState} from "react";
import axios from "../../../utility/axios";

const ActiveStatComp = props => {

    useEffect(async () => {
        const res = await axios.get('/school/overview')
        if (res) {
            setOverViewData(res.data)
        }
    }, [])

    const [overViewData, setOverViewData] = useState(undefined)

    useEffect(async () => {
        const res = await axios.get('/school/overview')
        if (res) {
            setOverViewData(res.data)
        }
    }, [])

    return (
        <div>
            <div className="d-flex justify-content-between mb-2">
                <div>
                    <span style={{color: '#00AB5F'}}>Active</span>&nbsp;&nbsp;
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.773 5.09042L4.22704 14.6364M6.34836 5.09042L13.773 5.09042L6.34836 5.09042ZM13.773 5.09042L13.773 12.515L13.773 5.09042Z"
                            stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div>
                    <span>Weekly</span>&nbsp;&nbsp;
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M6.35159 9.61439C6.57662 9.38943 6.88179 9.26305 7.19999 9.26305C7.51818 9.26305 7.82335 9.38943 8.04839 9.61439L12 13.566L15.9516 9.61439C16.0623 9.49978 16.1947 9.40836 16.3411 9.34547C16.4875 9.28258 16.645 9.24948 16.8043 9.24809C16.9636 9.24671 17.1217 9.27707 17.2691 9.33741C17.4166 9.39774 17.5506 9.48685 17.6633 9.59952C17.7759 9.71219 17.865 9.84617 17.9254 9.99365C17.9857 10.1411 18.0161 10.2991 18.0147 10.4585C18.0133 10.6178 17.9802 10.7753 17.9173 10.9217C17.8544 11.0681 17.763 11.2005 17.6484 11.3112L12.8484 16.1112C12.6234 16.3362 12.3182 16.4625 12 16.4625C11.6818 16.4625 11.3766 16.3362 11.1516 16.1112L6.35159 11.3112C6.12662 11.0862 6.00024 10.781 6.00024 10.4628C6.00024 10.1446 6.12662 9.83943 6.35159 9.61439Z"
                              fill="black"/>
                    </svg>
                </div>
            </div>
            <div>
                <div className="d-flex align-items-center">
                    <span className="number-count">{overViewData?.activeSchoolCount}</span>&nbsp;&nbsp;
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M12 11.3633C12.9663 11.3633 13.8954 11.7364 14.5933 12.4048C15.2913 13.0731 15.7043 13.9851 15.7463 14.9505L15.75 15.1133V16.6133C15.7498 16.8044 15.6766 16.9883 15.5454 17.1273C15.4141 17.2663 15.2348 17.35 15.044 17.3612C14.8531 17.3724 14.6652 17.3103 14.5186 17.1876C14.372 17.0649 14.2778 16.8909 14.2552 16.701L14.25 16.6133V15.1133C14.25 14.5394 14.0308 13.9871 13.637 13.5696C13.2433 13.152 12.7049 12.9007 12.132 12.867L12 12.8633H6C5.42609 12.8632 4.87386 13.0825 4.4563 13.4762C4.03874 13.87 3.78742 14.4084 3.75375 14.9813L3.75 15.1133V16.6133C3.74979 16.8044 3.67659 16.9883 3.54536 17.1273C3.41414 17.2663 3.23479 17.35 3.04395 17.3612C2.85312 17.3724 2.66522 17.3103 2.51863 17.1876C2.37204 17.0649 2.27783 16.8909 2.25525 16.701L2.25 16.6133V15.1133C2.25006 14.1469 2.62316 13.2179 3.29149 12.5199C3.95983 11.822 4.87181 11.409 5.83725 11.367L6 11.3633H12ZM9 2.36328C9.99456 2.36328 10.9484 2.75837 11.6517 3.46163C12.3549 4.16489 12.75 5.11872 12.75 6.11328C12.75 7.10784 12.3549 8.06167 11.6517 8.76493C10.9484 9.46819 9.99456 9.86328 9 9.86328C8.00544 9.86328 7.05161 9.46819 6.34835 8.76493C5.64509 8.06167 5.25 7.10784 5.25 6.11328C5.25 5.11872 5.64509 4.16489 6.34835 3.46163C7.05161 2.75837 8.00544 2.36328 9 2.36328ZM9 3.86328C8.70453 3.86328 8.41194 3.92148 8.13896 4.03455C7.86598 4.14763 7.61794 4.31336 7.40901 4.52229C7.20008 4.73122 7.03434 4.97926 6.92127 5.25224C6.8082 5.52523 6.75 5.81781 6.75 6.11328C6.75 6.40876 6.8082 6.70134 6.92127 6.97432C7.03434 7.2473 7.20008 7.49534 7.40901 7.70427C7.61794 7.9132 7.86598 8.07894 8.13896 8.19201C8.41194 8.30508 8.70453 8.36328 9 8.36328C9.59674 8.36328 10.169 8.12623 10.591 7.70427C11.0129 7.28231 11.25 6.71002 11.25 6.11328C11.25 5.51654 11.0129 4.94425 10.591 4.52229C10.169 4.10033 9.59674 3.86328 9 3.86328Z"
                              fill="#CACACC"/>
                    </svg>
                </div>
                <p className="stat-des mt-1">Compared to 1232 last week</p>
                <XYPlot
                    width={300}
                    style={{marginLeft: '-25px'}}
                    height={135}>
                    <LineSeries
                        color="#8840E5"
                        data={[
                            {x: 0, y: 8},
                            {x: 1, y: 5},
                            {x: 2, y: 4},
                            {x: 3, y: 9},
                            {x: 4, y: 1},
                            {x: 5, y: 7},
                            {x: 6, y: 6},
                            {x: 7, y: 3},
                            {x: 8, y: 2},
                            {x: 9, y: 0}
                        ]}/>
                    <LineSeries
                        color="#8AFF6C"
                        data={[
                            {x: 0, y: 18},
                            {x: 1, y: 15},
                            {x: 2, y: 14},
                            {x: 3, y: 3},
                            {x: 4, y: 42},
                            {x: 5, y: 25},
                            {x: 6, y: 34},
                            {x: 7, y: 45},
                            {x: 8, y: 65},
                            {x: 9, y: 24}
                        ]}/>
                    <LineSeries
                        color="#FFD422"
                        data={[
                            {x: 0, y: 23},
                            {x: 1, y: 44},
                            {x: 2, y: 53},
                            {x: 3, y: 63},
                            {x: 4, y: 23},
                            {x: 5, y: 43},
                            {x: 6, y: 23},
                            {x: 7, y: 63},
                            {x: 8, y: 44},
                            {x: 9, y: 78}
                        ]}/>
                </XYPlot>
            </div>

        </div>
    )
}

export default ActiveStatComp

// ** PropTypes
ActiveStatComp.propTypes = {
    msg: PropTypes.string,
    time: PropTypes.string
}