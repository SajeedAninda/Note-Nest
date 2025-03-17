'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

const NewNote = () => {
  const [noteName, setNoteName] = useState('')
  const [noteDescription, setNoteDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

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

  return (
    <div className=''>
      <div className='flex justify-between gap-6'>
        <div className='w-[50%]'>
          <label
            htmlFor='note-name'
            className='block text-[18px] font-semibold mb-2 text-[#242627]'
          >
            Folder Name
          </label>
          <input
            id='note-name'
            value={noteName}
            onChange={e => setNoteName(e.target.value)}
            placeholder='Enter Note name'
            className='mt-2 block w-full px-3 py-2 border rounded-md border-[#242627] focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[42px]'
          />
        </div>

        <div className='w-[50%]'>
          <label className='block text-[18px] font-semibold mb-2 text-[#242627]'>
            Note Theme
          </label>
          <Select onValueChange={val => setSelectedColor(val)}>
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
          id='note-name'
          rows={5}
          value={noteDescription}
          onChange={e => setNoteDescription(e.target.value)}
          placeholder='Write Down Your Note'
          className='mt-2 block w-full px-3 py-2 border rounded-md border-[#242627] focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[42px]'
        />
      </div>

      <button className='w-full py-3 mt-6 bg-[#242627] cursor-pointer text-white font-semibold rounded-md hover:bg-gray-700 transition-all'>
        Add New Note
      </button>
    </div>
  )
}

export default NewNote
