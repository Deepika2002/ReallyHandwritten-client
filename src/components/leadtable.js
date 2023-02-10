import React, { useEffect, useState } from 'react'
import Templates from './selectTemplates'
import useSWR from 'swr'
{/* Table Headers static text */ }
const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function LeadTable(valuesArray) {
    const { data, error } = useSWR('/api/getnotes', fetcher)
    console.log(data)
    const [leadData, setLeadData] = useState([])
    // useEffect(() => {
    //     setLeadData(data)
    //     // Your code to run on component mount and updates
    //     // Clean up function (optional)

    // }, [data]);
    // console.log(leadData)


    const [templatePopup, setTemplatePopup] = useState(false)
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Flows</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the flows in this webhook.

                    </p>
                </div>
                {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
                Add Flow
            </button>
            </div> */}
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            {/* <table>
                                <thead>
                                    <tr>
                                        {dataarray[0].body[0].map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataarray.map(row => (
                                        <tr key={row.id}>
                                            {row.body[1].map((cell, index) => (
                                                <td key={index}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
