import {Circle, Minus} from 'react-feather'

export default [
    {
        id: 'user',
        title: 'USERS',
        icon: <Minus size={15}/>,
        children: [
            {
                id: 'users',
                title: 'Users',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M16 14C17.2885 14.0001 18.5272 14.4975 19.4578 15.3887C20.3884 16.2798 20.9391 17.4958 20.995 18.783L21 19V21C20.9997 21.2549 20.9021 21.5 20.7272 21.6854C20.5522 21.8707 20.313 21.9822 20.0586 21.9972C19.8042 22.0121 19.5536 21.9293 19.3582 21.7657C19.1627 21.6021 19.0371 21.3701 19.007 21.117L19 21V19C19 18.2348 18.7077 17.4985 18.1827 16.9417C17.6578 16.385 16.9399 16.0499 16.176 16.005L16 16H8C7.23479 16 6.49849 16.2923 5.94174 16.8173C5.38499 17.3422 5.04989 18.0601 5.005 18.824L5 19V21C4.99972 21.2549 4.90212 21.5 4.72715 21.6854C4.55218 21.8707 4.31305 21.9822 4.05861 21.9972C3.80416 22.0121 3.55362 21.9293 3.35817 21.7657C3.16271 21.6021 3.0371 21.3701 3.007 21.117L3 21V19C3.00007 17.7115 3.49754 16.4728 4.38866 15.5422C5.27978 14.6116 6.49575 14.0609 7.783 14.005L8 14H16ZM12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7C17 8.32608 16.4732 9.59785 15.5355 10.5355C14.5979 11.4732 13.3261 12 12 12C10.6739 12 9.40215 11.4732 8.46447 10.5355C7.52678 9.59785 7 8.32608 7 7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2ZM12 4C11.606 4 11.2159 4.0776 10.8519 4.22836C10.488 4.37913 10.1573 4.6001 9.87868 4.87868C9.6001 5.15726 9.37913 5.48797 9.22836 5.85195C9.0776 6.21593 9 6.60603 9 7C9 7.39397 9.0776 7.78407 9.22836 8.14805C9.37913 8.51203 9.6001 8.84274 9.87868 9.12132C10.1573 9.3999 10.488 9.62087 10.8519 9.77164C11.2159 9.9224 11.606 10 12 10C12.7956 10 13.5587 9.68393 14.1213 9.12132C14.6839 8.55871 15 7.79565 15 7C15 6.20435 14.6839 5.44129 14.1213 4.87868C13.5587 4.31607 12.7956 4 12 4Z"/>
                </svg>,
                activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="white"
                                 xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M16 14C17.2885 14.0001 18.5272 14.4975 19.4578 15.3887C20.3884 16.2798 20.9391 17.4958 20.995 18.783L21 19V21C20.9997 21.2549 20.9021 21.5 20.7272 21.6854C20.5522 21.8707 20.313 21.9822 20.0586 21.9972C19.8042 22.0121 19.5536 21.9293 19.3582 21.7657C19.1627 21.6021 19.0371 21.3701 19.007 21.117L19 21V19C19 18.2348 18.7077 17.4985 18.1827 16.9417C17.6578 16.385 16.9399 16.0499 16.176 16.005L16 16H8C7.23479 16 6.49849 16.2923 5.94174 16.8173C5.38499 17.3422 5.04989 18.0601 5.005 18.824L5 19V21C4.99972 21.2549 4.90212 21.5 4.72715 21.6854C4.55218 21.8707 4.31305 21.9822 4.05861 21.9972C3.80416 22.0121 3.55362 21.9293 3.35817 21.7657C3.16271 21.6021 3.0371 21.3701 3.007 21.117L3 21V19C3.00007 17.7115 3.49754 16.4728 4.38866 15.5422C5.27978 14.6116 6.49575 14.0609 7.783 14.005L8 14H16ZM12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7C17 8.32608 16.4732 9.59785 15.5355 10.5355C14.5979 11.4732 13.3261 12 12 12C10.6739 12 9.40215 11.4732 8.46447 10.5355C7.52678 9.59785 7 8.32608 7 7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2ZM12 4C11.606 4 11.2159 4.0776 10.8519 4.22836C10.488 4.37913 10.1573 4.6001 9.87868 4.87868C9.6001 5.15726 9.37913 5.48797 9.22836 5.85195C9.0776 6.21593 9 6.60603 9 7C9 7.39397 9.0776 7.78407 9.22836 8.14805C9.37913 8.51203 9.6001 8.84274 9.87868 9.12132C10.1573 9.3999 10.488 9.62087 10.8519 9.77164C11.2159 9.9224 11.606 10 12 10C12.7956 10 13.5587 9.68393 14.1213 9.12132C14.6839 8.55871 15 7.79565 15 7C15 6.20435 14.6839 5.44129 14.1213 4.87868C13.5587 4.31607 12.7956 4 12 4Z"/>
                </svg>,
                navLink: '/users',
                badge: 'light-secondary',
                badgeText: '1M',
                subMenu: [
                    {
                        id: 'students',
                        title: 'Students',
                        icon: <Circle size={12}/>,
                        navLink: '/users/students'
                    },
                    {
                        id: 'parents',
                        title: 'Parents',
                        icon: <Circle size={12}/>,
                        navLink: '/users/parents'
                    },
                    {
                        id: 'teachers',
                        title: 'Teachers',
                        icon: <Circle size={12}/>,
                        navLink: '/users/teachers'
                    }
                ]
            },
            {
                id: 'admins',
                title: 'Admins',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M13 13C14.0609 13 15.0783 13.4214 15.8284 14.1716C16.5786 14.9217 17 15.9391 17 17V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20C15.7348 20 15.4804 19.8946 15.2929 19.7071C15.1054 19.5196 15 19.2652 15 19V17C15 16.4696 14.7893 15.9609 14.4142 15.5858C14.0391 15.2107 13.5304 15 13 15H6C5.46957 15 4.96086 15.2107 4.58579 15.5858C4.21071 15.9609 4 16.4696 4 17V19C4 19.2652 3.89464 19.5196 3.70711 19.7071C3.51957 19.8946 3.26522 20 3 20C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V17C2 15.9391 2.42143 14.9217 3.17157 14.1716C3.92172 13.4214 4.93913 13 6 13H13ZM19 13C19.7956 13 20.5587 13.3161 21.1213 13.8787C21.6839 14.4413 22 15.2044 22 16V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19C20.7348 19 20.4804 18.8946 20.2929 18.7071C20.1054 18.5196 20 18.2652 20 18V16C20 15.7348 19.8946 15.4804 19.7071 15.2929C19.5196 15.1054 19.2652 15 19 15H17.584C17.2373 14.2082 16.6921 13.5193 16.001 13H19ZM9.5 3C10.6935 3 11.8381 3.47411 12.682 4.31802C13.5259 5.16193 14 6.30653 14 7.5C14 8.69347 13.5259 9.83807 12.682 10.682C11.8381 11.5259 10.6935 12 9.5 12C8.30653 12 7.16193 11.5259 6.31802 10.682C5.47411 9.83807 5 8.69347 5 7.5C5 6.30653 5.47411 5.16193 6.31802 4.31802C7.16193 3.47411 8.30653 3 9.5 3ZM18 6C18.7956 6 19.5587 6.31607 20.1213 6.87868C20.6839 7.44129 21 8.20435 21 9C21 9.79565 20.6839 10.5587 20.1213 11.1213C19.5587 11.6839 18.7956 12 18 12C17.2044 12 16.4413 11.6839 15.8787 11.1213C15.3161 10.5587 15 9.79565 15 9C15 8.20435 15.3161 7.44129 15.8787 6.87868C16.4413 6.31607 17.2044 6 18 6ZM9.5 5C8.83696 5 8.20107 5.26339 7.73223 5.73223C7.26339 6.20107 7 6.83696 7 7.5C7 8.16304 7.26339 8.79893 7.73223 9.26777C8.20107 9.73661 8.83696 10 9.5 10C10.163 10 10.7989 9.73661 11.2678 9.26777C11.7366 8.79893 12 8.16304 12 7.5C12 6.83696 11.7366 6.20107 11.2678 5.73223C10.7989 5.26339 10.163 5 9.5 5ZM18 8C17.7348 8 17.4804 8.10536 17.2929 8.29289C17.1054 8.48043 17 8.73478 17 9C17 9.26522 17.1054 9.51957 17.2929 9.70711C17.4804 9.89464 17.7348 10 18 10C18.2652 10 18.5196 9.89464 18.7071 9.70711C18.8946 9.51957 19 9.26522 19 9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8Z"/>
                </svg>,
                activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="white"
                                 xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M13 13C14.0609 13 15.0783 13.4214 15.8284 14.1716C16.5786 14.9217 17 15.9391 17 17V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20C15.7348 20 15.4804 19.8946 15.2929 19.7071C15.1054 19.5196 15 19.2652 15 19V17C15 16.4696 14.7893 15.9609 14.4142 15.5858C14.0391 15.2107 13.5304 15 13 15H6C5.46957 15 4.96086 15.2107 4.58579 15.5858C4.21071 15.9609 4 16.4696 4 17V19C4 19.2652 3.89464 19.5196 3.70711 19.7071C3.51957 19.8946 3.26522 20 3 20C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V17C2 15.9391 2.42143 14.9217 3.17157 14.1716C3.92172 13.4214 4.93913 13 6 13H13ZM19 13C19.7956 13 20.5587 13.3161 21.1213 13.8787C21.6839 14.4413 22 15.2044 22 16V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19C20.7348 19 20.4804 18.8946 20.2929 18.7071C20.1054 18.5196 20 18.2652 20 18V16C20 15.7348 19.8946 15.4804 19.7071 15.2929C19.5196 15.1054 19.2652 15 19 15H17.584C17.2373 14.2082 16.6921 13.5193 16.001 13H19ZM9.5 3C10.6935 3 11.8381 3.47411 12.682 4.31802C13.5259 5.16193 14 6.30653 14 7.5C14 8.69347 13.5259 9.83807 12.682 10.682C11.8381 11.5259 10.6935 12 9.5 12C8.30653 12 7.16193 11.5259 6.31802 10.682C5.47411 9.83807 5 8.69347 5 7.5C5 6.30653 5.47411 5.16193 6.31802 4.31802C7.16193 3.47411 8.30653 3 9.5 3ZM18 6C18.7956 6 19.5587 6.31607 20.1213 6.87868C20.6839 7.44129 21 8.20435 21 9C21 9.79565 20.6839 10.5587 20.1213 11.1213C19.5587 11.6839 18.7956 12 18 12C17.2044 12 16.4413 11.6839 15.8787 11.1213C15.3161 10.5587 15 9.79565 15 9C15 8.20435 15.3161 7.44129 15.8787 6.87868C16.4413 6.31607 17.2044 6 18 6ZM9.5 5C8.83696 5 8.20107 5.26339 7.73223 5.73223C7.26339 6.20107 7 6.83696 7 7.5C7 8.16304 7.26339 8.79893 7.73223 9.26777C8.20107 9.73661 8.83696 10 9.5 10C10.163 10 10.7989 9.73661 11.2678 9.26777C11.7366 8.79893 12 8.16304 12 7.5C12 6.83696 11.7366 6.20107 11.2678 5.73223C10.7989 5.26339 10.163 5 9.5 5ZM18 8C17.7348 8 17.4804 8.10536 17.2929 8.29289C17.1054 8.48043 17 8.73478 17 9C17 9.26522 17.1054 9.51957 17.2929 9.70711C17.4804 9.89464 17.7348 10 18 10C18.2652 10 18.5196 9.89464 18.7071 9.70711C18.8946 9.51957 19 9.26522 19 9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8Z"/>
                </svg>,
                navLink: '/admins',
                subMenu: [
                    {
                        id: 'create_admin',
                        title: 'Create Admin',
                        navLink: '/admins/create_admin'
                    },
                    {
                        id: 'manage_admins',
                        title: 'Manage Admins',
                        navLink: '/admins/manage_admins'
                    }
                ]
            },
            {
                id: 'schools',
                title: 'Schools',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M13 13C14.0609 13 15.0783 13.4214 15.8284 14.1716C16.5786 14.9217 17 15.9391 17 17V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20C15.7348 20 15.4804 19.8946 15.2929 19.7071C15.1054 19.5196 15 19.2652 15 19V17C15 16.4696 14.7893 15.9609 14.4142 15.5858C14.0391 15.2107 13.5304 15 13 15H6C5.46957 15 4.96086 15.2107 4.58579 15.5858C4.21071 15.9609 4 16.4696 4 17V19C4 19.2652 3.89464 19.5196 3.70711 19.7071C3.51957 19.8946 3.26522 20 3 20C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V17C2 15.9391 2.42143 14.9217 3.17157 14.1716C3.92172 13.4214 4.93913 13 6 13H13ZM19 13C19.7956 13 20.5587 13.3161 21.1213 13.8787C21.6839 14.4413 22 15.2044 22 16V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19C20.7348 19 20.4804 18.8946 20.2929 18.7071C20.1054 18.5196 20 18.2652 20 18V16C20 15.7348 19.8946 15.4804 19.7071 15.2929C19.5196 15.1054 19.2652 15 19 15H17.584C17.2373 14.2082 16.6921 13.5193 16.001 13H19ZM9.5 3C10.6935 3 11.8381 3.47411 12.682 4.31802C13.5259 5.16193 14 6.30653 14 7.5C14 8.69347 13.5259 9.83807 12.682 10.682C11.8381 11.5259 10.6935 12 9.5 12C8.30653 12 7.16193 11.5259 6.31802 10.682C5.47411 9.83807 5 8.69347 5 7.5C5 6.30653 5.47411 5.16193 6.31802 4.31802C7.16193 3.47411 8.30653 3 9.5 3ZM18 6C18.7956 6 19.5587 6.31607 20.1213 6.87868C20.6839 7.44129 21 8.20435 21 9C21 9.79565 20.6839 10.5587 20.1213 11.1213C19.5587 11.6839 18.7956 12 18 12C17.2044 12 16.4413 11.6839 15.8787 11.1213C15.3161 10.5587 15 9.79565 15 9C15 8.20435 15.3161 7.44129 15.8787 6.87868C16.4413 6.31607 17.2044 6 18 6ZM9.5 5C8.83696 5 8.20107 5.26339 7.73223 5.73223C7.26339 6.20107 7 6.83696 7 7.5C7 8.16304 7.26339 8.79893 7.73223 9.26777C8.20107 9.73661 8.83696 10 9.5 10C10.163 10 10.7989 9.73661 11.2678 9.26777C11.7366 8.79893 12 8.16304 12 7.5C12 6.83696 11.7366 6.20107 11.2678 5.73223C10.7989 5.26339 10.163 5 9.5 5ZM18 8C17.7348 8 17.4804 8.10536 17.2929 8.29289C17.1054 8.48043 17 8.73478 17 9C17 9.26522 17.1054 9.51957 17.2929 9.70711C17.4804 9.89464 17.7348 10 18 10C18.2652 10 18.5196 9.89464 18.7071 9.70711C18.8946 9.51957 19 9.26522 19 9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8Z"/>
                </svg>,
                activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="white"
                                 xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M13 13C14.0609 13 15.0783 13.4214 15.8284 14.1716C16.5786 14.9217 17 15.9391 17 17V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20C15.7348 20 15.4804 19.8946 15.2929 19.7071C15.1054 19.5196 15 19.2652 15 19V17C15 16.4696 14.7893 15.9609 14.4142 15.5858C14.0391 15.2107 13.5304 15 13 15H6C5.46957 15 4.96086 15.2107 4.58579 15.5858C4.21071 15.9609 4 16.4696 4 17V19C4 19.2652 3.89464 19.5196 3.70711 19.7071C3.51957 19.8946 3.26522 20 3 20C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V17C2 15.9391 2.42143 14.9217 3.17157 14.1716C3.92172 13.4214 4.93913 13 6 13H13ZM19 13C19.7956 13 20.5587 13.3161 21.1213 13.8787C21.6839 14.4413 22 15.2044 22 16V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19C20.7348 19 20.4804 18.8946 20.2929 18.7071C20.1054 18.5196 20 18.2652 20 18V16C20 15.7348 19.8946 15.4804 19.7071 15.2929C19.5196 15.1054 19.2652 15 19 15H17.584C17.2373 14.2082 16.6921 13.5193 16.001 13H19ZM9.5 3C10.6935 3 11.8381 3.47411 12.682 4.31802C13.5259 5.16193 14 6.30653 14 7.5C14 8.69347 13.5259 9.83807 12.682 10.682C11.8381 11.5259 10.6935 12 9.5 12C8.30653 12 7.16193 11.5259 6.31802 10.682C5.47411 9.83807 5 8.69347 5 7.5C5 6.30653 5.47411 5.16193 6.31802 4.31802C7.16193 3.47411 8.30653 3 9.5 3ZM18 6C18.7956 6 19.5587 6.31607 20.1213 6.87868C20.6839 7.44129 21 8.20435 21 9C21 9.79565 20.6839 10.5587 20.1213 11.1213C19.5587 11.6839 18.7956 12 18 12C17.2044 12 16.4413 11.6839 15.8787 11.1213C15.3161 10.5587 15 9.79565 15 9C15 8.20435 15.3161 7.44129 15.8787 6.87868C16.4413 6.31607 17.2044 6 18 6ZM9.5 5C8.83696 5 8.20107 5.26339 7.73223 5.73223C7.26339 6.20107 7 6.83696 7 7.5C7 8.16304 7.26339 8.79893 7.73223 9.26777C8.20107 9.73661 8.83696 10 9.5 10C10.163 10 10.7989 9.73661 11.2678 9.26777C11.7366 8.79893 12 8.16304 12 7.5C12 6.83696 11.7366 6.20107 11.2678 5.73223C10.7989 5.26339 10.163 5 9.5 5ZM18 8C17.7348 8 17.4804 8.10536 17.2929 8.29289C17.1054 8.48043 17 8.73478 17 9C17 9.26522 17.1054 9.51957 17.2929 9.70711C17.4804 9.89464 17.7348 10 18 10C18.2652 10 18.5196 9.89464 18.7071 9.70711C18.8946 9.51957 19 9.26522 19 9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8Z"/>
                </svg>,
                navLink: '/schools',
                subMenu: [
                    {
                        id: 'create_school',
                        title: 'Create School',
                        navLink: '/admins/create_school'
                    },
                    {
                        id: 'manage_schools',
                        title: 'Manage Schools',
                        navLink: '/admins/manage_schools'
                    }
                ]
            },
            {
                id: 'sponsors',
                title: 'Sponsors',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M13 13C14.0609 13 15.0783 13.4214 15.8284 14.1716C16.5786 14.9217 17 15.9391 17 17V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20C15.7348 20 15.4804 19.8946 15.2929 19.7071C15.1054 19.5196 15 19.2652 15 19V17C15 16.4696 14.7893 15.9609 14.4142 15.5858C14.0391 15.2107 13.5304 15 13 15H6C5.46957 15 4.96086 15.2107 4.58579 15.5858C4.21071 15.9609 4 16.4696 4 17V19C4 19.2652 3.89464 19.5196 3.70711 19.7071C3.51957 19.8946 3.26522 20 3 20C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V17C2 15.9391 2.42143 14.9217 3.17157 14.1716C3.92172 13.4214 4.93913 13 6 13H13ZM19 13C19.7956 13 20.5587 13.3161 21.1213 13.8787C21.6839 14.4413 22 15.2044 22 16V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19C20.7348 19 20.4804 18.8946 20.2929 18.7071C20.1054 18.5196 20 18.2652 20 18V16C20 15.7348 19.8946 15.4804 19.7071 15.2929C19.5196 15.1054 19.2652 15 19 15H17.584C17.2373 14.2082 16.6921 13.5193 16.001 13H19ZM9.5 3C10.6935 3 11.8381 3.47411 12.682 4.31802C13.5259 5.16193 14 6.30653 14 7.5C14 8.69347 13.5259 9.83807 12.682 10.682C11.8381 11.5259 10.6935 12 9.5 12C8.30653 12 7.16193 11.5259 6.31802 10.682C5.47411 9.83807 5 8.69347 5 7.5C5 6.30653 5.47411 5.16193 6.31802 4.31802C7.16193 3.47411 8.30653 3 9.5 3ZM18 6C18.7956 6 19.5587 6.31607 20.1213 6.87868C20.6839 7.44129 21 8.20435 21 9C21 9.79565 20.6839 10.5587 20.1213 11.1213C19.5587 11.6839 18.7956 12 18 12C17.2044 12 16.4413 11.6839 15.8787 11.1213C15.3161 10.5587 15 9.79565 15 9C15 8.20435 15.3161 7.44129 15.8787 6.87868C16.4413 6.31607 17.2044 6 18 6ZM9.5 5C8.83696 5 8.20107 5.26339 7.73223 5.73223C7.26339 6.20107 7 6.83696 7 7.5C7 8.16304 7.26339 8.79893 7.73223 9.26777C8.20107 9.73661 8.83696 10 9.5 10C10.163 10 10.7989 9.73661 11.2678 9.26777C11.7366 8.79893 12 8.16304 12 7.5C12 6.83696 11.7366 6.20107 11.2678 5.73223C10.7989 5.26339 10.163 5 9.5 5ZM18 8C17.7348 8 17.4804 8.10536 17.2929 8.29289C17.1054 8.48043 17 8.73478 17 9C17 9.26522 17.1054 9.51957 17.2929 9.70711C17.4804 9.89464 17.7348 10 18 10C18.2652 10 18.5196 9.89464 18.7071 9.70711C18.8946 9.51957 19 9.26522 19 9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8Z"/>
                </svg>,
                activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="white"
                                 xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M13 13C14.0609 13 15.0783 13.4214 15.8284 14.1716C16.5786 14.9217 17 15.9391 17 17V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20C15.7348 20 15.4804 19.8946 15.2929 19.7071C15.1054 19.5196 15 19.2652 15 19V17C15 16.4696 14.7893 15.9609 14.4142 15.5858C14.0391 15.2107 13.5304 15 13 15H6C5.46957 15 4.96086 15.2107 4.58579 15.5858C4.21071 15.9609 4 16.4696 4 17V19C4 19.2652 3.89464 19.5196 3.70711 19.7071C3.51957 19.8946 3.26522 20 3 20C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V17C2 15.9391 2.42143 14.9217 3.17157 14.1716C3.92172 13.4214 4.93913 13 6 13H13ZM19 13C19.7956 13 20.5587 13.3161 21.1213 13.8787C21.6839 14.4413 22 15.2044 22 16V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19C20.7348 19 20.4804 18.8946 20.2929 18.7071C20.1054 18.5196 20 18.2652 20 18V16C20 15.7348 19.8946 15.4804 19.7071 15.2929C19.5196 15.1054 19.2652 15 19 15H17.584C17.2373 14.2082 16.6921 13.5193 16.001 13H19ZM9.5 3C10.6935 3 11.8381 3.47411 12.682 4.31802C13.5259 5.16193 14 6.30653 14 7.5C14 8.69347 13.5259 9.83807 12.682 10.682C11.8381 11.5259 10.6935 12 9.5 12C8.30653 12 7.16193 11.5259 6.31802 10.682C5.47411 9.83807 5 8.69347 5 7.5C5 6.30653 5.47411 5.16193 6.31802 4.31802C7.16193 3.47411 8.30653 3 9.5 3ZM18 6C18.7956 6 19.5587 6.31607 20.1213 6.87868C20.6839 7.44129 21 8.20435 21 9C21 9.79565 20.6839 10.5587 20.1213 11.1213C19.5587 11.6839 18.7956 12 18 12C17.2044 12 16.4413 11.6839 15.8787 11.1213C15.3161 10.5587 15 9.79565 15 9C15 8.20435 15.3161 7.44129 15.8787 6.87868C16.4413 6.31607 17.2044 6 18 6ZM9.5 5C8.83696 5 8.20107 5.26339 7.73223 5.73223C7.26339 6.20107 7 6.83696 7 7.5C7 8.16304 7.26339 8.79893 7.73223 9.26777C8.20107 9.73661 8.83696 10 9.5 10C10.163 10 10.7989 9.73661 11.2678 9.26777C11.7366 8.79893 12 8.16304 12 7.5C12 6.83696 11.7366 6.20107 11.2678 5.73223C10.7989 5.26339 10.163 5 9.5 5ZM18 8C17.7348 8 17.4804 8.10536 17.2929 8.29289C17.1054 8.48043 17 8.73478 17 9C17 9.26522 17.1054 9.51957 17.2929 9.70711C17.4804 9.89464 17.7348 10 18 10C18.2652 10 18.5196 9.89464 18.7071 9.70711C18.8946 9.51957 19 9.26522 19 9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8Z"/>
                </svg>,
                navLink: '/sponsors',
                subMenu: [
                    {
                        id: 'create_sponsor',
                        title: 'Create Sponsor',
                        navLink: '/admins/create_sponsor'
                    },
                    {
                        id: 'manage_sponsors',
                        title: 'Manage Sponsors',
                        navLink: '/admins/manage_sponsors'
                    }
                ]
            }]
    }
]