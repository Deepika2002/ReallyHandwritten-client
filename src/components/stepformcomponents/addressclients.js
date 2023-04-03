import Image from 'next/image';
import React, { useState } from 'react';

const nameMethods = [
    { id: 'Yes', title: 'Yes' },
    { id: 'No', title: 'No' },
];

export default function AddressClients({ handleBack, handleNext, formValues, onChange }) {


    

    const handleSubmit = (event) => {
        event.preventDefault();
       
        handleNext();
      };
  return (
      <div className="relative isolate overflow-hidden bg-white">
          <svg
              className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              aria-hidden="true"
          >
              <defs>  
                  <pattern
                      id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                      width={200}
                      height={200}
                      x="50%"
                      y={-1}
                      patternUnits="userSpaceOnUse"
                  >
                      <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
              </defs>
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
          </svg>
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                  <p className="mt-8 text-2xl leading-8 font-semibold text-gray-900">Great!
</p>
                  <div className="mt-10">
                      <label className="text-base font-semibold text-gray-900">Would you like to include the title? (Mr. or Mrs.)</label>
                      <fieldset className="mt-4">
                            <legend className="sr-only">Name method</legend>
                            <div className="space-y-4">
                                <form onSubmit={handleSubmit}>
                                    {nameMethods.map((method) => (
                                        <div key={method.id} className="flex items-center">
                                            <input
                                                id={method.id}
                                                name="addressClients"
                                                type="radio"
                                                value={method.id}
                                                checked={formValues.addressClients===method.id}
                                                onChange={onChange}
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor={method.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                                {method.title}
                                            </label>
                                        </div>
                                    ))}
                                    <div className="pt-4 flex gap-x-6">
                                        <div>
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    handleBack();
                                                }}
                                                className="rounded-md bg-indigo-600 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Back
                                            </button>
                                        </div>
                                        <div>
                                        <button
            type="submit"
           
            className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Next
          </button>
                                        </div>
                                    </div>
                                </form>    
                            </div>
                        </fieldset>
                  </div>
              </div>
              <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                  <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                      <div>
                          <Image
                              src="/assets/two_card.jpg"
                              alt="App screenshot"
                              width={400}
                              height={400}
                              className=" aspect-1 w-full max-w-lg rounded-2xl object-cover  lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 "
                          />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}



