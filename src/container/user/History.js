import { useState } from "react"
import DropdownTwoOption from "../../component/dropdown/DropTwoOption"
import TableFull from "../../component/table/TableFull"
import SearchField from "../../component/textfield/SearchField"


const History = () => {
    const [dataDoc, setDataDoc] = useState([])                  // eslint-disable-line
    const [filterData, setFilterData] = useState([])

    
    const handleSearch = (event) => {
        event.preventDefault()

        const newData = [...dataDoc]
        if(event.target.value){
            const filtered = newData.filter(item => {
                return (
                    item.project_name_var.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.project_code_var.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataDoc)
        }
    }
    
    const columns = [
        {
            Header: () => <span className='p-4'>Document Code</span>,
            Footer: 'Document Code',
            accessor: 'project_code_var',
            Cell: ({ value }) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Title',
            Footer: 'Title',
            accessor: 'project_name_var'
        },
        {
            Header: 'Description',
            Footer: 'Description',
            accessor: 'contributor'
        },
        {
            Header: 'Sign At',
            Footer: 'Sign At',
            accessor: 'signat'
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
                const data = row.original                               // eslint-disable-line
                return <DropdownTwoOption />
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
        </div>
    )
}

export default History