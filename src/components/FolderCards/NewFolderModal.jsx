'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

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

const NewFolderModal = ({ onClose }) => {
  const [folderName, setFolderName] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const today = new Date().toISOString().split('T')[0]

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='w-[500px] py-12'>
        <DialogHeader>
          <DialogTitle className="text-[#242627]">Create New Folder</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div>
            <label htmlFor='folder-name' className='block text-sm font-medium text-[#242627]'>
              Folder Name
            </label>
            <input
              id='folder-name'
              value={folderName}
              onChange={e => setFolderName(e.target.value)}
              placeholder='Enter folder name'
              className='mt-2 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2 text-[#242627]'>
              Folder Theme
            </label>
            <Select onValueChange={val => setSelectedColor(val)}>
              <SelectTrigger className='mt-1 w-full px-3 py-2 border rounded-md focus:outline-none'>
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
          <div>
            <label className='block text-sm font-medium mb-2 text-[#242627]'>
              Creation Date
            </label>
            <input
              value={today}
              disabled
              className='mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100 opacity-50'
            />
          </div>

          <button
            onClick={() => {
              setIsOpen(false)
              onClose()
            }}
            className='w-full py-2 mt-4 bg-[#242627] cursor-pointer text-white font-semibold rounded-md hover:bg-gray-700 transition-all'
          >
            Create Folder
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewFolderModal
