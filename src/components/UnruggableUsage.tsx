"use client";
import React, { useState } from "react";
import { useAccount } from "@starknet-react/core";
import { createMemecoin, launchOnEkubo } from "unruggable-sdk";
import { constants, ProviderInterface, RpcProvider } from "starknet";

const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });

const config: Config = {
  starknetProvider: myProvider,
  starknetChainId: constants.StarknetChainId.SN_MAIN,
};
interface Config {
  starknetChainId: constants.StarknetChainId;
  starknetProvider: ProviderInterface;
}

const UnruggableUsage = () => {
  const { account } = useAccount(); // Get account from StarkNet React
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  // State for dynamic values
  const [name, setName] = useState("My Memecoin");
  const [symbol, setSymbol] = useState("MMC");
  const [initialSupply, setInitialSupply] = useState("1000000000");
  const [startingMarketCap, setStartingMarketCap] = useState("1000000");
  const [fees, setFees] = useState("3.5");
  const [holdLimit, setHoldLimit] = useState("2.5");

  const createAndLaunch = async () => {
    if (!account) {
      setError("Account is not connected.");
      return;
    }

    setLoading(true);
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
        setLoading(false);
        return;
      }

      // Launch the memecoin
      const launchRes = await launchOnEkubo(config, {
        memecoinAddress: createRes.tokenAddress,
        currencyAddress:
          "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        startingMarketCap,
        teamAllocations: [{ address: "", amount: 0 }],
        fees,
        holdLimit,
        antiBotPeriodInSecs: 300,
        starknetAccount: account,
      });

      if (!launchRes) {
        setError("Failed to launch memecoin.");
        setLoading(false);
        return;
      }

      setResult(launchRes);
    } catch (err: any) {
      setError(err.message || "An error occurred during the process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create and Launch Memecoin</h2>

      {/* Input fields for dynamic values */}
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter coin name"
          />
        </label>
      </div>
      <div>
        <label>
          Symbol:
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter coin symbol"
          />
        </label>
      </div>
      <div>
        <label>
          Initial Supply:
          <input
            type="text"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
            placeholder="Enter initial supply"
          />
        </label>
      </div>
      <div>
        <label>
          Starting Market Cap:
          <input
            type="text"
            value={startingMarketCap}
            onChange={(e) => setStartingMarketCap(e.target.value)}
            placeholder="Enter market cap"
          />
        </label>
      </div>
      <div>
        <label>
          Fees:
          <input
            type="text"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            placeholder="Enter fees"
          />
        </label>
      </div>
      <div>
        <label>
          Hold Limit:
          <input
            type="text"
            value={holdLimit}
            onChange={(e) => setHoldLimit(e.target.value)}
            placeholder="Enter hold limit"
          />
        </label>
      </div>

      {/* Button to trigger the process */}
      <button onClick={createAndLaunch} disabled={loading}>
        {loading ? "Processing..." : "Create and Launch Memecoin"}
      </button>

      {/* Error or Success Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <p>Memecoin launched successfully: {JSON.stringify(result)}</p>
      )}
    </div>
  );
};

export default UnruggableUsage;
