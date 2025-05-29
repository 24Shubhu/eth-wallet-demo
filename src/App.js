import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Move ABI outside the component!
const erc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

function App() {
  const [account, setAccount] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(null);
  const [error, setError] = useState("");

  // USDT contract address (Ethereum mainnet)
  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

  // Connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setError("");
      } catch (err) {
        setError("User rejected connection or another error occurred.");
      }
    } else {
      setError("MetaMask not detected. Please install MetaMask.");
    }
  };

  // Fetch ETH balance when account changes
  useEffect(() => {
    const getBalance = async () => {
      if (account && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balance = await provider.getBalance(account);
          setEthBalance(ethers.formatEther(balance));
        } catch (err) {
          setError("Failed to fetch ETH balance.");
        }
      }
    };
    getBalance();
  }, [account]);

  // Fetch ETH price in USD from CoinGecko
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (err) {
        setError("Failed to fetch ETH price.");
      }
    };
    fetchEthPrice();
  }, []);

  // Fetch USDT balance
  useEffect(() => {
    const getUsdtBalance = async () => {
      if (account && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          // Make sure accounts are authorized
          await provider.send("eth_requestAccounts", []);
          const contract = new ethers.Contract(usdtAddress, erc20Abi, provider);
          const balance = await contract.balanceOf(account);
          const decimals = await contract.decimals();
          setUsdtBalance(ethers.formatUnits(balance, decimals));
        } catch (err) {
          console.error("USDT fetch error:", err);
          setError("Failed to fetch USDT balance.");
        }
      }
    };
    getUsdtBalance();
  }, [account]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 500, margin: "auto" }}>
      <h1>ETH Wallet Demo</h1>
      <button onClick={connectWallet} style={{ padding: "1em", fontSize: "1em" }}>
        {account ? "Connected" : "Connect MetaMask"}
      </button>
      {account && (
        <div style={{ marginTop: "1em" }}>
          <strong>Wallet Address:</strong>
          <div style={{ wordBreak: "break-all" }}>{account}</div>
        </div>
      )}
      {ethBalance && (
        <div style={{ marginTop: "1em" }}>
          <strong>ETH Balance:</strong>
          <div>{ethBalance} ETH</div>
        </div>
      )}
      {ethPrice && (
        <div style={{ marginTop: "1em" }}>
          <strong>ETH Price (USD):</strong>
          <div>${ethPrice}</div>
        </div>
      )}
      {ethBalance && ethPrice && (
        <div style={{ marginTop: "1em" }}>
          <strong>ETH Value in USD:</strong>
          <div>
            $
            {(parseFloat(ethBalance) * ethPrice).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      )}
      {usdtBalance && (
        <div style={{ marginTop: "1em" }}>
          <strong>USDT Balance:</strong>
          <div>{usdtBalance} USDT</div>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "1em", color: "red" }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default App;