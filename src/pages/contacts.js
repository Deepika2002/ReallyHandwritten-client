import React from 'react'
import SidebarHeader from '../components/sidebarHeader'
import UploadCSV from '../components/uploadCSV'

export default function Contacts() {
  return (
    <div>
         <SidebarHeader />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <UploadCSV />
        

      </div>
    </div>
  )
}
