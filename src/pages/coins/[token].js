import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../context/userContext";
import Link from "next/link";
import WatchList from "../../../components/WatchList";
import { Modal, Toast } from "flowbite-react";
import ModalContext from "../../../context/modalContext";
import LoadingSpinner from "../../../components/LoadingSpinner";

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
        inr: 1529,
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

  const {
    showModal: showLoginModal,
    setShowModal: setShowLoginModal,
    isLogin,
    setIsLogin,
  } = useContext(ModalContext);

  const [query, setQuery] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [tokenDetails, setTokenDetails] = useState();

  const [activeDetails, setActiveDetails] = useState();
  const [transactionDetails, settransactionDetails] = useState();

  const [returnPercentage, setReturnPercentage] = useState(0);

  const [isBuy, setIsBuy] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [totalValue, setTotalValue] = useState(0);

  const [buyError, setBuyError] = useState("");
  const [sellError, setSellError] = useState("");

  const [ismodalActive, setIsModalActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [isTruncated, setIsTruncated] = useState(true); //Description read more/ less

  const [detailsFetched, setDetailsFetched] = useState(false);
  const [tokenFetched, setTokenFetched] = useState(false);

  const router = useRouter();
  const loggedInRef = useRef();

  useEffect(() => {
    if(userData){
      loggedInRef.current = true;
    }else if(userData === null){
      loggedInRef.current = false;
    }
  }, []);

  // gets query subroute
  useEffect(() => {
    const pathname = router.query.token;
    if (pathname) {
      setQuery(pathname);
    }
  }, [router.query]);

  //checks and sets state to login status
  useEffect(() => {
    if(userData){
      setIsLoggedIn(true);
    }else if(userData === null){
      setIsLoggedIn(false);
    }
  }, [userData]);

 
  //Fetch coin details
  const fetchTokens = async (token) => {
    const response = await fetch(
      `http://localhost:5000/api/exchange/fetchtoken/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    if(response.status == 404){
      setTokenDetails(null);
      return;
    }
    const data = await response.json();
    setTokenDetails(data);
    setTotalValue(quantity * data.market_data.current_price.inr);
  };

  //To fetch details such as available qty and transactions
  const fetchdetails = async (token_id) => {
    const response = await fetch(
      `http://localhost:5000/api/exchange/fetchdetails?token_id=${token_id}`,
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
    settransactionDetails([data.transactions[0]]);

    if (activeDetails) {
      setReturnPercentage(
        (tokenDetails.market_data.current_price.inr -
          activeDetails.averageCost) /
          activeDetails.averageCost *
          100
      );
    }
  };

  // calls fetchtoken and fetchdetails on getting query.
  useEffect(() => {
    if(query && isLoggedIn!==undefined && !tokenFetched){
      fetchTokens(query);
      console.log(">>>useEffect fetchTokens() <<<<");
      setTokenFetched(true);
    }
    if(isLoggedIn === true && loggedInRef.current === false){
      console.log("here now");
      fetchTokens(query);
    }
  }, [query,isLoggedIn, tokenFetched, loggedInRef.current]);


  useEffect(() => {
    if(isLoggedIn !== undefined){
      if (tokenDetails !== undefined && isLoggedIn === true && !detailsFetched) {
        fetchdetails(tokenDetails.id);
        setDetailsFetched(true);
        console.log("+++UseEffect fetchdetails() +++");
      }
    }
    
  }, [tokenDetails, isLoggedIn, detailsFetched]);

  useEffect(() => {
    if (isLoggedIn === false) {
      setActiveDetails(null);
      settransactionDetails(null);
      setDetailsFetched(false);
      setTokenFetched(false);
      loggedInRef.current = false;
      if(tokenDetails){
        const { iswatchlisted, ...tokendetails } = tokenDetails;
        setTokenDetails(tokendetails);
      }
    }
  }, [isLoggedIn])
  


  useEffect(() => {
    //Check if totalValue is less/equal to available cash
    if (userData) {
      if (totalValue > userData.cash) {
        setBuyError("You don't have enough INR balance");
      } else {
        setBuyError("");
      }
    }
  }, [quantity, totalValue]);

  useEffect(() => {
    //Check if token quantity is less/equal than available tokens
    let coinQuantity = 0;

    if (activeDetails) {
      coinQuantity = activeDetails.quantity;
    }
    // console.log("activeDetails", activeDetails.quantity , "quantity", quantity);
    if (tokenDetails && quantity > coinQuantity) {
      setSellError(
        `You don't have enough ${tokenDetails.symbol.toUpperCase()} balance`
      );
    } else {
      setSellError("");
    }
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
  

  const buySellBtn = () => {
    setIsBuy(!isBuy);
  };

  // console.log("tokendetails", tokenDetails);

  const onQuantityChanged = (e) => {
    let quantityCount = Number(e.target.value);
    setQuantity(quantityCount);

    let totalValueCount =
      quantityCount * tokenDetails.market_data.current_price.inr;
    if (!quantityCount) {
      setTotalValue(0);
    } else {
      setTotalValue(totalValueCount);
    }
  };

  const onTotalValueChanged = (e) => {
    let totalValueCount = Number(e.target.value);
    setTotalValue(totalValueCount);
    if (!totalValueCount) {
      setQuantity(0);
    } else {
      setQuantity(
        Number(totalValueCount / tokenDetails.market_data.current_price.inr)
      );
    }
  };

  // the order type depends on the state - isBuy, isSell
  const onConfirmationClick = async (e) => {
    let body = JSON.stringify({
      symbol: tokenDetails.symbol,
      name: tokenDetails.name,
      token_id: tokenDetails.id,
      quantity: quantity,
      price: tokenDetails.market_data.current_price.inr,
      image_url: tokenDetails.image.large,
    });

    if(!quantity){
      setShowModal(false);
      setToastMessage(
        `Please enter a valid quantity.`
      );
      setShowToast(true);
      return;
    }

    // console.log("bodyyd", body);
    if (isBuy) {
      e.target.innerText = "Buying..."
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
          `Bought ${formatFloat(json.details.quantity, 3)} ${
            json.details.name
          } worth ${formatFloat(json.details.totalValue, 2)}INR!`
        );
        setShowToast(true);

        setUserData({
          ...userData,
          cash: userData.cash - parseFloat(totalValue.toFixed(2)),
        });
        // if some quantity already exists
        if (activeDetails) {
          let newQuantity = activeDetails.quantity + quantity;
          let newTotalInvested =
            activeDetails.quantity * activeDetails.averageCost + totalValue;
          setActiveDetails({
            ...activeDetails,
            quantity: newQuantity,
            averageCost: newTotalInvested / newQuantity,
          });
          setReturnPercentage(
            ((tokenDetails.market_data.current_price.inr -
              newTotalInvested / newQuantity) /
              (newTotalInvested / newQuantity)) *
              100
          );
        } else {
          setActiveDetails({
            ...activeDetails,
            quantity: quantity,
            averageCost: totalValue / quantity,
          });
          setReturnPercentage(
            ((tokenDetails.market_data.current_price.inr -
              totalValue / quantity) /
              (totalValue / quantity)) *
              100
          );
        }

        const now = new Date();
        const isoString = now.toISOString();
        let newTransaction = {
          txn_timestamp: isoString,
          symbol: tokenDetails.market_data.symbol,
          quantity: quantity,
          price: tokenDetails.market_data.current_price.inr,
        };
        settransactionDetails([newTransaction, ...transactionDetails]);

        setQuantity(0);
        setTotalValue(0);

        e.target.innerText = "Confirm Buy";
      } else {
        setShowModal(false);
        setToastMessage(json.error);
        setShowToast(true);
      }
    } else {
      e.target.innerText = "Selling..."
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
          `Sold ${formatFloat(json.details.quantity, 3)} ${
            json.details.name
          } worth ${formatFloat(json.details.totalValue, 2)}INR!`
        );
        setShowToast(true);

        setUserData({
          ...userData,
          cash: userData.cash + parseFloat(totalValue.toFixed(2)),
        });
        let newQuantity = activeDetails.quantity - quantity;
        let newInvestedValue =
          activeDetails.quantity * activeDetails.averageCost - totalValue;

        // if quantity is zero, so the user doesn't own any coins
        if (newQuantity === 0) {
          setActiveDetails(null);
        } else {
          setActiveDetails({
            ...activeDetails,
            quantity: newQuantity,
            averageCost: newInvestedValue / newQuantity,
          });
        }

        setReturnPercentage(
          ((tokenDetails.market_data.current_price.inr -
            newInvestedValue / newQuantity) /
            (newInvestedValue / newQuantity)) *
            100
        );

        const now = new Date();
        const isoString = now.toISOString();
        let newTransaction = {
          txn_timestamp: isoString,
          symbol: transactionDetails.symbol,
          quantity: quantity * -1,
          price: tokenDetails.market_data.current_price.inr,
        };
        settransactionDetails([newTransaction, ...transactionDetails]);

        setQuantity(0);
        setTotalValue(0);

        e.target.innerText = "Confirm Sell"
      } else {
        setShowModal(false);
        setToastMessage(json.error);
        setShowToast(true);
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  const onShowToast = () => {
    setShowToast(true);
  };

  const onDisableToast = () => {
    setShowToast(false);
  };

  const onNonUserLoginBtnClick = () => {
    setIsLogin(true);
    setShowLoginModal(true);
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

  //Format float to limit decimals and add commas
  const formatFloat = (number, toFixedN) => {
    if (Math.abs(number) < 0.0001) {
      return parseFloat(number.toFixed(5));
    } else if (Math.abs(number) < 0.001) {
      return parseFloat(number.toFixed(4));
    } else {
      return parseFloat(number.toFixed(toFixedN)).toLocaleString("en-IN");
    }
  };

  //To toggle readmore/less for description
  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  // ------------------------

  if (tokenDetails === undefined) {
    return <LoadingSpinner/>;
  }else if(tokenDetails === null){
    return (
    <div className="flex flex-row justify-center my-10">
      <h2 className="p-2 mb-2 font-medium text-xl text-center text-zinc-200">Coin not found.</h2>
      <Link href="/explore" className="p-2 px-4 text-zinc-200 rounded-full no-underline border w-fit mx-auto border-zinc-700 hover:text-white">Explore coins</Link>
    </div>);
  }

  return (
    <>
      <div className="text-white">
        <nav
          className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-zinc-400 border-b border-zinc-700"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-1 md:space-x-3 py-2">
            <li className="inline-flex items-center">
              <Link
                href="/explore"
                className="inline-flex no-underline items-center text-xs font-medium hover:text-teal-600 dark:text-zinc-400 dark:hover:text-white"
              >
                Explore
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <p>/</p>
                <p className="ml-1 text-xs font-medium md:ml-2 dark:text-zinc-400 cursor-default">
                  {tokenDetails.name}
                </p>
              </div>
            </li>
          </ol>
        </nav>
        <div className="token-page min-h-[70vh] max-w-7xl px-2 sm:px-6 lg:px-8 py-2 my-3 mx-auto flex flex-wrap items-start justify-between">
          <div className="lg:w-4/6 md:w-3/5 md:pr-8 lg:pr-8 pr-0">
            <div className="flex justify-between flex-row">
              <div className="flex items-center">
                <img
                  className="w-20 h-20 rounded-full"
                  src={tokenDetails.image.large}
                  alt="Rounded avatar"
                />
              </div>

              <div className="ms-3 flex flex-col grow lg:flex-row lg:justify-between lg:items-center">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline">
                    <h1 className="font-medium text-xl">
                      {tokenDetails.name}
                    </h1>
                    <p className="ps-2 text-zinc-400">{tokenDetails.symbol.toUpperCase()}</p>
                  </div>
                  
                  <div className="ms-4">

                    
                    <WatchList
                      token_id={isLoggedIn ? tokenDetails.id : false}
                      isWatchlisted={isLoggedIn ? tokenDetails.iswatchlisted : false}
                      isTokenPage={true}
                    />
                  </div>
                  
                </div>
                <div className="flex items-center">
                  <h1 className="font-medium me-2 text-2xl">
                    ₹
                    {tokenDetails.market_data.current_price.inr.toLocaleString(
                      "en-IN"
                    )}
                  </h1>
                  {tokenDetails.market_data.price_change_percentage_24h >= 0 ? (
                    <p className="ms-2 px-4 text-sm rounded-full border border-green-400 text-green-400">
                      {tokenDetails.market_data.price_change_percentage_24h.toFixed(
                        2
                      )}
                      %
                    </p>
                  ) : (
                    <p className="ms-2 px-4 text-sm rounded-full border border-red-400 text-red-400">
                      {tokenDetails.market_data.price_change_percentage_24h.toFixed(
                        2
                      )}
                      %
                    </p>
                  )}
                </div>
              </div>
            </div>

            {activeDetails && activeDetails.length !== 0 && (
              <div className="bg-inherit border border-zinc-700 rounded-lg my-3">
                <h3 className="text-md text-zinc-200 p-3 border-b border-zinc-700">Summary</h3>

                <div className="flex flex-col lg:flex-row">
                  <div className="basis-1/2  border-b lg:border-b-0 lg:border-r border-zinc-700 p-3">
                    <p className="text-xs text-zinc-400">Available Qty.</p>
                    <p className="font-medium">
                      {parseFloat(activeDetails.quantity.toFixed(5))}{" "}
                      {tokenDetails.symbol.toUpperCase()}
                    </p>
                    <p className="text-sm">
                      {formatFloat(
                        tokenDetails.market_data.current_price.inr *
                          activeDetails.quantity,
                        2
                      )}
                      INR
                      {returnPercentage >= 0 ? (
                        <span className="ps-2 text-green-400">
                          ({formatFloat(returnPercentage, 2)}%)
                        </span>
                      ) : (
                        <span className="ps-2 text-red-400">
                          ({formatFloat(returnPercentage, 2)}%)
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="basis-1/2  p-3">
                    <p className="text-xs text-zinc-400">Invested value</p>
                    <p className="font-medium">
                      {formatFloat(
                        activeDetails.quantity * activeDetails.averageCost,
                        2
                      )}
                      INR
                    </p>
                    <p className="text-sm text-zinc-300">
                      Avg Price - 
                      <span className="text-zinc-200">
                        {formatFloat(activeDetails.averageCost, 2)}INR
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5">
              <p className="text-zinc-200 text-md mb-2">Market Data</p>
              <div className="flex gap-4">
                <div className="grow border-r-2 border-zinc-400">
                  <p className="text-xs text-zinc-400">Market Cap</p>
                  <p>
                    ₹
                    {tokenDetails.market_data.market_cap.inr.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
                <div className="grow">
                  <p className="text-xs text-zinc-400">Total Volume</p>
                  <p>
                    ₹
                    {tokenDetails.market_data.total_volume.inr.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-md text-zinc-200 mb-2">Additional Details</p>

              <div className="mb-2">
                <p className="text-xs text-zinc-400">Official Website</p>
                <a
                  href={tokenDetails.links.homepage[0]}
                  className="hover:underline"
                >
                  {tokenDetails.links.homepage[0]}
                </a>
              </div>
              <div className="mt-4">
                <p className="text-xs text-zinc-400">Description</p>
                {tokenDetails.description.en === "" ? (
                  <p>N.A</p>
                ) : (
                  <p
                    className="mb-3"
                    dangerouslySetInnerHTML={{
                      __html: tokenDetails.description.en,
                    }}
                  ></p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-2/6 md:w-2/5 w-full">
            <div className="bg-background border border-zinc-700 rounded-xl text-zinc-200 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <div className="flex py-6 px-4 text-sm border-b border-zinc-700">
                <button
                  className={`flex-1 text-center rounded-full py-2 border ${
                    isBuy ? " border-lime-200 text-lime-200" : " border-transparent text-zinc-400"
                  }`}
                  onClick={buySellBtn}
                >
                  Buy
                </button>
                <button
                  className={`flex-1 text-center rounded-full py-2 border ${
                    !isBuy ? " border border-lime-200 text-lime-200" : " border-transparent text-zinc-400"
                  }`}
                  onClick={buySellBtn}
                >
                  Sell
                </button>
              </div>

              <form>
                <div className="p-4 py-5">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm text-zinc-200"
                  >
                    Enter Quantity
                  </label>
                  <div className="flex rounded-lg border border-zinc-700 focus-within:border-lime-200">
                    <span className="inline-flex items-center w-1/5 justify-center m-1.5 my-2 text-xs font-medium text-zinc-200  border-r border-zinc-700">
                      {tokenDetails.symbol.toUpperCase()}
                    </span>
                    <input
                      type="number"
                      id="quantity"
                      className="rounded-r-lg bg-inherit border-0 text-zinc-100 focus:ring-0 group block flex-1 min-w-0 w-full text-sm p-3"
                      placeholder="0.0"
                      min="0"

                      value={quantity ? parseFloat(quantity.toFixed(3)) : ""}
                      onChange={onQuantityChanged}
                    />
                  </div>
                </div>
                <div className="py-3 pt-0 px-4">
                  <label
                    htmlFor="totalValue"
                    className="block mb-2 text-sm text-zinc-200"
                  >
                    Total Value
                  </label>
                  <div className="flex rounded-lg border border-zinc-700 focus-within:border-lime-200">
                    <span className="inline-flex items-center w-1/5 justify-center m-1.5 my-2 text-xs font-medium text-zinc-200  border-r border-zinc-700">
                      INR
                    </span>
                    <input
                      type="number"
                      id="totalValue"
                      className="rounded-r-lg bg-inherit border-0 text-zinc-100 focus:ring-0 group block flex-1 min-w-0 w-full text-sm p-3"
                      placeholder="0.0"
                      min="0"
                      value={
                        totalValue ? parseFloat(totalValue.toFixed(2)) : ""
                      }
                      onChange={onTotalValueChanged}
                    />
                  </div>
                </div>

                {userData ? (
                  isBuy ? (
                    <>
                      <div className="px-4 text-zinc-400 flex justify-between text-xs">
                        <p className="mb-2">INR Balance</p>
                        <p>₹{userData.cash && formatFloat(userData.cash, 2)}</p>
                      </div>
                      {buyError && (
                        <div
                          className="mt-0 p-4 pb-0 text-sm text-yellow-100 rounded-lg"
                          role="alert"
                        >
                          <span className="font-medium"></span> {buyError}
                        </div>
                      )}

                      <div className="p-4 py-6">
                      <button
                        type="button"
                        className="w-full rounded-lg text-zinc-800 bg-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 font-medium text-sm px-5 py-2.5 text-center"
                        onClick={openModal}
                      >
                        Buy
                      </button>
                      </div>
                      
                    </>
                  ) : (
                    <>
                      <div className="px-4 text-zinc-400 flex justify-between text-xs">
                        <p className="mb-2">
                          {tokenDetails.symbol.toUpperCase()} Balance
                        </p>
                        <p>
                          {activeDetails && activeDetails.quantity
                            ? formatFloat(activeDetails.quantity, 3)
                            : "0"}
                          {tokenDetails.symbol.toUpperCase()}
                        </p>
                      </div>
                      <div className="p-4 py-6">
                      <button
                        type="button"
                        className="rounded-lg bg-lime-200  text-zinc-900 w-full focus:ring-4 focus:outline-none focus:ring-lime-100 font-medium text-sm px-5 py-2.5 text-center"
                        onClick={openModal}
                      >
                        Sell
                      </button>

                      </div>
                    </>
                  )
                ) : (
                  <div className="p-4 py-6">
                  <button
                    type="button"
                    className="text-zinc-800 bg-lime-200 w-full focus:ring-4 focus:outline-none focus:ring-lime-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={onNonUserLoginBtnClick}
                  >
                    Login to buy/sell {tokenDetails.symbol.toUpperCase()}
                  </button>
                  </div>
                )}
              </form>
            </div>

            {transactionDetails &&
              transactionDetails.length !== 0 &&
              transactionDetails[0] !== undefined && (
                <div className="border border-zinc-700 rounded-lg my-4 pb-4">
                  <h3 className="text-md p-4 text-zinc-400 border-b border-zinc-700">
                    Recent Transaction
                  </h3>

                  {transactionDetails.map((transaction) => (
                    <div
                      className="border-b text-sm border-zinc-700 p-4"
                      key={transaction.txn_timestamp}
                    >
                      <div className="flex items-center">
                        {/* <div className="w-10 flex justify-center items-center">
                          <div className="w-6 h-2 bg-slate-300 ring-offset-2 ring-2 ring-slate-300 rounded-full"></div>
                        </div> */}
                        <div className="w-full">
                          <div className="flex justify-between">
                            <p>
                              {transaction.quantity > 0 ? "Bought " : "Sold "}
                              {formatFloat(Math.abs(transaction.quantity), 3)}
                              {tokenDetails.symbol.toUpperCase()}{" "}
                              {transaction.quantity > 0 ? (
                                <span className="font-medium">
                                  -
                                  {formatFloat(
                                    Math.abs(
                                      transaction.price * transaction.quantity
                                    ),
                                    2
                                  )}
                                  INR
                                </span>
                              ) : (
                                <span className="font-medium">
                                  +
                                  {formatFloat(
                                    Math.abs(
                                      transaction.price * transaction.quantity
                                    ),
                                    2
                                  )}
                                  INR
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-zinc-400">
                              {formatTime(transaction.txn_timestamp)}
                            </p>
                          </div>

                          <p className="text-sm text-zinc-300">
                            (@{formatFloat(transaction.price, 2)}INR)
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
          className="bg-zinc-900 rounded-lg"
        >
          <Modal.Header className="bg-zinc-800 border text-md dark:border-zinc-700">Confirm Order</Modal.Header>
          <Modal.Body className="bg-zinc-800 text-zinc-200 border-x dark:border-zinc-700">
            <div className="space-y-2">
              <p className="">
                {isBuy
                  ? `Buy ${tokenDetails.name}`
                  : `Sell ${tokenDetails.name}`}
              </p>
              <div className="flex justify-between">
                <p className="text-sm">Price</p>
                <p className="text-sm">
                  {tokenDetails.market_data.current_price.inr.toLocaleString(
                    "en-IN"
                  )}{" "}
                  INR
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Quantity</p>
                <p className="text-sm">
                  {parseFloat(quantity.toFixed(3))}{" "}
                  {tokenDetails.symbol.toUpperCase()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Total</p>
                <p className="text-sm">
                  {parseFloat(totalValue.toFixed(2)).toLocaleString("en-IN")}{" "}
                  INR
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-zinc-800 border dark:border-zinc-700">
            <button
              data-modal-hide="confirm-modal"
              type="button"
              onClick={onConfirmationClick}
              className="text-zinc-900 bg-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
            >
              {isBuy ? "Confirm Buy" : "Confirm Sell"}
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {showToast && (
        <div
          id="toast-success"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-zinc-800 shadow-2xl shadow-zinc-900 rounded-lg bg-lime-200"
          role="alert"
        >
          {/* <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-lime-100 dark:text-zinc-800">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Check icon</span>
          </div> */}
          <div className="text-sm font-medium">{toastMessage}</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-600 dark:hover:text-zinc-900 dark:bg-lime-200"
            onClick={onDisableToast}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
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
          </button>
        </div>
      )}

    </>
  );
};

export default Token;
