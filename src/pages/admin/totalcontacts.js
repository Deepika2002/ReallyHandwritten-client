import React from "react";
import AdminSidebarheader from "../../components/adminsidebarheader";
import { useSession, getSession } from "next-auth/react";
import useSWR from "swr";
import Totaldatatable from "../../components/admincomponents/totaldatatable";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

// Function to generate a CSV file from the contacts data
const generateCSV = (contacts) => {
  const headers = [
    "First Name",
    "Last Name",
    "Phone",
    "Email",
    "Address",
    "Signed Agent",
    "Status",
  ];
  // Create a CSV string with the contact information
  const csvContent = [
    headers.join(","),
    ...contacts.map(
      (contact) =>
        `${contact.firstname},${contact.lastname},${contact.phone},${
          contact.email
        },"${contact.address.replace(/"/g, '""')}",${contact.agent},${
          contact.status
        }`
    ),
  ].join("\n");

  // Create a Blob object from the CSV content
  const blob = new Blob([csvContent], { type: "text/csv" });

  // Generate a download link and simulate a click to trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "contacts.csv";
  link.click();

  // Cleanup the created URL object
  URL.revokeObjectURL(link.href);
};
export default function Allcontacts() {
  const { data: session, status } = useSession();

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const { data: contacts, error } = useSWR(`/api/contacts/contacts`, fetcher);
    console.log("data data",contacts)

  if (error) return <div>Error loading contacts.</div>;
  if (!contacts) return <div>Loading contacts...</div>;

  const handleExport = () => {
    generateCSV(contacts);
  };

  return (
    <>
      <AdminSidebarheader />
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            {/* Page title */}
            <div className="flex justify-between">
              <div className="px-4  dis sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  All Contacts
                </h1>
              </div>

              {/* Replace with your content */}
              <div className="px-4 sm:px-6 lg:px-8">
                <button
                  onClick={handleExport}
                  className="bg-red-900  text-white px-4 py-2 rounded-md"
                >
                  Export Contacts
                </button>
              </div>
              
            </div>
            <Totaldatatable contacts={contacts} />
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
