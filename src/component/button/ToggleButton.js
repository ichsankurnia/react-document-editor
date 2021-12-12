const ToggleButton = ({onClick, active}) => {
    return (
        <div className={`w-20 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-500 ease-in-out ${active?'bg-agroo5 hover:bg-agroo3': 'border-1 border-gray-400 hover:bg-gray-200 hover:border-gray-300'} transition duration-200 ease-in-out transform hover:scale-105`}>
            <button className={`w-8 h-8 rounded-full shadow-md transform duration-500 ease-in-out ${active? 'translate-x-10 bg-white' : 'bg-gray-600'}`} onClick={onClick}></button>
        </div >
    )
}

export default ToggleButton