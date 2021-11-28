import React, { useState, useRef, useEffect } from 'react';
import { FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';

const BG_AVATAR = ['152e4d', '0891b2', '2E8B57', '8B4513', '4B0082', '999']

function UserMenu() {
    const [modalOut, showModalOut] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const userLocalStorage = JSON.parse(localStorage.getItem('agroo-user'))

    const navigate = useNavigate()
    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
        if (!dropdownOpen || dropdown.current?.contains(target) || trigger.current?.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
        if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    
    const handleLogout = async () => {
        navigate('/')
        localStorage.clear()
    }

    return (
        <div className="relative inline-flex">
            <button
                ref={trigger} className="inline-flex justify-center items-center group" aria-haspopup="true" aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)} 
            >
                <div className="w-9 h-9 rounded-full bg-gray-400">
                    <LazyLoadImage src={`https://ui-avatars.com/api/?name=${userLocalStorage?.fullname_var || 'Ories'}&background=${BG_AVATAR[Math.floor(Math.random() * BG_AVATAR.length)]}&color=fff`} className='rounded-full' />
                </div>
                <div className="flex items-center truncate">
                    <span className="truncate ml-2 text-sm font-medium group-hover:text-lightcayn">{userLocalStorage?.fullname_var || 'Ories'}</span>
                    <svg className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400" viewBox="0 0 12 12">
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                </div>
            </button>

            {dropdownOpen &&
            <div
                className="origin-top-right z-10 absolute top-full right-0 w-max bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
            >
                <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)} >
                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
                        <div className="font-medium text-gray-800">{userLocalStorage?.fullname_var || 'Ories'}</div>
                        <div className="text-xs text-gray-500 italic">Administrator</div>
                    </div>
                    <ul>
                        <li>
                            <Link className="font-medium text-sm text-lightcayn hover:text-darkcayn flex items-center py-1 px-3" 
                                to='/admin/profile' onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <FaUserCog />&ensp;Settings
                            </Link>
                        </li>
                        <li>
                            <span className="font-medium text-sm text-red-400 hover:text-darkcayn flex items-center py-1 px-3 cursor-pointer"
                                // onClick={() => showModalOut(true)}
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt />&ensp; Sign Out
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            }
            
        </div>
    )
}


export default UserMenu;