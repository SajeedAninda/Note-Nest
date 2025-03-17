'use client'
import React, { useState } from 'react'
import { FaNoteSticky, FaFolderPlus } from 'react-icons/fa6'
import { BsThreeDots } from 'react-icons/bs'
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
  const darkenColor = (hex, percent = 20) => {
    if (!hex) return '#4CAF50'
    let r = parseInt(hex.substring(1, 3), 16)
    let g = parseInt(hex.substring(3, 5), 16)
    let b = parseInt(hex.substring(5, 7), 16)

    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent / 100))))
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent / 100))))
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent / 100))))

    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div>
      <div className='flex gap-6 items-center'>
        <div className='w-[75%]'>
          <div className='grid grid-cols-3 gap-6'>
            {folderData?.map(folder => {
              const folderBgColor = folder?.selectedColor || '#76dd5d'
              const iconColor = darkenColor(folderBgColor, 30) 

              return (
                <div
                  key={folder?._id}
                  className='card rounded-lg px-6 py-4 cursor-pointer hover:opacity-70 transition-all duration-150'
                  style={{ backgroundColor: folderBgColor }}
                >
                  <div className='flex justify-between items-center'>
                    <FaNoteSticky
                      className='text-[40px]'
                      style={{ color: iconColor }}
                    />
                    <BsThreeDots className='text-[20px] text-[#242627] cursor-pointer' />
                  </div>
                  <h2 className='text-[#242627] font-bold text-[20px] mt-3'>
                    {folder?.folderName}
                  </h2>
                  <h2 className='text-[#242627] font-semibold text-[16px] mt-3'>
                    {folder?.folderCreation}
                  </h2>
                </div>
              )
            })}
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
