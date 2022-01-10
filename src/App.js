import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
// import DragDropExample from "./component/DragDropExample"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
// import DocumentPage from "./pages/DocumentPage"
// import Home from "./pages/Home"
// import PDFViewer from "./pages/PDFViewer"


const App = () => {
	return (
		<div className='font-poppins'>
			<Router basename="mou">
				<Routes>
					{/* <Route path='/' element={<Home />} /> */}
					<Route path='/dashboard/*' element={<Dashboard />} />
					<Route path='/auth/*' element={<Auth />} />
					{/* <Route path='/document-example' element={<DocumentPage />} /> */}
					{/* <Route path='/pdf-example' element={<PDFViewer />} /> */}
					{/* <Route path='/dragdrop-example' element={<DragDropExample />} /> */}
					<Route path='*' element={<Navigate replace to='/dashboard' />} />
					{/* <Route path='*' element={<Navigate replace to='/' />} /> */}
				</Routes>
			</Router>
			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover />
		</div>
	)
}

export default App