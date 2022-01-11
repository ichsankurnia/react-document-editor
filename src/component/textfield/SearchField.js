const SearchField = ({placeholder, onChange}) => {
    return (
        <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5">
                <i className="ri-search-2-line text-gray-400 text-xl" />
            </span>
            <input className="placeholder-gray-400 block bg-white w-full border border-gray-300 rounded-2xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-red-800 focus:ring-red-800 focus:ring-1" 
                onChange={onChange} placeholder={placeholder || "Search for anything..."} type="text" name="search" 
            />
        </label>
    )
}

export default SearchField