import {
  TWITTER_LINK,
  TWITTER_USERNAME,
  GITHUB_LINK,
  GITHUB_USERNAME,
  CONTRACT_ADDRESS,
} from "../globals";

const Footer = () => {
  return (
    <div className="mt-6 text-black block md:flex items-center text-xs">
      <a href={`${TWITTER_LINK}${TWITTER_USERNAME}`} target="_blank">
        built with 🖤 by{" "}
        <span className="underline">{`@${TWITTER_USERNAME}`}</span>
      </a>
      <p className="mx-1 hidden md:block">•</p>
      <a
        className="hidden md:block"
        href={`${GITHUB_LINK}${GITHUB_USERNAME}`}
        target="_blank"
      >
        <img className="w-4 h-4 mx-1" src="/github.png" alt="github" />
      </a>
      <p className="mx-1 hidden md:block">•</p>
      <a
        className="mt-1 md:mt-0"
        href={`https://rinkeby.etherscan.io/address/${CONTRACT_ADDRESS}#code`}
        target="_blank"
      >
        <p className="underline">read contract on Etherscan</p>
      </a>
      <a
        className="flex md:hidden justify-center mt-1 md:mt-0"
        href={`${GITHUB_LINK}${GITHUB_USERNAME}`}
        target="_blank"
      >
        <img className="w-4 h-4 mx-1" src="/github.png" alt="github" />
      </a>
    </div>
  );
};

export default Footer;
