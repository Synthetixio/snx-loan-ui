import styled from 'styled-components';

export const BaseCard = styled.div`
  background: ${({ theme }) => theme.colors.bgNavy};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray900};
`;

export default BaseCard;
