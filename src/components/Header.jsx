import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import toast from 'react-hot-toast';
import { sendEmailVerification } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import swal from 'sweetalert';
import { RxCross2 } from "react-icons/rx";
import { removeCard } from '../../public/Localstorage/SelectSideBar';

const Header = () => {
    const { currentUser, handelLogout, firstShow, bookmark, setBookMark } = useContext(UserContext)
    const handelLogoutUser = () => {
        handelLogout()
            .then(() => {
                toast.success('Logout Successfully!')
            }).catch(() => {
                toast.error("Logout faild!")
            })
    }

    const handelSendVarify = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                swal("Good job!", `Check your email and confirm now`, "success");
            }).catch(() => {
                toast.error('Your requst is faild please try again!')
            })
    }

    const handelCardRemove = (id) => {
        const filterValue = bookmark.filter(carditem => carditem._id !== id)
        setBookMark(filterValue)
        removeCard(id)
    }

    const navLink = <>
        <NavLink to='/'
            className={({ isActive, isPending }) =>
                isActive
                    ? "text-[#706F6F] lg:font-bold text-lg underline underline-offset-2 px-3"
                    : isPending
                        ? "pending"
                        : "text-[#706F6F] text-lg font-normal px-3"
            }
        >Home</NavLink>


        <NavLink to='/about'
            className={({ isActive, isPending }) =>
                isActive
                    ? "text-[#706F6F] font-bold lg:text-lg underline px-3 underline-offset-2"
                    : isPending
                        ? "pending"
                        : "px-3 text-[#706F6F] text-lg font-normal"
            }
        >About </NavLink>


        <NavLink to='/career'
            className={({ isActive, isPending }) =>
                isActive
                    ? "text-[#706F6F] font-bold lg:text-lg underline underline-offset-2 px-3"
                    : isPending
                        ? "pending"
                        : "text-[#706F6F] text-lg font-normal px-3"
            }
        >Career</NavLink>
    </>
    return (
        <div className='mt-5'>
            <div className="px-0 navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLink}
                        </ul>
                    </div>
                </div>
                <div className="hidden navbar-center lg:flex">
                    <ul className="px-1 menu menu-horizontal">
                        {navLink}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div>
                        <div className="navbar bg-base-100">
                            <div className="flex-none">
                                <div className=" dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                                        <div className="indicator">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="bookmark"><g fill="none" fill-rule="evenodd" stroke="#200E32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="translate(3.5 2)"><path d="M8.16475977,16.631579 L2.23340962,19.881007 C1.75983818,20.1271252 1.17640846,19.9529066 0.915331812,19.4874143 L0.915331812,19.4874143 C0.839799009,19.3432192 0.79904873,19.1833528 0.796338677,19.0205951 L0.796338677,4.62242565 C0.796338677,1.87643022 2.67276889,0.778032041 5.37299774,0.778032041 L11.7162472,0.778032041 C14.3340962,0.778032041 16.2929063,1.80320367 16.2929063,4.43935929 L16.2929063,19.0205951 C16.2929063,19.2803494 16.1897192,19.5294649 16.0060452,19.713139 C15.8223711,19.8968131 15.5732556,20.0000001 15.3135012,20.0000001 C15.1478164,19.9973723 14.9849578,19.9566576 14.8375287,19.881007 L8.86956526,16.631579 C8.64965001,16.5127732 8.38467502,16.5127732 8.16475977,16.631579 Z"></path><line x1="4.87" x2="12.165" y1="7.323" y2="7.323"></line></g></svg>
                                            <span className="badge badge-sm indicator-item">{bookmark.length}</span>
                                        </div>
                                    </label>
                                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content lg:w-80 w-72  bg-base-100 shadow absolute -left-28 right-0 ">
                                        {
                                            bookmark.length > 0 && <div className="card-body">
                                                {
                                                    bookmark.map((item, i) => {
                                                        return <div key={i} className='flex items-center justify-between w-full px-2 py-1 my-2 rounded-lg cursor-pointer hover:bg-yellow-50'>
                                                            <Link to={`/details/${item._id}`}>
                                                                <div className='flex items-center justify-center gap-3'>
                                                                    <div><img className='w-10 h-10 rounded-full' src={item.image_url} alt="" /></div>
                                                                    <div>{`${item.title.slice(0, 25)} ....`}</div>
                                                                </div>
                                                            </Link>
                                                            <div><RxCross2 className='w-5 h-5 rounded-full hover:bg-gray-400' onClick={() => handelCardRemove(item._id)}></RxCross2></div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        currentUser && <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={currentUser.photoURL || firstShow} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu  menu-sm dropdown-content bg-white rounded-box absolute -left-64 right-0 lg:w-[400px] w-80 ">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center lg:space-x-3">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src={currentUser.photoURL || firstShow} alt="Neil image" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                                {currentUser.displayName}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {currentUser?.email ? currentUser.email : 'Not add email'}
                                            </p>
                                        </div>
                                        {
                                            currentUser?.emailVerified ? <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                                <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                                valid
                                            </span> : <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                                <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                                                invalid
                                            </span>
                                        }
                                    </div>
                                </li>
                                {
                                    currentUser?.emailVerified || !currentUser?.email ? '' : <li onClick={handelSendVarify} className='flex items-center'><a className='text-center'>Resend mail</a></li>
                                }
                            </ul>
                        </div>
                    }
                    {currentUser ? <Link onClick={handelLogoutUser} className="bg-[#403F3F] px-3 lg:px-11 py-3 font-semibold text-white rounded-md lg:text-xl">Logout</Link> : <Link to='/login' className="bg-[#403F3F] rounded-md lg:px-11 px-3 py-3 font-semibold text-white lg:text-xl">Login</Link>}
                </div>
            </div>
            {
                !currentUser && <div className='flex items-center justify-end w-full'>
                    <p class="text-sm">
                        <span className='text-gray-500'>Don’t have an account yet?</span> <Link to='/registration' className="font-medium text-primary hover:underline dark:text-primary-500">Sign up</Link>
                    </p>
                </div>
            }
        </div>
    );
};

export default Header;