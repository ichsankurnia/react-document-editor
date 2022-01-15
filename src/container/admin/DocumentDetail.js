import { useState } from "react"
import { useEffect } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate, useParams } from "react-router-dom"
import { getOneDocument } from "../../api/document-api"
import Loader from "../../component/modal/Loader"
import docIcons from '../../assets/img/mou_icon.png'
import moment from "moment"
import { toast } from "react-toastify"

const DocumentDetail = () => {
    const [loader, showLoader] = useState(false)
    const [dataDocument, setDataDocument] = useState(null)

    const navigate = useNavigate()
    const {document_id} = useParams()

    useEffect(()=>{
        async function fetchDetailDocument(){
            showLoader(true)
            const res = await getOneDocument(document_id)

            showLoader(false)
            console.log('Fetch Detail Document :', res)
            if(res.data){
                if(res.data.status === '00'){
                    setDataDocument(res.data.data)
                }else if(res.data.status === '01'){
                    toast.info('Session expired, please login!')
                    navigate('/auth')
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

        fetchDetailDocument()
    }, [document_id, navigate])
    
    return (
        <div className='flex item-center flex-col py-5 px-3 md:p-6 mb-auto'>
            <div className='flex items-center justify-between'>
                <button className='w-9 h-9 md:w-10 md:h-10 bg-red-800 text-white hover:bg-red-600 shadow rounded-full flex justify-center items-center text-3xl transition duration-200 ease-in-out transform hover:scale-110'
                    onClick={()=>navigate(-1)}
                >
                    <i className="ri-arrow-left-s-line"></i>
                </button>
                <h2 className='text-base font-medium text-right'>Document Detail</h2>
            </div>

            <div className="flex justify-center items-center flex-col bg-white rounded-2xl shadow p-6 md:p-4 mt-5 font-medium text-center">
                <LazyLoadImage effect="blur" src={docIcons} alt="" className="w-44" />
                <p className="font-semibold text-base mt-5">{dataDocument?.c_document_code || 'Document Code'}</p>
                <p className="font-bold text-xl mt-2 w-9/12 md:w-1/2">{dataDocument?.e_tittle || 'Document Title'}</p>
                <p className="mt-2 w-9/12 md:w-1/2">{dataDocument?.c_desc || 'Description of the document'}</p>
                <p className="my-3">Created on {moment(dataDocument?.d_created_at).format('DD MMM YYYY mm:HH')||moment().format('DD MMM YYY mm:HH')}</p>
                <div className="mt-2">
                    <p>Contributors</p>
                </div>
            </div>

            {loader && <Loader />}
        </div>
    )
}

export default DocumentDetail