import { CONTRACT_ADDRESS, EXPECTED_CHAIN_ID, EXPECTED_NETWORK_NAME } from './config.js';
import { contractABI } from './abi.js';
import { ethers } from "ethers";
import { wrapEthersSigner, wrapEthersProvider,NETWORKS } from '@oasisprotocol/sapphire-ethers-v6';

let signer = null;
let provider;
let contract;
const defaultProvider = ethers.getDefaultProvider(NETWORKS.testnet.defaultGateway);

export async function ensureCorrectNetwork() {
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    }
    else {
        provider = new ethers.BrowserProvider(window.ethereum);
        const unwrappedSigner = await provider.getSigner();
        signer = await wrapEthersSigner(unwrappedSigner);
    }

    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (currentChainId !== EXPECTED_CHAIN_ID) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: EXPECTED_CHAIN_ID }],
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: EXPECTED_CHAIN_ID,
                            chainName: EXPECTED_NETWORK_NAME,
                            nativeCurrency: {
                                name: "ROSE",
                                symbol: "ROSE",
                                decimals: 18
                            },
                            rpcUrls: ["https://testnet.sapphire.oasis.dev"], 
                            blockExplorerUrls: ["https://testnet.explorer.sapphire.oasis.dev"]
                        }],
                    });
                } catch (addError) {
                    throw new Error("Failed to add the network");
                }
            } else {
                throw new Error("Failed to switch network");
            }
        }
    }
}

export async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.BrowserProvider(window.ethereum);
            const unwrappedSigner = await provider.getSigner();
            signer = await wrapEthersSigner(unwrappedSigner);
            contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
            
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
            updateUIState('connected');
            return { contract, signer, provider };
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            handleConnectionError(error);
            return null;
        }
    } else {
        updateUIState('no-metamask');
        return null;
    }
}

function updateUIState(state) {
    const statusElement = document.getElementById('connection-status');
    const connectButton = document.getElementById('connect-button');

    switch(state) {
        case 'connecting':
            statusElement.textContent = 'Connecting...';
            connectButton.disabled = true;
            break;
        case 'connected':
            statusElement.textContent = 'Connected to MetaMask';
            connectButton.style.display = 'none';
            break;
        case 'no-metamask':
            statusElement.textContent = 'MetaMask not detected';
            connectButton.disabled = true;
            break;
        default:
            statusElement.textContent = 'Disconnected';
            connectButton.style.display = 'block';
            connectButton.disabled = false;
    }
}

function handleConnectionError(error) {
    if (error.code === 4001) {
        alert("You've declined to connect your wallet. Please connect to use this dApp.");
    } else if (error.message === 'Incorrect network') {
        alert(`Please switch to the correct network (Chain ID: ${EXPECTED_CHAIN_ID}).`);
    } else {
        alert("An error occurred while connecting to your wallet. Please try again.");
    }
    updateUIState('disconnected');
}

async function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        updateUIState('disconnected');
    } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        const unwrappedSigner = await provider.getSigner();
        signer = await wrapEthersSigner(unwrappedSigner);

        contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
        updateUIState('connected');
    }
}

function handleChainChanged(_chainId) {
    window.location.reload();
}

export function getSigner() {
    return signer;
}