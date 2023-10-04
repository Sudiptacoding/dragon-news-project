import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='px-3 lg:px-20 '>
            <Outlet></Outlet>
            <Toaster/>
        </div>
    );
};

export default Root;