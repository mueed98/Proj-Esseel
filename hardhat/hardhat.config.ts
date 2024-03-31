import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.24",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		amoy: {
			url: process.env.ARB_SEPOLIA_RPC,
			accounts: [process.env.PRIVATE_KEY_FOR_TESTING || ""],
		},
	},
};

export default config;
