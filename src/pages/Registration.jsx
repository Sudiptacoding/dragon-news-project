import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContextProvider';
import auth from '../firebase/firebase.config';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [see, setSee] = useState(true)

    const { registrationUser, setFirstShow } = useContext(UserContext)

    const navigate = useNavigate()
    const handelRegistration = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked;

        if (!checkbox) {
            toast.error("Please add Terms and Conditions")
            return
        }

        if (password.length < 6) {
            return toast.error("PLease provide 6 character password")
        }

        registrationUser(email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photo || "https://www.w3schools.com/howto/img_avatar.png"
                }).then((id) => {
                    toast.success('User created successfully !')
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            swal("Varify email!", `Check your email and confirm now`, "success");
                            navigate('/')
                        });
                    setFirstShow(photo)
                }).catch((error) => {
                    console.log(error)
                });
            }).catch(() => {
                toast.error("User alrady created. please add new email")
            })

    }

    return (
        <div>
            <div><Header></Header></div>
            <section className="">
                <div className="flex flex-col items-center justify-center py-8 mx-auto lg:px-6 lg:py-16">
                    <a href="#" className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="h-8 mr-2 " src="https://i.postimg.cc/pV37wbBK/logo.png" alt="logo" />
                        <span className='mt-2 font-semibold text-md'>The Dragon News</span>
                    </a>
                    <div className="w-full bg-white rounded-lg shadow-none lg:shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-2 space-y-4 lg:p-6 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create your Free Account
                            </h1>
                            <form onSubmit={handelRegistration} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required={true} />
                                </div>

                                <div>
                                    <label for="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Photo URl</label>
                                    <input type="text" name="photo" id="photo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Photo URL" required={true} />
                                </div>

                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@gmail.com" required={true} />
                                </div>

                                <div className='relative'>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type={see ? 'password' : 'text'} name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    <span className='absolute cursor-pointer bottom-3 right-3' onClick={() => setSee(!see)}>{!see ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>} </span>
                                </div>
                                <div className="inline-flex items-center " style={{ marginTop: '0px' }}>
                                    <label
                                        className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                                        htmlFor="checkbox"
                                        data-ripple-dark="true"
                                    >
                                        <input
                                            type="checkbox"
                                            name='checkbox'
                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-pink-500 hover:before:opacity-10"
                                            id="checkbox"
                                        />
                                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                stroke="currentColor"
                                                stroke-width="1"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </span>
                                    </label>
                                    <label
                                        className="mt-px font-light text-gray-700 cursor-pointer select-none"
                                        htmlFor="checkbox"
                                    >
                                        <p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                            I agree the
                                            <a
                                                className="font-medium transition-colors hover:text-pink-500"
                                                href="#"
                                            >
                                                &nbsp;Terms and Conditions
                                            </a>
                                        </p>
                                    </label>
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

export default Registration;