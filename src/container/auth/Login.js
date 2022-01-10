import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import ErrorField from "../../component/ErrorField";

const Login = () => {
    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({ criteriaMode: "all" });

    const onValidForm = (payload) => {
        navigate('/dashboard', {replace: true})
    }

    return (
        <div className="min-h-screen bg-soft py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-red-800 to-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <form onSubmit={handleSubmit(onValidForm)} className="relative bg-white shadow-lg sm:rounded-3xl px-4 py-10 md:p-20">
                    <div className="md:max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Welcome Back! Sign in to continue</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 leading-6 space-y-4 text-gray-700 md:text-sms sm:leading-7">
                                <div className="relative">
                                    <input autoComplete="off" id="phone_number" name="phone_number" type="tel" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Phone Number" 
                                    {...register("phone_number", {
                                            required: "Phone number is required.",
                                            pattern: {
                                                value: /^\d+$/,
                                                message: "Phone number is number only."
                                            },
                                            minLength: {
                                                value: 10,
                                                message: "Phone number must exceed 9 characters."
                                            },
                                            maxLength: {
                                                value: 14,
                                                message: "Phone number invalid."
                                            }
                                        })}
                                    />
                                    <ErrorField errors={errors} name="phone_number" />
                                    <label htmlFor="phone_number" className="absolute left-0 -top-3.5 text-gray-600 text-sms peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sms">Phone Number</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" 
                                        {...register("password", {
                                            required: "Password is required.",
                                            minLength: {
                                                value: 5,
                                                message: "Password must exceed 4 characters."
                                            }
                                        })}
                                    />
                                    <ErrorField errors={errors} name="password" />
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sms peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sms">Password</label>
                                </div>
                                <div className="relative">
                                    <button className="text-sm bg-gradient-to-r from-red-800 to-black hover:from-transparent hover:to-transparent text-white rounded-md px-5 py-2 mt-1 border-1 border-transparent hover:border-red-800 hover:text-red-800">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='flex flex-col items-center text-sms mt-7'>
                <div className='mb-3'>Don't have an account ? {' '}
                    <span className='text-red-800 hover:text-red-600 font-medium'>
                        <Link to='/auth/sign-up'>
                            Sign Up
                        </Link>
                    </span>
                </div>
                <p>© {new Date().getFullYear()} CompanyName v1.0</p>
            </div>
        </div>
    )
}

export default Login