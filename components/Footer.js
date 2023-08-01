import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-750">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 flex items-center sm:flex-row flex-col justify-between">
        <div className="flex sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="text-lg text-white">Coindeck</span>
        </a>
        <p className="text-xs text-zinc-400 sm:ml-4 sm:pl-4 sm:border-l sm:border-zinc-400 sm:py-2 sm:mt-0 mt-1">
          A very real crypto exchange (but with pretend money)
        </p>
        </div>
        <p className="text-zinc-400 py-2 px-4 border border-zinc-750 rounded-full text-xs mt-2 sm:mt-0">Data from
        <a href="https://www.coingecko.com/" className="hover:text-zinc-300"> CoinGecko</a></p>
        
      </div>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-center py-3 border-y border-zinc-750 pointer-events-none hover:bg-lime-200">
        <a href="https://kunal-dhongadi.vercel.app/" className="text-zinc-600 text-xs p-2 px-4 underline underline-offset-4 rounded-full  pointer-events-auto">by @Kunal</a>
      </div>

    </footer>
  );
};

export default Footer;
