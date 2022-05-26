import { Router } from "express";
import { createWallet, getBalance, getTransaction, getTransactionCount, sendTransaction } from "../controllers/ethereumControllers.js";

const router = Router();

router.post('/create-wallet', createWallet);

router.get('/get-balance/:address', getBalance);

router.get('/get-transaction-count/:address', getTransactionCount);

router.post('/send-transaction', sendTransaction);

router.get('/get-transaction/:hash', getTransaction);

export default router;