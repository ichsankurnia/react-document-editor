import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorField from "../component/ErrorField";

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
                    className="absolute inset-0 bg-gradient-to-r from-lightcayn to-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <form onSubmit={handleSubmit(onValidForm)} className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Welcome Back! Sign in to continue</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" 
                                        {...register("email", {
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address."
                                            }
                                        })}
                                    />
                                    <ErrorField errors={errors} name="email" />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
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
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                <div className="relative">
                                    <button className="bg-gradient-to-r from-gray-700 to-black hover:from-transparent hover:to-transparent text-white rounded-md px-3 py-1 mt-1 border-1 border-transparent hover:border-black hover:text-black">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login