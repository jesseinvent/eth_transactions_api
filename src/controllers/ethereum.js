import Web3 from "web3";

const web3 = new Web3('https://rinkeby.infura.io/v3/f7420c75750649d7acc7606da994b128');

export function createWallet() {
    const account = web3.eth.accounts.create()
}

export function getBalance() {}

export function signTransaction() {}