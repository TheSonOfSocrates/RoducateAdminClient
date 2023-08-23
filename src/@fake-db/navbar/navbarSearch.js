import mock from '../mock'

export const searchArr = [
    {
        groupTitle: 'Pages',
        searchLimit: 10,
        data: [
            {
                id: 1,
                target: 'analyticsDash',
                isBookmarked: true,
                title: 'Overview',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM11 4.062C8.98271 4.31868 7.13885 5.33387 5.84319 6.90122C4.54752 8.46857 3.89728 10.4705 4.02462 12.5C4.15196 14.5296 5.04733 16.4345 6.52874 17.8276C8.01016 19.2207 9.96645 19.9975 12 20C13.9486 20 15.8302 19.2888 17.2917 18C18.7533 16.7112 19.6942 14.9333 19.938 13H12C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V4.062ZM13 4.062V11H19.938C19.7154 9.23761 18.9129 7.59934 17.6568 6.34324C16.4007 5.08713 14.7624 4.28459 13 4.062Z"
                        fill="#747474"/>
                </svg>,
                link: '/dashboard/overview'
            }
        ]
    },
]

// GET Search Data & Bookmarks
mock.onGet('/api/bookmarks/data').reply(config => {
    const bookmarks = searchArr[0].data.filter(item => item.isBookmarked)
    const suggestions = searchArr[0].data
    return [200, {suggestions, bookmarks}]
})

// POST Update isBookmarked
mock.onPost('/api/bookmarks/update').reply(config => {
    const {id} = JSON.parse(config.data)

    const obj = searchArr[0].data.find(item => item.id === id)

    Object.assign(obj, {isBookmarked: !obj.isBookmarked})

    return [200]
})
