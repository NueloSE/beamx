import React from "react";
import { useAccount } from "@starknet-react/core";
import { createMemecoin, launchOnEkubo } from "unruggable-sdk";
import { constants, ProviderInterface } from "starknet";
const provider = process.env.NEXT_PUBLIC_STARKNET_PROVIDER;

const { address } = useAccount();

const config: Config = {
  starknetProvider: provider,
  starknetChainId: constants.StarknetChainId.SN_MAIN,
};

interface Config {
  starknetChainId: constants.StarknetChainId;
  starknetProvider: ProviderInterface;
}
const memecoin_details = {
  
    name: "My Memecoin",
    symbol: "MMC",
    initialSupply: "1000000000",
    owner: address,
    starknetAccount: address,
  
}
async function mycreateMemecoin() {
  try {
    const createResult = await createMemecoin(config, memecoin_details);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("error data is ", error);
  } finally {
    setIsLoading(false);
  }
}

const UnruggableUsage = () => {
  return <div></div>;
};

export default UnruggableUsage;
