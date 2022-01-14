import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import NotFoundContainer from "../container/NotFoundContainer";
import { setUserData } from "../reduxs/action/actions";

import { DashboardRoutes } from "../route";


function Dashboard({setUserData}) {

	const navigate = useNavigate()

	useEffect(()=>{
		const token = localStorage.getItem('doc-token')
		if(!token){
			localStorage.clear()
			navigate('/auth', {replace: true})
		}else{
			const decode = jwtDecode(token)
			const currentTime = Date.now() / 1000;
			
			if(decode.exp < currentTime){
				localStorage.clear()
				navigate('/auth', {replace: true})
			}else{
				setUserData(JSON.parse(localStorage.getItem('doc-user')))
			}
		}
	}, [navigate, setUserData])

    // MAIN ROUTE
	const getRoutes = () => {
		return DashboardRoutes.map((data, key) => {
			return <Route path={data.path} element={data.component} key={key} />
		})
	}


	return (
		<div className='flex flex-col md:flex-row h-screen overflow-hidden font-poppins text-xs'>
			<Sidebar />
			<div className='bg-soft w-full overflow-auto h-screen flex flex-col'>
				
				{/* HEADER */}
				<div className='hidden md:block h-12 bg-white py-8 px-4 sm:px-6 lg:px-8 shadow sticky top-0 z-10'>
					<Header />
				</div>
				
				{/* DASHBOARD CONTENT */}
                    <Routes>
                        {getRoutes()}

                        <Route path='*' element={<NotFoundContainer />} /> 
                        <Route path='/' element={<Navigate replace to='/dashboard' />} />

                    </Routes>

				
				{/* FOOTER */}
				<div className='flex items-center justify-between font-medium bg-white p-5 sm:px-6 lg:px-8 border-t-2 border-l-2 border-r-2 border-gray-200 text-xsm md:text-xs mt-auto'>
					<p>Design & Develop by Ories</p>
					<p>{new Date().getFullYear()} © CompanyName v1.0</p>
				</div>

			</div>
			
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({setUserData}, dispatch)
}


export default connect(null, mapDispatchToProps)(Dashboard)