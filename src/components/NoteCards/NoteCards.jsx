'use client'
import React, { useState } from 'react'
import { RiFileEditFill } from 'react-icons/ri'
import { MdDelete, MdNoteAdd } from 'react-icons/md'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import UpdateModal from '../UpdateModal/UpdateModal'

const NoteCards = () => {
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  const axiosInstance = useAxiosInstance()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('Recent')

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

  const sortedNotes = [...(notesData || [])].sort(
    (a, b) => new Date(b.noteCreation) - new Date(a.noteCreation)
  )

  let filteredNotes = []

  if (selectedFilter === 'Recent') {
    filteredNotes = sortedNotes.slice(0, 2)
  } else if (selectedFilter === 'Today') {
    filteredNotes = sortedNotes.filter(
      note =>
        new Date(note.noteCreation).toDateString() === new Date().toDateString()
    )
  } else if (selectedFilter === 'This Week') {
    const startOfWeek = new Date()
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    filteredNotes = sortedNotes.filter(
      note => new Date(note.noteCreation) >= startOfWeek
    )
  } else if (selectedFilter === 'This Month') {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    filteredNotes = sortedNotes.filter(
      note => new Date(note.noteCreation) >= startOfMonth
    )
  }

  const handleNoteDelete = async note => {
    Swal.fire({
      title: 'Do you want to delete this Note?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#242627',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
      if (result.isConfirmed) {
        const deleteResponse = await axiosInstance.delete(
          `/noteDelete/${note._id}`
        )

        if (deleteResponse.data.deletedCount > 0) {
          toast.success('Note deleted successfully!')

          const trashResponse = await axiosInstance.post('/addToTrash', note)

          if (trashResponse.data.insertedId) {
            toast.success('Note moved to Trash!')
            refetch()
          } else {
            toast.error('Failed to move note to Trash.')
          }
        } else {
          toast.error('Error! Failed to delete Note.')
        }
      }
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

      <div className='flex mt-6 pb-6 gap-6 items-center'>
        <div className='w-[75%]'>
          <div className='grid grid-cols-2 gap-6'>
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
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
                      <div onClick={() => handleNoteDelete(note)}>
                        <MdDelete className='text-[#242627] font-bold text-[25px] hover:opacity-70' />
                      </div>
                      <div
                        onClick={() => {
                          setSelectedNote(note)
                          setIsModalOpen(true)
                        }}
                      >
                        <RiFileEditFill className='text-[#242627] font-bold text-[25px] hover:opacity-70' />
                      </div>
                    </div>
                  </div>
                  <p className='text-[#242627] font-normal mt-3 w-full text-[18px]'>
                    {note.noteDescription}
                  </p>
                </div>
              ))
            ) : (
              <div className='flex justify-center items-center'>
                <p className='text-[#242627] font-bold text-center text-[20px]'>
                  No Notes Available
                </p>
              </div>
            )}
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

      {isModalOpen && selectedNote && (
        <UpdateModal
          note={selectedNote}
          refetch={refetch}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedNote(null)
          }}
        />
      )}
    </div>
  )
}

export default NoteCards
