import React, { useContext } from 'react'
import UserContext from '../context/userContext';
import TokenItemList from './TokenItemList';

const TokenList = ({tokenList, watchlisted}) => {

    // const tokens = Array.from(tokenList);
    // tokenList = JSON.parse(tokenList);
    // console.log("list", typeof(tokenList));


    // console.log("tokens", tokens);
    // tokenList.forEach(token => (
    //     console.log(token)
    // ));


    const {userData} = useContext(UserContext);

  return (
    <>
    {(tokenList.length !== 0) ? 
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-6">
      <div className='pb-4 border border-zinc-600 rounded-lg overflow-x-auto'>
    <div className="table w-full">
        <div className="table-header-group">
            <div className="table-row">
                <div className="table-cell border-b dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left">#</div>
                <div className="table-cell border-b border-x dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left bg-zinc-800 md:bg-inherit md:border-x-0 sticky left-0 md:static">Name</div>
                <div className="table-cell border-b dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left">Price</div>
                <div className="table-cell border-b dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left">24h %</div>
                <div className="table-cell border-b dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left">Market Cap</div>
                <div className="table-cell border-b dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left"></div>

            </div>
        </div>

        <div className="table-row-group">

            {tokenList.map(token => (
                <TokenItemList token={token} userData={userData} key={token.symbol}/>
            ))}
        </div>
    </div>
    {!watchlisted && 
    <div className="flex">
    <button className="rounded-full mt-4 mx-auto border p-2 px-4 border-zinc-600 text-zinc-400 hover:text-zinc-200">Load more</button>
    </div>
    }
    </div>
    </div>
    :
    (watchlisted && 
    <div className='mx-auto max-w-7xl px-2  py-8 sm:px-6 lg:px-8 font-medium' >The Watchlist is empty</div>
  )
    }
    </>

  )
}

export default TokenList;