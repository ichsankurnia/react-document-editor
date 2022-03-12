import { useState, useCallback, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Dropzone from 'react-dropzone'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { ButtonCancel, ButtonSave } from "../../component/button/CustomButton"

import { setCollapse } from "../../reduxs/action/actions";
import { bindActionCreators } from "redux";

import { DocumentEditorContainerComponent , WordExport, SfdtExport, Selection, Editor, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { onDragEnd } from "../../component/DragDropExample";
import Loader from "../../component/modal/Loader";
import { toast } from "react-toastify";
import { getAllUser } from "../../api/user-api";
import { useForm } from "react-hook-form";
import ErrorField from "../../component/ErrorField";
import ModalSelectDocument from "../../component/modal/ModalSelectDocument";
import { createNewDocument } from "../../api/document-api";

//Inject require module.
DocumentEditorContainerComponent.Inject(SfdtExport, Selection, Editor, WordExport, Toolbar);

const containerInput = 'flex flex-col w-full sm:w-1/2'
const inputText = 'outline-none border-1 border-gray-200 rounded-lg py-2 px-3 sm:p-3 mt-1 focus:ring-1 focus:ring-red-800 focus:border-red-800'


const DocumentNew = ({setCollapse}) => {
    const [loader, showLoader] = useState(false)
    const [modalTemplate, showModalTemplate] = useState(false)
    const [editor, showEditor] = useState(false)
    const [documenteditor, setDocumentEditor] = useState(null)
    const [documentUpload, setDocumentUpload] = useState('')
    const [columns, setColumns] = useState([]);

    const navigate = useNavigate()
    const dropzoneRef = useRef();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: "all" });

    useEffect(() => {
        if(editor){
            if(window.screen.width > 640){
                setCollapse(false)
            }
        }else{
            setCollapse(true)
        }

        return () => {
            setCollapse(true)
        }
    }, [setCollapse, editor])

    useEffect(() => {
        if(documenteditor) documenteditor.toolbar.enableItems(0, false)
    }, [documenteditor])

    useEffect(() => {
        async function fetchUser(){
            showLoader(true)
            const res = await getAllUser(localStorage.getItem('doc-token'))

            showLoader(false)
            console.log('Fetch User :', res)
            if(res.data){
                if(res.data.status === '00'){
                    const arr = []
                    if(res.data.data.length > 0){
                        const userActive = res.data.data.filter(data => data.b_active && parseInt(data.i_group)!==1)
                        userActive.forEach(data => {
                            const obj = {
                                id: data.i_id,
                                name: data.e_fullname,
                                role: data.n_group,
                                username: data.n_username,
                                phone: data.e_phone_number,
                                email: data.e_email
                            }
                            arr.push(obj)
                        })

                        setColumns([
                            {
                                id: '1',
                                name: "Users",
                                items: arr
                            },
                            {
                                id: '2',
                                name: "Contributors",
                                items: []
                            }
                        ])
                    }
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
        }

        fetchUser()
    }, [navigate])

    const openDialog = () => {
        // Note that the ref is set async,
        // so it might be null at some point 
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                setDocumentUpload(binaryStr)
            }
            reader.readAsDataURL(file)
        })

    }, [])
    
    const handleShowEditor = () => {
        showEditor(true)
        setDocumentUpload('')
    }


    const handleSave = (dataForm) => {
        if(columns[1].items.length>0){
            if(editor){
                documenteditor.documentEditor.saveAsBlob('Docx').then((res) => {
                    let reader = new FileReader();
                    
                    reader.onloadend = () => {
                        let base64data = reader.result;
                        if(base64data.toString().length < 5530){
                            alert('Document is empty')
                        }else{
                            console.log(base64data.toString())
                            handleCreateDocument(dataForm, columns[1].items, base64data.toString())
                        }
                    };
                    
                    // reader.readAsText(res)				// read as text
                    reader.readAsDataURL(res);			// read as base64
                }).catch(err => console.log('Err :', err))
            }else{
                if(documentUpload !== ''){
                    console.log(documentUpload)
                    handleCreateDocument(dataForm, columns[1].items, documentUpload)
                }else{
                    toast.error('No document uploaded')
                }
            }
        }else{
            toast.error('No contributor added on this document')
        }
    }

    const handleCreateDocument = async (dataForm, contributors, base64Doc) => {
        showLoader(true)
        const {e_tittle, c_desc} = dataForm

        const contribUser = contributors.map(data => {return {'i_id': data.id}})

        const payload = {
            e_tittle, c_desc,
            detail: contribUser,
            e_encode_document: base64Doc
        }

        const res = await createNewDocument(payload)
        console.log('Create Document :', res)
        if(res.data){
            if(res.data.status === '00'){
                toast.success(res.data.message)
                navigate('/dashboard/document')
            }else{
                if(res.data.message){
                    toast.error(res.data.message)
                }else{
                    toast.error(`${res.config?.url} ${res.status} ${res.statusText}`)
                }
                showLoader(false)
            }
        }else{
            toast.error(`${res.config?.url} ${res.message}`)
            showLoader(false)
        }
    }

    // const onFileChange = (e) => {
    //     if (e.target.files[0]) {
    //         showLoader(true)
    //         //Get selected file.
    //         let file = e.target.files[0];
    //         if (file.name.substr(file.name.lastIndexOf('.')) !== '.sfdt') {
    //             loadFile(file)
    //         }else{
    //             documenteditor.documentEditor.open(e.target.files[0])
    //         }
    //     }
    // }

    const loadFile = (file) => {
        showLoader(true)
        let ajax = new XMLHttpRequest();
        ajax.open('POST', 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import', true);
        ajax.onprogress = () => {
            console.log('Converting documunet to SFDT...')
        }
        ajax.onreadystatechange = () => {
            console.log('Convert DocToSFDT :', ajax.status, ajax.statusText)
            if (ajax.readyState === 4) {
                if (ajax.status === 200 || ajax.status === 304) {
                    // open SFDT text in document editor
                    documenteditor.documentEditor.open(ajax.responseText);
                }
            }
            showModalTemplate(false)
            showLoader(false)
        };
        let formData = new FormData();
        formData.append('files', file);
        ajax.send(formData);
    }


    return (
        <div className='flex item-center flex-col py-5 px-3 md:p-6 mb-auto'>
            <div className='flex items-center justify-between'>
                <button className='w-9 h-9 md:w-10 md:h-10 bg-red-800 text-white hover:bg-red-600 shadow rounded-full flex justify-center items-center text-3xl transition duration-200 ease-in-out transform hover:scale-110'
                    onClick={()=>navigate(-1)}
                >
                    <i className="ri-arrow-left-s-line"></i>
                </button>
                <h2 className='text-base font-medium text-right'>New Document</h2>
            </div>

            <div className='bg-white mt-6 rounded-2xl shadow-2xl p-6'>
                <form onSubmit={handleSubmit(handleSave)}>
                    <h1 className='font-semibold'>Form Create New Document</h1>
                    <div className='flex flex-col sm:flex-row mt-6'>
                        <div className={containerInput}>
                            <label>Document Title</label>
                            <input type='text' className={inputText} placeholder='Document Title' {...register("e_tittle", { required: "Title is required."})} />
                            <ErrorField errors={errors} name='e_tittle' />
                        </div>
                        <span className='mx-5 mb-3 sm:mb-0'></span>
                        <div className={containerInput}>
                            <label>Document Description</label>
                            <input type='text' className={inputText} placeholder='Description of the document' {...register("c_desc", { required: "Description is required."})} />
                            <ErrorField errors={errors} name='c_desc' />
                        </div>
                    </div>
                    <div className='mt-10 flex flex-col items-center justify-center'>
                        <h1 className='font-medium'>Add Contributor for this document</h1>
                        <p className='text-center'>Drag user from left to right column to add user as document contributor</p>
                        <div className='flex justify-center mt-5'>
                        <DragDropContext
                            onDragEnd={result => onDragEnd(result, columns, setColumns)}
                        >
                            {columns.map((column, key) => (
                                <div className='flex flex-col items-center h-72 mx-1 md:mx-5 bg-gray-200 text-gray-800 rounded-2xl shadow-lg' key={key} >
                                    <h2 className='w-full px-5 mt-3 text-sm font-medium'>{column.name}</h2>
                                    <div className='m-0.5 md:m-1 overflow-y-auto rounded-xl'>
                                        <Droppable droppableId={column.id}>
                                            {(provided, snapshot) => (
                                                <div {...provided.droppableProps} ref={provided.innerRef}
                                                    className={`
                                                        ${snapshot.isDraggingOver? 'bg-blue-200': 'bg-gray-200'} p-2 w-40 md:w-68
                                                    `}
                                                    style={{ minHeight: '15rem'}}
                                                >
                                                    {column.items.map((item, key) => (
                                                        <Draggable key={item.id} draggableId={item.id} index={key}>
                                                            {(provided, snapshot) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                    className={`
                                                                        ${snapshot.isDragging? 'bg-red-800 text-white':'bg-white text-black'} select-none py-2.5 md:py-3.5 px-4 md:px-5 mb-2 md:mb-3 rounded-2xl shadow
                                                                    `}
                                                                    style={{...provided.draggableProps.style}}
                                                                >
                                                                    <p className='font-semibold text-sms'>{item.name}</p>
                                                                    <p className='italic text-xsm'>{item.role}</p>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                </div>
                            ))}
                        </DragDropContext>
                        </div>
                    </div>
                    


                    <div className='mt-13'>
                        <h1 className='text-center font-medium'>Embed Document</h1>
                        <div className='mt-4 flex justify-center items-center'>
                            <button type="button" className={`w-40 md:w-48 h-15 md:h-18 mr-3 md:mr-5 px-5 font-medium text-black bg-white shadow rounded-2xl flex justify-center items-center text-center hover:bg-red-800 hover:text-white ${!editor? 'bg-red-800 text-white':'bg-white'} transition duration-200 ease-in-out transform hover:scale-110`}
                                onClick={()=>showEditor(false)}
                            >
                                <p>Upload Document</p>
                            </button>
                            <button type="button" className={`w-40 md:w-48 h-15 md:h-18 ml-3 md:ml-5 px-5 font-medium text-black bg-white shadow rounded-2xl flex justify-center items-center text-center hover:bg-red-800 hover:text-white ${editor? 'bg-red-800 text-white':'bg-white'} transition duration-200 ease-in-out transform hover:scale-110`}
                                onClick={handleShowEditor}
                            >
                                <p>Document Editor</p>
                            </button>
                        </div>
                        {editor?
                            <>
                                {/* <input type="file" id="file_upload" accept=".dotx,.docx,.docm,.dot,.doc,.rtf,.txt,.xml,.sfdt" onChange={onFileChange}/> */}
                                <button type="button" className="border-1 border-red-800 hover:text-white hover:bg-red-600 hover:border-transparent px-4 py-2 rounded-lg font-medium mt-5 transition duration-200 ease-in-out transform hover:scale-110 flex items-center" 
                                    onClick={()=>showModalTemplate(true)}
                                >
                                    <i className="ri-download-cloud-fill text-base mr-2"></i>
                                    <label className="cursor-pointer">Import Document Template</label>
                                </button>
                                <DocumentEditorContainerComponent id="container" height='100vh' className='mt-5'
                                    ref={(scope) => { setDocumentEditor(scope) }} 
                                    enableToolbar={true}
                                    isReadOnly={false} enableSelection={true} enableEditor={true} enableSfdtExport={true} enableWordExport={true}
                                    serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/" 
                                />
                            </>
                            :
                            <div className='mt-5 bg-gray-100 h-36 rounded-2xl border-dashed border-2 border-red-600 flex items-center justify-center text-center'>
                                <Dropzone ref={dropzoneRef} onDrop={onDrop} multiple={false} noClick noKeyboard accept='.pdf,.doc,.docx'>
                                    {({ getRootProps, getInputProps, acceptedFiles }) => {
                                        return (
                                            <div>
                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                    <input {...getInputProps()} />
                                                    <p className='text-md md:text-lg'>Drag and drop file here, or click select file</p>
                                                    <button type="button" className='mt-4 mb-2 px-4 py-1.5 rounded bg-red-800 text-white transition duration-200 ease-in-out transform hover:scale-110' 
                                                        onClick={openDialog}
                                                    >
                                                        Select File
                                                    </button>
                                                </div>
                                                <aside>
                                                    <ul>
                                                        {acceptedFiles.map(file => (
                                                            <li key={file.path}>
                                                                {file.path} - {file.size} bytes
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </aside>
                                            </div>
                                        );
                                    }}
                                </Dropzone>
                            </div>
                        }
                    </div>
                    <div className='flex justify-end mt-8'>
                        <ButtonCancel type='reset' onClick={()=>navigate(-1)} />
                        <ButtonSave type='submit' />
                    </div>
                </form>
            </div>
            {loader && <Loader />}
            {modalTemplate && <ModalSelectDocument onCancel={()=>showModalTemplate(false)} onSubmit={loadFile} />}
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setCollapse}, dispatch)
}
export default connect(null, mapDispatchToProps)(DocumentNew)