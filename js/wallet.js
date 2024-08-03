import { CONTRACT_ADDRESS } from './config.js';
import { contractABI } from './abi.js'; 

let signer;
let contract;

export async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            console.log("Requesting MetaMask accounts...");
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Accounts received.");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            // Log the ABI to debug
            console.log("Contract ABI:", contractABI);

            contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
            document.getElementById('connection-status').textContent = 'Connected to MetaMask';
            document.getElementById('connect-button').style.display = 'none';
            console.log('Wallet connected successfully');
            return { contract, signer, provider };  // Return the contract & signer
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            if (error.code === 4001) {
                alert("You've declined to connect your wallet. Please connect to use this dApp.");
            } else {
                alert("An error occurred while connecting to your wallet. Please try again.");
            }
            return null;
        }
    } else {
        console.log('MetaMask not detected');
        alert('Please install MetaMask to use this dApp!');
        return null;
    }
}

export function getSigner() {
    return signer;
}
