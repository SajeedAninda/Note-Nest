import React from 'react';

const page = () => {
    return (
        <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6">
            <div className="text-center mb-12 sm:mb-16">
                <h4 className="text-[#242627] text-[30px] font-bold mt-6">Sign up to use Note-Nest</h4>
            </div>

            <form>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                        <label className="text-[#242627] text-sm font-medium mb-2 block">First Name</label>
                        <input name="name" type="text" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
                    </div>
                    <div>
                        <label className="text-[#242627] text-sm font-medium mb-2 block">Last Name</label>
                        <input name="lname" type="text" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" />
                    </div>
                    <div>
                        <label className="text-[#242627] text-sm font-medium mb-2 block">Email Id</label>
                        <input name="email" type="text" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
                    </div>
                    <div>
                        <label className="text-[#242627] text-sm font-medium mb-2 block">Password</label>
                        <input name="password" type="password" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
                    </div>

                </div>
                <div className='mt-8'>
                    <label className="text-[#242627] text-sm font-medium mb-2 block">Image Url</label>
                    <input name="imgUrl" type="text" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter Image Url" />
                </div>

                <div className="mt-12">
                    <button type="submit" className="cursor-pointer mx-auto block py-4 text-[18px] px-12 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default page;