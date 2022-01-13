import ErrorField from '../ErrorField'
import { useForm } from "react-hook-form";
import {ButtonSave, ButtonCancel} from '../button/CustomButton'
import { useCallback, useEffect } from 'react';

const containerInput = 'flex flex-col w-full'
const inputText = 'outline-none border-1 border-gray-200 rounded-lg py-2 px-3 sm:p-3 mt-1 focus:ring-1 focus:ring-red-800 focus:border-red-800'

const ModalFormUserRole = ({data, onCancel, onSubmit}) => {
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
        }
    }, [data, setdefaultValue])
    
    const onValid = (dataForm) => {
        const { n_group, e_desc} = dataForm

        const payload = {
            n_group: n_group?.toUpperCase(),
            e_desc: e_desc
        }

        onSubmit(payload)
    }

    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-30">
            <div className="absolute w-full h-full bg-gray-900 opacity-60" onClick={onCancel}></div>

            {/* Modal Content */}
            <div className="bg-soft w-10/12 md:w-3/5 mx-auto my-auto p-6 rounded-xl shadow-2xl z-50 overflow-y-auto" style={{ maxHeight: '90vh'}}>
                {/* Body */}
                <h1 className='text-base font-medium mb-8 sticky inset-0'>{data? 'Form Update Role': 'Form Add Role'}</h1>
                <form onSubmit={handleSubmit(onValid)}>
                    <div className='flex flex-col sm:flex-row'>
                        <div className={containerInput}>
                            <label>Role Name</label>
                            <input type='text' className={inputText} placeholder='ADMINISTRATOR' {...register("n_group", { required: "Role Name is required."})}/>
                            <ErrorField errors={errors} name='n_group' />
                        </div>
                        <span className='mx-5 mb-3 sm:mb-0'></span>
                        <div className={containerInput}>
                            <label>Role Description</label>
                            <input type='text' className={inputText} placeholder='Description...' {...register("e_desc", { required: "Description is required."})}/>
                            <ErrorField errors={errors} name='e_desc' />
                        </div>
                    </div>
                    
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

export default ModalFormUserRole