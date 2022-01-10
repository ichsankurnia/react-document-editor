import Document from "./container/admin/Document"
import MainDashboard from "./container/MainDashboard"
import Profile from "./container/Profile"
import User from "./container/admin/User"
import UserRole from "./container/admin/UserRole"
import Login from "./container/auth/Login"
import NewDocument from "./container/admin/NewDocument"
import DetailDocument from "./container/DetailDocument"
import ParameterConfig from "./container/admin/ParameterConfig"
import Register from "./container/auth/Register"
import OtpPage from "./container/auth/OtpPage"

// export const RouteAdminRole = [
//     {
//         title: 'Dashboard',
//         path: '',
//         exact: true,
//         component: <MainDashboard />
//     },
//     {
//         title: 'Profile',
//         path: 'profile',
//         component: <Document />
//     },
//     {
//         title: 'Home',
//         routes: [
//             {
//                 path : "home-main",
//                 layout: '/admin',
//                 name: 'Home',
//                 icon_path: <FaTachometerAlt className='mr-4'/>,
//                 component: <MainDashboard />
//             }
//         ]
//     },
//     {
//         title: 'Admin',
//         routes: [
//             {
//                 path : "admin-document",
//                 layout: '/admin',
//                 name: 'Document',
//                 icon_path: <IoDocument className='mr-4'/>,
//                 component: <Document />
//             },
//             {
//                 path : "admin-user",
//                 layout: '/admin',
//                 name: 'User',
//                 icon_path: <FaUserAlt className='mr-4'/>,
//                 component: <User />
//             },
//             {
//                 path : "admin-role",
//                 layout: '/admin',
//                 name: 'User Role',
//                 icon_path: <FaUsers className='mr-4'/>,
//                 component: <UserRole />
//             },
//         ]
//     },
//     {
//         title: 'Other',
//         routes: [
//             {
//                 path : "other-profile",
//                 layout: '/admin',
//                 name: 'Profile',
//                 icon_path: <FaAddressCard className='mr-4'/>,
//                 component: <Profile />
//             },
//         ]
//     }
// ]

export const RouteAdminRole = [
    {
        name_var: 'Dashboard',
        url_var: '',
        icon_var: 'ri-home-3-fill',
        children: []
    },
    {
        name_var: 'Document',
        url_var: 'document',
        icon_var: 'ri-home-3-fill',
        children: []
    },
    {
        name_var: 'User',
        url_var: 'user',
        icon_var: 'ri-home-3-fill',
        children: []
    },
    {
        name_var: 'User Role',
        url_var: 'user-role',
        icon_var: 'ri-home-3-fill',
        children: []
    },
    {
        name_var: 'Parameter Config',
        url_var: 'parameter-config',
        icon_var: 'ri-home-3-fill',
        children: []
    },
    {
        name_var: 'Profile',
        url_var: 'profile',
        icon_var: 'ri-home-3-fill',
        children: []
    }
]


export const DashboardRoutes = [
    {
        path: '',
        component: <MainDashboard />
    },
    {
        path: 'profile',
        component: <Profile />
    },
    // ADMIN ROUTES
    {
        path : "document",
        component: <Document />
    },
    {
        path : "document-new",
        component: <NewDocument />
    },
    {
        path : "document-detail",
        component: <DetailDocument />
    },
    {
        path : "user",
        component: <User />
    },
    {
        path : "user-role",
        component: <UserRole />
    },
    {
        path : "parameter-config",
        component: <ParameterConfig />
    }
]


export const AuthRoutes = [
    {
        path: 'sign-in',
        component: <Login />
    },
    {
        path: 'sign-up',
        component: <Register />
    },
    {
        path: 'otp-validate',
        component: <OtpPage />
    },
]