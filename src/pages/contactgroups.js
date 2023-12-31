import React, { useState } from "react";
import { useRouter } from "next/router";
import Sidebarheader from "../components/sidebarheader";
import { useSession, getSession } from "next-auth/react";
import useSWR from "swr";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import SelectTemplate from "../components/selecttemplate";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function AllContacts() {
  const { data: session, status } = useSession();
  console.log("session",session)
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSelectTemplate, setShowSelectTemplate] = useState(false); // State variable to control rendering of SelectTemplate
  const [selectedPreferenceId, setSelectedPreferenceId] = useState(null);
  const router = useRouter();

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const { data: contacts, error } = useSWR(`/api/contacts/contacts?userId=${session?.user?.id}`, fetcher);

  if (error) return <div>Error loading contacts.</div>;
  if (!contacts) return <div>Loading contacts...</div>;

  const userContacts = {};

  contacts.forEach((contact) => {
    const date = contact.dateOfImport;
    if (!userContacts[date]) {
      userContacts[date] = {
        contacts: [],
        count: 0,
        ids: [],
      };
    }
    userContacts[date].contacts.push(contact);
    userContacts[date].count++;
    userContacts[date].ids.push(contact.id)
  });

  

  console.log(userContacts)



  const handleFolderClick = (date, event) => {
    if (!event.target.classList.contains("stepform-link")) {
      setSelectedDate(date);
      router.push(`/datecontacts/${date}`);
    }
  };
  

  const handleChooseCard = (date) => {
    setSelectedDate(date);
    setShowSelectTemplate(true); // Set the state variable to true when the user chooses a card
  };
  
  const updateContacts = async (preferenceId) => {
    try {
      const selectedContacts = userContacts[selectedDate];
      console.log(selectedDate)
      if (!selectedContacts) {
        console.error(`No contacts found for date ${selectedDate}`);
        return;
      }
      
      const contactIds = selectedContacts.ids;
      
      for (let i = 0; i < contactIds.length; i++) {
        const contactId = contactIds[i];
        
        // Update the contact with the preferenceId
        const updatedContact = {
          ...selectedContacts.contacts[i],
          userpreferenceid: preferenceId,
        };
    
        const url = `/api/contacts/${contactId}`;
    
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        });
    
        if (response.ok) {
          console.log(`Contact ${contactId} updated successfully`);
        } else {
          console.error(`Failed to update contact ${contactId}`);
        }
      }
    } catch (error) {
      console.error("Failed to update contacts:", error);
    }
  };

  const handleCloseSelectTemplate = () => {
    setShowSelectTemplate(false); // Update the state variable to false when the SelectTemplate is closed
    if (selectedPreferenceId) {
      updateContacts(selectedPreferenceId); // Call the function to update the contacts with the preference ID
    }
  };
  const handlePreferenceSelect = (preferenceId) => {
    setSelectedPreferenceId(preferenceId);
   
    console.log("Selected preference id:", preferenceId);
  };


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
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                {Object.entries(userContacts).map(
                  ([date, { contacts, count }]) => (
                    <div key={date} className="my-4">
                      <div
                        className="overflow-hidden rounded-xl border border-gray-200 cursor-pointer"
                        onClick={(e) => handleFolderClick(date, e)}
                      >
                        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                          <div className="text-sm font-medium leading-6 text-gray-900">
                            <p>
                              Added on {date.split("T")[0]} at{" "}
                              {date.split("T")[1].split(".")[0]}
                            </p>
                          </div>
                          <Menu as="div" className="relative ml-auto">
                            <Menu.Button
                              className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="sr-only">Open options</span>
                              <EllipsisHorizontalIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute divide-y divide-gray-100 right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-50" : "",
                                        "block px-3 py-1 text-sm leading-6 text-gray-900 stepform-link"
                                      )}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleChooseCard(date); // Call the handleChooseCard function
                                      }}
                                    >
                                      Choose Card to Send
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-50" : "",
                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                      )}
                                    >
                                      Edit
                                    </a>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                          <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-gray-500">Date of Import</dt>
                            <dd className="text-gray-700">
                              <time dateTime={date.split("T")[0]}>
                                {date.split("T")[0]}
                              </time>
                            </dd>
                          </div>

                          <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-gray-500">Total Contacts</dt>
                            <dd className="text-gray-700">{count}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            {/* /End replace */}

            {/* Render the SelectTemplate component */}
            {showSelectTemplate && (
              <SelectTemplate
                openBox={showSelectTemplate}
                onClose={handleCloseSelectTemplate}
                onPreferenceSelect={handlePreferenceSelect}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
