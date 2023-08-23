// ** React Imports
import {useEffect} from 'react'
import {matchPath, NavLink, useLocation} from 'react-router-dom'

// ** Third Party Components
import {Badge} from 'reactstrap'
import classnames from 'classnames'
import {FormattedMessage} from 'react-intl'

// ** Vertical Menu Array Of Items
import navigation from '@src/navigation/vertical'

// ** Utils
import {getAllParents, search} from '@layouts/utils'
import {useDispatch} from "react-redux";
import {showCreateModal} from '@store/actions/modal'
import {setNavTitle} from "../../../../../redux/actions/navbar";
import './VerticalNavMenuLink.css'

const VerticalNavMenuLink = ({
                                 item,
                                 activeItem,
                                 setActiveItem,
                                 groupOpen,
                                 setGroupOpen,
                                 toggleActiveGroup,
                                 parentItem,
                                 routerProps,
                                 currentActiveItem
                             }) => {
    // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
    const LinkTag = item.externalLink ? 'a' : NavLink

    // ** URL Vars
    const location = useLocation()
    const currentURL = location.pathname

    // ** To match path
    const match = matchPath(currentURL, {
        path: `${item?.navLink}/:param`,
        exact: true,
        strict: false
    })

    // ** Search for current item parents
    const searchParents = (navigation, currentURL) => {
        const parents = search(navigation, currentURL, routerProps) // Search for parent object
        const allParents = getAllParents(parents, 'id') // Parents Object to Parents Array
        return allParents
    }

    // ** URL Vars
    const resetActiveGroup = navLink => {
        const parents = search(navigation, navLink, match)
        toggleActiveGroup(item.id, parents)
    }

    // ** Reset Active & Open Group Arrays
    const resetActiveAndOpenGroups = () => {
        setGroupOpen([])
    }

    // ** Checks url & updates active item
    useEffect(() => {
        if (currentActiveItem !== null) {
            setActiveItem(currentActiveItem)
        }
    }, [location])

    const dispatch = useDispatch()

    const actionPerformed = (action) => {
        if (action === undefined) return

        switch (action) {
            case 'modal_create':
                dispatch(showCreateModal())
                break
        }
    }

    return (
        <li
            className={classnames({
                'vertical-nav-li-link': true,
                'nav-item': !item.children,
                disabled: item.disabled,
                active: item?.navLink === activeItem
            })}

            onClick={() => actionPerformed(item?.action)}
        >
            <LinkTag
                className='d-flex align-items-center'
                target={item.newTab ? '_blank' : undefined}
                /*eslint-disable */
                {...(item.externalLink === true
                    ? {
                        href: item?.navLink || '/'
                    }
                    : {
                        to: item?.navLink || '/',
                        isActive: (match, location) => {
                            if (!match) {
                                return false
                            }

                            if (match.url && match.url !== '' && match.url === item?.navLink) {
                                currentActiveItem = item?.navLink
                            }
                        }
                    })}
                /*eslint-enable */
                onClick={e => {
                    if (item?.navLink) {
                        let title = item?.navLink.split("/")[2]
                        if (title) {
                            let capitalizedWord = title?.charAt(0).toUpperCase() + title?.slice(1);
                            dispatch(setNavTitle(capitalizedWord))
                        } else
                            dispatch(setNavTitle(item?.navLink.charAt(1).toUpperCase() + item?.navLink?.slice(2)))
                    }
                    // parentItem ? resetActiveGroup(item?.navLink) : resetActiveAndOpenGroups()
                }}
            >
                {item?.navLink === activeItem ? item?.activeIcon : item.icon}
                <span className='menu-item text-truncate vertical-menu-item-text'
                      style={{color: item?.navLink === activeItem ? 'white' : 'black'}}>
          <FormattedMessage id={item.title}/>
        </span>
                {item.badge && item.badgeText ? (
                    <Badge style={{backgroundColor: `${item.badge}`}} className='ml-auto mr-1' pill>
                        {item.badgeText}
                    </Badge>
                ) : null}
            </LinkTag>
        </li>
    )
}

export default VerticalNavMenuLink
