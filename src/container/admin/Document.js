import { useCallback, useEffect, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"

import ModalFormProject from "../../component/modal/ModalFormProject"
import { ButtonAdd } from "../../component/button/CustomButton"
import TableFull from "../../component/table/TableFull";
import ModalMessage from "../../component/modal/ModalMessage";
import Loader from "../../component/modal/Loader"
import DropdownTwoOption from "../../component/dropdown/DropTwoOption"

import { createNewProject, deleteProject, getAllProject, updateProject } from "../../api/project-api"


const Document = ({user}) => {
    const [loader, showLoader] = useState(false)
    const [modalErr, showModalErr] = useState(false)
    const [messageErr, setMessageErr] = useState(false)
    const [modalForm, showModalForm] = useState(false)
    const [dataProject, setDataProject] = useState([])
    const [filterData, setFilterData] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [selectedData, setSelectedData] = useState(null)

    const navigate = useNavigate()

    const fetchData = useCallback(async () => {
        showLoader(true)

        const res = await getAllProject()
        
        console.log('Get Project :', res)
        resetForm()
        if(res.data){
            if(res.data.code === 0){
                setDataProject(res.data.data)
                setFilterData(res.data.data)
            }else if(res.data.code === 99){
                showLoader(true)
                navigate('/auth')
            }else{
                setMessageErr(res.data.message)
                showModalErr(true)
            }
        }else{
            alert(`${res.config?.url} ${res.message}`)
        }
    }, [navigate])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    const handleEdit = (selectedData) => {
        setSelectedData(selectedData)
        setIsUpdate(true)
        showModalForm(true)
    }

    const handleReceiveDataForm = async (payload) => {
        showLoader(true)
        
        let res = null
        if(!isUpdate){
            payload.created_by_var = user.fullname_var
            res = await createNewProject(payload)
        }else{
            payload.updated_by_var = user.fullname_var
            res = await updateProject(selectedData.id_seq, payload)
        }

        console.log('Create/Update Project :', res)
        
        if(res.data){
            if(res.data.code === 0){
                fetchData()
            }else{
                setMessageErr(res.data.message)
                showModalErr(true)
                showLoader(false)
            }
        }else{
            alert(`${res.config?.url} ${res.message}`)
        }
    }


    const handleDeleteData = async (id_seq) => {
        showLoader(true)

        const res = await deleteProject(id_seq)

        console.log('Get Project :', res)
        showLoader(false)
        if(res.data){
            if(res.data.code === 0){
                fetchData()
            }else if(res.data.code === 99){
                navigate('/auth')
            }else{
                setMessageErr(res.data.message)
                showModalErr(true)
            }
        }else{
            alert(`${res.config?.url} ${res.message}`)
        }
    }

    const resetForm = () => {
        showLoader(false)
        setIsUpdate(false)
        showModalForm(false)
        setSelectedData(null)
    }

    const handleSearch = (event) => {
        event.preventDefault()

        const newData = [...dataProject]
        if(event.target.value){
            const filtered = newData.filter(item => {
                return (
                    item.project_name_var.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.project_code_var.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataProject)
        }
    }

    const columns = [
        {
            Header: () => <span className='p-4'>Project Code</span>,
            Footer: 'Name',
            accessor: 'project_code_var',
            Cell: ({ value }) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Project Name',
            Footer: 'Project Name',
            accessor: 'project_name_var'
        },
        {
            Header: 'Contributors',
            Footer: 'Contributors',
            accessor: 'contributor'
        },
        {
            Header: 'Status',
            Footer: 'Status',
            accessor: 'status_int',
            Cell: ({value}) => (
                parseInt(value)===1? 
                <span className='bg-agroo1 text-agroo4 px-2 py-1 rounded-lg font-semibold'>Active</span>
                :
                <span className='bg-red-100 text-red-800 px-2 py-1 rounded-lg font-semibold'>Inactive</span>
            )
        },
        {
            Header: 'Action',
            Footer: 'Action',
            Cell: ({row}) => {
                const data = row.original
                return <DropdownTwoOption onEdit={() => handleEdit(data)} onDelete={()=>handleDeleteData(data)} />
            }
        }
    ]

    return (
        <div className='flex item-center flex-col p-6 mb-auto'>
            <div className='flex items-center justify-between'>
                <h1 className='text-base font-semibold'>DOCUMENT</h1>
                <h2 className='text-base font-medium text-right'>Project Management<span className='text-xs'> / </span><span className='text-sm'>Document</span></h2>
            </div>

            <div className='bg-white rounded-2xl shadow-2xl p-6 mt-6'>
                <div className='mb-5'>
                    <h1 className='font-semibold'>List Project</h1>
                </div>
                <div className='flex justify-between items-center mb-3'>
                    <ButtonAdd onClick={() => navigate('/dashboard/document-new')} />
                    <input type='search' onChange={handleSearch} placeholder='Search Document' className='outline-none border-1 border-gray-300 rounded-2xl px-2 sm:px-3 py-2 focus:border-agroo3 focus:border-2' />
                </div>
                <TableFull dataTable={filterData} columnTable={columns} />
            </div>

            {modalForm && <ModalFormProject data={selectedData} onCancel={resetForm} onSubmit={handleReceiveDataForm} />}
            {modalErr && <ModalMessage message={messageErr} onClose={()=>showModalErr(false)} />}
            {loader && <Loader />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null) (Document)