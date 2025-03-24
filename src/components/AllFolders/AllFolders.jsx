'use client'
import React from 'react'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { FaNoteSticky } from 'react-icons/fa6'
import Link from 'next/link'
import { Rings } from 'react-loader-spinner'

const AllFolders = () => {
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

  const sortedFolders = [...(folderData || [])].sort(
    (a, b) => new Date(b.folderCreation) - new Date(a.folderCreation)
  )

  return (
    <div>
      {isFolderLoading ? (
        <div className='flex justify-center items-center'>
          <Rings
            visible={true}
            height='80'
            width='80'
            color='#242627'
            ariaLabel='rings-loading'
            wrapperStyle={{}}
            wrapperClass=''
          />
        </div>
      ) : sortedFolders.length === 0 ? (
        <p className='text-center text-lg font-semibold mt-6'>
          No folders available.
        </p>
      ) : (
        <div className='flex gap-6 items-center'>
          <div className='w-full'>
            <div className='grid grid-cols-4 gap-6'>
              {sortedFolders?.map(folder => {
                const folderBgColor = folder?.selectedColor || '#76dd5d'
                const iconColor = darkenColor(folderBgColor, 30)

                return (
                  <Link
                    href={`/folderDetails/${folder?._id}`}
                    key={folder?._id}
                  >
                    <div
                      className='card h-[200px] rounded-lg px-6 py-4 cursor-pointer hover:opacity-70 transition-all duration-150'
                      style={{ backgroundColor: folderBgColor }}
                    >
                      <div className='flex justify-between items-center'>
                        <FaNoteSticky
                          className='text-[40px]'
                          style={{ color: iconColor }}
                        />
                      </div>
                      <h2 className='text-[#242627] font-bold text-[20px] mt-3'>
                        {folder?.folderName}
                      </h2>
                      <h2 className='text-[#242627] font-semibold text-[16px] mt-3'>
                        Created on: <br></br>
                        {folder?.folderCreation}
                      </h2>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllFolders
