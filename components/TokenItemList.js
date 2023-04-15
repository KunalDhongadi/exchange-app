import Link from "next/link";
import React, { useContext, useState } from "react";
import WatchList from "./WatchList";

const TokenItemList = ({ token, userData }) => {
  const tokenUrl = `coins/${token.id}`;

  // console.log("sfdsf", token);

  return (
    <div className="table-row rounded-md hover:bg-slate-100">
      <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
        {token.market_cap_rank}
      </div>
      <Link href={tokenUrl}>
        <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-baseline">
            <img
              src={token.image}
              alt={token.name}
              className="self-center w-6 h-6 rounded-full mx-1"
            />
            <p className="ms-2 font-medium">
              {token.name}
              <span className="ms-2 font-normal text-slate-400">{token.symbol.toUpperCase()}</span>
            </p>
          </span>
        </div>
      </Link>
      <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
         <div>₹{token.current_price.toLocaleString("en-IN")}</div>
      </div>
      <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-md ${
            token.price_change_percentage_24h > 0
              ? "bg-green-100 text-green-600"
              : "bg-red-200 text-red-500"
          }`}
        >
          {token.price_change_percentage_24h.toFixed(3)}%
        </span>
      </div>
      <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
          ₹{token.market_cap.toLocaleString("en-IN")}
      </div>
      {userData ? (
      <div className="table-cell text-end border-b border-slate-100 dark:border-slate-700 p-4 pe-6 text-slate-500 dark:text-slate-400">
        
          <WatchList token_id={token.id} isWatchlisted={token.iswatchlisted} />
      
        {/* <div id="tooltip-no-arrow" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Tooltip content
            </div>  */}
      </div>
      ):
      <div className="table-cell text-end border-b border-slate-100 dark:border-slate-700 p-4 pe-6 text-slate-500 dark:text-slate-400">
        
          <WatchList token_id={false} isWatchlisted={token.iswatchlisted} />
      
        {/* <div id="tooltip-no-arrow" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Tooltip content
            </div>  */}
      </div>
      }
    </div>
  );
};

export default TokenItemList;
