import React, { useState } from "react";
import { useCSVReader, usePapaParse } from "react-papaparse";

export default function CSVReader() {
  const { CSVReader } = useCSVReader();
  const { readString } = usePapaParse();

  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  //State to store the values
  const [values, setValues] = useState([]);
  const [csvString, setcsvString] = useState("");

  

  return (
    <>
      <CSVReader
        
        onUploadAccepted={(results) => {
          

          const cvstr = `${results}`;

          readString(cvstr, {
            header: true,
            worker: true,
            complete: (rresults) => {
              console.log(rresults);
            },
          });

          // console.log(results);
          
          const rowsArray = [];
          const valuesArray = [];

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
              <button type="button" {...getRootProps()}>
                Browse file
              </button>
              <div>{acceptedFile && acceptedFile.name}</div>
              <button {...getRemoveFileProps()}>Remove</button>
            </div>
            <ProgressBar />
          </>
        )}
      </CSVReader>

      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
