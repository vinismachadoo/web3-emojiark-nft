import { TRANSACTION_STATUS } from "../globals";

const NftTransaction = ({ nftLoading }) => {
  if (nftLoading !== TRANSACTION_STATUS.Pending) {
    return <div></div>;
  }

  return (
    <div className="mx-5 text-center text-sm">
      <div className="text-black  mb-2">Minting in progress</div>
      <div className="p-3 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 bg-black rounded-md w-32 h-32 flex justify-center items-center">
        <img className="w-6 h-6" src="/loading.svg" alt="NFT loading" />
      </div>
    </div>
  );
};

export default NftTransaction;
