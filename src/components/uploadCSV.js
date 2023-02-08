import React, { useState } from "react";
import { useCSVReader, usePapaParse } from "react-papaparse";
import LeadTable from "./leadtable";

const rowsArray = [];
const valuesArray = [];


export default function UploadCSV() {
    const { CSVReader } = useCSVReader();
    const { readString } = usePapaParse();

    // State to store parsed data
    const [parsedData, setParsedData] = useState([]);
    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);
    //State to store the values
    const [values, setValues] = useState([]);
    // const [csvString, setcsvString] = useState("");



    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CSVReader


                onUploadAccepted={(results) => {


                    // Iterating data to get column name and their values
                    results.data.map((d) => {
                        rowsArray.push(Object.values(d));
                        valuesArray.push(Object.values(d));

                    });

                    // Parsed Data Response in array format
                    setParsedData(results.data);

                    // Filtered Column Names
                    setTableRows(rowsArray[0]);

                    // Filtered Values
                    setValues(valuesArray);

                }}
            >

                {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
                    <>
                        <div>
                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                                        <p className="mt-2 text-sm text-gray-700">
                                            A list of all the users in your account including their name, title, email and role.
                                        </p>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                        
                                        <button type="button" {...getRootProps()} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                                Browse file
                            </button>
                            <div>{acceptedFile && acceptedFile.name}</div>
                            <button {...getRemoveFileProps()}>Remove</button>
                                    </div>
                                </div>


                            </div>
                           
                        </div>
                        <ProgressBar />
                        <LeadTable valuesArray={valuesArray} />

                    </>
                )}
            </CSVReader>

        </div>
    );
}

