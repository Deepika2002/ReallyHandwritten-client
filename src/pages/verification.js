import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, getSession } from 'next-auth/react';
import {
  EnvelopeIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    return {
      props: {
        session,
      },
    };
  }


export default function Verification() {

  const router = useRouter();

  const [verificationcode, setVerificationcode] = useState("");
  const [useremail, setUseremail] = useState("");
  const [usercode, setUsercode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  console.log("session verification", session);

useEffect(() => {
  if (session && session.user) {
    setVerificationcode(session.user.verificationCode);
    setUseremail(session.user.email);
  }
}, [session]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    console.log(parseInt(usercode), verificationcode)

    if (parseInt(usercode) === verificationcode) {
      try {
        const response = await fetch(
          // "https://lic.herokuapp.com/api/user/register",
          "/api/user/verification/",
          {
            method: "POST",            
            headers: {
              "Content-Type": "application/json",

            },
            body: JSON.stringify({
                email: useremail,
                verificationCode: usercode,
              }),
          }
        );
        const data = await response.json();

        if (response.ok && data.message) {
          setSuccess(data.message);
          setTimeout(() => {
            router.push("/stepform");
          }, 2000);
        }

        if (!response.ok && data.message) {
          setLoading(false);
          setError(data.message);
        }
      } catch (error) {
        setLoading(false);
        setError("Something went wrong.");
        console.error(error);
      }
    } else {
      setError("You've entered a wrong verification code.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-100">
        <div className="flex min-h-full flex-col justify-start py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
                  className="h-12 w-auto sm:h-12"
                  src="/assets/rhw-logo.png"
                  width="500"
                  height="500"
                  alt="Really handwritten"
                />
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Secure your Lead Identity Check account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-lg font-medium text-gray-900 text-center"
                  >
                    Insert the 6 digit verification code sent to {useremail}
                  </label>
                  <div className="relative mt-6">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <ShieldCheckIcon
                        className="h-8 w-8 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>

                    <input
                      id="verificationcode"
                      name="verificationcode"
                      type="text"
                      autoFocus={true}
                      value={usercode}
                      onChange={(event) => setUsercode(event.target.value)}
                      required
                      minLength="6"
                      maxLength="6"
                      placeholder="Enter 6 digit code here"
                      className="block text-center font-bold text-2xl w-full appearance-none rounded-md border border-gray-300 py-4 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 "
                    />
                  </div>
                </div>

                <div className="mt-4">
                  {error && (
                    <p className="flex text-sm text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 mr-2 "
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>

                      {error}
                    </p>
                  )}

                  {success && (
                    <p className="flex text-sm text-green-600">
                      <svg
                        className="w-5 h-5 mr-2 "
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        ></path>
                      </svg>

                      {success}
                    </p>
                  )}
                </div>

                <div>
                  {loading ? (
                    <button
                      type="submit"
                      disabled
                      className="flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white shadow-sm"
                    >
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Securing account..
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 "
                    >
                      Secure Account
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


