export const MATIC_MAINNET = {
    id: "0x89",
    token: "MATIC",
    label: "Matic Mainnet",
    rpcUrl: "https://matic-mainnet.chainstacklabs.com",
  };
  
  export const MATIC_TESTNET = {
    id: "0x13881",
    token: "MATIC",
    label: "Mumbai Matic Testnet",
    rpcUrl: "https://matic-testnet-archive-rpc.bwarelabs.com",
  };
  
  export const Chains = [
    // {
    //   id: "0x1",
    //   token: "ETH",
    //   label: "Ethereum Mainnet",
    //   rpcUrl: ETH_MAINNET_RPC,
    // },
    // {
    //   id: "0x3",
    //   token: "tROP",
    //   label: "Ethereum Ropsten Testnet",
    //   rpcUrl: ETH_ROPSTEN_RPC,
    // },
    // {
    //   id: "0x4",
    //   token: "rETH",
    //   label: "Ethereum Rinkeby Testnet",
    //   rpcUrl: ETH_RINKEBY_RPC,
    // },
    {
      id: "0x38",
      token: "BNB",
      label: "BNB Chain",
      rpcUrl: "https://bsc-dataseed.binance.org/",
    },
    MATIC_MAINNET,
    MATIC_TESTNET,
    {
      id: "0xfa",
      token: "FTM",
      label: "Fantom Mainnet",
      rpcUrl: "https://rpc.ftm.tools/",
    },
  ];
  
  export default Chains;
  