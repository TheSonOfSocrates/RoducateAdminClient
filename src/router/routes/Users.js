import {lazy} from 'react'

const UserRoutes = [
    {
        path: '/users',
        component: lazy(() => import('../../roducate/pages/users/Users'))
    },
    {
        path: '/admins',
        component: lazy(() => import('../../roducate/pages/admins/Admins'))
    },
    {
        path: '/schools',
        component: lazy(() => import('../../roducate/pages/schools/Schools'))
    },
    {
        path: '/sponsors',
        component: lazy(() => import('../../roducate/pages/sponsors/Sponsors'))
    },
    {
        path: '/users/students',
        component: lazy(() => import('../../roducate/pages/students'))
    },
    {
        path: '/users/parents',
        component: lazy(() => import('../../roducate/pages/parents'))
    },
    {
        path: '/users/teachers',
        component: lazy(() => import('../../roducate/pages/teachers'))
    },
    {
        path: '/users/admins',
        component: lazy(() => import('../../roducate/pages/admins/Admins'))
    },
]

export default UserRoutes
