import Timeline from '@components/timeline'
import {iconsData} from './data'
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

const IconsTimeline = () => {
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
                <Timeline data={iconsData}/>
            </CardBody>
        </Card>
    )
}

export default IconsTimeline
