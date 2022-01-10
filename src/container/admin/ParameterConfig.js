import { useState } from "react"
import { connect } from "react-redux"

import TableFull from "../../component/table/TableFull"
import ModalMessage from "../../component/modal/ModalMessage"
import Loader from "../../component/modal/Loader"
import { ButtonAdd } from "../../component/button/CustomButton"
import DropdownTwoOption from "../../component/dropdown/DropTwoOption"
import ModalFormParameterConfig from "../../component/modal/ModalFormParameterConfig"
import SearchField from "../../component/textfield/SearchField"


const ParameterConfig = ({user}) => {
    const [loader, showLoader] = useState(false)
    const [modalErr, showModalErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const [modalForm, showModalForm] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    const [dataParameter, setDataParameter] = useState([])
    const [filterData, setFilterData] = useState([])
    const [selectedData, setSelectedData] = useState(null)



    const handleEditData =  (selectedData) => {
        setSelectedData(selectedData)
        setIsUpdate(true)
        showModalForm(true)
    }

    const handleReceiveDataForm = async (data) => {

    }

    const handleDeleteItem = async (data) => {

    }

    const resetForm = () => {
        setErrMessage('')
        setSelectedData(null)
        setIsUpdate(false)
        showModalForm(false)
        showLoader(false)
        showModalErr(false)
    }

    const columns = [
        {
            Header: () => <span className='p-4'>Parameter</span>,
            Footer: 'Parameter',
            accessor: 'parameter_var',
            Cell: ({ value }) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Value',
            Footer: 'Value',
            accessor: 'value_var',
        },
        {
            Header: 'Action',
            Footer: 'Action',
            Cell: ({row}) => {
                const data = row.original
                return <DropdownTwoOption
                        onEdit={() => handleEditData(data)}
                        onDelete={()=>handleDeleteItem(data)}
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
            <div className='flex items-center justify-between'>
                <h1 className='text-base font-semibold'>PARAMETER CONFIG</h1>
                <h2 className='text-base font-medium'>Config<span className='text-xs'> / </span><span className='text-sm'>Parameter Config</span></h2>
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
                <TableFull dataTable={filterData} columnTable={columns} />

            </div>

            {loader && <Loader />}
            {modalForm && <ModalFormParameterConfig 
                data={selectedData}
                onCancel={resetForm}
                onSubmit={handleReceiveDataForm}
            />}
            {modalErr && <ModalMessage message={errMessage} onClose={()=>showModalErr(false)} />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(ParameterConfig)