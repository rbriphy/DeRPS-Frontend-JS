import { connectWallet } from './wallet.js';
import { playGame } from './game.js';

let contract;

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connect-button');
    connectButton.addEventListener('click', async () => {
        const result = await connectWallet();
        if (result) {
            contract = result.contract;
            document.getElementById('rock-button').addEventListener('click', () => playGame(0, contract));
            document.getElementById('paper-button').addEventListener('click', () => playGame(1, contract));
            document.getElementById('scissors-button').addEventListener('click', () => playGame(2, contract));
        }
    });
});