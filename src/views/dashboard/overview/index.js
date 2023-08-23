import {useContext} from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Col, DropdownItem, DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledDropdown
} from 'reactstrap'
import {ThemeColors} from '@src/utility/context/ThemeColors'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-overview.scss'
import './overview.css'
import SimpleAreaChart from "../../charts/recharts/AreaChart";
import {MoreVertical} from "react-feather";
import {iconsData} from "../../components/timeline/data";
import Chart from "react-apexcharts";
import IconsTimeline from "../../../roducate/pages/activities/IconsTimeline";

const OverviewDashboard = () => {
    const {colors} = useContext(ThemeColors),
        trackBgColor = '#e9ecef'

    const options = {
            chart: {
                sparkline: { enabled: true },
                toolbar: { show: false }
            },
            grid: {
                show: false,
                padding: {
                    left: 0,
                    right: 0
                }
            },
            states: {
                hover: {
                    filter: 'none'
                }
            },
            colors: ['#ebf0f7', '#ebf0f7', '#8840E5', '#ebf0f7', '#ebf0f7', '#ebf0f7'],
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                    endingShape: 'rounded'
                }
            },
            tooltip: {
                x: { show: false }
            },
            xaxis: {
                type: 'numeric'
            }
        },
        series = [
            {
                name: 'Sessions',
                data: [75, 125, 225, 175, 125, 75, 25]
            }
        ]

    const donutColors = {
        series1: '#ffe700',
        series2: '#00d4bd',
        series3: '#826bf8',
        series4: '#2b9bf4',
        series5: '#FFA1A1'
    }

    const mostVisitOptions = {
        legend: {
            show: true,
            position: 'bottom'
        },
        labels: ['Operational', 'Networking', 'Hiring', 'R&D'],

        colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
        dataLabels: {
            enabled: true,
            formatter(val, opt) {
                return `${parseInt(val)}%`
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontSize: '2rem',
                            fontFamily: 'Montserrat'
                        },
                        value: {
                            fontSize: '1rem',
                            fontFamily: 'Montserrat',
                            formatter(val) {
                                return `${parseInt(val)}%`
                            }
                        },
                        total: {
                            show: true,
                            fontSize: '1.5rem',
                            label: 'Operational',
                            formatter(w) {
                                return '31%'
                            }
                        }
                    }
                }
            }
        },
        responsive: [
            {
                breakpoint: 992,
                options: {
                    chart: {
                        height: 380
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            },
            {
                breakpoint: 576,
                options: {
                    chart: {
                        height: 320
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                    name: {
                                        fontSize: '1.5rem'
                                    },
                                    value: {
                                        fontSize: '1rem'
                                    },
                                    total: {
                                        fontSize: '1.5rem'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    }

    const mostVisitSeries = [85, 16, 50, 50]

    return (
        <div id='dashboard-overview'>
            <Row className='match-height'>
                <Col xl='12' md='12' xs='12'>
                    <CardMedal/>
                </Col>
            </Row>
            <Row className='match-height'>
                <Col lg='4' md='12'>
                    <Row className='match-height'>
                        <Col xl='12' md='12' xs='12'>
                            <Card>
                                <CardBody>
                                    <div className="d-flex justify-content-between">
                                        <span className="overview-totalusers-cnt">42.5k</span>
                                        <span className="overview-totalusers-percent">+18.4%</span>
                                    </div>
                                    <span className="overview-totalusers-txt">Total Users</span>
                                    <div className="d-flex justify-content-between" style={{marginTop: 20}}>
                                        <div style={{display: 'grid'}}>
                                            <div style={{display: 'flex'}}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M17 2C17.5046 1.99984 17.9906 2.19041 18.3605 2.5335C18.7305 2.87659 18.9572 3.34684 18.995 3.85L19 4V20C19.0002 20.5046 18.8096 20.9906 18.4665 21.3605C18.1234 21.7305 17.6532 21.9572 17.15 21.995L17 22H7C6.49542 22.0002 6.00943 21.8096 5.63945 21.4665C5.26947 21.1234 5.04284 20.6532 5.005 20.15L5 20V4C4.99984 3.49542 5.19041 3.00943 5.5335 2.63945C5.87659 2.26947 6.34684 2.04284 6.85 2.005L7 2H17ZM17 4H7V20H17V4ZM12.5 16C12.617 16 12.7304 16.041 12.8203 16.1159C12.9102 16.1908 12.9709 16.2949 12.992 16.41L13 16.5V17.5C13 17.617 12.959 17.7304 12.8841 17.8203C12.8092 17.9102 12.7051 17.9709 12.59 17.992L12.5 18H11.5C11.383 18 11.2696 17.959 11.1797 17.8841C11.0898 17.8092 11.0291 17.7051 11.008 17.59L11 17.5V16.5C11 16.383 11.041 16.2696 11.1159 16.1797C11.1908 16.0898 11.2949 16.0291 11.41 16.008L11.5 16H12.5Z"
                                                        fill="#FCB22B"/>
                                                </svg>
                                                <span style={{margin: 'auto'}}
                                                      className="overview-totalusers-device">Mobile</span>
                                            </div>
                                            <span className="overview-totalusers-device-percent">23.5%</span>
                                            <span className="overview-totalusers-device-user-cnt">2890</span>
                                        </div>
                                        <div style={{display: 'grid'}}>
                                            <div style={{
                                                height: '100%',
                                                margin: 'auto',
                                                width: 1,
                                                backgroundColor: '#CACACC'
                                            }}></div>
                                            <span style={{margin: 'auto'}}>VS</span>
                                            <div style={{
                                                height: '100%',
                                                margin: 'auto',
                                                width: 1,
                                                backgroundColor: '#CACACC'
                                            }}></div>
                                        </div>
                                        <div style={{display: 'grid'}}>
                                            <div style={{display: 'flex'}}>
                                                <span style={{textAlign: 'right', margin: 'auto'}}
                                                      className="overview-totalusers-device">Web</span>
                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M19 3.5C19.5304 3.5 20.0391 3.71071 20.4142 4.08579C20.7893 4.46086 21 4.96957 21 5.5V16.5C21 17.0304 20.7893 17.5391 20.4142 17.9142C20.0391 18.2893 19.5304 18.5 19 18.5H15V19.5H16C16.2652 19.5 16.5196 19.6054 16.7071 19.7929C16.8946 19.9804 17 20.2348 17 20.5C17 20.7652 16.8946 21.0196 16.7071 21.2071C16.5196 21.3946 16.2652 21.5 16 21.5H8C7.73478 21.5 7.48043 21.3946 7.29289 21.2071C7.10536 21.0196 7 20.7652 7 20.5C7 20.2348 7.10536 19.9804 7.29289 19.7929C7.48043 19.6054 7.73478 19.5 8 19.5H9V18.5H5C4.46957 18.5 3.96086 18.2893 3.58579 17.9142C3.21071 17.5391 3 17.0304 3 16.5V5.5C3 4.96957 3.21071 4.46086 3.58579 4.08579C3.96086 3.71071 4.46957 3.5 5 3.5H19ZM13 18.5H11V19.5H13V18.5ZM19 5.5H5V16.5H19V5.5Z"
                                                        fill="#8840E6"/>
                                                </svg>
                                            </div>
                                            <span className="overview-totalusers-device-percent">23.5%</span>
                                            <span style={{textAlign: 'right'}}
                                                  className="overview-totalusers-device-user-cnt">2890</span>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        backgroundColor: '#8840E5',
                                        height: 8,
                                        borderRadius: 5,
                                        marginTop: 25
                                    }}>
                                        <div style={{
                                            width: '22%',
                                            backgroundColor: '#FDB528',
                                            height: 8,
                                            borderRadius: 5,
                                            marginTop: 25
                                        }}></div>

                                    </div>
                                    <div style={{
                                        marginTop: 45
                                    }}>
                                        <span>SALES</span>
                                        <hr/>
                                    </div>

                                    <div>
                                        {/*TODO Add simple chart*/}
                                        <div>
                                            <div>
                                                <span className="overview-totalusers-device-percent">152K</span>
                                                <span style={{marginLeft: '10px'}} className="overview-totalusers-percent">+12%</span>
                                            </div>
                                            <span className="overview-totalusers-txt">Total Sales</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <div>
                                                <span className="overview-totalusers-device-percent">89.5K</span>
                                                <span style={{marginLeft: '10px'}} className="overview-totalusers-percent-red">-8%</span>
                                            </div>
                                            <span className="overview-totalusers-txt">Total Transactions</span>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </Col>
                <Col lg='4' md='12'>
                    <Row className='match-height'>
                        <Col xl='12' md='12' xs='12'>
                            <Card className='card-browser-states'>
                                <CardHeader>
                                    <div>
                                        <CardTitle tag='h4'><span className="overview-totalusers-cnt">Visits Per Day</span></CardTitle>
                                        <CardText className='font-small-2'><span className="overview-totalusers-txt">Total 248.5k Visits</span></CardText>
                                    </div>
                                    <UncontrolledDropdown className='chart-dropdown'>
                                        <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
                                            <MoreVertical size={18} className='cursor-pointer' />
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem className='w-100'>By Live</DropdownItem>
                                            <DropdownItem className='w-100'>By Draft</DropdownItem>
                                            <DropdownItem className='w-100'>By Lesson Note</DropdownItem>
                                            <DropdownItem className='w-100'>By Video</DropdownItem>
                                            <DropdownItem className='w-100'>By Podcast</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </CardHeader>
                                <CardBody>
                                    <Chart options={options} series={series} type='bar' height={200} />
                                    <div className="mt-2">
                                        <div>
                                            <span className="overview-totalusers-device-percent">Most Visited Day</span>
                                        </div>
                                        <span className="overview-totalusers-txt">Total 62.4k Visits on Thursday</span>
                                    </div>
                                    <Chart className="mt-2" options={mostVisitOptions} series={mostVisitSeries} type='donut' height={350} />
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </Col>
                <Col lg='4' md='12'>
                    <IconsTimeline />
                </Col>
            </Row>
            {/*<Row className='match-height'>*/}
            {/*  <Col lg='4' md='12'>*/}
            {/*    <Row className='match-height'>*/}
            {/*      <Col lg='6' md='3' xs='6'>*/}
            {/*        <OrdersBarChart warning={colors.warning.main} />*/}
            {/*      </Col>*/}
            {/*      <Col lg='6' md='3' xs='6'>*/}
            {/*        <ProfitLineChart info={colors.info.main} />*/}
            {/*      </Col>*/}
            {/*      <Col lg='12' md='6' xs='12'>*/}
            {/*        <Earnings success={colors.success.main} />*/}
            {/*      </Col>*/}
            {/*    </Row>*/}
            {/*  </Col>*/}
            {/*  <Col lg='8' md='12'>*/}
            {/*    <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />*/}
            {/*  </Col>*/}
            {/*</Row>*/}
            {/*<Row className='match-height'>*/}
            {/*  <Col lg='8' xs='12'>*/}
            {/*    <CompanyTable />*/}
            {/*  </Col>*/}
            {/*  <Col lg='4' md='6' xs='12'>*/}
            {/*    <CardMeetup />*/}
            {/*  </Col>*/}
            {/*  <Col lg='4' md='6' xs='12'>*/}
            {/*    <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />*/}
            {/*  </Col>*/}
            {/*  <Col lg='4' md='6' xs='12'>*/}
            {/*    <GoalOverview success={colors.success.main} />*/}
            {/*  </Col>*/}
            {/*  <Col lg='4' md='6' xs='12'>*/}
            {/*    <CardTransactions />*/}
            {/*  </Col>*/}
            {/*</Row>*/}
        </div>
    )
}

export default OverviewDashboard