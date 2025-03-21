import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'

const UpdateModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [noteName, setNoteName] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('no-folder')
  const [selectedColor, setSelectedColor] = useState('')
  const [noteDescription, setNoteDescription] = useState('')
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

  const colors = [
    { name: 'Red', hex: '#FF4136' },
    { name: 'Blue', hex: '#0074D9' },
    { name: 'Green', hex: '#2ECC40' },
    { name: 'Purple', hex: '#B10DC9' },
    { name: 'Orange', hex: '#FF851B' },
    { name: 'Pink', hex: '#F012BE' },
    { name: 'Yellow', hex: '#FFDC00' },
    { name: 'Teal', hex: '#39CCCC' }
  ]

  const maxLength = 150

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='w-[550px] py-12'>
        <DialogHeader>
          <DialogTitle className='text-[#242627]'>
            Update Note
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div>
            <label
              htmlFor='folder-name'
              className='block text-sm font-medium text-[#242627]'
            >
              Note Name
            </label>
            <input
              id='note-name'
              value={noteName}
              onChange={e => setNoteName(e.target.value)}
              placeholder='Enter Updated Note Name '
              className='mt-2 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex gap-6 items-center mt-4'>
            <div className='w-[50%]'>
              <label className='block text-[18px] font-semibold mb-2 text-[#242627]'>
                Note Folder
              </label>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger className='mt-1 w-full px-3 py-2 border rounded-md border-[#242627] focus:ring-2 focus:ring-blue-500 min-h-[42px]'>
                  <SelectValue placeholder='Select a folder' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key='no-folder' value='no-folder'>
                    No Folder
                  </SelectItem>

                  {folderData?.map(folder => (
                    <SelectItem key={folder._id} value={folder.folderName}>
                      {folder.folderName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='w-[50%]'>
              <label className='block text-[18px] font-semibold mb-2 text-[#242627]'>
                Note Theme
              </label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className='mt-1 w-full px-3 py-2 border rounded-md border-[#242627] focus:ring-2 focus:ring-blue-500 min-h-[42px]'>
                  <SelectValue placeholder='Select a color' />
                </SelectTrigger>
                <SelectContent>
                  {colors.map(color => (
                    <SelectItem key={color.hex} value={color.hex}>
                      <div className='flex items-center gap-2'>
                        <span
                          className='w-5 h-5 rounded-full'
                          style={{ backgroundColor: color.hex }}
                        ></span>
                        {color.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='w-full mt-6'>
            <label
              htmlFor='note-description'
              className='block text-[18px] font-semibold mb-2 text-[#242627]'
            >
              Write Note
            </label>
            <textarea
              id='note-description'
              rows={5}
              value={noteDescription}
              onChange={e => setNoteDescription(e.target.value)}
              placeholder='Write Down Your Note'
              maxLength={maxLength}
              className='mt-2 block w-full px-3 py-2 border rounded-md border-[#242627] focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[42px]'
            />
            <div className='text-right mt-2 text-gray-600'>
              {maxLength - noteDescription.length} characters left
            </div>
          </div>

          <button className='w-full py-2 mt-4 bg-[#242627] cursor-pointer text-white font-semibold rounded-md hover:bg-gray-700 transition-all'>
            Update Note
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateModal
