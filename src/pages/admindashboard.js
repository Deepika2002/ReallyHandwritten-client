import { useState } from 'react';
import Sidebarheader from '../components/sidebarheader';
import useSWR from 'swr';
import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const fetcher = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  };

  const { data: contacts, error } = useSWR('/api/contacts/', fetcher);

  // No of contacts in DB
  const totalContacts = contacts ? contacts.length : 0;

  if (error) return <div>Error loading data.</div>;
  if (!contacts) return <div>Loading data...</div>;

  const stats = [
    { name: 'Total Contacts', stat: totalContacts, href: '/adminpages/totalcontacts', index: 0 },
    { name: 'Send Gift Cards', stat: totalContacts, href: '/adminpages/sendcards', index: 1 },
    { name: 'Sent Gift Cards', stat: totalContacts, href: '/adminpages/sentcards', index: 2 },
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
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="py-4">
                <div>
                  {selectedComponent === null && (
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                      {stats.map((item) => (
                        <Link href={item.href} key={item.name}>
                            <div
                              key={item.name}
                              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                            >
                              <dt className="truncate text-sm font-medium text-gray-500">
                                {item.name}
                              </dt>
                              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                {item.stat}
                              </dd>
                            </div>
                        </Link>
                      ))}
                    </dl>
                  )}

                  
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </>
  );
}
