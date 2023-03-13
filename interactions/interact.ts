import * as zksync from "zksync-web3";
import { ethers } from "ethers";
import { config } from "dotenv";
config();


const main = async () => {
    const zkSyncProvider = new zksync.Provider(process.env.ZKSYNC_URL);
    const ethereumProvider = ethers.getDefaultProvider(process.env.GOERLI_URL);

    const wallet = new zksync.Wallet(process.env.PRIVATE_KEY as string, zkSyncProvider, ethereumProvider);
    const tx = await wallet.approveERC20(process.env.USDT_ADDRESS as string, "10");
    const receipt = await tx.wait();
    console.log(`Approved ${tx}`);
    console.log(`Status: ${receipt.status === 0? "Failed": "Success"}`);
};
main().catch(console.error);
