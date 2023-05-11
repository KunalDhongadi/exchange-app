import '@/styles/globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import UserContext from '../../context/userContext'
import { useEffect, useState } from 'react'
import App from 'next/app'
import ModalContext from '../../context/modalContext'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'

export default function MyApp({ Component, pageProps }) {

  const[userData, setUserData] = useState();
  const[authtoken, setAuthtoken] = useState(""); //auth-token

  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [progress, setProgress] = useState(0);
  const router = useRouter();

  

  // const [tokenDetails, setTokenDetails] = useState([]);

  const fetchUser = async(authToken) =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
    });
    const user = await response.json();
    // console.log("the response is app.js", user);
    if(user.success){
      setUserData(user.user);
    }else{
      setUserData(null);
    }
    
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () =>{
      setProgress(20);
    });
  
    router.events.on('routeChangeComplete', () =>{
      setProgress(100);
    });
  },[])
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token set");
      setAuthtoken(token);
    }else{
      setUserData(null);
    }
  }, []);


  useEffect(() => {
    if(authtoken){
      fetchUser(authtoken);
      console.log(".......UseEffect fetchUser(_app.js)................");
    }else if(authtoken === null){
      console.log("userdata null");
      setUserData(null);
    }
  }, [authtoken]);


  return (
    <>
    <UserContext.Provider value={{userData, setUserData, authtoken, setAuthtoken}}>
      <ModalContext.Provider value={{showModal, setShowModal, isLogin, setIsLogin}}>
        <LoadingBar color={"#d9f99d"} progress={progress} waitingTime={400} onLoaderFinished={()=>setProgress(0)} />
        <Navbar/>
        <Component {...pageProps} />
        <Footer/>
      </ModalContext.Provider>
    </UserContext.Provider>  
    </>
  )
}

// MyApp.getInitialProps = async (appContext) => {
//   console.log("getInitialProps executed");

//   const response = await fetch('http://localhost:5000/api/auth/getuser',
//     {
//       method: 'GET',
//       headers: {
//           'Content-Type' : 'application/json',
//           'auth-token' : localStorage.getItem("token")
//       }
//     });
//   const user = await response.json();

//   const appProps = await App.getInitialProps(appContext);


//   return { ...appProps, user };
// };
