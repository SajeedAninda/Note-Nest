import React from "react";
import FolderDetails from "@/components/FolderDetails/FolderDetails";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

const Page = ({ params }) => {
    const { id } = params;

    return (
        <div className="w-full lg:w-[1270px] mx-auto">
            <Navbar />
            <div className="flex w-full">
                <div className="w-1/5">
                    <Sidebar />
                </div>

                <div className="w-4/5 pb-12 flex-grow">
                    <h1 className='text-[#242627] font-bold text-[30px] text-center'>Folder Details</h1>
                    <div className='mt-1'>
                        <FolderDetails id={id}></FolderDetails>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
