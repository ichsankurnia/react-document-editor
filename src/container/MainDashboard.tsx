import { FC } from "react"
import { connect } from "react-redux"

type Props = {
    user?: any
}

const MainDashboard: FC<Props> = ({user}) => {
    return (
        <div className='flex item-center flex-col p-5 md:p-6 mb-auto'>
            <h1 className='text-base font-semibold'>Dashboard</h1>

            <div className="border-2 border-red-800 rounded-lg mt-5">
                <div className="bg-red-800 p-5 text-white rounded-tl-md rounded-tr-md">
                    <p>Welcome Back! <span className="font-semibold">{user?.e_fullname}</span></p>
                </div>
                <div className="bg-white px-5 py-6 rounded-bl-lg rounded-br-lg">
                    <p>You are logged in!</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null) (MainDashboard)