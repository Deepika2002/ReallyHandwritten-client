
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from "next/router";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";
import jwt from "jsonwebtoken"

export default function Login() {
  
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ierror, setierror] = useState("");
  const [loading, setLoading] = useState(false);


  // login functionality
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let userData = {
      email: email,
      password: password,
    };
    try {
      //const response = await fetch("https://lic.herokuapp.com/api/user/login", {
      const response = await fetch("http://localhost:3000/api/user/login/", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      
      if(response.ok && data.token ){
        localStorage.setItem("token", data.token)
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } 



      if (data.message) {
        setLoading(false);
        setierror(data.message);
      } 
    } catch (ierror) {
      setLoading(false);
      setierror("Something went wrong.");
      console.error(ierror);
    }
  };

  // useEffect(() => {
  //   const setTheProviders = async () => {
  //     const setupProviders = await getProviders();
  //     setproviders(setupProviders);
  //   };
  //   setTheProviders();
  // }, []);

  // if (status === "authenticated") {
  //   router.push("/dashboard");
  // }
  return (
    <div className="auth-btn">
      <div className="h-screen bg-gray-100">
        <div className="flex min-h-full flex-col justify-start py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <EnvelopeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="email"
                      fullname="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      minLength="8"
                      maxLength="20"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    />

                    <div className=" absolute inset-y-0 right-0 flex items-center pr-3">
                      <div onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-gray-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                              clipRule="evenodd"
                            />
                            <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-gray-400"
                          >
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-sm text-gray-900 hover:text-gray-600"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  {ierror && (
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

                      {ierror}
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
                      Logging in..
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      Login
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-5">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      or
                    </span>
                  </div>
                </div>

                <div className="mt-5 w-full mx-auto">
                <button onClick={() => signIn(providers.google.id)} className='relative inline-flex w-full justify-center items-center rounded-md border py-2 px-4 text-sm font-medium text-white shadow-sm bg-blue-500'>
                    <div className="absolute left-2 rounded-sm bg-white p-1">
                      <svg height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" width="15" xmlns="http://www.w3.org/2000/svg"><title>Google Logo</title><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></svg>
                    </div>
                    Continue with Google
                  </button>
                </div>

              </div>

            </div>
            <div className="mt-5 flex justify-center items-center">
              <p className="text-sm">Don&apos;t have an account?</p>
              <Link href="/signup" className="underline-offset-2 decoration-2 underline font-medium text-indigo-600 hover:text-indigo-500 ml-2">Register</Link>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};
