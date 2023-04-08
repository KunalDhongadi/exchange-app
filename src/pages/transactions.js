import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const transactions = () => {

  const router = useRouter();
  console.log("transactions router", router);


  const [transactions, setTransactions] = useState([]);

  const fetchtransactions = async () => {
    const response = await fetch(
      `http://localhost:5000/api/exchange/fetchtransactions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    console.log("useEffect for getting transactions page");
    fetchtransactions();
  }, []);

  const formatDateTime = (type, string) => {
    const date = new Date(string);
    const now = new Date();

    if(type === 1){
      const diffInMilliseconds = now - date;
      const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
  
      if (diffInDays >= 7) {
        return (Math.floor(diffInDays / 7) + "w ago");
      } else if (diffInDays >= 1) {
        return (diffInDays + "d ago");
      } else if (diffInHours >= 1) {
        return (diffInHours + "h ago");
      } else if (diffInMinutes >= 1) {
        return (diffInMinutes + "m ago");
      } else {
        return (diffInSeconds + "s ago");
      }
    }else{
      const options = { 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true,
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      const formattedDate = date.toLocaleDateString('en-US', options);
      return formattedDate;
    }

    
  };

  return (
    <>
      <div className="container mx-auto pt-3">
        <h1 className="text-xl font-medium">Transactions</h1>
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
                  Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Value
                </th>
                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                let totalValue = transaction.quantity * transaction.price;
                return (
                  <tr
                    key={transaction.txn_timestamp}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 flex font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={transaction.image_url}
                        alt={transaction.name}
                        className="self-center w-5 h-5 rounded-full mx-1"
                      />

                      <div>
                        <p>{transaction.name}</p>
                        <p>{transaction.symbol}</p>
                      </div>
                    </th>
                    <td class="px-6 py-4">
                      ₹{transaction.price.toLocaleString("en-IN")}
                    </td>
                    <td class="px-6 py-4">
                      {transaction.quantity}
                      {transaction.symbol}
                    </td>
                    <td class="px-6 py-4">₹{totalValue}</td>
                    <td class="px-6 py-4">
                      <p>{formatDateTime(1,transaction.txn_timestamp)}</p>
                      <p>{formatDateTime(2,transaction.txn_timestamp)}</p></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default transactions;
