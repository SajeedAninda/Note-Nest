'use client'
import { useState } from 'react'
import { FaNoteSticky, FaFolderPlus } from 'react-icons/fa6'
import NewFolderModal from './NewFolderModal'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Rings } from 'react-loader-spinner'

const FolderCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('Recent')
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  const axiosInstance = useAxiosInstance()

  const {
    data: folderData,
    refetch,
    isLoading: folderLoading
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

  const isToday = date => {
    const today = new Date()
    const folderDate = new Date(date)
    return (
      folderDate.getDate() === today.getDate() &&
      folderDate.getMonth() === today.getMonth() &&
      folderDate.getFullYear() === today.getFullYear()
    )
  }

  const isThisWeek = date => {
    const today = new Date()
    const folderDate = new Date(date)
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    )
    const lastDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    )
    return folderDate >= firstDayOfWeek && folderDate <= lastDayOfWeek
  }

  const isThisMonth = date => {
    const today = new Date()
    const folderDate = new Date(date)
    return (
      folderDate.getMonth() === today.getMonth() &&
      folderDate.getFullYear() === today.getFullYear()
    )
  }

  const sortedFolders = [...(folderData || [])].sort(
    (a, b) => new Date(b.folderCreation) - new Date(a.folderCreation)
  )

  let filteredFolders = []

  if (selectedFilter === 'Recent') {
    filteredFolders = sortedFolders.slice(0, 3)
  } else if (selectedFilter === 'Today') {
    filteredFolders = sortedFolders.filter(folder =>
      isToday(folder.folderCreation)
    )
  } else if (selectedFilter === 'This Week') {
    filteredFolders = sortedFolders.filter(folder =>
      isThisWeek(folder.folderCreation)
    )
  } else if (selectedFilter === 'This Month') {
    filteredFolders = sortedFolders.filter(folder =>
      isThisMonth(folder.folderCreation)
    )
  }

  const formatDate = date => {
    const folderDate = new Date(date)
    return folderDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div>
      <div className='flex mt-3 gap-3 items-center'>
        {['Recent', 'Today', 'This Week', 'This Month'].map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`text-[#242627] cursor-pointer hover:opacity-70 font-semibold text-[18px] px-4 py-1 rounded-md 
              ${selectedFilter === filter ? 'underline' : ''}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className='flex gap-6 items-center mt-4'>
        <div className='w-[75%]'>
          {folderLoading ? (
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
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              {filteredFolders.length > 0 ? (
                filteredFolders.map(folder => {
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
                          {formatDate(folder?.folderCreation)}
                        </h2>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className='flex justify-center items-center'>
                  <p className='text-[#242627] font-bold text-[20px]'>
                    No folders available
                  </p>
                </div>
              )}
            </div>
          )}
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

      {/* Modal */}
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
