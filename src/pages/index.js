import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();


  // const address = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=bitcoin&order=market_cap_desc&sparkline=false";
  // const { data, error } = useSWR(`http://localhost:5000/api/exchange/fetchalltokens/${page}`, fetcher,{
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  // });

  // const [data, setData] = useState([]);
  // const { data:newData, error } = useSWR(`http://localhost:5000/api/exchange/fetchalltokens/1`,fetcher,{
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  // });

  // useEffect(() => {
  //   if (newData && newData.length > 0) {
  //     setData((prevData) => [...prevData, ...newData]);
  //   }
  // }, [newData])

  // const handleLoadMore = async () => {
  //   const page = data.length / 10 + 1; // assuming 10 items per page
  //   console.log("the page is ", page);
  //   const response = await fetch(`http://localhost:5000/api/exchange/fetchalltokens/${page}`);
  //   const newItems = await response.json();
  //   const combinedData = [...data, ...newItems];  
  //   setData(combinedData);
  //   mutate("http://localhost:5000/api/exchange/fetchalltokens/${page}");
  // };

  // console.log("the data--", data);
  // console.log("the newdata--", newData);

  // if (error) return <div>Failed to load data</div>;
  // if (!data) return <div>Loading...</div>;

  useEffect(() => {
    router.push('/explore');
  }, []);


  return (
    <>
      <h1 className='text-red-50'>Hello der</h1>
      {/* <button onClick={handleLoadMore}>Click to load more</button> */}
    </>
  )
}

const fetcher = async (url) => {
  const response = await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    }
  );
  const data = await response.json();
  return data;
}