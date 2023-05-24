import Image from 'next/image';
import React, { useState } from 'react';
import Sidebarheader from '../sidebarheader';

const nameMethods = [
    { id: 'Dear', title: 'Dear' },
    { id: 'Hello', title: 'Hello' },
    { id: 'Hi', title: 'Hi' },
    { id: 'Other', title: 'Other' },
    { id: 'None', title: 'None' }
];

export default function EndearingTerm({ handleBack, handleNext, formValues, onChange }) {





    const handleSubmit = (event) => {
        event.preventDefault();
        handleNext();
      };
  return (
    <>
    <Sidebarheader/>
    <h1 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900 lg:pl-64 sm:text-5xl">
                Welcome to Really Handwritten.{' '}
        </h1>
      <div className="lg:pl-64 overflow-hidden bg-white">
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
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-24">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                  <p className="mt-8 text-2xl font-semibold leading-8 text-gray-900">Amazing!
</p>
                  <div className="mt-10">
                      <label className="text-base font-semibold text-gray-900">Which of the endearing term should we use?</label>
                      <fieldset className="mt-4">
                            <legend className="sr-only">Name method</legend>
                            <div className="space-y-4">
                                <form onSubmit={handleSubmit}>
                                    {nameMethods.map((method) => (
                                        <div key={method.id} className="flex items-center">
                                            <input
                                                id={method.id}
                                                name="endearingTerm"
                                                type="radio"
                                                value={method.id}
                                                checked={formValues.endearingTerm===method.id }
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
                              src="/assets/three_card.jpg"
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
      </>
  )
}


 



