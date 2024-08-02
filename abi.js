const contractABI = [
    {
        "type": "constructor",
        "inputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "receive",
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "playGame",
        "inputs": [
            {
                "name": "_move",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "event",
        "name": "GamePlayed",
        "inputs": [
            {
                "name": "player",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "playerMove",
                "type": "uint8",
                "indexed": false,
                "internalType": "uint8"
            },
            {
                "name": "opponentMove",
                "type": "uint8",
                "indexed": false,
                "internalType": "uint8"
            },
            {
                "name": "outcome",
                "type": "uint8",
                "indexed": false,
                "internalType": "uint8"
            },
            {
                "name": "bet",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "winnings",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "error",
                "name": "OwnableInvalidOwner",
                "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }]
            },
            {
                "type": "error",
                "name": "OwnableUnauthorizedAccount",
                "inputs": [{ "name": "account", "type": "address", "internalType": "address" }]
            },
            {
                "type": "error",
                "name": "ReentrancyGuardReentrantCall",
                "inputs": []
            },
            {
                "type": "function",
                "name": "FEE_PERCENTAGE",
                "inputs": [],
                "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "MAX_BET",
                "inputs": [],
                "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "getAdminPoolBalance",
                "inputs": [],
                "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "owner",
                "inputs": [],
                "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "renounceOwnership",
                "inputs": [],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "testGenerateRandom",
                "inputs": [],
                "outputs": [{ "name": "randomBig", "type": "uint256", "internalType": "uint256" }],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "testRandomModulo",
                "inputs": [],
                "outputs": [{ "name": "randomMod", "type": "uint256", "internalType": "uint256" }],
                "stateMutability": "view"
            },
            {
                "type": "function",
                "name": "transferOwnership",
                "inputs": [{ "name": "newOwner", "type": "address", "internalType": "address" }],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "function",
                "name": "withdrawFunds",
                "inputs": [{ "name": "amount", "type": "uint256", "internalType": "uint256" }],
                "outputs": [],
                "stateMutability": "nonpayable"
            },
            {
                "type": "event",
                "name": "BetPlaced",
                "inputs": [
                    { "name": "player", "type": "address", "indexed": false, "internalType": "address" },
                    { "name": "bet", "type": "uint256", "indexed": false, "internalType": "uint256" }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "OwnershipTransferred",
                "inputs": [
                    { "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" },
                    { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }
                ],
                "anonymous": false
            },
            {
                "type": "event",
                "name": "Withdrawal",
                "inputs": [
                    { "name": "player", "type": "address", "indexed": false, "internalType": "address" },
                    { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
                ],
                "anonymous": false
            }
        ],
        "anonymous": false
    }
];
