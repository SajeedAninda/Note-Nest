import Discover from '@/components/Discover/Discover';
import Navbar from '@/components/Navbar/Navbar';
import NewNote from '@/components/NewNote/NewNote';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';

const page = () => {
    return (
        <div className="w-full lg:w-[1270px] mx-auto">
            <Navbar />
            <div className="flex w-full">
                <div className="w-1/5">
                    <Sidebar />
                </div>

                <div className="w-4/5 pb-12 flex-grow">
                    <h1 className='text-[#242627] font-bold text-[30px] text-center'>Add New Note</h1>
                    <div className='mt-1'>
                        <NewNote></NewNote>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;