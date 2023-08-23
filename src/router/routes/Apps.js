import {lazy} from 'react'

const AppRoutes = [
    {
        path: '/apps/activities',
        component: lazy(() => import('../../roducate/pages/activities'))
    },
    {
        path: '/apps/plans',
        component: lazy(() => import('../../roducate/pages/plans'))
    },
    // resources
    {
        path: '/apps/resources/study',
        component: lazy(() => import('../../roducate/pages/study/Study'))
    },
    {
        path: '/apps/resources/exam_success',
        component: lazy(() => import('../../roducate/pages/exam_success/ExamSuccess'))
    },
    {
        path: '/apps/resources/mock_exams',
        component: lazy(() => import('../../roducate/pages/mock_exam/MockExam'))
    },
    {
        path: '/apps/resources/videos',
        component: lazy(() => import('../../roducate/pages/video/Video'))
    },
    {
        path: '/apps/resources/podcasts',
        component: lazy(() => import('../../roducate/pages/podcast/Podcast'))
    },
    {
        path: '/apps/resources/lifeskills',
        component: lazy(() => import('../../roducate/pages/lifeskill/LifeSkill'))
    },
    {
        path: '/apps/resources/games',
        component: lazy(() => import('../../roducate/pages/game/Game'))
    },
    {
        path: '/apps/resources',
        component: lazy(() => import('../../roducate/pages/resources'))
    },
    // library
    {
        path: '/apps/library',
        component: lazy(() => import('../../roducate/pages/library/Library'))
    },
    {
        path: '/apps/sales',
        component: lazy(() => import('../../roducate/pages/sales/Sales'))
    },
    {
        path: '/apps/market',
        component: lazy(() => import('../../roducate/pages/market/Market'))
    },
    {
        path: '/apps/products',
        component: lazy(() => import('../../roducate/pages/products/Products'))
    },
    {
        path: '/apps/events',
        component: lazy(() => import('../../roducate/pages/events/Event'))
    },
    {
        path: '/apps/community',
        component: lazy(() => import('../../roducate/pages/community/Community'))
    },
    {
        path: '/apps/badges_rewards',
        component: lazy(() => import('../../roducate/pages/badges_rewards/BadgeReward'))
    },
    {
        path: '/apps/adverts',
        component: lazy(() => import('../../roducate/pages/adverts/Adverts'))
    }
]

export default AppRoutes
