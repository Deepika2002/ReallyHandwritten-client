import React from "react";
import Sidebarheader from "../components/sidebarheader";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import UploadCSV from "../components/uploadCSV";
import NewTable from "../components/uploadCSV";

const tabs = [
  { name: "Import CSV", dataTarget: "#ss", current: true },
  { name: "Manual Entry", dataTarget: "#st", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Import() {
  const [showme, setshowme] = useState(true);
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

                <div>
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
                    <div className="w-full bg-white rounded-md shadow">
                      <UploadCSV />
                    </div>
                  ) : (
                    <div className="w-full">
                      <form action="#" method="POST">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
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

                            <div className="grid grid-cols-6 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  name="first-name"
                                  id="first-name"
                                  autoComplete="given-name"
                                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="last-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  name="last-name"
                                  id="last-name"
                                  autoComplete="family-name"
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
                                  type="text"
                                  name="email-address"
                                  id="email-address"
                                  autoComplete="email"
                                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="country"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Country
                                </label>
                                <select
                                  id="country"
                                  name="country"
                                  autoComplete="country-name"
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                  <option>United States</option>
                                  <option>Canada</option>
                                  <option>Mexico</option>
                                </select>
                              </div>

                              <div className="col-span-6">
                                <label
                                  htmlFor="street-address"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Street address
                                </label>
                                <input
                                  type="text"
                                  name="street-address"
                                  id="street-address"
                                  autoComplete="street-address"
                                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  id="city"
                                  autoComplete="address-level2"
                                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="region"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  State / Province
                                </label>
                                <input
                                  type="text"
                                  name="region"
                                  id="region"
                                  autoComplete="address-level1"
                                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="postal-code"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  ZIP / Postal code
                                </label>
                                <input
                                  type="text"
                                  name="postal-code"
                                  id="postal-code"
                                  autoComplete="postal-code"
                                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Save
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
