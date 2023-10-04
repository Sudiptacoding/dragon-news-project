import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import LogoHeader from '../components/LogoHeader';
import MarqueHeader from '../components/MarqueHeader';
import HomeLeftNav from '../components/HomeLeftNav';
import HomeRightNav from '../components/HomeRightNav';
import HomeCenterBody from '../components/HomeCenterBody';
import { UserContext } from '../context/UserContextProvider';
import { addData, getData } from '../../public/Localstorage/SelectSideBar';
import toast from 'react-hot-toast';


const Home = () => {
    const { selectCategory, bookmark, setBookMark } = useContext(UserContext)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('/news.json')
            .then(res => res.json())
            .then(json => {
                if (selectCategory == 0) {
                    setData(json)
                } else {
                    const matchData = json.filter((item) => item.category_id === selectCategory)
                    setData(matchData)
                }
            })
    }, [selectCategory])


    const handelAddBookMark = (item) => {
        const localData = getData()
        const findData = localData.find(id => id === item._id)
        if (findData) {
            toast.error("Bookmark alrady added!")
        } else {
            addData(item._id)
            setBookMark([...bookmark, item])
        }
    }

    useState(() => {
        fetch('/news.json')
            .then(res => res.json())
            .then((card) => {
                const localdata = getData()
                let myArray = []
                for (const item of localdata) {
                    const matchdata = card.find((add) => add._id === item)
                    myArray.push(matchdata)
                }
                setBookMark(myArray)
            })
    }, [])





    return (
        <div>
            <LogoHeader></LogoHeader>
            <MarqueHeader></MarqueHeader>
            <Header></Header>
            {/* Layout */}
            <div className='grid grid-cols-1 gap-3 mt-10 lg:grid-cols-4'>
                <div><HomeLeftNav></HomeLeftNav></div>
                <div className='lg:col-span-2 overflow-y-auto h-[1500px] no-scrollbar'>
                    <div className='pb-5'><h1 className='text-[#403F3F] text-xl font-semibold'>Dragon News Home</h1></div>
                    <div>
                        {
                            data.length > 0 ? data.map((news, i) => <HomeCenterBody key={i} news={news} handelAddBookMark={handelAddBookMark}></HomeCenterBody>) : <div className='flex items-center justify-center w-full h-screen'><h1 className='text-xl font-bold text-gray-600'>Data No Here</h1></div>
                        }
                    </div>
                </div>
                <div><HomeRightNav></HomeRightNav></div>
            </div>
        </div>
    );
};

export default Home;