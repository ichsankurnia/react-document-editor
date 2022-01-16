import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { enableRipple } from '@syncfusion/ej2-base';
import { pdfBase64 } from '../file';

enableRipple(true);

export class SampleBase extends React.PureComponent {
    rendereComplete() {
        /**custom render complete function */
    }
    componentDidMount() {
        setTimeout(() => {
            this.rendereComplete();
        });
    }
}



class PDFViewer extends SampleBase {

    handleSave = () => {
        // this.viewer.documentPath = 'base64'
        this.viewer.downloadFileName = 'test'
        // this.viewer.download()
        console.log(this.viewer.download())
        console.log(this.viewer.saveAsBlob())

        // this.viewer.saveAsBlob().then(res => {
        //     console.log(res)
        //     let reader = new FileReader();
		// 	reader.readAsDataURL(res);
			
		// 	reader.onloadend = () => {
		// 		let base64data = reader.result;
		// 		console.log(base64data.toString())
		// 	};
        // }).catch(err => {
        //     console.log("Error save document :", err)
        // })
    }

    componentDidMount(){
        this.viewer.documentPath = 'data:application/pdf;base64,' + pdfBase64.data
        this.viewer.toolbar.showToolbarItem(["OpenOption"], false);
        console.log(this.viewer)
        // this.viewer.toolbarSettings = {annotationToolbarItems : ["StampAnnotationTool", 'HandWrittenSignatureTool', 'InkAnnotationTool']}
        // this.viewer.enableDownload = false
        // this.viewer.load(pdfBase64.data)
    }

    render() {
        return (
        <div className='flex flex-col'>
            <button onClick={this.handleSave} className='border-1 px-4 py-2 rounded hover:bg-lightcayn hover:text-white'>Save</button>
            <div className='w-full'>
                {/* <PdfViewerComponent id="container" documentPath={pdfBase64.data} serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" style={{ 'height': '640px' }} */}
                {/* <PdfViewerComponent id="container" documentPath="PDF_Succinctly.pdf" serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" style={{ 'height': '640px', width: '100%' }} */}
                <PdfViewerComponent id="container" serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" style={{ 'height': '1000px' }}
                    ref={(scope) => { this.viewer = scope; }} 
                    // enableDownload={false} 
                    toolbarSettings={{annotationToolbarItems : [
                        'HighlightTool',
                        'UnderlineTool',
                        'StrikethroughTool',
                        'ShapeTool',
                        'CalibrateTool',
                        'ColorEditTool',
                        'StrokeColorEditTool',
                        'ThicknessEditTool',
                        'OpacityEditTool',
                        'AnnotationDeleteTool',
                        'StampAnnotationTool',
                        'HandWrittenSignatureTool',
                        'InkAnnotationTool',
                        'FreeTextAnnotationTool',
                        'FontFamilyAnnotationTool',
                        'FontSizeAnnotationTool',
                        'FontStylesAnnotationTool',
                        'FontAlignAnnotationTool',
                        'FontColorAnnotationTool',
                        'CommentPanelTool'
                    ]}}
                    // toolbar={() =>showToolbarItem(["OpenOption"], false) }
                >
                    <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner]} />
                    {/* <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, Annotation, FormFields, FormDesigner]} /> */}
                    {/* <Inject services={[Toolbar, Annotation]} /> */}
                </PdfViewerComponent>
            </div>

        </div>);
    }
}

export default PDFViewer