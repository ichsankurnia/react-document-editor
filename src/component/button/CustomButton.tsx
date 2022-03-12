import { FC } from "react";

type Props = {
    type?: "button" | "submit" | "reset",
    title?: string,
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
};

export const ButtonAdd: FC<Props> = ({onClick, title}) => {
    return (
        <button onClick={onClick} className='flex items-center text-white bg-red-800 hover:bg-red-600 rounded-3xl px-5 md:px-3 py-1 font-medium transition duration-200 ease-in-out transform hover:scale-105'>
            <p className='mr-2.5 hidden md:block'>{title || 'Create New'}</p>
            <i className="ri-add-fill text-xl" />
        </button>
    )
}

export const ButtonCancel: FC<Props> = ({type, onClick, title}) => (
    <button type={type || 'reset'} onClick={onClick} className='bg-gray-500 hover:bg-black text-white px-5 py-2.5 rounded-2xl mx-1 md:mx-2 font-medium transition duration-200 ease-in-out transform hover:scale-105'>
        {title || 'Cancel'}
    </button>
)

export const ButtonSave: FC<Props> = ({type, onClick, title}) => (
    <button type={type || 'submit'} onClick={onClick} className='bg-red-800 hover:bg-red-600 text-white px-6 py-2.5 rounded-2xl mx-1 md:mx-2 font-medium transition duration-200 ease-in-out transform hover:scale-105'>
        {title || 'Save'}
    </button>
)