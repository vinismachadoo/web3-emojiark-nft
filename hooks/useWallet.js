import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CHAIN_IDS, TRANSACTION_STATUS, CONTRACT_ADDRESS } from "../globals";
import CONTRACT_ABI from "../utils/MyEpicNFT.json";

export default function useWallet() {
  const [walletInstalled, setInstalled] = useState(false);
  const [walletConnected, setConnected] = useState(false);
  const [walletNetwork, setNetwork] = useState(null);
  const [walletError, setWalletError] = useState(null);
  const [walletAccount, setAccount] = useState("");
  const [walletBalance, setBalance] = useState(0);
  const [nftList, setNftList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [nftLoading, setNftLoading] = useState(TRANSACTION_STATUS.None);

  const isRinkeby = walletNetwork?.chainId === CHAIN_IDS.Rinkeby;

  // if MetaMask is installed
  const isWalletInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

  // get MetaMask account
  const isWalletConnected = async () => {
    if (!window.ethereum) {
      return false;
    }
    const accountList = await window.ethereum.request({
      method: "eth_accounts",
    });
    return accountList.length !== 0;
  };

  const connectWallet = () => {
    return window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accountList) => {
        setAccount(accountList[0]);
      })
      .catch((error) => {
        setWalletError(error);
      });
  };

  const getWalletNetwork = () => {
    if (!window.ethereum) {
      return false;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    return provider.getNetwork();
  };

  const trackAccountChanges = () => {
    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
    });
  };

  const trackNetworkChanges = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });
  };

  const getAllNfts = async () => {
    if (!window.ethereum) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wavePortalContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI.abi,
      provider
    );

    const allNfts = await wavePortalContract.getAllNfts();
    if (!allNfts) {
      return [];
    }

    const nftsCleaned = (nft) => ({
      address: nft.minter,
      tokenId: nft.tokenId.toNumber(), // format bigNumber to number
      tokenUri: nft.tokenUri,
    });

    return allNfts.map(nftsCleaned);
  };

  const updateNfts = useCallback(
    (walletConnected, isRinkeby) => {
      const runUpdates = async () => {
        setNftList(await getAllNfts());
      };
      if (walletConnected && isRinkeby) {
        runUpdates();
      }
    },
    [setNftList]
  );

  const subscribeToNftEvents = (callback) => {
    if (!window.ethereum) {
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wavePortalContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI.abi,
      provider
    );

    wavePortalContract.on("NewEpicNFTMinted", (sender, tokenId, tokenUri) => {
      callback({ sender, tokenId, tokenUri });
    });
  };

  useEffect(() => {
    subscribeToNftEvents((newNft) => {
      updateNfts(walletConnected, isRinkeby);
    });
    // SUBSCRICE ONCE when mounting the component
    // in case user ALREADY had their wallet connected + authorized.
  }, []);

  const writeNft = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const emojiArkContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI.abi,
      signer
    );
    return emojiArkContract.makeAnEpicNFT();
  };

  const mint = async () => {
    if (!walletInstalled) {
      return;
    }
    if (!walletConnected) {
      // update wave status to connecting
      setNftLoading(TRANSACTION_STATUS.Connect);
      await connectWallet();
      // update wallet status
      setConnected(await isWalletConnected());
    }
    // update wave status to requesting
    setNftLoading(TRANSACTION_STATUS.Request);

    writeNft()
      .then(async (transaction) => {
        // update wave status to pending
        setNftLoading(TRANSACTION_STATUS.Pending);
        console.log("Mining...please wait.");
        // wait for wave to finish
        await transaction.wait();
        // update
        updateNfts(walletConnected, isRinkeby);
        // update wave status to begin
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${transaction.hash}`
        );
        setNftLoading(TRANSACTION_STATUS.None);
      })
      .catch((error) => {
        window.alert("Failed to write transaction!");
        console.error(error);
        setNftLoading(TRANSACTION_STATUS.None);
      });
  };

  const mintNft = () => mint();

  // execute first and try methods
  useEffect(() => {
    const runUpdates = async () => {
      // check if metamask is installed
      setInstalled(isWalletInstalled());
      // check if wallet is connected
      setConnected(await isWalletConnected());
      // get network
      setNetwork(await getWalletNetwork());
      // stop loading
      setIsLoading(false);
    };
    runUpdates();
  }, []);

  // if wallet is installed
  useEffect(() => {
    if (walletInstalled) {
      // track changes
      trackAccountChanges();
      trackNetworkChanges();
    }
  }, [walletInstalled]);

  useEffect(() => {
    // in case user connected their wallet for the first time.
    updateNfts(walletConnected, isRinkeby);
  }, [walletConnected, isRinkeby]);

  // if wallet is connected
  useEffect(() => {
    const getAccount = async () => {
      if (walletConnected) {
        // set account
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccount(accounts[0]);
      }
    };
    getAccount();
  }, [walletConnected]);

  // if wallet account
  useEffect(() => {
    const getBalance = async () => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const balance = await provider.getBalance(walletAccount);
      setBalance(ethers.utils.formatEther(balance));
    };
    const updateWalletConnected = async () => {
      setConnected(await isWalletConnected());
    };
    // set balance
    if (walletAccount) {
      getBalance();
      updateWalletConnected();
    }
  }, [walletAccount]);

  return {
    walletInstalled,
    walletConnected,
    connectWallet,
    walletNetwork,
    walletAccount,
    walletBalance,
    nftList,
    isLoading,
    isRinkeby,
    nftLoading,
    mintNft,
  };
}
