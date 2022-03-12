import { useNavigate } from "react-router-dom"
import React, { useCallback, useEffect, useState } from "react"
import { connect } from "react-redux"

import { activateUser, changePasswordUser, createNewUser, deleteUser, getAllUser, getAllUserGroup, updateUser } from "../../api/user-api"

import TableFull from "../../component/table/TableFull"
import Loader from "../../component/modal/Loader"
import { ButtonAdd } from "../../component/button/CustomButton"
import DropdownActionUser from "../../component/dropdown/DropdownActionUser"
import ModalFormChangePassword from "../../component/modal/ModalFormChangePassword"
import ModalFormUser from "../../component/modal/ModalFormUser"
import SearchField from "../../component/textfield/SearchField"
import { toast } from "react-toastify"


type Props = {
    user?: any
}

const User: React.FC<Props> = ({user}) => {
    const [loader, showLoader] = useState(false)
    const [modalUser, showModalUser] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isChangePass, setIsChangePass] = useState(false)
    const [modalChangePass, showModalChangePass] = useState(false)
    const [dataUser, setDataUser] = useState([])
    const [dataRole, setDataRole] = useState([])
    const [filterData, setFilterData] = useState([])
    const [selectedUser, setSelectedUser] = useState<any>(null)

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUserRole() {
            const res = await getAllUserGroup(localStorage.getItem('doc-token'))
    
            console.log('Fetch User Group :', res)
            if(res.data){
                if(res.data.status === '00'){
                    setDataRole(res.data.data.filter((data: any) => data.b_active))
                }else{
                    toast.error(`${res.config?.url} ${res.status} ${res.statusText}`)
                }
            }else{
                toast.error(`${res.config?.url} ${res.message}`)
            }
        }

        fetchUserRole()
    }, [])

    const fetchUser = useCallback( async () => {
        showLoader(true)
        const res = await getAllUser(localStorage.getItem('doc-token'))

        showLoader(false)
        console.log('Fetch User :', res)
        if(res.data){
            if(res.data.status === '00'){
                setDataUser(res.data.data)
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
        fetchUser()
    }, [fetchUser])


    const handleEditData =  (selectedData: any) => {
        setSelectedUser(selectedData)
        setIsUpdate(true)
        showModalUser(true)
    }

    const handleChangePassword = (selectedData: any) => {
        setSelectedUser(selectedData)
        setIsChangePass(true)
        showModalChangePass(true)
    }

    const handleReceiveDataForm = async (data: any) => {
        showLoader(true)
        
        let res = null
        if(isUpdate){
            res = await updateUser(selectedUser.i_id, data)
        }else if(isChangePass){
            res = await changePasswordUser(selectedUser.i_id, data)
        }else{
            res = await createNewUser(data)
        }

        console.log('Create/Update User :', res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                fetchUser()
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

    const handleDeleteItem = async (data: any) => {
        const res = await deleteUser(data.i_id)

        console.log("DELETE USER :", res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                fetchUser()
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

    const handleActivateUser = async (data: any) => {
        const payload = {
            b_active: data.b_active? false: true
        }
        const res = await activateUser(data.i_id, payload)

        console.log("Activate USER :", res)
        showLoader(false)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                fetchUser()
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
        setIsChangePass(false)
        showModalUser(false)
        showModalChangePass(false)
        showLoader(false)
    }

    const columns = [
        {
            Header: () => <span className='p-4'>Name</span>,
            Footer: 'Name',
            accessor: 'e_fullname',
            Cell: ({ value }: any) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Username',
            Footer: 'Username',
            accessor: 'n_username',
        },
        {
            Header: 'Phone Number',
            Footer: 'Phone Number',
            accessor: 'e_phone_number',
        },
        {
            Header: 'Email',
            Footer: 'Email',
            accessor: 'e_email'
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
            Header: 'Role',
            Footer: 'Role',
            accessor: 'n_group'
        },
        {
            Header: 'Action',
            Footer: 'Action',
            Cell: ({row}: any) => {
                const data = row.original
                if(user?.i_group === 1){
                    if(data.i_group !== 1){
                        return <DropdownActionUser
                            onActive={()=>handleActivateUser(data)}
                            titleActive={data.b_active? 'Deactivate': 'Activate'}
                            onEdit={() => handleEditData(data)}
                            onChangePassword={()=>handleChangePassword(data)}
                            onDelete={()=>handleDeleteItem(data)}
                        />
                    }
                }else{
                    if(data.i_group !== 1 && data.i_group !== 2){
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

    const handleSearch = (event: any) => {
        event.preventDefault()

        const newData = [...dataUser]
        if(event.target.value){
            const filtered = newData.filter((item: any) => {
                return (
                    item.e_fullname.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.n_username.toLowerCase().includes(event.target.value.toLowerCase()) || 
                    item.e_phone_number.toLowerCase().includes(event.target.value.toLowerCase()) || 
                    item.e_email?.toLowerCase().includes(event.target.value.toLowerCase())
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
                <h2 className='text-base font-medium'>User Management</h2>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between my-6'>
                <div className='w-full md:w-4/12 mb-5 md:mb-0 md:mr-6 flex justify-evenly items-center bg-white rounded-2xl shadow-xl px-5 py-8'>
                    <div className='bg-red-50 rounded-lg text-red-900 w-14 h-14 flex items-center justify-center text-2xl'>
                        <i className="ri-user-fill"></i>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-3xl mb-1'>{dataUser?.length}</h1>
                        <p>Total User</p>
                    </div>
                </div>
                <div className='w-full md:w-4/12 mb-5 md:mb-0 md:mr-6 flex justify-evenly items-center bg-white rounded-2xl shadow-xl px-5 py-8'>
                    <div className='bg-red-50 rounded-lg text-red-900 w-14 h-14 flex items-center justify-center text-2xl'>
                        <i className="ri-user-follow-fill"></i>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-3xl mb-1'>{dataUser?.filter((data: any) => data.b_active).length}</h1>
                        <p>Active User</p>
                    </div>
                </div>
                <div className='w-full md:w-4/12 mb-5 md:mb-0 md:mr-6 flex justify-evenly items-center bg-white rounded-2xl shadow-xl px-5 py-8'>
                    <div className='bg-red-50 rounded-lg text-red-900 w-14 h-14 flex items-center justify-center text-2xl'>
                        <i className="ri-user-unfollow-fill"></i>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-3xl mb-1'>{dataUser?.filter((data: any) => !data.b_active).length}</h1>
                        <p>Inactive User</p>
                    </div>
                </div>
                <div className='w-full md:w-4/12 flex justify-evenly items-center bg-white rounded-2xl shadow-xl px-5 py-8'>
                    <div className='bg-red-50 rounded-lg text-red-900 w-14 h-14 flex items-center justify-center text-2xl'>
                        <i className="ri-user-5-fill"></i>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-3xl mb-1'>{dataUser?.filter((data: any) => data.i_group === 2).length}</h1>
                        <p>Employee</p>
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
                userRoleList={dataRole} 
                data={selectedUser}
                onCancel={resetForm}
                onSubmit={handleReceiveDataForm}
            />}
            {modalChangePass && <ModalFormChangePassword onCancel={resetForm} onSubmit={handleReceiveDataForm} />}
            {loader && <Loader />}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        userRole: state.user_role_list
    }
}

export default connect(mapStateToProps, null)(User)