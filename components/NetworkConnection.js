const NetworkConnection = ({
  walletInstalled,
  walletConnected,
  isRinkeby,
  walletAccount,
  walletBalance,
}) => {
  if (walletConnected && isRinkeby) {
    const account = walletAccount.slice(walletAccount.length - 8);
    const balance = parseFloat(walletBalance).toFixed(5);
    return (
      <div className="text-xs md:text-sm text-black mb-5 space-y-1 text-left">
        <div className="flex items-center">
          <img
            src="/check.png"
            alt="check"
            className="w-3 sm:w-4 h-3 sm:h-4 mr-1"
          />
          Connected to Rinkeby
        </div>
        <div className="flex items-center">
          <img
            src="/account.png"
            alt="account"
            className="w-3 sm:w-4 h-3 sm:h-4 mr-1"
          />
          Account: ...{account}
        </div>
        <div className="flex items-center">
          <img
            src="/balance.png"
            alt="balance"
            className="w-3 sm:w-4 h-3 sm:h-4 mr-1"
          />
          Balance: {balance}
        </div>
      </div>
    );
  }

  return (
    <div>
      {walletConnected && !isRinkeby && (
        <div className="flex flex-col items-center justify-center md:flex md:flex-row items-center text-xs md:text-sm text-black mb-4 px-4">
          <img
            src="/warning.png"
            alt="warning"
            className="w-3 sm:w-4 h-3 sm:h-4 mr-1"
          />
          Please, switch to Rinkeby Network
        </div>
      )}
      {!walletInstalled || (!walletConnected && <div></div>)}
    </div>
  );
};

export default NetworkConnection;
