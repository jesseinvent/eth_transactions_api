import dotenv from 'dotenv';

dotenv.config();

const configs = {
    ADDRESS: process.env.ADDRESS || "",
    PRIVATE_KEY: process.env.PRIVATE_KEY || "",
    ETHEREUM_NETWORK: process.env.ETHEREUM_NETWORK || "",
    INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID || "",
}

export default configs;