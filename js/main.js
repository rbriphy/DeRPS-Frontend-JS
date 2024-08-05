import { connectWallet, ensureCorrectNetwork } from './wallet.js';
import { playGame } from './game.js';

let contract;

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connect-button');
    connectButton.addEventListener('click', handleConnect);
});

async function handleConnect() {
    try {
        // First, ensure the correct network
        await ensureCorrectNetwork();
        
        // Then, connect the wallet
        const result = await connectWallet();
        if (result) {
            contract = result.contract;
            setupGameButtons();
        }
    } catch (error) {
        console.error("Error during connection process:", error);
        if (error.message.includes("user rejected the request")) {
            alert("You've rejected the request to switch networks or connect your wallet. Please try again and approve the request to use this dApp.");
        } else {
            alert("There was an error connecting to the correct network or your wallet. Please try again.");
        }
    }
}

function setupGameButtons() {
    document.getElementById('rock-button').addEventListener('click', () => playGame(0, contract));
    document.getElementById('paper-button').addEventListener('click', () => playGame(1, contract));
    document.getElementById('scissors-button').addEventListener('click', () => playGame(2, contract));
}