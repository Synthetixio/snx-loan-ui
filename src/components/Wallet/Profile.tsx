import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import styled, { css } from 'styled-components';
import NetworkSelector from '@/components/NetworkSelector';
import CopyHelper from './CopyHelper';
import Explorer from './Explorer';
import Modal from '@/components/Modal';
import { Info, X } from 'react-feather';
import Card, { BaseCard } from '@/components/Base/Card';
import { Text18, Text } from '@/components/Base/Text';
import {
  Flex,
  FlexCenter,
  FlexRowCentered,
  FlexColCentered,
  FlexCol,
} from '@/components/Base/Div';
import { BaseButton } from '@/components/Base/Button';

type ProfileProps = {
  disconnect: () => void;
  onClose: () => void;
  changeWallet: () => void;
  address: string;
  shortAddr: string;
  chainId: number;
  isShow: boolean;
};

const Profile = ({
  isShow,
  onClose,
  address,
  shortAddr,
  chainId,
  disconnect,
  changeWallet,
}: ProfileProps) => {
  return (
    <Modal isShow={isShow} onClose={onClose}>
      <StyledProfile>
        <X color="#fff" size={14} className="icon" onClick={onClose} />
        <InnerProfile>
          <Text18 className="title">My Account</Text18>
          <InfoCard>
            <Text size={14}>Connected With MetaMask</Text>
            <Center>
              <Jazzicon
                diameter={18}
                seed={jsNumberForAddress(address || ``)}
              />
              <Text18 color="#ffffff">{shortAddr}</Text18>
            </Center>
            <FlexCenter>
              <CopyHelper iconSize={16} toCopy={address} color="#828295" />
              <Explorer ENSName={address} chainId={chainId} />
            </FlexCenter>
            <ChangeButton onClick={changeWallet}>
              <Text>Change</Text>
            </ChangeButton>
          </InfoCard>
          <Flex gap={7}>
            <DisconnectButton onClick={disconnect}>
              <Text size={14} color="#00D1FF" fontWeight={700}>
                Disconnect
              </Text>
            </DisconnectButton>
            <NetworkSelector containerCls="network" />
          </Flex>
        </InnerProfile>
      </StyledProfile>
    </Modal>
  );
};

export default Profile;

const Center = styled(FlexCenter)`
  gap: 4px;
  margin-top: 8px;
  margin-bottom: 5px;
`;

const ChangeButton = styled(BaseButton)`
  border: 1px solid transparent;
  background: linear-gradient(#000000 0 0) padding-box,
    linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%) border-box;

  span {
    background-color: white;
    background-image: linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%);
    background-size: 100%;
    background-repeat: repeat;

    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    color: transparent;
  }

  position: absolute;
  width: 66px;
  line-height: 28px;
  padding: unset;
  top: 9px;
  right: 9px;
  font-weight: 700;
  border-radius: 5px;
`;

const StyledProfile = styled(Card)`
  position: relative;
  width: 370px;
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: unset;
  padding: 20.33px 28px 43px;

  .icon {
    position: absolute;
    right: 20.33px;
    top: 20.33px;
  }

  .network {
    width: 198px;
  }
`;
const DisconnectButton = styled(Card)`
  width: 109px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerProfile = styled(FlexColCentered)`
  .title {
    margin-bottom: 34px;
  }
`;

const InfoCard = styled(BaseCard)`
  position: relative;
  color: ${({ theme }) => theme.colors.grayV2};
  padding: 12px 13px;
  width: 100%;
  margin-bottom: 8px;
`;
