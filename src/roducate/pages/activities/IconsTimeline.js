import Timeline from '@components/timeline'
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap'
import {MoreVertical} from "react-feather";
import React, {useEffect, useState} from "react";
import axios from "../../../utility/axios";
import Avatar from "../../../@core/components/avatar";

const IconsTimeline = () => {

    const [timeLine, setTimeLine] = useState(undefined)
    const [totalPageCnt, setTotalPageCnt] = useState(0)

    useEffect(async () => {
        const res = await axios.post('/activity/getAllActivity', {
            "pageSize": 10,
            "pageNumber": 1
        })
        setTimeLine(res.data?.data?.map(item => ({
            title: item.action,
            content: item.details,
            // meta: '12 min ago',
            customContent: (
                <div className="d-flex align-items-center justify-content-center">
                    <Avatar img={`${process.env.REACT_APP_3BUCKET_URL}${item.user.avatar}`}
                            imgHeight='30' imgWidth='30' status='online'/>&nbsp;
                    <span>{item.user.name}</span>
                </div>
            )
        })))
        setTotalPageCnt(res.data.totalPages)
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Timeline</CardTitle>
                <UncontrolledDropdown className='chart-dropdown'>
                    <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
                        <MoreVertical size={18} className='cursor-pointer'/>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem className='w-100'>Clear All</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </CardHeader>
            <CardBody>
                <Timeline data={timeLine}/>
            </CardBody>
        </Card>
    )
}

export default IconsTimeline
