import React, { useState } from "react";
import { useRouter } from "next/router";
import Sidebarheader from "../components/sidebarheader";
import { useSession, getSession } from "next-auth/react";
import useSWR from "swr";
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
  const router = useRouter()
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const { data: contacts, error } = useSWR(`/api/contacts/contacts?userId=${session?.user?.id}`, fetcher);
    console.log("data data",contacts)

  if (error) return <div>Error loading contacts.</div>;
  if (!contacts) return <div>Loading contacts...</div>;

  const handleExport = () => {
    generateCSV(contacts);
  };

  return (
    <>
      <Sidebarheader />
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            {/* Page title */}
            <div className="flex justify-between">
              <div className="px-4  dis sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Contact Groups
                </h1>
              </div>
              
              
            </div>
            <Cruddatatable contacts={contacts} />
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
