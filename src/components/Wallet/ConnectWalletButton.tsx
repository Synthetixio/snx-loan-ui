import styled from 'styled-components';
import { BaseButton } from '@/components/Base/Button';

const ConnectWalletButton = styled(BaseButton)`
  width: 160px;
  height: 44px;
  white-space: nowrap;
  color: white;

  border: 1px solid ${({ theme }) => theme.colors.gray900};
  background-color: ${({ theme }) => theme.colors.bgNavy};

  span {
    font-weight: 700;
  }
`;

export default ConnectWalletButton;
