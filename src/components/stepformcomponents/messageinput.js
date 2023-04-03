import Image from 'next/image';
import React, { useState } from 'react';


export default function MessageInput({ handleBack, handleSubmit,formValues, onChange }) {






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
                    <p className="mt-8 text-2xl leading-8 font-semibold text-gray-900">Ok!
                    </p>
                    <div className="mt-10">
                        <label className="text-base font-semibold text-gray-900">Now, let's write your letter. You have up to 150 characters. Make it count!</label>
                        <fieldset className="mt-4">
                            <legend className="sr-only">Name method</legend>
                            <div className="space-y-4">
                                <form onSubmit={handleSubmit}>

                                    <div className="flex items-center">
                                        <textarea
                                            rows="3"
                                            cols="25"
                                            name="messageInput"
                                            value={formValues.messageInput}
                                            id="messageInput"
                                            onChange={onChange}
                                            maxLength="150"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Message"
                                        />
                                    </div>

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
                                                Submit
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
                              src="/assets/five_card.jpg"
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








