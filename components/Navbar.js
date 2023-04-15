import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import dynamic from "next/dynamic";
import ModalContext from "../context/modalContext";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthModal = dynamic(() => import("./UserAuthModal"), { ssr: false });

const Navbar = () => {
  const { userData, setUserData, authtoken, setAuthtoken } =
    useContext(UserContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // useEffect(() => {

  //   console.log("useEffect- get user from context navbar.js");
  // }, []);

  // console.log("user", userData);

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
    setAuthtoken(null);
  };

  const router = useRouter();
  const { pathname } = router;

  // console.log("pageUrl", pathname);

  // if(userData === undefined){
  //   return null;
  // }

  const onMenuExpand = () => {
    setShowMenu(true);
  };

  const onMenuClose = () => {
    setShowMenu(false);
  };

  const onDropDownBtnClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700"
                aria-controls="mobile-menu"
                // aria-expanded={showMenu}
              >
                <span className="sr-only">Open main menu</span>
                {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className={`${!showMenu ? "block" : "hidden"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  onClick={onMenuExpand}
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
                  className={`${showMenu ? "block" : "hidden"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  onClick={onMenuClose}
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
                  src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600"
                  alt="Your Company"
                />
                <Link href="/explore" className="flex items-center">
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600"
                    alt="Your Company"
                  />
                  <h1 className="ms-3 text-white font-semibold text-lg">
                    Coindeck
                  </h1>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex justify-between w-full">
                <div className="flex space-x-4">
                  <Link
                    href="/explore"
                    className={`text-white rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === "/explore"
                        ? "bg-gray-900"
                        : "hover:bg-gray-700"
                    }`}
                    aria-current={pathname === "/explore" ? "page" : undefined}
                  >
                    Explore
                  </Link>
                  {userData && (
                    <>
                      <Link
                        href="/portfolio"
                        className={`text-white rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === "/portfolio"
                            ? "bg-gray-900"
                            : "hover:bg-gray-700"
                        }`}
                        aria-current={
                          pathname === "/portfolio" ? "page" : undefined
                        }
                      >
                        Portfolio
                      </Link>

                      <Link
                        href="/transactions"
                        className={`text-white rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === "/transactions"
                            ? "bg-gray-900"
                            : "hover:bg-gray-700"
                        }`}
                        aria-current={
                          pathname === "transactions" ? "page" : undefined
                        }
                      >
                        Transactions
                      </Link>
                    </>
                  )}
                </div>

                {userData ? (
                  <div className="flex space-x-4">
                    <button
                      id="dropdownAvatarNameButton"
                      data-dropdown-toggle="dropdownAvatarName"
                      className="flex items-center border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-1 text-sm font-medium"
                      type="button"
                      onClick={onDropDownBtnClick}
                      // data-dropdown-offset-skidding="0"
                    >
                      <span className="sr-only">Open user menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
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
                          <p className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Deposit
                          </p>
                        </li>
                      </ul>
                      <div className="py-2">
                        <p
                          onClick={handleLogout}
                          className="block cursor-pointer px-4 py-2 text-sm w-100 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      className="border-2 border-teal-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      onClick={toggleLoginModal}
                    >
                      Login
                    </button>

                    <button
                      className="bg-teal-600 text-white hover:bg-teal-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      onClick={toggleSignupModal}
                    >
                      Signup
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`${showMenu ? "block" : "hidden"} sm:hidden`}
          id="mobile-menu"
        >
          <div className={`space-y-1 px-2 pb-3 pt-2`}>
            <Link
              href="/explore"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Explore
            </Link>

            {userData ? (
              <>
                <Link
                  href="/portfolio"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Portfolio
                </Link>

                <Link
                  href="/transactions"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Transactions
                </Link>
              </>
            ) : (
              <>
                <div className="border-t border-slate-700">
                  <button
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 mt-2 font-medium w-full"
                    onClick={toggleLoginModal}
                  >
                    Login
                  </button>

                  <button
                    className="bg-teal-600 text-white hover:bg-teal-700 hover:text-white rounded-md px-3 py-2 mt-2 font-medium w-full"
                    onClick={toggleSignupModal}
                  >
                    Signup
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal />
    </>
  );
};

export default Navbar;
