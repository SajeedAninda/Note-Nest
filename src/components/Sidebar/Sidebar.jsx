import React from 'react'
import { MdNoteAdd, MdStickyNote2 } from 'react-icons/md'
import { FaFileArchive } from 'react-icons/fa'
import { PiTrashFill } from "react-icons/pi";
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className=' bg-white h-full pt-6 space-y-8'>
      <Link href={"/new-note"} className='flex items-center gap-3 hover:opacity-60 cursor-pointer transition-all duration-150'>
        <MdNoteAdd className='text-[#242627] text-[25px] font-bold' />
        <p className='text-[#242627] text-[20px] font-semibold'>New Note</p>
      </Link>

      <Link href={"/all-notes"} className='flex items-center gap-3 hover:opacity-60 cursor-pointer transition-all duration-150'>
        <MdStickyNote2 className='text-[#242627] text-[25px] font-bold' />
        <p className='text-[#242627] text-[20px] font-semibold'>All Notes</p>
      </Link>

      <div className='flex items-center gap-3 hover:opacity-60 cursor-pointer transition-all duration-150'>
        <FaFileArchive className='text-[#242627] text-[25px] font-bold' />
        <p className='text-[#242627] text-[20px] font-semibold'>Archives</p>
      </div>

      <div className='flex items-center gap-3 hover:opacity-60 cursor-pointer transition-all duration-150'>
        <PiTrashFill className='text-[#242627] text-[25px] font-bold' />
        <p className='text-[#242627] text-[20px] font-semibold'>Trash</p>
      </div>
    </div>
  )
}

export default Sidebar
