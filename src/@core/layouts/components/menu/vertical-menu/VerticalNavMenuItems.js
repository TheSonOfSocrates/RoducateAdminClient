// ** React Imports
import {useContext} from 'react'

// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Ability Context
import {AbilityContext} from '@src/utility/context/Can'

// ** Utils
import {canViewMenuItem, resolveVerticalNavMenuItemComponent as resolveNavItemComponent} from '@layouts/utils'
import {canViewMenuGroup} from "../../../utils";

const VerticalMenuNavItems = props => {
    // ** Context
    const ability = useContext(AbilityContext)

    // ** Components Object
    const Components = {
        VerticalNavMenuSectionHeader,
        VerticalNavMenuGroup,
        VerticalNavMenuLink
    }

    // ** Render Nav Menu Items
    const RenderNavItems = props.items.map((item, index) => {
        const TagName = Components[resolveNavItemComponent(item)]
        if (item.children) {
            return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
        } else {
            return canViewMenuItem(item) && item.title &&
                <VerticalNavMenuLink key={item.id || item.header} item={item} {...props} />
        }
    })

    return RenderNavItems
}

export default VerticalMenuNavItems