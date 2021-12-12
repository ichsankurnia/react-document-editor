import { useEffect, useRef, useState } from "react";
import { FaEdit, FaEllipsisH, FaKey, FaTrash } from "react-icons/fa";
import ModalConfirm from "../modal/ModalConfirm";


const DropdownActionUser = ({onEdit, onChangePassword, onDelete}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [confirmDelete, showConfirmDelete] = useState(false)

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

    const handleEdit = () => {
        setDropdownOpen(false)
        onEdit()
    }

    const handleDelete = () => {
        showConfirmDelete(false)
        onDelete()
    }

    return (
        <div className="relative inline-flex justify-center item-center flex-row-reverse">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="relative z-5 block rounded-md focus:outline-none cursor-pointer">
                <span className='text-gray-500 text-lg hover:text-agroo5'><FaEllipsisH /> </span>
            </button>

            {dropdownOpen &&
            <div className={`mr-1 md:m-0 md:absolute right-7 -bottom-13 bg-white rounded-md shadow-lg overflow-hidden p-1 border-1 border-gray-200`}>
                <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)} >
                    <div className="flex flex-col w-40">
                        <button onClick={handleEdit} className="px-2 py-2 text-sm text-gray-700 hover:bg-agroo5 hover:text-white inline-flex rounded-md">
                            <FaEdit className='mr-3 mt-0.5' />
                            <p>Edit</p>
                        </button>
                        <button onClick={onChangePassword} className="px-2 py-2 text-sm text-gray-700 hover:bg-agroo5 hover:text-white inline-flex rounded-md">
                            <FaKey className='mr-3 mt-0.5' />
                            <p>Change Password</p>
                        </button>
                        <button onClick={() => showConfirmDelete(true)} className="mt-1 px-2 py-2 text-sm text-gray-700 hover:bg-agroo5 hover:text-white inline-flex rounded-md">
                            <FaTrash className='mr-3 mt-0.5' />
                            <p>Delete</p>
                        </button>
                        
                    </div>
                </div>
            </div>
            }

            {confirmDelete && <ModalConfirm message='Hapus data ini?' onOK={handleDelete} onCancel={() => showConfirmDelete(false)} />}
        </div>
    )
}

export default DropdownActionUser