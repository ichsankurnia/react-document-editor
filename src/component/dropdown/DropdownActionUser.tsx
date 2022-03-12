import React, { useEffect, useRef, useState } from "react";
import ModalConfirm from "../modal/ModalConfirm";

type Props = {
    onEdit: ()=> void,
    onChangePassword?: ()=> void,
    onDelete: ()=> void,
    titleActive?: string,
    onActive?: any,
};

const DropdownActionUser: React.FC<Props> = ({onEdit, onChangePassword, onDelete, titleActive, onActive}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [confirmActive, showConfirmActive] = useState(false)
    const [confirmDelete, showConfirmDelete] = useState(false)

    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: any) => {
        if (!dropdownOpen || dropdown.current?.contains(target) || trigger.current?.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: any) => {
        if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const handleEdit = () => {
        setDropdownOpen(false)
        onEdit()
    }

    const handleDelete = () => {
        showConfirmDelete(false)
        onDelete()
    }

    const handleActivateUser = () => {
        showConfirmActive(false)
        onActive()
    }

    return (
        <div className="relative inline-flex justify-center item-center flex-row-reverse">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="relative z-5 block rounded-md focus:outline-none cursor-pointer">
                <span className='text-gray-700 hover:text-red-800'><i className="ri-more-fill text-xl font-bold"></i> </span>
            </button>

            {dropdownOpen &&
            <div className={`mr-1 md:m-0 md:absolute right-7 -bottom-13 bg-white rounded-md shadow-lg overflow-hidden p-1 border-1 border-gray-200`}>
                <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)} >
                    <div className="flex flex-col w-40 min-w-max text-left">
                        <button onClick={()=>showConfirmActive(true)} className="px-2 py-2 text-sm text-gray-700 hover:bg-red-800 hover:text-white inline-flex rounded-md items-center">
                            <i className={`${titleActive==='Activate'? 'ri-user-follow-fill': 'ri-user-unfollow-fill'} mr-3 mt-0.5`} />
                            <p>{titleActive}</p>
                        </button>
                        <button onClick={handleEdit} className="px-2 py-2 text-sm text-gray-700 hover:bg-red-800 hover:text-white inline-flex rounded-md items-center">
                            <i className='ri-edit-box-fill mr-3 mt-0.5' />
                            <p>Edit</p>
                        </button>
                        <button onClick={onChangePassword} className="px-2 py-2 text-sm text-gray-700 hover:bg-red-800 hover:text-white inline-flex rounded-md items-center text-left">
                            <i className='ri-key-fill mr-3 mt-0.5' />
                            <p>Change Password</p>
                        </button>
                        <button onClick={() => showConfirmDelete(true)} className="mt-1 px-2 py-2 text-sm text-gray-700 hover:bg-red-800 hover:text-white inline-flex rounded-md items-center">
                            <i className='ri-delete-bin-5-fill mr-3 mt-0.5' />
                            <p>Delete</p>
                        </button>
                        
                    </div>
                </div>
            </div>
            }

            {confirmDelete && <ModalConfirm message='Delete this user?' onOK={handleDelete} onCancel={() => showConfirmDelete(false)} />}
            {confirmActive && <ModalConfirm message={titleActive==='Activate'?'Activate this user?':'Deactivate this user?'} onOK={handleActivateUser} onCancel={() => showConfirmActive(false)} />}
        </div>
    )
}

export default DropdownActionUser