import {lazy} from 'react'

const MoreRoutes = [
    {
        path: '/more/settings',
        component: lazy(() => import('../../roducate/pages/settings/Settings'))
    },
]

export default MoreRoutes