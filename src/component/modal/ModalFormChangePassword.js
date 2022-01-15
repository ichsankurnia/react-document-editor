import { useState } from "react"
import ErrorField from '../ErrorField'
import { useForm } from "react-hook-form";
import {ButtonSave, ButtonCancel} from '../button/CustomButton'

const containerInput = 'flex flex-col w-full sm:w-1/2'
const inputText = 'outline-none border-1 border-gray-200 rounded-lg py-2 px-3 sm:p-3 mt-1 focus:ring-1 focus:ring-red-800 focus:border-red-800'

const ModalFormChangePassword = ({onCancel, onSubmit}) => {
    const [errPass, showErrPas] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: "all" });
    
    const onValid = (dataForm) => {
        const { e_password, confirm_pass} = dataForm
        
        /* Password Feld hanya muncul ketika add user dan user role selain petani */
        if(e_password !== confirm_pass){
            showErrPas(true)
            return
        }

        const payload = {
            e_password: e_password
        }

        onSubmit(payload)
    }

    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-30">
            <div className="absolute w-full h-full bg-gray-900 opacity-60" onClick={onCancel}></div>

            {/* Modal Content */}
            <div className="bg-soft w-10/12 md:w-3/5 mx-auto my-auto p-6 rounded-xl shadow-2xl z-50 overflow-y-auto" style={{ maxHeight: '90vh'}}>
                {/* Body */}
                <h1 className='text-base font-medium mb-8 sticky inset-0'>Form Change Password</h1>
                <form onSubmit={handleSubmit(onValid)}>
                    <div className='flex flex-col sm:flex-row'>
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
                    
                    {errPass && <p className='text-red-500 mt-3 mb-3 font-medium'>* Password not match</p>}

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

export default ModalFormChangePassword