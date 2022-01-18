import moment from "moment"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { bindActionCreators } from "redux"
import { updateUser, getOneUserByID, changePasswordUser } from "../api/user-api"
import { ButtonCancel, ButtonSave } from "../component/button/CustomButton"
import ErrorField from "../component/ErrorField"
import Loader from "../component/modal/Loader"
import ModalConfirm from "../component/modal/ModalConfirm"
import ModalFormChangePassword from "../component/modal/ModalFormChangePassword"
import { setUserData } from "../reduxs/action/actions"
import Helper from "../utils/Helper"

const BG_AVATAR = ['152e4d', '0891b2', '2E8B57', '8B4513', '4B0082', '999']

const containerInput = 'flex flex-col w-full sm:w-1/2'
const inputText = 'outline-none border-1 border-gray-200 rounded-lg py-2 px-3 sm:p-3 mt-1 focus:red-800 focus:ring-card2 focus:ring-1'

const Profile = ({user, setUserData}) => {
    const [isUpdate, setIsUpdate] = useState(false)
    const [loader, showLoader] = useState(false)
    const [modalLogout, showModalLogout] = useState(false)
    const [modalPassword, showModalPassword] = useState(false)

    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        clearErrors 
    } = useForm({ criteriaMode: "all" });

    const setdefaultValue = useCallback ((obj) => {
        Object.keys(obj).map(key => {
            return setValue(key, obj[key], { shouldValidate: true })
        })
    }, [setValue])


    const fetchUser = useCallback(async () => {
        showLoader(true)
        const res = await getOneUserByID(localStorage.getItem('doc-token'), user.i_id)
        
        console.log('Fetch One User :', res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                setdefaultValue(res.data.data)
                setUserData(res.data.data)
            }else{
                if(res.data.message){
                    toast.error(res.data.message)
                }else{
                    toast.error(`${res.config?.url} ${res.status} ${res.statusText}`)
                }
            }
        }else{
            toast.error(`${res.config?.url} ${res.message}`)
        }

    }, [user.i_id, setUserData, setdefaultValue])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])


    const onValid = async (dataform) => {
        showLoader(true)
        const {e_fullname, e_phone_number, e_email} = dataform
        
        const payload = {
            e_fullname, 
            e_phone_number: Helper.IDPhoneNumber(e_phone_number), 
            e_email,
            i_group: user.i_group
        }

        const res = await updateUser(user.i_id, payload)
        
        console.log('Update User :', res)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                setIsUpdate(false)
                fetchUser()
            }else{
                if(res.data.message){
                    toast.error(res.data.message)
                }else{
                    toast.error(`${res.config?.url} ${res.status} ${res.statusText}`)
                }
            }
        }else{
            toast.error(`${res.config?.url} ${res.message}`)
        }
    }

    const handleSubmitChangePassword = async (payload) => {
        showLoader(true)

        const res = await changePasswordUser(user.i_id, payload)
        
        console.log('Update password :', res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                toast.success('Password changed, please login again!')
                showModalPassword(false)
                setTimeout(() => {
                    handleLogout()
                }, 500);
            }else{
                if(res.data.message){
                    toast.error(res.data.message)
                }else{
                    toast.error(`${res.config?.url} ${res.status} ${res.statusText}`)
                }
            }
        }else{
            toast.error(`${res.config?.url} ${res.message}`)
        }
    }

    const handleMovePage = () => {
        window.open('http://100.104.216.52','_blank')
    }

    const handleReset = (e) => {
        setIsUpdate(false)
        setdefaultValue(user)
        clearErrors()
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate('/', {replace:true})
    }

    return (
        <div className='flex item-center flex-col p-6 mb-auto'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-base font-semibold'>Profile</h1>
            </div>

            <div>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='flex flex-col md:flex-row items-center mb-1'>
                        <span className='w-24 sm:w-30'>
                            <LazyLoadImage src={`https://ui-avatars.com/api/?name=${user.e_fullname}&background=${BG_AVATAR[Math.floor(Math.random() * BG_AVATAR.length)]}&color=fff&rounded=true&size=128`} effect='blur' />
                        </span>
                        <div className='md:ml-5 flex flex-col items-center md:items-start text-center md:text-left'>
                            <h1 className='font-bold text-xl sm:text-2xl'>{user.e_fullname}</h1>
                            <h2 className='text-sm'>Join at {moment(user?.d_created_at).format('DD MMM YYYY HH:mm')}</h2>
                        </div>
                    </div>
                    <div className='inline-flex text-sm'>
                        <i className="ri-user-5-fill" />
                        <p className='ml-2'>{user.n_group || 'Administrator'}</p>
                    </div>
                </div>

                <div className='bg-white text-text rounded-2xl shadow-2xl p-6 mt-6'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='font-semibold'>Account Detail</h1>
                        <span className={`${isUpdate && 'text-white'} hover:text-red-800 cursor-pointer text-lg`} onClick={() => setIsUpdate(!isUpdate)}><i className="ri-edit-2-fill" /></span>
                    </div>
                    <form onSubmit={handleSubmit(onValid)} onReset={handleReset} id='form-user'>
                        <fieldset disabled={!isUpdate}>

                        <div className='flex flex-col sm:flex-row mb-3'>
                            <div className={containerInput}>
                                <label>Fullname</label>
                                <input type='text' className={inputText} {...register("e_fullname", { required: "Fullname is required."})} />
                                <ErrorField errors={errors} name='e_fullname' />
                            </div>
                            <span className='mx-5 mb-3 sm:mb-0'></span>
                            <div className={containerInput}>
                                <label>Username</label>
                                <input type='text' readOnly className={`${inputText} bg-transparent`} {...register("n_username", { required: "Fullname is required."})} />
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row mb-3'>
                            <div className={containerInput}>
                                <label>Phone Number</label>
                                <input type='tel' className={inputText} 
                                    {...register("e_phone_number", {
                                        required: "Phone number is required.",
                                        pattern: { value: /^\d+$/, message: "Phone number is number only." },
                                        minLength: { value: 10, message: "Phone number must exceed 9 characters." },
                                        maxLength: { value: 14, message: "Phone number too long." }
                                    })}
                                />
                                <ErrorField errors={errors} name='e_phone_number' />
                            </div>
                            <span className='mx-5 mb-3 sm:mb-0'></span>
                            <div className={containerInput}>
                                <label>Email</label>
                                <input type='email' name='e_email' className={inputText} 
                                    {...register("e_email", {
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address."
                                        }
                                    })}
                                />
                                <ErrorField errors={errors} name='e_email' />
                            </div>
                        </div>

                        {isUpdate &&
                        <div className='flex justify-end mt-5 md:mt-3'>
                            <ButtonCancel type='reset' onClick={handleReset} />
                            <ButtonSave type='submit' />
                        </div>
                        }

                        </fieldset>
                    </form>

                </div>

                <div className='bg-white text-text rounded-2xl shadow-2xl p-6 mt-6'>
                    <h1 className='font-semibold mb-6'>Help</h1>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                        <button className='hover:bg-red-800 hover:text-white rounded-2xl px-4 py-2 font-medium' onClick={()=>showModalPassword(true)}>Change Password</button>
                        <button className='hover:bg-red-800 hover:text-white rounded-2xl px-4 py-2 font-medium' onClick={handleMovePage}>Contact Us</button>
                        <button className='hover:bg-red-800 hover:text-white rounded-2xl px-4 py-2 font-medium' onClick={handleMovePage}>FAQ</button>
                        <button className='hover:bg-red-800 hover:text-white rounded-2xl px-4 py-2 font-medium' onClick={handleMovePage}>Information</button>
                        <button className='hover:bg-red-800 hover:text-white rounded-2xl px-4 py-2 font-medium' onClick={() => showModalLogout(true)}>Logout</button>
                    </div>
                </div>

                <div className='flex justify-center mt-8 mb-3'>Company Name v2.0.0</div>
            </div>

            {modalPassword && <ModalFormChangePassword onCancel={() => showModalPassword(false)} onSubmit={handleSubmitChangePassword} />}
            {loader && <Loader />}
            {modalLogout && <ModalConfirm message='Are you sure to logout?' onOK={handleLogout} onCancel={() => showModalLogout(false)} />}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setUserData}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)