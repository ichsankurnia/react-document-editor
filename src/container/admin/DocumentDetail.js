import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { approveDocument, getOneDocument } from "../../api/document-api"
import Loader from "../../component/modal/Loader"
import docIcons from '../../assets/img/mou_icon.png'
import moment from "moment"
import { toast } from "react-toastify"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
// import { PdfViewerComponent, Toolbar, Magnification, Navigation, ThumbnailView, LinkAnnotation, Annotation, FormFields, FormDesigner, Print, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { enableRipple } from '@syncfusion/ej2-base';
import { setCollapse } from "../../reduxs/action/actions"
import { useForm } from "react-hook-form"
import ErrorField from "../../component/ErrorField"
import { ButtonCancel, ButtonSave } from "../../component/button/CustomButton"
import ModalMessage from "../../component/modal/ModalMessage"


enableRipple(true);

const containerInput = 'flex flex-col w-full'
const inputText = 'outline-none border-1 border-gray-200 rounded-lg py-2 px-3 sm:p-3 mt-1 focus:ring-1 focus:ring-red-800 focus:border-red-800'

export const annotationToolbarItems = [
    // 'HighlightTool','UnderlineTool','StrikethroughTool','ShapeTool','CalibrateTool',
    'ColorEditTool', 'StrokeColorEditTool', 'ThicknessEditTool', 'OpacityEditTool', 'AnnotationDeleteTool', 'HandWrittenSignatureTool', "StampAnnotationTool", 'InkAnnotationTool', 
    // 'FreeTextAnnotationTool', 'FontFamilyAnnotationTool', 'FontSizeAnnotationTool', 'FontStylesAnnotationTool', 'FontAlignAnnotationTool', 'FontColorAnnotationTool', 'CommentPanelTool'
]
export const formDesignerToolbarItems = ['DrawSignatureTool', 'DeleteTool']


