import { Fragment, useState, useEffect } from "react";
import Sidebarheader from "../components/sidebarheader";
import { useSession, getSession } from "next-auth/react";
import useSWR from "swr";
import DonutChart from "../components/DonutChart";
import { useRouter } from "next/router";
import {
  ExclamationCircleIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/login");
    }
  }, [status]);

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const { data: contacts, error } = useSWR(`/api/contacts/contacts?userId=${session?.user?.id}`, fetcher);

  // if (error) return <div>Error loading contacts.</div>;
  // if (!contacts) return <div>Loading contacts...</div>;

  // No of contacts in DB
  const userContacts = contacts?.filter(
    (contact) => contact.userId === session?.user?.id
  );
  //Calculate the length of contacts
  const totalContacts = userContacts ? userContacts.length : 0;
  // Calculate the length of contacts with status "Sent"
  const totalCardsSent = userContacts
    ? userContacts.filter((contact) => contact.status === "Sent").length
    : 0;

  // Calculate the length of contacts with status "Pending", null, or empty
  const pending = userContacts
    ? userContacts.filter(
        (contact) =>
          !contact.status ||
          contact.status === "Pending" ||
          contact.status === "pending"
      ).length
    : 0;

  const stats = [
    { name: "Total Contacts", stat: totalContacts },
    { name: "Gift Cards Sent", stat: totalCardsSent },
    { name: "Pending", stat: pending },
  ];

  return (
    <>
      <Sidebarheader />
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>

            {error ? (
              <div className="flex items-center justify-start bg-red-50 rounded-md p-2">
                <div>
                  <ExclamationCircleIcon
                    className="w-5 h-5 mr-2 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <p className="flex text-sm text-red-600">{error}</p>
              </div>
            ) : (
              <div className=" px-4 sm:px-6 lg:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                {contacts ? (
                  <div>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                      {stats.map((item) => (
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
                      ))}
                    </dl>
                    <DonutChart
                      totalContacts={totalContacts}
                      totalCardsSent={totalCardsSent}
                      pending={pending}
                    />
                  </div>
                ):(
                  <p>loading contacts...</p>
                )}
                </div>
                {/* /End replace */}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
