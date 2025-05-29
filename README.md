# ETH Wallet Demo

A simple React web app to demonstrate Ethereum wallet integration using MetaMask, ethers.js, and CoinGecko API.

## Features

- Connect MetaMask wallet
- Display connected wallet address
- Fetch and display ETH balance
- Fetch and display current ETH price (USD)
- Show total ETH value in USD
- Fetch and display USDT (ERC20) token balance

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MetaMask browser extension](https://metamask.io/) installed

## Getting Started

1. **Clone the repository** (or create a new React app and copy the code):

    ```
    git clone <your-repo-url>
    cd <your-project-folder>
    ```

2. **Install dependencies**:

    ```
    npm install
    ```

3. **Start the development server**:

    ```
    npm start
    ```

4. **Open the app**:

    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click the **"Connect MetaMask"** button.
2. Approve the connection in your MetaMask popup.
3. Your wallet address, ETH balance, ETH price, ETH value in USD, and USDT balance will be displayed.

## Notes

- Make sure your MetaMask is set to **Ethereum Mainnet** to see your real USDT balance.
- If you are on a testnet, you may need to use a testnet USDT contract address (update in `App.js`).
- If you see errors about USDT balance, check your network and wallet connection.

## Technologies Used

- [React](https://reactjs.org/)
- [ethers.js](https://docs.ethers.org/)
- [CoinGecko API](https://www.coingecko.com/en/api)
- [MetaMask](https://metamask.io/)

## Screenshots

![alt text](image.png)

## License

This project is for demonstration and educational purposes.