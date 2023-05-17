import React from 'react';
import Sidebarheader from '../components/sidebarheader';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log("session contacts", session);

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };

  const { data: contacts, error } = useSWR(`/api/contacts`, fetcher);

  if (error) return <div>Error loading contacts.</div>;
  if (!contacts) return <div>Loading contacts...</div>;
  // No of contacts in DB
  const userContacts = contacts.filter((contact) => contact.userId === session?.user?.id);
  const totalContacts = userContacts ? userContacts.length : 0;

  const stats = [
    { name: 'Total Contacts', stat: totalContacts },
    { name: 'Gift Cards Sent', stat: '58.16%' },
    { name: 'Pending', stat: '24.57%' },
  ];

  return (
    <>
      <Sidebarheader />
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className=" px-4 sm:px-6 lg:px-8">
              {/* Replace with your content */}
              <div className="py-4">
                <div>
                  
                  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {stats.map((item) => (
                      <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
