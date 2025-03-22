'use client'
import React, { useState } from 'react'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { RiFileEditFill } from 'react-icons/ri'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import UpdateModal from '../UpdateModal/UpdateModal'
import { MdDelete } from 'react-icons/md'
import { useSearch } from '../SearchContext/SearchProvider'

const AllNotes = () => {
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  const axiosInstance = useAxiosInstance()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const { searchTerm } = useSearch()

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

  const filteredNotes = sortedNotes.filter(note => {
    const term = searchTerm.toLowerCase()
    return (
      note.noteName.toLowerCase().includes(term) ||
      note.noteDescription.toLowerCase().includes(term) ||
      note.notefolder.toLowerCase().includes(term)
    )
  })

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
      <div className='flex mt-6 pb-6 gap-6 items-center'>
        <div className='w-full'>
          <div className='grid grid-cols-3 gap-6'>
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
                      <div
                        onClick={() => {
                          handleNoteDelete(note)
                        }}
                      >
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
              <p className="text-center text-lg font-semibold mt-6">
                No notes found for "{searchTerm}"
              </p>
            )}
          </div>
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

export default AllNotes
