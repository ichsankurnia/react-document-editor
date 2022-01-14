import { useState, useCallback, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Dropzone from 'react-dropzone'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { ButtonCancel, ButtonSave } from "../../component/button/CustomButton"

import { setCollapse } from "../../reduxs/action/actions";
import { bindActionCreators } from "redux";

import { DocumentEditorContainerComponent , WordExport, SfdtExport, Selection, Editor, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { onDragEnd } from "../../component/DragDropExample";
import Loader from "../../component/modal/Loader";
import axios from "axios";

//Inject require module.
DocumentEditorContainerComponent.Inject(SfdtExport, Selection, Editor, WordExport, Toolbar);

const containerInput = 'flex flex-col w-full sm:w-1/2'
const inputText = 'outline-none border-1 border-gray-200 rounded-lg py-2 px-3 sm:p-3 mt-1 focus:ring-1 focus:ring-red-800 focus:border-red-800'

const data_user = [
    { id: uuid(), name: "User 1", role: 'Admin' },
    { id: uuid(), name: "User 2", role: 'Director' },
    { id: uuid(), name: "User 3", role: 'General Manager' },
    { id: uuid(), name: "User 4", role: 'Manager' },
    { id: uuid(), name: "User 5", role: 'Supervisor' }
];

const columnsFromBackend = [
    {
        id: '1',
        name: "Users",
        items: data_user
    },
    {
        id: '2',
        name: "Contributors",
        items: []
    }
];

const NewDocument = ({setCollapse}) => {
    const [loader, showLoader] = useState(false)
    const [editor, showEditor] = useState(false)
    const [documenteditor, setDocumentEditor] = useState(null)
    const [documentUpload, setDocumentUpload] = useState('')
    const [columns, setColumns] = useState(columnsFromBackend);

    const navigate = useNavigate()
    const dropzoneRef = useRef();

    useEffect(() => {
        return () => {
            setCollapse(true)
        }
    }, [setCollapse])

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
        setCollapse(false)
        setDocumentUpload('')
    }

    const handleUnshowEditor = () => {
        showEditor(false)
        setCollapse(true)
    }

    const handleSave = () => {
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
                        }
                    };
                    
                    // reader.readAsText(res)				// read as text
                    reader.readAsDataURL(res);			// read as base64
                }).catch(err => console.log('Err :', err))
            }else{
                if(documentUpload !== ''){
                    console.log(documentUpload)
                }else{
                    alert('No document uploaded')
                }
            }
        }else{
            alert('No contributor added on this document')
        }
    }

    const onFileChange = (e) => {
        if (e.target.files[0]) {
            showLoader(true)
            //Get selected file.
            let file = e.target.files[0];
            if (file.name.substr(file.name.lastIndexOf('.')) !== '.sfdt') {
                loadFile(file)
            }else{
                documenteditor.documentEditor.open(e.target.files[0])
            }
        }
    }

    const loadFile = (file) => {
        let ajax = new XMLHttpRequest();
        ajax.open('POST', 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import', true);
        ajax.onreadystatechange = () => {
            if (ajax.readyState === 4) {
                if (ajax.status === 200 || ajax.status === 304) {
                    // open SFDT text in document editor
                    documenteditor.documentEditor.open(ajax.responseText);
                }
            }
            showLoader(false)
        };
        let formData = new FormData();
        formData.append('files', file);
        ajax.send(formData);
    }

    const loadFileFromServer = async () => {
        const res = await axios.get('http://100.104.216.52:9000/static/doc-files/TEMPLATE MOA TEL-U BAHASA INDONESIA.docx')
        console.log(res)
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
                <h1 className='font-semibold'>Form Create New Document</h1>
                <div className='flex flex-col sm:flex-row mt-6'>
                    <div className={containerInput}>
                        <label>Project Code</label>
                        <input type='text' className={inputText} placeholder='A123' />
                    </div>
                    <span className='mx-5 mb-3 sm:mb-0'></span>
                    <div className={containerInput}>
                        <label>Project Name</label>
                        <input type='text' className={inputText} placeholder='Document Name' />
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
                
                <input type="file" id="file_upload" accept=".dotx,.docx,.docm,.dot,.doc,.rtf,.txt,.xml,.sfdt" onChange={onFileChange}/>
                <button className="border-1 border-red-800 px-5 py-2 rounded-lg" onClick={loadFileFromServer}>Load File From Serve</button>

                <div className='mt-13'>
                    <h1 className='text-center font-medium'>Embed Document</h1>
                    <div className='mt-4 flex justify-center items-center'>
                        <button className={`w-40 md:w-48 h-15 md:h-18 mr-3 md:mr-5 px-5 font-medium bg-white shadow rounded-2xl flex justify-center items-center text-center hover:bg-red-800 hover:text-white ${!editor? 'bg-red-800 text-white':'bg-white text-black'} transition duration-200 ease-in-out transform hover:scale-110`}
                            onClick={handleUnshowEditor}
                        >
                            <p>Upload Document</p>
                        </button>
                        <button className={`w-40 md:w-48 h-15 md:h-18 ml-3 md:ml-5 px-5 font-medium bg-white shadow rounded-2xl flex justify-center items-center text-center hover:bg-red-800 hover:text-white ${editor? 'bg-red-800 text-white':'bg-white text-black'} transition duration-200 ease-in-out transform hover:scale-110`}
                            onClick={handleShowEditor}
                        >
                            <p>Document Editor</p>
                        </button>
                    </div>
                    {editor?
                        <DocumentEditorContainerComponent id="container" height='100vh' className='mt-5'
                            ref={(scope) => { setDocumentEditor(scope) }} 
                            enableToolbar={true}
                            isReadOnly={false} enableSelection={true} enableEditor={true} enableSfdtExport={true} enableWordExport={true}
                            serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/" 
                        />
                        :
                        <div className='mt-5 bg-gray-100 h-36 rounded-2xl border-dashed border-2 border-red-600 flex items-center justify-center text-center'>
                            <Dropzone ref={dropzoneRef} onDrop={onDrop} multiple={false} noClick noKeyboard accept='.pdf,.doc,.docx'>
                                {({ getRootProps, getInputProps, acceptedFiles }) => {
                                    return (
                                        <div>
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <p className='text-md md:text-lg'>Drag and drop file here, or click select file</p>
                                                <button className='mt-4 mb-2 px-4 py-1.5 rounded bg-red-800 text-white transition duration-200 ease-in-out transform hover:scale-110' 
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
                    <ButtonSave type='submit' onClick={handleSave} />
                </div>
            </div>
            {loader && <Loader />}
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setCollapse}, dispatch)
}
export default connect(null, mapDispatchToProps)(NewDocument)