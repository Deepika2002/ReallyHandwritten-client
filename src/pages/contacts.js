import React from 'react'
import SidebarHeader from '../components/sidebarHeader'
import UploadCSV from '../components/uploadCSV'

export default function Contacts() {
  return (
    <div>
         <SidebarHeader />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <UploadCSV />
        

      </main>
    </div>
  )
}
