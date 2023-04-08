import React, { useContext, useState } from 'react';
import ModalContext from '../context/modalContext';

const Signup = () => {


    const {setShowModal, setIsLogin} = useContext(ModalContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const onUsernameChange = (e) =>{
        setUsername(e.target.value);
    }

    const onEmailChange = (e) =>{
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) =>{
        setPassword(e.target.value);
    }

    const goToSignup = () =>{
        setIsLogin(true);
    }

    const signupBtn = async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            setShowModal(false);
            setUsername("");
            setEmail("");
            setPassword("");
        } else {
            setError(json.error);
        }
    }

  return (
    <>
    <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg dark:bg-gray-700">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create a new account</h3>
            <form className="space-y-6" method="POST" onSubmit={signupBtn}>
                {error && 
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {error}
                    </div>
                }
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="johndough" required onChange={onUsernameChange} value={username}/>
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required onChange={onEmailChange} value={email}/>
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={onPasswordChange} value={password}/>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account? <a onClick={goToSignup} className="text-blue-700 hover:underline dark:text-blue-500">Login</a>
                </div>
            </form>
  
        </div>
    </div>
    </>
  )
};

export default Signup;