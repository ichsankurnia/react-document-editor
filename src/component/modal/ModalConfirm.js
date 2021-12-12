const ModalConfirm = ({onCancel, onOK, message}) => {
    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-30 overflow-auto">
            <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={onCancel}></div>

            {/* Modal Content */}
            <div className="bg-soft w-9/12 md:w-2/5 mx-auto my-auto p-5 rounded-xl shadow-2xl z-50">
                {/* Body */}
                <div className='flex flex-col justify-center items-center text-center'>
                    <h1 className='text-xl font-semibold text-gray-900'>Confirm</h1>
                    <h1 className='text-sm md:text-base my-10' >{message}</h1>
                    <div className='w-full flex item-center justify-center tex-sm md:text-base'>
                        <button className='px-4 py-1.5 bg-gray-500 rounded-2xl text-white hover:bg-black mx-1.5 md:mx-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105' onClick={onCancel}>Cancel</button>
                        <button className='px-8 py-1.5 bg-red-800 rounded-2xl text-white hover:bg-red-600 mx-1.5 md:mx-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105' onClick={onOK}>OK</button>
                    </div>
                </div>
                {/* End Body */}
            </div>
            {/* End Modal Content */}

        </div>
    )
}

export default ModalConfirm