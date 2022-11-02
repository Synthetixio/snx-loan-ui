import styled from 'styled-components';
import Image from 'next/image';
import { ChevronDown } from 'react-feather';

import { DefaultDropdownMenu } from '@/components/Dropdown';
import { Text18 } from '@/components/Base/Text';
import { Flex } from '@/components/Base/Div';
import type { TokenInterface } from '@/constants/tokens';

export interface TokenSelectorProps {
  activeToken: TokenInterface;
  tokenList: TokenInterface[];
  onClick?: (token: TokenInterface) => void;
}

const TokenSelector = ({
  activeToken,
  tokenList,
  onClick,
}: TokenSelectorProps) => {
  if (tokenList.length === 0 || !onClick) {
    return (
      <CoinSelector>
        <Image
          src={activeToken.src}
          alt={activeToken.name}
          width={34}
          height={34}
        />
        <Text18>{activeToken.name}</Text18>
      </CoinSelector>
    );
  }
  return (
    <DefaultDropdownMenu
      leftOffset={`-8`}
      offset={64}
      trigger={
        <CoinSelector>
          <Image
            src={activeToken.src}
            alt={activeToken.name}
            width={34}
            height={34}
          />
          <Text18>{activeToken.name}</Text18>
          <ChevronDown size={16} />
        </CoinSelector>
      }
      dropList={
        <DropdownContainer>
          {tokenList.map((token) => (
            <Coin
              onClick={() => onClick(token)}
              key={token.key}
              active={token.key === activeToken.key}
            >
              <Image src={token.src} alt={token.name} width={24} height={24} />
              <Text18>{token.name}</Text18>
            </Coin>
          ))}
        </DropdownContainer>
      }
    />
  );
};

export default TokenSelector;

const CoinSelector = styled(Flex)<{ height?: string }>`
  z-index: 1;
  cursor: pointer;
  align-items: center;
  gap: 5px;
  height: ${({ height }) => height || `100%`};
  span {
    text-transform: unset;
  }
`;

const Coin = styled(Flex)<{ active: boolean }>`
  height: 44px;
  align-items: center;
  padding: 10px 8px;
  gap: 5px;
  ${(props) => props.active && `background: rgba(255, 255, 255, 0.06);`}
  span {
    text-transform: unset;
  }
`;

const DropdownContainer = styled.div`
  cursor: pointer;
  width: 192px;
  background-color: ${({ theme }) => theme.colors.bgNavy};
  border: 1px solid #2d2d38;
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  z-index: 10;
`;
