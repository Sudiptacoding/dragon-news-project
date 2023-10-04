import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LogoHeader from './LogoHeader';
import { AiOutlineLeft } from 'react-icons/ai';
import HomeRightNav from './HomeRightNav';

const MoreDetailsCard = () => {
    const [details, setDetails] = useState({})
    const { id } = useParams()
    useEffect(() => {
        fetch('/news.json')
            .then(res => res.json())
            .then(data => {
                const findData = data.find(card => card._id === id)
                setDetails(findData)
            })
    }, [])
    return (
        <div>
            <LogoHeader></LogoHeader>
            <div className='grid grid-cols-1 p-5 lg:border lg:grid-cols-3 lg:p-5'>
                <div className='lg:col-span-2 lg:p-[30px]'>
                    <div><img className='w-full' src={details.image_url} alt="" /></div>
                    <div><h2 className='text-[#403F3F] text-[25px] font-bold pt-5 lg:pr-36'>{details.title}</h2></div>
                    <div><p className='text-[#706F6F] text-md font-normal pt-2 pb-8'>{details.details}</p></div>
                    <div><Link to='/'><button className='bg-[#D72050] text-white font-medium text-xl lg:py-[9px] lg:px-6 p-3 flex items-center gap-1'> <AiOutlineLeft></AiOutlineLeft> <p>All news in this category</p> </button></Link></div>
                </div>
                <div className='mt-5 lg:mt-0'>
                    <HomeRightNav></HomeRightNav>
                </div>
            </div>
        </div>
    );
};

export default MoreDetailsCard;