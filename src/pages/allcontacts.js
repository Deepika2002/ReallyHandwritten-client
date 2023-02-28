import React from "react";
import Sidebarheader from "../components/sidebarheader";
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import Cruddatatable from "../components/cruddatatable";

export default function Allcontacts () {

  const fetcher = async (url) => {
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
  };


  const { data: contacts, error } = useSWR(`/api/contacts/`, fetcher);

  if (error) return <div>Error loading posts.</div>;
  if (!contacts) return <div>Loading posts...</div>;

  return (
    <>
        <Sidebarheader />
        <div className="flex flex-1 flex-col lg:pl-64">
          <main className="flex-1">
            <div className="py-6">
              
              {/* Page title */}
              <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  All Contacts
                </h1>
              </div>
              
              {/* Replace with your content */}
              <div className="px-4 sm:px-6 lg:px-8">
              <Cruddatatable contacts={contacts}/>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </>
  );

}
