"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@/components/Hooks/useAxiosInstance";

const Page = ({ params }) => {
  const { id } = params;
  const axiosInstance = useAxiosInstance();

  const {
    data: folderDetailedData,
    isLoading: isFolderLoading,
    refetch,
  } = useQuery({
    queryKey: ["folderDetailedData", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/getFolder/${id}`);
      return response.data;
    },
    enabled: !!id, 
  });

  if (isFolderLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Folder ID: {id}</h1>
      <h2>Folder Name: {folderDetailedData?.folderName}</h2>
      <p>Created On: {folderDetailedData?.folderCreation}</p>
    </div>
  );
};

export default Page;
