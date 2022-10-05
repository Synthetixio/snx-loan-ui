import styled, { css } from 'styled-components';

type ButtonProps = {
  size?: 'xs' | 'sm';
};

const BaseButton = styled.button`
  border: 1px solid rgba(130, 130, 149, 0.3);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const NetWorkButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.bgNavy};
  box-shadow: ${({ theme }) => theme.colors.header};
  gap: 5px;

  width: 160px;
  height: 44px;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
`;

const Button = styled.button<ButtonProps>`
  padding: 10px, 16px;
  height: 44px;
  width: 160px;

  /* Extra-small size */
  ${(props) =>
    props.size === `xs` &&
    css`
      padding: 10px;
      width: 34px;
      height: 34px;
    `}

  /* Small size */
    ${(props) =>
    props.size === `sm` &&
    css`
      padding: 10px;
      width: 44px;
    `}

  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(311.52deg, #3D464C -36.37%, #131619 62.81%);

  border: 1px solid #8282954d;
  border-radius: 4px;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  &:hover {
    box-shadow: inset -2px -2px 1px rgba(255, 255, 255, 0.15);
  }
`;

const WalletButton = styled.div`
  border: 1px solid transparent;
  background: linear-gradient(#000000 0 0) padding-box,
    linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%) border-box;
  border-radius: 2px;
  span {
    background-color: white;
    background-image: linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%);
    background-size: 100%;
    background-repeat: repeat;

    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const WalletSelectorButton = styled(WalletButton)`
  height: 48px;
  padding-left: 21px;
  display: grid;
  grid-template-columns: 24px auto;
  justify-content: flex-start;
  align-items: center;

  span {
    margin-left: 10px;
    font-weight: 700;
    font-size: 14px;
    font-style: normal;
  }

  margin-bottom: 8px;
`;

const AddrButton = styled(NetWorkButton)`
  font-size: 12px;
  gap: 10px;
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.bgGreen};
  }
`;

export { Button, NetWorkButton, BaseButton, WalletSelectorButton, AddrButton };
