import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';

const LogoHeader = () => {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(moment().format('MMMM DD, YYYY h:mm:ss a'))
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(moment().format('MMMM DD, YYYY h:mm:ss a'))
            setCount((prevCount) => prevCount + 1);
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);






    return (
        <div className='text-center pt-[50px] pb-[30px]'>
            <img className='mx-auto' src="https://i.postimg.cc/pV37wbBK/logo.png" alt="" />
            <h2 className='text-[#706F6F] font-normal mt-5 mb-[10px]'>Journalism Without Fear or Favour</h2>
            <p className='text-[#706F6F] font-medium'><span className='text-[#403F3F]'>{moment().format('dddd,')}</span> {time}</p>
        </div>
    );
};

export default LogoHeader;