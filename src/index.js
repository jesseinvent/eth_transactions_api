import express from "express";
import routes from "./routes/routes.js";
import { listenForTransactions } from "./service/ethereum.js";

const app = express();

app.use(express.json());

app.use(routes);

const address = "0xe0a7Ce00ef493bFbc8cfcfFcc75d4eb389883Da1";

listenForTransactions(address);

app.listen(3000, () => console.log(`Server listening on localhost:3000`));
