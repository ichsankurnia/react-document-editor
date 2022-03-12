import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RouteAdminRole, RouteUserRole } from "../routes";
import Header from "./Header";
import { connect } from "react-redux";
import Helper from "../utils/Helper";


const Sidebar = ({user, collapse}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [menuActive, setMenuActive] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const menuList = user.i_group !== 1? RouteUserRole : RouteAdminRole

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

    useEffect(() => {
        const arrPath = location.pathname.split('/')
        setMenuActive(arrPath[2])
    }, [location.pathname])

    const activePath = (path) => {
        if(location.pathname === '/dashboard'){
            if(path === '' || path === '/'){
                return true
            }
        }else if(location.pathname === '/dashboard/' + path){
            return true
        }else{
            return false
        }
    }

    const activeDrop = (path) => {
        if(location.pathname.includes(path.toLowerCase())) return true
        else return false
    }

    const handleShowSubMenu = (path) => {
        if(menuActive===path){
            setMenuActive('')
        }else if(menuActive?.toLowerCase().includes(path.toLowerCase())){
            setMenuActive('')
        }else{
            setMenuActive(path)
        }
    }

    const handleClickLogo = () => {
        navigate('/', {replace: true})
        window.location.reload()
    }

    
    const getRoutesPath = () => {
        return menuList?.map(({name_var, url_var, icon_var, children}, key) => 
            <div key={key} className='mb-5 font-medium'>
                {children && children.length> 0?
                <div>
                    <div className={`flex items-center justify-between px-6 py-3.5 -mx-2 -my-1 cursor-pointer text-white rounded-sm ${activeDrop(url_var) || menuActive===url_var? 'bg-red-700 border-white':''} border-l-8 border-transparent hover:border-white hover:bg-red-900`} onClick={()=>handleShowSubMenu(url_var)}>
                        <div className='flex item-center'>
                            <i className={`${icon_var}`} />
                            <p>{Helper.capitalEachWord(name_var)}</p>
                        </div>
                        {activeDrop(url_var) || menuActive===url_var? <i className='ri-arrow-drop-down-line text-lg' /> : <i className='ri-arrow-drop-right-line text-lg' /> }
                    </div>
                    <ul  className={`${menuActive?.includes(url_var)? 'py-1 ml-5 transition duration-500 ease-in-out transform hover:scale-105' : 'hidden'}`}>
                    {children.map(({url_var, name_var}, key) => 
                        <li key={key}>
                            <Link to={url_var} onClick={() => setSidebarOpen(false)} className={`flex px-5 py-3 my-1.5 rounded ${activePath(url_var)&& 'bg-red-700'} hover:bg-red-900`}>
                                {Helper.capitalEachWord(name_var)}
                            </Link>
                        </li>
                    )}
                    </ul>
                </div>
                :
                <div  onClick={() => setSidebarOpen(false)}>
                    <Link to={url_var} className={`flex item-center px-6 py-3.5 -mx-2 -my-1 rounded-sm ${activePath(url_var)? 'bg-red-700 text-white border-white':'text-gray-300 border-transparent'} border-l-8 hover:text-white hover:border-white hover:bg-red-900`}>
                        <i className={`${icon_var} mr-2`} />
                        <p>{Helper.capitalEachWord(name_var)}</p>
                    </Link>
                </div>
                }
            </div>
        )
    }

    const getRoutesPathUnCollapese = () => {
        return menuList?.map(({url_var, icon_var, children}, key) => 
            <div key={key} className='relative flex justify-center font-medium'>
                {children && children.length> 0?
                <div>
                    <div className={`mb-1 cursor-pointer ${activeDrop(url_var) || menuActive===url_var? 'text-white scale-150' : 'text-gray-300'} hover:text-white mb-2.5 transition duration-300 ease-in-out transform hover:scale-150`} onMouseEnter={()=>handleShowSubMenu(url_var)} onClick={()=>handleShowSubMenu(url_var)}>
                        <i className={`${icon_var}`} />
                    </div>
                    <ul  className={`${menuActive===url_var? 'bg-red-800 absolute top-0 left-14 z-50 pl-2 pr-5 w-max rounded transition duration-500 ease-in-out transform hover:scale-105' : 'hidden'}`}>
                    {children.map(({url_var, name_var, icon_var}, key) => 
                        <li key={key}>
                            <Link to={url_var} onClick={() => setSidebarOpen(false)}
                                className={`px-4 py-2.5 rounded-lg my-1 ${activePath(url_var)? 'text-white bg-red-900 rounded -mr-3': 'text-gray-300'} hover:text-white block transition duration-150`}>
                                <div className="flex items-center">
                                    <i className={`${icon_var}`} />
                                    <p>{Helper.capitalEachWord(name_var)}</p>
                                </div>
                            </Link>
                        </li>
                    )}
                    </ul>
                </div>
                :
                <Link to={url_var} onClick={() => setSidebarOpen(false)}
                    className={`${activePath(url_var)? 'bg-white text-red-800 scale-150': 'text-white'} w-6 h-6 rounded flex justify-center items-center hover:bg-white mb-3 hover:text-red-800 transition duration-200 ease-in-out transform hover:scale-150`}>
                    <i className={`${icon_var} text-lg`} />
                </Link>
                }
            </div>
        )
    }


    return (
        <>
            <div className={`z-20`}>
                
                {/* SIDEBAR MOBILE */}
                <div className={`fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden md:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
                <div className='md:hidden bg-white sticky top-0 w-full h-12 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow z-30'>
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
                {/* <div id="sidebar" ref={sidebar}
                    className={`absolute z-40 left-0 top-0 md:static md:left-auto md:top-auto h-screen bg-red-800 md:translate-x-0 transform transition-all duration-700 ease-in-out ${sidebarOpen? 'translate-x-0' : '-translate-x-64'}  ${collapse?'w-64':'w-18'} `}
                >
                    <div className={`overflow-y-auto ${collapse? 'px-1 py-4': 'p-5'} flex flex-col items-center h-full font-poppins text-white overflow-x-hidden`}>
                        <span className='mt-2 cursor-pointer' onClick={handleClickLogo}>{collapse? 'App Logo' : 'Logo'}</span>

                        {collapse? 
                        <div className='w-full h-full px-1 mt-8 flex flex-col animate-fade-left-to-right'>
                            {getRoutesPath()}
                        </div>
                        :
                        <div className='w-full h-full px-1 mt-9 flex flex-col absolute top-10 transition-all duration-700 scale-150'>
                            {getRoutesPathUnCollapese()}
                        </div>
                        }

                    </div>
                </div> */}

                <div id="sidebar" ref={sidebar}
                    className={`absolute z-40 left-0 top-0 md:static md:left-auto md:top-auto h-screen bg-red-800 md:translate-x-0 transform transition-all duration-700 ease-in-out
                    ${sidebarOpen? 'translate-x-0' : '-translate-x-64'} ${collapse? 'w-64 2xl:w-72':'md:w-[4.4rem] 2xl:w-[5rem]'} `}
                >
                    <div className={`overflow-y-auto overflow-x-hidden h-full flex flex-col items-center text-white text-left`}>
                        <div className='cursor-pointer z-10 w-full px-4 mb-8 mt-6 text-center'>
                            <span className='mt-2 cursor-pointer' onClick={handleClickLogo}>{collapse? 'MoU Document' : 'MoU'}</span>
                        </div>

                        {collapse?
                        <div className="w-full space-y-4 px-1.5">
                            {getRoutesPath()}
                        </div>
                        :
                        <div className='w-full h-full flex flex-col absolute top-22 transition-all duration-1000 space-y-3'>
                            {getRoutesPathUnCollapese()}
                        </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        collapse: state.collapse,
    }
}

export default connect(mapStateToProps, null)(Sidebar)