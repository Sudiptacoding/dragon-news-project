import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContextProvider';


const HomeLeftNav = () => {
    const { setSelectCatagpry } = useContext(UserContext)
    const [category, setCategory] = useState([]);

    const [addData, setAddData] = useState(null)
    const [addData1, setAddData1] = useState(null)
    const [add, setAdd] = useState(true)
    const [add1, setAdd1] = useState(true)
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


    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(data => {
                setAddData(data)
            })
    }, []);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(data => {
                setAddData1(data)
            })
    }, []);


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

            <div>
                {
                    add && <div className='relative py-6'>
                        <div className="relative grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                            <div style={{ backgroundImage: "url(" + addData?.meals[0].strMealThumb + ")" }} className={` absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none`}>
                                <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
                            </div>
                            <div className="relative p-6 px-6 py-14 md:px-12">
                                <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                                    How to cook and make {addData?.meals[0].strMeal}
                                </h2>
                                <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                                    {addData?.meals[0].strCategory}
                                </h5>
                                <img
                                    alt="tania andrew"
                                    src={addData?.meals[0].strMealThumb}
                                    className="relative inline-block h-[74px] w-[74px] rounded-full border-2 border-white object-cover object-center"
                                />
                            </div>
                            <span onClick={() => setAdd(!add)} className='absolute top-0 text-2xl text-white right-4'><p className='cursor-pointer'>x</p></span>
                        </div>
                    </div>
                }
            </div>

            <div>
                {
                    add1 && <div className='relative py-6'>
                        <div className="relative grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                            <div style={{ backgroundImage: "url(" + addData1?.meals[0].strMealThumb + ")" }} className={` absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none`}>
                                <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
                            </div>
                            <div className="relative p-6 px-6 py-14 md:px-12">
                                <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                                    How to cook and make {addData1?.meals[0].strMeal}
                                </h2>
                                <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                                    {addData1?.meals[0].strCategory}
                                </h5>
                                <img
                                    alt="tania andrew"
                                    src={addData1?.meals[0].strMealThumb}
                                    className="relative inline-block h-[74px] w-[74px] rounded-full border-2 border-white object-cover object-center"
                                />
                            </div>
                            <span onClick={() => setAdd1(!add1)} className='absolute top-0 text-2xl text-white right-4'><p className='cursor-pointer'>x</p></span>
                        </div>
                    </div>
                }
            </div>


        </div >
    );
};

export default HomeLeftNav;