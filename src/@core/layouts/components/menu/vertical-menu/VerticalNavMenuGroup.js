// ** React Imports
import {Link, useLocation} from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import {Badge, Collapse} from 'reactstrap'
import {FormattedMessage} from 'react-intl'

// ** Vertical Menu Items Component
import VerticalNavMenuItems from './VerticalNavMenuItems'

// ** Utils
import {getAllParents} from '@layouts/utils'
import './VerticalNavMenuGroup.css'

const VerticalNavMenuGroup = ({
                                  item,
                                  activeItem,
                                  setActiveItem,
                                  groupOpen,
                                  setGroupOpen,
                                  parentItem,
                                  menuCollapsed,
                                  menuHover,
                                  routerProps,
                                  currentActiveItem
                              }) => {

    // ** Current Val
    const currentURL = useLocation().pathname

    // ** Toggles Open Group
    const toggleOpenGroup = (item, parentItem) => {
        let openArr = groupOpen
        let allParents

        if (parentItem) {
            allParents = getAllParents(parentItem, 'id')
            allParents.pop()
        }

        // ** If user clicked on menu group inside already opened group i.g. when user click on blog group inside pages group
        if (groupOpen && allParents && groupOpen[0] === allParents[0]) {
            groupOpen.includes(item) ? openArr.splice(openArr.indexOf(item), 1) : openArr.push(item)
        } else {
            groupOpen.includes(item) ? openArr.splice(openArr.indexOf(item), 1) : openArr.push(item)
            // openArr = []
            // if (!groupOpen.includes(item)) {
            // openArr.push(item)
            // }
        }

        // ** Set Open Group
        setGroupOpen([...openArr])
    }

    // ** Toggle Active Group
    const toggleActiveGroup = (item, parentItem) => {
        let openArr = groupOpen
        let allParents

        if (parentItem) {
            allParents = getAllParents(parentItem, 'id')
            openArr = allParents
        } else {
            openArr.includes(item) ? openArr.splice(openArr.indexOf(item), 1) : openArr.push(item)
        }

        setGroupOpen([...openArr])
    }

    // ** On Group Item Click
    const onCollapseClick = (e, item) => {
        toggleOpenGroup(item.id, parentItem)
        e?.preventDefault()
    }

    // ** Returns condition to add open class
    const openClassCondition = id => {
        if ((menuCollapsed && menuHover) || menuCollapsed === false) {
            if (groupOpen?.includes(item.id)) {
                return true
            }
        } else if (menuCollapsed && menuHover === false) {
            return false
        } else {
            return null
        }
    }

    return (
        <li
            className={classnames('nav-item has-sub', {
                open: openClassCondition(item.id),
                'menu-collapsed-open': groupOpen.includes(item.id)
            })}
        >
            <Link style={{background: 'white'}} className='d-flex align-items-center' to='/'
                  onClick={e => onCollapseClick(e, item)}>
                {/*{item.icon}*/}
                <span style={{
                    width: 16,
                    height: 1,
                    backgroundColor: '#CACACC',
                    marginRight: 15,
                    marginLeft: '-10px'
                }}></span>
                <span className='menu-title text-truncate ver-menu-header'><FormattedMessage id={item.title}/></span>

                {item.badge && item.badgeText ? (
                    <Badge className='ml-auto mr-1' color={item.badge} pill>
                        {item.badgeText}
                    </Badge>
                ) : null}
            </Link>

            {/* Render Child Recursively Through VerticalNavMenuItems Component */}
            <ul className='menu-content'>
                <Collapse
                    isOpen={(groupOpen && groupOpen.includes(item.id))}>
                    <VerticalNavMenuItems
                        items={item.children}
                        groupOpen={groupOpen}
                        setGroupOpen={setGroupOpen}
                        toggleActiveGroup={toggleActiveGroup}
                        parentItem={item}
                        menuCollapsed={menuCollapsed}
                        menuHover={menuHover}
                        routerProps={routerProps}
                        currentActiveItem={currentActiveItem}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                    />
                </Collapse>
            </ul>
        </li>
    )
}

export default VerticalNavMenuGroup
