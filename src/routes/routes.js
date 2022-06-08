import { Router } from "express";
import { createWallet, estimateGasFee, getBalance, getTransaction, getTransactionCount, sendTransaction } from "../controllers/ethereumControllers.js";

const router = Router();

router.post('/create-wallet', createWallet);

router.get('/get-balance/:address', getBalance);

router.get('/get-transaction-count/:address', getTransactionCount);

router.post('/get-gas-fee', estimateGasFee);

router.post('/send-transaction', sendTransaction);

router.get('/get-transaction/:hash', getTransaction);

export default router;