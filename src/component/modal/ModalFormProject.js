import { useCallback, useEffect } from "react";
import { ButtonCancel, ButtonSave } from "../button/CustomButton";
import { useForm } from "react-hook-form";
import ErrorField from "../ErrorField";

const containerInput = 'flex flex-col w-full sm:w-1/2'
const inputText = 'outline-none border-1 border-gray-200 rounded-lg py-2 px-3 sm:p-3 mt-1 focus:ring-1 focus:ring-red-800 focus:border-red-800'

const ModalFormProject = ({data, onCancel, onSubmit}) => {
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
        if(data) setdefaultValue(data)
    }, [data, setdefaultValue])

    const onValid = (dataForm) => {
        const {project_code_var, project_name_var} = dataForm

        const payload = {
            project_code_var,
            project_name_var: project_name_var.toUpperCase()
        }

        onSubmit(payload)
    }
    
    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-30">
            <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={onCancel}></div>

            {/* Modal Content */}
            <div className="bg-white w-10/12 md:w-1/2 mx-auto my-auto p-6 rounded-xl shadow-2xl z-50 overflow-y-auto" style={{ maxHeight: '90vh'}}>
                {/* Body */}
                <h1 className='text-base font-medium mb-8 sticky inset-0'>{data? 'Form Ubah Projek': 'Form Tambah Projek Baru'}</h1>
                <form onSubmit={handleSubmit(onValid)}>
                    <div className='flex flex-col sm:flex-row'>
                        <div className={containerInput}>
                            <label>Kode Projek</label>
                            <input type='text' className={inputText} placeholder='08' 
                                {...register('project_code_var', {
                                    required: 'Project code is required.',
                                    minLength: {value: 2, message: 'Project code length at least 2 characters'}
                                })} 
                            />
                            <ErrorField errors={errors} name='project_code_var' />
                        </div>
                        <span className='mx-3 mb-3 sm:mb-0'></span>
                        <div className={containerInput}>
                            <label>Nama Projek</label>
                            <input type='text' className={inputText} placeholder='SEREHWANGI-ACEH' 
                                {...register('project_name_var', {
                                    required: 'Project Name is required.'
                                })} 
                            />
                            <ErrorField errors={errors} name='project_name_var' />
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

export default ModalFormProject