import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import DragDropExample from "./component/DragDropExample"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import DocumentPage from "./pages/DocumentPage"
import Home from "./pages/Home"
import PDFViewer from "./pages/PDFViewer"

const App = () => {
	return (
		<div className='font-poppins'>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/dashboard/*' element={<Dashboard />} />
					<Route path='/auth/*' element={<Auth />} />
					<Route path='/document-example' element={<DocumentPage />} />
					<Route path='/pdf-example' element={<PDFViewer />} />
					<Route path='/dragdrop-example' element={<DragDropExample />} />
					<Route path='*' element={<Navigate replace to='/' />} />
					{/* <DocumentPage /> */}
					{/* <Home /> */}
					{/* <DragDropExample /> */}
				</Routes>
			</Router>
		</div>
	)
}

export default App