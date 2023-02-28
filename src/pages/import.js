import React from "react";
import Sidebarheader from "../components/sidebarheader";
import Csvtojson from "../components/csvtojson"
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const tabs = [
  { name: "Import CSV", dataTarget: "#ss", current: true },
  { name: "Manual Entry", dataTarget: "#st", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Import() {
  const [showme, setshowme] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [agent, setAgent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    let contacts = [{
      "firstname": firstName,
      "lastname": lastName,
      "phone": phone,
      "email": email,
      "address": address,
      "agent": agent
    }]
    console.log(JSON.stringify(contacts))


    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        body: JSON.stringify(
          contacts
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      console.log(response)

      setSuccess(true);
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setAgent('')

    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
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
                Import Contacts
              </h1>
            </div>

            {/* Replace with your content */}
            <div className="px-4 sm:px-6 lg:px-8">

              <div className="py-4">
                <div className="sm:hidden">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                  <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <nav
                    className="border-b border-gray-200 -mb-px flex space-x-8 mb-5"
                    aria-label="Tabs"
                  >
                    <button
                      className={classNames(
                        showme
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      )}
                      onClick={() => setshowme(true)}
                    >
                      Import Leads
                    </button>
                    <button
                      className={classNames(
                        !showme
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      )}
                      onClick={() => setshowme(false)}
                    >
                      Manual Entry
                    </button>
                  </nav>
                </div>

                {showme ? (
                  <div>
                    <Csvtojson />

                  </div>
                ) : (
                  <div className="w-full py-6">
                    <form action="#" method="POST" onSubmit={handleSubmit}>
                      <div className="border sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                              Personal Information
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Use a permanent address where you can recieve
                              mail.
                            </p>
                          </div>

                          <div className="grid grid-cols-9 gap-4">
                            <div className="col-span-6 sm:col-span-4">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium text-gray-700"

                              >
                                First name
                              </label>
                              <input
                                type="text"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium text-gray-700"

                              >
                                Last name
                              </label>
                              <input
                                type="text"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                name="phone"
                                id="phone"
                                autoComplete="phone"
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                              <label
                                htmlFor="email-address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Email address
                              </label>
                              <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                name="email-address"
                                id="email-address"
                                autoComplete="email"
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"

                              >
                                Address
                              </label>
                              <input
                                type="address"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                name="address"
                                id="address"
                                autoComplete="address"
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                              <label
                                htmlFor="agent"
                                className="block text-sm font-medium text-gray-700"

                              >
                                Signed Agent
                              </label>
                              <input
                                type="agent"
                                value={agent}
                                onChange={(event) => setAgent(event.target.value)}
                                name="agent"
                                id="agent"
                                autoComplete="agent"
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>


                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {isLoading ? 'Saving...' : 'Save'}
                          </button>

                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>

            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>

  );
}
