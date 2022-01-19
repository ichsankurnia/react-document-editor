import { LazyLoadImage } from "react-lazy-load-image-component"
import docIcon from '../../assets/img/mou_icon.png'
import { useState, useEffect } from "react"
import { getDocumentByUser } from "../../api/document-api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../../component/modal/Loader"
import emptyDoc from '../../assets/img/error-img.png'

// const arrDoc = [
    // {
    //     e_tittle: 'Document Title',
    //     c_desc: 'Description of the document blablab ba',
    // },
    // {
    //     e_tittle: 'Document Title',
    //     c_desc: 'Description of the document blablab ba',
    // },
    // {
    //     e_tittle: 'Document Title',
    //     c_desc: 'Description of the document blablab ba',
    // },
    // {
    //     e_tittle: 'Document Title',
    //     c_desc: 'Description of the document blablab ba',
    // },
    // {
    //     e_tittle: 'Document Title',
    //     c_desc: 'Description of the document blablab ba',
    // },
// ]

const DocumentUser = () => {
    const [loader, showLoader] = useState(false)
    const [listDocument, setListDocument] = useState([])

    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchDocument(){
            showLoader(true)
            const res = await getDocumentByUser(false)

            showLoader(false)
            console.log('Fetch document :', res)
            if(res.data){
                if(res.data.status === '00'){
                    setListDocument(res.data.data)
                }else if(res.data.status === '01'){
                    toast.info('Session expired, please login!')
                    navigate('/auth', {replace:true})
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

        fetchDocument()
    }, [navigate])

    const handleSignDocument = (docID) => {
        showLoader(true)
        navigate('/dashboard/document-detail/'+docID)
    }

    return (
        <div className='flex item-center flex-col p-4 md:p-6 mb-auto'>
            <h1 className='text-base font-semibold'>My Document</h1>

            <div className="flex flex-wrap justify-center md:justify-start -mx-3 md:mx-0">
                {listDocument.length > 0?
                listDocument.map((data, key) =>
                <div className="bg-white rounded-lg shadow-lg w-40 md:w-56 flex flex-col justify-center items-center text-center p-4 md:p-6 m-2 md:m-5" key={key}>
                    <LazyLoadImage effect='blur' src={docIcon} alt='' width='90%' />
                    <h1 className="font-bold text-sm md:text-base mt-3">{data.e_tittle}</h1>
                    <p className="font-medium mt-1 mb-4 text-xsm md:text-xs" style={{width: '90%'}}>{data.c_desc}</p>
                    <button className="text-white bg-red-600 hover:bg-red-800 rounded-lg w-full py-2 md:py-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105" 
                        style={{width: '90%'}} onClick={()=>handleSignDocument(data.i_id)}
                    >
                        Sign Now
                    </button>
                </div>
                )
                :
                <div className='h-60vh w-full flex flex-col justify-center items-center font-medium text-center p-5'>
                    <LazyLoadImage effect='blur' src={emptyDoc} className='md:w-100' />
                    <p className='text-base text-gray-700 mt-8'>You don't have any documents to sign at this time!</p>
                </div>
                }
            </div>
            {loader && <Loader />}
        </div>
    )
}

export default DocumentUser