import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";

const Portfolio = () => {
  const { userData, setUserData } = useContext(UserContext);

  console.log("userss", userData);

  const [tokens, setTokens] = useState([]);
  const [details, setDetails] = useState({
    portfolioValue: 0,
    totalInvested: 0,
    totalReturns: 0,
    returnsPercentage: 0,
  });

  const fetchActive = async () => {
    const response = await fetch(
      `http://localhost:5000/api/exchange/fetchactive`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
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
    fetchActive();
  }, []);

  return (
    <>
      <div className="container py-2 mx-auto bg-gray-400 flex flex-wrap items-start">
        <div className="lg:w-3/5 md:w-3/5 p-4 w-full">
          <div className="flex">
            <p className="text-sm">Current Value</p>
            <h1 className="text-xl font-medium">₹{details.portfolioValue}</h1>
          </div>

          <div className="flex ms-2">
            <p className="text-sm">Total Returns</p>
            <h1 className="text-xl font-medium">${details.totalReturns}</h1>
          </div>
        </div>
        <div className="lg:w-2/5 md:w-2/5 p-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <div className="flex">
            <p className="text-sm">Invested Value (INR)</p>
            <h1 className="text-xl font-medium">₹{details.totalInvested}</h1>
          </div>
          <div className="flex">
            <p className="text-sm">INR Balance</p>
            <h1 className="text-xl font-medium">
              ₹{userData ? userData.cash : "0"}
            </h1>
          </div>
        </div>
      </div>

      <div className="container py-2 mx-auto flex flex-wrap items-start">
        <div className="lg:w-3/5 md:w-full w-full">
          <p className="text-xl font-medium">All Assets</p>

          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Asset name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Holdings
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Invested INR
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Returns
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token) => {
                    let investedValue = token.quantity * token.averageCost;
                    let totalReturns = (token.price.inr * token.quantity) - investedValue;
                    let returnsPercentage = (totalReturns / investedValue) * 100;
                  return (
                    <tr key={token.token_id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <p>{token.name}</p>
                        <p>{token.symbol}</p>
                      </th>
                      <td class="px-6 py-4">₹{token.price.inr}</td>
                      <td class="px-6 py-4">
                        <p>${token.quantity * token.price.inr}</p>
                        <p>
                          {token.quantity}
                          {token.symbol}
                        </p>
                      </td>
                      <td class="px-6 py-4">
                        ₹{investedValue}
                      </td>
                      <td>
                        ₹
                        {totalReturns}
                        <span>
                          {returnsPercentage.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:w-2/5 md:w-2/5 p-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <p className="text-xl font-medium">Insight</p>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
