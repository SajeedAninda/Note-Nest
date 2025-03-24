import AllNotes from '@/components/AllNotes/AllNotes';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';

const page = () => {
    return (
        <div className="w-full lg:w-[1270px] mx-auto">
            <Navbar />
            <div className="flex w-full">
                <div className="w-1/5 hidden lg:block">
                    <Sidebar />
                </div>

                <div className="w-full lg:w-4/5 flex-grow pb-12">
                    <h1 className='text-[#242627] font-bold text-[30px] text-center'>All Notes</h1>
                    <h1 className='text-[#242627] font-bold text-[20px] text-center'>See your Notes, All In One Place</h1>
                    <div className='mt-1'>
                        <AllNotes></AllNotes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;