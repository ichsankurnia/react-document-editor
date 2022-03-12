import { FC, useCallback, useEffect, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"

import { ButtonAdd } from "../../component/button/CustomButton"
import TableFull from "../../component/table/TableFull";
import Loader from "../../component/modal/Loader"

import SearchField from "../../component/textfield/SearchField"
import { toast } from "react-toastify"
import { deleteDocument, getAllDocument } from "../../api/document-api"
import DropdownActionDocument from "../../component/dropdown/DropdownActionDocument";


type Props = {
    user?: any
}

const Document: FC<Props> = ({user}) => {
    const [loader, showLoader] = useState(false)
    const [dataDocument, setDataDocument] = useState([])
    const [filterData, setFilterData] = useState([])

    const navigate = useNavigate()

    const fetchData = useCallback(async () => {
        showLoader(true)

        const res = await getAllDocument()
        
        console.log('Get all document :', res)
        resetForm()
        if(res.data){
            if(res.data.status === '00'){
                setDataDocument(res.data.data)
                setFilterData(res.data.data)
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
            }
        }else{
            toast.error(`${res.config?.url} ${res.message}`)
        }
    }, [navigate])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    const handleDeleteData = async (docID: number) => {
        showLoader(true)

        const res = await deleteDocument(docID)

        console.log('Get Document :', res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                fetchData()
            }else if(res.data.status === '00'){
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

    const resetForm = () => {
        showLoader(false)
    }

    const handleSearch = (event: any) => {
        event.preventDefault()

        const newData = [...dataDocument]
        if(event.target.value){
            const filtered = newData.filter((item: any) => {
                return (
                    item.e_tittle.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.c_document_code.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.c_desc.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.d_created_at.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataDocument)
        }
    }

    const handleDetailDoc = (docID: number) => {
        showLoader(true)
        navigate('/dashboard/document-detail/'+docID)
    }

    const columns = [
        {
            Header: () => <span className='p-4'>Document Code</span>,
            Footer: 'Document Code',
            accessor: 'c_document_code',
            Cell: ({ value }: any) =>  <div className='text-left pl-4'>{value}</div>,
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
            Header: 'Status',
            Footer: 'Status',
            accessor: 'b_active',
            Cell: ({value}: any) => (
                value? 
                <span className='bg-green-100 text-green-800 px-2 py-1 rounded-lg font-semibold'>Active</span>
                :
                <span className='bg-red-100 text-red-800 px-2 py-1 rounded-lg font-semibold'>Inactive</span>
            )
        },
        {
            Header: 'Action',
            Footer: 'Action',
            Cell: ({row}: any) => {
                const data = row.original
                return <DropdownActionDocument onDetail={()=>handleDetailDoc(data.i_id)} onDelete={() => handleDeleteData(data.i_id)} />
            }
        }
    ]

    return (
        <div className='flex item-center flex-col p-6 mb-auto'>
            <div>
                <h1 className='text-base font-semibold'>Document Management</h1>
            </div>

            <div className='bg-white rounded-2xl shadow-2xl p-6 mt-6'>
                <div className='mb-5'>
                    <h1 className='font-semibold'>List Project</h1>
                </div>
                <div className='flex justify-between items-center mb-3'>
                    <ButtonAdd onClick={() => navigate('/dashboard/document-new')} />
                    <SearchField placeholder='Search document...' onChange={handleSearch} />
                </div>
                <TableFull dataTable={filterData} columnTable={columns} />
            </div>

            {loader && <Loader />}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null) (Document)