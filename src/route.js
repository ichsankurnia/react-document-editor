import { FaAddressCard, FaTachometerAlt, FaUserAlt, FaUsers } from "react-icons/fa"
import { IoDocument } from "react-icons/io5"
import Document from "./container/Document"
import MainDashboard from "./container/MainDashboard"
import Profile from "./container/Profile"
import User from "./container/User"
import UserRole from "./container/UserRole"

export const RouteAdminRole = [
    {
        title: 'Dashboard',
        path: '',
        exact: true,
        component: <MainDashboard />
    },
    {
        title: 'Profile',
        path: 'profile',
        component: <Document />
    },
    {
        title: 'Home',
        routes: [
            {
                path : "home-main",
                layout: '/admin',
                name: 'Home',
                icon_path: <FaTachometerAlt className='mr-4'/>,
                component: <MainDashboard />
            }
        ]
    },
    {
        title: 'Admin',
        routes: [
            {
                path : "admin-document",
                layout: '/admin',
                name: 'Document',
                icon_path: <IoDocument className='mr-4'/>,
                component: <Document />
            },
            {
                path : "admin-user",
                layout: '/admin',
                name: 'User',
                icon_path: <FaUserAlt className='mr-4'/>,
                component: <User />
            },
            {
                path : "admin-role",
                layout: '/admin',
                name: 'User Role',
                icon_path: <FaUsers className='mr-4'/>,
                component: <UserRole />
            },
        ]
    },
    {
        title: 'Other',
        routes: [
            {
                path : "other-profile",
                layout: '/admin',
                name: 'Profile',
                icon_path: <FaAddressCard className='mr-4'/>,
                component: <Profile />
            },
        ]
    }
]

// export const RoutePetaniRole = [
//     {
//         title: 'Menu',
//         routes: [
//             {
//                 path : "",
//                 layout: '/admin',
//                 exact: true,
//                 name: 'Dashboard',
//                 icon_path: <FontAwesomeIcon icon={faTachometerAlt} className='mr-4'/>,
//                 component: Dashboard
//             },
//             {
//                 path : "/lahan",
//                 layout: '/admin',
//                 name: 'Lahan',
//                 icon_path: <FontAwesomeIcon icon={faLayerGroup} className='mr-4'/>,
//                 component: LandFarmer
//             },
//             {
//                 path : "/analytics",
//                 layout: '/admin',
//                 name: 'Analytics',
//                 icon_path: <FontAwesomeIcon icon={faDiagnoses} className='mr-4'/>,
//                 component: Analytics
//             },
//             {
//                 path : "/probe-activate",
//                 layout: '/admin',
//                 name: 'Probe Activation',
//                 icon_path: <FontAwesomeIcon icon={faCheckDouble} className='mr-4'/>,
//                 component: ProbeActivation
//             },
//         ]
//     },
//     {
//         title: 'Other',
//         routes: [
//             {
//                 path : "/profile",
//                 layout: '/admin',
//                 name: 'Profile',
//                 icon_path: <FontAwesomeIcon icon={faAddressCard} className='mr-4'/>,
//                 component: Profile
//             },
//         ]
//     }
// ]

// export const RouteAnalisRole = [
//     {
//         title: 'Menu',
//         routes: [
//             {
//                 path : "",
//                 layout: '/admin',
//                 exact: true,
//                 name: 'Dashboard',
//                 icon_path: <FontAwesomeIcon icon={faTachometerAlt} className='mr-4.5'/>,
//                 component: Dashboard
//             },
//             {
//                 path : "/analytics",
//                 layout: '/admin',
//                 name: 'Analytics',
//                 icon_path: <FontAwesomeIcon icon={faDiagnoses} className='mr-4'/>,
//                 component: LandAnalytics
//             },
//             {
//                 path : "/history",
//                 layout: '/admin',
//                 name: 'History',
//                 icon_path: <FontAwesomeIcon icon={faHistory} className='mr-5' />,
//                 component: HistoryAnalytics
//             },
//         ]
//     },
//     {
//         title: 'Other',
//         routes: [
//             {
//                 path : "/profile",
//                 layout: '/admin',
//                 name: 'Profile',
//                 icon_path: <FontAwesomeIcon icon={faAddressCard} className='mr-4'/>,
//                 component: Profile
//             },
//         ]
//     }
// ]

