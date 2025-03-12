import React from 'react'
import FolderCards from '../FolderCards/FolderCards'

const Discover = () => {
  return (
    <div className='bg-[#f7f8fa] w-[full] h-full mt-6 rounded-xl px-6 py-10'>
      <h1 className='text-[#242627] font-bold text-[25px]'>Recent Folders</h1>
      <div className='flex mt-3 gap-3 items-center'>
        <p className='text-[#242627] font-semibold text-[18px]'>Today</p>
        <p className='text-[#242627] font-semibold text-[18px]'>This Week</p>
        <p className='text-[#242627] font-semibold text-[18px]'>This Month</p>
      </div>
      <div className='folderCards mt-6'>
        <FolderCards></FolderCards>
      </div>
    </div>
  )
}

export default Discover
