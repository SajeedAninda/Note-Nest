'use client'
import React, { useState } from 'react'
import { FaNoteSticky } from 'react-icons/fa6'
import { BsThreeDots } from 'react-icons/bs'
import { FaFolderPlus } from 'react-icons/fa6'
import NewFolderModal from './NewFolderModal'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'

const FolderCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  const axiosInstance = useAxiosInstance()

  const {
    data: folderData,
    isLoading: isFolderLoading,
    refetch
  } = useQuery({
    queryKey: ['folderData', currentUserEmail],
    queryFn: async () => {
      if (!currentUserEmail) return []
      const response = await axiosInstance.get(
        `/getFolders?email=${currentUserEmail}`
      )
      return response.data
    },
    enabled: !!currentUserEmail
  })

  console.log(folderData)

  return (
    <div>
      <div className='flex gap-6 items-center'>
        <div className='w-[75%]'>
          <div className='grid grid-cols-3 gap-6'>
            <div className='card rounded-lg px-6 py-4 bg-[#76dd5d] cursor-pointer hover:opacity-70 transition-all duration-150'>
              <div className='flex justify-between items-center'>
                <FaNoteSticky className='text-[40px] text-green-500' />
                <BsThreeDots className='text-[20px] text-[#242627] cursor-pointer' />
              </div>
              <h2 className='text-[#242627] font-bold text-[20px] mt-3'>
                Movie Review
              </h2>
              <h2 className='text-[#242627] font-semibold text-[16px] mt-3'>
                12/12/2025
              </h2>
            </div>

            <div className='card rounded-lg px-6 py-4 bg-[#63e9ee] cursor-pointer hover:opacity-70 transition-all duration-150'>
              <div className='flex justify-between items-center'>
                <FaNoteSticky className='text-[40px] text-[#47a0a3]' />
                <BsThreeDots className='text-[20px] text-[#242627] cursor-pointer' />
              </div>
              <h2 className='text-[#242627] font-bold text-[20px] mt-3'>
                Movie Review
              </h2>
              <h2 className='text-[#242627] font-semibold text-[16px] mt-3'>
                12/12/2025
              </h2>
            </div>

            <div className='card rounded-lg px-6 py-4 bg-[#be1995] cursor-pointer hover:opacity-70 transition-all duration-150'>
              <div className='flex justify-between items-center'>
                <FaNoteSticky className='text-[40px] text-[#752271]' />
                <BsThreeDots className='text-[20px] text-[#242627] cursor-pointer' />
              </div>
              <h2 className='text-[#242627] font-bold text-[20px] mt-3'>
                Movie Review
              </h2>
              <h2 className='text-[#242627] font-semibold text-[16px] mt-3'>
                12/12/2025
              </h2>
            </div>
          </div>
        </div>
        <div className='w-[25%] p-10'>
          <div
            onClick={() => setIsModalOpen(true)}
            className='border-2 border-dotted flex-col text-center place-items-center justify-center items-center p-6 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-150'
          >
            <FaFolderPlus className='text-center text-[#242627] font-bold text-[20px]' />
            <h2 className='text-[#242627] font-bold text-[20px] mt-3'>
              New Folder
            </h2>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <NewFolderModal
          folderData={folderData}
          refetch={refetch}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default FolderCards
