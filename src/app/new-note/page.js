import Discover from '@/components/Discover/Discover';
import Navbar from '@/components/Navbar/Navbar';
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

                <div className="w-4/5 flex justify-center py-12 flex-grow">
                    <h1>Add New Note</h1>
                </div>
            </div>
        </div>
    );
};

export default page;