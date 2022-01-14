import { LazyLoadImage } from "react-lazy-load-image-component"
import docIcon from '../../assets/img/mou_icon.png'

const arrDoc = [
    {
        e_tittle: 'Document Title',
        c_desc: 'Description of the document blablab ba',
    },
    {
        e_tittle: 'Document Title',
        c_desc: 'Description of the document blablab ba',
    },
    {
        e_tittle: 'Document Title',
        c_desc: 'Description of the document blablab ba',
    },
    {
        e_tittle: 'Document Title',
        c_desc: 'Description of the document blablab ba',
    },
    {
        e_tittle: 'Document Title',
        c_desc: 'Description of the document blablab ba',
    },
]

const DocumentUser = () => {
    return (
        <div className='flex item-center flex-col p-4 md:p-6 mb-auto'>
            <h1 className='text-base font-semibold'>My Document</h1>

            <div className="flex flex-wrap justify-center md:justify-start -mx-3">
                {arrDoc.map((data, key) =>
                <div className="bg-white rounded-lg shadow-lg w-40 md:w-56 flex flex-col justify-center items-center text-center p-4 md:p-6 m-2 md:m-5" key={key}>
                    <LazyLoadImage effect='blur' src={docIcon} alt='' width='90%' />
                    <h1 className="font-bold text-sm md:text-base mt-3">{data.e_tittle}</h1>
                    <p className="font-medium mt-1 mb-4 text-xsm md:text-xs" style={{width: '90%'}}>{data.c_desc}</p>
                    <button className="text-white bg-red-800 hover:bg-red-600 rounded-lg w-full py-2 md:py-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105" style={{width: '90%'}}>Sign Now</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default DocumentUser