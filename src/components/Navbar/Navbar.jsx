import React from 'react'
import logo from '@/assets/note-nest-logo.jpg'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='bg-white'>
      <div className='w-full lg:w-[1300px] mx-auto px-6 lg:px-0 h-fit lg:h-[14vh] flex items-center'>
        <div className='w-[20%]'>
          <Image width={190} height={50} src={logo} alt='Logo' />
        </div>
        <div className='w-[80%]'>
         <h1 className='text-[#242627] text-[24px] font-bold'>My Notes</h1>
        </div>
      </div>
    </div>
  )
}

export default Navbar
