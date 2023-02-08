import React, { useEffect, useState } from 'react'
import Templates from './selectTemplates'

export default function
    LeadTable(valuesArray) {
        
    const [leadData, setLeadData] = useState([valuesArray])
    const [templatePopup, setTemplatePopup] = useState(false)
    return (
        <div>

            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    {/* Table Headers static text */}
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            First Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Last Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Mailing Address
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Phone Number
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Signed Agent
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Template
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>


                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {/* Table Data Logic */}
                                    {leadData[0].valuesArray.map((value, index) => {
                                        if (index !== 0 && index !== leadData[0].valuesArray.length - 1) {
                                            return (
                                                <tr key={index}>
                                                    
                                                    {value.map((val, i) => {
                                                        return <td key={i}>{val}</td>;

                                                    })}
                                                    <td  className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <a href="#" onClick={()=>setTemplatePopup(true)} className="text-indigo-600 hover:text-indigo-900">
                                                            Edit
                                                        </a>
                                                        
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className="inline-flex rounded-full bg-red-300 px-2 text-xs font-semibold leading-5 text-black">
                                                            Pending
                                                        </span>
                                                    </td>
                                                </tr>
                                                
                                            );

                                        }
                                        return null;
                                    })}
                                    

                                </tbody>
                            </table>
                            <Templates trigger={templatePopup} setTrigger={setTemplatePopup}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
