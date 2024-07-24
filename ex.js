function App() {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);
  
    const connectMetaMask = async () => {
      const provider = await detectEthereumProvider();
  
      if (provider) {
        console.log('MetaMask is installed!');
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
          setError(null);
        } catch (error) {
          console.error(error);
          setError(Error: ${error.message});
        }
      } else {
        console.log('MetaMask is not installed!');
        setError('MetaMask is not installed!');
      }
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome</h1>
          <button onClick={connectMetaMask}>Sign in with MetaMask</button>
          <p className="message">{account ? Connected: ${account} : error}</p>
        </header>
      </div>
    );
  }
  
  export default App;