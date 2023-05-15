import { useState } from "react";

export default function Cruddatatable(props) {
  const { contacts } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);

  function click(e) {
    e.preventDefault();
    setVisible(true);
  }

  const handleRowSelect = (email) => {
    if (selectedRows.includes(email)) {
      setSelectedRows(selectedRows.filter((row) => row !== email));
    } else {
      setSelectedRows([...selectedRows, email]);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(contacts.map((person) => person.email));
    } else {
      setSelectedRows([]);
    }
  };


  return (
    <div>



      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5  px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      <input type="checkbox" onChange={handleSelectAll} />
                    </th>


                    <th scope="col" className="py-3.5  px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      First Name
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                      Last Name
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 ">
                      Signed Agent
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(person.email)}
                          onChange={() => handleRowSelect(person.email)}
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.firstname}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 ">{person.lastname}</td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 ">{person.phone}</td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.email}</td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.address}</td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.agent}</td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          pending
                        </span>
                      </td>
                      
                      <td className="whitespace-nowrap py-4 px-3 text-sm  font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                          Edit
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Delete
                        </a>
                      </td>
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
