import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { UserContext } from '../context/UserContextProvider';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { sendPasswordResetEmail } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [see, setSee] = useState(true)
    const { signInUser } = useContext(UserContext)

    const location = useLocation()
    const navigate = useNavigate()

    const handelLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked;
        if (!checkbox) {
            toast.error("Please add Check mark!")
            return
        }
        signInUser(email, password)
            .then(() => {
                toast.success('Login successfully !')
                navigate(location?.state ? location.state : '/')
            }).catch(() => {
                toast.error("Login faild")
            })
    }

    const handelForgetPassword = () => {
        const email = document.getElementById('email').value;
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    swal("Good job!", "Check your email", "success");
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage)
                });
        } else {
            toast.error("Please provide your email")
        }
    }

    return (
        <div>
            <div><Header></Header></div>

            <section className="">
                <div className="flex flex-col items-center justify-center py-20 mx-auto lg:px-6 lg:py-20">
                    <a href="#" className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="h-8 mr-2 " src="https://i.postimg.cc/pV37wbBK/logo.png" alt="logo" />
                        <span className='mt-2 font-semibold text-md'>The Dragon News</span>
                    </a>
                    <div className="w-full bg-white rounded-lg shadow-none lg:shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-2 space-y-4 lg:p-6 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handelLogin} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
                                </div>
                                <div className='relative'>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type={see ? 'password' : 'text'} name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    <span className='absolute cursor-pointer bottom-3 right-3' onClick={() => setSee(!see)}>{!see ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>} </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" name='checkbox' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a onClick={handelForgetPassword} href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;