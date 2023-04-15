import { Modal } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import ModalContext from '../context/modalContext';

const UserAuthModal = () => {


    // const[isVisible, setIsVisible] = useState(showModal);
    const {showModal, setShowModal, isLogin, setIsLogin} = useContext(ModalContext);

    // console.log("isOpened in userauthmodal", showModal);

    // const onClick = () =>{
    //     setIsVisible(true);
    // }

    // useEffect(() => {
    //   setIsVisible(showModal);
    // }, [showModal]);

    const onClose = () =>{
        setShowModal(false);
    }
    
  return (
    <Modal
        show={showModal}
        size="md"
        closable="true"
        popup={true}
        onClose={onClose}
    >
    <Modal.Header />
    <Modal.Body>
      {isLogin ? <Login/> : <Signup/>}
    </Modal.Body>
  </Modal>
  )
};

// const AuthModal = ({isOpened, isLoginSelected}) => {
//     const [isClient, setIsClient] = useState(false);

//     console.log("isOpened in authmodal", isOpened);
  
//     useEffect(() => {
//       setIsClient(true);
//     }, []);
  
//     return isClient ? <UserAuthModal isOpened={isOpened} isLoginSelected={isLoginSelected}/> : null;
// };



export default UserAuthModal;