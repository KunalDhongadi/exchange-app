import '@/styles/globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import UserContext from '../../context/userContext'
import { useEffect, useState } from 'react'
import App from 'next/app'
import ModalContext from '../../context/modalContext'

export default function MyApp({ Component, pageProps }) {

  const[userData, setUserData] = useState([]);
  const[authtoken, setAuthtoken] = useState(""); //auth-token

  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // const [tokenDetails, setTokenDetails] = useState([]);

  const fetchUser = async(authToken) =>{
    const response = await fetch('http://localhost:5000/api/auth/getuser', {
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
    setAuthtoken(localStorage.getItem("token"));
    console.log("authtoken--",authtoken);
    fetchUser(authtoken);
    console.log(".......UseEffect fetchUser _app.js................");
    // console.log("app.js- userData", userData);
  }, [authtoken]);


  return (
    <>
    <UserContext.Provider value={{userData, setUserData, authtoken, setAuthtoken}}>
      <ModalContext.Provider value={{showModal, setShowModal, isLogin, setIsLogin}}>
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
