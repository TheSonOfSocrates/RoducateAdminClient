// ** React Imports
import {Fragment, useRef, useState} from 'react'

// ** Vertical Menu Items Array
import navigation from '@src/navigation/vertical'

// ** Third Party Components
import classnames from 'classnames'

// ** Vertical Menu Components
import VerticalMenuHeader from './VerticalMenuHeader'
import VerticalNavMenuItems from './VerticalNavMenuItems'
import './index.css'

const Sidebar = props => {
    // ** Props
    const {menuCollapsed, routerProps, menu, currentActiveItem, skin} = props

    // ** States
    const [groupOpen, setGroupOpen] = useState(['apps_pages', 'user', 'more'])
    const [activeItem, setActiveItem] = useState(null)

    // ** Menu Hover State
    const [menuHover, setMenuHover] = useState(false)

    // ** Ref
    const shadowRef = useRef(null)

    // ** Function to handle Mouse Enter
    const onMouseEnter = () => {
        if (menuCollapsed) {
            setMenuHover(true)
        }
    }

    // ** Scroll Menu
    const scrollMenu = container => {
        if (shadowRef && container.scrollTop > 0) {
            if (!shadowRef.current.classList.contains('d-block')) {
                shadowRef.current.classList.add('d-block')
            }
        } else {
            if (shadowRef.current.classList.contains('d-block')) {
                shadowRef.current.classList.remove('d-block')
            }
        }
    }

    return (
        <Fragment>
            <div
                className={classnames('main-menu menu-fixed menu-accordion menu-shadow', {
                    expanded: menuHover || menuCollapsed === false,
                    'menu-light': skin !== 'semi-dark' && skin !== 'dark',
                    'menu-dark': skin === 'semi-dark' || skin === 'dark'
                })}
                onMouseEnter={onMouseEnter}
                onMouseLeave={() => setMenuHover(false)}
            >
                {menu ? (
                    menu(props)
                ) : (
                    <Fragment>
                        {/* Vertical Menu Header */}
                        <VerticalMenuHeader setGroupOpen={setGroupOpen} menuHover={menuHover} {...props} />
                        {/* Vertical Menu Header Shadow */}
                        <div className='shadow-bottom' ref={shadowRef}></div>
                        {/* Perfect Scrollbar */}
                        <div className="sidebar-nav-panel" style={{overflowY: 'hidden', height: 'calc(100% - 6.45rem)'}}>
                            <ul className='navigation navigation-main'>
                                <VerticalNavMenuItems
                                    items={navigation}
                                    activeItem={activeItem}
                                    setActiveItem={setActiveItem}
                                    groupOpen={groupOpen}
                                    setGroupOpen={setGroupOpen}
                                    routerProps={routerProps}
                                    menuCollapsed={menuCollapsed}
                                    menuHover={menuHover}
                                    currentActiveItem={currentActiveItem}
                                />
                            </ul>
                        </div>
                        {/*<PerfectScrollbar*/}
                        {/*    className='main-menu-content'*/}
                        {/*    options={{wheelPropagation: false}}*/}
                        {/*    onScrollY={container => scrollMenu(container)}*/}
                        {/*>*/}

                        {/*</PerfectScrollbar>*/}
                    </Fragment>
                )}
            </div>
        </Fragment>
    )
}

export default Sidebar
