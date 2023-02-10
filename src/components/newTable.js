import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function NewTable() {
  const { data, error } = useSWR("/api/getnotes", fetcher);

  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((flow) => (
                    <tr key={flow.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{flow.id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {flow.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{flow.url}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{flow.createdAt}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{flow.published}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}