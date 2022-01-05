import { TRANSACTION_STATUS } from "../globals";

const WalletButton = ({
  isLoading,
  walletInstalled,
  walletConnected,
  mintNft,
  nftLoading,
  connectWallet,
  isRinkeby,
}) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      {!walletInstalled && (
        <a href="https://metamask.io/download.html" target="_blank">
          <button className="flex items-center px-3 py-0.5 text-sm md:text-lg rounded-lg border-2 border-black bg-black hover:bg-transparent hover:text-black">
            Install MetaMask
            <img
              src="/download.png"
              alt="download"
              className="w-3 sm:w-4 h-3 sm:h-4 ml-2"
            />
          </button>
        </a>
      )}
      {walletInstalled && !walletConnected && (
        <button
          className="flex items-center px-3 py-0.5 text-sm md:text-lg rounded-lg border-2 border-black bg-black hover:bg-transparent hover:text-black"
          onClick={() => connectWallet()}
        >
          Connect Wallet
          <img
            src="/metamask.png"
            alt="metamask"
            className="w-3 sm:w-4 h-3 sm:h-4 ml-2"
          />
        </button>
      )}
      {walletConnected && (
        <button
          disabled={!isRinkeby || nftLoading !== TRANSACTION_STATUS.None}
          className={classNames(
            isRinkeby && nftLoading === TRANSACTION_STATUS.None
              ? "hover:bg-transparent hover:border-black hover:text-black"
              : "opacity-50 cursor-not-allowed",
            "flex items-center px-3 py-0.5 text-sm md:text-lg rounded-lg border-2 border-black bg-black"
          )}
          onClick={() => mintNft()}
        >
          Mint your NFT
          <img
            src="/unicorn.png"
            alt="unicorn"
            className="w-3 sm:w-4 h-3 sm:h-4 ml-2"
          />
        </button>
      )}
    </div>
  );
};

export default WalletButton;
