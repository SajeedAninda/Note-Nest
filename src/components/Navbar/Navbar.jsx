// components/Navbar.js
'use client'
import React, { useState } from 'react'
import logo from '@/assets/note-nest-logo.jpg'
import Image from 'next/image'
import { CiSearch, CiMenuBurger, CiClose } from 'react-icons/ci'
import Link from 'next/link'
import useCurrentUserData from '../Hooks/useCurrentUserData'
import useAuth from '../Hooks/useAuth'
import toast from 'react-hot-toast'
import { useSearch } from '../SearchContext/SearchProvider'
import { useRouter } from 'next/navigation'
import { IoMdClose } from 'react-icons/io'

const Navbar = () => {
  const { userData } = useCurrentUserData()
  const { logOut } = useAuth()
  const { searchTerm, updateSearch } = useSearch()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logOut().then(() => {
      toast.success('Logged Out of the account')
      setIsSidebarOpen(false)
    })
  }

  const handleInputClick = () => {
    router.push('/all-notes')
    setIsSidebarOpen(false)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='bg-white'>
      <div className='px-6 lg:px-0 h-[14vh] flex items-center justify-between lg:justify-start'>
        <Link href={'/'} className='w-[190px] cursor-pointer'>
          <Image width={190} height={50} src={logo} alt='Logo' />
        </Link>

        {/* Mobile Menu Button */}
        <button className='lg:hidden text-2xl p-2' onClick={toggleSidebar}>
          {isSidebarOpen ? <IoMdClose /> : <CiMenuBurger />}
        </button>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex w-[calc(100%-190px)] justify-between items-center ml-8'>
          <h1 className='text-[#242627] text-[24px] font-bold'>My Notes</h1>
          <div className='relative'>
            <CiSearch className='text-[#767777] text-[27px] font-bold absolute left-4 top-3' />
            <input
              onClick={handleInputClick}
              className='w-[400px] py-3 pl-14 pr-4 rounded-lg bg-[#ecedee] placeholder:text-[#767777] placeholder:text-[13px]'
              type='text'
              placeholder='Search Your Notes By Name'
              value={searchTerm}
              onChange={e => updateSearch(e.target.value)}
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
              <span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200'></span>
              <span className='relative text-base font-semibold group-hover:text-[#242627]'>
                Login
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <>
            <div
              className='fixed inset-0 bg-black opacity-50 z-40 lg:hidden'
              onClick={toggleSidebar}
            ></div>
            <div className='fixed inset-y-0 left-0 w-[65%] bg-white z-50 p-6 shadow-lg transform transition-transform lg:hidden'>
              <div className='flex flex-col h-full'>
                <div className='flex justify-between items-center mb-8'>
                  <h1 className='text-[#242627] text-xl font-bold'>My Notes</h1>
                  <button onClick={toggleSidebar} className='text-2xl'>
                    <IoMdClose />
                  </button>
                </div>

                <div className='relative mb-8'>
                  <CiSearch className='text-[#767777] text-xl font-bold absolute left-4 top-3' />
                  <input
                    onClick={handleInputClick}
                    className='w-full py-2 pl-10 pr-4 rounded-lg bg-[#ecedee] placeholder:text-[#767777] placeholder:text-xs'
                    type='text'
                    placeholder='Search Your Notes By Name'
                    value={searchTerm}
                    onChange={e => updateSearch(e.target.value)}
                  />
                </div>

                <div className='flex flex-col space-y-6 flex-grow'>
                  <Link
                    href='/'
                    onClick={() => setIsSidebarOpen(false)}
                    className='text-[#242627] hover:text-gray-600'
                  >
                    Home
                  </Link>
                  <Link
                    href='/new-note'
                    onClick={() => setIsSidebarOpen(false)}
                    className='text-[#242627] hover:text-gray-600'
                  >
                    New Note
                  </Link>
                  <Link
                    href='/all-notes'
                    onClick={() => setIsSidebarOpen(false)}
                    className='text-[#242627] hover:text-gray-600'
                  >
                    All Notes
                  </Link>
                  <Link
                    href='/all-folders'
                    onClick={() => setIsSidebarOpen(false)}
                    className='text-[#242627] hover:text-gray-600'
                  >
                    All Folders
                  </Link>
                  <Link
                    href='/trash'
                    onClick={() => setIsSidebarOpen(false)}
                    className='text-[#242627] hover:text-gray-600'
                  >
                    Trashed Notes
                  </Link>
                </div>

                <div className='mt-auto'>
                  {userData ? (
                    <div className='flex flex-col items-center gap-4'>
                      <Image
                        className='rounded-full object-cover'
                        src={userData?.imgUrl}
                        width={60}
                        height={60}
                        alt='User Profile Picture'
                      />
                      <button
                        onClick={handleLogout}
                        className='w-full py-2 px-4 bg-[#242627] text-white rounded-md hover:bg-[#3a3b3c]'
                      >
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={'/login'}
                      onClick={() => setIsSidebarOpen(false)}
                      className='block w-full py-2 px-4 text-center bg-[#242627] text-white rounded-md hover:bg-[#3a3b3c]'
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
