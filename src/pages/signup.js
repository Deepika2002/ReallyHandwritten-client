import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(session, status);
  const loading = status === "loading";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isloading, setLoading] = useState(false);
  const [providers, setproviders] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    let userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/user/userapi/", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok && data.message) {
        setSuccess(data.message);
        signIn("credentials", { redirect: false, email, password });
        router.push({
          pathname: "/verification",
          query: userData,
        });
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
  };

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);

  if (status === "authenticated") {
    router.push("/verification");
  }

  return (
    <>
      <div className="h-screen bg-gray-100">
        <div className="flex min-h-full flex-col justify-start py-10 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
              className="mx-auto h-26 w-auto"
              src="/assets/rhw-logo.png"
              width="1000"
              height="1000"
              alt="Really Handwritten"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <UserIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>

                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      placeholder="Jane Smith"
                      className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-red-800 focus:outline-none focus:ring-red-900 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="relative mt-1 ">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <EnvelopeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-10 py-2 placeholder-gray-400 shadow-sm focus:border-red-800 focus:outline-none focus:ring-red-900 sm:text-sm"
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
                  <div className="mt-1 relative ">
                    <input
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      minLength="8"
                      maxLength="20"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-800 focus:outline-none focus:ring-red-900 sm:text-sm"
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

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative ">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="current-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      minLength="8"
                      maxLength="20"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-800 focus:outline-none focus:ring-red-900 sm:text-sm"
                    />
                    <div className=" absolute inset-y-0 right-0 flex items-center pr-3">
                      <div
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
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
                </div>

                <div>
                  {loading ? (
                    <button
                      type="submit"
                      disabled
                      className="flex w-full justify-center rounded-md border border-transparent bg-red-800 py-2 px-4 text-sm font-medium text-white shadow-sm"
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
                      Creating an account..
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-red-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                    >
                      Register
                    </button>
                  )}
                </div>
              </form>

             
            </div>

            <div className="mt-5 flex justify-center items-center">
              <p className="text-sm">Already have an account?</p>
              <Link
                href="/login"
                className="underline-offset-2 decoration-2 underline font-medium text-red-800 hover:text-red-900 ml-2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
