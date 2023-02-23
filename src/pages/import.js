import React from "react";
import SidebarHeader from "../components/sidebarHeader";
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
  const [open, setOpen] = useState(true);
  const [showme, setshowme] = useState(true);
  const cancelButtonRef = useRef(null);
  return (
    <>
      <div>
        <SidebarHeader />
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
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
                        className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                        aria-label="Tabs"
                      >
                        {/* {tabs.map((tab, tabIdx) => (
                                                    <a
                                                        key={tab.name}
                                                        href={tab.href}
                                                        className={classNames(
                                                            tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                                            tabIdx === 0 ? 'rounded-l-lg' : '',
                                                            tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                                                            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                                                        )}
                                                        aria-current={tab.current ? 'page' : undefined}
                                                    >
                                                        <span>{tab.name}</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                tab.current ? 'bg-indigo-500' : 'bg-transparent',
                                                                'absolute inset-x-0 bottom-0 h-0.5'
                                                            )}
                                                        />
                                                    </a>
                                                ))} */}
                        <button onClick={() => setshowme(true)}>
                          Import Leads
                        </button>
                        <button onClick={() => setshowme(false)}>
                          Manual Entry
                        </button>
                      </nav>
                    </div>
                  </div>

                  {showme ? (
                    <UploadCSV/>
                  ) : (
                    <div className="mt-10 divide-y divide-gray-200">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Profile
                        </h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                          This information will be displayed publicly so be
                          careful what you share.
                        </p>
                      </div>
                      <div className="mt-6">
                        <dl className="divide-y divide-gray-200">
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Name
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">Chelsea Hagon</span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Photo
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </span>
                              <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                                <span
                                  className="text-gray-300"
                                  aria-hidden="true"
                                >
                                  |
                                </span>
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Remove
                                </button>
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Email
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">
                                chelsea.hagon@example.com
                              </span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Job title
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">
                                Human Resources Manager
                              </span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
