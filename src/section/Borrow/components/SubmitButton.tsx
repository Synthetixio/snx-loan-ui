import ActionButton from '@/components/ActionButton';
import Connector from '@/containers/connector';

type SubmitButtonProps = {
  isWalletConnected: boolean;
  onClick(): void;
  disabled: boolean;
};

const SubmitButton = ({
  isWalletConnected,
  onClick,
  disabled,
}: SubmitButtonProps) => {
  const { connectWallet, walletConnectedToUnsupportedNetwork } = Connector.useContainer();
  const getState = () => {
    if (walletConnectedToUnsupportedNetwork) {
      return {
        disabled: true,
        msg: `Please Swith To Optimism or Mainnet`,
        onClick: () => console.log('change network')
      }
    }
    if (!isWalletConnected) {
      return {
        disabled: false,
        msg: `Connect Wallet`,
        onClick: connectWallet,
      };
    }

    return {
      msg: `Borrow`,
      disabled: disabled,
      onClick,
    };
  };

  return <ActionButton {...getState()} />;
};

export default SubmitButton;
