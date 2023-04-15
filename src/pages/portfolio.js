import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import Link from "next/link";
import PiechartComponent from "../../components/PiechartComponent";
import { useRouter } from "next/router";

const Portfolio = () => {
  const { userData, setUserData } = useContext(UserContext);

  const router = useRouter();

  // console.log("userss", userData);

  const [tokens, setTokens] = useState([]);
  const [details, setDetails] = useState({
    portfolioValue: 0,
    totalInvested: 0,
    totalReturns: 0,
    returnsPercentage: 0,
  });

  const fetchActive = async () => {
    // const response = await fetch(
    //   `http://localhost:5000/api/exchange/fetchactive`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "auth-token": localStorage.getItem("token"),
    //     },
    //   }
    // );
    // const data = await response.json();

    const data = {
      "portfolioValue": 924055.6067749885,
      "totalInvested": 10826.483972810098,
      "totalReturns": 913229.1228021784,
      "returnsPercentage": 8435.140393646587,
      "tokens": [
        {
          "_id": "6431dc443083ae60bfc1d2fd",
          "user": "6429cc3c4fa30ad8f762889f",
          "symbol": "xrp",
          "name": "XRP",
          "token_id": "ripple",
          "quantity": 48.30999215850304,
          "image_url": "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731",
          "__v": 0,
          "averageCost": 1.7147591274327982,
          "price": {
            "inr": 42.34,
            "inr_24h_change": 0.6133565647028864
          }
        },
        {
          "_id": "6431ddfcb303dab0a17f1ad2",
          "user": "6429cc3c4fa30ad8f762889f",
          "symbol": "usdt",
          "name": "Tether",
          "token_id": "tether",
          "quantity": 5,
          "image_url": "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663",
          "__v": 0,
          "averageCost": 16.384,
          "price": {
            "inr": 82.14,
            "inr_24h_change": 0.1565971715227986
          }
        },
        {
          "_id": "643357078117d3902570c339",
          "user": "6429cc3c4fa30ad8f762889f",
          "symbol": "eth",
          "name": "Ethereum",
          "token_id": "ethereum",
          "quantity": 5.920022236756046,
          "image_url": "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
          "__v": 0,
          "averageCost": 1800.9601225167573,
          "price": {
            "inr": 155675,
            "inr_24h_change": 0.39670341771563083
          }
        }
      ]
    };
    setTokens(data.tokens);
    const { portfolioValue, totalInvested, totalReturns, returnsPercentage } =
      data;
    setDetails({
      portfolioValue,
      totalInvested,
      totalReturns,
      returnsPercentage,
    });
  };

  useEffect(() => {
    console.log("useEffect for getting addtional Details");
    if(!userData){
      router.push("/explore");
    }else{
      fetchActive();
    }
  }, []);

  const formatFloat = (number, toFixedN) => {
    return parseFloat(number.toFixed(toFixedN)).toLocaleString("en-IN");
  };

  return (
    <>
    {userData && (
      <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-2 flex flex-wrap items-start">
        <div className="w-full flex gap-3 my-4">
          <div className="w-2/6 h-24 flex p-3 rounded-md border border-slate-200 bg-slate-100">
            <div className="flex-row self-center">
              <p className="text-xs font-medium text-gray-500">Current Value</p>
              <h3 className="text-lg font-medium">
                ₹{formatFloat(details.portfolioValue, 2)}
              </h3>
            </div>
          </div>

          <div className="w-2/6 h-24 flex p-3 rounded-md border border-slate-200 bg-slate-100">
            <div className="flex-row self-center">
              <p className="text-xs font-medium text-gray-500">Total Returns</p>
              <h3
                className={`text-lg font-medium ${
                  details.totalReturns > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                ₹{formatFloat(details.totalReturns, 2)}{" "}
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-md ${
                    details.totalReturns > 0
                      ? "bg-green-100 text-green-600"
                      : "bg-red-200 text-red-500"
                  }`}
                >
                  {details.returnsPercentage > 0
                    ? "+" + formatFloat(details.returnsPercentage, 2)
                    : "-" + formatFloat(details.returnsPercentage, 2)}
                  %
                </span>
              </h3>
            </div>
          </div>

          <div className="w-2/6 h-24 flex flex-col justify-center p-3 rounded-md border border-slate-200 bg-slate-100">
            <div className="flex justify-between items-center">
              <p className="text-xs font-medium text-gray-500">
                Invested Value (INR)
              </p>
              <h1 className="text-md font-medium">
                ₹{formatFloat(details.totalInvested, 2)}
              </h1>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs font-medium text-gray-500">INR Balance</p>
              <h3 className="text-md font-medium">
                ₹{(userData && userData != undefined) ? formatFloat(userData.cash, 2) : "0"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-2 flex flex-wrap items-start">
        <div className="lg:w-full md:w-full w-full">
          <p className="text-xl font-medium text-gray-500 py-2">All Assets</p>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    Asset name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Holdings
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Invested INR
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Returns
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token) => {
                  let tokenUrl = `coins/${token.token_id}`;
                  let investedValue = token.quantity * token.averageCost;
                  let totalReturns =
                    token.price.inr * token.quantity - investedValue;
                  let returnsPercentage = (totalReturns / investedValue) * 100;
                  return (
                    <tr
                      key={token.token_id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium flex text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          src={token.image_url}
                          alt={token.name}
                          className="self-center w-6 h-6 rounded-full"
                        />
                        <div className="ms-3">
                          <Link href={tokenUrl} className="hover:underline">
                            {token.name}
                          </Link>
                          <p className="text-gray-400">
                            {token.symbol.toUpperCase()}
                          </p>
                        </div>
                      </th>
                      <td className="px-3 py-4">
                        ₹{token.price.inr.toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-4">
                        <p>
                          ₹{formatFloat(token.quantity * token.price.inr, 2)}
                        </p>
                        <p>
                          {formatFloat(token.quantity, 3)}
                          {token.symbol.toUpperCase()}
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        ₹{formatFloat(investedValue, 2)}
                      </td>
                      <td
                        className={`px-3 py-4 font-medium ${
                          details.totalReturns > 0
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        ₹{formatFloat(totalReturns, 2)}
                        <span
                          className={`text-xs font-medium px-2 py-1 ms-2 rounded-md ${
                            returnsPercentage > 0
                              ? "bg-green-100 text-green-600"
                              : "bg-red-200 text-red-500"
                          }`}
                        >
                          {returnsPercentage > 0
                            ? "+" + formatFloat(returnsPercentage, 2)
                            : "-" + formatFloat(returnsPercentage, 2)}
                          %
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:w-2/6 md:w-full w-full my-4">
          <p className="text-xl font-medium text-gray-500 py-2">Insights</p>
          
          <PiechartComponent portfolioValue={details.portfolioValue} tokens={tokens}/>
        </div>
      </div>
      </>)}
    </>

  );
};

export default Portfolio;
