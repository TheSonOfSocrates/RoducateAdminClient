// ** Routes Imports
import AppRoutes from './Apps'
import UserRoutes from './Users'
import DashboardRoutes from './Dashboards'
import Pages from './Pages'
import More from './More'

// ** Document title
const TemplateTitle = '%s - Roducate Admin Panel'

// ** Default Route
const DefaultRoute = '/dashboard/overview'

// ** Merge Routes
const Routes = [
    ...DashboardRoutes,
    ...AppRoutes,
    ...UserRoutes,
    ...Pages,
    ...More
]

export {DefaultRoute, TemplateTitle, Routes}
