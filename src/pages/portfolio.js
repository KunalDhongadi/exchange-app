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
      portfolioValue: 924055.6067749885,
      totalInvested: 10826.483972810098,
      totalReturns: 913229.1228021784,
      returnsPercentage: 8435.140393646587,
      tokens: [
        {
          _id: "6431dc443083ae60bfc1d2fd",
          user: "6429cc3c4fa30ad8f762889f",
          symbol: "xrp",
          name: "XRP",
          token_id: "ripple",
          quantity: 48.30999215850304,
          image_url:
            "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731",
          __v: 0,
          averageCost: 1.7147591274327982,
          price: {
            inr: 42.34,
            inr_24h_change: 0.6133565647028864,
          },
        },
        {
          _id: "6431ddfcb303dab0a17f1ad2",
          user: "6429cc3c4fa30ad8f762889f",
          symbol: "usdt",
          name: "Tether",
          token_id: "tether",
          quantity: 5,
          image_url:
            "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663",
          __v: 0,
          averageCost: 16.384,
          price: {
            inr: 82.14,
            inr_24h_change: 0.1565971715227986,
          },
        },
        {
          _id: "643357078117d3902570c339",
          user: "6429cc3c4fa30ad8f762889f",
          symbol: "eth",
          name: "Ethereum",
          token_id: "ethereum",
          quantity: 5.920022236756046,
          image_url:
            "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
          __v: 0,
          averageCost: 1800.9601225167573,
          price: {
            inr: 155675,
            inr_24h_change: 0.39670341771563083,
          },
        },
      ],
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
    if (!userData) {
      router.push("/explore");
    } else {
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
            <div className="w-full flex flex-col md:flex-row gap-3 my-4">
              <div className="w-full h-24 flex p-3 rounded-lg bg-lime-100">
                <div className="flex-row self-center">
                  <p className="text-xs font-medium text-zinc-700">
                    Current Value
                  </p>
                  <h3 className="text-xl font-semibold text-zinc-800">
                    ₹{formatFloat(details.portfolioValue, 2)}
                  </h3>
                </div>
              </div>

              <div className="w-full h-24 flex p-3 rounded-lg bg-lime-100">
                <div className="flex-row self-center">
                  <p className="text-xs font-medium text-zinc-700">
                    Total Returns
                  </p>
                  <h3
                    // className={`text-xl flex items-center font-medium ${
                    //   details.totalReturns > 0
                    //     ? "text-green-600"
                    //     : "text-red-500"
                    // }`}
                    className={`text-xl flex items-center font-medium text-zinc-800`}
                  >
                    ₹{formatFloat(details.totalReturns, 2)}{" "}
                    <span
                      className={`text-sm ms-2 font-medium px-3 py-1 rounded-full ${
                        details.totalReturns > 0
                          ? "border-2 border-zinc-800 text-zinc-800"
                          : "border-2 border-zinc-800 text-zinc-800"
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

              <div className="w-full h-24 flex flex-col justify-center p-3 rounded-lg bg-lime-100">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-medium text-zinc-700">
                    Invested Value (INR)
                  </p>
                  <h1 className="text-md font-medium text-zinc-800">
                    ₹{formatFloat(details.totalInvested, 2)}
                  </h1>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs font-medium text-zinc-700">
                    INR Balance
                  </p>
                  <h3 className="text-md font-medium text-zinc-800">
                    ₹
                    {userData && userData != undefined
                      ? formatFloat(userData.cash, 2)
                      : "0"}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-2 flex flex-wrap items-start">
            <div className="lg:w-full md:w-full w-full">
              <p className="text-md font-medium text-zinc-200 py-4">
                All Assets
              </p>

              <div className="overflow-x-auto pb-4 border border-zinc-600 rounded-lg">
                <div className="table w-full">
                  <div className="table-header-group">
                    <div className="table-row">
                      <div className="table-cell border-b border-r bg-zinc-800 md:bg-inherit md:border-x-0 sticky left-0 md:static dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left">
                        Asset name
                      </div>
                      <div className="table-cell border-b dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left">
                        Price
                      </div>
                      <div className="table-cell border-b dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left">
                        Holdings
                      </div>
                      <div className="table-cell border-b dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left">
                        Invested INR
                      </div>
                      <div className="table-cell border-b dark:border-zinc-600 text-sm font-medium p-4 py-2 text-slate-400 dark:text-zinc-500 text-left">
                        Returns
                      </div>
                    </div>
                  </div>
                  <div className="table-row-group">

                  {tokens.map((token) => {
                      let tokenUrl = `coins/${token.token_id}`;
                      let investedValue = token.quantity * token.averageCost;
                      let totalReturns =
                        token.price.inr * token.quantity - investedValue;
                      let returnsPercentage =
                        (totalReturns / investedValue) * 100;
                      return (
                        <div
                          key={token.token_id}
                          className="table-row text-white"
                        >
                          <div
                            className="table-cell border-b border-r bg-zinc-800 md:bg-inherit md:border-x-0 sticky left-0 md:static border-zinc-600 dark:border-zinc-600 p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="flex w-max items-baseline">
                            <img
                              src={token.image_url}
                              alt={token.name}
                              className="self-center w-6 h-6 rounded-full"
                            />
                            <div className="ms-3">
                              <Link href={tokenUrl} className="font-medium text-lg hover:underline">
                                {token.name}
                              </Link>
                              <p className="text-sm text-zinc-400">
                                {token.symbol.toUpperCase()}
                              </p>
                            </div>

                            </div>
                            
                          </div>
                          <div className="table-cell border-b border-zinc-600 p-4">
                            ₹{token.price.inr.toLocaleString("en-IN")}
                          </div>
                          <div className="table-cell border-b border-zinc-600 p-4">
                            <p className="font-medium">
                              ₹
                              {formatFloat(token.quantity * token.price.inr, 2)}
                            </p>
                            <p className="text-xm text-zinc-400">
                              {formatFloat(token.quantity, 3)}
                              {token.symbol.toUpperCase()}
                            </p>
                          </div>
                          <div className="table-cell border-b border-zinc-600 p-4">
                            ₹{formatFloat(investedValue, 2)}
                          </div>
                          <div
                            className={`table-cell border-b border-zinc-600 p-4 font-medium ${
                              details.totalReturns > 0
                                ? "text-green-300"
                                : "text-red-200"
                            }`}
                          >
                            ₹{formatFloat(totalReturns, 2)}
                            <span
                              className={`text-xs font-medium px-3 py-1 ms-2 rounded-full ${
                                returnsPercentage > 0
                                  ? "bg-green-300 text-green-950"
                                  : "bg-red-400 text-red-950"
                              }`}
                            >
                              {returnsPercentage > 0
                                ? "+" + formatFloat(returnsPercentage, 2)
                                : "-" + formatFloat(returnsPercentage, 2)}
                              %
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-full w-full my-4">
              <p className="text-md font-medium text-zinc-200 py-2">Insights</p>

              <PiechartComponent
                portfolioValue={details.portfolioValue}
                tokens={tokens}
              />
            </div>
          </div>

        </>
      )}
    </>
  );
};

export default Portfolio;
