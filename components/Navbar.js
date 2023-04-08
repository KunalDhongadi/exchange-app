import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import dynamic from "next/dynamic";
import ModalContext from "../context/modalContext";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthModal = dynamic(() => import("./UserAuthModal"), { ssr: false });

const Navbar = () => {

  const {userData, setUserData} = useContext(UserContext);

  // useEffect(() => {
    
  //   console.log("useEffect- get user from context navbar.js");
  // }, []);
  
  // console.log("badlapur", userData);

  const { showModal, setShowModal, isLogin, setIsLogin } =
    useContext(ModalContext);

  const toggleLoginModal = () => {
    setShowModal(true);
    setIsLogin(true);
  };

  const toggleSignupModal = () => {
    setShowModal(true);
    setIsLogin(false);
  };


  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUserData(null);
  }

  const router = useRouter()
  const { pathname } = router;
  
  // console.log("pageUrl", pathname);

  if(userData === undefined){
    return null;
  }
  

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                {/* Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
           */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <h1 className="ms-3 text-white font-semibold text-lg">
                  Coindeck
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex justify-between w-full">
                <div className="flex space-x-4">
                  <Link
                    href="/explore"
                    className={`text-white rounded-md px-3 py-2 text-sm font-medium ${pathname === "/explore" ? "bg-gray-900" : "hover:bg-gray-700" }`}
                    aria-current={pathname === "/explore" ? "page" : undefined}
                  >
                    Explore
                  </Link>
                  {userData && (
                    <>
                      <Link
                        href="/portfolio"
                        className={`text-white rounded-md px-3 py-2 text-sm font-medium ${pathname === "/portfolio" ? "bg-gray-900" : "hover:bg-gray-700" }`}
                        aria-current={pathname === "/portfolio" ? "page" : undefined}
                      >
                        Portfolio
                      </Link>

                      <Link
                        href="/transactions"
                        className={`text-white rounded-md px-3 py-2 text-sm font-medium ${pathname === "/transactions" ? "bg-gray-900" : "hover:bg-gray-700" }`}
                        aria-current={pathname === "transactions" ? "page" : undefined}
                      >
                        Transactions
                      </Link>
                    </>
                  )}
                </div>

                {userData ?
                
                  <div className="flex space-x-4">
                    <button
                      id="dropdownAvatarNameButton"
                      data-dropdown-toggle="dropdownAvatarName"
                      className="flex items-center border-2 border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white rounded-full px-3 py-1 text-sm font-medium"
                      type="button"
                    >
                      <span className="sr-only">Open user menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-1.5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                      {/* <svg
                        className="w-4 h-4 mx-1.5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg> */}
                    </button>

                    <div
                      id="dropdownAvatarName"
                      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div className="font-medium ">{userData.name}</div>
                        <div className="truncate">{userData.email}</div>
                      </div>
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                      >
                        <li>
                          <p
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Deposit
                          </p>
                        </li>
                      </ul>
                      <div className="py-2">
                        <p
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm w-100 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </p>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="flex space-x-4">
                    <button
                      className="border border-gray-300 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      onClick={toggleLoginModal}
                    >
                      Login
                    </button>

                    <button
                      className="bg-red-500 text-white hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      onClick={toggleSignupModal}
                    >
                      Signup
                    </button>
                  </div>
                }
                
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal />
    </>
  );
};

export default Navbar;
