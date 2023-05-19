import React from "react";
import Sidebarheader from "../components/sidebarheader";
import { useSession, getSession } from 'next-auth/react';
import useSWR from 'swr';
import Cruddatatable from "../components/cruddatatable";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function Allcontacts() {
  const { data: session, status } = useSession();

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };

  const { data: contacts, error } = useSWR(`/api/contacts`, fetcher);
  // console.log(contacts)

  if (error) return <div>Error loading contacts.</div>;
  if (!contacts) return <div>Loading contacts...</div>;

  const userContacts = contacts.filter((contact) => contact.userId === session?.user?.id);
  

  return (
    <>
      <Sidebarheader />
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            {/* Page title */}
            <div className="px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">All Contacts</h1>
            </div>

            {/* Replace with your content */}
            <div className="px-4 sm:px-6 lg:px-8">
              <Cruddatatable contacts={userContacts} />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
