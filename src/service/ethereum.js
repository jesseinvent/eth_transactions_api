import Web3 from "web3";
import configs from "../config/config.js";

const { ETHEREUM_NETWORK, INFURA_PROJECT_ID } = configs;

/*
 *  Providers are Ethereum nodes that connects you to the Ethereum Network
 */

// INFURA WEBSOCKET NODE PROVIDER
const wsProvider = new Web3.providers.WebsocketProvider(`wss://${ETHEREUM_NETWORK}.infura.io/ws/v3/${INFURA_PROJECT_ID}`);

// INFURA WEBSCOKET HTTP PROVIDER
const httpProvider = new Web3.providers.HttpProvider(`https://${ETHEREUM_NETWORK}.infura.io/v3/${INFURA_PROJECT_ID}`);

const web3 = new Web3(wsProvider);

export const convertWeiToEth = (amountInWei) => {
    const amount = web3.utils.fromWei(amountInWei.toString(), 'ether');
    return amount;
}

export const convertEthToWei = (amountInEth) => {
    const amount = web3.utils.toWei(amountInEth, 'ether');
    return parseInt(amount);
}

export const convertGWeiToEth = (amountInGwei) => {
    const amountInWei = web3.utils.toWei(amountInGwei.toString(), 'Gwei');
    const amountInEth = convertWeiToEth(amountInWei);
    return amountInEth;
}

export const createEthWallet = () => {
    // Random Entropy as parameter
    const account = web3.eth.accounts.create('a41ead7a8989cab21971f1a2b3471a8f3099bad4aa3d63754b45d69f82f57332..////!!!!!!dhgdcg');

    return account;
}

export const getEthBalance = async (address) => {
    const balance = await web3.eth.getBalance(address);

    return convertWeiToEth(balance);
}

export const getEthTransactionCount = async (address) => {

    // Gets the number of transactions sent from this address
    const nounce = await web3.eth.getTransactionCount(address);
    return nounce;
}

export const estimateEthTransactionGasFee = async ({source_address, destination_address, value}) => {
    const units = await web3.eth.estimateGas({
        from: source_address,
        to: destination_address,
        value: convertEthToWei(value)
    });

    const gasFees = units * 20;

    return gasFees;
}

export const sendEthTransaction = async ({ sender_address, sender_private_key, destination_address, value }) => {

    // Check if sender eth balance is sufficient

    const balance = await getEthBalance(sender_address);

    if(balance < value) {
        return res.send('ETH balance not sufficient for transaction.');
    }

    // Get transaction count (nouce)
    /**
     * The nouce specification is used to keep track of number of transactions
     * sent from an address. Needed for security purposes and to prevent Replay attacks.
     * getTransactionCount is used to get the number of transactions from an address.
     */
    
    const nounce = await getEthTransactionCount(sender_address);

    // Construct the transaction object
    const transaction = {
        from: sender_address,  // Optional can be derived from PRIVATE KEY
        to: destination_address,
        value: convertEthToWei(value),
        // gasPrice: 
        gas: 21000,
        nounce
    }

    // Sign transaction with sender's private key
    const signedTx = await web3.eth.accounts.signTransaction(transaction, sender_private_key);

    // Send signed transaction
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, hash) => {
        if(error) {
            console.log(error);
            return false;
        }
        console.log(hash)
        
        return hash;
    })
    .on('transactionHash', (hash) => console.log({ hash }) )
    .on('confirmation', (confirmationNumber, receipt) => {
        console.log({confirmationNumber, receipt});
    })
    .on('error', error => console.log(error));

    return "Transaction in progress";
}

export const getEthTransaction = async (hash) => {

    const transaction = await web3.eth.getTransaction(hash);

    console.log(hash);

    return transaction;
}