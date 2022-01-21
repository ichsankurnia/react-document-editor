const ModalMessage = ({onClose, message}) => {
    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-auto" style={{zIndex: 99}}>
            <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="bg-soft w-9/12 md:w-2/5 2xl:w-4/12 mx-auto my-auto py-10 px-5 rounded-xl shadow-2xl z-50">
                {/* Body */}
                <div className='flex flex-col justify-center items-center text-center'>
                    <h1 className='text-base md:text-lg mb-10' >{message}</h1>
                    <button className='text-base px-8 py-1.5 bg-red-800 rounded-3xl text-white hover:bg-red-600 mx-1.5 md:mx-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105' onClick={onClose}>OK</button>
                </div>
                {/* End Body */}
            </div>
            {/* End Modal Content */}

        </div>
    )
}

export default ModalMessage