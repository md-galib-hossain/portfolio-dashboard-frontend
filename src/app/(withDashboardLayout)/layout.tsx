"use client"
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer"
import React from "react"
import { useRouter } from "next/navigation"

const DashboardLayout = ({children} : {children : React.ReactNode}) => {
  
  return (
    <DashboardDrawer>{children}</DashboardDrawer>
  )
}

export default DashboardLayout