import React, { useContext } from 'react'
import UserContext from '../context/userContext';
import TokenItemList from './TokenItemList';

const TokenList = ({tokenList}) => {

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
    <div className="container mx-auto">
    <div className="table w-full mt-5">
        <div className="table-header-group">
            <div className="table-row">
                <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">#</div>
                <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</div>
                <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Price</div>
                <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">24h %</div>
                {/* <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"></div> */}

            </div>
        </div>

        <div className="table-row-group">

            {tokenList.map(token => (
                <TokenItemList token={token} userData={userData} key={token.symbol}/>
            ))}
        </div>
    </div>
    </div>
    </>

  )
}

export default TokenList;