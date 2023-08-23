//** React Imports
import { useEffect } from 'react'

// ** Actions & Store
import { handleSkin } from '../../redux/actions/layout'
import { useSelector, useDispatch } from 'react-redux'

export const useSkin = () => {
  const dispatch = useDispatch()
  const skin = useSelector(state => state.layout.skin)

  // ** Return a wrapped version of useState's setter function
  const setValue = value => {
    try {
      // ** Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(skin) : value
      // ** Save to store & local storage
      dispatch(handleSkin(value))
      window.localStorage.setItem('skin', JSON.stringify(valueToStore))
    } catch (error) {
      // ** A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body

    // ** Define classnames for skins
    const classNames = {
      dark: 'dark-layout',
      bordered: 'bordered-layout',
      'semi-dark': 'semi-dark-layout'
    }

    // ** Remove all classes from Body on mount
    element.classList.remove(...element.classList)

    // ** If skin is not light add skin class
    if (skin !== 'light') {
      element.classList.add(classNames[skin])
    }
  }, [skin])

  return [skin, setValue]
}
