import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContextProvider';


const HomeLeftNav = () => {
    const { setSelectCatagpry } = useContext(UserContext)
    const [category, setCategory] = useState([]);
    useEffect(() => {
        fetch('/categories.json')
            .then(res => res.json())
            .then(data => {
                setCategory(data)
            })
    }, []);
    const handelCateGory = (item) => {
        setSelectCatagpry(item.id)
        localStorage.setItem('activePage', item.id)
    }
    useEffect(() => {
        if (localStorage.getItem('activePage')) {
            setSelectCatagpry(localStorage.getItem('activePage'))
        } else {
            localStorage.setItem('activePage', 0)
            setSelectCatagpry(0)
        }
    }, [])


    return (
        <div className=''>
            <div><h2 className='text-[#403F3F] text-xl font-semibold'>All Caterogy</h2></div>
            <div className='bg-[#E7E7E7] py-[17px] text-center mt-5'><h2 className='text-[#403F3F] text-xl font-semibold'>National News</h2></div>
            <div >
                {
                    category.map((item, i) => {
                        const bgColor = localStorage.getItem('activePage') === item.id
                        return <div onClick={() => handelCateGory(item)} key={i} className={`text-center py-[17px] my-2 hover:bg-slate-300 rounded-md cursor-pointer ${bgColor ? 'bg-slate-300' : ''}`}  >
                            <p className='text-[#9F9F9F] text-xl font-medium'>{item.name}</p>
                        </div>
                    })
                }
            </div>


        </div >
    );
};

export default HomeLeftNav;