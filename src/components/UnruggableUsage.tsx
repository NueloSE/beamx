import React, { useState } from "react";
import { useAccount } from "@starknet-react/core";
import {
  createMemecoin,
  launchOnStandardAMM,
  launchOnEkubo,
} from "unruggable-sdk";
import {
  constants,
  ProviderInterface,
  RpcProvider,
} from "starknet";

const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });

const config: Config = {
  starknetProvider: myProvider,
  starknetChainId: constants.StarknetChainId.SN_MAIN,
};

interface Config {
  starknetChainId: constants.StarknetChainId;
  starknetProvider: ProviderInterface;
}

interface TeamAllocation {
  address: string;
  amount: number;
}

interface UnruggableUsageProps {
  name: string;
  symbol: string;
  initialSupply: string;
  startingMarketCap: string;
  holdLimit: string;
  liquidityLockPeriod: number;
  antiBotPeriodInSecs: number;
  fees: string;
  teamAllocations: TeamAllocation[];
}

const UnruggableUsage: React.FC<UnruggableUsageProps> = ({
  name,
  symbol,
  initialSupply,
  startingMarketCap,
  holdLimit,
  liquidityLockPeriod,
  antiBotPeriodInSecs,
  fees,
  teamAllocations,
}) => {
  const { account } = useAccount();
  const [loading, setLoading] = useState({
    create: false,
    launchStandardAMM: false,
    launchEkubo: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [memecoinAddress, setMemecoinAddress] = useState<string | null>(null);
  const [result, setResult] = useState<{ transactionHash: string } | null>(
    null
  );

  const createMemecoinHandler = async () => {
    if (!account) {
      setError("Account is not connected.");
      return;
    }

    setLoading((prev) => ({ ...prev, create: true }));
    setError(null);

    try {
      // Create the memecoin
      const createRes = await createMemecoin(config, {
        name,
        symbol,
        initialSupply,
        owner: account.address,
        starknetAccount: account,
      });

      if (!createRes) {
        setError("Failed to create memecoin.");
        setLoading((prev) => ({ ...prev, create: false }));
        return;
      }

      // Store the memecoin address for launching
      setMemecoinAddress(createRes.tokenAddress);
    } catch (err: any | undefined) {
      setError(err.message || "An error occurred during memecoin creation.");
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const launchOnStandardAMMHandler = async () => {
    if (!account) {
      setError("Account is not connected.");
      return;
    }

    if (!memecoinAddress) {
      setError("Please create a memecoin first.");
      return;
    }

    setLoading((prev) => ({ ...prev, launchStandardAMM: true }));
    setError(null);

    try {
      // Launch the memecoin on Standard AMM
      const launchRes = await launchOnStandardAMM(config, {
        memecoinAddress: memecoinAddress,
        currencyAddress:
          "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", // USDC/ETH address
        startingMarketCap,
        holdLimit,
        antiBotPeriodInSecs,
        liquidityLockPeriod,
        fees,
        teamAllocations,
        starknetAccount: account,
      });

      if (!launchRes) {
        setError("Failed to launch memecoin on Standard AMM.");
        setLoading((prev) => ({ ...prev, launchStandardAMM: false }));
        return;
      }

      setResult(launchRes);
    } catch (err: any | undefined) {
      setError(err.message || "An error occurred during Standard AMM launch.");
    } finally {
      setLoading((prev) => ({ ...prev, launchStandardAMM: false }));
    }
  };

  const launchOnEkuboHandler = async () => {
    if (!account) {
      setError("Account is not connected.");
      return;
    }

    if (!memecoinAddress) {
      setError("Please create a memecoin first.");
      return;
    }

    setLoading((prev) => ({ ...prev, launchEkubo: true }));
    setError(null);

    try {
      // Launch the memecoin on Ekubo
      const launchRes = await launchOnEkubo(config, {
        memecoinAddress: memecoinAddress,
        currencyAddress:
          "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", // USDC/ETH address
        startingMarketCap,
        teamAllocations: teamAllocations.map((allocation) => ({
          address: allocation.address,
          amount: allocation.amount.toString(),
        })),
        fees,
        holdLimit,
        antiBotPeriodInSecs,
        starknetAccount: account,
      });

      if (!launchRes) {
        setError("Failed to launch memecoin on Ekubo.");
        setLoading((prev) => ({ ...prev, launchEkubo: false }));
        return;
      }

      setResult(launchRes);
    } catch (err: any | undefined) {
      setError(err.message || "An error occurred during Ekubo launch.");
    } finally {
      setLoading((prev) => ({ ...prev, launchEkubo: false }));
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <button
          onClick={createMemecoinHandler}
          disabled={loading.create}
          className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        >
          {loading.create ? "Creating Memecoin..." : "Create Memecoin"}
        </button>

        <button
          onClick={launchOnStandardAMMHandler}
          disabled={!memecoinAddress || loading.launchStandardAMM}
          className="w-full bg-green-500 text-white py-2 rounded disabled:opacity-50"
        >
          {loading.launchStandardAMM
            ? "Launching on Standard AMM..."
            : memecoinAddress
            ? "Launch on Standard AMM"
            : "Create Memecoin First"}
        </button>

        <button
          onClick={launchOnEkuboHandler}
          disabled={!memecoinAddress || loading.launchEkubo}
          className="w-full bg-purple-500 py-2 rounded disabled:opacity-50"
        >
          {loading.launchEkubo
            ? "Launching on Ekubo..."
            : memecoinAddress
            ? "Launch on Ekubo"
            : "Create Memecoin First"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {result && (
          <p className="text-green-500 mt-2">
            Memecoin launched successfully. Transaction Hash:{" "}
            {result.transactionHash}
          </p>
        )}
      </div>
    </div>
  );
};

export default UnruggableUsage;
