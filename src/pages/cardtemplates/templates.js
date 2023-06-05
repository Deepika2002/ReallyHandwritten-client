import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, getSession } from 'next-auth/react';

import Sidebarheader from "../../components/sidebarheader";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function CardTemplates() {
  const [userPreferences, setUserPreferences] = useState([]);
  const [editingPreference, setEditingPreference] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`/api/userpreferences/userpreferences?userId=${session?.user?.id}`);
      if (response.ok) {
        const preferences = await response.json();
        setUserPreferences(preferences);
      } else {
        throw new Error("Failed to fetch user preferences");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPreference = (preference) => {
    setEditingPreference(preference);
  };

  const handleUpdatePreferenceName = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/userpreferences/${editingPreference.id}`, {
        method: "PUT",
        body: JSON.stringify({ name: event.target.name.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setEditingPreference(null);
        fetchUserPreferences(); // Update the user preferences list after successful update
      } else {
        throw new Error("Failed to update preference name");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTemplate = () => {
    router.push("/stepform");
  };

  return (
    <div>
      <Sidebarheader />

      <div className="flex-col lg:pl-64 bg-white">
        <div className="flex-1 mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between space-x-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">My Card Templates</h2>
            <button
              onClick={handleCreateTemplate}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-900 hover:bg-red-1000 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Create Template
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {userPreferences.map((preference) => (
              <div key={preference.id} className="bg-gray-100 rounded-lg p-6">
                {editingPreference && editingPreference.id === preference.id ? (
                  <form onSubmit={handleUpdatePreferenceName}>
                    <input
                      type="text"
                      name="name"
                      defaultValue={preference.name}
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2 mb-2"
                      required
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingPreference(null)}
                        className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{preference.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{preference.selectCard}</p>
                    <div className="flex space-x-4">
                      <Link href={`/cardtemplates/${preference.id}`}>
                        <span className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-200 hover:bg-gray-300">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleEditPreference(preference)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-200 hover:bg-gray-300"
                      >
                        Edit Name
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
