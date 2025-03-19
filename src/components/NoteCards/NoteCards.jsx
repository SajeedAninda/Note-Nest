'use client'
import React from 'react'
import { RiFileEditFill } from 'react-icons/ri'
import { MdDelete, MdNoteAdd } from 'react-icons/md'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const NoteCards = () => {
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  const axiosInstance = useAxiosInstance()

  const {
    data: notesData,
    isLoading: isNotesLoading,
    refetch
  } = useQuery({
    queryKey: ['notesData', currentUserEmail],
    queryFn: async () => {
      if (!currentUserEmail) return []
      const response = await axiosInstance.get(
        `/getNotes?email=${currentUserEmail}`
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

  const sortedNotes = [...(notesData || [])].sort(
    (a, b) => new Date(b.noteCreation) - new Date(a.noteCreation)
  )

  const lastestNotes = sortedNotes.slice(0, 2)

  return (
    <div className='flex mt-6 pb-6 gap-6 items-center'>
      <div className='w-[75%]'>
        <div className='grid grid-cols-2 gap-6'>
          {lastestNotes.map(note => (
            <div
              key={note._id}
              className='card rounded-lg px-6 py-4'
              style={{
                backgroundColor: note.selectedColor,
                cursor: 'pointer',
                hover: 'opacity-70',
                transition: 'all 0.15s'
              }}
            >
              <p className='text-[#242627] font-bold text-[12px]'>
                {new Date(note.noteCreation).toLocaleDateString()}{' '}
                <span className='px-2'>|</span>{' '}
                {new Date(note.noteCreation).toLocaleTimeString()}
                <span className='px-2'>|</span>
                {note.notefolder}
              </p>
              <div className='flex justify-between items-center mt-5 pb-3 border-b-2 border-[#242627]'>
                <h2 className='text-[#242627] font-bold text-[20px]'>
                  {note.noteName}
                </h2>
                <div className='flex gap-4'>
                  <MdDelete className='text-[#242627] font-bold text-[25px] hover:opacity-70' />
                  <RiFileEditFill className='text-[#242627] font-bold text-[25px] hover:opacity-70' />
                </div>
              </div>
              <p className='text-[#242627] font-normal mt-3 w-full text-[18px]'>
                {note.noteDescription}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='w-[25%] p-10'>
        <Link href={'/new-note'}>
          <div className='w-full border-2 border-dotted flex-col text-center place-items-center justify-center items-center p-6 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-150'>
            <MdNoteAdd className='text-center text-[#242627] font-bold text-[30px]' />
            <h2 className='text-[#242627] font-bold text-[20px] mt-3'>
              New <br /> Note
            </h2>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default NoteCards
