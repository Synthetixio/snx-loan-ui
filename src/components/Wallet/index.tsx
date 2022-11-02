import styled from 'styled-components';
import { AddrButton } from '@/components/Base/Button';
import { useBoolean } from 'usehooks-ts';
import { truncateAddress } from '@/utils/string';
import { useRecoilState } from 'recoil';
import { networkState } from '@/store/wallet';
import Connector from '@/containers/connector';
import ConnectWalletButton from './ConnectWalletButton';
import Profile from './Profile';

const Wallet = () => {
  const { connectWallet, disconnectWallet, walletAddress } =
    Connector.useContainer();
  const { value: isShow, setTrue, setFalse } = useBoolean(false);
  const [network] = useRecoilState(networkState);

  const shortAddr = truncateAddress(walletAddress || ``);
  const disconnect = () => {
    setFalse();
    disconnectWallet();
  };
  const changeWallet = () => {
    setFalse();
    connectWallet();
  };
  return (
    <Container>
      {walletAddress ? (
        <AddrButton onClick={setTrue}>
          <span className="dot"></span>
          <span>{shortAddr}</span>
        </AddrButton>
      ) : (
        <ConnectWalletButton onClick={() => connectWallet(network?.id)}>
          <span>Connect Wallet</span>
        </ConnectWalletButton>
      )}
      <Profile
        disconnect={disconnect}
        isShow={isShow}
        onClose={setFalse}
        address={walletAddress || ``}
        shortAddr={shortAddr}
        chainId={network?.id}
        changeWallet={changeWallet}
      />
    </Container>
  );
};

export default Wallet;

const Container = styled.div`
  width: 160px;
`;
