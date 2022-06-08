import express from "express";
import routes from "./routes/routes.js";
import { listenForTransactions } from "./service/ethereum.js";

const app = express();

app.use(express.json());

app.use(routes);

listenForTransactions();

app.listen(3000, () => console.log(`Server listening on localhost:3000`));
