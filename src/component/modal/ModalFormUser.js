import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import Helper from "../../utils/Helper";
import ErrorField from '../ErrorField'
import {ButtonSave, ButtonCancel} from '../button/CustomButton'

const containerInput = 'flex flex-col w-full sm:w-1/2'
const inputText = 'outline-none border-1 border-gray-200 rounded-lg py-2 px-3 sm:p-3 mt-1 focus:ring-1 focus:ring-red-800 focus:border-red-800'


const ModalFormUser = ({userRoleList, data, onCancel, onSubmit}) => {
    const [errPass, showErrPas] = useState(false)
    const [pass, showPass] = useState(true)

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({ criteriaMode: "all" });

    const setdefaultValue = useCallback ((obj) => {
        Object.keys(obj).map(key => {
            return setValue(key, obj[key], { shouldValidate: true })
        })
    }, [setValue])

    useEffect(() => {
        if(data){
            setdefaultValue(data)
            if(data) showPass(false)
        }
    }, [data, setdefaultValue])
    

    const onValid = (dataForm) => {
        const {e_fullname, i_group, e_phone_number, e_email, n_username, e_password, confirm_pass} = dataForm

        /* Password Feld hanya muncul ketika add user dan user role selain petani */
        if(pass && !data){
            if(e_password !== confirm_pass){
                showErrPas(true)
                return
            }
        }
        
        const payload = {
            e_fullname,
            i_group,
            n_username,
            e_phone_number: Helper.IDPhoneNumber(e_phone_number),
            e_password,
            e_email: e_email || ''
        }

        if(data) delete payload.e_password

        onSubmit(payload)
    }


    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-30">
            <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={onCancel}></div>

            {/* Modal Content */}
            <div className="bg-soft w-10/12 md:w-3/5 mx-auto my-auto p-6 rounded-xl shadow-2xl z-50 overflow-y-auto" style={{ maxHeight: '90vh'}}>
                {/* Body */}
                <h1 className='text-base font-medium mb-8 sticky inset-0'>{data?'Form Update User':'Form Create New User' }</h1>
                <form onSubmit={handleSubmit(onValid)}>
                    <div className='flex flex-col sm:flex-row mb-3 md:mr-10'>
                        <div className={containerInput}>
                            <label>Role</label>
                            <select id='routeUser' className={inputText} {...register("i_group", { required: "Role is required."})}>
                                <option value=''>- Pilih Role -</option>
                                {userRoleList?.map((data, key) => 
                                    <option key={key} value={data.i_id} >{data.n_group}</option>
                                )}
                            </select>
                            <ErrorField errors={errors} name='i_group' />
                        </div>
                        <span className='mx-5 mb-3 sm:mb-0'></span>
                    </div>
                    <div className='flex flex-col sm:flex-row mb-3'>
                        <div className={containerInput}>
                            <label>Fullname</label>
                            <input type='text' className={inputText} placeholder='Fullname...' {...register("e_fullname", { required: "Fullname is required."})}/>
                            <ErrorField errors={errors} name='e_fullname' />
                        </div>
                        <span className='mx-5 mb-3 sm:mb-0'></span>
                        <div className={containerInput}>
                            <label>Username</label>
                            <input type='text' className={inputText} readOnly={data?true:false} placeholder='Username...' {...register("n_username", { required: "Username is required."})}/>
                            <ErrorField errors={errors} name='n_username' />
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row mb-3'>
                        <div className={containerInput}>
                            <label>Phone Number</label>
                            <input type='tel' className={inputText} placeholder='08123456xxxx' 
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
                            <input type='text' className={inputText} placeholder='user@mail.com' 
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

                    {/* Password hanya muncul ketika add user dan user role selain petani */}
                    {pass && !data &&
                    <div className='flex flex-col sm:flex-row mb-3'>
                        <div className={containerInput}>
                            <label>Password</label>
                            <input type='password' className={inputText} placeholder='*****'
                                {...register("e_password", {
                                    required: "Password is required.",
                                    minLength: { value: 5, message: "Password must exceed 4 characters."}
                                })}
                            />
                            <ErrorField errors={errors} name='e_password' />
                        </div>
                        <span className='mx-5 mb-3 sm:mb-0'></span>
                        <div className={containerInput}>
                            <label>Confirm Password</label>
                            <input type='password' className={inputText} placeholder='*****' 
                                {...register("confirm_pass", { required: "Confirm password is required." })}
                            />
                            <ErrorField errors={errors} name='confirm_pass' />
                        </div>
                    </div>
                    }
                    
                    {errPass && <p className='text-red-500 mt-5 mb-3'>* Password not match</p>}

                    <div className='flex justify-end mt-8'>
                        <ButtonCancel type='reset' onClick={onCancel} />
                        <ButtonSave type='submit' />
                    </div>
                </form>
        
                {/* End Body */}
            </div>
            {/* End Modal Content */}

        </div>
    )
}

export default ModalFormUser