import React from 'react'
import SidebarHeader from '../components/sidebarHeader'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const tabs = [
    { name: 'Import CSV', href: '#', current: true },
    { name: 'Manual Entry', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Import() {
    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)
    return (
        <>
            <div>
                <SidebarHeader />

            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                            <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
                                                {tabs.map((tab, tabIdx) => (
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
                                                ))}
                                            </nav>
                                        </div>

                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                            onClick={() => setOpen(false)}
                                        >
                                            Deactivate
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
