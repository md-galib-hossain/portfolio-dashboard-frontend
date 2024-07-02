"use client"
import { useGetAllSocialsQuery } from '@/redux/api/socialAPi'
import React from 'react'

const page = () => {
  const {data,isLoading} = useGetAllSocialsQuery({})
  console.log(data)
  return (
    <div>socials page</div>
  )
}

export default page