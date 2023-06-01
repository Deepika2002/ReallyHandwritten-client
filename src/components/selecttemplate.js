
import { Fragment, useState, useEffect } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useSession, getSession } from 'next-auth/react';

import Link from 'next/link'

const product = {
  name: 'Everyday Ruck Snack',
  price: '$220',
  rating: 3.9,
  href: '#',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-03-detail.jpg',
  imageAlt: 'Interior of light green canvas bag with padded laptop sleeve and internal organization pouch.',
  sizes: [
    { name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
    { name: '20L', description: 'Enough room for a serious amount of snacks.' },
  ],
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    return {
      props: {
        session,
      },
    };
  }


export default function SelectTemplate() {
  const [open, setOpen] = useState(false)
  const [userPreferences, setUserPreferences] = useState([]);
const [editingPreference, setEditingPreference] = useState(null);
const { data: session } = useSession();
const router = useRouter();

useEffect(() => {
  fetchUserPreferences();
}, []);

const fetchUserPreferences = async () => {
  try {
    const response = await fetch("/api/userpreferences/userpreferences");
    if (response.ok) {
      const preferences = await response.json();
      setUserPreferences(preferences);
    } else {
      throw new Error("Failed to fetch user preferences");
    }
  } catch (error) {
    console.error(error);
  }
};

const handleEditPreference = (preference) => {
  setEditingPreference(preference);
};

const handleUpdatePreferenceName = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(`/api/userpreferences/${editingPreference.id}`, {
      method: "PUT",
      body: JSON.stringify({ name: event.target.name.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setEditingPreference(null);
      fetchUserPreferences(); // Update the user preferences list after successful update
    } else {
      throw new Error("Failed to update preference name");
    }
  } catch (error) {
    console.error(error);
  }
};

const handleCreateTemplate = () => {
  router.push("/stepform");
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

  return (
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
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="flex-col lg:pl-64 bg-white">
        <div className="flex-1 mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between space-x-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">My Card Templates</h2>
            <button
              onClick={handleCreateTemplate}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-900 hover:bg-red-1000 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Create Template
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {userPreferences.map((preference) => (
              <div key={preference.id} className="bg-gray-100 rounded-lg p-6">
                {editingPreference && editingPreference.id === preference.id ? (
                  <form onSubmit={handleUpdatePreferenceName}>
                    <input
                      type="text"
                      name="name"
                      defaultValue={preference.name}
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2 mb-2"
                      required
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingPreference(null)}
                        className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{preference.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{preference.selectCard}</p>
                    <div className="flex space-x-4">
                      <Link href={`/cardtemplates/${preference.id}`}>
                        <span className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-200 hover:bg-gray-300">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleEditPreference(preference)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-200 hover:bg-gray-300"
                      >
                        Edit Name
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
