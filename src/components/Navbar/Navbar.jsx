// components/Navbar.js
'use client'
import React from 'react'
import logo from '@/assets/note-nest-logo.jpg'
import Image from 'next/image'
import { CiSearch } from 'react-icons/ci'
import Link from 'next/link'
import useCurrentUserData from '../Hooks/useCurrentUserData'
import useAuth from '../Hooks/useAuth'
import toast from 'react-hot-toast'
import { useSearch } from '../SearchContext/SearchProvider'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { userData } = useCurrentUserData()
  const { logOut } = useAuth()
  const { searchTerm, updateSearch } = useSearch() // Using SearchContext
  let router = useRouter()

  const handleLogout = () => {
    logOut().then(() => toast.success('Logged Out of the account'))
  }
  const handleInputClick = () => {
    router.push('/all-notes')
  }

  return (
    <div className='bg-white'>
      <div className='px-6 lg:px-0 h-fit lg:h-[14vh] flex items-center'>
        <Link href={'/'} className='w-[20%] cursor-pointer'>
          <Image width={190} height={50} src={logo} alt='Logo' />
        </Link>
        <div className='w-[80%] flex justify-between items-center'>
          <h1 className='text-[#242627] text-[24px] font-bold'>My Notes</h1>
          <div className='relative'>
            <CiSearch className='text-[#767777] text-[27px] font-bold absolute left-4 top-3' />
            <input
              onClick={handleInputClick}
              className='w-[400px] py-3 pl-14 pr-4 rounded-lg bg-[#ecedee] placeholder:text-[#767777] placeholder:text-[13px]'
              type='text'
              placeholder='Search Your Notes By Name'
              value={searchTerm}
              onChange={e => updateSearch(e.target.value)} // Update search term in context
            />
          </div>
          {userData ? (
            <div className='flex gap-4 items-center'>
              <Image
                className='rounded-full object-cover'
                src={userData?.imgUrl}
                width={50}
                height={50}
                alt='User Profile Picture'
              />
              <button
                onClick={handleLogout}
                className='relative cursor-pointer inline-flex items-center justify-center px-12 py-3 overflow-hidden tracking-tighter text-white bg-[#242627] rounded-md group'
              >
                <span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-[#f7f8fa] rounded-full group-hover:w-56 group-hover:h-56 '></span>
                <span className='absolute bottom-0 left-0 h-full -ml-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-auto h-full opacity-100 object-stretch'
                    viewBox='0 0 487 487'
                  >
                    <path
                      fillOpacity='.1'
                      fillRule='nonzero'
                      fill='#FFF'
                      d='M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z'
                    ></path>
                  </svg>
                </span>
                <span className='absolute top-0 right-0 w-12 h-full -mr-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='object-cover w-full h-full'
                    viewBox='0 0 487 487'
                  >
                    <path
                      fillOpacity='.1'
                      fillRule='nonzero'
                      fill='#FFF'
                      d='M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z'
                    ></path>
                  </svg>
                </span>
                <span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200'></span>
                <span className='relative text-base font-semibold group-hover:text-[#242627]'>
                  Log Out
                </span>
              </button>
            </div>
          ) : (
            <Link
              href={'/login'}
              className='relative cursor-pointer inline-flex items-center justify-center px-12 py-3 overflow-hidden tracking-tighter text-white bg-[#242627] rounded-md group'
            >
              <span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-[#f7f8fa] rounded-full group-hover:w-56 group-hover:h-56 '></span>
              <span className='absolute bottom-0 left-0 h-full -ml-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-auto h-full opacity-100 object-stretch'
                  viewBox='0 0 487 487'
                >
                  <path
                    fillOpacity='.1'
                    fillRule='nonzero'
                    fill='#FFF'
                    d='M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z'
                  ></path>
                </svg>
              </span>
              <span className='absolute top-0 right-0 w-12 h-full -mr-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='object-cover w-full h-full'
                  viewBox='0 0 487 487'
                >
                  <path
                    fillOpacity='.1'
                    fillRule='nonzero'
                    fill='#FFF'
                    d='M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z'
                  ></path>
                </svg>
              </span>
              <span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200'></span>
              <span className='relative text-base font-semibold group-hover:text-[#242627]'>
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
