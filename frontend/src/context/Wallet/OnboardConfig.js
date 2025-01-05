import injectedModule from "@web3-onboard/injected-wallets";
import Chains from "../../config/Chains";
import torusModule from "@web3-onboard/torus";
import walletConnectModule from "@web3-onboard/walletconnect";
import gnosisModule from "@web3-onboard/gnosis";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import dcentModule from "@web3-onboard/dcent";
import keepkeyModule from "@web3-onboard/keepkey";
import magicModule from "@web3-onboard/magic";
import portisModule from "@web3-onboard/portis";

const coinbaseWalletSdk = coinbaseWalletModule();
const gnosis = gnosisModule();
const injected = injectedModule();
const torus = torusModule();
const dcent = dcentModule();
const keepkey = keepkeyModule();
const magic = magicModule({ apiKey: "pk_live_D1B540A4086ABB23" });
const portis = portisModule({ apiKey: "f3b47997-32f4-43d8-9816-f5bf61d4384f" });

export const OnboardConfig = {
  wallets: [
    injected,
    torus,
    gnosis,
    magic,
    coinbaseWalletSdk,
    dcent,
    keepkey,
    portis,
  ],
  chains: Chains,
  appMetadata: {
    name: "The Medical Records Marketplace",
    icon: "myIcon", // svg string icon
    description: "Get paid for your medical records",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
  accountCenter: { desktop: { enabled: false }, mobile: { enabled: false } },
  // i18n: {
  //   en: en,
  // },
};


export function onboardConfigFactory({
  name,
  icon,
  description,
}) {
  return {
    ...OnboardConfig,
    appMetadata: {
      ...OnboardConfig.appMetadata,
      name: name,
      icon: icon,
      description: description,
    },
  };
}

export default OnboardConfig;
