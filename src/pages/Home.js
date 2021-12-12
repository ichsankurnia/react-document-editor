import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
import logoHIS from '../assets/img/LOGO_HIS1.png'
import { FaBattleNet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const data1 = [
    {number:1800, text: 'Lorem Ipsum is simply dummy text'},
    {number:1400, text: 'Lorem Ipsum is simply'},
    {number:1300, text: 'Lorem Ipsum'},
    {number:500, text: 'Lorem Ipsum is'}
]

const data2 = [
    {title: 'Lorem Ipsum', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"},
    {title: 'Lorem Ipsum is simply', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"},
    {title: 'Lorem Ipsum', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy texts"},
    {title: 'Lorem Ipsum is simply dummy', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"},
    {title: 'Lorem Ipsum', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"},
]

const Home = () => {
    const navigate = useNavigate()

    return (
        <div>
            {/* HEADER */}
            <div className='bg-darkblue w-full fixed top-0 z-10'>
                <div className='w-11/12 mx-auto py-3 text-white flex justify-between items-center'>
                    <div onClick={()=>window.location.reload()} className=' hover:text-lightcayn cursor-pointer'>App Logo</div>
                    <div className='flex items-center'>
                        <p className=' hover:text-lightcayn border-b-2 border-transparent hover:border-lightcayn px-2 cursor-pointer'>Home</p>
                        <p className='ml-2  hover:text-lightcayn border-b-2 border-transparent hover:border-lightcayn px-2 cursor-pointer'>Document</p>
                        <p className='ml-2  hover:text-lightcayn border-b-2 border-transparent hover:border-lightcayn px-2 cursor-pointer'>FAQ</p>
                        <button onClick={()=>navigate('/auth', {replace: true})} className='ml-5 px-5 py-1.5 bg-lightcayn rounded-sm hover:bg-transparent hover:text-lightcayn border-1 border-transparent hover:border-lightcayn'>Sign In</button>
                    </div>
                </div>
            </div>
            
            {/* HOME */}
            <div className='min-h-screen bg-darkblue flex items-center justify-center'>
                <div className='max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between text-white'>
                    <div className='text-center md:text-left mt-5 md:mt-0'>
                        <p>Home {'>'} Developers</p>
                        <h1 className='text-4xl md:text-6xl mt-5 mb-5 font-semibold md:w-10/12'>Secure the ledger. Earn SOL.</h1>
                        <div className='mb-5'>
                            <button className='bg-lightcayn px-10 md:px-6 py-3 hover:bg-transparent hover:text-lightcayn border-1 border-transparent hover:border-lightcayn md:mr-5'>Start Building</button>
                            <button className='border-1 border-lightcayn text-lightcayn px-5 py-3 hover:bg-lightcayn hover:text-white mt-3' >Read Documentation</button>
                        </div>
                    </div>
                    <div className='w-full md:w-6/12 z-0'>
                        <LazyLoadImage effect='blur' src={logoHIS} className='w-full z-0' />
                    </div>
                </div>
            </div>

            {/* DOCUMENT */}
            <div className='min-h-screen bg-soft flex items-center justify-center'>
                <div className='max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center my-5'>
                    <div className='text-center md:text-left w-full md:w-6/12 mt-7 md:mt-0'>
                        <h1 className='font-bold text-2xl md:text-4xl'>Decentralize the network by providing computing resource.</h1>
                        <p className='my-6 text-sm md:text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <button className='bg-lightcayn text-white px-6 py-3 rounded shadow hover:text-lightcayn hover:bg-transparent border-transparent border-1 hover:border-lightcayn'>See More</button>
                    </div>
                    <div className='flex flex-wrap justify-center md:justify-end w-full md:w-1/2'>
                        {data1.map((data, key) => (
                            <button className={`bg-white shadow-md rounded w-40 md:w-56 h-48 md:h-56 flex flex-col justify-center hover:shadow-2xl hover:bg-gray-100 p-5 m-3 md:ml-6 ${key%2===0? 'mt-0': 'mt-4 md:mt-6'}`} key={key}>
                                <h1 className='font-bold text-4xl mb-5'>{data.number}</h1>
                                <p className='font-medium text-left text-sm md:text-base'>{data.text}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className='min-h-screen bg-soft flex items-center justify-center'>
                <div className='max-w-7xl mx-auto flex flex-col item-center justify-center text-center my-5'>
                    <h1 className='text-2xl md:text-4xl font-bold'>Frequently Asked Questions (FAQ)</h1>
                    <p className='my-5 md:w-2/3 mx-auto text-sm md:text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div className='flex justify-center items-center flex-wrap mt-3'>
                        {data2.map((data, key) => (
                            <button className='w-11/12 md:w-3.5/12 m-5 h-56 p-5 bg-gray-100 rounded shadow-md text-left hover:bg-white hover:shadow-2xl' key={key}>
                                <FaBattleNet className='text-2xl' />
                                <h1 className='font-semibold my-4'>{data.title}</h1>
                                <p className='text-sm'>{data.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home