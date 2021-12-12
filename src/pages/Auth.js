import { Route, Navigate, Routes } from "react-router-dom"
import NotFoundContainer from "../container/NotFoundContainer";
import { AuthRoutes } from "../route";

const Auth = () => {
    const getRoutes = () => {
		return AuthRoutes.map((data, key) => {
            return (
                <Route path={data.path} element={data.component} key={key} />
            );
		});
	}

    return (
        <div className='min-h-screen bg-soft flex justify-center items-center'>
            <Routes>
                {getRoutes()}
                <Route path='*' element={<NotFoundContainer />} /> 
                <Route path='/' element={<Navigate replace to='/auth/sign-in' />} />
            </Routes>
        </div>
    )
}

export default Auth