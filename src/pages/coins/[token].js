import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/userContext";
import Link from "next/link";
import WatchList from "../../../components/WatchList";
import { Modal, Toast } from "flowbite-react";

const Token = () => {
  const data = {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    block_time_in_minutes: 0,
    hashing_algorithm: "Ethash",
    categories: [
      "Smart Contract Platform",
      "Layer 1 (L1)",
      "Ethereum Ecosystem",
    ],
    public_notice: null,
    additional_notices: [],
    description: {
      en: "Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in order to program digital value. Examples of decentralized apps (dapps) that are built on Ethereum includes tokens, non-fungible tokens, decentralized finance apps, lending protocol, decentralized exchanges, and much more.\r\n\r\nOn Ethereum, all transactions and smart contract executions require a small fee to be paid. This fee is called Gas. In technical terms, Gas refers to the unit of measure on the amount of computational effort required to execute an operation or a smart contract. The more complex the execution operation is, the more gas is required to fulfill that operation. Gas fees are paid entirely in Ether (ETH), which is the native coin of the blockchain. The price of gas can fluctuate from time to time depending on the network demand.",
    },
    links: {
      homepage: ["https://www.ethereum.org/", "", ""],
      blockchain_site: [
        "https://etherscan.io/",
        "https://ethplorer.io/",
        "https://blockchair.com/ethereum",
        "https://eth.tokenview.io/",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      official_forum_url: ["", "", ""],
      twitter_screen_name: "ethereum",
      telegram_channel_identifier: "",
      subreddit_url: "https://www.reddit.com/r/ethereum",
    },
    image: {
      thumb:
        "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
      small:
        "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
      large:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    },
    country_origin: "",
    genesis_date: "2015-07-30",
    sentiment_votes_up_percentage: 73.81,
    sentiment_votes_down_percentage: 26.19,
    market_cap_rank: 2,
    coingecko_rank: 2,
    coingecko_score: 78.783,
    developer_score: 97.494,
    community_score: 72.746,
    liquidity_score: 95.183,
    public_interest_score: 0.236,
    market_data: {
      current_price: {
        btc: 0.06668777,
        eth: 1,
        eur: 1699.88,
        gbp: 1504.65,
        inr: 152954,
        usd: 1868.93,
      },
      total_value_locked: null,
      mcap_to_tvl_ratio: null,
      fdv_to_tvl_ratio: null,
      roi: {
        times: 88.16193136191356,
        currency: "btc",
        percentage: 8816.193136191356,
      },
      market_cap: {
        btc: 8031986,
        eth: 120441938,
        eur: 204667978864,
        gbp: 181162617138,
        inr: 18415923235204,
        usd: 225022130672,
      },
      market_cap_rank: 2,
      total_volume: {
        btc: 222785,
        eth: 3340757,
        eur: 5678799077,
        gbp: 5026609969,
        inr: 510975524564,
        usd: 6243553461,
      },
      price_change_24h: 13.730182,
      price_change_percentage_24h: 0.74009,
      price_change_percentage_7d: 2.46209,
      price_change_percentage_14d: 6.72158,
      price_change_percentage_30d: 21.73369,
      price_change_percentage_60d: 15.56972,
      price_change_percentage_200d: 35.43742,
      price_change_percentage_1y: -42.18916,
      market_cap_change_24h: 1804120643,
      market_cap_change_percentage_24h: 0.80823,
      total_supply: 120441938.207931,
      max_supply: null,
      circulating_supply: 120441938.207931,
      last_updated: "2023-04-08T13:12:44.234Z",
    },
    status_updates: [],
    last_updated: "2023-04-08T13:12:44.234Z",
    iswatchlisted: false,
  };

  const { userData, setUserData } = useContext(UserContext);

  const [query, setQuery] = useState("");

  const [tokenDetails, setTokenDetails] = useState();

  const [activeDetails, setActiveDetails] = useState([]);

  const [transactionDetails, settransactionDetails] = useState([]);

  const [isBuy, setIsBuy] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [totalValue, setTotalValue] = useState(0);

  const [buyError, setBuyError] = useState("");
  const [sellError, setSellError] = useState("");

  const [ismodalActive, setIsModalActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const [isTruncated, setIsTruncated] = useState(true);


  

  const router = useRouter();
  // const token_id = router.query.token;
  // console.log("[token] router----=--=", token_id);
  

  useEffect(() => {
    const pathname = router.query.token;
    if(pathname){
      setQuery(pathname);
    }
  }, [router.query]);
  

  //Fetch coin details
  const fetchTokens = async (token) => {
    const response = await fetch(
      `http://localhost:5000/api/exchange/fetchtoken/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        }
      }
    );
    const data = await response.json();
    setTokenDetails(data);

    setTotalValue( quantity * data.market_data.current_price.inr);
    
  };


  useEffect(() => {
    if(query){
      fetchTokens(query);
      console.log("++++useEffect fetchTokens [token].js+++");
    }else{
      console.log("waiting for query");
    }
    
  }, [query]);

  // console.log("token details", tokenDetails);





  useEffect(() => {
    //Check if totalValue is less/equal to available cash
    if (userData) {
      if (totalValue > userData.cash) {
        setBuyError("You don't have enough balance");
      } else {
        setBuyError("");
      }
    }

    //Check if token quantity is less/equal than available tokens

    // if(totalValue > userData.cash){
    //   setBuyError("You don't have enough balance");
    // }else{
    //   setBuyError("");
    // }
  }, [quantity, totalValue]);

  //set modal to active
  useEffect(() => setIsModalActive(true), []);

  //so that the bg doesn't scroll when modal is opened
  useEffect(() => {
    if (document) {
      document.body.style.overflow = showModal ? "hidden" : "auto";
    }
  }, [showModal]);

  // to time the toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const fetchdetails = async (token_id) => {
    const response = await fetch(
      `http://localhost:5000/api/exchange/fetchdetails/${token_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setActiveDetails(data.activeTokens[0]);
    settransactionDetails(data.transactions[0]);
  };

  useEffect(() => {
    if(tokenDetails !== undefined){
      fetchdetails(tokenDetails.id);
      console.log("useEffect for getting addtional Details");
    }
  }, [tokenDetails]);

  // console.log("what t", transactionDetails);

  const buySellBtn = () => {
    setIsBuy(!isBuy);
  };

  // console.log("tokendetails", tokenDetails);

  const onQuantityChanged = (e) => {
    let quantityCount = parseFloat(e.target.value);
    setQuantity(quantityCount);

    let totalValueCount =
      parseFloat(quantityCount) * tokenDetails.market_data.current_price.inr;
    if (!quantityCount) {
      setTotalValue(0);
    } else {
      setTotalValue(parseFloat(totalValueCount));
    }
  };

  const onTotalValueChanged = (e) => {
    let totalValueCount = parseFloat(e.target.value);
    setTotalValue(totalValueCount);
    if (!totalValueCount) {
      setQuantity(0);
    } else {
      setQuantity(
        parseFloat(parseFloat(totalValueCount) / tokenDetails.market_data.current_price.inr)
      );
    }
  };

  // the order type depends on the state - isBuy, isSell
  const onConfirmationClick = async () => {
    let body = JSON.stringify({
      symbol: tokenDetails.symbol,
      name: tokenDetails.name,
      token_id: tokenDetails.id,
      quantity: quantity,
      price: tokenDetails.market_data.current_price.inr,
      image_url: tokenDetails.image.small,
    });

    console.log("bodyyd", body);
    if (isBuy) {
      const response = await fetch(`http://localhost:5000/api/token/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: body,
      });
      const json = await response.json();
      if (json.success) {
        setShowModal(false);
        setToastMessage(
          `Bought ${json.details.quantity}${json.details.name} worth ${json.details.totalValue}!`
        );
        setShowToast(true);
      } else {
        setShowModal(false);
        setToastMessage(json.error);
        setShowToast(true);
      }
    } else {
      const response = await fetch(`http://localhost:5000/api/token/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: body,
      });
      const json = await response.json();
      if (json.success) {
        setShowModal(false);
        setToastMessage(
          `Sold ${json.details.quantity}${json.details.name} worth ${json.details.totalValue}!`
        );
        setShowToast(true);
      } else {
        setShowModal(false);
        setToastMessage(json.error);
        setShowToast(true);
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
    // console.log("the model is now", ismodal);
  };

  const onModalClose = () => {
    setShowModal(false);
    // console.log("the model is now", ismodal);
  };

  const onShowToast = () => {
    setShowToast(true);
  };

  const onDisableToast = () => {
    setShowToast(false);
  };

  const formatTime = (string) => {
    const date = new Date(string);
    const now = new Date();

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
  };

  //To toggle readmore/less for description
  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  if(tokenDetails === undefined){
    return null;
  }

  return (
    <>
      <div className="">
        <nav
          className="flex px-5 py-2 text-gray-700 border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Breadcrumb"
        >
          <ol className="container inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/explore"
                className="inline-flex items-center text-xs font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Explore
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <a
                  href="#"
                  className="ml-1 text-xs font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {tokenDetails.name}
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div className="container py-2 mx-auto flex flex-wrap items-start">
          <div className="lg:w-3/5 md:w-3/5 md:pr-16 lg:pr-0 pr-0">
            <div className="flex items-center">
              <img
                className="w-14 h-14 rounded-full"
                src={tokenDetails.image.large}
                alt="Rounded avatar"
              />
              <div className="rounded-full flex items-center h-1/2 py-2 px-6 ms-2 text-sm bg-slate-100">
                {/* <WatchList /> */}
              </div>
            </div>

            <div className="flex items-baseline">
              <h1 className="font-medium text-2xl">{tokenDetails.name}</h1>
              <p className="ps-2">{tokenDetails.symbol.toUpperCase()}</p>
            </div>

            <div className="flex items-center">
              <h1 className="font-medium text-3xl">
                ₹
                {tokenDetails.market_data.current_price.inr.toLocaleString(
                  "en-IN"
                )}
              </h1>
              {tokenDetails.market_data.price_change_percentage_24h >= 0 ? (
                <p className="ms-2 px-4 rounded-full bg-green-300">
                  {tokenDetails.market_data.price_change_percentage_24h.toFixed(
                    2
                  )}
                  %
                </p>
              ) : (
                <p className="ms-2 px-4 rounded-full bg-red-300">
                  {tokenDetails.market_data.price_change_percentage_24h.toFixed(
                    2
                  )}
                  %
                </p>
              )}
            </div>

            {activeDetails && (
              <div className="bg-gray-100 rounded-lg p-4 mb-3">
                <h3 className="text-md font-medium">Balance</h3>
                <div className="flex">
                  <p>{activeDetails.quantity} BTC</p>
                  <p>
                    ₹
                    {(
                      tokenDetails.market_data.current_price.inr *
                      activeDetails.quantity
                    ).toLocaleString("en-IN")}
                    ----
                  </p>
                  <p>
                    {Number(
                      (
                        ((tokenDetails.market_data.current_price.inr -
                          activeDetails.averageCost) /
                          activeDetails.averageCost) *
                        100
                      ).toFixed(2)
                    ).toLocaleString("en-IN")}
                    %
                  </p>
                </div>

                <h3 className="text-md font-medium">Total invested</h3>
                <div className="flex">
                  <p>
                    ₹
                    {(
                      activeDetails.quantity * activeDetails.averageCost
                    ).toLocaleString("en-IN")}
                    --
                  </p>
                  <p>Avg Price - ₹{activeDetails.averageCost}</p>
                </div>
              </div>
            )}

            <a
              href={tokenDetails.links.homepage[0]}
              className="bg-gray-200 rounded-md p-2 my-2 text-center w-40 block"
            >
              Official Website
            </a>

            <div className="mt-5">
              <p className="font-medium text-lg">Market Data</p>
              <div className="flex-auto">
                <div>
                  <p className="text-sm uppercase text-gray-500">Market Cap</p>
                  <p>
                    ₹
                    {tokenDetails.market_data.market_cap.inr.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase text-gray-500">
                    Total Volume
                  </p>
                  <p>
                    ₹
                    {tokenDetails.market_data.total_volume.inr.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="font-medium text-lg">Description</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: tokenDetails.description.en,
                }}
              ></p>
            </div>
          </div>

          <div className="lg:w-2/6 md:w-2/5 w-full">
            <div className="bg-gray-100 rounded-lg p-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <div className="flex mb-4">
                <button
                  className={`flex-1 text-center py-2 border-b-2 ${
                    isBuy && "border-gray-500"
                  }`}
                  onClick={buySellBtn}
                >
                  Buy
                </button>
                <button
                  className={`flex-1 text-center py-2 border-b-2 ${
                    !isBuy && "border-gray-500"
                  }`}
                  onClick={buySellBtn}
                >
                  Sell
                </button>
              </div>

              <form>
                <div className="mb-6">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Quantity
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      {(tokenDetails.symbol).toUpperCase()}
                    </span>
                    <input
                      type="number"
                      id="quantity"
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0.0"
                      min="0"
                      value={
                        parseFloat(quantity.toFixed(4))
                      }
                      onChange={onQuantityChanged}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="totalValue"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Value
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      INR
                    </span>
                    <input
                      type="number"
                      id="totalValue"
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0.0"
                      min="0"
                      value={parseFloat(totalValue.toFixed(3))}
                      onChange={onTotalValueChanged}
                    />
                  </div>
                </div>

                {userData ? (
                  isBuy ? (
                    <>
                      {buyError && (
                        <div
                          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                          role="alert"
                        >
                          <span className="font-medium"></span> {buyError}
                        </div>
                      )}
                      <div className="flex justify-between">
                        <p className="mb-2">INR Balance</p>
                        <p>{userData.cash}</p>
                      </div>
                      <button
                        type="button"
                        className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={openModal}
                      >
                        Buy
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <p className="mb-2">
                          {tokenDetails.symbol.toUpperCase()} Balance
                        </p>
                        <p>{userData.cash}</p>
                      </div>
                      <button
                        type="button"
                        className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={openModal}
                      >
                        Sell
                      </button>
                    </>
                  )
                ) : (
                  <button
                    type="button"
                    className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Login to buy/sell {tokenDetails.symbol.toUpperCase()}
                  </button>
                )}
              </form>
            </div>
            {transactionDetails && (
              <div className="bg-gray-100 rounded-lg p-4 mt-3">
                <h3 className="text-medium">Recent Transaction</h3>

                <p className="text-sm text-gray-400">
                  {formatTime(transactionDetails.txn_timestamp)}
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-green-400 mr-2"></div>
                  <div>
                    <p>
                      {transactionDetails.quantity}BTC{" "}
                      <span>(₹{transactionDetails.price})</span>
                    </p>
                    <p>
                      Total - ₹
                      {transactionDetails.price * transactionDetails.quantity}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* modal */}

      {ismodalActive && (
        <Modal
          show={showModal}
          size="md"
          dismissible={true}
          onClose={onModalClose}
        >
          <Modal.Header>Confirm Order</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-md font-medium">
                {isBuy
                  ? `Buy ${tokenDetails.name}`
                  : `Sell ${tokenDetails.name}`}
              </p>
              <div className="flex justify-between">
                <p>Price</p>
                <p>
                  ₹
                  {tokenDetails.market_data.current_price.inr.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Quantity</p>
                <p>
                  {quantity % 1 == 0
                          ? parseInt(quantity)
                          : Number(quantity.toFixed(5))} {tokenDetails.symbol.toUpperCase()}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Total</p>
                <p>₹{totalValue.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              data-modal-hide="confirm-modal"
              type="button"
              onClick={onConfirmationClick}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
            >
              {isBuy ? "Buy" : "Sell"}
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {showToast && (
        <div
          id="toast-success"
          class="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
          <div class="ml-3 text-sm font-normal">{toastMessage}</div>
          <button
            type="button"
            class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={onDisableToast}
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}

      {/* 
      <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            
          </div>
          <div className="ml-3 text-sm font-normal">
            Item moved successfully.
          </div>
      </Toast> */}

      {/* <!-- Small Modal --> */}

      {ismodalActive && (
        <div
          id="confirm-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-opacity-75"
        >
          <div className="relative w-full h-full max-w-sm md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Confirm Order
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="confirm-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-md font-medium">
                  {isBuy
                    ? `Buy ${tokenDetails.name}`
                    : `Sell ${tokenDetails.name}`}
                </p>
                <div className="flex justify-between">
                  <p>Price</p>
                  <p>
                    ₹
                    {tokenDetails.market_data.current_price.inr.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Quantity</p>
                  <p>
                     {tokenDetails.symbol.toUpperCase()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>₹{totalValue.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="confirm-modal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                >
                  {isBuy ? "Buy" : "Sell"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Token;
