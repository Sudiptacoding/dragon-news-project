import React from 'react';
import { BsBookmark, BsFillBookmarkFill, BsFillShareFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { getData } from '../../public/Localstorage/SelectSideBar';
import toast from 'react-hot-toast';

const HomeCenterBody = ({ news, handelAddBookMark }) => {
    const { author, image_url, _id, title, details, rating, total_view } = news
    return (
        <div className='p-5 border rounded-md mb-7'>
            <div className='flex justify-between bg-[#F3F3F3] border border-[#F3F3F3] px-5 py-[13px] rounded-t-md'>
                <div className='flex items-center gap-4'>
                    <img className='w-10 rounded-full' src={author.img} alt="" />
                    <div className='text-left'>
                        <p className='text-[#403F3F] font-semibold text-md'>{author.name}</p>
                        <p className='text-[#706F6F] text-sm font-normal'>{author.published_date.split(' ')[0]}</p>
                    </div>
                </div>
                <div className='flex items-center gap-[10px]'>
                    <div onClick={() => handelAddBookMark(news)} className='cursor-pointer'>{getData().find(id => id === _id) ? <BsFillBookmarkFill></BsFillBookmarkFill> : <BsBookmark className='text-[#706F6F]'></BsBookmark>}</div>
                    <div><BsFillShareFill onClick={() => toast.error("Opps! Shere is off now")} className='text-[#706F6F] cursor-pointer'></BsFillShareFill></div>
                </div>
            </div>
            <div className='pt-[14px] pb-5'>
                <h1 className='text-[#403F3F] font-bold text-xl'>{title}</h1>
            </div>
            <div>
                <img className='w-full' src={image_url} alt="" />
            </div>
            <div className='pt-8'>
                <p className='text-[#706F6F] textarea-md font-normal leading-[26px] p-0'>{details.length > 300 ? details.slice(0, 300) + '...' : details}</p>
                <Link to={`/details/${_id}`}><h3 className='text-[#FF8C47] font-semibold text-md'>Read More</h3></Link>
            </div>
            <div className='py-5'><hr /></div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <StarRatings
                        rating={rating.number}
                        starDimension="24px"
                        starRatedColor="#FF8C47"
                        starSpacing="5px"
                    />
                    <div className='text-[#706F6F] font-medium text-md'>{rating.number}</div>
                </div>
                <div className='flex items-center gap-2'>
                    <AiOutlineEye className='text-[#706F6F] font-medium text-md'></AiOutlineEye>
                    <div className='text-[#706F6F] font-medium text-md'>{total_view}</div>
                </div>
            </div>
        </div>
    );
};

export default HomeCenterBody;