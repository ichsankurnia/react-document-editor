import { useCallback, useEffect, useState } from "react";
import OtpInput from "react-otp-input"


const OtpPage = () => {
    const [otp, setOtp] = useState('')
    const [timeLeft, setTimeLeft] = useState(60);

    const [success, setSuccess] = useState(false)

    const phoneNumber = JSON.parse(localStorage.getItem('doc-regist'))?.phone_number_int || '6281234567890'

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const handleChange = (otp) => {
        setOtp(otp)
    }

    const handleResendOTP = () => {
        setTimeLeft(60)
        // postResendOTP()
    }
        
    const postDataOTP = useCallback(async () => {
        if(otp.length < 6){
            return
        }
    }, [otp.length])

    const hashNumber = (phoneNumber) => {
        if(phoneNumber){
            if(phoneNumber.length === 13){
                return '****-****-' + phoneNumber.substring(phoneNumber.length-4, phoneNumber.length)
            }else if(phoneNumber.length === 12){
                return '****-****-' + phoneNumber.substring(phoneNumber.length-3, phoneNumber.length)
            }else{
                return '****-***-' + phoneNumber.substring(phoneNumber.length-3, phoneNumber.length)
            }
        }else{
            return ''
        }
    }

    return (
        <div className="min-h-screen bg-soft py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-red-800 to-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className='relative bg-white shadow-lg sm:rounded-3xl px-4 py-10 md:p-20'>
                    <div>
                        <h1 className="text-xl font-semibold text-center mb-5">Enter your verfication code to continue</h1>
                    </div>
                    <div className="md:max-w-md mx-auto flex flex-col items-center">
                        <p className='text-center text-sms mb-8 w-9/12'>Verification code has been sent via WhatsApp to{' '}<span className='font-bold'>{hashNumber(phoneNumber)}</span></p>
                        <OtpInput 
                                onChange={handleChange}
                                value={otp}
                                numInputs={6}
                                isInputNum
                                shouldAutoFocus
                                // isInputSecure
                                containerStyle='flex justify-center'
                                inputStyle='outline-none text-3xl md:text-4xl border-b-2 border-red-800 bg-transparent'
                                focusStyle='border-b-2 border-red-800'
                                separator={<span>&nbsp;&nbsp;</span>}
                            />
                        
                        {!success &&
                        <button disabled={otp.length<6?true:false}  onClick={postDataOTP}
                            className={`${otp.length<6? 'bg-gray-400': 'bg-gradient-to-r from-red-800 to-black'} text-sms text-white mt-8 w-11/12 py-2.5 rounded`}
                        >
                            Verify
                        </button>
                        }
                        {success &&
                            <p className='text-sms mt-7 mb-2 text-center text-red-800'>Success verification, please login !</p>
                        }
                        {!success &&
                            <p className='text-sms mt-7 mb-2 text-center w-8/12'>Please wait for{' '}<span className='font-bold'>{timeLeft} seconds</span>{' '}to resend verification code</p>
                        }
                        {!success && timeLeft === 0 &&
                            <p className='text-red-800 hover:text-red-600 text-sms mt-3 cursor-pointer font-semibold' onClick={handleResendOTP}>Resend verification code</p>
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center text-sms mt-7'>
                <p>© {new Date().getFullYear()} CompanyName v1.0</p>
            </div>
        </div>
    )
}

export default OtpPage