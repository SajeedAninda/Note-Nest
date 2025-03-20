'use client'
import React from 'react'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../Hooks/useAuth'

const FolderDetails = ({ id }) => {
  const axiosInstance = useAxiosInstance()
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email

  const {
    data: folderDetailedData,
    isLoading: isFolderDetailsLoading,
    refetch: folderDetailsRefetch
  } = useQuery({
    queryKey: ['folderDetailedData', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/getFolder/${id}`)
      return response.data
    },
    enabled: !!id
  })

  const {
    data: notesData,
    isLoading: isNotesLoading,
    refetch: notesRefetch
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

  console.log(folderDetailedData)
  console.log(notesData)

  return <div></div>
}

export default FolderDetails
