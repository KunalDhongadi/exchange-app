import Link from "next/link";
import React, { useContext, useState } from "react";
import WatchList from "./WatchList";

const TokenItemList = ({ token, userData }) => {
  const tokenUrl = `coins/${token.id}`;

  // console.log("sfdsf", token);

  return (
    <Link href={tokenUrl} className="table-row rounded-md hover:bg-zinc-900 text-white">
      <div className="table-cell border-b border-zinc-600 dark:border-zinc-600 p-4">
        {token.market_cap_rank}
      </div>
      <div className="table-cell pr-6 border-b border-x bg-zinc-800 md:bg-inherit md:border-x-0 sticky left-0 md:static border-zinc-600 dark:border-zinc-600 p-4">
          <div className="flex items-baseline w-max">
            <img
              src={token.image}
              alt={token.name}
              className="self-start w-8 h-8 rounded-full mx-1"
            />
            <div className="flex flex-col md:flex-row">
            <p className="ms-2 font-medium text-xl">
              {token.name}
            </p>
            <p className="ms-2 font-normal text-lg text-zinc-400">{token.symbol.toUpperCase()}</p>
            </div>
          </div>
      </div>
      <div className="table-cell font-semibold border-b border-zinc-600 dark:border-zinc-600 p-4">
         <div>₹{token.current_price.toLocaleString("en-IN")}</div>
      </div>
      <div className="table-cell border-b border-zinc-700 dark:border-zinc-600 p-4">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            token.price_change_percentage_24h > 0
              ? "border border-green-300 text-green-300"
              : "border border-red-400 text-red-400"
          }`}
        >
          {token.price_change_percentage_24h.toFixed(3)}%
        </span>
      </div>
      <div className="table-cell border-b border-zinc-700 dark:border-zinc-600 p-4">
          ₹{token.market_cap.toLocaleString("en-IN")}
      </div>
      <div className="table-cell text-end border-b border-zinc-700 dark:border-zinc-600 p-4">
      {userData ? (
        
          <WatchList token_id={token.id} isWatchlisted={token.iswatchlisted} />
          ):
          (
            <WatchList token_id={false} isWatchlisted={token.iswatchlisted} />
          )
      }
        {/* <div id="tooltip-no-arrow" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Tooltip content
            </div>  */}
      </div>

    </Link>

  );
};

export default TokenItemList;
