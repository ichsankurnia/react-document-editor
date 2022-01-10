import { useCallback, useEffect, useState } from "react"
import { connect } from "react-redux"
import { useForm } from "react-hook-form";
import Helper from "../../utils/Helper";
import ErrorField from '../ErrorField'
import {ButtonSave, ButtonCancel} from '../button/CustomButton'

const containerInput = 'flex flex-col w-full sm:w-1/2'
const inputText = 'outline-none border-1 border-gray-200 rounded-lg py-2 px-3 sm:p-3 mt-1 focus:ring-1 focus:ring-red-800 focus:border-red-800'

export const ModalFormUser = connect(
    state => ({
        user: state.user,
        userRole: state.user_role_list
    })
)(({user, userRole, data, onCancel, onSubmit}) => {
    const [errPass, showErrPas] = useState(false)
    const [pass, showPass] = useState(true)

    const userRoleList = userRole.length > 0? userRole : JSON.parse(localStorage.getItem('doc-role'))

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
        const {fullname_var, user_group_id_int, phone_number_int, email_var, password_var, confirm_pass} = dataForm
        
        /* Password Feld hanya muncul ketika add user dan user role selain petani */
        if(pass && !data){
            if(password_var !== confirm_pass){
                showErrPas(true)
                return
            }
        }

        const payload = {
            fullname_var,
            user_group_id_int,
            phone_number_int: Helper.IDPhoneNumber(phone_number_int),
            password_var: password_var || phone_number_int,
            email_var: email_var || ''
        }

        if(data) delete payload.password_var

        onSubmit(payload)
    }

    const handleChangeOption = (e) => {
        if(parseInt(e.target.value) === 4) showPass(false)
        else showPass(true)
    }

    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-30">
            <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={onCancel}></div>

            {/* Modal Content */}
            <div className="bg-soft w-10/12 md:w-3/5 mx-auto my-auto p-6 rounded-xl shadow-2xl z-50 overflow-y-auto" style={{ maxHeight: '90vh'}}>
                {/* Body */}
                <h1 className='text-base font-medium mb-8 sticky inset-0'>{data?'Form Ubah User':'Form Tambah User Baru' }</h1>
                <form onSubmit={handleSubmit(onValid)}>
                    <div className='flex flex-col sm:flex-row mb-3'>
                        <div className={containerInput}>
                            <label>Nama Lengkap</label>
                            <input type='text' className={inputText} placeholder='Nama Lengkap' 
                                {...register("fullname_var", {
                                    required: "Fullname is required."
                                })}
                            />
                            <ErrorField errors={errors} name='fullname_var' />
                        </div>
                        <span className='mx-5 mb-3 sm:mb-0'></span>
                        <div className={containerInput}>
                            <label>Role</label>
                            <select id='routeUser' className={inputText} {...register("user_group_id_int", { required: "Role is required."})} onChange={handleChangeOption}>
                                <option value=''>- Pilih Role -</option>
                                {userRoleList?.map((data, key) => 
                                    <option key={key} value={data.id_seq} >{data.group_name_var}</option>
                                )}
                            </select>
                            <ErrorField errors={errors} name='user_group_id_int' />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row mb-3'>
                        <div className={containerInput}>
                            <label>No. Handphone</label>
                            <input type='tel' className={inputText} placeholder='081234567890' 
                                {...register("phone_number_int", {
                                    required: "Phone number is required.",
                                    pattern: { value: /^\d+$/, message: "Phone number is number only." },
                                    minLength: { value: 10, message: "Phone number must exceed 9 characters." },
                                    maxLength: { value: 14, message: "Phone number too long." }
                                })}
                            />
                            <ErrorField errors={errors} name='phone_number_int' />
                        </div>
                        <span className='mx-5 mb-3 sm:mb-0'></span>
                        <div className={containerInput}>
                            <label>Email</label>
                            <input type='text' className={inputText} placeholder='user@mail.com' 
                                {...register("email_var", {
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address."
                                    }
                                })}
                            />
                            <ErrorField errors={errors} name='email_var' />
                        </div>
                    </div>

                    {/* Password hanya muncul ketika add user dan user role selain petani */}
                    {pass && !data &&
                    <div className='flex flex-col sm:flex-row'>
                        <div className={containerInput}>
                            <label>Password</label>
                            <input type='password' className={inputText} placeholder='*****'
                                {...register("password_var", {
                                    required: "Password is required.",
                                    minLength: { value: 5, message: "Password must exceed 4 characters."}
                                })}
                            />
                            <ErrorField errors={errors} name='password_var' />
                        </div>
                        <span className='mx-5 mb-3 sm:mb-0'></span>
                        <div className={containerInput}>
                            <label>Konfirmasi Password</label>
                            <input type='password' className={inputText} placeholder='*****' 
                                {...register("confirm_pass", { required: "Confirm password is required." })}
                            />
                            <ErrorField errors={errors} name='confirm_pass' />
                        </div>
                    </div>
                    }
                    
                    {errPass && <p className='text-red-500 mt-3 mb-3'>* Password not match</p>}

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
})