import { useEffect, useState } from "react"
import TableFull from "../../component/table/TableFull"
import SearchField from "../../component/textfield/SearchField"
import { useNavigate } from "react-router-dom"
import { getDocumentByUser, getOneDocument } from "../../api/document-api"
import Loader from "../../component/modal/Loader"
import { toast } from "react-toastify"


const History = () => {
    const [loader, showLoader] = useState(false)
    const [dataDocument, setDataDocument] = useState([])
    const [filterData, setFilterData] = useState([])
    const [docDetail, setDocDetail] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchDocument(){
            showLoader(true)
    
            const res = await getDocumentByUser(true)
            
            console.log('Get document byUser :', res)
            if(res.data){
                if(res.data.status === '00'){
                    setDataDocument(res.data.data)
                    setFilterData(res.data.data)
                    showLoader(false)
                }else if(res.data.status === '01'){
                    showLoader(true)
                    toast.info('Session expired, please login!')
                    navigate('/auth', {replace:true})
                }else{
                    if(res.data.message){
                        toast.error(res.data.message)
                    }else{
                        toast.error(`${res.config?.url} ${res.status} ${res.statusText}`)
                    }
                    showLoader(false)
                }
            }else{
                toast.error(`${res.config?.url} ${res.message}`)
                showLoader(false)
            }
        }

        fetchDocument()
    }, [navigate])
    
    const handleSearch = (event) => {
        event.preventDefault()

        const newData = [...dataDocument]
        if(event.target.value){
            const filtered = newData.filter(item => {
                return (
                    item.c_document_code.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.e_tittle.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.c_desc.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.d_created_at.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.d_approve_at.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataDocument)
        }
    }

    const fetchDocumentDetail = async (data) => {
        showLoader(true)
        const res = await getOneDocument(data.i_id)

        showLoader(false)
        console.log('Fetch Detail Document :', res)
        if(res.data){
            if(res.data.status === '00'){
                setDocDetail(res.data.data)
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

    const handleExpandDoc = () => {
        // window.open(res.data.data.e_encode_document);
        let pdfWindow = window.open("", '_blank', 'location=yes,height=1080,width=1920,scrollbars=yes,status=yes')
        pdfWindow.document.write(
            "<iframe width='100%' height='100%' src='" + docDetail.e_encode_document + "'></iframe>"
        )
    }
    
    const columns = [
        {
            Header: () => <span className='p-4'>Document Code</span>,
            Footer: 'Document Code',
            accessor: 'c_document_code',
            Cell: ({ value }) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Title',
            Footer: 'Title',
            accessor: 'e_tittle'
        },
        {
            Header: 'Description',
            Footer: 'Description',
            accessor: 'c_desc'
        },
        {
            Header: 'Created at',
            Footer: 'Created at',
            accessor: 'd_created_at'
        },
        {
            Header: 'Signed at',
            Footer: 'Signed at',
            accessor: 'd_approve_at'
        },
        {
            Header: 'Action',
            Footer: 'Action',
            Cell: ({row}) => {
                const data = row.original
                return <button onClick={()=>fetchDocumentDetail(data)} className="text-xl hover:text-red-500 transition duration-200 ease-in-out transform hover:scale-125"><i className="ri-picture-in-picture-exit-fill"></i></button>
            }
        }
    ]

    return (
        <div className='flex item-center flex-col p-4 md:p-6 mb-auto'>
            <h1 className='text-base font-semibold'>Signature History</h1>

            <div className='bg-white rounded-2xl shadow-2xl p-6 mt-6'>
                <div className='mb-5'>
                    <h1 className='font-semibold'>List History</h1>
                </div>
                <div className='flex mb-3'>
                    <SearchField placeholder='Search document...' onChange={handleSearch} />
                </div>
                <TableFull dataTable={filterData} columnTable={columns} />
            </div>
            {docDetail &&
            <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-30 overflow-auto">
            <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={()=>setDocDetail(null)}></div>
                <div className="bg-soft w-11/12 md:w-8/12 mx-auto my-auto pt-3 pb-5 px-5 rounded shadow-2xl z-50">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <i className="ri-picture-in-picture-exit-fill text-lg md:text-2xl hover:text-red-500 transition duration-200 ease-in-out transform hover:scale-125 cursor-pointer" onClick={handleExpandDoc}></i>
                            <h1 className="ml-2 font-semibold text-sms md:text-base">Doc. {docDetail.e_tittle} ({docDetail.c_document_code})</h1>
                        </div>
                        <i className="ri-close-fill text-lg md:text-3xl hover:text-red-500 transition duration-200 ease-in-out transform hover:scale-110 cursor-pointer" onClick={()=>setDocDetail(null)}></i>
                    </div>
                    <embed src={docDetail.e_encode_document} type="application/pdf" className="w-full" height={550} title={docDetail.c_document_code} />
                </div>
            </div>
            }
            {loader && <Loader />}
        </div>
    )
}

export default History