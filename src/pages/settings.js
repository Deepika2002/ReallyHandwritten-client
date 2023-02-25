import React from 'react'
import Sidebarheader from '../components/sidebarHeader'

export default function Settings() {
  return (
    <>
    <Sidebarheader/>
    <div className="flex flex-1 flex-col lg:pl-64">
      <main className="flex-1">
            <div className="py-6">
              <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              </div>
              <div className=" px-4 sm:px-6 lg:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
    </div>
    </>
  )
}
