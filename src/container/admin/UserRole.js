import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux";

import { setUserRoleList } from "../../reduxs/action/actions";
import { createNewUserGroup, deleteUserGroup, getAllUserGroup, updateUserGroup } from "../../api/user-api"

import TableFull from "../../component/table/TableFull"
import Loader from "../../component/modal/Loader"
import { ButtonAdd } from "../../component/button/CustomButton"
import DropdownTwoOption from "../../component/dropdown/DropTwoOption"
import ModalFormUserRole from "../../component/modal/ModalFormUserRole";
import SearchField from "../../component/textfield/SearchField";
import { toast } from "react-toastify";


const UserRole = ({user, userRole, setUserRoleList}) => {
    const [loader, showLoader] = useState(false)
    const [modalUser, showModalUser] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [dataUser, setDataUser] = useState([])
    const [filterData, setFilterData] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    const navigate = useNavigate()

    const fetchUserRole = useCallback( async () => {
        showLoader(true)
        const res = await getAllUserGroup(localStorage.getItem('doc-token'))

        showLoader(false)
        console.log('Fetch User Group :', res)
        if(res.data){
            if(res.data.status === '00'){
                setDataUser(res.data.data)
                setFilterData(res.data.data)
            }else if(res.data.status === '01'){
                toast.info('Session expired, please login!')
                navigate('/auth', {replace:true})
            }else{
                // toast.error(res.data.message)
                toast.error(`${res.config?.url} ${res.status} ${res.statusText}`)
            }
        }else{
            toast.error(`${res.config?.url} ${res.message}`)
        }
    }, [navigate])

    useEffect(() => {
        fetchUserRole()
    }, [fetchUserRole])


    const handleEditData =  (selectedData) => {
        setSelectedUser(selectedData)
        setIsUpdate(true)
        showModalUser(true)
    }

    const handleReceiveDataForm = async (data) => {
        showLoader(true)
        
        let res = null
        if(!isUpdate){
            res = await createNewUserGroup(data)
        }else{
            res = await updateUserGroup(selectedUser.i_id, data)
        }

        console.log('Create/Update User Group :', res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                fetchUserRole()
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
        const res = await deleteUserGroup(data.i_id)

        console.log("DELETE USER Group :", res)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                fetchUserRole()
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
        setSelectedUser(null)
        setIsUpdate(false)
        showModalUser(false)
        showLoader(false)
    }

    const columns = [
        {
            Header: () => <span className='p-4'>Role Name</span>,
            Footer: 'Role Name',
            accessor: 'n_group',
            Cell: ({ value }) =>  <div className='text-left pl-4'>{value}</div>,
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
                return <DropdownTwoOption
                        onEdit={() => handleEditData(data)}
                        onDelete={()=>handleDeleteItem(data)}
                    />
            }
        }
    ]

    const handleSearch = (event) => {
        event.preventDefault()

        const newData = [...dataUser]
        if(event.target.value){
            console.log(event.target.value)
            const filtered = newData.filter(item => {
                return (
                    item.n_group.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.e_desc.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataUser)
        }
    }

    return (
        <div className='flex item-center flex-col p-6 mb-auto'>
            <div>
                <h2 className='text-base font-medium'>User Role Management</h2>
            </div>

            <div className='w-full bg-white rounded-2xl shadow-2xl p-6 mt-6'>
                <div className='mb-5'>
                    <h1 className='font-semibold'>List User Role</h1>
                </div>

                {/* TABLE */}
                <div className='flex justify-between items-center mb-3'>
                    <ButtonAdd onClick={() => showModalUser(true)} />
                    <SearchField placeholder='Search user role...' onChange={handleSearch} />
                </div>
                <TableFull dataTable={filterData} columnTable={columns} />

            </div>

            {modalUser && <ModalFormUserRole 
                data={selectedUser}
                onCancel={resetForm}
                onSubmit={handleReceiveDataForm}
            />}
            {loader && <Loader />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userRole: state.user_role_list
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setUserRoleList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRole)