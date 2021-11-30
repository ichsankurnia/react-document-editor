import UserMenu from "./UserMenu"
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { setCollapse } from "../reduxs/action/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Header = ({collapse, setCollapse}) => {
    return (
        <div className='flex h-full justify-between items-center z-40'>
            <span className='text-xl cursor-pointer hidden md:block' onClick={()=>setCollapse(!collapse)}>{collapse?<AiOutlineMenuFold />: <AiOutlineMenuUnfold />} </span>
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