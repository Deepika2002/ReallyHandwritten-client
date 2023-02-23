import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function NewTable() {
  const { data, error } = useSWR("/api/getnotes", fetcher);

  console.log(data);
//   if (data && data[0]) {
//     const result = data[0].body.map((subArray) =>
//       subArray.map((innerArray) => innerArray.join(', '))
//     );
//     // ... do something with the result
//   } else {
//     // handle the case when data is undefined
//   }

//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;

  // return (
  //   <div>
  //     {data?.map((flow) => (
  //       <li key={flow.id}>{flow.firstname}</li>
  //     ))}
  //   </div>
  // );

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
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-gray-900 ">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-gray-900">
                      NAME
                    </th>
                    <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-gray-900">
                      URL
                    </th>
                    <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-gray-900">
                      CREATED ON
                    </th>
                    <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-gray-900">
                      STATUS
                    </th>
                    
                    
                  </tr>
                </thead>
                {data ? (
                <tbody>
                {data?.[0]?.body?.slice(1).map((row, index) => (
   <tr key={index}>
      {row[0].map((cell, index) => (
         <td key={index}>{cell}</td>
      ))}
   </tr>
))}
      </tbody>) : ""}
              </table>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}