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
      <div className="text-black mb-5 text-left">
        <div>✅ Connected to Rinkeby</div>
        <div>🙋 Account: ...{account}</div>
        <div>💸 Balance: {balance}</div>
      </div>
    );
  }

  return (
    <div>
      {walletConnected && !isRinkeby && (
        <div className="text-black mb-4">
          ⚠️ Please, switch to Rinkeby Network
        </div>
      )}
      {!walletInstalled || (!walletConnected && <div></div>)}
    </div>
  );
};

export default NetworkConnection;
