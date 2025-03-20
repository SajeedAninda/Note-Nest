'use client'
import React from 'react'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'

const FolderDetails = ({ id }) => {
  const axiosInstance = useAxiosInstance()

  const {
    data: folderDetailedData,
    isLoading: isFolderLoading,
    refetch
  } = useQuery({
    queryKey: ['folderDetailedData', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/getFolder/${id}`)
      return response.data
    },
    enabled: !!id
  })
  return <div></div>
}

export default FolderDetails
