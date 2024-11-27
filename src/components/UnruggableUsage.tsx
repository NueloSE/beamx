import React from "react";
import { useAccount } from "@starknet-react/core";
import { createMemecoin, launchOnEkubo } from "unruggable-sdk";
import { constants, ProviderInterface, RpcProvider } from "starknet";

const { account } = useAccount();
const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });

const config: Config = {
  starknetProvider: myProvider,
  starknetChainId: constants.StarknetChainId.SN_MAIN,
};
interface Config {
  starknetChainId: constants.StarknetChainId;
  starknetProvider: ProviderInterface;
}

const createResult = async () => {
  if (!account) return;

  return await createMemecoin(config, {
    name: "My Memecoin",
    symbol: "MMC",
    initialSupply: "1000000000",
    owner: account?.address, // "address",
    starknetAccount: account,
  });
};

const launchResult = await createResult().then(async (res) => {
  if (!res || !account) return;

  return await launchOnEkubo(config, {
    memecoinAddress: res.tokenAddress,
    currencyAddress:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    startingMarketCap: "1000000",
    teamAllocations: [{ address: "", amount: 0 }],
    fees: "3.5",
    holdLimit: "2.5",
    antiBotPeriodInSecs: 300,
    starknetAccount: account,
  });
});


const UnruggableUsage = () => {
  return <div></div>;
};

export default UnruggableUsage;
