import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { useRouter } from "next/router";

const transactions = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [transactions, setTransactions] = useState();

  const router = useRouter();

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

  // console.log("user txn", userData);

  useEffect(() => {
    if (!userData) {
      router.push("/explore");
    } else {
      console.log("useEffect for getting transactions page");
      fetchtransactions();
    }
  }, [userData]);

  // console.log("transactions", transactions);

  const formatDateTime = (type, string) => {
    const date = new Date(string);
    const now = new Date();

    if (type === 1) {
      const diffInMilliseconds = now - date;
      const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInDays >= 7) {
        return Math.floor(diffInDays / 7) + "w ago";
      } else if (diffInDays >= 1) {
        return diffInDays + "d ago";
      } else if (diffInHours >= 1) {
        return diffInHours + "h ago";
      } else if (diffInMinutes >= 1) {
        return diffInMinutes + "m ago";
      } else {
        return diffInSeconds + "s ago";
      }
    } else {
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-US", options);
      return formattedDate;
    }
  };

  const formatFloat = (number, toFixedN) => {
    return parseFloat(number.toFixed(toFixedN)).toLocaleString("en-IN");
  };

  return (
    <>
      {userData && (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-2">
          <h1 className="text-xl font-medium my-3">Transactions</h1>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-3 overflow-x-auto">
              <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Asset name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Value
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {transactions &&
                  transactions.map((transaction) => {
                    let totalValue = transaction.quantity * transaction.price;
                    let tokenUrl = `coins/${transaction.token_id}`;
                    return (
                      <tr
                        key={transaction.txn_timestamp}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 flex font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            src={transaction.image_url}
                            alt={transaction.name}
                            className="self-center w-6 h-6 rounded-full mx-1"
                          />

                          <div className="ms-3">
                            <Link href={tokenUrl} className="hover:underline">
                              {transaction.name}
                            </Link>
                            <p className="text-gray-400">
                              {transaction.symbol.toUpperCase()}
                            </p>
                          </div>
                        </th>
                        <td className="px-6 py-4 align-top">
                          ₹{transaction.price.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 align-top">
                          {Number.isInteger(transaction.quantity)
                            ? Math.abs(transaction.quantity)
                            : formatFloat(transaction.quantity, 3)}
                          {transaction.symbol.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="font-medium">
                            {Number.isInteger(totalValue)
                              ? transaction.quantity > 0
                                ? `-${totalValue}`
                                : `+${totalValue * -1}`
                              : transaction.quantity > 0
                              ? `-${formatFloat(totalValue, 2)}`
                              : formatFloat(totalValue, 2)}
                            INR
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          {transaction.quantity > 0 ?
                          <p>Bought {formatDateTime(1, transaction.txn_timestamp)}</p>:
                          <p>Sold {formatDateTime(1, transaction.txn_timestamp)}</p>
                          }
                          <p>{formatDateTime(2, transaction.txn_timestamp)}</p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default transactions;
