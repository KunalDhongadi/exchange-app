import React, { useContext, useEffect, useState } from 'react'
import TokenContext from '../context/tokenContext';
import ModalContext from '../context/modalContext';
import { motion } from "framer-motion"

const WatchList = ({token_id, isWatchlisted, isTokenPage}) => {

  const { showModal, setShowModal, isLogin, setIsLogin } =
    useContext(ModalContext);




  let tokens, setTokens, watchlisted,setWatchlisted;
  if(!isTokenPage){
    const context = useContext(TokenContext)
    tokens= context.tokens;
    setTokens = context.setTokens;
    watchlisted = context.watchlisted;
    setWatchlisted = context.setWatchlisted;
  }

  const [watchlistedCoin, setWatchlistedCoin] = useState();

  // console.log("tokens wl", token_id);

  useEffect(() => {
    setWatchlistedCoin(isWatchlisted);
  }, [isWatchlisted])
    

  const watchlistToken = async(e) => {

    e.preventDefault();

    //if not loggedin, show login modal
    if(token_id == false){
      setShowModal(true);
      return;
    }

    const response = await fetch(`http://localhost:5000/api/token/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({symbol: token_id}),
      });
      const json = await response.json();

      setWatchlistedCoin(json.watchlisted);
      
      const updateState = () => {
        // if not a token page. i.e. If on explore page, watchlist the coin in state
        if(!isTokenPage){
          const index = tokens.findIndex(token => token.id === token_id);
          const tokenObj = tokens.filter(token => token.id === token_id);
          console.log("The token is ", tokenObj);
          if(index !== -1){
            const updatedTokenList = [...tokens];
            updatedTokenList[index].iswatchlisted = json.watchlisted;
            setTokens(updatedTokenList);
          }
          if(json.watchlisted){
            setWatchlisted([...watchlisted, tokenObj[0]]);
          }else{
            setWatchlisted(watchlisted.filter(w => w.id!==token_id));
          }
        }
      }  
      
      const myTimeout = setTimeout(updateState, 1000);
      
      console.log(token_id + " is now " + watchlistedCoin);
     
  }


  const svgVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2 },
    tap: { scale: 0.8 }
  };
 
  return (
    <>
    <motion.div whileHover="hover" whileTap="tap" className='rounded-full bg-zinc-800 border border-zinc-700 flex w-12 h-12 justify-center items-center outline-none group' onClick={watchlistToken}>
    {
      watchlistedCoin ?
      <motion.svg variants={svgVariants} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline-block text-lime-200 group outline:none" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </motion.svg>:
      <motion.svg variants={svgVariants} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline-block text-zinc-400 group-hover:text-lime-200 outline:none" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
      </motion.svg> 
    }
    </motion.div>
    </>
  )
}
WatchList.defaultProps = {
  isTokenPage : false
};

export default WatchList;