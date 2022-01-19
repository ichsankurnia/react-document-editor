import { useState, useCallback, useEffect } from "react"
import { connect } from "react-redux"

import TableMax from "../../component/table/TableMax"
import Loader from "../../component/modal/Loader"
import { ButtonAdd } from "../../component/button/CustomButton"
import ModalFormParameterConfig from "../../component/modal/ModalFormParameterConfig"
import SearchField from "../../component/textfield/SearchField"
import { useNavigate } from "react-router-dom"
import { createNewParamConfig, deleteParamConfig, getAllParamConfig, updateParamConfig, updateStatusParamConfig } from "../../api/paramconfig-api"
import { toast } from "react-toastify"
import DropdownActionParamConfig from "../../component/dropdown/DropdownActionParamConfig"



const ParameterConfig = () => {
    const [loader, showLoader] = useState(false)
    const [modalForm, showModalForm] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)                                     // eslint-disable-line

    const [dataParameter, setDataParameter] = useState([])                              // eslint-disable-line
    const [filterData, setFilterData] = useState([])
    const [selectedData, setSelectedData] = useState(null)

    const navigate = useNavigate()

    const fetchData = useCallback( async () => {
        showLoader(true)
        const res = await getAllParamConfig()

        showLoader(false)
        console.log('Fetch Param Config :', res)
        if(res.data){
            if(res.data.status === '00'){
                setDataParameter(res.data.data)
                setFilterData(res.data.data)
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
    }, [navigate])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    const handleEditData =  (selectedData) => {
        setSelectedData(selectedData)
        setIsUpdate(true)
        showModalForm(true)
    }

    const handleReceiveDataForm = async (data) => {
        showLoader(true)
        
        let res = null
        if(isUpdate){
            res = await updateParamConfig(selectedData.i_id, data)
        }else{
            res = await createNewParamConfig(data)
        }

        console.log('Create/Update Param config :', res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                fetchData()
                resetForm()
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

    const handleDeleteItem = async (data) => {
        const res = await deleteParamConfig(data.i_id)

        console.log("DELETE param config :", res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                fetchData()
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

    const handleActivateParamConfig = async (data) => {
        const payload = {
            b_active: data.b_active? false: true
        }
        const res = await updateStatusParamConfig(data.i_id, payload)

        console.log("Activate param config :", res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                fetchData()
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
        setSelectedData(null)
        setIsUpdate(false)
        showLoader(false)
        showModalForm(false)
    }

    const columns = [
        {
            Header: () => <span className='p-4'>Title</span>,
            Footer: 'Title',
            accessor: 'n_setting',
            Cell: ({ value }) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Key',
            Footer: 'Key',
            accessor: 'btrim',
        },
        {
            Header: 'Value',
            Footer: 'Value',
            accessor: 'e_setting',
        },
        {
            Header: 'Description',
            Footer: 'Description',
            accessor: 'e_desc',
        },
        {
            Header: 'Status',
            Footer: 'Status',
            accessor: 'b_active',
            Cell: ({value}) => (
                value? 
                <span className='bg-green-100 text-green-800 px-2 py-1 rounded-lg font-semibold'>Active</span>
                :
                <span className='bg-red-100 text-red-800 px-2 py-1 rounded-lg font-semibold'>Inactive</span>
            )
        },
        {
            Header: 'Action',
            Footer: 'Action',
            Cell: ({row}) => {
                const data = row.original
                return <DropdownActionParamConfig
                        onEdit={() => handleEditData(data)}
                        onDelete={()=>handleDeleteItem(data)}
                        titleActive={data.b_active?'Deactivate':'Activate'}
                        onActive={()=>handleActivateParamConfig(data)}
                    />
            }
        }
    ]

    const handleSearch = (event) => {
        event.preventDefault()

        const newData = [...dataParameter]
        if(event.target.value){
            const filtered = newData.filter(item => {
                return (
                    item.parameter_var?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.value_var?.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataParameter)
        }
    }

    return (
        <div className='flex item-center flex-col p-6 mb-auto'>
            <div>
                <h1 className='text-base font-semibold'>Parameter Config</h1>
            </div>

            <div className='w-full bg-white rounded-2xl shadow-2xl p-6 mt-6'>
                <div className='mb-5'>
                    <h1 className='font-semibold'>List Parameter</h1>
                </div>

                {/* TABLE */}
                <div className='flex justify-between items-center mb-3'>
                    <ButtonAdd onClick={() => showModalForm(true)} />
                    <SearchField placeholder='Search parameter...' onChange={handleSearch} />
                </div>
                <TableMax dataTable={filterData} columnTable={columns} />

            </div>

            {loader && <Loader />}
            {modalForm && <ModalFormParameterConfig 
                data={selectedData}
                onCancel={resetForm}
                onSubmit={handleReceiveDataForm}
            />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(ParameterConfig)