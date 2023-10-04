import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const Privetroute = ({ children }) => {

    const { currentUser, loading } = useContext(UserContext)
    const location = useLocation()

    if (loading) {
        return <div className='flex items-center justify-center w-full h-screen'><span className="loading loading-spinner loading-lg"></span></div>
    }

    if (currentUser) {
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default Privetroute;