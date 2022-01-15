import UserMenu from "./UserMenu"
import { setCollapse } from "../reduxs/action/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Header = ({collapse, setCollapse}) => {
    return (
        <div className='flex h-full justify-between items-center z-40'>
            <span className='text-2xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:text-red-800 hidden md:block' onClick={()=>setCollapse(!collapse)}>{collapse?<i className="ri-menu-fold-fill" />: <i className="ri-menu-unfold-fill" />} </span>
            <div className='flex items-center'>
                <hr className="w-px h-6 bg-gray-200 mx-3" />
                <UserMenu />
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        collapse: state.collapse
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setCollapse}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)