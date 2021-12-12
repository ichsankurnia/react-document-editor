import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { IoMdArchive, IoMdArrowDropdown, IoMdCopy, IoMdCreate, IoMdMove, IoMdRemove } from 'react-icons/io'

export default function Dropdown() {
    const [value, setValue] = useState('Options')
    return (
        <div className="w-56 z-10">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        {value}
                        <IoMdArrowDropdown className="w-5 h-5 ml-2 -mr-1 text-indigo-200 hover:text-indigo-100" aria-hidden="true" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`} onClick={()=>setValue('Edit')} >
                                        <IoMdCreate className='mr-3 text-lg text-indigo-400' /> Edit
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`} onClick={()=>setValue('Duplicate')} >
                                        <IoMdCopy className='mr-3 text-lg text-indigo-400' /> Duplicate
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`} onClick={()=>setValue('Archieve')} >
                                        <IoMdArchive className='mr-3 text-lg text-indigo-400' /> Archive
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`} onClick={()=>setValue('Move')} >
                                        <IoMdMove className='mr-3 text-lg text-indigo-400' /> Move
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`} onClick={()=>setValue('Delete')} >
                                        <IoMdRemove className='mr-3 text-lg text-indigo-400' /> Delete
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}