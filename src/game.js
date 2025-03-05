import { MAX_BET, GAS_LIMIT } from './config.js';
import { getSigner } from './wallet.js';
import { ethers } from "ethers";

export async function playGame(move, contract) {
    if (!contract) {
        alert("Please connect to MetaMask first");
        return;
    }

    const signer = getSigner();  // Get signer using the imported function
    if (!signer) {
        alert("Contract is not initialized with a signer.");
        return;
    }
    
    const betAmount = document.getElementById('bet-amount').value;
    if (!betAmount || isNaN(betAmount) || betAmount < 0 || betAmount > MAX_BET) {
        alert(`Bet amount must be a number between 0 and ${MAX_BET} ROSE`);
        return;
    }

    try {
        document.getElementById('game-result').innerHTML = "Transaction in progress...";

        const tx = await contract.playGame(move, {
            value: ethers.parseEther(betAmount), // Updated for ethers v6
            gasLimit: GAS_LIMIT
        });

        document.getElementById('game-result').innerHTML = "Waiting for transaction confirmation...";

        console.log("Transaction hash:", tx.hash);
        const receipt = await tx.wait();
        
        console.log("Transaction receipt:", receipt);

        let gameResultFound = false;

        // Check for GamePlayed event in logs
        for (const log of receipt.logs) {
            console.log("Checking log:", log);
            try {
                const parsedLog = contract.interface.parseLog({
                    topics: log.topics,
                    data: log.data
                });
                console.log("Parsed log:", parsedLog);
                if (parsedLog.name === 'GamePlayed') {
                    gameResultFound = true;
                    const [player, playerMove, opponentMove, outcome, bet, winnings] = parsedLog.args;
                    const moves = ['Rock', 'Paper', 'Scissors'];
                    const outcomes = ['Win', 'Lose', 'Tie'];
                    document.getElementById('game-result').innerHTML = `
                        Player Move: ${moves[playerMove]}<br>
                        Opponent Move: ${moves[opponentMove]}<br>
                        Outcome: ${outcomes[outcome]}<br>
                        Bet: ${ethers.formatEther(bet)} ROSE<br>
                        Winnings: ${ethers.formatEther(winnings)} ROSE
                    `;
                    break;
                }
            } catch (parseError) {
                console.error("Error parsing log:", parseError);
            }
        }

        if (!gameResultFound) {
            console.log("All logs:", receipt.logs);
            document.getElementById('game-result').innerHTML = "Game played, but no result event found. Check the console and transaction details for more information.";
        }

    } catch (error) {
        console.error("Error playing game:", error);
        document.getElementById('game-result').innerHTML = "Error playing game. Check console for details.";
    }
}