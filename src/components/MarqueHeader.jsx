import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

const MarqueHeader = () => {
    const [marque, setMarque] = useState([])
    useEffect(() => {
        fetch('/news.json')
            .then(res => res.json())
            .then(data => {
                setMarque(data)
            })
    }, [])

    return (
        <div className='flex'>
            <button className='text-xl font-medium text-white bg-[#D72050] px-2 lg:py-[9px] lg:px-6 lg:mr-5'>Latest</button>
            <Marquee pauseOnHover={true} className='mr-3 lg:mr-24'>
                {
                    marque.map((news, i) => {
                        return <Link key={i} to={`/details/${news._id}`}><div className='px-3 mr-8 transition duration-150 ease-in-out cursor-pointer hover:bg-black hover:px-4'>
                            <p className='text-[#403F3F] font-semibold text-lg hover:text-white'>{news.title}</p>
                        </div>
                        </Link>
                    })
                }
            </Marquee>
        </div>
    );
};

export default MarqueHeader;