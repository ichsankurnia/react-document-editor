import { LazyLoadImage } from "react-lazy-load-image-component"
import docIcon from '../../assets/img/doc_icon.png'
import { useState } from "react"
import { ButtonCancel, ButtonSave } from "../button/CustomButton"
import { toast } from "react-toastify"
import Loader from "./Loader"
import { getTemplateDocument } from "../../api/document-api"

const arrDoc = [
    {
        id:1,
        e_tittle: 'IA Skema 1',
        doc_file: 'IA-Skema-1.docx',
    },
    {
        id:2,
        e_tittle: 'IA Skema 2',
        doc_file: 'IA-Skema-2.docx',
    },
    {
        id:3,
        e_tittle: 'Template Draft MOA Bahasa',
        doc_file: 'TEMPLATE-DRAFT-MOA-DN-BHS.docx',
    },
    {
        id:4,
        e_tittle: 'Template MOA English dan Bahasa',
        doc_file: 'TEMPLATE-MOA-ENG-ID.docx',
    },
    {
        id:5,
        e_tittle: 'Template MOU',
        doc_file: 'TEMPLATE-MOU.docx',
    },
]

const ModalSelectDocument = ({onCancel, onSubmit}) => {
    const [loader, showLoader] = useState(false)
    const [selectedDoc, setSelectedDoc] = useState(null)

    const handleSubmit = async () => {
        if(!selectedDoc){
            toast.error('Please select a document!')
            return
        }

        showLoader(true)
        const res = await getTemplateDocument(selectedDoc.doc_file)

        console.log('Download document :', res)
        showLoader(false)
        if(res.data){
            if(res.status === 200){
                const fileDoc = new File([res.data], selectedDoc.doc_file)
                onSubmit(fileDoc)
            }else{
                toast.error(`${res.config?.url} ${res.status} ${res.statusText}`)
            }
            // onSubmit()
        }else{
            toast.error(`${res.config?.url} ${res.message}`)
        }
    }

    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-30">
            <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={onCancel}></div>

            {/* Modal Content */}
            <div className="bg-soft w-10/12 md:w-3/5 mx-auto my-auto p-6 rounded-xl shadow-2xl z-50 overflow-y-auto" style={{ maxHeight: '90vh'}}>
                {/* Body */}
                <h1 className='text-base font-medium mb-8'>Select Document Template</h1>
                
                <div className="flex flex-wrap justify-center items-center -mx-3">
                    {arrDoc.map((data, key) =>
                    <button type="button" className="bg-white rounded-lg shadow-lg w-40 md:w-56 flex flex-col justify-center items-center text-center p-4 md:p-6 m-2 md:m-5 relative" key={key} onClick={()=>setSelectedDoc(data)}>
                        {selectedDoc?.id === data.id &&
                        <div className="absolute inset-0 w-full h-full bg-red-600 bg-opacity-20 rounded-lg shadow-l border-2 border-red-600"></div>
                        }
                        <LazyLoadImage effect='blur' src={docIcon} alt='' />
                        <h1 className="font-bold text-sm md:text-base mt-3">{data.e_tittle}</h1>
                        <p className="font-medium mt-1 mb-4 text-xsm md:text-xs" style={{width: '90%'}}>{data.doc_file}</p>
                    </button>
                )}
                </div>

                <div className='flex justify-end mt-8'>
                    <ButtonCancel type='button' onClick={onCancel} />
                    <ButtonSave type='button' onClick={handleSubmit} />
                </div>
            </div>

            {loader && <Loader />}
        </div>
    )
}

export default ModalSelectDocument