import React, { useState, useEffect } from 'react';
import './home.css';
import Header from '../Header';
import detectEthereumProvider from '@metamask/detect-provider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const checkMetaMask = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        console.log('MetaMask is installed!');
      } else {
        console.error('MetaMask is not installed!');
      }
    };

    checkMetaMask();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        await registerUser(accounts[0]); // Register the user
        navigate('/service'); // Navigate to the /service page
      } else {
        alert('MetaMask not detected');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const registerUser = async (walletAddress) => {
    try {
      const username = "user_" + walletAddress.slice(0, 5); // Example username
      const email = "user@example.com"; // Placeholder email

      const response = await fetch('http://localhost:3002/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, walletAddress })
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="main">
        <div className="background"></div>
        <div className="content">
          <h1>Welcome to FundNet</h1>
          <button onClick={handleLogin} className="login-button">
            Login with MetaMask
          </button>
          {account && <p>Connected account: {account}</p>}
        </div>
      </div>
    </>
  );
};

export default Home;