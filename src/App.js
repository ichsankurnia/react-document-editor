import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import DragDropExample from "./component/DragDropExample"
import Dashboard from "./pages/Dashboard"
import DocumentPage from "./pages/DocumentPage"
import Home from "./pages/Home"
import Login from "./pages/Login"

const App = () => {
	return (
		<div className='font-poppins'>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/sign-in' element={<Login />} />
					<Route path='/dashboard/*' element={<Dashboard />} />
					<Route path='/document-example' element={<DocumentPage />} />
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