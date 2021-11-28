import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RouteAdminRole } from "../route";
import Header from "./Header";

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const location = useLocation()
    // const match = useMatch()
    const navigate = useNavigate()

	const trigger = useRef(null);
	const sidebar = useRef(null);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
			console.log('TARGET', target)
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});
	
	  // close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

    const handleClickLogo = () => {
        navigate('/', {replace: true})
        window.location.reload()
    }

    const activePath = (layout, path) => {
        if(location.pathname === layout + path){
            return true
        }else if(location.pathname.includes(path)){
            if(path){
                return true
            }
        }else {
            return false
        }
    }

    const getRoutesPath = () => {
        return RouteAdminRole.map(({title, routes}, key) => 
            <div key={key} className='mb-5'>
                <p className='mb-4'>{title}</p>
                <ul>
                {routes.map(({layout, path, name, icon_path}) => 
                    <li key={path}>
                        <Link to={layout + path} onClick={() => setSidebarOpen(false)}
                            className={`px-3 py-2.5 rounded-lg my-2 ${activePath(layout,path)? 'bg-white text-black': 'text-gray-200'} hover:text-black hover:bg-white block transition duration-150`}>
                            <div className="flex items-center">
                                <span>{icon_path}</span>
                                <span>{name}</span>
                            </div>
                        </Link>
                    </li>
                )}
                </ul>
            </div>
        )
    }

    return (
        <div className='md:w-64 text-sms'>
            
            {/* SIDEBAR MOBILE */}
            <div className={`fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden md:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
            <div className='md:hidden bg-white sticky top-0 w-full h-12 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow rounded-2xl z-30'>
                <button onClick={() => setSidebarOpen(!sidebarOpen)}
                    className='inline-flex items-center justify-center p-1 rounded-md text-black hover:bg-black hover:text-white outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                >	
                    {sidebarOpen?
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    :
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    }
                </button>
                <Header />
            </div>
            
            {/* SIDEBAR */}
            <div id="sidebar" ref={sidebar}
                className={`absolute z-40 left-0 top-0 md:static md:left-auto md:top-auto md:translate-x-0 transform h-screen w-64 flex-shrink-0 bg-black transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
            >
                <div className='overflow-y-auto p-4 flex flex-col items-center h-full py-4 font-poppins text-white'>
                    {/* <h1 className='text-2xl'>Apps Logo</h1> */}
                    <span className='mt-2 cursor-pointer' onClick={handleClickLogo}>App Logo</span>
                    <div className='w-full h-full px-1 mt-8 flex flex-col'>
                    
                    {getRoutesPath()}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Sidebar