// export const RouteInvestorRole = [
//     {
//         title: 'Menu',
//         routes: [
//             {
//                 path : "",
//                 layout: '/admin',
//                 exact: true,
//                 name: 'Dashboard',
//                 icon_path: <FontAwesomeIcon icon={faTachometerAlt} className='mr-4'/>,
//                 component: Dashboard
//             },
//             {
//                 path : "/project",
//                 layout: '/admin',
//                 name: 'Project',
//                 icon_path: <FontAwesomeIcon icon={faProjectDiagram} className='mr-4'/>,
//                 component: Project
//             },
//             {
//                 path : "/analytics",
//                 layout: '/admin',
//                 name: 'Analytics',
//                 icon_path: <FontAwesomeIcon icon={faDiagnoses} className='mr-4'/>,
//                 component: Analytics
//             },
//             {
//                 path : "/schedule",
//                 layout: '/admin',
//                 name: 'Schedule',
//                 icon_path: <FontAwesomeIcon icon={faCalendarAlt} className='mr-4'/>,
//                 component: Schedule
//             }
//         ]
//     },
//     {
//         title: 'Report',
//         routes: [
//             {
//                 path : "/daily",
//                 layout: '/admin',
//                 name: 'Daily',
//                 icon_path: <FontAwesomeIcon icon={faFileAlt} className='mr-4'/>,
//                 component: Schedule
//             },
//             {
//                 path : "/monthly",
//                 layout: '/admin',
//                 name: 'Monthly',
//                 icon_path: <FontAwesomeIcon icon={faFileArchive} className='mr-4'/>,
//                 component: Schedule
//             },
//             {
//                 path : "/yearly",
//                 layout: '/admin',
//                 name: 'Yearly',
//                 icon_path: <FontAwesomeIcon icon={faBook} className='mr-4'/>,
//                 component: Schedule
//             },
//         ]
//     },
//     {
//         title: 'Other',
//         routes: [
//             {
//                 path : "/profile",
//                 layout: '/admin',
//                 name: 'Profile',
//                 icon_path: <FontAwesomeIcon icon={faAddressCard} className='mr-4'/>,
//                 component: Profile
//             },
//         ]
//     }
// ]


// export const RouteAdminUser = [
//     {
//         path : "",
//         exact: true,
//         layout: '/admin/user-detail/:id_seq',
//         name: 'Data Petani',
//         component: CustomerDetail
//     },
//     {
//         path : "/land",
//         layout: '/admin/user-detail/:id_seq',
//         name: 'Lahan',
//         component: Land
//     },
//     {
//         path : "/commodity",
//         layout: '/admin/user-detail/:id_seq',
//         name: 'Komoditas',
//         component: Commodity
//     },
//     {
//         path : "/cultivation",
//         layout: '/admin/user-detail/:id_seq',
//         name: 'Budidaya',
//         component: Cultivation
//     },
//     {
//         path : "/photo",
//         layout: '/admin/user-detail/:id_seq',
//         name: 'Dokumentasi Foto',
//         component: CustomerPhoto
//     }
// ]


// export const routeAuth = [
//     {
//         path : "/sign-in",
//         layout: '/auth',
//         exact: true,
//         name: 'Login',
//         component: Login
//     },
//     {
//         path : "/sign-up",
//         layout: '/auth',
//         name: 'Register',
//         component: Register
//     },
//     {
//         path : "/otp-validate",
//         layout: '/auth',
//         name: 'OTP',
//         component: OtpPage
//     },
// ]