import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WalletButton from "../components/WalletButton";
import NftList from "../components/NftList";
import NftTransaction from "../components/NftTransaction";
import useWallet from "../hooks/useWallet";
import NetworkConnection from "../components/NetworkConnection";

export default function Home() {
  const {
    walletInstalled,
    walletConnected,
    connectWallet,
    walletAccount,
    walletBalance,
    nftList,
    isLoading,
    isRinkeby,
    nftLoading,
    mintNft,
  } = useWallet();

  return (
    <>
      <Background />
      <div className="items-center flex justify-center py-24">
        <div className="overflow-y-auto z-10 w-4/5 md:w-3/4 lg:w-2/3">
          <div className="bg-clip-padding backdrop-blur-md bg-opacity-50 bg-white w-full max-h-full rounded-xl items-center flex flex-col justify-center text-white text-center pt-10 pb-6 px-2 md:px-6">
            <NetworkConnection
              walletInstalled={walletInstalled}
              walletConnected={walletConnected}
              isRinkeby={isRinkeby}
              walletAccount={walletAccount}
              walletBalance={walletBalance}
            />
            <Header />
            <div className="flex my-6 justify-start md:justify-start xl:justify-center w-5/6 lg:w-4/5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-transparent">
              <NftList
                nftList={nftList}
                nftLoading={nftLoading}
                isRinkeby={isRinkeby}
              />
              <NftTransaction nftLoading={nftLoading} />
            </div>
            <WalletButton
              isLoading={isLoading}
              isRinkeby={isRinkeby}
              walletInstalled={walletInstalled}
              walletConnected={walletConnected}
              mintNft={mintNft}
              nftLoading={nftLoading}
              connectWallet={connectWallet}
            />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
