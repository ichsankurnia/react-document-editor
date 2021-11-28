import { Routes, Route } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import NotFoundContainer from "../container/NotFoundContainer";

import { RouteAdminRole } from "../route";


function Dashboard() {

    // MAIN ROUTE
	const getRoutes = () => {
		return RouteAdminRole.map(data => {
			return data.routes.map(({layout, path, component, exact}, key) => {
				return <Route path={path} element={component} index={exact} key={key} />
			})
		})
	}


	return (
		<div className='flex flex-col md:flex-row h-screen overflow-hidden font-poppins text-xs'>
			<Sidebar />
			<div className='bg-soft w-full overflow-auto h-screen flex flex-col'>
				
				{/* HEADER */}
				<div className='hidden md:block h-12 bg-white py-8 px-4 sm:px-6 lg:px-8 shadow rounded-b-2xl sticky top-0 z-10'>
					<Header />
				</div>
				
				{/* DASHBOARD CONTENT */}
                    <Routes>
                        {getRoutes()}

                        <Route path='*' element={<NotFoundContainer />} /> 
                        {/* <Redirect from="*" to="/admin/page-not-found" /> */}
                    </Routes>

				
				{/* FOOTER */}
				<div className='flex items-center justify-between font-medium bg-white p-5 sm:px-6 lg:px-8 border-t-2 border-l-2 border-r-2 border-gray-200 rounded-t-2xl text-xss md:text-xs mt-auto'>
					<p>Design & Develop by Ories</p>
					<p>{new Date().getFullYear()} © CompanyName v1.0</p>
				</div>

			</div>
			
		</div>
	);
}


export default Dashboard