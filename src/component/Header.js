import UserMenu from "./UserMenu"

const Header = () => {
    return (
        <div className='flex h-full float-right items-center z-40'>
            <hr className="w-px h-6 bg-gray-200 mx-3" />
            <UserMenu />
        </div>
    )
}

export default Header