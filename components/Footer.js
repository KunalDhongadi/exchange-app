import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 border-t border-zinc-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="text-lg text-white">Coindeck</span>
        </a>
        <p className="text-xs text-zinc-400 sm:ml-4 sm:pl-4 sm:border-l sm:border-zinc-400 sm:py-2 sm:mt-0 mt-4">
          A very real crypto exchange (but with pretend money)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
