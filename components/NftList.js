import { CONTRACT_ADDRESS } from "../globals";

const NftList = ({ nftList, nftLoading, isRinkeby }) => {
  if (nftList.length === 0 || !isRinkeby) {
    return <div></div>;
  }

  const nftWallSize = nftLoading ? -4 : -5;

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
            <div className="mx-5 text-center text-sm" key={idx}>
              <div className="text-black mb-2">{jsonContent.name}</div>
              <div className="p-3 bg-white rounded-md w-32 h-32">
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
