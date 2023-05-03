import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-zinc-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl text-white">Coindeck</span>
        </a>
        <p className="text-sm text-zinc-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          Fake buy and sell cryptocurrencies
        </p>
      </div>
    </footer>
  );
};

export default Footer;
