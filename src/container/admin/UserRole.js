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

    const fetchUser = useCallback( async () => {
        showLoader(true)
        const res = await getAllUserGroup(localStorage.getItem('doc-token'))

        showLoader(false)
        console.log('Fetch User Group :', res)
        if(res.data){
            if(res.data.code === 0){
                setDataUser(res.data.data)
                setFilterData(res.data.data)
                setUserRoleList(res.data.data)
				localStorage.setItem('doc-role', JSON.stringify(res.data.data))
            } 
            // else if(res.data.code === 99){
            //     navigate('/auth')
            // }
            else{
                toast.error(res.data.message)
            }
        }else{
            toast.error(`${res.config?.url} ${res.message}`)
        }
    }, [navigate, setUserRoleList])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])


    const handleEditData =  (selectedData) => {
        setSelectedUser(selectedData)
        setIsUpdate(true)
        showModalUser(true)
    }

    const handleReceiveDataForm = async (data) => {
        showLoader(true)
        
        let res = null
        if(!isUpdate){
            data.created_by_var = user.fullname_var
            res = await createNewUserGroup(data)
        }else{
            data.updated_by_var = user.fullname_var
            res = await updateUserGroup(selectedUser.id_seq, data)
        }

        console.log('Create/Update User Group :', res)
        
        if(res.data){
            if(res.data.code === 0){
                toast.success(res.data.message)
                fetchUser()
                resetForm()
            }else{
                toast.error(res.data.message)
                showLoader(false)
            }
        }else{
            toast.error(`${res.config?.url} ${res.message}`)
        }
    }

    const handleDeleteItem = async (data) => {
        const res = await deleteUserGroup(data.id_seq)

        console.log("DELETE USER Group :", res)
        if(res.data){
            if(res.data.code === 0){
                toast.success(res.data.message)
                fetchUser()
            }else{
                toast.error(res.data.message)
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
            accessor: 'group_name_var',
            Cell: ({ value }) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Status',
            Footer: 'Status',
            accessor: 'status_int',
            Cell: ({value}) => (
                parseInt(value)===1? 
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
                    item.group_name_var.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataUser)
        }
    }

    return (
        <div className='flex item-center flex-col p-6 mb-auto'>
            <div className='flex items-center justify-between'>
                <h1 className='text-base font-semibold'>USER ROLE</h1>
                <h2 className='text-base font-medium'>User Management<span className='text-xs'> / </span><span className='text-sm'>User Role</span></h2>
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