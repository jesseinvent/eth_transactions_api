import configs from "../config/config.js";
import {
  createEthWallet,
  estimateEthTransactionGasLimit,
  getEthBalance,
  getEthTransaction,
  getEthTransactionCount,
  sendEthTransaction,
} from "../service/ethereum.js";

export const createWallet = (req, res, next) => {
  const wallet = createEthWallet();

  res.send({ wallet });
};

export const getBalance = async (req, res, next) => {
  const { address } = req.params;

  const balance = await getEthBalance(address);

  return res.send({ balance });
};

export const estimateGasFee = async (req, res, next) => {
  const { destination_address, value } = req.body;

  const limit = await estimateEthTransactionGasLimit({
    source_address: configs.ADDRESS,
    destination_address: destination_address,
    value,
  });

  return res.send({ gas_limit: limit });
};

export const sendTransaction = async (req, res, next) => {
  const { destination_address, value } = req.body;

  if (!destination_address || !value) {
    return res.send("Please provide destination address and value.");
  }

  const result = await sendEthTransaction({
    sender_address: configs.ADDRESS,
    sender_private_key: process.env.PRIVATE_KEY,
    destination_address,
    value,
  });

  return res.send({ result });
};

export const getTransactionCount = async (req, res, next) => {
  const { address } = req.params;

  if (!address) {
    return res.send("Please provide ETH address.");
  }

  const count = await getEthTransactionCount(address);

  return res.send({ transactionCount: count });
};

export const getTransaction = async (req, res, next) => {
  const { hash } = req.params;

  if (!hash) {
    return res.send("Please provide transaction hash.");
  }

  const transaction = await getEthTransaction(hash);

  return res.send({ transaction });
};
