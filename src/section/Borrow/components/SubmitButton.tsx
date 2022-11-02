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
  const { connectWallet } = Connector.useContainer();
  const getState = () => {
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
