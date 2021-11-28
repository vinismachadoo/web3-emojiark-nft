import { CONTRACT_ADDRESS, TRANSACTION_STATUS } from "../globals";

const NftList = ({ nftList, nftLoading, isRinkeby }) => {
  if (nftList.length === 0 || !isRinkeby) {
    return <div></div>;
  }

  // if nft is pending show only 4 nfts on the wall cause the loading square will be on the 5th spot
  const nftWallSize = nftLoading === TRANSACTION_STATUS.Pending ? -4 : -5;

  return (
    <>
      {nftList.slice(nftWallSize).map((nft, idx) => {
        const [, jsonContentEncoded] = nft.tokenUri.split("base64,");
        const { image, ...jsonContent } = JSON.parse(
          Buffer.from(jsonContentEncoded, "base64").toString("binary")
        );

        return (
          <a
            href={`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${nft.tokenId}`}
            target="_blank"
            key={idx}
          >
            <div className="mx-1.5 md:mx-2 text-center text-sm" key={idx}>
              <div className="text-xs md:text-sm text-black mb-2">
                {jsonContent.name}
              </div>
              <div className="p-1.5 md:p-2 lg:p-3 bg-white rounded-md w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28">
                <img className="w-full h-full" src={image} alt="NFT preview" />
              </div>
            </div>
          </a>
        );
      })}
    </>
  );
};

export default NftList;
