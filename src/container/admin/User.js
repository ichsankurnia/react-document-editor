import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { connect } from "react-redux"

import { createNewUser, disableUser, getAllUser, updateUser } from "../../api/user-api"

import TableFull from "../../component/table/TableFull"
import Loader from "../../component/modal/Loader"
import { ModalFormUser } from "../../component/modal/ModalFormUser"
import { ButtonAdd } from "../../component/button/CustomButton"
import DropdownActionUser from "../../component/dropdown/DropdownActionUser"
import ModalFormChangePassword from "../../component/modal/ModalFormChangePassword"
import SearchField from "../../component/textfield/SearchField"
import { toast } from "react-toastify"

const User = ({user, userRole}) => {
    const [loader, showLoader] = useState(false)
    const [modalUser, showModalUser] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [modalChangePass, showModalChangePass] = useState()
    const [dataUser, setDataUser] = useState([])
    const [filterData, setFilterData] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    const navigate = useNavigate()
    const userGroupList = userRole.length > 0? userRole : JSON.parse(localStorage.getItem('doc-role'))

    const fetchUser = useCallback( async () => {
        showLoader(true)
        const res = await getAllUser(localStorage.getItem('doc-token'))

        showLoader(false)
        console.log('Fetch User :', res)
        if(res.data){
            if(res.data.code === 0){
                setDataUser(res.data.data)
                setFilterData(res.data.data)
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
    }, [navigate])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])


    const handleEditData =  (selectedData) => {
        setSelectedUser(selectedData)
        setIsUpdate(true)
        showModalUser(true)
    }

    const handleChangePassword = (selectedData) => {
        setSelectedUser(selectedData)
        setIsUpdate(true)
        showModalChangePass(true)
    }

    const handleReceiveDataForm = async (data) => {
        showLoader(true)
        
        let res = null
        if(!isUpdate){
            data.created_by_var = user.fullname_var
            res = await createNewUser(data)
        }else{
            data.updated_by_var = user.fullname_var
            res = await updateUser(selectedUser.id_seq, data)
        }

        console.log('Create/Update User :', res)
        
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
        const res = await disableUser(data.id_seq)

        console.log("DELETE USER :", res)
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
        showModalChangePass(false)
        showLoader(false)
    }

    const columns = [
        {
            Header: () => <span className='p-4'>Name</span>,
            Footer: 'Name',
            accessor: 'fullname_var',
            Cell: ({ value }) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Phone Number',
            Footer: 'Phone Number',
            accessor: 'phone_number_int',
        },
        {
            Header: 'Email',
            Footer: 'Email',
            accessor: 'email_var'
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
            Header: 'Role',
            Footer: 'Role',
            accessor: 'user_group_id_int',
            Cell: ({ value }) => {
                return userGroupList.find(data => data.id_seq === value)?.group_name_var
            }
        },
        {
            Header: 'Action',
            Footer: 'Action',
            Cell: ({row}) => {
                const data = row.original
                if(user?.user_group_id_int === 1){
                    if(data.user_group_id_int !== 1){
                        return <DropdownActionUser
                            onEdit={() => handleEditData(data)}
                            onChangePassword={()=>handleChangePassword(data)}
                            onDelete={()=>handleDeleteItem(data)}
                        />
                    }
                }else{
                    if(data.user_group_id_int !== 1 && data.user_group_id_int !== 2){
                        return <DropdownActionUser
                                onEdit={() => handleEditData(data)}
                                onChangePassword={()=>handleChangePassword(data)}
                                onDelete={()=>handleDeleteItem(data)}
                            />
                    }
                }

                return <span></span>
            }
        }
    ]

    const handleSearch = (event) => {
        event.preventDefault()

        const newData = [...dataUser]
        if(event.target.value){
            const filtered = newData.filter(item => {
                return (
                    item.fullname_var.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.phone_number_int.toLowerCase().includes(event.target.value.toLowerCase()) || 
                    item.email_var?.toLowerCase().includes(event.target.value.toLowerCase())
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
                <h1 className='text-base font-semibold'>USER</h1>
                <h2 className='text-base font-medium'>User Management<span className='text-xs'> / </span><span className='text-sm'>User</span></h2>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between my-6'>
                <div className='w-full md:w-4/12 mb-5 md:mb-0 md:mr-6 flex justify-evenly items-center bg-white rounded-2xl shadow-xl px-5 py-8'>
                    <div className='bg-red-50 rounded-lg text-red-900 w-14 h-14 flex items-center justify-center text-2xl'>
                        <i className="ri-user-fill"></i>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-3xl mb-1'>{dataUser?.length}</h1>
                        <p>Total</p>
                    </div>
                </div>
                <div className='w-full md:w-4/12 mb-5 md:mb-0 md:mr-6 flex justify-evenly items-center bg-white rounded-2xl shadow-xl px-5 py-8'>
                    <div className='bg-red-50 rounded-lg text-red-900 w-14 h-14 flex items-center justify-center text-2xl'>
                        <i className="ri-user-follow-fill"></i>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-3xl mb-1'>{dataUser?.filter(data => data.status_int === 1).length}</h1>
                        <p>Active User</p>
                    </div>
                </div>
                <div className='w-full md:w-4/12 mb-5 md:mb-0 md:mr-6 flex justify-evenly items-center bg-white rounded-2xl shadow-xl px-5 py-8'>
                    <div className='bg-red-50 rounded-lg text-red-900 w-14 h-14 flex items-center justify-center text-2xl'>
                        <i className="ri-user-unfollow-fill"></i>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-3xl mb-1'>{dataUser?.filter(data => data.status_int !== 1).length}</h1>
                        <p>Inactive User</p>
                    </div>
                </div>
                <div className='w-full md:w-4/12 flex justify-evenly items-center bg-white rounded-2xl shadow-xl px-5 py-8'>
                    <div className='bg-red-50 rounded-lg text-red-900 w-14 h-14 flex items-center justify-center text-2xl'>
                        <i className="ri-user-5-fill"></i>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-3xl mb-1'>{dataUser?.filter(data => data.user_group_id_int === 3).length}</h1>
                        <p>Total User</p>
                    </div>
                </div>
            </div>

            <div className='w-full bg-white rounded-2xl shadow-2xl p-6'>
                <div className='mb-5'>
                    <h1 className='font-semibold'>Manage User</h1>
                </div>

                {/* TABLE */}
                <div className='flex justify-between items-center mb-3'>
                    <ButtonAdd onClick={() => showModalUser(true)} />
                    <SearchField placeholder='Search user...' onChange={handleSearch} />
                </div>
                <TableFull dataTable={filterData} columnTable={columns} />

            </div>

            {modalUser && <ModalFormUser 
                data={selectedUser}
                onCancel={resetForm}
                onSubmit={handleReceiveDataForm}
            />}
            {modalChangePass && <ModalFormChangePassword onCancel={resetForm} onSubmit={handleReceiveDataForm} />}
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

export default connect(mapStateToProps, null)(User)