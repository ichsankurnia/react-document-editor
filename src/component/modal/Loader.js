export const Loader = () => {
    return (
        <div className="modal" style={{zIndex: 999}}>
            <div className='modal-outside'></div>
            <div className="pulse-container">  
                <div className="pulse-bubble pulse_bubble-1"></div>
                <div className="pulse-bubble pulse_bubble-2"></div>
                <div className="pulse-bubble pulse_bubble-3"></div>
            </div>
        </div>
    )
}

export default Loader