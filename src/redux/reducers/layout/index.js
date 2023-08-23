// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'
import {setCurrentLanguage} from "../../actions/layout";

// ** Returns Initial Menu Collapsed State
const initialMenuCollapsed = () => {
    const item = window.localStorage.getItem('menuCollapsed')
    //** Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

// ** Returns Initial Layout Skin
const initialLayoutSkin = () => {
    const item = window.localStorage.getItem('skin')
    //** Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : themeConfig.layout.skin
}

// ** Initial State
const initialState = {
    skin: initialLayoutSkin(),
    isRTL: themeConfig.layout.isRTL,
    menuCollapsed: initialMenuCollapsed(),
    menuHidden: themeConfig.layout.menu.isHidden,
    contentWidth: themeConfig.layout.contentWidth,
    isShowLoadingScreen: false,
    currentLanguage: 'English',
}

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HANDLE_CONTENT_WIDTH':
            return {...state, contentWidth: action.value}
        case 'HANDLE_MENU_COLLAPSED':
            window.localStorage.setItem('menuCollapsed', action.value)
            return {...state, menuCollapsed: action.value}
        case 'HANDLE_MENU_HIDDEN':
            return {...state, menuHidden: action.value}
        case 'HANDLE_RTL':
            return {...state, isRTL: action.value}
        case 'HANDLE_SKIN':
            return {...state, skin: action.value}
        case 'showLoadingScreen':
            return {...state, isShowLoadingScreen: action.isShowLoadingScreen}
        case 'setCurrentLanguage':
            return {...state, currentLanguage: action.setCurrentLanguage}

        default:
            return state
    }
}

export default layoutReducer
