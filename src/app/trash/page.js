import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import TrashedNotes from '@/components/TrashedNotes/TrashedNotes';
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
                    <h1 className='text-[#242627] font-bold text-[30px] text-center'>Trashed Notes</h1>
                    <h1 className='text-[#242627] font-bold text-[20px] text-center'>See All Your Deleted Notes Here</h1>
                    <div className='mt-1'>
                        <TrashedNotes></TrashedNotes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;