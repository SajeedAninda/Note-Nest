import React from 'react'
import { RiFileEditFill } from 'react-icons/ri'
import { MdNoteAdd } from 'react-icons/md'

const NoteCards = () => {
  return (
    <div className='flex mt-6 gap-6 items-center'>
      <div className='w-[75%]'>
        <div className='grid grid-cols-2 gap-6'>
          <div className='card rounded-lg px-6 py-4 bg-[#aacf55] cursor-pointer hover:opacity-70 transition-all duration-150'>
            <p className='text-[#242627] font-bold text-[12px]'>12/12/2025 <span className='px-2'>|</span> Monday <span className='px-2'>|</span> 10:30 PM</p>
            <div className='flex justify-between items-center mt-5 pb-3 border-b-2 border-[#242627]'>
              <h2 className='text-[#242627] font-bold text-[20px]'>
                Mid Test Exam
              </h2>
              <RiFileEditFill className='text-[#242627] font-bold text-[25px]' />
            </div>
            <p className='text-[#242627] font-normal mt-3 w-full text-[18px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptates placeat. Nesciunt adipisci laudantium sequi rem! Excepturi saepe dignissimos aperiam velit odit ducimus animi, aspernatur aut exercitationem laudantium. Beatae, autem!
            </p>
          </div>

          <div className='card rounded-lg px-6 py-4 bg-[#df7631] cursor-pointer hover:opacity-70 transition-all duration-150'>
            <p className='text-[#242627] font-bold text-[12px]'>12/12/2025 <span className='px-2'>|</span> Monday <span className='px-2'>|</span> 10:30 PM</p>
            <div className='flex justify-between items-center mt-5 pb-3 border-b-2 border-[#242627]'>
              <h2 className='text-[#242627] font-bold text-[20px]'>
                Mid Test Exam
              </h2>
              <RiFileEditFill className='text-[#242627] font-bold text-[25px]' />
            </div>
            <p className='text-[#242627] font-normal mt-3 w-full text-[18px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptates placeat. Nesciunt adipisci laudantium sequi rem! Excepturi saepe dignissimos aperiam velit odit ducimus animi, aspernatur aut exercitationem laudantium. Beatae, autem!
            </p>
          </div>
        </div>
      </div>


      <div className='w-[25%] p-10'>
        <div className='border-2 border-dotted flex-col text-center place-items-center justify-center items-center p-6 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-150'>
          <MdNoteAdd className='text-center text-[#242627] font-bold text-[30px]' />
          <h2 className='text-[#242627] font-bold text-[20px] mt-3'>
            New <br /> Note
          </h2>
        </div>
      </div>
    </div>
  )
}

export default NoteCards
