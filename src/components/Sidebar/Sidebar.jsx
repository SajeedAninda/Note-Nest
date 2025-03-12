import React from 'react'
import { MdNoteAdd, MdStickyNote2 } from 'react-icons/md'
import { FaFileArchive } from 'react-icons/fa'
import { PiTrashFill } from "react-icons/pi";

const Sidebar = () => {
  return (
    <div className='w-[20%] bg-white h-full mt-6 ml-6 space-y-8'>
      <div className='flex items-center gap-3 hover:opacity-60 cursor-pointer transition-all duration-150'>
        <MdNoteAdd className='text-[#242627] text-[20px] font-bold' />
        <p className='text-[#242627] font-semibold'>New Note</p>
      </div>

      <div className='flex items-center gap-3 hover:opacity-60 cursor-pointer transition-all duration-150'>
        <MdStickyNote2 className='text-[#242627] text-[20px] font-bold' />
        <p className='text-[#242627] font-semibold'>All Notes</p>
      </div>

      <div className='flex items-center gap-3 hover:opacity-60 cursor-pointer transition-all duration-150'>
        <FaFileArchive className='text-[#242627] text-[20px] font-bold' />
        <p className='text-[#242627] font-semibold'>Archives</p>
      </div>

      <div className='flex items-center gap-3 hover:opacity-60 cursor-pointer transition-all duration-150'>
        <PiTrashFill className='text-[#242627] text-[20px] font-bold' />
        <p className='text-[#242627] font-semibold'>Trash</p>
      </div>
    </div>
  )
}

export default Sidebar
