import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {  Tab } from "@headlessui/react";
import Sidebarheader from "../../components/sidebarheader";

const card = [
  {
    name: "$4.47 - Classy Thank You Card",
    price: "$4.47",
    images: [
      {
        id: 1,
        src: "/assets/cardImgs/affordable/first.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 2,
        src: "/assets/cardImgs/affordable/second.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 3,
        src: "/assets/cardImgs/affordable/third.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 3,
        src: "/assets/cardImgs/affordable/forth.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      // More images...
    ],
  },
  {
    name: "$5.60 - Premium Gold Foil Pressed",
    price: "$5.60",
    images: [
      {
        id: 1,
        src: "/assets/cardImgs/premium/first.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 2,
        src: "/assets/cardImgs/premium/second.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 3,
        src: "/assets/cardImgs/premium/third.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 3,
        src: "/assets/cardImgs/premium/forth.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      // More images...
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Template() {
    const [preferenceData, setPreferenceData] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [welcomeInput, setWelcomeInput] = useState(null);
    const [addressClients, setaddressClients] = useState(null);
    const [endearingTerm, setendearingTerm] = useState(null);
    const [withoutName, setwithoutName] = useState(null);
    const [messageInput, setmessageInput] = useState(null); // Updated state

  
    const router = useRouter();
    const preferenceId = router.query.templateid;
  
    useEffect(() => {
      if (preferenceId) {
        fetchPreferenceData();
      }
    }, [preferenceId]);
    
    useEffect(() => {
        if (preferenceData) {
          setWelcomeInput(preferenceData.welcomeInput);
          setaddressClients(preferenceData.addressClients);
          setendearingTerm(preferenceData.endearingTerm);
          setwithoutName(preferenceData.withoutName);
          setmessageInput(preferenceData.messageInput);
        }
      }, [preferenceData]);
  
    const fetchPreferenceData = async () => {
      try {
        const response = await fetch(`/api/userpreferences/${preferenceId}`);
        if (response.ok) {
          const preference = await response.json();
          setPreferenceData(preference);
          setSelectedCard(preference.selectCard); // Set default value in state
        } else {
          throw new Error("Failed to fetch preference data");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    if (!preferenceData) {
      return <div>Loading...</div>;
    }
    const filteredCard = card.find((c) => c.name === selectedCard);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

       
    
        try {
          const response = await fetch(`/api/userpreferences/${preferenceId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                welcomeInput:welcomeInput,
                addressClients:addressClients,
                endearingTerm:endearingTerm,
                withoutName:withoutName,
                selectCard:selectedCard,
                messageInput:messageInput,
            }),
          });
    
          if (response.ok) {
            // Handle successful update
          } else {
            throw new Error("Failed to update preference data");
          }
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <>
      <Sidebarheader />
      <div className="bg-white lg:pl-64 ">
        <h1 className="text-2xl font-semibold text-gray-900 px-4 sm:px-6 lg:px-8 py-6">
          Template
        </h1>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex my-10 flex-col-reverse">
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {filteredCard &&
                    filteredCard.images.map((image) => (
                      <Tab
                        key={image.id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only">{image.name}</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img
                                src={image.src}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? "ring-indigo-500"
                                  : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {filteredCard &&
                  filteredCard.images.map((image) => (
                    <Tab.Panel key={image.id}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {preferenceData.name}
              </h1>
              <form className="mt-6" onSubmit={handleFormSubmit}>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        How would you like to address your client?
                      </label>
                      <div className="mt-2">
                        <select
                          id="welcomeInput"
                          name="welcomeInput"
                          autoComplete="welcomeInput"
                          onChange={(e) => setWelcomeInput(e.target.value)}
                          defaultValue={preferenceData.welcomeInput}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>First Name</option>
                          <option>First And Last Name</option>
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Would you like to include the title? (Mr. or Mrs.)
                      </label>
                      <div className="mt-2">
                        <select
                          id="addressClients"
                          name="addressClients"
                          autoComplete="addressClients"
                          onChange={(e) => setaddressClients(e.target.value)}
                          defaultValue={preferenceData.addressClients}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Which of the endearing term should we use?
                      </label>
                      <div className="mt-2">
                        <select
                          id="endearingTerm"
                          name="endearingTerm"
                          autoComplete="endearingTerm"
                          onChange={(e) => setendearingTerm(e.target.value)}
                          defaultValue={preferenceData.endearingTerm}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Dear</option>
                          <option>Hello</option>
                          <option>Hi</option>
                          <option>None</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        If a name isn't included, what should we use a default?
                      </label>
                      <div className="mt-2">
                        <select
                          id="withoutName"
                          name="withoutName"
                          autoComplete="withoutName"
                          onChange={(e) => setwithoutName(e.target.value)}
                          defaultValue={preferenceData.withoutName}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Client</option>
                          <option>Valued Client</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Now Choose a Card
                      </label>
                      <div className="mt-2">
                        <select
                          id="selectCard"
                          name="selectCard"
                          autoComplete="selectCard"
                          value={selectedCard}
  onChange={(e) => setSelectedCard(e.target.value)}
                          defaultValue={preferenceData.selectCard}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>$4.47 - Classy Thank You Card</option>
                          <option>$5.60 - Premium Gold Foil Pressed</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Now, let's write your letter. You have up to 150
                        characters. Make it count!
                      </label>
                      <div className="mt-2">
                        <textarea
                          rows="3"
                          cols="25"
                          name="messageInput"
                          id="messageInput"
                          defaultValue={preferenceData.messageInput}
                          onChange={(e) => setmessageInput(e.target.value)}
                          maxLength="150"
                          className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Message"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
