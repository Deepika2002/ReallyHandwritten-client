import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Templates(props) {
    const [open, setOpen] = useState(true)


    return (props.trigger)?(
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all max-w-screen-md min-h-full max-h-96 max-w-xl sm:p-6">
                                <div>
                                    <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                                        <div className="sm:flex sm:items-baseline sm:justify-between">
                                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Choose A Template</h2>
                                        
                                        </div>
                                        <button
                                        type="button"
                                        className="inline-flex w-xs justify-end rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={()=>props.setTrigger(false)}
                                    >
                                        Close
                                    </button>


                                        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                                            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                                                <img
                                                    src="https://tailwindui.com/img/ecommerce-images/home-page-03-featured-category.jpg"
                                                    alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                                                    className="object-cover object-center group-hover:opacity-75"
                                                />
                                                <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                                                <div className="flex items-end p-6">
                                                    <div>
                                                        <h3 className="font-semibold text-white">
                                                            <a href="#">
                                                                <span className="absolute inset-0" />
                                                                New Arrivals
                                                            </a>
                                                        </h3>
                                                        <p aria-hidden="true" className="mt-1 text-sm text-white">
                                                            Shop now
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                                                <img
                                                    src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                                                    alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                                                    className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                                                />
                                                <div
                                                    aria-hidden="true"
                                                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                                                />
                                                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                                                    <div>
                                                        <h3 className="font-semibold text-white">
                                                            <a href="#">
                                                                <span className="absolute inset-0" />
                                                                Accessories
                                                            </a>
                                                        </h3>
                                                        <p aria-hidden="true" className="mt-1 text-sm text-white">
                                                            Shop now
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                                                <img
                                                    src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                                                    alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                                                    className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                                                />
                                                <div
                                                    aria-hidden="true"
                                                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                                                />
                                                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                                                    <div>
                                                        <h3 className="font-semibold text-white">
                                                            <a href="#">
                                                                <span className="absolute inset-0" />
                                                                Workspace
                                                            </a>
                                                        </h3>
                                                        <p aria-hidden="true" className="mt-1 text-sm text-white">
                                                            Shop now
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 sm:hidden">
                                            <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                                Browse all categories
                                                <span aria-hidden="true"> &rarr;</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Go back to dashboard
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    ):"";
}
