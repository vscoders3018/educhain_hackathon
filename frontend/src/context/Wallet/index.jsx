import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { init, useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

import { onboardConfigFactory } from "./OnboardConfig";

const onboard = init(
  onboardConfigFactory({
    name: "The Medical Records Marketplace",
    icon: "https://www.shutterstock.com/image-vector/medical-record-icon-report-history-260nw-2256092765.jpg",
    description: "Get paid for your medical records",
  })
);
const WalletContext = createContext(null);

const WalletProvider = (props) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const ethersProvider = useMemo(() => {
    if (wallet?.provider)
      return new ethers.providers.Web3Provider(wallet.provider);
  }, [wallet]);

  const ethersSigner = useMemo(() => {
    if (ethersProvider) {
      return ethersProvider.getSigner();
    }
  }, [ethersProvider]);

  const address = wallet?.accounts[0].address;

  return (
    <WalletContext.Provider
      value={{ onboard, ethersSigner, ethersProvider, address }}
      {...props}
    />
  );
};

const useWallet = () => {
  const walletContext = useContext(WalletContext);
  if (!walletContext) throw new Error("Wallet hooks used without provider");
  return walletContext;
};
export { WalletProvider, useWallet };
