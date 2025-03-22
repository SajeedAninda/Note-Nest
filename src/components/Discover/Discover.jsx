import React from 'react'
import FolderCards from '../FolderCards/FolderCards'
import NoteCards from '../NoteCards/NoteCards'

const Discover = () => {
  return (
    <div className=' bg-[#f7f8fa] mt-6'>
      <div className='folders w-[full] h-full rounded-xl px-10 pt-6'>
        <h1 className='text-[#242627] font-bold text-[25px]'>Recent Folders</h1>
        <div className='folderCards'>
          <FolderCards></FolderCards>
        </div>
      </div>

      <div className='notes w-[full] h-full rounded-xl px-10 mt-3'>
        <h1 className='text-[#242627] font-bold text-[25px]'>Recent Notes</h1>
        <div className='folderCards'>
          <NoteCards></NoteCards>
        </div>
      </div>
    </div>
  )
}

export default Discover