const DocumentDetail = ({user, setCollapse}) => {
    const [modalMessage, showModalMessage] = useState(false)
    const [loader, showLoader] = useState(false)
    const [dataDocument, setDataDocument] = useState(null)
    const [pdfViewer, setPdfViewer] = useState(null)
    
    const navigate = useNavigate()
    const {document_id} = useParams()
    const timeout = useRef(null)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ criteriaMode: "all" });

    useEffect(()=>{
        if(window.screen.width > 640){
            setCollapse(false)
        }

        const timeoutRef = timeout.current

        return () => {
            if(timeoutRef){
                clearTimeout(timeoutRef)
            }
            setCollapse(true)
        }
    }, [setCollapse])

    useEffect(()=>{
        if(pdfViewer){
            pdfViewer.toolbar.showToolbarItem(["OpenOption"], false);
            pdfViewer.downloadFileName = dataDocument?.c_document_code || new Date().getTime()
        }
    }, [pdfViewer, dataDocument?.c_document_code])

    useEffect(()=>{
        async function fetchDetailDocument(){
            showLoader(true)
            const res = await getOneDocument(document_id)

            showLoader(false)
            console.log('Fetch Detail Document :', res)
            if(res.data){
                if(res.data.status === '00'){
                    setDataDocument(res.data.data)
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

        fetchDetailDocument()
    }, [document_id, navigate])

    const handleSave = (dataForm) => {
        showLoader(true)
        const {c_note} = dataForm

        pdfViewer.saveAsBlob().then(res => {
            let reader = new FileReader();
			reader.readAsDataURL(res);
			
			reader.onloadend = async () => {
				let base64data = reader.result;
                console.log(base64data.toString())
                const payload = {
                    "id" : document_id,
                    "c_document_code": dataDocument.c_document_code,
                    e_encode_document: base64data.toString(),
                    c_note
                }

                const res = await approveDocument(payload)
                console.log('Approve Document :', res)

                if(res.data){
                    if(res.data.status === '00'){
                        toast.success(res.data.message)
                        showModalMessage(true)
                        timeout.current = setTimeout(() => {
                            navigate(-1)
                        }, 5000);
                    }else if(res.data.status === '01'){
                        toast.info('Session expired, please login!')
                        navigate('/auth', {replace:true})
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
			};
        }).catch(err => {
            showLoader(false)
            toast.error("Error save document :", err)
        })
    }
    
    return (
        <div className='flex item-center flex-col py-5 px-3 md:p-6 mb-auto'>
            <div className='flex items-center justify-between'>
                <button className='w-9 h-9 md:w-10 md:h-10 bg-red-800 text-white hover:bg-red-600 shadow rounded-full flex justify-center items-center text-3xl transition duration-200 ease-in-out transform hover:scale-110'
                    onClick={()=>navigate(-1)}
                >
                    <i className="ri-arrow-left-s-line"></i>
                </button>
                <h2 className='text-base font-medium text-right'>Document Detail</h2>
            </div>

            <div className="flex justify-center items-center flex-col bg-white rounded-2xl shadow p-6 md:p-4 mt-5 font-medium text-center">
                <LazyLoadImage effect="blur" src={docIcons} alt="" className="w-44" />
                <p className="font-semibold text-base mt-5">{dataDocument?.c_document_code || 'Document Code'}</p>
                <p className="font-bold text-xl mt-2 w-9/12 md:w-1/2">{dataDocument?.e_tittle || 'Document Title'}</p>
                <p className="mt-2 w-9/12 md:w-1/2">{dataDocument?.c_desc || 'Description of the document'}</p>
                <p className="my-3">Created on {moment(dataDocument?.d_created_at).format('DD MMM YYYY HH:mm')||moment().format('DD MMM YYYY HH:mm')}</p>
                <div className="my-2 w-full">
                    <div className='flex justify-center items-center'>
                        <p>Contributors Progress</p>
                        <div className={`ml-2 w-8 h-8 rounded-full flex justify-center items-center ${dataDocument?.i_current_stat/dataDocument?.q_contributor === 1? 'bg-succes':'bg-danger'}`}>
                            <div className='w-5.5 h-5.5 bg-white rounded-full flex justify-center items-center text-xsm'>{(100* dataDocument?.i_current_stat/dataDocument?.q_contributor).toFixed(0)}%</div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row justify-evenly items-center mt-2'>
                        {dataDocument?.detail?.length > 0 && dataDocument.detail.map((data, key) =>
                            <div key={key} className='flex flex-col items-center'>
                                <div className={`mb-1 flex justify-center items-center w-20 h-20 rounded-full ${data.b_approve? 'bg-succes':'bg-danger'} ${parseInt(data.i_stat) === dataDocument?.i_current_stat + 1&& 'progress'}`}>
                                    <div className='bg-white w-13 h-13 rounded-full flex justify-center items-center text-base font-semibold'>{key + 1}</div>
                                </div>
                                <p className='font-semibold'>{data.e_fullname}</p>
                                <p>{data.n_group}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {user.i_group !==1?
            <div className='bg-white rounded-2xl shadow p-6 mt-5 h-full'>
                <p className='font-semibold mb-5'>Sign your document here</p>
                {dataDocument?.e_encode_document &&
                <PdfViewerComponent id="container" serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" style={{ 'height': '640px' }}
                    ref={(scope) => { setPdfViewer(scope) }}
                    documentPath={dataDocument.e_encode_document}
                    // enableDownload={false} 
                    toolbarSettings={{annotationToolbarItems : annotationToolbarItems, formDesignerToolbarItems: formDesignerToolbarItems, showTooltip: true}}
                >
                    {/* <Inject services={[Toolbar, Magnification, Navigation, ThumbnailView, LinkAnnotation, Annotation, FormFields, FormDesigner, Print]} /> */}
                    <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner]}/>
                </PdfViewerComponent>
                }

                <form onSubmit={handleSubmit(handleSave)} className='mt-8'>
                    <div className={containerInput}>
                        <label>Note</label>
                        <input type='text' className={inputText} placeholder='Note to the document' {...register("c_note", { required: "Note is required."})} />
                        <ErrorField errors={errors} name='c_note' />
                    </div>
                    <div className='flex justify-end mt-5'>
                        <ButtonCancel type='reset' onClick={()=>navigate(-1)} />
                        <ButtonSave type='submit' />
                    </div>
                </form>
            </div>
            :
            <div className='bg-white rounded-2xl shadow p-6 mt-5 h-full'>
                <embed src={dataDocument?.e_encode_document} type="application/pdf" className="w-full h-screen" title={dataDocument?.c_document_code} />
            </div>
            }

            {loader && <Loader />}
            {modalMessage && <ModalMessage message={'Document signed successfully'} onClose={()=>navigate(-1, {replace: true})} />}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setCollapse}, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (DocumentDetail)